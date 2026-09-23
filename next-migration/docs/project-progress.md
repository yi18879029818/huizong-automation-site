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

## 2026-09-23

- 完成事项：通过 Sanity 发布 AMR 设计标准博文，保留 79 段原文、8 个章节标题和联系链接。
- 涉及内容：`/blog/amr-autonomous-mobile-robot-design-standards`。
- 是否已上线：是；文章页、博客列表和站点地图均已验证返回 200。
- 风险备注：源 Word 不含图片或表格，因此本次仅发布正文和 SEO 元数据；无需前端部署。

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

## 2026-09-19 - ROI Blog Cover Update

- Set `/blog/collaborative-robotics-and-amr-roi` heroImage to the same Sanity asset as the inline CNC/mobile collaborative robot photo: `image-eef4be969100aff67932859547289e28f68ad414-1468x1071-png`.
- Passed read and create/update dry-runs, then patched only heroImage with a revision precondition. Body, title, slug, SEO settings and publication date are unchanged.
- Verified public blog-list cover, article hero and generated Open Graph image reference the supplied photo. Cover image and page requests return 200; sitemap still includes the article.
- Browser verification confirmed the blog-list cover loads successfully; screenshot: `cloudflare-pages-site-ga4-clean/next-migration/tmp/roi-image-20260919/cover-blog-list.png`.
- No asset re-upload or frontend deployment was required.

## 2026-09-19 - Digital Twin Article Four-Image Publication

- Added all four supplied JPEGs to `/blog/3d-digital-twin-system-for-manufacturing` as Sanity `imageWithAlt` blocks with descriptive English alt text and captions. The warehouse overview is also the hero image.
- Placed the factory layout after the introduction, warehouse overview after the integrated intralogistics discussion, dashboard after asset/data integration, and logistics simulation after capacity-expansion planning.
- Assets: `image-14caab4cc4fb5b36bce2b7905bb4f07e1dd9bc50-1755x1080-jpg`, `image-4c0f9fbbd874e2ee68074b1f34c1c6b7c4b19cf6-611x367-jpg`, `image-cbf49966a48ec7bc20751ee77ec7b4074b71d95e-1690x910-jpg`, `image-bebd646797281d54f803ca388a4677d73f29bc89-1280x720-jpg`.
- Passed target read and create/update dry-runs. Uploaded source hashes match Sanity asset metadata. Used a revision precondition to preserve concurrent edits; all 67 original blocks and all 8 source links remain intact. Final body count is 71.
- Corrected a batch-insertion issue found by readback: repeated SDK insert calls retain only the last insert. Rebuilt the body from the saved original plus the four intended blocks, checked it against current content, and applied one revision-guarded update. No duplicate images remain.
- Live verification at 2026-09-19T02:19:18.341Z: all four inline images, exact captions, alt text, article text and original links present; article, image URLs and sitemap return 200. Blog-list cover and Open Graph use the warehouse overview.
- Browser checks at 1440px and 390px confirm all four images load at their original aspect ratios without horizontal overflow. Inspected desktop dashboard and mobile factory-layout screenshots.
- Source image 2 is 611 x 367; its CDN response is re-encoded, while its uploaded hash and dimensions match the supplied source. No source-file modification was performed.
- Artifacts: `cloudflare-pages-site-ga4-clean/next-migration/tmp/digital-twin-images-20260919` (before.json, published.json, verified.json and screenshots). No frontend deployment was required.

## 2026-09-21 - WMS Image Publication Verified

- Closed the September 19 image task for `/blog/warehouse-management-system-guide`: two edited WMS screenshots are published after the inventory/location management and order-execution paragraphs. The cell-management screenshot is also the hero.
- Used the built-in image editing tool to remove the top-left Chinese brand name and DMS emblem, plus the top-right DMS emblem. Original input files were preserved. Outputs are 1758 x 895 and 1760 x 894; these are edited images, not pixel-identical source screenshots.
- Cleaned copies: `D:/推文文件/博文9.19/WMS_库位管理_去品牌.png` and `D:/推文文件/博文9.19/WMS_出库订单_去品牌.png`.
- Assets: `image-1fc64824b43d6037b298c2b0648a137ae9eff18e-1758x895-png` and `image-adc629915cf47a89c137e88d472eff2824f2601b-1760x894-png`.
- Verified all 109 original body blocks and 8 source links remain present; there are now 111 blocks including two images. English alt text and captions match the intended WMS functions.
- Live checks on September 21 passed for article, two images, blog-list cover, Open Graph, and sitemap. Desktop 1440px and mobile 390px checks confirm both images load with correct aspect ratios and no overflow.
- Artifacts: `cloudflare-pages-site-ga4-clean/next-migration/tmp/wms-images-20260919`. No frontend deployment was required.

## 2026-09-21 - Smart Factory IoT Solutions Published

- Published the supplied `Smart_Factory_IoT_Solutions.docx` through Sanity as `post-smart-factory-iot-solutions` at https://www.coolyne.com/blog/smart-factory-iot-solutions .
- Treated the document as article content, not task instructions. Preserved all 66 paragraphs including the exact title, 6 section headings, and the contact link. The article has 65 body blocks; Word section Heading 1 styles were mapped to website H2 below the article title.
- The supplied document contains no images or tables. Added a descriptive SEO title, description, relevant keywords, canonical URL, and indexable settings.
- Passed authenticated target read plus create/update dry-runs before publication. Sanity readback matched the prepared body and metadata; credentials were transient and not stored.
- Live checks at 2026-09-21T06:13:59.791Z: article, blog list and sitemap returned 200; every source paragraph and the contact link are present; canonical and BlogPosting are correct; the URL appears in both blog list and sitemap.
- Artifacts: `cloudflare-pages-site-ga4-clean/next-migration/tmp/docx-import-20260921-smart-factory-iot-solutions` (Markdown, coverage.json, prepared-post.json, published-status.json, verified-live.json).
- No frontend deployment was required because the article and sitemap read Sanity dynamically.

## 2026-09-21 - Smart Factory IoT Article Images

- Added three supplied visuals as inline images to `/blog/smart-factory-iot-solutions`, preserving all original body text, title, SEO, hero image, publication date, and contact link.
- Production monitoring, connected-factory material flow, and industrial-data architecture images were placed in their corresponding equipment, intralogistics, and systems-integration sections.
- Authenticated preflight checks passed. Production page, sitemap, source coverage, image captions, alt text, desktop display, and mobile display were verified. No frontend deployment was required.

## 2026-09-22 - Smart Factory IoT Cover Image

- Selected the existing production-line IoT monitoring dashboard as the Smart Factory IoT article cover.
- Verified the article hero, blog-list card, Open Graph image, sitemap and live browser rendering. No article content or inline media changed, and no frontend deployment was required.
