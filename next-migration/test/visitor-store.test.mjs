import assert from "node:assert/strict";
import test from "node:test";

import {
  completePageview,
  recordConversion,
  recordVisit
} from "../lib/visitor-store.mjs";

class MemoryD1 {
  constructor() {
    this.sessions = new Map();
    this.pageviews = new Map();
    this.conversions = new Map();
  }

  prepare(sql) {
    return {
      bind: (...values) => ({
        first: async () => {
          if (sql.includes("SELECT session_id FROM visitor_sessions")) {
            return this.sessions.get(values[0]) || null;
          }

          return null;
        },
        run: async () => {
          if (sql.includes("INSERT INTO visitor_sessions")) {
            this.sessions.set(values[0], {
              session_id: values[0],
              visitor_id: values[1],
              first_seen_at: values[2],
              last_seen_at: values[3],
              source: values[9],
              medium: values[10],
              pageviews: values[14],
              total_duration_seconds: values[15]
            });
          }

          if (sql.includes("INSERT INTO visitor_pageviews")) {
            this.pageviews.set(values[0], {
              pageview_id: values[0],
              session_id: values[1],
              visitor_id: values[2],
              started_at: values[3],
              ended_at: values[4],
              duration_seconds: values[5]
            });
          }

          if (sql.includes("UPDATE visitor_pageviews")) {
            const pageview = this.pageviews.get(values[2]);
            pageview.ended_at = values[0];
            pageview.duration_seconds = values[1];
          }

          if (sql.includes("total_duration_seconds = total_duration_seconds + ?")) {
            const session = this.sessions.get(values[2]);
            session.last_seen_at = values[0];
            session.total_duration_seconds += values[1];
          }

          if (sql.includes("INSERT INTO visitor_conversions")) {
            this.conversions.set(values[0], {
              conversion_id: values[0],
              session_id: values[1],
              visitor_id: values[2],
              label: values[4]
            });
          }

          return { success: true };
        }
      })
    };
  }
}

function request() {
  return new Request("https://www.coolyne.com/blog/example", {
    headers: {
      "CF-Connecting-IP": "203.0.113.8",
      "CF-IPCountry": "US",
      "user-agent": "Example mobile browser"
    }
  });
}

test("recordVisit creates a campaign-attributed pageview", async () => {
  const db = new MemoryD1();
  const visit = await recordVisit(db, request(), {
    visitorId: "visitor-1",
    sessionId: "session-1",
    pageTitle: "Example article",
    pagePath: "/blog/example",
    pageUrl: "https://www.coolyne.com/blog/example?utm_source=newsletter",
    utmSource: "newsletter",
    utmMedium: "email",
    startedAt: "2026-09-03T00:00:00.000Z"
  });

  assert.equal(visit.sessionId, "session-1");
  assert.ok(visit.pageviewId);
  assert.equal(db.sessions.get("session-1").source, "newsletter");
  assert.equal(db.sessions.get("session-1").medium, "email");
  assert.equal(db.pageviews.get(visit.pageviewId).session_id, "session-1");
});

test("completePageview records the elapsed duration for its session", async () => {
  const db = new MemoryD1();
  const visit = await recordVisit(db, request(), {
    visitorId: "visitor-1",
    sessionId: "session-1"
  });

  await completePageview(db, {
    sessionId: "session-1",
    pageviewId: visit.pageviewId,
    endedAt: "2026-09-03T00:02:00.000Z",
    durationSeconds: 120
  });

  assert.equal(db.pageviews.get(visit.pageviewId).duration_seconds, 120);
  assert.equal(db.sessions.get("session-1").total_duration_seconds, 120);
});

test("recordConversion associates a conversion with the visitor session", async () => {
  const db = new MemoryD1();
  await recordVisit(db, request(), {
    visitorId: "visitor-1",
    sessionId: "session-1"
  });

  await recordConversion(db, {
    conversionId: "conversion-1",
    visitorId: "visitor-1",
    sessionId: "session-1",
    label: "Contact form submitted"
  });

  assert.deepEqual(db.conversions.get("conversion-1"), {
    conversion_id: "conversion-1",
    session_id: "session-1",
    visitor_id: "visitor-1",
    label: "Contact form submitted"
  });
});
