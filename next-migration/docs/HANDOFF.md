# HANDOFF

## 当前完成状态
`/blog/stock-turnover-guide` 已通过 Sanity 更新封面与四张正文配图，待正式发布使公开页面加载新内容。

## 本次修改的文件
- `docs/WORK_LOG.md`
- `docs/HANDOFF.md`

## 已验证的结果
- Sanity CDN 已返回 1 张封面与 4 个 `imageWithAlt` 正文块。
- 生产文章与 `/sitemap.xml` 返回 `200`，站点地图包含文章 URL。

## 未解决的问题
- 生产 Worker 仍返回部署前的文章标记，尚未显示新的 Sanity 图片。

## 下一步建议
在干净的 `main` 上运行 `npm run release:production`，然后再次检查文章中的 5 张图片。

## 不要碰的风险区域
不要回滚当前 Sanity 文档或替换图片资源 ID；发布脚本必须从干净且已同步的 `main` 运行。
