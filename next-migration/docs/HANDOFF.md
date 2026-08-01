# Handoff

## 当前完成状态
Sanity 已更新 `/blog/goods-to-person-guide` 与 `/blog/what-is-asrs` 的英文正文和 SEO 内容，并保留两篇原有封面与发布日期。

## 本次修改的文件
`docs/WORK_LOG.md`、`docs/HANDOFF.md`。两份 Word 文稿转换后的导入稿仅位于未跟踪的 `tmp/` 目录。

## 已验证的结果
两篇生产文章均返回 `200`，显示新标题和 SEO Title；G2P 为 151 个英文正文块，AS/RS 为 94 个英文正文块，且两条 URL 均已在 `/sitemap.xml` 中。

## 未解决的问题
`reverse-logistics` 暂无封面，仍保持无封面状态。

## 下一步建议
后续博文继续通过 Sanity 正式内容流发布，并在每次发布后核验文章可访问和 sitemap 已更新。

## 不要碰的风险区域
不要用正文导入覆盖已有 `heroImage` 或 `publishedAt`；不要把博客内容改回本地硬编码文章流。
