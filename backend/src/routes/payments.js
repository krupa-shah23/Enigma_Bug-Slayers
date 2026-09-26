/**
 * routes/payments.js — payments, split and per-role views.
 *   E44 GET  /api/ngo/payments          NGO's payment history
 *   E45 POST /api/payments/trigger      NGO triggers payment for latest collection
 *   E46 GET  /api/payments/:paymentId   detail (role-filtered splits)
 *
 * E44 is mounted inside routes/ngo.js (which already has /api/ngo base).
 * E45 and E46 are mounted at /api/payments in app.js.
 *
 * Payment flow (E45):
 *   1. Find the latest unpaid collection on the contract (must be active).
 *   2. Compute amountPaise = round(actualKg * ratePerKg * 100).
 *   3. Pull every Contribution in [windowStart, windowEnd) for that category/society.
 *   4. Run splitPayment() → per-user sharePaise.
 *   5. Inside a Mongoose transaction:
 *        - Create the Payment doc (collectionId unique → guards double trigger).
 *        - Mark the Collection paid and link paymentId.
 *        - $inc each recipient's feeCreditPaise.
 *        - $inc society.feeReductionTotalPaise and .unallocatedPaise.
 *   6. Emit S10 to each recipient and to the society officers.
 */

const express = require('express');
const mongoose = require('mongoose');
const AppError = require('../lib/AppError');
const asyncHandler = require('../lib/asyncHandler');
const { ok } = require('../lib/response');
const { auth, requireRole, requireVerifiedNgo } = require('../middleware/auth');
const { isOfficerOf, isOwnerNgo } = require('../lib/contracts');
const { splitPayment } = require('../services/split');
const { emitToUser, emitToOfficers } = require('../sockets/emitter');
const {
  Contract, Collection, Contribution, Payment, User, Society,
} = require('../models');

const router = express.Router();

// ── helpers ───────────────────────────────────────────────────────────────────

const notFound = (what) => new AppError(404, 'NOT_FOUND', `${what} not found`);

/** Loads the payment doc and enforces per-role access. Returns {payment, isNgo, isOfficer, mySplit}. */
async function loadPaymentForUser(paymentId, user) {
  if (!mongoose.isValidObjectId(paymentId)) throw notFound('Payment');
  const payment = await Payment.findById(paymentId);
  if (!payment) throw notFound('Payment');

  const isNgo = isOwnerNgo(user, { ngoId: payment.ngoId });
  const isOfficer = isOfficerOf(user, payment.societyId);
  const mySplit = payment.splits.find((s) => s.userId.equals(user._id));

  if (!isNgo && !isOfficer && !mySplit) {
    // A person not in the splits or a totally unrelated user
    throw new AppError(403, 'FORBIDDEN', 'You do not have access to this payment');
  }

  return {
    payment,
    isNgo,
    isOfficer,
    mySplit,
  };
}

// ── E44 · GET /api/ngo/payments ────────────────────────────────────────────────
// Mounted inside routes/ngo.js at /api/ngo. Returns the calling NGO's payments.
const listNgoPayments = [
  auth,
  requireRole('ngo'),
  asyncHandler(async (req, res) => {
    const payments = await Payment.find({ ngoId: req.user._id }).sort({ createdAt: -1 });
    return ok(res, payments);
  }),
];

