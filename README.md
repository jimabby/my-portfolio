# My Portfolio

Personal portfolio and blog built with React + Vite, deployed on Vercel.

## Tech Stack

- **React 19** + React Router v8
- **Vite** (build tool)
- **Plain CSS** (component-level styles)

## Available Scripts

### `npm run dev`

Starts the development server at [http://localhost:5173](http://localhost:5173).

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run preview`

Previews the production build locally.

## Deployment

Deployed on **Vercel**. Every push to `master` triggers an automatic redeploy.

The production build generates route-specific HTML metadata for the blog index
and every article so link previews work without running JavaScript.

## Environment variables

Copy `.env.example` to `.env.local` for local development and configure the
same values in Vercel:

- `GEMINI_API_KEY` enables the portfolio assistant.
- `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, and `EMAILJS_PUBLIC_KEY` enable
  the server-side contact endpoint.
- `EMAILJS_PRIVATE_KEY` is optional when EmailJS private-key authentication is
  enabled.
- The Upstash variables are strongly recommended in production so assistant
  and contact rate limits are shared across serverless instances.
