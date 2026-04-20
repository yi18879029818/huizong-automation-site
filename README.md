# Huizong Automation Site

This repository contains the Cloudflare Pages publish build for the Huizong Intelligent Automation website.

## Tech stack

- Static HTML/CSS/JS site under `public/`
- Shared site behavior in `public/assets/site-shell.js`
- Cloudflare Pages Functions backend under `functions/`
- Email delivery through the Resend HTTP API

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

## Environment variables

Create local secrets from the example file:

```bash
cp .dev.vars.example .dev.vars
```

Required variables:

- `RESEND_API_KEY` - your Resend API key
- `CONTACT_TO_EMAIL` - destination inbox, currently `kingman.chang@gmail.com`
- `CONTACT_FROM_EMAIL` - a verified sender on your Resend account, for example `website@your-domain.com`

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

## Cloudflare Pages deployment

This project is intended to deploy from GitHub to Cloudflare Pages.

- Build command: `exit 0`
- Build output directory: `public`
- Root directory: leave empty

The `functions/` directory is detected automatically by Cloudflare Pages.

## Vercel notes

If you deploy this site to Vercel instead of Cloudflare:

- Static assets in `public/` can stay the same.
- `functions/api/contact.js` is Cloudflare-specific and must be rewritten as a Vercel serverless function or edge route, typically `api/contact.js`.
- Reuse the same environment variables:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`
- Resend sender domains must still be verified before production sending will work.