// ── E45 · POST /api/payments/trigger ──────────────────────────────────────────
router.post(
  '/trigger',
  auth,
  requireVerifiedNgo,
  asyncHandler(async (req, res) => {
    const { contractId } = req.body;
    if (!contractId || !mongoose.isValidObjectId(contractId)) {
      throw new AppError(400, 'VALIDATION_ERROR', 'contractId is required and must be a valid id');
    }

    // Load the contract — must be owned by this NGO
    const contract = await Contract.findById(contractId);
    if (!contract) throw notFound('Contract');
    if (!isOwnerNgo(req.user, contract)) {
      throw new AppError(403, 'FORBIDDEN', 'This contract belongs to another NGO');
    }

    // Find the latest unpaid collection on this contract
    const collection = await Collection.findOne(
      { contractId: contract._id, paymentStatus: 'unpaid' },
      null,
      { sort: { collectedAt: -1 } }
    );
    if (!collection) {
      throw new AppError(409, 'CONTRACT_NOT_FULFILLED', 'No unpaid collection found for this contract');
    }

    // Compute total in paise (rate is in ₹/kg, 100 paise = ₹1)
    const amountPaise = Math.round(collection.actualKg * contract.ratePerKg * 100);

    // Pull contributions in the collection window (windowStart ≤ loggedAt < windowEnd)
    const contributions = await Contribution.find({
      societyId: contract.societyId,
      category: contract.materialType,
      loggedAt: { $gte: collection.windowStart, $lt: collection.windowEnd },
    }).lean();

    const { splits, unallocated } = splitPayment(
      amountPaise,
      contributions.map((c) => ({ userId: c.userId, weightKg: c.weightKg }))
    );

    // ── Transaction ──────────────────────────────────────────────────────────
    let savedPayment;
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        // collectionId has a unique index — this is the double-trigger guard.
        // If two NGO sessions both hit trigger at the same time, the second
        // insert will throw a duplicate-key error which becomes a 409.
        [savedPayment] = await Payment.create(
          [{
            contractId: contract._id,
            collectionId: collection._id,
            ngoId: contract.ngoId,
            societyId: contract.societyId,
            amountPaise,
            splits: splits.map((s) => ({
              userId: s.userId,
              weightKg: s.weightKg,
              sharePaise: s.sharePaise,
            })),
            unallocatedPaise: unallocated,
          }],
          { session }
        );

        // Mark the collection paid
        await Collection.updateOne(
          { _id: collection._id },
          { paymentStatus: 'paid', paymentId: savedPayment._id },
          { session }
        );

        // Credit each recipient
        const creditOps = splits
          .filter((s) => s.sharePaise > 0)
          .map((s) =>
            User.updateOne(
              { _id: s.userId },
              { $inc: { feeCreditPaise: s.sharePaise } },
              { session }
            )
          );
        await Promise.all(creditOps);

        // Update society aggregates
        await Society.updateOne(
          { _id: contract.societyId },
          {
            $inc: {
              feeReductionTotalPaise: amountPaise - unallocated,
              unallocatedPaise: unallocated,
            },
          },
          { session }
        );
      });
    } catch (txErr) {
      // A duplicate collectionId means another request already created the
      // payment (double trigger).  Surface this as a proper 409.
      if (txErr && txErr.code === 11000) {
        throw new AppError(409, 'CONTRACT_NOT_FULFILLED', 'This collection has already been paid');
      }
      throw txErr;
    } finally {
      await session.endSession();
    }

    // ── S10 — notify each recipient and the officers ──────────────────────────
    const recipientIds = splits.filter((s) => s.sharePaise > 0).map((s) => s.userId);
    if (recipientIds.length) {
      // Each recipient gets their personal share
      splits
        .filter((s) => s.sharePaise > 0)
        .forEach((s) => {
          emitToUser(s.userId, 'payment:credited', {
            paymentId: savedPayment.id,
            contractId: contract.id,
            yourSharePaise: s.sharePaise,
            totalPaise: amountPaise,
          });
        });
    }

    // Officers get the full summary
    emitToOfficers(contract.societyId, 'payment:credited', {
      paymentId: savedPayment.id,
      contractId: contract.id,
      totalPaise: amountPaise,
      unallocatedPaise: unallocated,
      splitCount: splits.length,
    });

    return ok(res, { payment: savedPayment }, 201);
  })
);

// ── E46 · GET /api/payments/:paymentId ────────────────────────────────────────
router.get(
  '/:paymentId',
  auth,
  asyncHandler(async (req, res) => {
    const { payment, isNgo, isOfficer, mySplit } = await loadPaymentForUser(
      req.params.paymentId,
      req.user
    );

    // NGO and officers see the full splits; a resident sees only their own share.
    const splitsView = isNgo || isOfficer
      ? payment.splits
      : [mySplit];

    return ok(res, {
      payment: {
        id: payment.id,
        contractId: payment.contractId,
        collectionId: payment.collectionId,
        ngoId: payment.ngoId,
        societyId: payment.societyId,
        amountPaise: payment.amountPaise,
        unallocatedPaise: payment.unallocatedPaise,
        mode: payment.mode,
        status: payment.status,
        createdAt: payment.createdAt,
      },
      splits: splitsView,
    });
  })
);

module.exports = { router, listNgoPayments };
