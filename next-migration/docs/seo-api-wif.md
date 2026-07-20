# Search Console API with Workload Identity Federation

The repository uses GitHub Actions OIDC and Google Workload Identity Federation. No service-account JSON key is required.

## Google Cloud resources

- Project: `coolyne-ga4-bigquery`
- Workload identity pool: `github-actions`
- Provider: `github`
- Provider resource: `projects/1097518421419/locations/global/workloadIdentityPools/github-actions/providers/github`
- Service account: `ga4-report-reader@coolyne-ga4-bigquery.iam.gserviceaccount.com`
- Allowed repository and branch: `yi18879029818/huizong-automation-site`, `refs/heads/main`

The provider is restricted to the repository main branch and the service account has the `roles/iam.workloadIdentityUser` binding for that repository only.

## GitHub secret

Add `PAGESPEED_API_KEY` under repository Settings > Secrets and variables > Actions. Search Console does not need a GitHub secret; the workflow obtains a short-lived token through WIF.

## Search Console permission

Add the service-account email as a user of the exact Search Console property `sc-domain:coolyne.com`. The Google Cloud service account and Search Console property permission are separate.

## Workflow

Run `SEO API audit` from the GitHub Actions tab, or wait for the weekly schedule. The workflow writes `next-migration/docs/seo-api-audit.json` and uploads it as the `seo-api-audit` artifact.

## Local external-account files

The audit script also accepts a Google external-account credential file through `GSC_EXTERNAL_ACCOUNT_FILE` or `GOOGLE_APPLICATION_CREDENTIALS`. It exchanges the subject token with Google STS and, when configured, impersonates the service account for the Search Console read-only scope.

Never commit credential files, access tokens, or API keys.
