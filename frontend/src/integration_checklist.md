# Integration Audit & Screen Mapping Checklist

## Repo Overview & Environment Setup
- **Frontend**: Vite + React 18 + Tailwind CSS (located in `frontend/`)
- **Backend**: Express + MongoDB Mongoose + Socket.IO (located in `backend/`)
- **API Base URL**: `http://localhost:3000/api` (dev default)
- **Sockets URL**: `http://localhost:3000`

---

## Response & Error Format Standard
- **Success Response**: `{ success: true, data: { ... } }`
- **Error Response**: `{ success: false, error: { code: string, message: string, details?: any } }`

---

## Screen → Endpoint / Socket Event Mapping

### 1. Auth & Foundation (Phase 1 & 2)
- **E01 POST /api/auth/signup**: Person, NGO, Bhangarwala signup
- **E02 POST /api/auth/login**: Login for all user types
- **E03 POST /api/auth/logout**: Token revocation
- **E04 GET /api/auth/me**: Session restoration & user context retrieval
- **E05 POST /api/auth/refresh-token**: Access token rotation using refresh token
- **Sockets (S01–S11)**: Authenticated handshake via `{ auth: { token: accessToken } }`

---

### 2. Person Portal (Phase 3)
| Screen | Route | Endpoints / Socket Events Used |
| :--- | :--- | :--- |
| **Login** | `/person/login` | E01 (Signup), E02 (Login) |
| **Home** | `/home` | E04 (`/auth/me`), E06 (`/societies`), E11 (`/contributions/summary`), E12 (`/contributions/me`), E40 (`/person/impact`), E46 (`/events`), S01 (`contribution:logged`), S11 (`event:created`) |
| **Societies** | `/societies` | E06 (`/societies`), E08 (`POST /societies` - create), E09 (`POST /societies/:id/join`) |
| **Society Detail** | `/societies/:id` | E07 (`GET /societies/:id`), E09 (`POST /societies/:id/join`) |
| **My Society** | `/my-society` | E10 (`GET /societies/my`), E14 (`GET /societies/my/leaderboard`), E15 (`GET /societies/my/officers`), E16 (`POST /societies/my/officers`), E17 (`DELETE /societies/my/officers/:id`), E18 (`GET /societies/my/contributions`), E19 (`POST /societies/my/contributions/:id/verify`) |
| **Society Settings** | `/my-society/settings` | E10 (`GET /societies/my`), E13 (`PATCH /societies/my/settings`), E15 (`GET /societies/my/officers`), E16 (`POST /societies/my/officers`), E17 (`DELETE /societies/my/officers/:id`) |
| **Log Contribution** | `/log-contribution` | E11 (`POST /contributions`), E06/E10 (`/societies`), E37 (`POST /uploads`) |
| **Exchange** | `/exchange` | E20 (`GET /p2p/requests`), E21 (`POST /p2p/requests`), E22 (`PATCH /p2p/requests/:id/cancel`) |
| **Quotes** | `/exchange/:requestId/quotes` | E20 (`GET /p2p/requests/:id`), E23 (`GET /p2p/requests/:id/quotes`), E24 (`POST /p2p/requests/:id/quotes/:quoteId/accept`), S02 (`quote:received`), S03 (`quote:rejected`) |
| **Tracking** | `/exchange/:jobId/tracking` | E25 (`GET /p2p/jobs/:id`), S04 (`job:status`), S05 (`bhangarwala:location`) |
| **History** | `/history` | E26 (`GET /p2p/jobs/my`), E27 (`POST /p2p/jobs/:id/rate`), E12 (`GET /contributions/me`) |
| **Profile** | `/profile` | E04 (`/auth/me`), E40 (`/person/impact`), E03 (`/auth/logout`) |

---

### 3. NGO Portal (Phase 4)
| Screen | Route | Endpoints / Socket Events Used |
| :--- | :--- | :--- |
| **Login** | `/ngo/login` | E01 (Signup), E02 (Login) |
| **Verification** | `/ngo/verification` | E41 (`GET /ngo/verification`), E42 (`POST /ngo/verification`), E56 (`POST /ngo/verification/demo-approve`) |
| **Dashboard** | `/ngo/dashboard` | E43 (`GET /ngo/dashboard`), E41 (`GET /ngo/verification`) |
| **Societies** | `/ngo/societies` | E06 (`GET /societies`) |
| **Society Detail** | `/ngo/societies/:id` | E07 (`GET /societies/:id`), E44 (`POST /contracts`) |
| **New Contract** | `/ngo/contracts/new` | E06 (`GET /societies`), E44 (`POST /contracts`) |
| **Contracts** | `/ngo/contracts` | E45 (`GET /contracts`), E47 (`POST /contracts/:id/terminate`), S06 (`contract:proposed`), S07 (`contract:signed`) |
| **Collections** | `/ngo/collections` | E48 (`GET /contracts/collections`), E49 (`POST /contracts/collections`), S08 (`collection:logged`) |
| **Payments** | `/ngo/payments` | E50 (`GET /payments`), E51 (`POST /payments/create-intent`), E52 (`POST /payments/verify`), E53 (`POST /payments/simulate-webhook`), S09 (`payment:completed`), S10 (`payout:disbursed`) |
| **Events** | `/ngo/events` | E54 (`GET /events`), E55 (`POST /events`), E57 (`POST /events/:id/register`), S11 (`event:created`) |

---

### 4. Bhangarwala Portal (Phase 5)
| Screen | Route | Endpoints / Socket Events Used |
| :--- | :--- | :--- |
| **Login** | `/bhangarwala/login` | E01 (Signup), E02 (Login) |
| **Requests** | `/bhangarwala/requests` | E28 (`GET /bhangarwala/requests`), E29 (`POST /bhangarwala/requests/:id/quotes`), E30 (`PATCH /bhangarwala/status`), E35 (`GET /bhangarwala/jobs`) |
| **Active Job** | `/bhangarwala/active-job` | E35 (`GET /bhangarwala/jobs`), E31 (`POST /bhangarwala/location`), E33 (`POST /bhangarwala/jobs/:id/status`), E34 (`POST /bhangarwala/jobs/:id/complete`) |
| **History** | `/bhangarwala/history` | E35 (`GET /bhangarwala/jobs`), E36 (`GET /bhangarwala/earnings`) |
| **Profile** | `/bhangarwala/profile` | E04 (`/auth/me`), E30 (`PATCH /bhangarwala/status`), E36 (`GET /bhangarwala/earnings`), E03 (`/auth/logout`) |

---

## Key Integration Rules & Contracts
1. **Access Token Storage**: Stored in `localStorage` (`rewaste_access_token`) and `refreshToken` in `localStorage` (`rewaste_refresh_token`).
2. **Auto Refresh**: Handled automatically on `401 TOKEN_EXPIRED` using E05.
3. **Role Gating**: `user.role` + `user.societyRole` checked in UI components.
4. **Backend Preserved**: 0 edits to backend code.
