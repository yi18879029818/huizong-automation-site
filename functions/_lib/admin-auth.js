function json(body, status = 200, extraHeaders) {
  return new Response(JSON.stringify(body), {
    status,
    headers: Object.assign(
      {
        "content-type": "application/json; charset=UTF-8"
      },
      extraHeaders || {}
    )
  });
}

function buildCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, content-type"
  };
}

function mergeHeaders(extraHeaders) {
  return Object.assign({}, buildCorsHeaders(), extraHeaders || {});
}

function parseBasicAuth(header) {
  if (!header || !header.startsWith("Basic ")) {
    return null;
  }

  try {
    const encoded = header.slice(6);
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return null;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1)
    };
  } catch (error) {
    return null;
  }
}

export function requireAdminAuth(request, env) {
  const expectedUsername = env.ADMIN_USERNAME;
  const expectedPassword = env.ADMIN_PASSWORD;
  const auth = parseBasicAuth(request.headers.get("authorization"));

  if (!expectedUsername || !expectedPassword) {
    return {
      ok: false,
      response: json(
        {
          ok: false,
          error: "Admin credentials are not configured."
        },
        500,
        mergeHeaders()
      )
    };
  }

  if (!auth || auth.username !== expectedUsername || auth.password !== expectedPassword) {
    return {
      ok: false,
      response: json(
        {
          ok: false,
          error: "Unauthorized."
        },
        401,
        mergeHeaders({
          "WWW-Authenticate": 'Basic realm="Huizong Admin"'
        })
      )
    };
  }

  return {
    ok: true
  };
}

export function createAdminOptionsResponse() {
  return new Response(null, {
    status: 204,
    headers: mergeHeaders()
  });
}

export function adminCorsHeaders(extraHeaders) {
  return mergeHeaders(extraHeaders);
}

export { json };
