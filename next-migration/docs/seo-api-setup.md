# SEO API 接入说明

## 已接入的 API

### PageSpeed Insights API

脚本调用 Google 官方 `runPagespeed` 接口，默认检查 18 个目标 URL 的移动端性能、可访问性、最佳实践和 SEO 分类，并输出 Performance、Accessibility、Best Practices、SEO 分数以及 LCP、INP、CLS、FCP 指标。

### Google Search Console API

脚本调用 Search Console 的 `searchAnalytics.query` 接口，默认查询最近 28 天的 `page + query` 数据，并将返回结果与 18 个目标 URL 匹配。

## 配置步骤

1. 在 Google Cloud 项目中启用 PageSpeed Insights API，创建 API Key，并将 Key 配置到 `PAGESPEED_API_KEY`。
2. 在同一个或有权限的 Google Cloud 项目中启用 Search Console API。
3. 创建 Service Account，下载 JSON 凭据文件。
4. 将 Service Account 的邮箱添加到 Google Search Console 的 `sc-domain:coolyne.com` 资源中，至少授予读取权限。
5. 配置 `GSC_SERVICE_ACCOUNT_JSON` 为凭据文件路径，或配置临时的 `GSC_ACCESS_TOKEN`。

PowerShell 示例：

```powershell
$env:PAGESPEED_API_KEY = "your-pagespeed-api-key"
$env:GSC_PROPERTY = "sc-domain:coolyne.com"
$env:GSC_SERVICE_ACCOUNT_JSON = "D:\secrets\coolyne-gsc-service-account.json"
$env:PAGESPEED_STRATEGIES = "mobile,desktop"
$env:PAGESPEED_LIMIT = "18"
npm run seo:audit
```

结果会写入 `docs/seo-api-audit.json`。任何密钥都不要提交到 Git、`.env.example` 或 Cloudflare 配置文件。

## 关键词数据源

关键词来自 `2026-07-10-coolyne-seo-geo-page-mapping(1)(1).xlsx`。当前已将表格中能匹配到的 15 个目标页面的 `Page Mapping` 数据固化到 `lib/seo-keyword-source.js`，包括主关键词、搜索量、次级关键词和 GEO 关键词；`/solutions/goods-to-person-picking-system`、`/solutions/machine-tending-automation` 和 `/industries/food-beverage-fmcg-automation` 在该表格中没有对应行，因此明确标记为 `not_in_spreadsheet`，不会虚构搜索量。页面 SEO 关键词优先由该数据源生成，缺失页面仍保留原有页面关键词，等待下一版关键词表补齐。

## 当前限制

API 接入代码已经完成，但本次执行环境没有 PageSpeed API Key，也没有 Search Console 访问凭据，因此不能在不提供凭据的情况下伪造“已连接”结果。配置凭据后运行 `npm run seo:audit` 即可完成真实数据审计；设置 `SEO_AUDIT_STRICT=1` 可在任一 API 未连接时让命令返回失败状态。
