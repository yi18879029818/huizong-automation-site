-- FORM_DB bootstrap for the huizong-automation-site worker stack.
-- Safe to re-run because every table and index uses IF NOT EXISTS.

-- Form submissions
CREATE TABLE IF NOT EXISTS form_submissions (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  form_type TEXT NOT NULL,
  form_label TEXT NOT NULL,
  page_title TEXT,
  page_url TEXT,
  submitter_name TEXT,
  submitter_email TEXT,
  submitter_phone TEXT,
  submitter_company TEXT,
  email_delivery_id TEXT,
  payload_json TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at
  ON form_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type
  ON form_submissions(form_type);

CREATE INDEX IF NOT EXISTS idx_form_submissions_email
  ON form_submissions(submitter_email);

-- Visitor tracking
CREATE TABLE IF NOT EXISTS visitor_sessions (
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
);

CREATE INDEX IF NOT EXISTS idx_visitor_sessions_first_seen
  ON visitor_sessions(first_seen_at DESC);

CREATE INDEX IF NOT EXISTS idx_visitor_sessions_visitor
  ON visitor_sessions(visitor_id);

CREATE TABLE IF NOT EXISTS visitor_pageviews (
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
);

CREATE INDEX IF NOT EXISTS idx_visitor_pageviews_session
  ON visitor_pageviews(session_id, started_at DESC);

CREATE TABLE IF NOT EXISTS visitor_conversions (
  conversion_id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  label TEXT NOT NULL,
  page_title TEXT,
  page_path TEXT,
  page_url TEXT,
  metadata_json TEXT
);

CREATE INDEX IF NOT EXISTS idx_visitor_conversions_session
  ON visitor_conversions(session_id, created_at DESC);

-- Internal automation operator audit
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
