/**
 * aggregate.js — a society's current-cycle contribution aggregate.
 *
 * For each category the "cycle" starts at the society's last NGO Collection
 * in that category (or at society creation if there has never been one).
 * The summed weight in that window is the "promised" kg an NGO will verify.
 */

const { CATEGORIES } = require('../config/constants');
const Society = require('../models/Society');
const Collection = require('../models/Collection');
const Contribution = require('../models/Contribution');

const round3 = (n) => Math.round(n * 1000) / 1000;

/**
 * Returns { byCategory: [{ category, totalKg, since }], entries: [contribution] }
 * for every category. `entries` are the contributions inside their category's
 * current cycle, newest first.
 */
async function currentCycle(societyId) {
  const society = await Society.findById(societyId).select('createdAt').lean();

  const [lastRows, contributions] = await Promise.all([
    Collection.aggregate([
      { $match: { societyId: society._id } },
      { $group: { _id: '$category', last: { $max: '$collectedAt' } } },
    ]),
    Contribution.find({ societyId: society._id }).sort({ loggedAt: -1 }).lean(),
  ]);

  const lastByCategory = new Map(lastRows.map((r) => [r._id, r.last]));
  const sinceOf = (category) => lastByCategory.get(category) || society.createdAt;

  const entries = contributions.filter((c) => c.loggedAt >= sinceOf(c.category));

  const byCategory = CATEGORIES.map((category) => ({
    category,
    since: sinceOf(category),
    totalKg: round3(
      entries.filter((e) => e.category === category).reduce((sum, e) => sum + e.weightKg, 0)
    ),
  }));

  return { byCategory, entries };
}

/** Promised kg for one category in the society's current cycle. */
async function promisedKg(societyId, category) {
  const { byCategory } = await currentCycle(societyId);
  return byCategory.find((b) => b.category === category).totalKg;
}

module.exports = { currentCycle, promisedKg };
