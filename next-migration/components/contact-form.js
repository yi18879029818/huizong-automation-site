"use client";

import { useState } from "react";

const INITIAL_FORM = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  marketingConsent: false
};

function buildPayload(formState) {
  return {
    formType: "consultation",
    formLabel: "Structured Contact Inquiry",
    pageTitle: document.title || "",
    pagePath: window.location.pathname || "",
    pageUrl: window.location.href || "",
    submittedAt: new Date().toISOString(),
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        value: formState.fullName.trim(),
        required: true,
        type: "text"
      },
      {
        name: "company",
        label: "Company",
        value: formState.company.trim(),
        required: false,
        type: "text"
      },
      {
        name: "email",
        label: "Email",
        value: formState.email.trim(),
        required: true,
        type: "email"
      },
      {
        name: "phone",
        label: "Phone / WhatsApp",
        value: formState.phone.trim(),
        required: false,
        type: "tel"
      },
      {
        name: "message",
        label: "Project Scope",
        value: formState.message.trim(),
        required: true,
        type: "textarea"
      },
      {
        name: "marketingConsent",
        label: "Marketing Consent",
        value: formState.marketingConsent ? "Yes" : "No",
        required: false,
        type: "checkbox"
      }
    ]
  };
}

export function ContactForm() {
  const [formState, setFormState] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [pending, setPending] = useState(false);

  function updateField(event) {
    const { name, value, type, checked } = event.target;

    setFormState((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setPending(true);
    setStatus({ type: "pending", message: "Sending..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(buildPayload(formState))
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Unable to send right now.");
      }

      setFormState(INITIAL_FORM);
      setStatus({
        type: "success",
        message: "Thanks, your request has been emailed to the team."
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Unable to send right now. Please try again in a moment."
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="structured-form" onSubmit={onSubmit}>
      <div className="structured-form-grid">
        <label>
          <span>Full Name</span>
          <input
            name="fullName"
            onChange={updateField}
            required
            type="text"
            value={formState.fullName}
          />
        </label>
        <label>
          <span>Company</span>
          <input name="company" onChange={updateField} type="text" value={formState.company} />
        </label>
      </div>
      <div className="structured-form-grid">
        <label>
          <span>Email Address</span>
          <input
            name="email"
            onChange={updateField}
            required
            type="email"
            value={formState.email}
          />
        </label>
        <label>
          <span>Phone / WhatsApp</span>
          <input name="phone" onChange={updateField} type="tel" value={formState.phone} />
        </label>
      </div>
      <label>
        <span>Project Scope</span>
        <textarea
          name="message"
          onChange={updateField}
          required
          rows={5}
          value={formState.message}
        />
      </label>
      <label className="structured-checkbox">
        <input
          checked={formState.marketingConsent}
          name="marketingConsent"
          onChange={updateField}
          type="checkbox"
        />
        <span>I agree to receive follow-up communication related to this inquiry.</span>
      </label>
      <div className="structured-form-actions">
        <button className="hero-button" disabled={pending} type="submit">
          {pending ? "Sending..." : "Initiate Consultation"}
        </button>
        <p className={`structured-form-status is-${status.type || "idle"}`}>{status.message}</p>
      </div>
    </form>
  );
}
