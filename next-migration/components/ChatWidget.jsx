"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const INITIAL_MESSAGE = {
  id: "welcome",
  role: "assistant",
  text: "Hi! 👋 I'm part of the coolyne engineering team. How can I help you today?",
};

INITIAL_MESSAGE.text =
  "Hi! \u{1F44B} I'm part of the coolyne engineering team. How can I help you today?";

const FALLBACK_REPLY =
  "Thanks. Our engineering team will review your request and contact you soon.";

const SUPPORT_REPLY =
  "Please describe your AGV/AMR issue, payload, warehouse layout, and integration requirement.";

const QUICK_OPTIONS = [
  {
    id: "quote",
    label: "Get a quick quote",
    icon: "savings",
  },
  {
    id: "site-visit",
    label: "Schedule a site visit",
    icon: "event",
  },
  {
    id: "catalog",
    label: "Download product catalog",
    icon: "download",
  },
  {
    id: "support",
    label: "Technical support",
    icon: "build",
  },
];

function ChatIcon({ name, size = 18, className = "", style }) {
  const sharedProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    className,
    width: size,
    height: size,
    style: {
      width: `${size}px`,
      height: `${size}px`,
      minWidth: `${size}px`,
      minHeight: `${size}px`,
      maxWidth: `${size}px`,
      maxHeight: `${size}px`,
      display: "block",
      flex: "0 0 auto",
      ...style,
    },
  };

  if (name === "close") {
    return (
      <svg {...sharedProps}>
        <path d="M6 6 18 18" />
        <path d="m18 6-12 12" />
      </svg>
    );
  }

  if (name === "savings") {
    return (
      <svg {...sharedProps}>
        <path d="M4.5 7.5h15" />
        <path d="M6.5 7.5V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1.5" />
        <rect x="3.5" y="7.5" width="17" height="12.5" rx="2.5" />
        <path d="M12 10.2v7.6" />
        <path d="M9.4 12.3c0-1.1 1-1.9 2.6-1.9 1.5 0 2.5.7 2.5 1.8 0 2.7-5.1 1.1-5.1 3.6 0 1.1 1 1.8 2.6 1.8 1.5 0 2.6-.7 2.6-1.8" />
      </svg>
    );
  }

  if (name === "event") {
    return (
      <svg {...sharedProps}>
        <rect x="4" y="5" width="16" height="15" rx="2.5" />
        <path d="M8 3.5v3" />
        <path d="M16 3.5v3" />
        <path d="M4 9.5h16" />
        <path d="m9.5 13 1.8 1.8 3.4-3.8" />
      </svg>
    );
  }

  if (name === "download") {
    return (
      <svg {...sharedProps}>
        <path d="M12 4.5v10" />
        <path d="m7.8 10.8 4.2 4.2 4.2-4.2" />
        <path d="M5 19.5h14" />
      </svg>
    );
  }

  if (name === "build") {
    return (
      <svg {...sharedProps}>
        <path d="m14.6 6.2 3.2-3.2a4.1 4.1 0 0 1 2.4 5.6l-7.7 7.7a2.8 2.8 0 0 1-3.9 0L4.5 12.2a2.8 2.8 0 0 1 0-3.9l7.7-7.7A4.1 4.1 0 0 1 17.8 3l-3.2 3.2" />
        <path d="m13.2 7.6 3.2 3.2" />
      </svg>
    );
  }

  if (name === "send") {
    return (
      <svg {...sharedProps}>
        <path d="M3.5 11.8 20.5 4 14.3 20l-2.7-6.2-8.1-2Z" />
        <path d="M11.5 13.8 20.5 4" />
      </svg>
    );
  }

  if (name === "chat") {
    return (
      <svg {...sharedProps}>
        <path d="M6.2 17.5H4a1.5 1.5 0 0 1-1.5-1.5V6A1.5 1.5 0 0 1 4 4.5h16A1.5 1.5 0 0 1 21.5 6v10A1.5 1.5 0 0 1 20 17.5H11l-4.8 3Z" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <path d="M7.5 13.5V12a4.5 4.5 0 1 1 9 0v1.5" />
      <rect x="5.5" y="12.5" width="13" height="7" rx="2.5" />
      <path d="M12 16v.1" />
      <path d="M9 9.5a3 3 0 0 1 6 0" />
    </svg>
  );
}

