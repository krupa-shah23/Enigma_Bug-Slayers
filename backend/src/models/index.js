/** Registers and exports all 11 models. */

module.exports = {
  User: require('./User'),
  Society: require('./Society'),
  Contribution: require('./Contribution'),
  Contract: require('./Contract'),
  Collection: require('./Collection'),
  Flag: require('./Flag'),
  Payment: require('./Payment'),
  P2PRequest: require('./P2PRequest'),
  Quote: require('./Quote'),
  Job: require('./Job'),
  Event: require('./Event'),
};
