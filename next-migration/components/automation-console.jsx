"use client";

import { useEffect, useState } from "react";

const DEFAULT_CREATE_PROMPT =
  "Create a paused Google Search campaign for coolyne focused on warehouse automation systems, AGV forklifts, ASRS, and warehouse software orchestration.";

const DEFAULT_OPTIMIZE_CONTEXT = [
  "Review current Google Ads performance for coolyne.",
  "Focus on managed landing pages and recent action history.",
  "Prioritize warehouse automation, AGV, ASRS, and software orchestration intent.",
];

const ACTION_LABELS = {
  create_search_ad: "Create Search Ad",
  optimize_ads: "Optimize Ads",
  summary: "Summary Refresh",
};

function prettyJson(value) {
  return JSON.stringify(value, null, 2);
}

function traceSummary(trace) {
  if (!trace?.traceId) {
    return null;
  }

  return [trace.traceId, trace.actor, trace.requestedAction].filter(Boolean).join(" · ");
}

function formatActionLabel(value) {
  if (!value) {
    return "unknown";
  }

  return ACTION_LABELS[value] || value;
}

function normalizeActionKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function normalizeTraceId(value) {
  return typeof value === "string" && value.trim()
    ? value.trim().toLowerCase()
    : "";
}

function parseTimestamp(value) {
  const time = Date.parse(value || "");
  return Number.isFinite(time) ? time : null;
}

function extractTaskId(value, depth = 0) {
  if (!value || depth > 4) {
    return null;
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    if (typeof value.taskId === "string" && value.taskId.trim()) {
      return value.taskId.trim();
    }

    if (typeof value.task_id === "string" && value.task_id.trim()) {
      return value.task_id.trim();
    }

    for (const nestedValue of Object.values(value)) {
      const taskId = extractTaskId(nestedValue, depth + 1);
      if (taskId) {
        return taskId;
      }
    }
  }

  if (Array.isArray(value)) {
    for (const nestedValue of value) {
      const taskId = extractTaskId(nestedValue, depth + 1);
      if (taskId) {
        return taskId;
      }
    }
  }

  return null;
}

function buildCorrelatedOperations(auditEntries, actionEntries) {
  const usedActionKeys = new Set();
  const actionItems = actionEntries.map((item, index) => ({
    ...item,
    _correlationKey: item.id || `${item.taskId || "task"}-${item.actionType || "action"}-${index}`,
    _normalizedAction: normalizeActionKey(item.actionType),
    _normalizedTraceId: normalizeTraceId(item.traceId),
    _createdAtMs: parseTimestamp(item.createdAt),
  }));

  const operations = auditEntries.map((item) => {
    const normalizedRequestedAction = normalizeActionKey(item.requestedAction);
    const normalizedTraceId = normalizeTraceId(item.traceId);
    const createdAtMs = parseTimestamp(item.createdAt);
    const responseTaskId = extractTaskId(item.responsePayload);
    const traceMatches = normalizedTraceId
      ? actionItems.filter(
          (action) =>
            !usedActionKeys.has(action._correlationKey) &&
            action._normalizedTraceId &&
            action._normalizedTraceId === normalizedTraceId
        )
      : [];
    const taskIdMatches = responseTaskId
      ? actionItems.filter(
          (action) =>
            !usedActionKeys.has(action._correlationKey) && action.taskId === responseTaskId
        )
      : [];

    const matchedActions =
      traceMatches.length > 0
        ? traceMatches
        : taskIdMatches.length > 0
        ? taskIdMatches
        : actionItems
            .filter((action) => {
              if (usedActionKeys.has(action._correlationKey)) {
                return false;
              }

              if (action._normalizedAction !== normalizedRequestedAction) {
                return false;
              }

              if (createdAtMs === null || action._createdAtMs === null) {
                return true;
              }

              return Math.abs(action._createdAtMs - createdAtMs) <= 30 * 60 * 1000;
            })
            .sort((left, right) => {
              const leftDelta =
                createdAtMs === null || left._createdAtMs === null
                  ? Number.MAX_SAFE_INTEGER
                  : Math.abs(left._createdAtMs - createdAtMs);
              const rightDelta =
                createdAtMs === null || right._createdAtMs === null
                  ? Number.MAX_SAFE_INTEGER
                  : Math.abs(right._createdAtMs - createdAtMs);

              return leftDelta - rightDelta;
            })
            .slice(0, 2);

    matchedActions.forEach((action) => usedActionKeys.add(action._correlationKey));

    return {
      ...item,
      matchedActions,
      responseTaskId,
      matchReason:
        traceMatches.length > 0
          ? "Matched by explicit traceId persisted in downstream action history"
          : taskIdMatches.length > 0
          ? "Matched by downstream taskId"
          : matchedActions.length > 0
            ? "Matched by action type and nearby timestamp"
            : "No downstream action has been correlated yet",
      displayAction: formatActionLabel(item.requestedAction),
    };
  });

  return {
    operations,
    unmatchedActions: actionItems.filter(
      (item) => !usedActionKeys.has(item._correlationKey)
    ),
  };
}

