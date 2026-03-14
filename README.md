# URL Shortener (Emberlink)

## Overview
Emberlink is a full-stack URL Shortener built with Node.js, SQLite, and React (with shadcn-style components). Users can create 5-character short links, view recent links, and see click counts in a clean dashboard.

## Architecture
- Backend: Node.js + Express
- Database: SQLite (file-backed, with migrations)
- Frontend: React + Vite + Tailwind CSS + shadcn-style UI components

### Folder structure
- backend/ — Express API, SQLite access, migrations
- frontend/ — React app, UI components, Tailwind styling

## Setup
Prerequisites: Node.js 18+

1) Install dependencies (workspaces):
```
npm install
```

2) Run the app (one command):
```
npm run dev
```

Default ports:
- Backend: http://localhost:3000
- Frontend: http://localhost:3001

### Environment variables
Backend (optional) in `backend/.env`:
- `PORT` (default 3000)
- `BASE_URL` (default http://localhost:3000)
- `DB_FILE` (default `./data/url_shortener.db`)

Frontend (optional) in `frontend/.env`:
- `VITE_API_URL` (default http://localhost:3000)

## API Endpoints
- `POST /api/shorten`
  - Body: `{ "url": "https://example.com" }`
  - Response: `{ "shortUrl": "http://localhost:3000/abc12", "shortCode": "abc12" }`
- `GET /api/urls`
  - Response: `{ "urls": [ { ... } ] }`
- `GET /:shortCode`
  - Redirects (302) to original URL and increments click count
- `GET /health`
  - Simple health check

## Design Decisions
- Short codes are exactly 5 characters, base62, with collision retries.
- SQLite is used for simplicity and a clean file-based setup.
- Migrations are applied automatically at server startup.
- The UI uses shadcn-style primitives (Button/Input/Card) with a custom visual theme.

## Scaling Considerations
- `short_code` is indexed for fast lookups.
- Collision handling is done at the database layer (unique constraint) with retries.
- The architecture cleanly separates controllers, services, and models for easy replacement with PostgreSQL.
- For high load, move to PostgreSQL with pooled connections and horizontally scaled Node.js instances.

## Potential Improvements
- Add a caching layer for hot links and redirect throughput.
- Add rate limiting, abuse detection, and URL safety checks.
- Support custom domains and vanity aliases.
- Add authentication and per-user dashboards.

## Tests
Run backend tests:
```
npm run test
```

## Load Test
Run a quick load test (autocannon):
```
TARGET_URL=http://localhost:3000 npm run load:test
```

## Deliverables
- Demo video link or file location: [Demo Video](https://youtu.be/B0urO6C9b-s)
- AI usage details and conversation export: `docs/AI_USAGE.md`, `docs/AI_CONVERSATION_EXPORT.md`

## Demo Video Checklist
[Demo Video](https://youtu.be/B0urO6C9b-s)
Summary
1) Start the system with `npm run dev`
2) Create a shortened URL
3) Visit the short URL and show redirect working
4) Confirm the URL list updates
5) Show click count incrementing
6) Run the stress test under high load with `TARGET_URL=http://localhost:3000 npm run load:test`.

## AI Usage
This project was implemented with assistance from Codex for scaffolding, component structure, and iteration. All core logic, validation, and design decisions were reviewed and refined to meet the assessment requirements. See `docs/AI_USAGE.md` and include the full conversation export in `docs/AI_CONVERSATION_EXPORT.md`.
