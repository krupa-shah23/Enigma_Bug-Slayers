/**
 * Shared enums used by models, validators and services.
 */

module.exports = {
  ROLES: ['person', 'ngo', 'bhangarwala'],
  SOCIETY_ROLES: ['resident', 'cp', 'treasurer'],
  OFFICER_ROLES: ['cp', 'treasurer'],
  VERIFICATION_STATUSES: ['none', 'pending', 'approved', 'rejected'],
  CATEGORIES: ['plastic', 'paper', 'metal', 'glass', 'e-waste', 'organic', 'textile', 'other'],
  COLLECTION_FREQUENCIES: ['weekly', 'biweekly', 'monthly'],
  FESTIVAL_DECISIONS: ['pending', 'accepted', 'overridden'],
  CONTRACT_STATUSES: ['offered', 'active', 'completed', 'cancelled'],
  PAYMENT_STATUSES: ['unpaid', 'paid'],
  PAYMENT_MODES: ['simulated', 'razorpay_test'],
  REQUEST_STATUSES: ['open', 'assigned', 'completed'],
  QUOTE_STATUSES: ['pending', 'accepted', 'expired'],
  EVENT_TYPES: ['drive', 'green_event', 'workshop'],
  EVENT_STATUSES: ['active', 'cancelled'],
  EVENT_CREATOR_ROLES: ['cp', 'treasurer', 'ngo'],
  MAX_CONTRIBUTION_KG: 500,
};
