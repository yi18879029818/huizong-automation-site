const VISITOR_SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS visitor_sessions (
    session_id TEXT PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    first_seen_at TEXT NOT NULL,
    last_seen_at TEXT NOT NULL,
    ip_address TEXT,
    country_code TEXT,
    landing_page_title TEXT,
    landing_page_path TEXT,
    landing_page_url TEXT,
    source TEXT,
    medium TEXT,
    device_type TEXT,
    referrer TEXT,
    user_agent TEXT,
    pageviews INTEGER NOT NULL DEFAULT 0,
    total_duration_seconds INTEGER NOT NULL DEFAULT 0
  )`,
  "CREATE INDEX IF NOT EXISTS idx_visitor_sessions_first_seen ON visitor_sessions(first_seen_at DESC)",
  "CREATE INDEX IF NOT EXISTS idx_visitor_sessions_visitor ON visitor_sessions(visitor_id)",
  `CREATE TABLE IF NOT EXISTS visitor_pageviews (
    pageview_id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    visitor_id TEXT NOT NULL,
    started_at TEXT NOT NULL,
    ended_at TEXT,
    duration_seconds INTEGER NOT NULL DEFAULT 0,
    page_title TEXT,
    page_path TEXT,
    page_url TEXT,
    source TEXT,
    medium TEXT,
    referrer TEXT
  )`,
  "CREATE INDEX IF NOT EXISTS idx_visitor_pageviews_session ON visitor_pageviews(session_id, started_at DESC)",
  `CREATE TABLE IF NOT EXISTS visitor_conversions (
    conversion_id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    visitor_id TEXT NOT NULL,
    created_at TEXT NOT NULL,
    label TEXT NOT NULL,
    page_title TEXT,
    page_path TEXT,
    page_url TEXT,
    metadata_json TEXT
  )`,
  "CREATE INDEX IF NOT EXISTS idx_visitor_conversions_session ON visitor_conversions(session_id, created_at DESC)"
];

const initializedDbs = new WeakSet();

function trimValue(value, limit = 500) {
  return (typeof value === "string" ? value : "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function trimPath(value, limit = 240) {
  return trimValue(value, limit) || "/";
}

function randomId() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function detectDevice(userAgent) {
  const ua = trimValue(userAgent, 500).toLowerCase();

  if (!ua) {
    return "desktop";
  }

  if (/ipad|tablet/.test(ua)) {
    return "tablet";
  }

  if (/mobile|iphone|android/.test(ua)) {
    return "mobile";
  }

  return "desktop";
}

function inferSourceMedium(payload) {
  const utmSource = trimValue(payload.utmSource, 120).toLowerCase();
  const utmMedium = trimValue(payload.utmMedium, 120).toLowerCase();
  const referrer = trimValue(payload.referrer, 500);

  if (utmSource || utmMedium) {
    return {
      source: utmSource || "campaign",
      medium: utmMedium || "utm"
    };
  }

  if (referrer) {
    try {
      const referrerUrl = new URL(referrer);
      return {
        source: trimValue(referrerUrl.hostname, 160).toLowerCase() || "referral",
        medium: "referral"
      };
    } catch (error) {
      return {
        source: referrer.toLowerCase(),
        medium: "referral"
      };
    }
  }

  return {
    source: "direct",
    medium: "none"
  };
}

function normalizeVisitPayload(payload, request) {
  const sourceMedium = inferSourceMedium(payload);

  return {
    visitorId: trimValue(payload.visitorId, 80) || randomId(),
    sessionId: trimValue(payload.sessionId, 80) || randomId(),
    pageTitle: trimValue(payload.pageTitle, 240) || "Untitled Page",
    pagePath: trimPath(payload.pagePath, 240),
    pageUrl: trimValue(payload.pageUrl, 500),
    referrer: trimValue(payload.referrer, 500),
    source: sourceMedium.source,
    medium: sourceMedium.medium,
    startedAt: trimValue(payload.startedAt, 80) || new Date().toISOString(),
    userAgent: trimValue(payload.userAgent, 500) || trimValue(request.headers.get("user-agent"), 500),
    deviceType: detectDevice(payload.userAgent || request.headers.get("user-agent") || ""),
    ipAddress: trimValue(request.headers.get("CF-Connecting-IP"), 120),
    countryCode: trimValue(request.headers.get("CF-IPCountry"), 24).toUpperCase() || "Unknown"
  };
}

function normalizeCompletionPayload(payload) {
  return {
    sessionId: trimValue(payload.sessionId, 80),
    visitorId: trimValue(payload.visitorId, 80),
    pageviewId: trimValue(payload.pageviewId, 80),
    endedAt: trimValue(payload.endedAt, 80) || new Date().toISOString(),
    durationSeconds: Math.max(0, Math.min(Number(payload.durationSeconds) || 0, 86400))
  };
}

function normalizeConversionPayload(payload) {
  return {
    conversionId: trimValue(payload.conversionId, 80) || randomId(),
    sessionId: trimValue(payload.sessionId, 80),
    visitorId: trimValue(payload.visitorId, 80),
    label: trimValue(payload.label, 120) || "Conversion",
    pageTitle: trimValue(payload.pageTitle, 240),
    pagePath: trimPath(payload.pagePath, 240),
    pageUrl: trimValue(payload.pageUrl, 500),
    createdAt: trimValue(payload.createdAt, 80) || new Date().toISOString(),
    metadataJson: JSON.stringify(payload.metadata || {})
  };
}

function formatDuration(totalSeconds) {
  const seconds = Math.max(0, Number(totalSeconds) || 0);

  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;

  if (minutes < 60) {
    return `${minutes}m ${remainder}s`;
  }

  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

async function getSessionConversions(db, sessionIds) {
  if (!sessionIds.length) {
    return {};
  }

  const placeholders = sessionIds.map(() => "?").join(", ");
  const rows = await db.prepare(
    `SELECT session_id, label, created_at
     FROM visitor_conversions
     WHERE session_id IN (${placeholders})
     ORDER BY created_at DESC`
  ).bind(...sessionIds).all();

  return (rows && rows.results ? rows.results : []).reduce((acc, row) => {
    if (!acc[row.session_id]) {
      acc[row.session_id] = [];
    }

    if (acc[row.session_id].indexOf(row.label) === -1) {
      acc[row.session_id].push(row.label);
    }

    return acc;
  }, {});
}

export async function ensureVisitorStore(db) {
  if (!db) {
    return false;
  }

  if (!initializedDbs.has(db)) {
    for (const statement of VISITOR_SCHEMA_STATEMENTS) {
      await db.exec(statement);
    }
    initializedDbs.add(db);
  }

  return true;
}

export async function recordVisit(db, request, payload) {
  const visit = normalizeVisitPayload(payload, request);
  const pageviewId = randomId();

  await ensureVisitorStore(db);

  const existingSession = await db.prepare(
    "SELECT session_id FROM visitor_sessions WHERE session_id = ?"
  ).bind(visit.sessionId).first();

  if (existingSession && existingSession.session_id) {
    await db.prepare(
      `UPDATE visitor_sessions
       SET last_seen_at = ?,
           ip_address = COALESCE(NULLIF(ip_address, ''), ?),
           country_code = COALESCE(NULLIF(country_code, ''), ?),
           user_agent = COALESCE(NULLIF(user_agent, ''), ?),
           device_type = COALESCE(NULLIF(device_type, ''), ?),
           pageviews = pageviews + 1
       WHERE session_id = ?`
    ).bind(
      visit.startedAt,
      visit.ipAddress,
      visit.countryCode,
      visit.userAgent,
      visit.deviceType,
      visit.sessionId
    ).run();
  } else {
    await db.prepare(
      `INSERT INTO visitor_sessions (
        session_id,
        visitor_id,
        first_seen_at,
        last_seen_at,
        ip_address,
        country_code,
        landing_page_title,
        landing_page_path,
        landing_page_url,
        source,
        medium,
        device_type,
        referrer,
        user_agent,
        pageviews,
        total_duration_seconds
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      visit.sessionId,
      visit.visitorId,
      visit.startedAt,
      visit.startedAt,
      visit.ipAddress,
      visit.countryCode,
      visit.pageTitle,
      visit.pagePath,
      visit.pageUrl,
      visit.source,
      visit.medium,
      visit.deviceType,
      visit.referrer,
      visit.userAgent,
      1,
      0
    ).run();
  }

  await db.prepare(
    `INSERT INTO visitor_pageviews (
      pageview_id,
      session_id,
      visitor_id,
      started_at,
      ended_at,
      duration_seconds,
      page_title,
      page_path,
      page_url,
      source,
      medium,
      referrer
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    pageviewId,
    visit.sessionId,
    visit.visitorId,
    visit.startedAt,
    visit.startedAt,
    0,
    visit.pageTitle,
    visit.pagePath,
    visit.pageUrl,
    visit.source,
    visit.medium,
    visit.referrer
  ).run();

  return {
    sessionId: visit.sessionId,
    visitorId: visit.visitorId,
    pageviewId
  };
}

export async function completePageview(db, payload) {
  const completion = normalizeCompletionPayload(payload);

  await ensureVisitorStore(db);

  if (!completion.sessionId || !completion.pageviewId) {
    return false;
  }

  await db.prepare(
    `UPDATE visitor_pageviews
     SET ended_at = ?, duration_seconds = ?
     WHERE pageview_id = ? AND session_id = ?`
  ).bind(
    completion.endedAt,
    completion.durationSeconds,
    completion.pageviewId,
    completion.sessionId
  ).run();

  await db.prepare(
    `UPDATE visitor_sessions
     SET last_seen_at = ?, total_duration_seconds = total_duration_seconds + ?
     WHERE session_id = ?`
  ).bind(
    completion.endedAt,
    completion.durationSeconds,
    completion.sessionId
  ).run();

  return true;
}

export async function recordConversion(db, payload) {
  const conversion = normalizeConversionPayload(payload);

  await ensureVisitorStore(db);

  if (!conversion.sessionId || !conversion.visitorId || !conversion.label) {
    return false;
  }

  await db.prepare(
    `INSERT INTO visitor_conversions (
      conversion_id,
      session_id,
      visitor_id,
      created_at,
      label,
      page_title,
      page_path,
      page_url,
      metadata_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    conversion.conversionId,
    conversion.sessionId,
    conversion.visitorId,
    conversion.createdAt,
    conversion.label,
    conversion.pageTitle,
    conversion.pagePath,
    conversion.pageUrl,
    conversion.metadataJson
  ).run();

  await db.prepare(
    `UPDATE visitor_sessions
     SET last_seen_at = ?
     WHERE session_id = ?`
  ).bind(
    conversion.createdAt,
    conversion.sessionId
  ).run();

  return true;
}

