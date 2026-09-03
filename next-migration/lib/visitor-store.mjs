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
    return { source: utmSource || "campaign", medium: utmMedium || "utm" };
  }

  if (!referrer) {
    return { source: "direct", medium: "none" };
  }

  try {
    return { source: new URL(referrer).hostname.toLowerCase() || "referral", medium: "referral" };
  } catch {
    return { source: referrer.toLowerCase(), medium: "referral" };
  }
}

function normalizeVisitPayload(payload, request) {
  const sourceMedium = inferSourceMedium(payload);
  const userAgent = trimValue(payload.userAgent, 500) || trimValue(request.headers.get("user-agent"), 500);

  return {
    visitorId: trimValue(payload.visitorId, 80) || randomId(),
    sessionId: trimValue(payload.sessionId, 80) || randomId(),
    pageTitle: trimValue(payload.pageTitle, 240) || "Untitled Page",
    pagePath: trimPath(payload.pagePath),
    pageUrl: trimValue(payload.pageUrl, 500),
    referrer: trimValue(payload.referrer, 500),
    source: sourceMedium.source,
    medium: sourceMedium.medium,
    startedAt: trimValue(payload.startedAt, 80) || new Date().toISOString(),
    userAgent,
    deviceType: detectDevice(userAgent),
    ipAddress: trimValue(request.headers.get("CF-Connecting-IP"), 120),
    countryCode: trimValue(request.headers.get("CF-IPCountry"), 24).toUpperCase() || "Unknown"
  };
}

export async function recordVisit(db, request, payload = {}) {
  const visit = normalizeVisitPayload(payload, request);
  const pageviewId = randomId();
  const existingSession = await db
    .prepare("SELECT session_id FROM visitor_sessions WHERE session_id = ?")
    .bind(visit.sessionId)
    .first();

  if (existingSession?.session_id) {
    await db
      .prepare(
        `UPDATE visitor_sessions
         SET last_seen_at = ?, pageviews = pageviews + 1
         WHERE session_id = ?`
      )
      .bind(visit.startedAt, visit.sessionId)
      .run();
  } else {
    await db
      .prepare(
        `INSERT INTO visitor_sessions (
          session_id, visitor_id, first_seen_at, last_seen_at, ip_address, country_code,
          landing_page_title, landing_page_path, landing_page_url, source, medium,
          device_type, referrer, user_agent, pageviews, total_duration_seconds
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
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
      )
      .run();
  }

  await db
    .prepare(
      `INSERT INTO visitor_pageviews (
        pageview_id, session_id, visitor_id, started_at, ended_at, duration_seconds,
        page_title, page_path, page_url, source, medium, referrer
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
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
    )
    .run();

  return { sessionId: visit.sessionId, visitorId: visit.visitorId, pageviewId };
}

export async function completePageview(db, payload = {}) {
  const sessionId = trimValue(payload.sessionId, 80);
  const pageviewId = trimValue(payload.pageviewId, 80);

  if (!sessionId || !pageviewId) {
    return false;
  }

  const endedAt = trimValue(payload.endedAt, 80) || new Date().toISOString();
  const durationSeconds = Math.max(0, Math.min(Number(payload.durationSeconds) || 0, 86400));

  await db
    .prepare(
      `UPDATE visitor_pageviews
       SET ended_at = ?, duration_seconds = ?
       WHERE pageview_id = ? AND session_id = ?`
    )
    .bind(endedAt, durationSeconds, pageviewId, sessionId)
    .run();

  await db
    .prepare(
      `UPDATE visitor_sessions
       SET last_seen_at = ?, total_duration_seconds = total_duration_seconds + ?
       WHERE session_id = ?`
    )
    .bind(endedAt, durationSeconds, sessionId)
    .run();

  return true;
}

export async function recordConversion(db, payload = {}) {
  const sessionId = trimValue(payload.sessionId, 80);
  const visitorId = trimValue(payload.visitorId, 80);
  const label = trimValue(payload.label, 120) || "Conversion";

  if (!sessionId || !visitorId) {
    return false;
  }

  const createdAt = trimValue(payload.createdAt, 80) || new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO visitor_conversions (
        conversion_id, session_id, visitor_id, created_at, label,
        page_title, page_path, page_url, metadata_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      trimValue(payload.conversionId, 80) || randomId(),
      sessionId,
      visitorId,
      createdAt,
      label,
      trimValue(payload.pageTitle, 240),
      trimPath(payload.pagePath),
      trimValue(payload.pageUrl, 500),
      JSON.stringify(payload.metadata || {})
    )
    .run();

  await db
    .prepare("UPDATE visitor_sessions SET last_seen_at = ? WHERE session_id = ?")
    .bind(createdAt, sessionId)
    .run();

  return true;
}
