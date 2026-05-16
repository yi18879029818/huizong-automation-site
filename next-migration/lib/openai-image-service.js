const OPENAI_IMAGE_API_URL = "https://api.openai.com/v1/images/generations";

const SUPPORTED_MODELS = new Set(["gpt-image-2"]);
const SUPPORTED_SIZES = new Set(["1024x1024", "1024x1536", "1536x1024", "auto"]);
const SUPPORTED_QUALITIES = new Set(["low", "medium", "high", "auto"]);
const SUPPORTED_BACKGROUNDS = new Set(["transparent", "opaque", "auto"]);
const SUPPORTED_OUTPUT_FORMATS = new Set(["png", "webp", "jpeg"]);

function json(body, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8"
    }
  });
}

function trimSingleLine(value, limit = 240) {
  return (typeof value === "string" ? value : "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function normalizePrompt(value) {
  return (typeof value === "string" ? value : "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 4000);
}

function pickAllowed(value, allowedValues, fallback) {
  const normalized = trimSingleLine(value, 40).toLowerCase();
  return allowedValues.has(normalized) ? normalized : fallback;
}

function getRuntimeEnv(env) {
  return env || process.env || {};
}

function getMimeType(outputFormat) {
  if (outputFormat === "jpeg") {
    return "image/jpeg";
  }

  if (outputFormat === "webp") {
    return "image/webp";
  }

  return "image/png";
}

function parseRequestPayload(raw) {
  return {
    prompt: normalizePrompt(raw && raw.prompt),
    model: pickAllowed(raw && raw.model, SUPPORTED_MODELS, "gpt-image-2"),
    size: pickAllowed(raw && raw.size, SUPPORTED_SIZES, "1024x1024"),
    quality: pickAllowed(raw && raw.quality, SUPPORTED_QUALITIES, "auto"),
    background: pickAllowed(raw && raw.background, SUPPORTED_BACKGROUNDS, "auto"),
    outputFormat: pickAllowed(raw && raw.outputFormat, SUPPORTED_OUTPUT_FORMATS, "png")
  };
}

function validateRequestPayload(payload) {
  if (!payload.prompt) {
    return "Prompt is required.";
  }

  return "";
}

export async function handleOpenAIImageGeneration(request, env) {
  const runtimeEnv = getRuntimeEnv(env);
  const openAiApiKey = runtimeEnv.OPENAI_API_KEY;

  if (!openAiApiKey) {
    return json(
      {
        ok: false,
        error: "OPENAI_API_KEY is not configured."
      },
      500
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request payload." }, 400);
  }

  const payload = parseRequestPayload(body);
  const validationError = validateRequestPayload(payload);

  if (validationError) {
    return json({ ok: false, error: validationError }, 400);
  }

  const upstreamResponse = await fetch(OPENAI_IMAGE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAiApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: payload.model,
      prompt: payload.prompt,
      size: payload.size,
      quality: payload.quality,
      background: payload.background,
      output_format: payload.outputFormat
    })
  });

  const rawResponseText = await upstreamResponse.text();
  let result = {};

  if (rawResponseText) {
    try {
      result = JSON.parse(rawResponseText);
    } catch {
      result = { raw: rawResponseText };
    }
  }

  if (!upstreamResponse.ok) {
    const upstreamError =
      result && result.error && typeof result.error.message === "string"
        ? result.error.message
        : "OpenAI image generation request failed.";

    return json(
      {
        ok: false,
        error: upstreamError,
        status: upstreamResponse.status
      },
      upstreamResponse.status
    );
  }

  const firstImage = Array.isArray(result.data) ? result.data[0] || null : null;
  const imageBase64 = firstImage && typeof firstImage.b64_json === "string" ? firstImage.b64_json : "";
  const mimeType = getMimeType(payload.outputFormat);

  if (!imageBase64) {
    return json(
      {
        ok: false,
        error: "OpenAI returned no image data."
      },
      502
    );
  }

  return json({
    ok: true,
    model: payload.model,
    created: result.created || null,
    background: result.background || payload.background,
    quality: result.quality || payload.quality,
    size: result.size || payload.size,
    outputFormat: result.output_format || payload.outputFormat,
    usage: result.usage || null,
    revisedPrompt: firstImage.revised_prompt || null,
    imageBase64,
    imageDataUrl: `data:${mimeType};base64,${imageBase64}`
  });
}
