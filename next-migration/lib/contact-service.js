import { storeSubmission } from "@/lib/form-store";

const MAX_FIELDS = 24;
const FIELD_NAME_LIMIT = 80;
const FIELD_LABEL_LIMIT = 120;
const FIELD_VALUE_LIMIT = 4000;
const META_VALUE_LIMIT = 240;

function json(body, status = 200) {
  return Response.json(body, {
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
    trimSingleLine(field && field.label, FIELD_LABEL_LIMIT) || name.replace(/[-_]+/g, " ");
  const value =
    type === "textarea"
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

  const emailField = payload.fields.find(
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
  return fields.map((field) => `${field.label}: ${field.value || "Not provided"}`).join("\n");
}

function getFieldValue(payload, name) {
  return payload.fields.find((field) => field.name === name)?.value || "";
}

function getCustomerName(payload) {
  return getFieldValue(payload, "fullName") || "there";
}

function getCustomerEmail(payload) {
  return payload.fields.find(
    (field) => field.type === "email" || field.name.toLowerCase() === "email"
  )?.value || "";
}

function getCompanyName(payload) {
  return getFieldValue(payload, "company");
}

function formatSenderAddress(email, name = "coolyne") {
  return `${name} <${email}>`;
}

function getInternalEmailHtml(payload) {
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

function getInternalEmailText(payload) {
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

function getInternalEmailSubject(payload) {
  const identity = getCustomerName(payload) || getCustomerEmail(payload) || "New submission";

  return `[coolyne Website] ${payload.formLabel} - ${identity}`;
}

function getCustomerEmailSubject(payload) {
  return `Thanks for contacting coolyne, ${getCustomerName(payload)}`;
}

function getCustomerEmailHtml(payload) {
  const message = getFieldValue(payload, "message") || "Not provided";
  const company = getCompanyName(payload);
  const pageUrl = payload.pageUrl || "https://www.coolyne.com";
  const nextStepItems = [
    "Our team will review your request and reply with the best fit solution.",
    "If your inquiry is urgent, reply to this email and we will prioritize it.",
    "You can also revisit the product and solution pages while we prepare next steps."
  ];

  return `
    <div style="margin:0;background:#f5f7fb;padding:0;font-family:Arial,Helvetica,sans-serif;color:#102033;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;">
        <div style="padding:28px 32px 18px;background:linear-gradient(135deg,#0f2748,#1c4b7d);color:#fff;">
          <div style="font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;opacity:.85;">
            coolyne
          </div>
          <h2 style="margin:14px 0 0;font-size:28px;line-height:1.15;">Thanks for reaching out, ${escapeHtml(getCustomerName(payload))}.</h2>
          <p style="margin:12px 0 0;font-size:15px;line-height:1.7;max-width:520px;opacity:.9;">
            We received your message and our team is preparing the next step for your automation inquiry.
          </p>
        </div>

        <div style="padding:28px 32px;">
          <div style="margin:0 0 22px;padding:18px 20px;border:1px solid #e6eaf0;border-radius:16px;background:#f9fbfd;">
            <div style="font-size:11px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#60708a;margin-bottom:10px;">Your request</div>
            <table style="width:100%;border-collapse:collapse;border-spacing:0;font-size:14px;line-height:1.65;">
              <tr>
                <td style="padding:6px 0;width:140px;color:#60708a;font-weight:700;vertical-align:top;">Name</td>
                <td style="padding:6px 0;vertical-align:top;">${escapeHtml(getCustomerName(payload))}</td>
              </tr>
              ${company ? `<tr><td style="padding:6px 0;width:140px;color:#60708a;font-weight:700;vertical-align:top;">Company</td><td style="padding:6px 0;vertical-align:top;">${escapeHtml(company)}</td></tr>` : ""}
              <tr>
                <td style="padding:6px 0;width:140px;color:#60708a;font-weight:700;vertical-align:top;">Email</td>
                <td style="padding:6px 0;vertical-align:top;">${escapeHtml(getCustomerEmail(payload))}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;width:140px;color:#60708a;font-weight:700;vertical-align:top;">Page</td>
                <td style="padding:6px 0;vertical-align:top;">${escapeHtml(payload.pageTitle)}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;width:140px;color:#60708a;font-weight:700;vertical-align:top;">Message</td>
                <td style="padding:6px 0;white-space:pre-wrap;vertical-align:top;">${escapeHtml(message)}</td>
              </tr>
            </table>
          </div>

          <div style="margin:0 0 22px;">
            <div style="font-size:11px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#60708a;margin-bottom:12px;">What happens next</div>
            <ul style="margin:0;padding:0 0 0 18px;color:#102033;">
              ${nextStepItems
                .map((item) => `<li style="margin:0 0 8px;line-height:1.7;">${escapeHtml(item)}</li>`)
                .join("")}
            </ul>
          </div>

          <div style="margin:0 0 24px;padding:18px 20px;border-radius:16px;background:#0f2748;color:#fff;">
            <div style="font-size:11px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;opacity:.8;">Continue browsing</div>
            <p style="margin:10px 0 16px;font-size:14px;line-height:1.7;opacity:.9;">You can review our product and solution pages while we prepare a tailored reply.</p>
            <a href="${escapeHtml(pageUrl)}" style="display:inline-block;background:#ff8d3a;color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 18px;border-radius:999px;">Open the page again</a>
          </div>

          <p style="margin:0;color:#60708a;font-size:13px;line-height:1.7;">
            If you need a faster reply, simply respond to this email and our sales team will see it directly.
          </p>
        </div>
      </div>
    </div>
  `.trim();
}

function getCustomerEmailText(payload) {
  const message = getFieldValue(payload, "message") || "Not provided";
  const company = getCompanyName(payload);
  return [
    `Thanks for reaching out, ${getCustomerName(payload)}.`,
    "",
    "We received your message and our team is preparing the next step for your automation inquiry.",
    "",
    `Name: ${getCustomerName(payload)}`,
    company ? `Company: ${company}` : "",
    `Email: ${getCustomerEmail(payload)}`,
    `Page: ${payload.pageTitle}`,
    "",
    "Message:",
    message,
    "",
    "Next steps:",
    "1. Our team will review your request and reply with the best fit solution.",
    "2. If your inquiry is urgent, reply to this email and we will prioritize it.",
    "3. You can also revisit the product and solution pages while we prepare next steps.",
    "",
    `Open page: ${payload.pageUrl || "https://www.coolyne.com"}`
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendResendEmail(resendApiKey, message) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(message)
  });

  const rawResult = await response.text();
  let result = {};

  if (rawResult) {
    try {
      result = JSON.parse(rawResult);
    } catch {
      result = { raw: rawResult };
    }
  }

  return { response, result };
}

export async function handleContactSubmission(request, env) {
  const resendApiKey = env.RESEND_API_KEY;
  const toEmail = env.CONTACT_TO_EMAIL;
  const fromEmail = env.CONTACT_FROM_EMAIL;
  const customerFromEmail = env.CONTACT_CUSTOMER_FROM_EMAIL || fromEmail;
  const formDb = env.FORM_DB;
  let body;

  if (!resendApiKey || !toEmail || !fromEmail) {
    return json({ ok: false, error: "Email service is not configured." }, 500);
  }

  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request payload." }, 400);
  }

  const payload = parsePayload(body);
  const validationError = validatePayload(payload);

  if (validationError) {
    return json({ ok: false, error: validationError }, 400);
  }

  const customerEmail = getCustomerEmail(payload);
  const replyTo = customerEmail || undefined;

  const internalEmail = await sendResendEmail(resendApiKey, {
    from: formatSenderAddress(fromEmail),
    to: [toEmail],
    reply_to: replyTo,
    subject: getInternalEmailSubject(payload),
    html: getInternalEmailHtml(payload),
    text: getInternalEmailText(payload),
    tags: [
      { name: "form_type", value: payload.formType },
      { name: "delivery", value: "internal" }
    ]
  });

  if (!internalEmail.response.ok) {
    console.error("Internal email send failed", {
      status: internalEmail.response.status,
      statusText: internalEmail.response.statusText,
      fromEmail,
      toEmail,
      result: internalEmail.result
    });
    return json({ ok: false, error: "Email delivery failed." }, 502);
  }

  const customerEmailResult = await sendResendEmail(resendApiKey, {
    from: formatSenderAddress(customerFromEmail),
    to: [customerEmail],
    reply_to: toEmail,
    subject: getCustomerEmailSubject(payload),
    html: getCustomerEmailHtml(payload),
    text: getCustomerEmailText(payload),
    tags: [
      { name: "form_type", value: payload.formType },
      { name: "delivery", value: "customer_confirmation" }
    ]
  });

  if (!customerEmailResult.response.ok) {
    console.error("Customer email send failed", {
      status: customerEmailResult.response.status,
      statusText: customerEmailResult.response.statusText,
      fromEmail,
      customerEmail,
      result: customerEmailResult.result
    });
    return json({ ok: false, error: "Customer email delivery failed." }, 502);
  }

  let stored = false;
  let storageWarning = "";

  try {
    stored = await storeSubmission(formDb, payload, internalEmail.result.id || "");

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
    id: internalEmail.result.id || null,
    stored,
    storageWarning: storageWarning || null
  });
}
