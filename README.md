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

The Next.js layer now also includes an internal automation console at:

- `/internal/automation`

This console is intended for trusted internal use and works through same-origin Next.js API routes that proxy to `huizong-api`, which then bridges into the `AI guangao V3` control plane.
It is also protected by HTTP Basic authentication at the middleware layer for both the page itself and the `/api/automation/*` proxy routes.
The console now includes a deployment-health view backed by `GET /api/automation/health`, so internal operators can verify site proxy configuration and upstream bridge reachability before sending automation actions.
The automation proxy now also attaches a minimal tracing context to each internal request, including a generated trace id, the authenticated operator username, and the requested action name, so the website and backend layers can correlate manual automation triggers without waiting for a full audit-log system.
Manual `create_search_ad` and `optimize_ads` triggers are now also recorded into the site's Cloudflare D1 binding and can be viewed from the console through `GET /api/automation/audit/recent`.
When downstream action history includes persisted trace metadata, the console now prefers exact `traceId` correlation before falling back to `taskId` or nearby timestamps.
The upstream summary read-model exposed by `huizong-api` now also documents these downstream trace fields explicitly on action-history items, so the site is no longer depending on an undocumented `dict` shape there.

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

Bootstrap schema file:

- `database/form_db.bootstrap.sql`

Component schema files:

- `database/form_submissions.sql`
- `database/visitor_tracking.sql`
- `database/automation_audit_log.sql`

You can also let the Functions create the table automatically on first use, but keeping the SQL file in the repo makes the storage model explicit.
For production or a fresh environment, prefer applying the unified bootstrap file instead of relying on lazy table creation.

From [next-migration](E:/codex/coolyne.com/huizong-automation-site/next-migration):

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\init-form-db.ps1
```

Useful variants:

```powershell
# Local wrangler dev database
powershell -ExecutionPolicy Bypass -File .\scripts\init-form-db.ps1 -Local
```

```powershell
# Preview D1 database
powershell -ExecutionPolicy Bypass -File .\scripts\init-form-db.ps1 -Preview
```

## Environment variables

Create local secrets from the example file:

```bash
cp .dev.vars.example .dev.vars
```

Required variables:

- `RESEND_API_KEY` - your Resend API key
- `CONTACT_TO_EMAIL` - destination inbox, currently `sales@robotlyne.com`
- `CONTACT_FROM_EMAIL` - a verified sender on your Resend account, for example `website@your-domain.com`
- `ADMIN_USERNAME` - admin login username for `/admin/`
- `ADMIN_PASSWORD` - admin login password for `/admin/`
- `GA4_MEASUREMENT_ID` - optional Google Analytics 4 measurement ID, for example `G-XXXXXXXXXX`
- `HUIZONG_API_BASE_URL` - base URL of the `huizong-api` backend used by the internal automation console
- `HUIZONG_INTERNAL_API_TOKEN` - internal token used by the site server to call `huizong-api` automation bridge routes
- `INTERNAL_AUTOMATION_USERNAME` - optional dedicated Basic Auth username for `/internal/automation` and `/api/automation/*`
- `INTERNAL_AUTOMATION_PASSWORD` - optional dedicated Basic Auth password for `/internal/automation` and `/api/automation/*`

If the dedicated internal automation credentials are not set, these routes fall back to `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

Required binding:

- `FORM_DB` - Cloudflare D1 binding used to persist successful form submissions

For hosted environments, set the same values in Cloudflare Pages project variables or Vercel environment variables.

## Local development

This repo does not require a Node mail SDK, so no extra runtime package is needed. To test the full form flow locally you still need Node.js installed so you can run Wrangler.

1. Install Node.js 18+.
2. For `next-migration` production builds on Windows, prefer Node.js 20 LTS. The repo now includes `next-migration/.nvmrc` and declares `>=18.17 <25` in `next-migration/package.json` because Next.js 14 SWC loading was not reliable under local Node.js 25.
3. Create `.dev.vars` from `.dev.vars.example`.
4. Start a local Cloudflare Pages dev server:

```bash
npx wrangler pages dev public
```

5. Open the local URL shown by Wrangler.
6. Click `Speak With An Expert`, fill the modal form, and submit.

For the Next.js migration layer build verification:

```bash
cd next-migration
npm install
npm run build
```

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
2. Apply the D1 bootstrap schema with `next-migration/scripts/init-form-db.ps1`.
3. Add `ADMIN_USERNAME` and `ADMIN_PASSWORD` in Pages variables/secrets.
4. Add `HUIZONG_API_BASE_URL` and `HUIZONG_INTERNAL_API_TOKEN` if you want `/internal/automation` to work in the deployed site.
5. Add `INTERNAL_AUTOMATION_USERNAME` and `INTERNAL_AUTOMATION_PASSWORD`, or rely on the admin credentials fallback, if you want `/internal/automation` to remain access-controlled in production.
6. Redeploy the site after changing bindings, environment variables, or admin API code.

Cloudflare Worker Git-integration note:

- `Workers Builds: huizong-automation-site` should not be treated as the primary release signal anymore if it still appears on PRs.
- This check is tied to the old Cloudflare account that previously hosted the project and is now considered a legacy residual integration.
- The active Worker deployment path for the current site is `huizong-automation-site-next` under `next-migration/`, together with the explicit deployment flow documented in `DEPLOY_AUTOMATION_CONSOLE.md`.
- If the legacy `huizong-automation-site` build check is still connected in GitHub or Cloudflare, remove or disable that integration to avoid blocking releases on an obsolete account.

For the internal automation console deployment path on the Next.js Worker layer, use:

- [DEPLOY_AUTOMATION_CONSOLE.md](E:/codex/coolyne.com/huizong-automation-site/DEPLOY_AUTOMATION_CONSOLE.md)
- [next-migration/scripts/deploy-automation-console.ps1](E:/codex/coolyne.com/huizong-automation-site/next-migration/scripts/deploy-automation-console.ps1)

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
