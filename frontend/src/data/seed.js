// Single coherent demo dataset. Every screen reads from this (via the store), so the same
// societies, residents, collectors, contracts, lots and payments show up across all three roles.
// Currency is INR; "today" is Nov 01, 2025 (see lib/format.js).

export const MATERIALS = ['Compost / Wet Waste', 'Dry Recyclables', 'E-Waste', 'Paper & Cardboard', 'Hazardous'];
export const LOT_CATEGORIES = ['E-waste', 'Metals & Brass', 'Paper & Cardboard', 'Plastics', 'Glass & Bottles', 'Other Scrap'];
export const FREQUENCIES = ['Weekly', 'Bi-weekly', 'Monthly'];
export const EVENT_TYPES = [
  { value: 'drive', label: 'Drive' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'green_event', label: 'Green Event' },
];

export const COLLECTORS = {
  ramesh: { id: 'ramesh', name: 'Ramesh Kumar', hub: 'EcoTrader Express', rating: 4.9, pickups: 142, note: 'Avg verification 4m', phone: '+91 98112 44321', vehicle: 'Electric Cargo Trike', reg: 'HR 26 EV 9912' },
  surender: { id: 'surender', name: 'Surender Scrap Traders', hub: 'Sector 14 Yard', rating: 4.8, pickups: 89, note: 'Instant digital weigh', phone: '+91 98110 67002', vehicle: 'Mini Truck', reg: 'HR 51 AK 3310' },
  modern: { id: 'modern', name: 'Modern Green Upcyclers', hub: 'Udyog Vihar Facility', rating: 4.7, pickups: 215, note: 'Scheduled route match', phone: '+91 99101 33455', vehicle: 'Cargo Van', reg: 'HR 55 GT 7781' },
};

const cp = (name, phone, email, role = 'Committee President') => ({ name, role, phone, email });

