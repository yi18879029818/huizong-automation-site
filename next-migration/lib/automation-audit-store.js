function trimValue(value, limit = 4000) {
  return (typeof value === "string" ? value : "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function randomId() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function ensureAutomationAuditStore(db) {
  if (!db) {
    return false;
  }

  await db.exec(`CREATE TABLE IF NOT EXISTS automation_audit_log (
    id TEXT PRIMARY KEY,
    trace_id TEXT NOT NULL,
    actor TEXT,
    source_client TEXT,
    requested_action TEXT NOT NULL,
    request_method TEXT NOT NULL,
    request_path TEXT NOT NULL,
    website_url TEXT,
    success INTEGER NOT NULL DEFAULT 0,
    upstream_status INTEGER NOT NULL,
    instruction_excerpt TEXT,
    request_payload_json TEXT,
    response_payload_json TEXT,
    created_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_automation_audit_log_created_at
  ON automation_audit_log(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_automation_audit_log_trace_id
  ON automation_audit_log(trace_id);`);

  return true;
}

function extractInstructionExcerpt(requestPayload) {
  if (!requestPayload || typeof requestPayload !== "object" || Array.isArray(requestPayload)) {
    return "";
  }

  return trimValue(requestPayload.instruction, 500);
}

function extractWebsiteUrl(requestPayload, responsePayload) {
  const candidate =
    requestPayload?.website_url ||
    requestPayload?.websiteUrl ||
    responsePayload?.website_url ||
    responsePayload?.websiteUrl ||
    null;

  return trimValue(candidate, 500) || "";
}

export async function recordAutomationAudit(db, audit) {
  if (!(await ensureAutomationAuditStore(db))) {
    return false;
  }

  const createdAt = new Date().toISOString();
  const requestPayloadJson = JSON.stringify(audit.requestPayload || null);
  const responsePayloadJson = JSON.stringify(audit.responsePayload || null);

  await db
    .prepare(
      `INSERT INTO automation_audit_log (
        id,
        trace_id,
        actor,
        source_client,
        requested_action,
        request_method,
        request_path,
        website_url,
        success,
        upstream_status,
        instruction_excerpt,
        request_payload_json,
        response_payload_json,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      randomId(),
      trimValue(audit.traceId, 120) || randomId(),
      trimValue(audit.actor, 160),
      trimValue(audit.sourceClient, 120),
      trimValue(audit.requestedAction, 120) || "unknown",
      trimValue(audit.requestMethod, 16) || "POST",
      trimValue(audit.requestPath, 240) || "/api/automation",
      extractWebsiteUrl(audit.requestPayload, audit.responsePayload),
      audit.success ? 1 : 0,
      Number.isFinite(audit.upstreamStatus) ? audit.upstreamStatus : 0,
      extractInstructionExcerpt(audit.requestPayload),
      requestPayloadJson,
      responsePayloadJson,
      createdAt
    )
    .run();

  return true;
}

export async function listRecentAutomationAuditEntries(db, limit = 20) {
  if (!(await ensureAutomationAuditStore(db))) {
    return [];
  }

  const result = await db
    .prepare(
      `SELECT
        id,
        trace_id,
        actor,
        source_client,
        requested_action,
        request_method,
        request_path,
        website_url,
        success,
        upstream_status,
        instruction_excerpt,
        request_payload_json,
        response_payload_json,
        created_at
      FROM automation_audit_log
      ORDER BY created_at DESC
      LIMIT ?`
    )
    .bind(Math.max(1, Math.min(100, Number(limit) || 20)))
    .all();

  return (result.results || []).map((row) => ({
    id: row.id,
    traceId: row.trace_id,
    actor: row.actor,
    sourceClient: row.source_client,
    requestedAction: row.requested_action,
    requestMethod: row.request_method,
    requestPath: row.request_path,
    websiteUrl: row.website_url,
    success: Boolean(row.success),
    upstreamStatus: row.upstream_status,
    instructionExcerpt: row.instruction_excerpt,
    requestPayload:
      typeof row.request_payload_json === "string" && row.request_payload_json
        ? JSON.parse(row.request_payload_json)
        : null,
    responsePayload:
      typeof row.response_payload_json === "string" && row.response_payload_json
        ? JSON.parse(row.response_payload_json)
        : null,
    createdAt: row.created_at,
  }));
}
