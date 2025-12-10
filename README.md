# BookMyShowClone

This repository is a BookMyShow-like clone with a Node/Express backend (MongoDB) and a React + Vite frontend. The project is split into two top-level folders: `Backend` and `Frontend`.

This README explains the repository layout, what each folder contains, environment variables needed, and how to run the app locally.

## Quick start

Prerequisites:
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

To run the project locally:

1. Backend

	 ```bash
	 cd Backend
	 npm install
	 # run with node
	 node server.js

	 # or if you prefer automatic reload (nodemon)
	 npx nodemon server.js
	 ```

	 The backend listens on `process.env.PORT` and exposes the API under the `/bms` prefix (for example: `/bms/users`).

2. Frontend

	 ```bash
	 cd Frontend
	 npm install
	 npm run dev
	 ```

	 The frontend is a Vite React app. Building the app will write the production build into `Frontend/dist` which the backend can serve as static files when deployed.

## Environment variables

Create a `.env` file in `Backend/` with at least the following keys (the code expects these names):

- `PORT` — port for the backend server (e.g. 5000)
- `MONGODB_URL` — MongoDB connection string
- `SECRET_KEY` — JWT secret used for authentication
- `GMAIL_USER` — email address used by nodemailer (for OTP/ticket emails)
- `GMAIL_APP_PASSWORD` — app password for the Gmail account
- `STRIPE_KEY` — your Stripe secret API key

Example `.env`:

```
PORT=5000
MONGODB_URL=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/bookmyshow
SECRET_KEY=someLongRandomSecret
GMAIL_USER=youremail@gmail.com
GMAIL_APP_PASSWORD=app-specific-password
STRIPE_KEY=sk_test_...
```

Security note: Never commit your `.env` file. Use environment configuration for production.

## Project structure and purpose of each folder/file

Top-level:
- `Backend/` — Node/Express server and API code.
- `Frontend/` — Vite + React frontend application.

Backend folder (`Backend/`):
- `server.js` — Application entry point. Connects to the database, configures middleware (helmet, cors, rate-limit, mongo-sanitize) and mounts routes under `/bms`.
- `config/db.js` — Mongoose connection helper that uses `process.env.MONGODB_URL`.
- `controllers/` — Route handlers for each resource:
	- `UserController.js` — registration, login, current user, forgot/reset password flows.
	- `movieController.js` — movie-related endpoints (create/list/update/delete) (see file for details).
	- `showController.js` — show timings and seat logic.
	- `theatreController.js` — theatre CRUD.
	- `bookingController.js` — payment (Stripe), booking, booking-list. Uses `process.env.STRIPE_KEY` and `EmailHelper` for ticket emails.
- `middleware/authorizationMiddleware.js` — JWT verification for protected routes (expects `process.env.SECRET_KEY`).
- `models/` — Mongoose schemas for `user`, `movie`, `show`, `theatre`, and `booking`.
- `routes/` — Express routes mapping API endpoints to controllers:
	- `userRoute.js` — `/bms/users/*`
	- `movieRoute.js` — `/bms/movies/*` (protected)
	- `showRoute.js` — `/bms/shows/*` (protected)
	- `theatreRoute.js` — `/bms/theatres/*` (protected)
	- `bookingRoute.js` — `/bms/bookings/*` (protected)
- `utils/emailHelper.js` — Helper to send templated emails via nodemailer. Uses `GMAIL_USER` and `GMAIL_APP_PASSWORD` env values. Also contains `email_templates/` with `otp.html` and `ticketTemplate.html`.

Frontend folder (`Frontend/`):
- `index.html`, `src/` — Vite React application source.
- `src/App.jsx` — top-level app component and routes.
- `src/api/` — thin API wrappers for frontend to call backend endpoints (`movie.js`, `user.js`, `booking.js`, `show.js`, `theatre.js`, and an `index.js` for base config).
- `src/components/` — re-usable React components (Login, Registration, ProtectedRoute, BookShow, SingleMovie, etc.).
- `src/pages/` — larger page components (Admin, Partner, Profile pages).
- `src/redux/` — Redux store slices used for authentication and loader states.
- `package.json` — available scripts:
	- `dev` — start Vite dev server
	- `build` — build frontend for production
	- `preview` — preview built app

Frontend dependencies include React, React Router, Redux Toolkit, Ant Design and Axios.

## API overview (high-level)

Base path: `/bms`

Major routes:
- `/bms/users` — registration, login, forgot/reset password, user profile.
- `/bms/movies` — movie CRUD (protected)
- `/bms/theatres` — theatre CRUD (protected)
- `/bms/shows` — shows CRUD, seats (protected)
- `/bms/bookings` — booking and payments via Stripe (protected)

Authentication: JWT tokens issued on login (UserController.loginUser) — include `Authorization: Bearer <token>` header for protected endpoints.

Email & Payments:
- Email (OTP, tickets) uses `EmailHelper` and Gmail configuration from env variables.
- Payments use Stripe SDK; set `STRIPE_KEY` in the backend `.env`.

## Running locally (step-by-step)

1. Backend

	 - Create `Backend/.env` with the variables listed above.
	 - Install dependencies and start the server:

		 ```bash
		 cd Backend
		 npm install
		 node server.js
		 # or use nodemon for development
		 npx nodemon server.js
		 ```

	 - By default the backend will attempt to serve static files from `Frontend/dist` if present (helpful for production/simple deployments).

2. Frontend

	 - Install and run the dev server:

		 ```bash
		 cd Frontend
		 npm install
		 npm run dev
		 ```

	 - When building for production, run `npm run build` and place the build into `Frontend/dist` — the backend will serve that by default.

## Useful commands

- Install backend deps: `cd Backend && npm install`
- Start backend: `node server.js` (or `npx nodemon server.js`)
- Install frontend deps: `cd Frontend && npm install`
- Start frontend (dev): `cd Frontend && npm run dev`
- Build frontend: `cd Frontend && npm run build`

## Quick troubleshooting

- If API requests fail with 401: check that the JWT `SECRET_KEY` env value is set and that your client is sending `Authorization: Bearer <token>`.
- If Mongo connection fails: verify `MONGODB_URL` and that MongoDB permits your IP (for Atlas).
- If email sending fails: ensure `GMAIL_USER` and `GMAIL_APP_PASSWORD` are correct and that Gmail account allows SMTP (app password recommended).

## Contributing

Feel free to open issues and pull requests. Keep the following in mind:
- Add or update tests when changing user- or payment-related code.
- Don't commit secret keys or `.env` files.

## License

This repository does not contain a license file. Add one if you plan to make the project public with a license.

---

If you want, I can also:
- add a `start` script to `Backend/package.json` (e.g. `node server.js`) and a `dev` script for convenience,
- create a sample `.env.example` in `Backend/` with all env names (but placeholder values), or
- add a CONTRIBUTING.md with local dev and PR guidelines.

Tell me which of those (or any other improvements) you'd like me to do next.

# BookMyShowClone app