CREATE TABLE IF NOT EXISTS automation_audit_log (
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
ON automation_audit_log(trace_id);
