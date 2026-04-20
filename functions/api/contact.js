import { storeSubmission } from "../_lib/form-store.js";

const MAX_FIELDS = 24;
const FIELD_NAME_LIMIT = 80;
const FIELD_LABEL_LIMIT = 120;
const FIELD_VALUE_LIMIT = 4000;
const META_VALUE_LIMIT = 240;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8"
    }
  });
}

function trimSingleLine(value, limit = META_VALUE_LIMIT) {
  return (typeof value === "string" ? value : "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function trimMultiLine(value, limit = FIELD_VALUE_LIMIT) {
  return (typeof value === "string" ? value : "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, limit);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fallbackFields(raw) {
  return [
    {
      name: "fullName",
      label: "Full Name",
      value: trimSingleLine(raw && raw.fullName),
      required: true,
      type: "text"
    },
    {
      name: "company",
      label: "Company",
      value: trimSingleLine(raw && raw.company),
      required: false,
      type: "text"
    },
    {
      name: "email",
      label: "Email",
      value: trimSingleLine(raw && raw.email, 254),
      required: true,
      type: "email"
    },
    {
      name: "phone",
      label: "Phone / WhatsApp",
      value: trimSingleLine(raw && raw.phone, 80),
      required: false,
      type: "tel"
    },
    {
      name: "message",
      label: "Message",
      value: trimMultiLine(raw && raw.message),
      required: true,
      type: "textarea"
    }
  ];
}

function normalizeField(field) {
  const type = trimSingleLine(field && field.type, 40).toLowerCase() || "text";
  const name = trimSingleLine(field && field.name, FIELD_NAME_LIMIT) || "field";
  const label =
    trimSingleLine(field && field.label, FIELD_LABEL_LIMIT) ||
    name.replace(/[-_]+/g, " ");
  const value = type === "textarea"
    ? trimMultiLine(field && field.value)
    : trimSingleLine(field && field.value, FIELD_VALUE_LIMIT);

  return {
    name,
    label,
    value,
    required: Boolean(field && field.required),
    type
  };
}

function parsePayload(raw) {
  const fields = Array.isArray(raw && raw.fields)
    ? raw.fields.map(normalizeField)
    : fallbackFields(raw);

  return {
    formType: trimSingleLine(raw && raw.formType, 60) || "general",
    formLabel: trimSingleLine(raw && raw.formLabel, 120) || "Website Form",
    pageTitle: trimSingleLine(raw && raw.pageTitle, 160) || "Unknown Page",
    pageUrl: trimSingleLine(raw && raw.pageUrl, 400),
    pagePath: trimSingleLine(raw && raw.pagePath, 240),
    submittedAt: trimSingleLine(raw && raw.submittedAt, 80),
    fields
  };
}

function validatePayload(payload) {
  let emailField;

  if (!payload.fields.length) {
    return "This form does not contain any fields.";
  }

  if (payload.fields.length > MAX_FIELDS) {
    return "Too many fields were submitted.";
  }

  for (const field of payload.fields) {
    if (field.required && !field.value) {
      return `Missing required field: ${field.label}.`;
    }

    if (field.value && field.value.length > FIELD_VALUE_LIMIT) {
      return `${field.label} is too long.`;
    }
  }

  emailField = payload.fields.find(
    (field) => field.type === "email" || field.name.toLowerCase() === "email"
  );

  if (!emailField || !isValidEmail(emailField.value)) {
    return "Invalid email address.";
  }

  return "";
}

function formatFieldRows(fields) {
  return fields
    .map((field) => {
      return `
        <tr>
          <td style="padding:10px 12px;border:1px solid #e5e7eb;background:#f8fafc;font-weight:700;vertical-align:top;width:220px;">
            ${escapeHtml(field.label)}
          </td>
          <td style="padding:10px 12px;border:1px solid #e5e7eb;white-space:pre-wrap;vertical-align:top;">
            ${escapeHtml(field.value || "Not provided")}
          </td>
        </tr>
      `.trim();
    })
    .join("");
}

function formatFieldText(fields) {
  return fields
    .map((field) => `${field.label}: ${field.value || "Not provided"}`)
    .join("\n");
}

function getEmailHtml(payload) {
  const meta = [
    ["Form", payload.formLabel],
    ["Page", payload.pageTitle],
    ["URL", payload.pageUrl || payload.pagePath || "Not provided"],
    ["Submitted At", payload.submittedAt || new Date().toISOString()]
  ];

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;line-height:1.6">
      <h2 style="margin:0 0 18px;font-size:24px;">New website form submission</h2>
      <div style="margin:0 0 20px;padding:16px;border-radius:14px;background:#f3f4f6;">
        ${meta
          .map(
            ([label, value]) =>
              `<p style="margin:0 0 8px;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`
          )
          .join("")}
      </div>
      <table style="width:100%;border-collapse:collapse;border-spacing:0;">
        ${formatFieldRows(payload.fields)}
      </table>
    </div>
  `.trim();
}

function getEmailText(payload) {
  return [
    "New website form submission",
    "",
    `Form: ${payload.formLabel}`,
    `Page: ${payload.pageTitle}`,
    `URL: ${payload.pageUrl || payload.pagePath || "Not provided"}`,
    `Submitted At: ${payload.submittedAt || new Date().toISOString()}`,
    "",
    formatFieldText(payload.fields)
  ].join("\n");
}

function getEmailSubject(payload) {
  const nameField = payload.fields.find((field) => field.name === "fullName");
  const emailField = payload.fields.find(
    (field) => field.type === "email" || field.name.toLowerCase() === "email"
  );
  const identity =
    (nameField && nameField.value) ||
    (emailField && emailField.value) ||
    "New submission";

  return `[Huizong Website] ${payload.formLabel} - ${identity}`;
}

export async function onRequestPost(context) {
  const resendApiKey = context.env.RESEND_API_KEY;
  const toEmail = context.env.CONTACT_TO_EMAIL;
  const fromEmail = context.env.CONTACT_FROM_EMAIL;
  const formDb = context.env.FORM_DB;
  let body;
  let payload;
  let validationError;
  let response;
  let result;
  let replyTo;
  let stored = false;
  let storageWarning = "";

  if (!resendApiKey || !toEmail || !fromEmail) {
    return json({ ok: false, error: "Email service is not configured." }, 500);
  }

  try {
    body = await context.request.json();
  } catch (error) {
    return json({ ok: false, error: "Invalid request payload." }, 400);
  }

  payload = parsePayload(body);
  validationError = validatePayload(payload);

  if (validationError) {
    return json({ ok: false, error: validationError }, 400);
  }

  replyTo = payload.fields.find(
    (field) => field.type === "email" || field.name.toLowerCase() === "email"
  );

  response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: replyTo ? replyTo.value : undefined,
      subject: getEmailSubject(payload),
      html: getEmailHtml(payload),
      text: getEmailText(payload)
    })
  });

  result = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("Resend send failed", result);
    return json({ ok: false, error: "Email delivery failed." }, 502);
  }

  try {
    stored = await storeSubmission(formDb, payload, result.id || "");

    if (!stored) {
      storageWarning = "FORM_DB binding is unavailable, so this submission was emailed but not stored.";
      console.error("Submission storage skipped", {
        hasFormDb: Boolean(formDb),
        formType: payload.formType,
        pageTitle: payload.pageTitle
      });
    }
  } catch (error) {
    console.error("Submission storage failed", error);
    storageWarning = error && error.message ? error.message : String(error);
  }

  return json({
    ok: true,
    id: result.id || null,
    stored,
    storageWarning: storageWarning || null
  });
}