export async function getJourneySummary(db, filters = {}) {
  await ensureVisitorStore(db);

  const whereClauses = [];
  const bindings = [];
  const search = trimValue(filters.search, 120);
  const startDate = trimValue(filters.startDate, 24);
  const endDate = trimValue(filters.endDate, 24);

  if (search) {
    const term = `%${search.toLowerCase()}%`;
    whereClauses.push(
      `(lower(ip_address) LIKE ? OR lower(country_code) LIKE ? OR lower(landing_page_title) LIKE ? OR lower(landing_page_path) LIKE ? OR lower(source) LIKE ? OR lower(medium) LIKE ?)`
    );
    bindings.push(term, term, term, term, term, term);
  }

  if (startDate) {
    whereClauses.push("date(first_seen_at) >= date(?)");
    bindings.push(startDate);
  }

  if (endDate) {
    whereClauses.push("date(first_seen_at) <= date(?)");
    bindings.push(endDate);
  }

  const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";
  const rows = await db.prepare(
    `SELECT
      session_id,
      visitor_id,
      first_seen_at,
      last_seen_at,
      ip_address,
      country_code,
      landing_page_title,
      landing_page_path,
      landing_page_url,
      source,
      medium,
      device_type,
      pageviews,
      total_duration_seconds
     FROM visitor_sessions
     ${whereSql}
     ORDER BY datetime(first_seen_at) DESC
     LIMIT 200`
  ).bind(...bindings).all();

  const summaryRow = await db.prepare(
    `SELECT
      COUNT(DISTINCT visitor_id) AS unique_visitors,
      COALESCE(SUM(pageviews), 0) AS total_pageviews
     FROM visitor_sessions
     ${whereSql}`
  ).bind(...bindings).first();

  const sessions = rows && rows.results ? rows.results : [];
  const conversionsBySession = await getSessionConversions(
    db,
    sessions.map((row) => row.session_id)
  );

  return {
    summary: {
      uniqueVisitors: Number((summaryRow && summaryRow.unique_visitors) || 0),
      totalPageviews: Number((summaryRow && summaryRow.total_pageviews) || 0)
    },
    journeys: sessions.map((row) => ({
      id: row.session_id,
      visitorId: row.visitor_id,
      firstSeenAt: row.first_seen_at,
      lastSeenAt: row.last_seen_at,
      ip: row.ip_address || "Unknown",
      country: row.country_code || "Unknown",
      landingPageTitle: row.landing_page_title || "Untitled Page",
      landingPagePath: row.landing_page_path || "/",
      landingPageUrl: row.landing_page_url || "",
      source: row.source || "direct",
      medium: row.medium || "none",
      device: row.device_type || "desktop",
      pageviews: Number(row.pageviews || 0),
      durationSeconds: Number(row.total_duration_seconds || 0),
      durationLabel: formatDuration(row.total_duration_seconds),
      conversions: conversionsBySession[row.session_id] || []
    }))
  };
}

