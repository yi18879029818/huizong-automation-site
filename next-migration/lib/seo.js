import { COMPANY } from "@/lib/site-config";

function normalizeWhitespace(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function stripTrailingBrandSuffix(title, brand = COMPANY.name) {
  const normalizedTitle = normalizeWhitespace(title);
  const normalizedBrand = normalizeWhitespace(brand);

  if (!normalizedTitle || !normalizedBrand) {
    return normalizedTitle;
  }

  const trailingBrandPattern = new RegExp(
    `(?:\\s*\\|\\s*${escapeRegExp(normalizedBrand)})+$`,
    "i"
  );

  return normalizedTitle.replace(trailingBrandPattern, "").trim();
}

export function resolveSeoTitle(title, brand = COMPANY.name) {
  return stripTrailingBrandSuffix(title, brand) || normalizeWhitespace(brand);
}

export function buildTitleMetadata(title, brand = COMPANY.name) {
  const resolvedTitle = resolveSeoTitle(title, brand);
  const normalizedBrand = normalizeWhitespace(brand);

  if (!resolvedTitle) {
    return normalizedBrand;
  }

  if (resolvedTitle.toLowerCase().includes(normalizedBrand.toLowerCase())) {
    return {
      absolute: resolvedTitle
    };
  }

  return resolvedTitle;
}