export const societiesSeed = [
  {
    id: 'gvh', name: 'Green Valley Heights', short: 'Sector 5, Riverside', address: 'Plot 14, Riverside Avenue, Sector 5', city: 'Gurugram', ward: 'Municipal Ward 14',
    trust: 88, freq: 'Bi-weekly', contracts: 3, households: 104, compliant: 92, flags: 1, totalKg: 9850,
    cp: cp('Ananya Sharma', '+91 98765 43210', 'ananya.cp@greenvalley.org'),
    treasurer: cp('Vikram Malhotra', '+91 98111 22334', 'vikram.treasurer@greenvalley.org', 'Treasurer'),
    monthly: { compost: 1240, dry: 900, ewaste: 90, haz: 24 },
    flagHistory: [{ date: 'Oct 16, 2025', material: 'E-waste', promised: 50, actual: 32, resolution: 'Under review' }],
  },
  {
    id: 'crestview', name: 'Crestview Towers', short: 'Sector 54, Gurugram', address: 'Sector 54, Golf Course Extension', city: 'Gurugram', ward: 'Municipal Ward 9',
    trust: 96, freq: 'Bi-weekly', contracts: 5, households: 380, compliant: 361, flags: 0, totalKg: 14200,
    cp: cp('Rohit Kapoor', '+91 98450 77812', 'rohit.cp@crestview.org'),
    treasurer: cp('Meera Iyer', '+91 98450 12093', 'meera.treasurer@crestview.org', 'Treasurer'),
    monthly: { compost: 6400, dry: 4900, ewaste: 1800, haz: 320 },
    flagHistory: [
      { date: 'Oct 12, 2025', material: 'Dry Paper', promised: 400, actual: 392, resolution: 'Normal / Accepted' },
      { date: 'Aug 28, 2025', material: 'Compost', promised: 1200, actual: 1020, resolution: 'Investigated - Seasonal Rain Adjustment' },
      { date: 'Jun 14, 2025', material: 'E-waste', promised: 150, actual: 148, resolution: 'Resolved' },
    ],
  },
  {
    id: 'palm', name: 'Palm Heights', short: 'Sector 65, Emerald Hills', address: 'Sector 65, Emerald Hills', city: 'Gurugram', ward: 'Municipal Ward 12',
    trust: 91, freq: 'Monthly', contracts: 2, households: 210, compliant: 188, flags: 0, totalKg: 6400,
    cp: cp('Sanjay Nair', '+91 98100 23455', 'sanjay.cp@palmheights.org'),
    treasurer: cp('Deepa Menon', '+91 98100 88712', 'deepa.treasurer@palmheights.org', 'Treasurer'),
    monthly: { compost: 2100, dry: 1600, ewaste: 320, haz: 60 },
    flagHistory: [],
  },
  {
    id: 'silveroak', name: 'Silver Oak Enclave', short: 'DLF Phase 5', address: 'DLF Phase 5, Club Drive', city: 'Gurugram', ward: 'Municipal Ward 7',
    trust: 85, freq: 'Weekly', contracts: 4, households: 260, compliant: 214, flags: 2, totalKg: 8100,
    cp: cp('Harpreet Bedi', '+91 98110 45671', 'harpreet.cp@silveroak.org'),
    treasurer: cp('Nisha Arora', '+91 98110 90233', 'nisha.treasurer@silveroak.org', 'Treasurer'),
    monthly: { compost: 2600, dry: 2100, ewaste: 300, haz: 50 },
    flagHistory: [
      { date: 'Sep 20, 2025', material: 'Compost', promised: 500, actual: 455, resolution: 'Accepted' },
      { date: 'Aug 02, 2025', material: 'Dry Recyclables', promised: 300, actual: 240, resolution: 'Penalty applied' },
    ],
  },
  {
    id: 'lotus', name: 'Lotus Residency', short: 'Indirapuram, Ghaziabad', address: 'Habitat Centre Rd, Indirapuram', city: 'Ghaziabad', ward: 'Municipal Ward 21',
    trust: 68, freq: 'Weekly', contracts: 1, households: 150, compliant: 96, flags: 3, totalKg: 3200,
    cp: cp('Imran Qureshi', '+91 98730 11890', 'imran.cp@lotusresidency.org'),
    treasurer: cp('Pooja Saxena', '+91 98730 65412', 'pooja.treasurer@lotusresidency.org', 'Treasurer'),
    monthly: { compost: 900, dry: 800, ewaste: 60, haz: 20 },
    flagHistory: [
      { date: 'Oct 18, 2025', material: 'Dry Paper', promised: 400, actual: 340, resolution: 'Contamination - Resolved with penalty' },
      { date: 'Sep 05, 2025', material: 'Compost', promised: 300, actual: 246, resolution: 'Investigated' },
      { date: 'Jul 11, 2025', material: 'Dry Recyclables', promised: 250, actual: 205, resolution: 'Penalty applied' },
    ],
  },
  {
    id: 'aura', name: 'Aura Boulevard', short: 'Sector 137, Noida', address: 'Sector 137, Expressway Corridor', city: 'Noida', ward: 'Municipal Ward 30',
    trust: null, freq: 'Weekly', contracts: 0, households: 90, compliant: 0, flags: 0, totalKg: 0,
    cp: cp('Kavita Rao', '+91 98999 20134', 'kavita.cp@auraboulevard.org'),
    treasurer: cp('Manish Jain', '+91 98999 77012', 'manish.treasurer@auraboulevard.org', 'Treasurer'),
    monthly: { compost: 0, dry: 0, ewaste: 0, haz: 0 },
    flagHistory: [],
  },
];

