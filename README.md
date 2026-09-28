# RockGuard AI

RockGuard AI is a frontend-only demonstration of a geotechnical monitoring and early-warning console for open-pit mines. It is built to support a future FastAPI integration; it does not connect to sensors, run a real AI model, or initiate operational actions.

## Features

- Responsive operator workspace with dashboard, live monitoring, prediction, alerts, history, zone directory/detail, reports, and settings routes.
- Accessible demo login, navigation drawer, alert detail dialog, input validation, chart controls, and mobile-friendly tables.
- Recharts sensor and risk visualizations with clearly identified illustrative values.
- Typed service layer for health, monitoring, predictions, alerts, prediction history, and mine zones.
- All mock fixtures are maintained in `src/data/mockData.ts` and services switch to the API when `VITE_MOCK=false`.
- CSV export works locally against demo zone fixtures. Report generation UI is a backend integration placeholder.

## Tech stack

React 18, TypeScript strict mode, Vite, Tailwind CSS, React Router 6, Lucide React, and Recharts.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
npm run build
npm run preview
```

Vite prints the local development URL after `npm run dev` starts.

## Environment

Copy `.env.example` to `.env.local` to configure the frontend. Do not put secrets in Vite environment variables; values prefixed with `VITE_` are included in the browser bundle.

```dotenv
VITE_MOCK=true
VITE_API_BASE_URL=http://localhost:8000
```

`VITE_MOCK` defaults to mock mode unless explicitly set to `false`. Vite requires this `VITE_` prefix for client-side environment values (the shorthand `MOCK=true/false` is not exposed to browser code). In mock mode, the top banner identifies illustrative data. In API mode, `VITE_API_BASE_URL` is the single base URL used by `src/services/api.ts`.

## Switching to FastAPI

1. Start the backend with CORS configured for the Vite development origin.
2. Set `VITE_MOCK=false` and `VITE_API_BASE_URL` to the backend origin in `.env.local`.
3. Keep the response contracts below aligned with `src/types/index.ts`. Service functions are the boundary; components should continue calling the services rather than `fetch` directly.
4. Add authentication and authorization on the backend before using real mine data. The included login is only local demo navigation and does not secure an API.

## API contract

All routes are relative to `VITE_API_BASE_URL`. JSON responses are expected. Lists currently use plain JSON arrays; pagination/envelopes can be introduced with corresponding service/type changes.

| Method | Endpoint | Expected response |
| --- | --- | --- |
| GET | `/api/health` | `{ "status": "ok" }` |
| POST | `/api/predict` | `PredictionResponse` |
| GET | `/api/monitoring` | `MonitoringData[]` |
| GET | `/api/alerts` | `Alert[]` |
| GET | `/api/predictions` | `PredictionHistoryItem[]` |
| GET | `/api/zones` | `MineZone[]` |
| GET | `/api/zones/:id` | `MineZone` |
| PATCH | `/api/alerts/:id` | Updated `Alert` |

Example prediction request:

```json
{
  "slopeAngle": 38.7,
  "rainfall": 4.2,
  "vibration": 2.6,
  "displacement": 4.4,
  "crackWidth": 5.1,
  "moisture": 36,
  "temperature": 19.3,
  "zoneId": "zone-a"
}
```

Example prediction response:

```json
{
  "riskLevel": "Medium",
  "riskScore": 42,
  "contributingFactors": ["Illustrative factor from backend"],
  "timestamp": "2026-09-28T08:35:00Z",
  "confidence": 0.71,
  "advisory": "Review site procedures with qualified personnel."
}
```

`RiskLevel` is `Low | Medium | High | Critical`. Alerts use `open | reviewed | closed`. Monitoring records include a timestamp, zone ID, slope angle, rainfall, vibration, displacement, crack width, moisture, and temperature. Zone records include ID, name, sector, risk band/score, sensor availability, and last-reading label. `GET /api/monitoring` accepts optional `zone_id` and `limit` query parameters. The interactive time-series chart can use a backend extension endpoint at `/api/monitoring/timeseries?range=24H`; this endpoint is not part of the required initial contract and should be added server-side before API mode uses that view.

## Deployment and safety notes

Build with `npm run build` and serve the generated `dist/` directory from a static host configured to fall back to `index.html` for client-side routes. Configure the API origin at build time and enable appropriate CORS, TLS, authentication, authorization, validation, audit logging, and operational review in FastAPI. Demo fixtures and the mock scoring routine are illustrative only and must never be treated as a validated risk model or safety system.

## Acceptance checklist

- [x] All requested routes navigate, including zone details.
- [x] Responsive sidebar, site navbar, demo-data banner, and local demo login.
- [x] Prediction form validation, mock service call, loading feedback, and result card.
- [x] Interactive Recharts monitoring and risk trend visualizations.
- [x] Clickable schematic zones and zone detail monitoring.
- [x] Alert search/filter/sort/pagination and review/close dialog actions.
- [x] Searchable, filterable, paginated prediction history with detail dialog.
- [x] Reports/CSV export and settings UI for future backend integration.
- [x] Demo fixtures isolated and visibly labeled; service interfaces ready for API mode.
- [x] Strict TypeScript production build passes.