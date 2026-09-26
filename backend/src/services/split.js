/**
 * split.js — proportional payout split in integer paise.
 */

/**
 * Splits `totalPaise` across contributors in proportion to weightKg.
 * Shares are floored, then leftover paise go to the largest fractional
 * remainders (ties: earlier contributor first), so the shares sum exactly
 * to the total. Zero-weight contributors always get 0.
 *
 * Returns { splits: [{ userId, weightKg, sharePaise }], unallocated }.
 * If nobody contributed, splits is empty and everything is unallocated.
 */
function splitPayment(totalPaise, contribs) {
  if (!Number.isInteger(totalPaise) || totalPaise < 0) {
    throw new Error('totalPaise must be a non-negative integer');
  }

  const totalWeight = contribs.reduce((sum, c) => sum + c.weightKg, 0);
  if (totalWeight <= 0) return { splits: [], unallocated: totalPaise };

  const rows = contribs.map((c) => {
    const exact = (totalPaise * c.weightKg) / totalWeight;
    const floor = Math.floor(exact);
    return { userId: c.userId, weightKg: c.weightKg, sharePaise: floor, remainder: exact - floor };
  });

  const leftover = totalPaise - rows.reduce((sum, r) => sum + r.sharePaise, 0);

  const order = rows
    .map((_, i) => i)
    .filter((i) => rows[i].weightKg > 0)
    .sort((a, b) => rows[b].remainder - rows[a].remainder || a - b);

  for (let i = 0; i < leftover; i += 1) {
    rows[order[i % order.length]].sharePaise += 1;
  }

  return {
    splits: rows.map(({ userId, weightKg, sharePaise }) => ({ userId, weightKg, sharePaise })),
    unallocated: 0,
  };
}

module.exports = { splitPayment };