function createMessage(role, text, extra = {}) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    text,
    ...extra,
  };
}

function MessageBubble({ message, index }) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`hsa-chat-message ${isAssistant ? "hsa-chat-message-assistant" : "hsa-chat-message-user"}`}
      style={{ "--message-delay": `${index * 100}ms` }}
    >
      {isAssistant ? (
        <div className="hsa-chat-avatar" aria-hidden="true">
          <ChatIcon name="support_agent" size={18} />
        </div>
      ) : null}
      <div
        className={`hsa-chat-bubble ${isAssistant ? "hsa-chat-bubble-assistant" : "hsa-chat-bubble-user"}`}
      >
        <p>{message.text}</p>
        {message.href ? (
          <a className="hsa-chat-inline-link" href={message.href}>
            {message.linkLabel || "Open recommended page"}
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);

  function appendAssistantMessage(text, extra = {}) {
    setMessages((current) => [...current, createMessage("assistant", text, extra)]);
  }

  function handleRouteIntent(intent) {
    router.push(`/contact?intent=${intent}`);
    setIsOpen(false);
  }

  async function handleCatalogDownload() {
    try {
      const response = await fetch("/downloads/product-catalog.pdf", {
        method: "HEAD",
        cache: "no-store",
      });

      if (response.ok) {
        window.open("/downloads/product-catalog.pdf", "_blank", "noopener,noreferrer");
        return;
      }
    } catch (_error) {
      // Silent fallback to assistant reply below.
    }

    appendAssistantMessage(
      "The product catalog PDF is not online yet. Please upload /public/downloads/product-catalog.pdf to enable direct download."
    );
  }

  async function handleQuickOption(optionId) {
    if (optionId === "quote") {
      handleRouteIntent("quote");
      return;
    }

    if (optionId === "site-visit") {
      handleRouteIntent("site-visit");
      return;
    }

    if (optionId === "catalog") {
      await handleCatalogDownload();
      return;
    }

    if (optionId === "support") {
      appendAssistantMessage(SUPPORT_REPLY);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const query = input.trim();
    if (!query || isSubmitting) {
      return;
    }

    setMessages((current) => [...current, createMessage("user", query)]);
    setInput("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const data = await response.json();
      appendAssistantMessage(data.answer || FALLBACK_REPLY, {
        href: data.href,
        linkLabel: data.linkLabel,
      });
    } catch (_error) {
      appendAssistantMessage(FALLBACK_REPLY);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="hsa-chat-widget" aria-live="polite">
        {isOpen ? (
          <section className="hsa-chat-panel" aria-label="Chat with Us">
            <div className="hsa-chat-header">
              <div>
                <h2>Chat with Us</h2>
                <p>
                  <span className="hsa-chat-online-dot" aria-hidden="true" />
                  Online - Response within minutes
                </p>
              </div>
              <button
                type="button"
                className="hsa-chat-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat window"
              >
                <ChatIcon name="close" size={20} />
              </button>
            </div>

            <div className="hsa-chat-body">
              <div className="hsa-chat-messages">
                {messages.map((message, index) => (
                  <MessageBubble key={message.id} index={index} message={message} />
                ))}
              </div>

              <div className="hsa-chat-quick-actions">
                <span className="hsa-chat-quick-label">Quick options:</span>
                <div className="hsa-chat-quick-list">
                  {QUICK_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className="hsa-chat-quick-option"
                      onClick={() => handleQuickOption(option.id)}
                    >
                      <span className="hsa-chat-quick-icon" aria-hidden="true">
                        <ChatIcon name={option.icon} size={18} />
                      </span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <form className="hsa-chat-form" onSubmit={handleSubmit}>
              <div className="hsa-chat-input-row">
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Type your message..."
                  className="hsa-chat-input"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className="hsa-chat-send"
                  disabled={isSubmitting || !input.trim()}
                  aria-label="Send message"
                >
                  <ChatIcon name="send" size={18} />
                </button>
              </div>
              <p className="hsa-chat-disclaimer">
                By chatting, you agree to our terms. We'll never share your info.
              </p>
            </form>
          </section>
        ) : null}

        <button
          type="button"
          className="hsa-chat-trigger"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          <ChatIcon name={isOpen ? "close" : "chat"} size={24} />
        </button>
      </div>

      <style jsx>{`
        .hsa-chat-widget {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 140;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 16px;
          pointer-events: none;
        }

        .hsa-chat-widget :global(*) {
          box-sizing: border-box;
        }

        .hsa-chat-panel,
        .hsa-chat-trigger {
          pointer-events: auto;
        }

        .hsa-chat-panel {
          width: min(350px, calc(100vw - 24px));
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 28px 80px rgba(3, 19, 46, 0.24);
          border: 1px solid rgba(16, 42, 86, 0.08);
          transform-origin: right bottom;
          animation: hsa-chat-panel-in 280ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .hsa-chat-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 16px 14px;
          background: linear-gradient(135deg, #18335f, #102a56);
          color: #ffffff;
        }

        .hsa-chat-header h2 {
          margin: 0;
          font: 800 1.55rem/1 Manrope, sans-serif;
          letter-spacing: -0.03em;
        }

        .hsa-chat-header p {
          margin: 8px 0 0;
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.88);
          font: 700 0.9rem/1.3 Inter, sans-serif;
        }

        .hsa-chat-online-dot {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: #31c46d;
          box-shadow: 0 0 0 4px rgba(49, 196, 109, 0.16);
        }

        .hsa-chat-close {
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.9);
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          cursor: pointer;
          border-radius: 999px;
        }

        .hsa-chat-close:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .hsa-chat-body {
          max-height: min(54vh, 460px);
          overflow-y: auto;
          padding: 16px 14px 14px;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        }

        .hsa-chat-messages {
          display: grid;
          gap: 12px;
        }

        .hsa-chat-message {
          display: flex;
          gap: 10px;
          opacity: 0;
          transform: translateY(10px);
          animation: hsa-chat-message-in 260ms ease-out forwards;
          animation-delay: var(--message-delay, 0ms);
        }

        .hsa-chat-message-user {
          justify-content: flex-end;
        }

        .hsa-chat-avatar {
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: #17325e;
          color: #ffffff;
        }

        .hsa-chat-bubble {
          max-width: 258px;
          border-radius: 15px;
          padding: 12px 13px;
          font: 500 0.93rem/1.42 Inter, sans-serif;
          box-shadow: 0 10px 24px rgba(16, 42, 86, 0.08);
        }

        .hsa-chat-bubble p {
          margin: 0;
          white-space: pre-wrap;
        }

        .hsa-chat-bubble-assistant {
          background: #ffffff;
          border: 1px solid rgba(16, 42, 86, 0.1);
          color: #20314d;
        }

        .hsa-chat-bubble-user {
          background: #102a56;
          color: #ffffff;
        }

        .hsa-chat-inline-link {
          display: inline-flex;
          margin-top: 10px;
          color: #184b9b;
          font-weight: 700;
          text-decoration: none;
        }

        .hsa-chat-inline-link:hover {
          text-decoration: underline;
        }

        .hsa-chat-quick-actions {
          margin-top: 16px;
          display: grid;
          gap: 10px;
        }

        .hsa-chat-quick-label {
          color: #7b8aa3;
          font: 700 0.88rem/1.2 Inter, sans-serif;
        }

        .hsa-chat-quick-list {
          display: grid;
          gap: 9px;
        }

        .hsa-chat-quick-option {
          width: 100%;
          border: 1px solid rgba(16, 42, 86, 0.12);
          background: #ffffff;
          border-radius: 13px;
          min-height: 50px;
          padding: 0 13px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #21314d;
          font: 700 0.92rem/1.2 Inter, sans-serif;
          cursor: pointer;
          text-align: left;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }

        .hsa-chat-quick-option:hover {
          transform: translateY(-1px);
          border-color: rgba(254, 107, 0, 0.35);
          box-shadow: 0 16px 28px rgba(16, 42, 86, 0.08);
        }

        .hsa-chat-quick-icon {
          color: #fe6b00;
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
        }

        .hsa-chat-form {
          padding: 12px 14px 14px;
          border-top: 1px solid rgba(16, 42, 86, 0.08);
          background: #ffffff;
        }

        .hsa-chat-input-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hsa-chat-input {
          width: 100%;
          min-width: 0;
          border: 1px solid rgba(16, 42, 86, 0.14);
          border-radius: 12px;
          min-height: 44px;
          padding: 0 13px;
          outline: none;
          color: #20314d;
          font: 500 0.92rem/1 Inter, sans-serif;
          background: linear-gradient(180deg, #ffffff, #fbfcfe);
          transition:
            border-color 0.22s ease,
            box-shadow 0.22s ease,
            background-color 0.22s ease,
            transform 0.22s ease;
        }

        .hsa-chat-input:focus {
          border-color: rgba(254, 107, 0, 0.56);
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(254, 107, 0, 0.14);
          animation: hsa-chat-input-pulse 1.1s ease-out 1;
          transform: translateY(-1px);
        }

        .hsa-chat-send {
          width: 44px;
          height: 44px;
          border: 0;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #ff9f2f, #fe6b00);
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 14px 26px rgba(254, 107, 0, 0.22);
        }

        .hsa-chat-send:hover:not(:disabled) {
          transform: translateY(-1px);
        }

        .hsa-chat-send:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          box-shadow: none;
        }

        .hsa-chat-disclaimer {
          margin: 10px 4px 0;
          text-align: center;
          color: #97a4b7;
          font: 600 0.72rem/1.4 Inter, sans-serif;
        }

        .hsa-chat-trigger {
          width: 56px;
          height: 56px;
          border: 0;
          border-radius: 999px;
          background: linear-gradient(135deg, #ff9f2f, #fe6b00);
          color: #ffffff;
          display: grid;
          place-items: center;
          cursor: pointer;
          box-shadow: 0 18px 34px rgba(254, 107, 0, 0.28);
          transition: transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease;
        }

        .hsa-chat-trigger:hover {
          transform: scale(1.03);
          filter: brightness(0.96);
          box-shadow: 0 24px 42px rgba(254, 107, 0, 0.32);
        }

        @keyframes hsa-chat-panel-in {
          from {
            opacity: 0;
            transform: translate3d(0, 18px, 0) scale(0.92);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes hsa-chat-message-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hsa-chat-input-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(254, 107, 0, 0.2);
          }

          100% {
            box-shadow: 0 0 0 8px rgba(254, 107, 0, 0);
          }
        }

        @media (max-width: 640px) {
          .hsa-chat-widget {
            right: 12px;
            bottom: 12px;
            left: 12px;
            align-items: flex-end;
          }

          .hsa-chat-panel {
            width: min(100%, 100%);
          }

          .hsa-chat-header {
            padding: 16px 14px 13px;
          }

          .hsa-chat-header h2 {
            font-size: 1.4rem;
          }

          .hsa-chat-header p {
            font-size: 0.84rem;
          }

          .hsa-chat-body {
            max-height: min(52vh, 420px);
            padding: 14px 12px 12px;
          }

          .hsa-chat-bubble {
            max-width: calc(100vw - 104px);
          }

          .hsa-chat-form {
            padding: 11px 12px 12px;
          }

          .hsa-chat-trigger {
            width: 54px;
            height: 54px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hsa-chat-panel,
          .hsa-chat-message,
          .hsa-chat-input,
          .hsa-chat-trigger {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}
