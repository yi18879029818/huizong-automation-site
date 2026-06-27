const BLOG_INTERNAL_LINK_RULES = {
  "agv-what-is-automated-guided-vehicle": [
    {
      phrase: "Forklift AGV",
      href: "/blog/agv-forklift-meaning"
    },
    {
      phrase: "ASRS applications",
      href: "/blog/what-is-asrs"
    },
    {
      phrase: "internal material flows",
      href: "/blog/what-is-intralogistics"
    }
  ],
  "what-is-asrs": [
    {
      phrase: "AGV Guide",
      href: "/blog/agv-guide"
    },
    {
      phrase: "Warehouse Automation Guide",
      href: "/blog/warehouse-automation-guide"
    },
    {
      phrase: "goods-to-person model",
      href: "/blog/goods-to-person-guide"
    },
    {
      phrase: "wider intralogistics system",
      href: "/blog/what-is-intralogistics"
    }
  ],
  "goods-to-person-guide": [
    {
      phrase: "warehouse automation",
      href: "/blog/warehouse-automation-guide"
    },
    {
      phrase: "ASRS",
      href: "/blog/what-is-asrs"
    },
    {
      phrase: "factory intralogistics",
      href: "/blog/what-is-intralogistics"
    }
  ],
  "warehouse-automation-guide": [
    {
      phrase: "AGV traffic",
      href: "/blog/agv-guide"
    },
    {
      phrase: "order fulfillment",
      href: "/blog/goods-to-person-guide"
    },
    {
      phrase: "storage systems",
      href: "/blog/what-is-asrs"
    },
    {
      phrase: "line-side delivery",
      href: "/blog/what-is-intralogistics"
    }
  ],
  "agv-vs-amr": [
    {
      phrase: "warehouse automation",
      href: "/blog/warehouse-automation-guide"
    },
    {
      phrase: "AGV project",
      href: "/blog/agv-guide"
    },
    {
      phrase: "ASRS upgrade",
      href: "/blog/what-is-asrs"
    }
  ],
  "agv-guide": [
    {
      phrase: "warehouse automation system",
      href: "/blog/warehouse-automation-guide"
    },
    {
      phrase: "AMRs are often the better choice",
      href: "/blog/agv-vs-amr"
    },
    {
      phrase: "AGV Forklift",
      href: "/blog/agv-forklift-meaning"
    },
    {
      phrase: "ASRS",
      href: "/blog/what-is-asrs"
    },
    {
      phrase: "internal transport",
      href: "/blog/what-is-intralogistics"
    }
  ],
  "agv-forklift-meaning": [
    {
      phrase: "AGV systems",
      href: "/blog/agv-guide"
    },
    {
      phrase: "AGV vs AMR",
      href: "/blog/agv-vs-amr"
    },
    {
      phrase: "broader automation foundation",
      href: "/blog/warehouse-automation-guide"
    }
  ],
  "what-is-machine-tending": [
    {
      phrase: "machine tending automation",
      href: "/solutions/machine-tending-automation"
    },
    {
      phrase: "material handling",
      href: "/blog/what-is-intralogistics"
    },
    {
      phrase: "Coolyne's product overview",
      href: "/products"
    }
  ]
};

const INTERNAL_HOSTS = new Set([
  "https://coolyne.com",
  "http://coolyne.com",
  "https://www.coolyne.com",
  "http://www.coolyne.com"
]);