export async function getJourneyDetail(db, sessionId) {
  await ensureVisitorStore(db);

  const safeSessionId = trimValue(sessionId, 80);

  if (!safeSessionId) {
    return null;
  }

  const session = await db.prepare(
    `SELECT
      session_id,
      visitor_id,
      first_seen_at,
      last_seen_at,
      ip_address,
      country_code,
      landing_page_title,
      landing_page_path,
      landing_page_url,
      source,
      medium,
      device_type,
      referrer,
      user_agent,
      pageviews,
      total_duration_seconds
     FROM visitor_sessions
     WHERE session_id = ?`
  ).bind(safeSessionId).first();

  if (!session) {
    return null;
  }

  const [pageviewRows, conversionRows] = await Promise.all([
    db.prepare(
      `SELECT
        pageview_id,
        started_at,
        ended_at,
        duration_seconds,
        page_title,
        page_path,
        page_url,
        source,
        medium,
        referrer
       FROM visitor_pageviews
       WHERE session_id = ?
       ORDER BY datetime(started_at) ASC`
    ).bind(safeSessionId).all(),
    db.prepare(
      `SELECT
        conversion_id,
        created_at,
        label,
        page_title,
        page_path,
        page_url,
        metadata_json
       FROM visitor_conversions
       WHERE session_id = ?
       ORDER BY datetime(created_at) ASC`
    ).bind(safeSessionId).all()
  ]);

  return {
    session: {
      id: session.session_id,
      visitorId: session.visitor_id,
      firstSeenAt: session.first_seen_at,
      lastSeenAt: session.last_seen_at,
      ip: session.ip_address || "Unknown",
      country: session.country_code || "Unknown",
      landingPageTitle: session.landing_page_title || "Untitled Page",
      landingPagePath: session.landing_page_path || "/",
      landingPageUrl: session.landing_page_url || "",
      source: session.source || "direct",
      medium: session.medium || "none",
      device: session.device_type || "desktop",
      referrer: session.referrer || "",
      userAgent: session.user_agent || "",
      pageviews: Number(session.pageviews || 0),
      durationSeconds: Number(session.total_duration_seconds || 0),
      durationLabel: formatDuration(session.total_duration_seconds)
    },
    pageviews: (pageviewRows && pageviewRows.results ? pageviewRows.results : []).map((row) => ({
      id: row.pageview_id,
      startedAt: row.started_at,
      endedAt: row.ended_at,
      durationSeconds: Number(row.duration_seconds || 0),
      durationLabel: formatDuration(row.duration_seconds),
      pageTitle: row.page_title || "Untitled Page",
      pagePath: row.page_path || "/",
      pageUrl: row.page_url || "",
      source: row.source || "direct",
      medium: row.medium || "none",
      referrer: row.referrer || ""
    })),
    conversions: (conversionRows && conversionRows.results ? conversionRows.results : []).map((row) => {
      let metadata = {};

      try {
        metadata = row.metadata_json ? JSON.parse(row.metadata_json) : {};
      } catch (error) {
        metadata = {};
      }

      return {
        id: row.conversion_id,
        createdAt: row.created_at,
        label: row.label,
        pageTitle: row.page_title || "Untitled Page",
        pagePath: row.page_path || "/",
        pageUrl: row.page_url || "",
        metadata
      };
    })
  };
}
