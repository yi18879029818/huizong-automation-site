# CURRENT_STATUS.md - 当前项目状态

> 更新时间：2026-05-18

## 项目概览

| 项目 | 状态 | 说明 |
|------|------|------|
| **静态站点** (`public/`) | 运行中 | 原始 HTML/CSS/JS，继续作为稳定 fallback |
| **Next.js 迁移层** (`next-migration/`) | 活跃开发 | 逐步替换静态内容并承接新功能 |
| **线上部署** | 已部署 | `www.coolyne.com` |

---

## 最近更新

### 已完成（2026-05-18）

| 功能 | 文件 | 状态 |
|------|------|------|
| Next.js 站内 automation proxy | `next-migration/app/api/automation/*` | 本地已完成 |
| 网站后端 automation 管理页 | `next-migration/app/internal/automation/page.js` | 本地已完成 |
| automation console 交互组件 | `next-migration/components/automation-console.jsx` | 本地已完成 |
| 站内到 `huizong-api` 的 server-side proxy helper | `next-migration/lib/automation-api.js` | 本地已完成 |
| 站点环境变量示例补充 | `.env.example` | 本地已完成 |
| Next.js 本地构建依赖补齐与真实构建验证 | `next-migration/package.json`, `next-migration/.nvmrc`, `next-migration/scripts/minify-legacy-assets.mjs` | 已通过 |
| Internal automation console 最小访问控制 | `next-migration/middleware.js`, `.env.example` | 本地已完成 |
| Internal automation deployment health 诊断 | `next-migration/app/api/automation/health/route.js`, `next-migration/components/automation-console.jsx` | 本地已完成 |

### 已完成（2026-05-14）

| 功能 | 文件 | 状态 |
|------|------|------|
| 全部变更推送到 GitHub | `main` 分支 | 已推送 |
| Hero 区域动态光效 | `next-migration/app/globals.css` | 已部署 |
| 圆角系统升级 | `next-migration/tailwind.config.js` | 已部署 |
| 阴影系统配置 | `next-migration/tailwind.config.js` | 已部署 |
| 动画效果类 | `next-migration/app/globals.css` | 已部署 |
| 卡片悬浮效果 | `next-migration/components/structured-static-pages.js` | 已部署 |
| Footer Logo 缩小 | `public/assets/site-shell.css` | 已部署 |
| 核心文档创建 | `AGENTS.md`, `ARCHITECTURE_*.md`, `CURRENT_STATUS.md` | 已推送 |

### GitHub 仓库

| 信息 | 值 |
|------|-----|
| **仓库地址** | https://github.com/yi18879029818/huizong-automation-site.git |
| **主分支** | `main` |
| **最新提交** | `9ff775b` - feat: sync latest changes including visual upgrades |
| **协作者** | 可添加 GitHub 账号并授予 Write 权限 |

---

## 页面开发进度

| 页面 | 路由 | Next.js | 静态 |
|------|------|---------|------|
| 首页 | `/` | 已完成 | 已完成 |
| About | `/about` | 已完成 | 已完成 |
| Contact | `/contact` | 已完成 | 已完成 |
| Products (List) | `/products` | 开发中 | 已完成 |
| AGV Forklift | `/products/agv-forklift` | 开发中 | 已完成 |
| Storage AGV | `/products/storage-agv` | 开发中 | 已完成 |
| Solutions (List) | `/solutions` | 开发中 | 已完成 |
| Case Studies | `/case-studies` | 开发中 | 已完成 |
| Admin | `/admin` | 已完成 | 已完成 |
| Internal Automation Console | `/internal/automation` | 开发中 | 未开始 |

---

## 待办事项

### 高优先级

| 事项 | 关联 | 备注 |
|------|------|------|
| 完善产品详情页 MDX 内容 | `/products/*` | 部分页面仍使用静态版本 |
| Contact 页 intent 预填功能 | `/contact` | 提升转化率 |
| 首页 Hero 区域动效完善 | `/` | 与 About 页视觉继续对齐 |

### 中优先级

| 事项 | 关联 | 备注 |
|------|------|------|
| 统一产品卡片风格 | `/products` | 悬浮效果、间距仍可优化 |
| 深色区块视觉优化 | 全局 | 减少压迫感 |
| 案例研究页面完善 | `/case-studies` | 增加更多案例 |

