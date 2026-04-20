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
