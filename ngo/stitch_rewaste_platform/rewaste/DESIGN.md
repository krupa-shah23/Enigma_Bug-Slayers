---
name: ReWaste
colors:
  surface: '#f8faf9'
  surface-dim: '#d8dad9'
  surface-bright: '#f8faf9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f3'
  surface-container: '#eceeed'
  surface-container-high: '#e6e9e8'
  surface-container-highest: '#e1e3e2'
  on-surface: '#191c1c'
  on-surface-variant: '#40493d'
  inverse-surface: '#2e3131'
  inverse-on-surface: '#eff1f0'
  outline: '#707a6c'
  outline-variant: '#bfcaba'
  surface-tint: '#1b6d24'
  primary: '#0d631b'
  on-primary: '#ffffff'
  primary-container: '#2e7d32'
  on-primary-container: '#cbffc2'
  inverse-primary: '#88d982'
  secondary: '#835400'
  on-secondary: '#ffffff'
  secondary-container: '#fcab28'
  on-secondary-container: '#694300'
  tertiary: '#006419'
  on-tertiary: '#ffffff'
  tertiary-container: '#1d7f2a'
  on-tertiary-container: '#ceffc5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a3f69c'
  primary-fixed-dim: '#88d982'
  on-primary-fixed: '#002204'
  on-primary-fixed-variant: '#005312'
  secondary-fixed: '#ffddb5'
  secondary-fixed-dim: '#ffb957'
  on-secondary-fixed: '#2a1800'
  on-secondary-fixed-variant: '#643f00'
  tertiary-fixed: '#98f994'
  tertiary-fixed-dim: '#7ddc7a'
  on-tertiary-fixed: '#002204'
  on-tertiary-fixed-variant: '#005313'
  background: '#f8faf9'
  on-background: '#191c1c'
  surface-variant: '#e1e3e2'
typography:
  display-lg:
    fontFamily: Epilogue
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Epilogue
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Epilogue
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system establishes an institutional yet dynamic operational environment tailored for industrial circular economies, municipal waste brokers, and commercial recyclers. Balancing the rigor of enterprise B2B SaaS with the progressive vitality of sustainability initiatives, the interface conveys reliability, speed, and absolute material traceability. 

The aesthetic is Modern Corporate with Clean Tactile cues. Rather than relying on overt "eco-clichés" like distressed paper or illustrative leaves, it utilizes technical clarity, precise structural alignment, disciplined data visualization, and an unyielding commitment to legibility. The UI minimizes cognitive friction during high-frequency workflows (contract reconciliation, split payments, multi-party exchange maps) through spacious layouts, high-contrast typography, and purposeful state indicators.

## Colors
The color scheme provides functional clarity, deliberate hierarchy, and strict regulatory feedback:

- **Primary (`#2E7D32`)**: Used for primary calls-to-action, key state indicators, selected navigational markers, and authoritative focus rings.
- **Secondary / Attention (`#F9A825`)**: Signals pending states, actionable reviews, active bids, and informational alerts requiring operational attention.
- **Success / Tertiary (`#43A047`)**: Represents verified metrics, positive environmental offsets, completed transfers, and validated transactions.
- **Destructive / Flag (`#E53935`)**: Highlights SLA breaches, hazardous flags, rejected manifests, or destructive user actions.
- **Surfaces**: Canvas renders on an off-white, cool-tinted neutral (`#F5F7F6`) to diminish eye strain during extended operational sessions. Card and modal containers use pure white (`#FFFFFF`) to pop against the canvas.
- **Typography & Borders**: Primary text operates at `#1B1B1B` (WCAG AAA compliant), muted secondary copy sits at `#6B7280`, and subtle structural dividers use `#E5E7EB`.

## Typography
Headlines utilize Epilogue (set at weights 600 and 700) to introduce sharp geometric character, professional presence, and architectural stability across headers, metrics, and page anchors. Inter handles all body copy, dense data tables, transactional inputs, and status labels, ensuring peak legibility at micro-scales and high data density.

For responsive mobile screen sizes, `display-lg` scales down to `28px/36px`, and `headline-xl` scales down to `24px/32px`. Data metrics inside cards should prioritize numerical clarity using tabular numerals (`tnum`) for monetary volumes and material tonnage.

## Layout & Spacing
The layout employs a desktop-first responsive 12-column grid system capped at a maximum width of 1440px with auto-centering. 

- **Desktop (1024px+)**: 12-column grid, 24px (`1.5rem`) gutters, 32px (`2rem`) page margins.
- **Tablet (768px - 1023px)**: 8-column grid, 16px (`1rem`) gutters, 24px (`1.5rem`) page margins.
- **Mobile (Below 768px)**: 4-column fluid stack, 12px (`0.75rem`) gutters, 16px (`1rem`) page margins.

