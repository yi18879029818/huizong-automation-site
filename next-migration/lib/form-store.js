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
  return Boolean(db);
}

export async function storeSubmission(db, payload, emailDeliveryId) {
  if (!(await ensureFormStore(db))) {
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

  await db
    .prepare(
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
