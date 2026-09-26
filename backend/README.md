# Smart Circular Economy & Waste Exchange Platform — Backend

**CSI Enigma 5.0 · PS 6 (Sustainability Track)**

Node.js + Express REST API with Socket.IO real-time events.

## Stack

- Node.js 20 + Express
- MongoDB + Mongoose
- Socket.IO
- JWT (jsonwebtoken) + bcrypt
- multer (file uploads, local `/uploads`)

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with nodemon |
| `npm test` | Run Jest test suite |
| `npm run gate` | lint + test + coverage (CI gate) |
| `npm run lint` | ESLint |
| `npm run seed` | Seed demo data |

## Environment Variables

See `.env.example` for required variables:
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `DEMO_MODE`
- `PAYMENT_MODE`

## API

57 REST endpoints (E01–E57) + 11 Socket.IO events (S01–S11).
See `backend-api.md` for the full specification.