---

## 技术状态

### 构建状态

```bash
cd next-migration
npm install
npm run build    # 已于 2026-05-18 在 Node.js 20.20.2 下通过
npx opennextjs-cloudflare build  # 已于 2026-05-18 在 Node.js 20.20.2 下通过
npm run deploy   # 正常
```

### 依赖版本

| 包 | 版本 | 状态 |
|----|------|------|
| Next.js | 14.2.35 | 正常 |
| React | 18.x | 正常 |
| Tailwind CSS | 3.x | 正常 |
| @opennextjs/cloudflare | 1.12.0 | 正常 |
| wrangler | 4.x | 正常 |

---

## 问题与风险

| 问题 | 严重性 | 状态 | 解决方案 |
|------|--------|------|----------|
| Windows 执行策略限制 | 低 | 已解决 | `Set-ExecutionPolicy RemoteSigned` |
| OpenNext Windows 兼容性告警 | 低 | 监控中 | 必要时切到 WSL |
| 部分静态资源缓存 | 中 | 监控中 | 强制刷新或清理 CDN 缓存 |
| 本机 Node.js 25 下 Next.js 14 SWC 原生包加载不稳定 | 中 | 已规避 | 优先使用 `next-migration/.nvmrc` 指向的 Node.js 20 LTS，并在 `npm install` 后再构建 |
| `/internal/automation` 若未配置 Basic Auth 凭证会返回 503 | 中 | 已记录 | 生产环境配置 `INTERNAL_AUTOMATION_USERNAME` / `INTERNAL_AUTOMATION_PASSWORD`，或明确使用 admin credentials fallback |

---

## 下一步行动

1. 把 `/internal/automation` 与 `huizong-api` / control plane 的真实环境变量做一次部署联调。
2. 决定是否把这套内部 console 接到现有 `/admin` 体系，还是继续保持独立内部路由。
3. 如果后续需要记录内部操作，可以再给 automation proxy 补审计日志或 request tracing。
## Publish Reminder

- Before this branch is committed or pushed, do not forget the real Cloudflare deployment handoff for the internal automation console.
- Required before publish:
  - confirm the production `HUIZONG_API_BASE_URL`
  - set Worker secret `HUIZONG_INTERNAL_API_TOKEN`
  - set Worker Basic Auth credentials for `INTERNAL_AUTOMATION_USERNAME` and `INTERNAL_AUTOMATION_PASSWORD`, or explicitly choose the admin fallback
  - run the real deployment and verify `/api/automation/health` and `/internal/automation`
- This step was intentionally deferred on `2026-05-18` because the real production secret values were not provided yet.

## Deferred UI Follow-up

- Completed on `2026-05-19`: the internal automation console now correlates audit entries and downstream action history more clearly in the UI.
- Remaining optional follow-up:
  - if needed later, expose the same correlation metadata directly from the API instead of deriving it in the client
  - if needed later, reduce the remaining `taskId` / timestamp fallback paths after production traffic confirms downstream trace persistence is stable

## 2026-05-19 D1 Bootstrap Update

- Added `database/form_db.bootstrap.sql` as the unified `FORM_DB` initialization entry point.
- Added `next-migration/scripts/init-form-db.ps1` to execute the bootstrap SQL through `wrangler d1 execute`.
- Verified local bootstrap execution with `powershell -ExecutionPolicy Bypass -File .\scripts\init-form-db.ps1 -Local`.
- Updated deployment docs so fresh environments use the bootstrap step instead of relying only on lazy table creation.

## 2026-05-19 Automation Console Correlation Update

- Updated `next-migration/components/automation-console.jsx` so `/internal/automation` now shows a correlated manual trigger timeline instead of forcing operators to compare audit rows and downstream action history manually.
- The UI now tries to link audit entries to downstream action logs by downstream `taskId` first, then falls back to action type plus nearby timestamps when a direct task id match is not available yet.
- Recent downstream actions that do not match a manual trigger are still preserved in a dedicated "Unmatched Downstream Actions" section for troubleshooting.
- Verified the updated console with:
  - `npx -y node@20 ./node_modules/next/dist/bin/next build`
  - `npx -y node@20 ./node_modules/@opennextjs/cloudflare/dist/cli/index.js build`

