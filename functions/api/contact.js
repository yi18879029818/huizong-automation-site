const FIELD_LIMITS = {
  fullName: 120,
  company: 160,
  email: 254,
  phone: 40,
  message: 4000
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    }
  });
}

function trimValue(value) {
  return (typeof value === 'string' ? value : '').replace(/\s+/g, ' ').trim();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getPayload(raw) {
  return {
    fullName: trimValue(raw && raw.fullName),
    company: trimValue(raw && raw.company),
    email: trimValue(raw && raw.email),
    phone: trimValue(raw && raw.phone),
    message: trimValue(raw && raw.message)
  };
}

function validatePayload(payload) {
  if (!payload.fullName || !payload.company || !payload.email || !payload.message) {
    return 'Missing required fields.';
  }

  if (!isValidEmail(payload.email)) {
    return 'Invalid email address.';
  }

  for (const key of Object.keys(FIELD_LIMITS)) {
    if (payload[key] && payload[key].length > FIELD_LIMITS[key]) {
      return `${key} is too long.`;
    }
  }

  return '';
}

function getEmailHtml(payload) {
  const phoneLine = payload.phone
    ? `<p><strong>Phone / WhatsApp:</strong> ${escapeHtml(payload.phone)}</p>`
    : '<p><strong>Phone / WhatsApp:</strong> Not provided</p>';

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;line-height:1.6">
      <h2 style="margin:0 0 16px;font-size:22px;">New website inquiry</h2>
      <p><strong>Full name:</strong> ${escapeHtml(payload.fullName)}</p>
      <p><strong>Company:</strong> ${escapeHtml(payload.company)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      ${phoneLine}
      <div style="margin-top:20px;padding:16px;border-radius:12px;background:#f3f4f6;">
        <strong>Message</strong>
        <p style="margin:12px 0 0;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
      </div>
    </div>
  `.trim();
}

function getEmailText(payload) {
  return [
    'New website inquiry',
    '',
    `Full name: ${payload.fullName}`,
    `Company: ${payload.company}`,
    `Email: ${payload.email}`,
    `Phone / WhatsApp: ${payload.phone || 'Not provided'}`,
    '',
    'Message:',
    payload.message
  ].join('\n');
}

export async function onRequestPost(context) {
  const resendApiKey = context.env.RESEND_API_KEY;
  const toEmail = context.env.CONTACT_TO_EMAIL;
  const fromEmail = context.env.CONTACT_FROM_EMAIL;
  let body;
  let payload;
  let validationError;
  let response;
  let result;

  if (!resendApiKey || !toEmail || !fromEmail) {
    return json({ ok: false, error: 'Email service is not configured.' }, 500);
  }

  try {
    body = await context.request.json();
  } catch (error) {
    return json({ ok: false, error: 'Invalid request payload.' }, 400);
  }

  payload = getPayload(body);
  validationError = validatePayload(payload);

  if (validationError) {
    return json({ ok: false, error: validationError }, 400);
  }

  response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.email,
      subject: `[Huizong Website] ${payload.fullName} from ${payload.company}`,
      html: getEmailHtml(payload),
      text: getEmailText(payload)
    })
  });

  result = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error('Resend send failed', result);
    return json({ ok: false, error: 'Email delivery failed.' }, 502);
  }

  return json({ ok: true, id: result.id || null });
}