export default function AutomationConsole() {
  const [health, setHealth] = useState(null);
  const [healthError, setHealthError] = useState("");
  const [loadingHealth, setLoadingHealth] = useState(true);
  const [audit, setAudit] = useState([]);
  const [auditError, setAuditError] = useState("");
  const [loadingAudit, setLoadingAudit] = useState(true);
  const [summary, setSummary] = useState(null);
  const [summaryError, setSummaryError] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [submittingCreate, setSubmittingCreate] = useState(false);
  const [submittingOptimize, setSubmittingOptimize] = useState(false);
  const [createInstruction, setCreateInstruction] = useState(DEFAULT_CREATE_PROMPT);
  const [optimizeInstruction, setOptimizeInstruction] = useState("");
  const [actionResult, setActionResult] = useState(null);
  const [actionError, setActionError] = useState("");

  async function loadHealth() {
    setLoadingHealth(true);
    setHealthError("");

    try {
      const response = await fetch("/api/automation/health", {
        cache: "no-store",
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(
          payload?.upstream_bridge?.detail?.message ||
            payload?.upstream_bridge?.error ||
            payload?.error ||
            "Failed to load automation health."
        );
      }

      setHealth(payload);
    } catch (error) {
      setHealthError(
        error instanceof Error ? error.message : "Failed to load automation health."
      );
    } finally {
      setLoadingHealth(false);
    }
  }

  async function loadSummary() {
    setLoadingSummary(true);
    setSummaryError("");

    try {
      const response = await fetch("/api/automation/summary", {
        cache: "no-store",
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(
          payload?.detail?.message ||
            payload?.error ||
            "Failed to load automation summary."
        );
      }

      setSummary(payload);
    } catch (error) {
      setSummaryError(
        error instanceof Error ? error.message : "Failed to load automation summary."
      );
    } finally {
      setLoadingSummary(false);
    }
  }

  async function loadAudit() {
    setLoadingAudit(true);
    setAuditError("");

    try {
      const response = await fetch("/api/automation/audit/recent", {
        cache: "no-store",
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Failed to load automation audit history.");
      }

      setAudit(payload?.items || []);
    } catch (error) {
      setAuditError(
        error instanceof Error ? error.message : "Failed to load automation audit history."
      );
    } finally {
      setLoadingAudit(false);
    }
  }

  useEffect(() => {
    loadHealth();
    loadSummary();
    loadAudit();
  }, []);

  async function submitCreateSearchCampaign(event) {
    event.preventDefault();
    setSubmittingCreate(true);
    setActionError("");

    try {
      const response = await fetch("/api/automation/campaigns/search/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instruction: createInstruction,
          context_summary: summary?.action_history?.length
            ? [
                "Use the current automation summary as context.",
                `Recent action count: ${summary.action_history_count}.`,
                `Managed landing page count: ${summary.managed_landing_page_count}.`,
              ]
            : ["Use the current coolyne automation baseline as context."],
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(
          payload?.detail?.message ||
            payload?.error ||
            "Failed to trigger create_search_ad."
        );
      }

      setActionResult({
        action: "create_search_ad",
        payload,
      });
      await loadSummary();
      await loadAudit();
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Failed to trigger create_search_ad."
      );
    } finally {
      setSubmittingCreate(false);
    }
  }

  async function submitOptimizeAds(event) {
    event.preventDefault();
    setSubmittingOptimize(true);
    setActionError("");

    try {
      const response = await fetch("/api/automation/campaigns/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instruction: optimizeInstruction || null,
          context_summary: DEFAULT_OPTIMIZE_CONTEXT,
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(
          payload?.detail?.message ||
            payload?.error ||
            "Failed to trigger optimize_ads."
        );
      }

      setActionResult({
        action: "optimize_ads",
        payload,
      });
      await loadSummary();
      await loadAudit();
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Failed to trigger optimize_ads."
      );
    } finally {
      setSubmittingOptimize(false);
    }
  }

  const landingPages = summary?.landing_pages || [];
  const actionHistory = summary?.action_history || [];
  const latestActionTrace = traceSummary(actionResult?.payload?.trace || actionResult?.trace);
  const correlatedOperations = buildCorrelatedOperations(audit, actionHistory);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(254,107,0,0.14),_transparent_28%),linear-gradient(180deg,_#f7f9fc_0%,_#edf2f7_100%)] text-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:px-10">
        <section className="hsa-ui-card hsa-ui-card--soft overflow-hidden rounded-[32px] border border-slate-200/70 p-8 shadow-[0_28px_90px_rgba(0,23,54,0.08)] lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="hsa-ui-kicker">Internal Automation Console</span>
              <h1 className="hsa-ui-title mb-4 text-[clamp(2.4rem,5vw,4.4rem)]">
                Website Backend Automation Hub
              </h1>
              <p className="hsa-ui-body max-w-2xl text-[1.02rem]">
                This view is the first real consumer of the backend convergence path:
                the site calls same-origin Next routes, Next proxies to `huizong-api`,
                and `huizong-api` bridges into the AI guangao control plane.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
              <button
                className="hsa-ui-btn-secondary w-full justify-center lg:w-auto"
                onClick={loadHealth}
                type="button"
              >
                {loadingHealth ? "Checking Health..." : "Refresh Health"}
              </button>
              <button
                className="hsa-ui-btn-secondary w-full justify-center lg:w-auto"
                onClick={loadSummary}
                type="button"
              >
                {loadingSummary ? "Refreshing..." : "Refresh Summary"}
              </button>
              <button
                className="hsa-ui-btn-secondary w-full justify-center lg:w-auto"
                onClick={loadAudit}
                type="button"
              >
                {loadingAudit ? "Refreshing Audit..." : "Refresh Audit"}
              </button>
            </div>
          </div>
        </section>

        {healthError ? (
          <section className="rounded-3xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-800 shadow-sm">
            {healthError}
          </section>
        ) : null}

        {summaryError ? (
          <section className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-5 text-sm text-rose-700 shadow-sm">
            {summaryError}
          </section>
        ) : null}

        {auditError ? (
          <section className="rounded-3xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-800 shadow-sm">
            {auditError}
          </section>
        ) : null}

        {actionError ? (
          <section className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-5 text-sm text-rose-700 shadow-sm">
            {actionError}
          </section>
        ) : null}

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-3">
              <article className="hsa-ui-card rounded-[28px] p-6">
                <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                  Backend Stack
                </div>
                <div className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                  {summary?.backend_stack || "loading"}
                </div>
              </article>
              <article className="hsa-ui-card rounded-[28px] p-6">
                <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                  Managed Pages
                </div>
                <div className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                  {summary?.managed_landing_page_count ?? "-"}
                </div>
              </article>
              <article className="hsa-ui-card rounded-[28px] p-6">
                <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                  Recent Actions
                </div>
                <div className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                  {summary?.action_history_count ?? "-"}
                </div>
              </article>
            </div>

            <article className="hsa-ui-card rounded-[30px] p-6 lg:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                    Deployment Health
                  </div>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                    Site Proxy and Bridge Status
                  </h2>
                </div>
                <div
                  className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] ${
                    health?.ok
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {loadingHealth ? "Checking" : health?.ok ? "Healthy" : "Needs Attention"}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] border border-slate-200 bg-slate-50/90 p-5">
                  <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
                    Site Proxy Config
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-slate-700">
                    <div>
                      Base URL:
                      {" "}
                      {health?.site_proxy?.baseUrlConfigured ? "configured" : "missing"}
                    </div>
                    <div>
                      Internal token:
                      {" "}
                      {health?.site_proxy?.internalTokenConfigured ? "configured" : "missing"}
                    </div>
                    <div className="break-all text-slate-500">
                      {health?.site_proxy?.baseUrlOrigin || "No upstream origin resolved yet."}
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-slate-50/90 p-5">
                  <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
                    Upstream Bridge
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-slate-700">
                    <div>
                      Status:
                      {" "}
                      {health?.upstream_bridge?.status || health?.upstream_bridge?.error || "unknown"}
                    </div>
                    <div>
                      Backend stack:
                      {" "}
                      {health?.upstream_bridge?.backendStack || "unknown"}
                    </div>
                    <div>
                      Dispatch mode:
                      {" "}
                      {health?.upstream_bridge?.taskDispatchMode || "unknown"}
                    </div>
                  </div>
                </div>
              </div>

              <pre className="mt-6 overflow-x-auto rounded-[24px] bg-slate-950 px-5 py-5 text-xs leading-6 text-slate-200">
                {prettyJson(
                  health || {
                    message: "No deployment health response has been loaded yet.",
                  }
                )}
              </pre>
            </article>

            <article className="hsa-ui-card rounded-[30px] p-6 lg:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                    Managed Landing Pages
                  </div>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                    Current Editable Surface
                  </h2>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {landingPages.length ? (
                  landingPages.map((item) => (
                    <div
                      key={item.id || item.pageUrl}
                      className="rounded-[24px] border border-slate-200 bg-slate-50/90 p-5"
                    >
                      <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                        <span>{item.ownership}</span>
                        <span>{item.lifecycleStatus}</span>
                        {item.sourceWorkerName ? <span>{item.sourceWorkerName}</span> : null}
                      </div>
                      <div className="mt-3 text-base font-semibold text-slate-900">
                        {item.pagePath}
                      </div>
                      <a
                        className="mt-2 inline-block text-sm text-[#fe6b00] underline-offset-4 hover:underline"
                        href={item.pageUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item.pageUrl}
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/70 px-5 py-8 text-sm text-slate-500">
                    No managed landing pages have been registered yet.
                  </div>
                )}
              </div>
            </article>

            <article className="hsa-ui-card rounded-[30px] p-6 lg:p-7">
              <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                Trigger To Result Correlation
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                Manual Trigger Timeline
              </h2>
              <div className="mt-6 space-y-4">
                {correlatedOperations.operations.length ? (
                  correlatedOperations.operations.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[24px] border border-slate-200 bg-white px-5 py-5"
                    >
                      <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                        <span>{item.displayAction}</span>
                        <span>{item.success ? "success" : "failed"}</span>
                        <span>status {item.upstreamStatus}</span>
                        {item.responseTaskId ? <span>task {item.responseTaskId}</span> : null}
                      </div>
                      <div className="mt-3 text-base font-semibold text-slate-900">
                        {item.actor || "unknown actor"}{" -> "}{item.traceId}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.instructionExcerpt || "No instruction excerpt recorded."}
                      </p>
                      <div className="mt-3 rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold tracking-[0.04em] text-slate-600">
                        {item.matchReason}
                      </div>
                      <div className="mt-2 text-xs text-slate-500">
                        {item.createdAt}
                      </div>

                      <div className="mt-4 space-y-3">
                        {item.matchedActions.length ? (
                          item.matchedActions.map((action) => (
                            <div
                              key={action._correlationKey}
                              className="rounded-[20px] border border-emerald-200 bg-emerald-50/70 px-4 py-4"
                            >
                              <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                                <span>{formatActionLabel(action.actionType)}</span>
                                <span>{action.status}</span>
                                <span>{action.integrationTarget}</span>
                                {action.taskId ? <span>task {action.taskId}</span> : null}
                                {action.traceId ? <span>trace {action.traceId}</span> : null}
                              </div>
                              <p className="mt-2 text-sm leading-6 text-slate-700">
                                {action.summary}
                              </p>
                              <div className="mt-2 text-xs text-slate-500">
                                {action.createdAt}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="rounded-[20px] border border-dashed border-slate-300 bg-slate-50/80 px-4 py-4 text-sm text-slate-500">
                            No downstream action log has shown up for this trigger yet.
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/70 px-5 py-8 text-sm text-slate-500">
                    {loadingAudit
                      ? "Loading internal trigger timeline..."
                      : "No manual automation trigger has been recorded yet."}
                  </div>
                )}
              </div>
            </article>

            <article className="hsa-ui-card rounded-[30px] p-6 lg:p-7">
              <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                Recent Automation History
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                Unmatched Downstream Actions
              </h2>
              <div className="mt-6 space-y-4">
                {correlatedOperations.unmatchedActions.length ? (
                  correlatedOperations.unmatchedActions.map((item) => (
                    <div
                      key={item._correlationKey}
                      className="rounded-[24px] border border-slate-200 bg-white px-5 py-4"
                    >
                      <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                        <span>{item.integrationTarget}</span>
                        <span>{item.status}</span>
                        {item.taskId ? <span>task {item.taskId}</span> : null}
                        {item.traceId ? <span>trace {item.traceId}</span> : null}
                      </div>
                      <div className="mt-3 text-base font-semibold text-slate-900">
                        {formatActionLabel(item.actionType)}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.summary}
                      </p>
                      <div className="mt-2 text-xs text-slate-500">
                        {item.createdAt}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/70 px-5 py-8 text-sm text-slate-500">
                    {loadingSummary
                      ? "Loading downstream action history..."
                      : "Every recent downstream action is already linked to a manual trigger."}
                  </div>
                )}
              </div>
            </article>

            <article className="hsa-ui-card rounded-[30px] p-6 lg:p-7">
              <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                Manual Trigger Audit
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                Recent Internal Operator Actions
              </h2>
              <div className="mt-6 space-y-4">
                {audit.length ? (
                  audit.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[24px] border border-slate-200 bg-white px-5 py-4"
                    >
                      <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                        <span>{formatActionLabel(item.requestedAction)}</span>
                        <span>{item.success ? "success" : "failed"}</span>
                        <span>status {item.upstreamStatus}</span>
                      </div>
                      <div className="mt-3 text-base font-semibold text-slate-900">
                        {item.actor || "unknown actor"} · {item.traceId}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.instructionExcerpt || "No instruction excerpt recorded."}
                      </p>
                      <div className="mt-2 text-xs text-slate-500">
                        {item.createdAt}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/70 px-5 py-8 text-sm text-slate-500">
                    {loadingAudit
                      ? "Loading internal operator audit..."
                      : "No manual automation trigger has been recorded yet."}
                  </div>
                )}
              </div>
            </article>
          </div>

          <div className="grid gap-6">
            <article className="hsa-ui-card rounded-[30px] bg-[linear-gradient(180deg,_#001736_0%,_#08264b_100%)] p-6 text-white shadow-[0_24px_70px_rgba(0,23,54,0.28)] lg:p-7">
              <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ffcfb4]">
                Create Search Ads
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-tight">
                Trigger a New Paused Campaign
              </h2>
              <form className="mt-6 space-y-4" onSubmit={submitCreateSearchCampaign}>
                <textarea
                  className="min-h-[180px] w-full rounded-[22px] border border-white/12 bg-white/8 px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-white/45"
                  onChange={(event) => setCreateInstruction(event.target.value)}
                  placeholder="Describe the campaign you want the system to create."
                  value={createInstruction}
                />
                <button
                  className="hsa-ui-btn-primary w-full justify-center"
                  disabled={submittingCreate}
                  type="submit"
                >
                  {submittingCreate ? "Submitting..." : "Create Search Campaign"}
                </button>
              </form>
            </article>

            <article className="hsa-ui-card rounded-[30px] p-6 lg:p-7">
              <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                Optimize Ads
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                Run the Optimization Loop
              </h2>
              <form className="mt-6 space-y-4" onSubmit={submitOptimizeAds}>
                <textarea
                  className="min-h-[160px] w-full rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400"
                  onChange={(event) => setOptimizeInstruction(event.target.value)}
                  placeholder="Optional instruction. Leave blank to use the current optimization baseline."
                  value={optimizeInstruction}
                />
                <button
                  className="hsa-ui-btn-secondary w-full justify-center"
                  disabled={submittingOptimize}
                  type="submit"
                >
                  {submittingOptimize ? "Submitting..." : "Trigger Optimization"}
                </button>
              </form>
            </article>

            <article className="hsa-ui-card rounded-[30px] p-6 lg:p-7">
              <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                Latest Result
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                Last Trigger Response
              </h2>
              {latestActionTrace ? (
                <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold tracking-[0.04em] text-slate-600">
                  Trace: {latestActionTrace}
                </div>
              ) : null}
              <pre className="mt-6 overflow-x-auto rounded-[24px] bg-slate-950 px-5 py-5 text-xs leading-6 text-slate-200">
                {prettyJson(
                  actionResult || {
                    message:
                      "No trigger has been sent from this console yet.",
                  }
                )}
              </pre>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