Standard internal card padding is anchored firmly at 24px (`space-lg`), delivering sufficient breathing room for multi-field transaction parameters. Stacking gaps between discrete domain cards default to 16px (`space-md`) or 24px (`space-lg`).

## Elevation & Depth
Depth hierarchy avoids heavy skeuomorphic shadows, relying on tonal surface contrast and calibrated ambient diffusion:

- **Level 0 (Base Canvas)**: `#F5F7F6` flat background.
- **Level 1 (Card & Content Blocks)**: `#FFFFFF` resting surface with a crisp ambient drop shadow: `0 2px 8px rgba(0, 0, 0, 0.06)` combined with a subtle hairline perimeter `border: 1px solid #E5E7EB`.
- **Level 2 (Hover / Focused Elements)**: Subtle lift using `0 6px 16px rgba(0, 0, 0, 0.08)` and active border recoloring to primary green.
- **Level 3 (Modals, Overlays, Floating Nav)**: `0 12px 32px rgba(0, 0, 0, 0.12)`, anchored by a 40% opacity black backdrop blur (`backdrop-filter: blur(4px)`).

## Shapes
A disciplined hybrid radius system is strictly enforced across UI categories:

- **Cards & Data Modules**: Defined at `rounded-xl` (12px / `0.75rem`) to maintain clear boundary segregation without feeling aggressively circular.
- **Form Controls & Action Buttons**: Structured at `rounded-lg` (8px / `0.5rem`) for a secure, clickable affordance.
- **Badges, Filters & Avatars**: Formatted as full pills (`rounded-full` / `9999px`) to immediately distinguish contextual status and categorical tags from interactive actionable components.

## Components

### Top Navigation Bar
- Fixed 64px height, `#FFFFFF` background, subtle bottom border (`1px solid #E5E7EB`).
- Left: Brand mark (ReWaste logo in primary `#2E7D32` with semibold logotype).
- Center: Horizontal navigation links (Inter `label-lg`, hover color shift to `#2E7D32`, active indicator with a 2px bottom bar).
- Right: System actions containing a Lucide notification bell icon with an active amber badge, followed by the user avatar and inline role badge (e.g., "Broker", "Recycler").

### Buttons
- **Primary**: Solid background `#2E7D32`, text `#FFFFFF`, 8px radius, height 40px, padding 0 20px, font `label-lg`. Hover: `#256628`. Active: `#1B4D1E`.
- **Secondary**: Transparent background, `1.5px solid #2E7D32`, text `#2E7D32`, height 40px, padding 0 20px. Hover: background `#2E7D32` at 6% opacity.
- **Destructive**: Transparent background, `1.5px solid #E53935`, text `#E53935`. Hover: background `#E53935` at 6% opacity.

### Status Badges
Pill-shaped containers (`rounded-full`), height 24px, padding 2px 10px, typography `label-sm`:
- **Active / Approved / Completed**: Background `#E8F5E9`, text `#2E7D32`.
- **Pending / Offered**: Background `#FFF8E1`, text `#F9A825`.
- **Flagged / Expired**: Background `#FFEBEE`, text `#E53935`.
- **Cancelled**: Background `#F3F4F6`, text `#6B7280`.

### Domain-Specific Components
- **SocietyCard**: Displays cooperative/communal collection entities. White card, 24px padding, 12px radius, soft shadow. Houses logo avatar, society name, material capacity metric, and integrated TrustScoreGauge.
- **TrustScoreGauge**: Circular or radial progress meter indicating partner reliability percentage. Primary green `#2E7D32` for scores >80%, amber `#F9A825` for 60-79%, red `#E53935` for <60%.
- **StatusStepper**: Horizontal pipeline visualizing exchange lifecycle (Created → In Transit → Verified → Dispersed). Nodes connect via 2px tracks. Active stages use green fills; incomplete stages use muted `#E5E7EB`.
- **MapPanel**: Interactive exchange routing interface. Light canvas styling, custom `#2E7D32` location pins for collection hubs, and `#F9A825` pins for pending pickups.
- **StatCard**: 24px padded container with headline metric (e.g., "1,240 Tons"), mini trend badge (+12%), and categorical subtitle (`body-sm` in `#6B7280`).
- **EventCard**: Chronological ledger tile tracking waste weigh-ins, drop-offs, and compliance sign-offs with left-hand vertical timestamp line.
- **QuoteCard**: Bidding modular card featuring supplier price, material grade tags, validity timer, and inline action buttons.
- **ContractRow**: High-density tabular listing component displaying contract ID, partner name, waste category, payment terms, and StatusBadge with hover highlight.
- **PaymentSplitModal**: Overlay modal displaying dynamic allocation ratios (Processor vs Logistics vs Municipal Fund) with numerical inputs, total reconciliation bar, and primary approval trigger.
- **PhotoUploadDropzone**: Dashed perimeter (`2px dashed #D1D5DB`), 12px radius, neutral canvas background, drag-and-drop Lucide upload icon, and image thumbnail preview array with trash triggers.