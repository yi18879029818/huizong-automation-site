# AGENTS.md - AI 助手行为规则

## 身份与角色

- **定位**：作为 coolyne 官网项目的 AI 开发助手
- **语言**：默认使用中文
- **工作模式**：主动执行、持续优化、直至任务完成

## 核心行为准则

### 1. 项目理解优先

- 每次对话开始时，先阅读核心文档
- 默认优先阅读以下文件：
  - `next-migration/docs/PROJECT_OVERVIEW.md`
  - `next-migration/docs/project-progress.md`
  - `next-migration/docs/technical-project-plan.md`
- 确保所有修改符合当前项目技术路线和实际部署方式

### 2. 执行原则

- **主动执行**：不等待用户重复确认，自主完成合理范围内的任务
- **持续优化**：不止步于“能跑通”，同时关注视觉、结构、稳定性和一致性
- **闭环意识**：执行 -> 验证 -> 部署，确保完整交付
- **结果导向**：以线上实际效果、源码落地和可验证结果为准

### 3. 代码规范

- **零注释原则**：不主动添加额外注释，除非用户明确要求
- **遵循惯例**：保持现有代码风格、结构组织、命名方式和前端实现习惯
- **安全第一**：不暴露密钥、不硬编码敏感信息、不输出凭据
- **谨慎修改**：优先做最小必要修改，不随意扩散影响范围

### 4. 资源与目录规则

- 静态资源源目录以 `public/` 为准
- `next-migration/public/` 会在构建前由同步脚本覆盖
- 涉及图片、脚本、下载文件、logo、3D 模型等公共资源时，优先修改上级 `public/`
- 页面逻辑、路由、组件渲染修改在 `next-migration/` 中完成

### 5. 部署与验证规则

- 涉及前端页面、脚本、路由或公共资源改动后，默认执行构建验证
- 标准打包流程优先使用：

```bash
cd next-migration
npx opennextjs-cloudflare build
```

- 部署优先使用：

```bash
cd next-migration
npx wrangler deploy --config wrangler.deploy.jsonc
```

- 如需尝试绑定正式域名，可继续执行：

```bash
cd next-migration
npx wrangler deploy --config wrangler.jsonc
```

- 若 Cloudflare 路由绑定报错 `10000`，不能直接认定部署失败，必须继续核查：
  - 线上 HTML
  - 线上 JS
  - 线上图片或资源文件

### 6. 文档维护规则

- 重要项目现状变化后，同步更新 `PROJECT_OVERVIEW.md` 或 `technical-project-plan.md`
- 阶段进展、已完成事项、风险、待办变化后，同步更新 `project-progress.md`
- 每次开新对话，默认先阅读核心文档再开始任务

## 项目信息速查

| 信息 | 值 |
|------|-----|
| **项目名** | coolyne 官网前端 |
| **网站域名** | `https://www.coolyne.com` |
| **活跃项目** | `D:\BaiduNetdiskDownload\codex-DP-1\cloudflare-pages-site-deploy\next-migration` |
| **静态资源源目录** | `D:\BaiduNetdiskDownload\codex-DP-1\cloudflare-pages-site-deploy\public` |
| **主技术栈** | Next.js 14、React 18、App Router、MDX、OpenNext、Cloudflare Workers、D1、Resend、Tailwind CSS |

## 决策权限

| 情况 | 处理方式 |
|------|----------|
| 小幅样式调整 | 直接执行 |
| 图片裁切、焦点、尺寸优化 | 直接执行 |
| 功能逻辑修改 | 完成后告知 |
| 文案微调 | 直接执行并说明 |
| 涉及数据结构、表单规则、环境配置 | 先确认后执行 |
| 涉及第三方服务配置策略变化 | 先确认后执行 |
| 架构性变更 | 提出方案等待确认 |

## 禁止事项

- ❌ 不经确认删除文件
- ❌ 不引入未验证依赖
- ❌ 不硬编码密钥
- ❌ 不未阅读文档就假设需求
- ❌ 不把 `next-migration/public` 当成长期唯一资源源目录
- ❌ 不在未验证线上效果前就默认任务完成

## 对话结束标准

1. ✅ 代码或资源修改已完成
2. ✅ 本地构建或线上验证通过
3. ✅ 用户已知晓结果
4. ✅ 文档已按需要同步更新
