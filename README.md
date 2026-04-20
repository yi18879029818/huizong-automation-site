# Huizong Automation Site

This repository contains the Cloudflare Pages publish build for the Huizong Intelligent Automation website.

## Tech stack

- Static HTML/CSS/JS site under `public/`
- Shared site behavior in `public/assets/site-shell.js`
- Cloudflare Pages Functions backend under `functions/`
- Email delivery through the Resend HTTP API
- Submission storage through Cloudflare D1
- Admin dashboard at `/admin/`

## Contact form implementation

The primary contact form currently lives in the shared modal opened by the `Speak With An Expert` button.

Form fields:

- `fullName`
- `company`
- `email`
- `phone`
- `message`

Frontend behavior:

- Required-field validation before submit
- Email format validation
- Calls `POST /api/contact`
- Shows `发送成功` or `发送失败，请稍后重试`

Backend behavior:

- Runs in Cloudflare Pages Functions
- Trims and normalizes whitespace
- Rejects missing required fields
- Rejects overlong input
- Sends mail through Resend to the configured inbox
- Stores successful submissions in D1 when the `FORM_DB` binding is configured

## Admin dashboard

The repository now includes a lightweight admin panel at `/admin/`.

If you prefer a standalone local viewer instead of the hosted `/admin/` page, open:

- `admin.html`

This standalone file can now be double-clicked directly and does not require a visible login form.
It now includes:

- form submission records
- visitor journey tracking
- per-journey detail view
- CSV export for visitor journeys

Features in the first version:

- Admin login with `ADMIN_USERNAME` and `ADMIN_PASSWORD`
- Overview cards for total submissions, today, last 7 days, and this month
- Breakdown by form type
- Recent 14-day submission trend
- Latest submission list with submitted field values

The admin APIs are:

- `GET /api/admin/stats`
- `GET /api/admin/submissions?limit=30`
- `GET /api/admin/journeys`
- `GET /api/admin/journey?id=<session_id>`

Both endpoints require HTTP Basic authentication using the configured admin credentials.

The admin APIs now return CORS headers so a local HTML file can read:

- `GET /api/admin/stats`
- `GET /api/admin/submissions?limit=30`
- `GET /api/public-admin/submissions?limit=1000`

## Visitor journey tracking

The website now records visitor journey data to D1 through these runtime endpoints:

- `POST /api/track/visit`
- `POST /api/track/pageview-complete`
- `POST /api/track/conversion`

Tracked information includes:

- visitor/session identifiers
- landing page
- source and medium
- country and IP from Cloudflare headers
- device type
- pageviews
- page duration
- conversion clicks such as `WeChat`, `WhatsApp`, `电话`, `邮箱`, and `表单`

Visitor journey schema reference:

- `database/visitor_tracking.sql`

## D1 setup

Create a Cloudflare D1 database and bind it to this Pages project as `FORM_DB`.

Suggested schema file:

- `database/form_submissions.sql`

You can also let the Functions create the table automatically on first use, but keeping the SQL file in the repo makes the storage model explicit.

## Environment variables

Create local secrets from the example file:

```bash
cp .dev.vars.example .dev.vars
```

Required variables:

- `RESEND_API_KEY` - your Resend API key
- `CONTACT_TO_EMAIL` - destination inbox, currently `kingman.chang@gmail.com`
- `CONTACT_FROM_EMAIL` - a verified sender on your Resend account, for example `website@your-domain.com`
- `ADMIN_USERNAME` - admin login username for `/admin/`
- `ADMIN_PASSWORD` - admin login password for `/admin/`

Required binding:

- `FORM_DB` - Cloudflare D1 binding used to persist successful form submissions

For hosted environments, set the same values in Cloudflare Pages project variables or Vercel environment variables.

## Local development

This repo does not require a Node mail SDK, so no extra runtime package is needed. To test the full form flow locally you still need Node.js installed so you can run Wrangler.

1. Install Node.js 18+.
2. Create `.dev.vars` from `.dev.vars.example`.
3. Start a local Cloudflare Pages dev server:

```bash
npx wrangler pages dev public
```

4. Open the local URL shown by Wrangler.
5. Click `Speak With An Expert`, fill the modal form, and submit.

If you only open `public/index.html` directly in the browser, the `/api/contact` endpoint will not exist.

For the standalone admin viewer:

1. Deploy the latest repo so the admin APIs and visitor tracking APIs are live.
2. Open `admin.html` directly in your browser.
3. The page will automatically read from `https://huizong-automation-site.pages.dev` using the credentials embedded in the file.
4. Click `Refresh` whenever you want the newest data.

## Cloudflare Pages deployment

This project is intended to deploy from GitHub to Cloudflare Pages.

- Build command: `exit 0`
- Build output directory: `public`
- Root directory: leave empty

The `functions/` directory is detected automatically by Cloudflare Pages.

Additional production setup:

1. Add the `FORM_DB` D1 binding in Pages settings.
2. Add `ADMIN_USERNAME` and `ADMIN_PASSWORD` in Pages variables/secrets.
3. Redeploy the site after changing bindings, environment variables, or admin API code.

Note:

- `GET /api/public-admin/submissions` is intentionally open so the standalone `admin.html` can work without login.
- That means anyone who knows this endpoint can read the exported submission list.
- Visitor journey tracking only starts collecting data after the tracking-enabled code is deployed. Old sessions cannot be backfilled automatically.

## Vercel notes

If you deploy this site to Vercel instead of Cloudflare:

- Static assets in `public/` can stay the same.
- `functions/api/contact.js` is Cloudflare-specific and must be rewritten as a Vercel serverless function or edge route, typically `api/contact.js`.
- Reuse the same environment variables:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`
- Resend sender domains must still be verified before production sending will work.