## 2026-05-19 Downstream Trace Persistence Update

- `AI guangao V3` now persists automation trace metadata directly into downstream action history, so recent action logs can carry explicit `traceId` values instead of relying only on task id and timing heuristics.
- `next-migration/components/automation-console.jsx` now prefers exact downstream `traceId` matching when correlating manual trigger audit rows to action history, and only falls back to `taskId` or nearby timestamps when explicit trace data is not available on older records yet.
- `huizong-api` has now also tightened the documentation and response schema for this read-model surface, so recent action history is no longer treated as an untyped `dict` list at the API contract level.
- `huizong-api` proxy envelopes are also being tightened from a generic `result: dict` into operation-specific typed result models, so downstream consumers can rely on a clearer OpenAPI contract.
- `huizong-api` has now also typed the embedded `summary.status` / `status.downstream_status` shape more explicitly, reducing the remaining large opaque dictionaries in the internal automation read-model.
- Verified the updated console again with:
  - `npx -y node@20 ./node_modules/next/dist/bin/next build`
  - `npx -y node@20 ./node_modules/@opennextjs/cloudflare/dist/cli/index.js build`

## 2026-05-19 Production Config Hand-off Update

- Confirmed the intended production backend base URL as `https://gaxlgfkemprx.usw-1.sealos.app`.
- Uploaded Cloudflare Worker secret `HUIZONG_INTERNAL_API_TOKEN` for the internal automation console deployment.
- Deployed the Next.js Worker with `HUIZONG_API_BASE_URL=https://gaxlgfkemprx.usw-1.sealos.app` and also pinned that same non-secret value in `next-migration/wrangler.deploy.jsonc` so future deploys do not depend on a one-off CLI `--var`.
- Probed the live site on `2026-05-19`:
  - `https://www.coolyne.com/api/automation/health`
  - `https://www.coolyne.com/internal/automation`
  - both returned `503`, which means the Worker still does not have usable Basic Auth credentials at runtime yet; this is not the expected `401` challenge path
- Because the middleware falls back to `ADMIN_USERNAME` / `ADMIN_PASSWORD` when dedicated internal automation credentials are absent, the current `503` result indicates the production Worker is still missing working admin credentials for this route family.
- The remaining production-side blocker is now:
  - set `INTERNAL_API_TOKEN` on the live `huizong-api` deployment in Sealos
  - ensure the live Worker environment has valid `ADMIN_USERNAME` / `ADMIN_PASSWORD` if admin fallback is the chosen access-control path

## 2026-05-19 Admin Fallback Verification Update

- Reused the historical admin fallback value `123456 / 123456` for the live Worker secret pair:
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
- After the secret update:
  - unauthenticated `GET https://www.coolyne.com/api/automation/health` now returns `401`
  - authenticated `GET https://www.coolyne.com/internal/automation` now returns `200`
- This confirms the site-side Basic Auth middleware is now working in production and the `/internal/automation` fallback path is no longer blocked by missing credentials.
- The authenticated health probe now reaches the upstream bridge and returns `525` from the configured Sealos origin, so the remaining blocker has moved downstream from site auth to the `huizong-api` production origin path.
- Before this branch is committed or pushed, remind the user to provide the correct Sealos `kubeconfig` for the live `huizong-api` deployment so `INTERNAL_API_TOKEN` can be configured on the actual target environment.

## 2026-05-21 Cloudflare Worker Check Clarification

- The PR check `Workers Builds: huizong-automation-site` should no longer be treated as the core release signal for the current site deployment.
- That check is associated with the older Cloudflare account that previously hosted this project and is now considered a legacy residual integration.
- The currently active Worker deployment path is `huizong-automation-site-next` from `next-migration/`, together with the explicit deployment scripts and docs already tracked in this repository.
- Because of that split history, a red `Workers Builds: huizong-automation-site` check can be a legacy-account artifact rather than evidence that the current release path is broken.
- Follow-up cleanup still recommended:
  - remove or disable the legacy Cloudflare Git integration for `huizong-automation-site`
  - keep release decisions focused on the active `huizong-automation-site-next` path, local build validation, and the explicit deployment workflow