// Resident weights used to split any payout for a society (Green Valley Heights / Crestview are detailed).
export const splitBasis = {
  gvh: [
    { name: 'Ananya Sharma', flat: 'Flat C-402', kg: 114.5, you: true },
    { name: 'Rajesh Gupta', flat: 'Flat A-101', kg: 96 },
    { name: 'Sunita Verma', flat: 'Flat B-204', kg: 142 },
    { name: 'Vikram Malhotra', flat: 'Flat C-102', kg: 108 },
    { name: 'Remaining 18 Residents', flat: 'Various', kg: 1023.5 },
  ],
  crestview: [
    { name: 'Rohit Kapoor', flat: 'Tower A-1101', kg: 280 },
    { name: 'Meera Iyer', flat: 'Tower B-704', kg: 240 },
    { name: 'Kabir Anand', flat: 'Tower C-303', kg: 210 },
    { name: 'Neha Bansal', flat: 'Tower A-906', kg: 260 },
    { name: 'Arjun Rao', flat: 'Tower D-1202', kg: 210 },
  ],
  palm: [
    { name: 'Sanjay Nair', flat: 'Villa 12', kg: 90 }, { name: 'Deepa Menon', flat: 'Villa 7', kg: 80 },
    { name: 'Farhan Ali', flat: 'Villa 31', kg: 70 }, { name: 'Lakshmi Iyer', flat: 'Villa 18', kg: 80 },
  ],
  silveroak: [
    { name: 'Harpreet Bedi', flat: 'B-12', kg: 60 }, { name: 'Nisha Arora', flat: 'A-44', kg: 40 },
    { name: 'Tarun Bhatia', flat: 'C-08', kg: 30 }, { name: 'Simran Kaur', flat: 'D-21', kg: 20 },
  ],
  lotus: [
    { name: 'Imran Qureshi', flat: 'Tower 2-501', kg: 40 }, { name: 'Pooja Saxena', flat: 'Tower 1-203', kg: 30 },
    { name: 'Gaurav Tyagi', flat: 'Tower 3-808', kg: 30 },
  ],
  aura: [{ name: 'Kavita Rao', flat: 'Tower 1-101', kg: 1 }],
};

export const makeSplit = (societyId, total) => {
  const basis = splitBasis[societyId] || splitBasis.gvh;
  const sum = basis.reduce((a, r) => a + r.kg, 0);
  let running = 0;
  return basis.map((r, i) => {
    const share = i === basis.length - 1 ? Math.round((total - running) * 100) / 100 : Math.round((r.kg / sum) * total * 100) / 100;
    running += share;
    return { ...r, share };
  });
};

const payment = (o) => ({ ...o, split: makeSplit(o.societyId, o.amount), totalKg: (splitBasis[o.societyId] || []).reduce((a, r) => a + r.kg, 0) });

