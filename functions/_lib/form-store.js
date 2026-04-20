const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS form_submissions (
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
  )`,
  "CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC)",
  "CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type ON form_submissions(form_type)",
  "CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(submitter_email)"
];

const initializedDbs = new WeakSet();

function trimValue(value, limit = 4000) {
  return (typeof value === "string" ? value : "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function findField(payload, matcher) {
  return (payload.fields || []).find((field) => matcher((field.name || "").toLowerCase(), field));
}

function getFieldValue(payload, matchers) {
  const field = findField(payload, (name, item) => {
    return matchers.some((matcher) => matcher(name, item));
  });

  return field ? trimValue(field.value) : "";
}

function randomId() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function ensureFormStore(db) {
  if (!db) {
    return false;
  }

  if (!initializedDbs.has(db)) {
    for (const statement of SCHEMA_STATEMENTS) {
      await db.exec(statement);
    }
    initializedDbs.add(db);
  }

  return true;
}

export async function storeSubmission(db, payload, emailDeliveryId) {
  if (!await ensureFormStore(db)) {
    return false;
  }

  const createdAt = payload.submittedAt || new Date().toISOString();
  const submitterName = getFieldValue(payload, [
    (name) => name === "fullname",
    (name) => name === "full_name",
    (name) => name === "name"
  ]);
  const submitterEmail = getFieldValue(payload, [
    (name, field) => field.type === "email",
    (name) => name === "email"
  ]);
  const submitterPhone = getFieldValue(payload, [
    (name) => name === "phone",
    (name) => name === "telephone",
    (name) => name === "whatsapp"
  ]);
  const submitterCompany = getFieldValue(payload, [
    (name) => name === "company",
    (name) => name === "organization",
    (name) => name === "org"
  ]);

  await db.prepare(
    `INSERT INTO form_submissions (
      id,
      created_at,
      form_type,
      form_label,
      page_title,
      page_url,
      submitter_name,
      submitter_email,
      submitter_phone,
      submitter_company,
      email_delivery_id,
      payload_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      randomId(),
      createdAt,
      trimValue(payload.formType, 80) || "general",
      trimValue(payload.formLabel, 160) || "Website Form",
      trimValue(payload.pageTitle, 240),
      trimValue(payload.pageUrl, 500),
      submitterName,
      submitterEmail,
      submitterPhone,
      submitterCompany,
      trimValue(emailDeliveryId, 120),
      JSON.stringify(payload)
    )
    .run();

  return true;
}

export async function getSubmissionStats(db) {
  await ensureFormStore(db);

  const [totalRow, todayRow, weekRow, monthRow, byTypeRows, trendRows] = await Promise.all([
    db.prepare("SELECT COUNT(*) AS total FROM form_submissions").first(),
    db.prepare("SELECT COUNT(*) AS total FROM form_submissions WHERE date(created_at) = date('now')").first(),
    db.prepare("SELECT COUNT(*) AS total FROM form_submissions WHERE date(created_at) >= date('now', '-6 day')").first(),
    db.prepare("SELECT COUNT(*) AS total FROM form_submissions WHERE date(created_at) >= date('now', 'start of month')").first(),
    db.prepare(
      `SELECT form_type, COUNT(*) AS total
       FROM form_submissions
       GROUP BY form_type
       ORDER BY total DESC, form_type ASC`
    ).all(),
    db.prepare(
      `SELECT date(created_at) AS day, COUNT(*) AS total
       FROM form_submissions
       WHERE date(created_at) >= date('now', '-13 day')
       GROUP BY day
       ORDER BY day ASC`
    ).all()
  ]);

  return {
    total: Number((totalRow && totalRow.total) || 0),
    today: Number((todayRow && todayRow.total) || 0),
    last7Days: Number((weekRow && weekRow.total) || 0),
    thisMonth: Number((monthRow && monthRow.total) || 0),
    byFormType: (byTypeRows && byTypeRows.results ? byTypeRows.results : []).map((row) => ({
      formType: row.form_type,
      total: Number(row.total || 0)
    })),
    trend: (trendRows && trendRows.results ? trendRows.results : []).map((row) => ({
      day: row.day,
      total: Number(row.total || 0)
    }))
  };
}

export async function getRecentSubmissions(db, limit = 50) {
  await ensureFormStore(db);

  const safeLimit = Math.max(1, Math.min(Number(limit) || 20, 100));
  return getSubmissionRows(db, safeLimit);
}

export async function getSubmissionExport(db, limit = 1000) {
  await ensureFormStore(db);

  const safeLimit = Math.max(1, Math.min(Number(limit) || 500, 1000));
  return getSubmissionRows(db, safeLimit);
}

async function getSubmissionRows(db, safeLimit) {
  const rows = await db.prepare(
    `SELECT
      id,
      created_at,
      form_type,
      form_label,
      page_title,
      page_url,
      submitter_name,
      submitter_email,
      submitter_phone,
      submitter_company,
      email_delivery_id,
      payload_json
    FROM form_submissions
    ORDER BY datetime(created_at) DESC
    LIMIT ?`
  ).bind(safeLimit).all();

  return (rows && rows.results ? rows.results : []).map((row) => {
    let payload = null;

    try {
      payload = JSON.parse(row.payload_json);
    } catch (error) {
      payload = null;
    }

    return {
      id: row.id,
      createdAt: row.created_at,
      formType: row.form_type,
      formLabel: row.form_label,
      pageTitle: row.page_title,
      pageUrl: row.page_url,
      submitterName: row.submitter_name,
      submitterEmail: row.submitter_email,
      submitterPhone: row.submitter_phone,
      submitterCompany: row.submitter_company,
      emailDeliveryId: row.email_delivery_id,
      payload
    };
  });
}
