# Internal Automation Console Deployment

This playbook covers the Worker-side deployment for:

- `/internal/automation`
- `/api/automation/*`

It assumes the upstream `huizong-api` internal bridge is already deployed and reachable.

## D1 prerequisite

Before you rely on the console in a fresh environment, initialize `FORM_DB` with:

```powershell
cd next-migration
powershell -ExecutionPolicy Bypass -File .\scripts\init-form-db.ps1
```

This applies [form_db.bootstrap.sql](E:/codex/coolyne.com/huizong-automation-site/database/form_db.bootstrap.sql), which includes:

- form submissions
- visitor tracking
- internal automation audit records

## Required values

- `HUIZONG_API_BASE_URL`
- `HUIZONG_INTERNAL_API_TOKEN`
- `INTERNAL_AUTOMATION_USERNAME`
- `INTERNAL_AUTOMATION_PASSWORD`

`HUIZONG_API_BASE_URL` is not secret. The other three values should be treated as secrets.

## Current backend target

As of `2026-05-18`, the repo docs point to this currently observed `huizong-api` Sealos origin:

- `https://gaxlgfkemprx.usw-1.sealos.app`

Use that only if it is still your live `huizong-api` origin on the day you deploy.

## One-command deployment helper

From [next-migration](E:/codex/coolyne.com/huizong-automation-site/next-migration):

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-automation-console.ps1 `
  -ApiBaseUrl "https://gaxlgfkemprx.usw-1.sealos.app" `
  -SiteBaseUrl "https://www.coolyne.com"
```

What the script does:

1. Builds the Next.js app with `node@20`
2. Builds the OpenNext Cloudflare worker package
3. Sets these Cloudflare Worker secrets:
   - `HUIZONG_INTERNAL_API_TOKEN`
   - `INTERNAL_AUTOMATION_USERNAME`
   - `INTERNAL_AUTOMATION_PASSWORD`
4. Deploys with `wrangler.deploy.jsonc`
5. Calls `GET /api/automation/health` with Basic Auth

If a value is not passed in the command, the script prompts for it.

## Useful switches

```powershell
# Build only, do not touch Cloudflare
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-automation-console.ps1 `
  -ApiBaseUrl "https://gaxlgfkemprx.usw-1.sealos.app" `
  -SkipSecrets `
  -SkipDeploy `
  -SkipHealthCheck
```

```powershell
# Deploy to Cloudflare but skip the final health call
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-automation-console.ps1 `
  -ApiBaseUrl "https://gaxlgfkemprx.usw-1.sealos.app" `
  -SiteBaseUrl "https://www.coolyne.com" `
  -SkipHealthCheck
```

```powershell
# Use the route-binding config when you intentionally need custom-domain config in the deploy step
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-automation-console.ps1 `
  -ApiBaseUrl "https://gaxlgfkemprx.usw-1.sealos.app" `
  -DeployConfig "wrangler.jsonc" `
  -SiteBaseUrl "https://www.coolyne.com"
```

## What success looks like

After a successful run:

- `/internal/automation` prompts for Basic Auth
- `/api/automation/health` returns `ok: true`
- the health payload shows:
  - `configured: true`
  - `site_proxy.baseUrlConfigured: true`
  - `site_proxy.internalTokenConfigured: true`
  - upstream bridge status from `huizong-api`

## Manual fallback

If you need to do this manually:

1. Build with Node 20:
   - `npx -y node@20 ./node_modules/next/dist/bin/next build`
   - `npx -y node@20 ./node_modules/@opennextjs/cloudflare/dist/cli/index.js build`
2. Set Worker secrets:
   - `npx wrangler secret put HUIZONG_INTERNAL_API_TOKEN --config wrangler.deploy.jsonc`
   - `npx wrangler secret put INTERNAL_AUTOMATION_USERNAME --config wrangler.deploy.jsonc`
   - `npx wrangler secret put INTERNAL_AUTOMATION_PASSWORD --config wrangler.deploy.jsonc`
3. Deploy with the upstream base URL injected:
   - `npx wrangler deploy --config wrangler.deploy.jsonc --var HUIZONG_API_BASE_URL:https://gaxlgfkemprx.usw-1.sealos.app --keep-vars`
4. Verify:
   - `curl -u <user>:<pass> https://www.coolyne.com/api/automation/health`
