# Structured Data Guidelines

## Goal

This project uses JSON-LD to support search visibility without overstating page intent.
Every schema block must match the real function of the page, the real content on the page, and the real data that the business can support.

## Core Rules

- Only add structured data types that match the page's primary purpose.
- Do not publish fabricated `price`, `review`, `aggregateRating`, stock counts, or seller claims.
- Prefer one clear `mainEntity` per page.
- Do not emit multiple nodes with the same `@id` unless they intentionally describe the exact same entity.
- Use canonical public URLs for `url`, `@id`, image URLs, and breadcrumb items.
- Treat category, overview, and hub pages as navigational pages first, not as single-item pages.

## Page-Type Mapping

### Home page

- Use `Organization`
- Use `WebSite`
- Use `WebPage`
- Use one navigational `ItemList` only when it reflects the homepage entry paths
- Use `FAQPage` only if the homepage visibly includes those FAQs
- Do not emit `Product` on the homepage unless the page is genuinely centered on one specific product

### Product detail pages

- Use `Product`
- Include `Offer` for Google Product snippets eligibility
- If there is no public price, keep the `Offer` quote-friendly:
  - `url`
  - `priceCurrency`
  - `availability`
  - `priceValidUntil`
- Only include `price` when it comes from real catalog or CMS data
- Do not add `review` or `aggregateRating` unless the source is real and maintained

### Product overview or category pages

- Use `CollectionPage`
- Use `ItemList` for navigation
- Product cards inside the list should be represented as links or page references, not as rich-result `Product` entities
- Do not use product-level `Offer` markup on overview pages
- Do not use `OfferCatalog` for product categories unless the page is intentionally describing a service catalog rather than trying to qualify for product rich results

### Solution detail pages

- Use `Service`
- `OfferCatalog` is acceptable for delivery scope or service modules
- Avoid `Product` unless the page is truly about a concrete SKU-like item

### Case study pages

- Use `Article`
- Keep `headline`, `description`, `author`, `publisher`, and `mainEntityOfPage` aligned with visible content
- Do not mix in `Product` unless the page is actually a product page

### FAQ pages and embedded FAQs

- Use `FAQPage` only when the questions and answers are visible to users on that page
- Do not attach unrelated FAQs just to expand schema coverage

### Breadcrumbs

- Use `BreadcrumbList` when the page has a real navigational hierarchy
- Keep labels and URLs aligned with the visible trail

## Rich Result Boundaries

### Product snippets

- Target only product detail pages
- Requires one of:
  - `offers`
  - `review`
  - `aggregateRating`
- For this project, use `offers` only

### Merchant listings

- More commerce-oriented than Product snippets
- Avoid treating B2B overview pages as merchant listing candidates
- If the business is not exposing transactional shopping details, stay conservative and keep commerce markup on detail pages only

### FAQ rich results

- Safe when the FAQ content is actually present on-page
- Risk appears when FAQs are injected into pages that are not visibly FAQ-driven

### Article rich results

- Safe for case-study or blog detail pages
- Avoid using `Article` for landing pages, product hubs, or service directories

## Current Project Policy

- Product rich-result markup is allowed only on product detail pages
- Product overview pages use navigational list semantics, not nested `Product` rich-result nodes
- Home page uses a single entry-path `ItemList`
- Solution pages use `Service`
- Case project pages use `Article`
- FAQ schema only appears on pages that expose visible FAQs

## Validation Workflow

1. Build locally and inspect generated HTML or server output.
2. Check whether the intended page has the expected schema type and no extra commerce entities.
3. Validate production URLs in Google Rich Results Test.
4. In Search Console:
   - run URL Inspection on the live URL
   - request re-indexing if the report is showing an older crawl
   - use Validate Fix after rollout

## Review Checklist

- Does the schema match the visible page type?
- Is there only one clear `mainEntity`?
- Are all `@id` values unique and stable?
- Is every `Offer` backed by real B2B availability semantics?
- Are we avoiding fake reviews, ratings, and prices?
- Are overview pages staying out of single-product rich-result patterns?
