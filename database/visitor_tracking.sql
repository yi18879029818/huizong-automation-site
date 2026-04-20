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