export function normalizeInternalHref(href) {
  if (!href || typeof href !== "string") {
    return null;
  }

  if (href.startsWith("/")) {
    return href;
  }

  try {
    const url = new URL(href);
    const origin = `${url.protocol}//${url.host}`;
    if (!INTERNAL_HOSTS.has(origin)) {
      return null;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

function collectExistingInternalHrefs(blocks) {
  const hrefs = new Set();

  for (const block of blocks || []) {
    for (const markDef of block?.markDefs || []) {
      const normalizedHref = normalizeInternalHref(markDef?.href);
      if (normalizedHref) {
        hrefs.add(normalizedHref);
      }
    }
  }

  return hrefs;
}

function cloneSpan(span, overrides = {}) {
  return {
    ...span,
    ...overrides
  };
}

function splitChildWithRule(blockKey, child, rule, offset) {
  const sourceText = child?.text;
  if (!sourceText || child?.marks?.length) {
    return null;
  }

  const lowerText = sourceText.toLowerCase();
  const lowerPhrase = rule.phrase.toLowerCase();
  const matchIndex = lowerText.indexOf(lowerPhrase);

  if (matchIndex < 0) {
    return null;
  }

  const markKey = `${blockKey}-${rule.href.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase()}-${offset}`;
  const nextChildren = [];
  const beforeText = sourceText.slice(0, matchIndex);
  const matchedText = sourceText.slice(matchIndex, matchIndex + rule.phrase.length);
  const afterText = sourceText.slice(matchIndex + rule.phrase.length);

  if (beforeText) {
    nextChildren.push(
      cloneSpan(child, {
        _key: `${child._key || blockKey}-before-${offset}`,
        text: beforeText
      })
    );
  }

  nextChildren.push(
    cloneSpan(child, {
      _key: `${child._key || blockKey}-link-${offset}`,
      text: matchedText,
      marks: [...(child.marks || []), markKey]
    })
  );

  if (afterText) {
    nextChildren.push(
      cloneSpan(child, {
        _key: `${child._key || blockKey}-after-${offset}`,
        text: afterText
      })
    );
  }

  return {
    children: nextChildren,
    markDef: {
      _key: markKey,
      _type: "link",
      href: rule.href
    }
  };
}

function injectRulesIntoBlock(block, rules) {
  if (block?._type !== "block" || block?.style !== "normal" || !Array.isArray(block?.children)) {
    return { block, usedRules: [] };
  }

  const remainingRules = [...rules];
  const nextChildren = [];
  const nextMarkDefs = [...(block.markDefs || [])];
  const usedRules = [];
  let childOffset = 0;

  for (const child of block.children) {
    if (!remainingRules.length) {
      nextChildren.push(child);
      continue;
    }

    if (!child?.text || child?.marks?.length) {
      nextChildren.push(child);
      continue;
    }

    let pendingTextSpans = [child];

    for (const rule of [...remainingRules]) {
      const spanIndex = pendingTextSpans.findIndex(
        (span) => typeof span?.text === "string" && !span?.marks?.length && span.text.toLowerCase().includes(rule.phrase.toLowerCase())
      );

      if (spanIndex < 0) {
        continue;
      }

      const targetSpan = pendingTextSpans[spanIndex];
      const split = splitChildWithRule(block._key || "block", targetSpan, rule, childOffset++);

      if (!split) {
        continue;
      }

      pendingTextSpans.splice(spanIndex, 1, ...split.children);
      nextMarkDefs.push(split.markDef);
      usedRules.push(rule);
      remainingRules.splice(remainingRules.indexOf(rule), 1);
    }

    nextChildren.push(...pendingTextSpans);
  }

  if (!usedRules.length) {
    return { block, usedRules };
  }

  return {
    block: {
      ...block,
      children: nextChildren,
      markDefs: nextMarkDefs
    },
    usedRules
  };
}

export function injectBlogInternalLinks(slug, blocks) {
  if (!slug || !Array.isArray(blocks)) {
    return blocks;
  }

  const rules = BLOG_INTERNAL_LINK_RULES[slug];
  if (!rules?.length) {
    return blocks;
  }

  const existingHrefs = collectExistingInternalHrefs(blocks);
  let remainingRules = rules.filter((rule) => !existingHrefs.has(rule.href));

  if (!remainingRules.length) {
    return blocks;
  }

  const nextBlocks = [];

  for (const block of blocks) {
    if (!remainingRules.length) {
      nextBlocks.push(block);
      continue;
    }

    const { block: nextBlock, usedRules } = injectRulesIntoBlock(block, remainingRules);
    nextBlocks.push(nextBlock);

    if (usedRules.length) {
      const usedHrefs = new Set(usedRules.map((rule) => rule.href));
      remainingRules = remainingRules.filter((rule) => !usedHrefs.has(rule.href));
    }
  }

  return nextBlocks;
}