export const seed = () => ({
  version: 3,
  session: { role: null },
  societies: societiesSeed,
  joinRequests: [],
  users: {
    Person: { name: 'Ananya Sharma', email: 'ananya.sharma@greenvalley.org', phone: '+91 98765 43210', flat: 'Flat C-402', societyId: 'gvh', title: 'Committee President', avatar: null },
    Ngo: { name: 'Rajesh Singhania', org: 'EcoAction India Foundation', email: 'contact@ecoaction.org', phone: '+91 98112 04821', avatar: null },
    Bhangarwala: { name: 'Ramesh Kumar', email: 'ramesh.collector@ecotraders.in', phone: '+91 98112 44321', vehicle: 'Electric Cargo Trike (Capacity 350 kg, Reg: HR 26 EV 9912)', area: 'Sector 5 Riverside, Sector 54 & Golf Course Ext (Radius 5 km)', avatar: null },
  },

  // ---- Person / society ----
  society: {
    frequency: 'Bi-weekly', nextPickup: '30 September 2026', slot: '08:30 AM – 11:00 AM', collectorEta: '10:30 AM', surgeDate: '2025-11-10', surgeAccepted: false,
    stagingYard: 'Block B Covered Bay (Capacity 2,500 kg)', treasurerFlat: 'Flat C-102',
    material: { compost: 620, dry: 450, ewaste: 45, haz: 12 },
    yieldTotal: 1040.5, creditThisCycle: 572.5,
    treasurerNote: 'Last amended Oct 14, 2025 by CP',
    collections: [
      { date: 'Oct 24, 2025', material: 'Dry Recyclables', promised: 150, actual: 148 },
      { date: 'Oct 20, 2025', material: 'Compost / Wet', promised: 200, actual: 210 },
      { date: 'Oct 16, 2025', material: 'E-waste', promised: 50, actual: 32 },
      { date: 'Oct 11, 2025', material: 'Hazardous', promised: 12, actual: 12 },
    ],
    payouts: [
      { id: 'DISB-2025-1015', date: 'Oct 15, 2025', status: 'Disbursed', total: 7420, credit: 572.5, paymentId: 'PAY-1015' },
      { id: 'ESC-902', date: 'Sep 30, 2025', status: 'Archived', total: 6150, credit: 468, paymentId: 'PAY-0930' },
    ],
  },
  residents: [
    { id: 'r1', name: 'Vikram Malhotra', flat: 'Flat C-102', phone: '+91 98111 22334' },
    { id: 'r2', name: 'Rajesh Gupta', flat: 'Flat A-101', phone: '+91 98110 55672' },
    { id: 'r3', name: 'Sunita Verma', flat: 'Flat B-204', phone: '+91 98110 77341' },
    { id: 'r4', name: 'Rahul Mehta', flat: 'Flat A-305', phone: '+91 98111 90276' },
    { id: 'r5', name: 'Priya Sen', flat: 'Flat B-108', phone: '+91 98111 33409' },
  ],
  contributions: [
    { id: 'c1', date: 'Oct 24, 2025', category: 'Dry Recyclables', kg: 8.4 },
    { id: 'c2', date: 'Oct 21, 2025', category: 'Compost / Wet Waste', kg: 14.2 },
    { id: 'c3', date: 'Oct 17, 2025', category: 'E-waste', kg: 3.5 },
    { id: 'c4', date: 'Oct 12, 2025', category: 'Compost / Wet Waste', kg: 11.0 },
    { id: 'c5', date: 'Oct 08, 2025', category: 'Dry Recyclables', kg: 6.8 },
  ],
  personHistory: [
    { id: 'h1', type: 'p2p', date: 'Oct 24, 2025', title: 'Lot #EX-4038: Old Inverter Batteries & Wiring (Sold to Ramesh Kumar)', sub: 'Direct peer trade • Handover confirmed at Block C gate', amount: '+₹1,180', status: 'Completed' },
    { id: 'h2', type: 'contribution', date: 'Oct 21, 2025', title: 'Doorstep Weigh-in: Compost / Wet Waste', sub: 'Green bin collection • Route #04', amount: '14.2 kg', status: 'Verified' },
    { id: 'h3', type: 'payout', date: 'Oct 15, 2025', title: 'Q3 Society Maintenance Credit Payout', sub: 'Batch #DISB-2025-1015 • Shared communal recyclable fund', amount: '+₹572.50 Credit', status: 'Disbursed', paymentId: 'PAY-1015' },
    { id: 'h4', type: 'contribution', date: 'Oct 08, 2025', title: 'Doorstep Weigh-in: Dry Recyclables', sub: 'Cardboard & HDPE containers certified', amount: '6.8 kg', status: 'Verified' },
    { id: 'h5', type: 'payout', date: 'Sep 30, 2025', title: 'Bi-weekly Society Scrap Escrow Share', sub: 'September settlement cycle #ESC-902', amount: '+₹468 Credit', status: 'Disbursed', paymentId: 'PAY-0930' },
  ],

  // ---- Events (shared: Person Home, Society, NGO Events) ----
  events: [
    { id: 'ev1', title: 'Diwali E-Waste Clearance Drive', type: 'drive', societyId: 'gvh', date: 'Nov 02, 2025', time: '09:00 AM', location: 'Central Clubhouse Gate', desc: 'Community-wide drive for decommissioned electronics and small appliances. Sorting bins on site.', rsvps: 48, going: false, status: 'active' },
    { id: 'ev2', title: 'Compost Distribution Gala', type: 'green_event', societyId: 'all', date: 'Nov 09, 2025', time: '10:30 AM', location: 'Community Rooftop Plot', desc: 'Collect free finished compost for your balcony gardens and meet the composting volunteers.', rsvps: 32, going: false, status: 'active' },
    { id: 'ev3', title: 'Plastic Grading & Upcycling Masterclass', type: 'workshop', societyId: 'gvh', date: 'Nov 15, 2025', time: '04:00 PM', location: 'Eco Lab Room 2B', desc: 'Learn to grade plastics by resin code and turn clean scrap into value.', rsvps: 19, going: false, status: 'active' },
  ],

  // ---- NGO: contracts / batches / payments / flags ----
  contracts: [
    { id: 'CT-2025-01', societyId: 'crestview', material: 'Compost / Wet Waste', qty: 1200, rate: 4, status: 'Active', last: 'Oct 24, 2025' },
    { id: 'CT-2025-02', societyId: 'gvh', material: 'Dry Recyclables', qty: 800, rate: 14, status: 'Active', last: 'Oct 24, 2025' },
    { id: 'CT-2025-03', societyId: 'gvh', material: 'E-Waste', qty: 150, rate: 45, status: 'Active', last: 'Oct 16, 2025' },
    { id: 'CT-2025-04', societyId: 'gvh', material: 'Compost / Wet Waste', qty: 1200, rate: 4, status: 'Offered', last: 'Pending Initial' },
    { id: 'CT-2025-05', societyId: 'silveroak', material: 'E-Waste', qty: 150, rate: 45, status: 'Active', last: 'Oct 15, 2025' },
    { id: 'CT-2025-06', societyId: 'palm', material: 'E-Waste', qty: 320, rate: 45, status: 'Active', last: 'Sep 30, 2025' },
    { id: 'CT-2025-07', societyId: 'palm', material: 'Paper & Cardboard', qty: 650, rate: 9, status: 'Completed', last: 'Sep 30, 2025' },
    { id: 'CT-2025-08', societyId: 'lotus', material: 'Compost / Wet Waste', qty: 900, rate: 3.5, status: 'Cancelled', last: 'Aug 12, 2025' },
  ],
  batches: [
    { id: 'WB-409', societyId: 'crestview', contractId: 'CT-2025-01', material: 'Compost / Wet Waste', promised: 1200, rate: 4, date: 'Nov 03, 2025', driver: 'Ramesh Kumar', status: 'Confirmed', actual: null, weighed: false, paid: false },
    { id: 'WB-410', societyId: 'gvh', contractId: 'CT-2025-02', material: 'Dry Recyclables', promised: 800, rate: 14, date: 'Nov 04, 2025', driver: 'Dispatch Assigned', status: 'Dispatch Assigned', actual: null, weighed: false, paid: false },
    { id: 'WB-411', societyId: 'palm', contractId: 'CT-2025-06', material: 'E-Waste', promised: 320, rate: 45, date: 'Nov 06, 2025', driver: '', status: 'Pending Confirmation', actual: null, weighed: false, paid: false },
  ],
  payments: [
    payment({ id: 'PAY-1024', date: 'Oct 24, 2025', societyId: 'crestview', contractId: 'CT-2025-01', label: '#CT-2025-01 (Compost)', batch: 'WB-398', amount: 4800, status: 'Paid' }),
    payment({ id: 'PAY-1016', date: 'Oct 16, 2025', societyId: 'gvh', contractId: 'CT-2025-03', label: '#CT-2025-03 (E-Waste)', batch: 'WB-391', amount: 1440, status: 'Pending Payment' }),
    payment({ id: 'PAY-1015', date: 'Oct 15, 2025', societyId: 'gvh', contractId: 'CT-2025-02', label: '#CT-2025-02 (Dry Recyclables)', batch: 'DISB-2025-1015', amount: 7420, status: 'Disbursed' }),
    payment({ id: 'PAY-0930', date: 'Sep 30, 2025', societyId: 'gvh', contractId: 'CT-2025-02', label: '#CT-2025-02 (Dry Recyclables)', batch: 'ESC-902', amount: 6150, status: 'Disbursed' }),
    payment({ id: 'PAY-0930B', date: 'Sep 30, 2025', societyId: 'palm', contractId: 'CT-2025-06', label: '#CT-2025-06 (E-Waste)', batch: 'WB-377', amount: 14400, status: 'Disbursed' }),
    payment({ id: 'PAY-0915', date: 'Sep 15, 2025', societyId: 'silveroak', contractId: 'CT-2025-05', label: '#CT-2025-05 (E-Waste)', batch: 'WB-352', amount: 6750, status: 'Unpaid' }),
  ],
  flags: [
    { id: 'f1', societyId: 'gvh', status: 'Under Review', text: 'Flagged: Actual 32 kg vs Promised 50 kg E-waste', variance: '-36% variance', date: 'Oct 16, 2025', tone: 'danger' },
    { id: 'f2', societyId: 'lotus', status: 'Resolved with Penalty', text: 'Flagged: Wet waste contamination in dry paper batch', variance: '', date: 'Oct 18, 2025', tone: 'warn' },
  ],
  verification: { status: 'Pending', docName: 'ecoaction_registration_cert_2024.pdf', docSize: '2.4 MB', reviewer: '' },

  // ---- Exchange: lots, quotes, jobs ----
  lots: [
    {
      id: 'EX-4092', reqId: 'REQ-2025-0914', title: 'Household E-Waste & Small Appliances', category: 'E-waste', kg: 18, desc: 'Old CRT monitor, vintage radio, blender, assorted copper wiring and chargers. Approx 18kg.', items: 'CRT Monitor, Toaster, Blender, Wire Cables', grade: 'High Value Grade', owner: 'Ananya Sharma', ownerId: 'ananya', flat: 'Flat C-402', address: 'Plot 14, Riverside Ave, Sector 5', dist: 0.9, expires: '12 mins left', posted: '2 hours ago', status: 'open', jobId: null, suggested: 1440, photoCount: 5,
      sim: [{ collectorId: 'ramesh', price: 1440, eta: 20, delay: 5000 }]
    },
    {
      id: 'EX-4098', reqId: 'REQ-2025-0899', title: 'Decommissioned Copper Pipes & Brass Fittings', category: 'Metals & Brass', kg: 12, desc: 'Copper pipes, brass fittings from plumbing renovation (12kg). Cleaned, unmixed alloys.', items: 'Cleaned plumber scrap, unmixed alloys', grade: 'Premium Scrap', owner: 'Ananya Sharma', ownerId: 'ananya', flat: 'Flat C-402', address: 'Sector 5 Inner Ring Rd', dist: 1.4, expires: 'Expires in 28m', posted: 'Yesterday', status: 'open', jobId: null, suggested: 4200, photoCount: 2,
      sim: []
    },
    { id: 'EX-4085', reqId: 'REQ-2025-0885', title: 'Aluminium Cans & Tin Scrap', category: 'Metals & Brass', kg: 28, desc: 'Crushed aluminium cans and tin scrap, dry and unmixed.', items: 'Crushed cans, tin sheets', grade: 'Standard Scrap', owner: 'Priya Sen', ownerId: 'priya', flat: 'Flat B-108', address: 'Block B, Green Valley Heights', dist: 0.4, expires: 'Bidded 8m ago', posted: '1 hour ago', status: 'open', jobId: null, suggested: 3220, photoCount: 3, sim: [] },
    { id: 'EX-4071', reqId: 'REQ-2025-0842', title: 'Corrugated Boxes from Home Moving', category: 'Paper & Cardboard', kg: 35, desc: 'Corrugated boxes from home moving (35kg), flattened and tied.', items: 'Flattened corrugated boxes', grade: 'Standard Scrap', owner: 'Ananya Sharma', ownerId: 'ananya', flat: 'Flat C-402', address: 'Plot 14, Riverside Ave, Sector 5', dist: 0.9, expires: '', posted: 'Yesterday', status: 'accepted', jobId: 'JOB-8839', suggested: 315, photoCount: 1, sim: [] },
  ],
  quotes: [
    { id: 'q1', lotId: 'EX-4092', collectorId: 'surender', price: 1296, eta: 25, state: 'open', at: '1h ago' },
    { id: 'q2', lotId: 'EX-4092', collectorId: 'modern', price: 1170, eta: 45, state: 'open', at: '50m ago' },
    { id: 'q3', lotId: 'EX-4098', collectorId: 'modern', price: 3840, eta: 60, state: 'open', at: '3h ago' },
    { id: 'q4', lotId: 'EX-4085', collectorId: 'ramesh', price: 3220, eta: 15, state: 'open', at: '8m ago' },
    { id: 'q5', lotId: 'EX-4071', collectorId: 'ramesh', price: 315, eta: 20, state: 'accepted', at: 'Yesterday' },
  ],
  jobs: [
    { id: 'JOB-8839', lotId: 'EX-4071', collectorId: 'ramesh', resident: 'Ananya Sharma', phone: '+91 98765 43210', address: 'Plot 14, Riverside Avenue, Sector 5, Block C Gate', title: 'Corrugated Boxes Pickup', desc: 'Corrugated boxes from home moving, flattened and tied.', declaredKg: 35, price: 315, step: 0, etaMin: 8, distKm: 0.9, route: 'A-14', proposal: null, dispute: null, closed: false },
  ],
  bhang: {
    online: true, history: [
      { id: 'bh1', date: 'Oct 24, 2025', item: 'Old Inverter Batteries & Wiring (14 kg)', resident: 'Ananya Sharma', amount: 1180 },
      { id: 'bh2', date: 'Oct 22, 2025', item: 'Copper Pipes & Fittings (6 kg)', resident: 'Vikram Malhotra', amount: 2040 },
      { id: 'bh3', date: 'Oct 19, 2025', item: 'Cardboard Shipping Cartons (35 kg)', resident: 'Priya Sen', amount: 315 },
      { id: 'bh4', date: 'Oct 15, 2025', item: 'Assorted Plastic Crates (22 kg)', resident: 'Rahul Mehta', amount: 396 },
      { id: 'bh5', date: 'Oct 11, 2025', item: 'Aluminium Scrap & Cans (15 kg)', resident: 'Amit Verma', amount: 1725 },
    ], earnings: 48760, runs: 62
  },

  notifications: {
    Person: [
      { id: 'np1', title: 'Contract proposal received', text: 'EcoAction India Foundation offered a Compost / Wet Waste contract (1,200 kg/mo).', icon: 'handshake', to: '/my-society/settings', time: '2h ago', read: false },
      { id: 'np2', title: 'Payout disbursed', text: 'Your Q3 maintenance credit of ₹572.50 was credited.', icon: 'payments', to: '/history', time: '2d ago', read: true },
    ],
    Ngo: [
      { id: 'nn1', title: 'Weigh-in flag logged', text: 'Green Valley Heights E-waste batch: 32 kg vs 50 kg promised.', icon: 'flag', to: '/ngo/dashboard', time: '3h ago', read: false },
      { id: 'nn2', title: 'RSVPs are rolling in', text: 'Diwali E-Waste Clearance Drive has 48 confirmed attendees.', icon: 'event', to: '/ngo/events', time: 'Yesterday', read: true },
    ],
    Bhangarwala: [
      { id: 'nb1', title: 'New lot nearby', text: 'E-Waste Lot #EX-4092 (18 kg) was broadcast 0.9 km from you.', icon: 'cell_tower', to: '/bhangarwala/requests', time: '2h ago', read: false },
      { id: 'nb2', title: 'Payout received', text: '₹1,180 settled for Lot #EX-4038.', icon: 'payments', to: '/bhangarwala/history', time: '2d ago', read: true },
    ],
  },
});
