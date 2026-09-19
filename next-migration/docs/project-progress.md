# Fleet Website 项目进度文档

## 1. 项目状态概览

当前项目处于：

**持续优化与上线迭代阶段**

站点主体已可用，核心页面已结构化迁移，正在围绕品牌呈现、产品展示、转化链路与视觉统一做持续打磨。

## 2. 已完成事项

### 2.1 基础架构

- 完成 Next.js App Router 迁移壳层
- 建立 Cloudflare Workers + OpenNext 部署链路
- 保留 legacy public 资源同步机制

### 2.2 页面迁移

- 首页已结构化
- About 页面已结构化
- Contact 页面已结构化
- 产品、解决方案、案例相关页面已结构化

### 2.3 视觉与品牌修正

- Fleet 品牌 logo 替换
- Header logo 尺寸多轮调整
- Footer logo 透明镂空修正
- Footer logo 尺寸调整
- 多处 banner / CTA / 模块可读性修复

### 2.4 About 页优化

- 新增公司证书展示模块
- 证书改为横向滑动展示
- 证书卡片高度统一
- About banner 与模块背景图替换为真实企业素材

### 2.5 产品页优化

- 从参考站抓取并替换产品总览图
- 一一对应现有产品页面
- 调整产品图为完整展示，避免裁切

### 2.6 Contact / 转化链路

- Contact 页面 CTA 模块清理与调整
- 文案可读性优化
- 新增右下角聊天浮窗
- 新增 `api/search` 轻量响应接口
- 接通产品资料 PDF 下载入口

## 3. 当前正在维护的重点

- 全站视觉统一
- 询盘链路优化
- 页面内容可信度建设
- 移动端体验与局部样式收口

## 4. 当前文件级重点模块

### 4.1 关键页面组件

- `components/structured-static-pages.js`
- `components/structured-catalog-pages.js`
- `components/public-shell.js`

### 4.2 样式核心文件

- `app/globals.css`
- `app/structured-content.css`
- `public/assets/site-shell.css`

### 4.3 交互与接口

- `components/ChatWidget.jsx`
- `app/api/contact/route.js`
- `app/api/search/route.js`

## 5. 待办事项

### 高优先级

- 为 `/contact?intent=quote`、`/contact?intent=site-visit` 加入表单预填
- 继续优化部分页面深色区块的视觉压感
- 完善 PDF / 产品资料命名与下载管理

### 中优先级

- 为产品详情页继续统一 hero 图与风格
- 优化首页及内页的视觉层次
- 增加更系统的 FAQ / 技术支持内容

### 低优先级

- 增加更多业务文档与操作说明
- 增加页面截图归档
- 增加组件变更记录

## 6. 风险与注意事项

### 6.1 高影响文件

以下文件修改时影响面大：

- `public/assets/site-shell.css`
- `app/structured-content.css`
- `components/public-shell.js`

### 6.2 构建注意事项

- `npm run build` 在 Windows 下偶发出现 `.next` 临时产物相关报错
- 通常 `npm run deploy` 的 OpenNext 构建链路仍可正常完成

### 6.3 资源同步注意事项

- 真实公共资源源目录在上级 `public`
- `next-migration/public` 会被构建前同步覆盖
- 所以新增资源优先放源目录

## 7. 建议维护节奏

每次迭代后建议同步更新：

- 已完成页面或功能
- 新增素材与资源路径
- 风险与回退点
- 是否已部署上线

建议按以下格式追加日志：

```md
## YYYY-MM-DD

- 完成事项：
- 涉及文件：
- 是否已上线：
- 风险备注：
```

## 2026-09-16 - Manufacturing digital twin blog published

- Published the supplied `3D Digital Twin System for Manufacturing.docx` through Sanity as `post-3d-digital-twin-system-for-manufacturing`. URL: https://www.coolyne.com/blog/3d-digital-twin-system-for-manufacturing
- Preserved all 67 body blocks and 5 section headings. Added seven contextual links without changing source paragraph text; preserved the original contact link. No source images or tables were present.
- Passed authenticated target read and create/update dry-runs; used a create-only publication mutation. No credential was saved.
- Source Markdown was committed and pushed to main as `cd1aa69` before publication. No frontend deployment was required.
- Sanity readback matches title, slug, body, excerpt and SEO fields. Public page and sitemap return 200; all source paragraphs and all eight contextual anchors render correctly. Canonical, BlogPosting and indexability checks passed; sitemap includes the article. All eight link targets return 200.
- Verification artifacts: `ceshistitch/outputs/3d-digital-twin-system-for-manufacturing/verification.json` and `link-target-verification.json`.

## 2026-09-19 - Collaborative Robotics and AMR ROI Inline Image

- Uploaded the user-supplied PNG unchanged to Sanity asset `image-eef4be969100aff67932859547289e28f68ad414-1468x1071-png` (1468 x 1071). Source and downloaded original SHA-1 hashes match.
- Inserted one `imageWithAlt` block after the paragraph about AMR raw-material delivery and finished-part transport in the CNC machine-tending example of `/blog/collaborative-robotics-and-amr-roi`.
- Added descriptive English alt text and caption. Preserved all 62 original body blocks, title, SEO, hero field and publication date; the body now has 63 blocks.
- Passed authenticated read, image-asset create dry-run and document update dry-run; applied the insertion with a revision precondition. No secret was persisted.
- Verified production article, original CDN image, rendered image URL and sitemap all return 200. The image appears exactly once, all original text remains present, and the article is included in the sitemap.
- Verified the live image renders at desktop 1440px and mobile 390px widths, with its original aspect ratio and no horizontal overflow; inspected the mobile screenshot.
- Artifacts: `cloudflare-pages-site-ga4-clean/next-migration/tmp/roi-image-20260919` (before.json, verified.json and display screenshots).
- Content was published through Sanity; no frontend deployment was required. Documentation is based on current remote main and also incorporates the September 18 publication record that previously failed to push.
