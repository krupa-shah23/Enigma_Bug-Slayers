/**
 * societyView.js — projections of a society for different audiences.
 *
 *  public : everyone (person + NGO): id, name, address, location, trustScore,
 *           collectionFrequency, activeContractCount
 *  ngo    : + flagCount, totalCollectedKg
 *  detail : + nextCollectionDate, memberCount
 * CP/Treasurer contacts are never part of these views.
 */

const Contract = require('../models/Contract');
const Flag = require('../models/Flag');
const Collection = require('../models/Collection');
const User = require('../models/User');
const { festivalSuggestion } = require('./schedule');

const countBySociety = (rows) => new Map(rows.map((r) => [r._id.toString(), r.n]));
const groupBySociety = (accumulator) => [{ $group: { _id: '$societyId', n: accumulator } }];

/** Loads per-society counters for a set of society ids in four grouped queries. */
async function loadStats(societyIds) {
  const match = { $match: { societyId: { $in: societyIds } } };
  const [contracts, flags, collected, members] = await Promise.all([
    Contract.aggregate([{ $match: { societyId: { $in: societyIds }, status: 'active' } }, ...groupBySociety({ $sum: 1 })]),
    Flag.aggregate([match, ...groupBySociety({ $sum: 1 })]),
    Collection.aggregate([match, ...groupBySociety({ $sum: '$actualKg' })]),
    User.aggregate([{ $match: { societyId: { $in: societyIds } } }, { $group: { _id: '$societyId', n: { $sum: 1 } } }]),
  ]);

  return {
    activeContracts: countBySociety(contracts),
    flags: countBySociety(flags),
    collectedKg: countBySociety(collected),
    members: countBySociety(members),
  };
}

/** Projects a society for the given audience. `stats` comes from loadStats. */
function projectSociety(society, stats, { isNgo = false, detail = false } = {}) {
  const id = society._id.toString();
  const view = {
    id,
    name: society.name,
    address: society.address,
    location: { lat: society.location.lat, lng: society.location.lng },
    trustScore: society.trustScore,
    collectionFrequency: society.collectionFrequency,
    activeContractCount: stats.activeContracts.get(id) || 0,
  };

  if (isNgo) {
    view.flagCount = stats.flags.get(id) || 0;
    view.totalCollectedKg = stats.collectedKg.get(id) || 0;
  }

  if (detail) {
    view.nextCollectionDate = society.nextCollectionDate;
    view.memberCount = stats.members.get(id) || 0;
  }

  return view;
}

/**
 * The festival-schedule state to show officers:
 *  - a pending suggestion when nextCollectionDate is inside a festival window
 *    (unless officers already decided on that festival),
 *  - otherwise the stored decision, or null.
 */
function festivalStatus(society, calendar) {
  const suggestion = festivalSuggestion(society.nextCollectionDate, calendar);
  const stored = society.festivalSchedule;

  const alreadyDecided =
    Boolean(suggestion && stored) &&
    stored.decision !== 'pending' &&
    stored.festivalName === suggestion.festivalName;

  if (suggestion && !alreadyDecided) return { ...suggestion, decision: 'pending' };

  return stored
    ? {
        festivalName: stored.festivalName,
        suggestedDate: stored.suggestedDate,
        decision: stored.decision,
        finalDate: stored.finalDate,
      }
    : null;
}

module.exports = { loadStats, projectSociety, festivalStatus };
