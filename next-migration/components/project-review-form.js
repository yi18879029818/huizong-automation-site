"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SUCCESS_REDIRECT_PATH = "/thanks/";
const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;
const ALLOWED_UPLOAD_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/acad",
  "image/vnd.dwg",
  "application/dxf",
  "image/vnd.dxf",
]);
const ALLOWED_UPLOAD_EXTENSIONS = [".pdf", ".dwg", ".dxf", ".png", ".jpg", ".jpeg", ".webp"];

const INITIAL_FORM = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  industry: "",
  automationNeed: "",
  loadWeight: "",
  loadSize: "",
  dailyThroughput: "",
  travelDistance: "",
  aisleWidth: "",
  liftingHeight: "",
  softwareIntegrationRequirement: "",
  budgetStage: "",
  message: "",
};

const INDUSTRY_OPTIONS = [
  "Automotive",
  "Electronics",
  "Food and Beverage",
  "Pharmaceutical",
  "E-commerce / 3PL",
  "Industrial Manufacturing",
  "Consumer Goods",
  "Other",
];

const AUTOMATION_NEED_OPTIONS = [
  "Forklift Automation",
  "Line-side Delivery",
  "Storage Density Upgrade",
  "Picking Automation",
  "Conveyor Transfer",
  "Machine Tending",
  "Integrated Warehouse Automation",
  "Other",
];

const SOFTWARE_REQUIREMENT_OPTIONS = [
  "No integration yet",
  "WMS integration",
  "ERP integration",
  "WCS / RCS integration",
  "MES / production line integration",
  "Need engineering review",
];

const BUDGET_STAGE_OPTIONS = [
  "Planning",
  "Budgeting",
  "Approved project",
  "Comparing suppliers",
  "Need feasibility review first",
];

function toLabel(value) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildField(name, value, type, required = false, label = toLabel(name)) {
  return {
    name,
    label,
    value: typeof value === "string" ? value.trim() : value || "",
    required,
    type,
  };
}

function isAllowedUpload(file) {
  if (!file) {
    return true;
  }

  const lowerName = file.name.toLowerCase();
  return ALLOWED_UPLOAD_EXTENSIONS.some((extension) => lowerName.endsWith(extension));
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      const content = result.includes(",") ? result.split(",")[1] : "";
      if (!content) {
        reject(new Error("Unable to process the selected file."));
        return;
      }
      resolve({
        filename: file.name,
        type: ALLOWED_UPLOAD_TYPES.has(file.type) ? file.type : "application/octet-stream",
        size: file.size,
        content,
      });
    };

    reader.onerror = () => reject(new Error("Unable to read the selected file."));
    reader.readAsDataURL(file);
  });
}

function buildPayload(formState, attachment) {
  const fields = [
    buildField("fullName", formState.fullName, "text", true, "Name"),
    buildField("company", formState.company, "text", true, "Company"),
    buildField("email", formState.email, "email", true, "Email"),
    buildField("phone", formState.phone, "tel", false, "Phone / WhatsApp"),
    buildField("country", formState.country, "text", false, "Country"),
    buildField("industry", formState.industry, "text", false, "Industry"),
    buildField("automationNeed", formState.automationNeed, "text", true, "Automation Need"),
    buildField("loadWeight", formState.loadWeight, "text", false, "Load Weight"),
    buildField("loadSize", formState.loadSize, "text", false, "Load Size"),
    buildField("dailyThroughput", formState.dailyThroughput, "text", false, "Daily Throughput"),
    buildField("travelDistance", formState.travelDistance, "text", false, "Travel Distance"),
    buildField("aisleWidth", formState.aisleWidth, "text", false, "Aisle Width"),
    buildField("liftingHeight", formState.liftingHeight, "text", false, "Lifting Height"),
    buildField(
      "softwareIntegrationRequirement",
      formState.softwareIntegrationRequirement,
      "text",
      false,
      "Software Integration Requirement",
    ),
    buildField("budgetStage", formState.budgetStage, "text", false, "Budget Stage"),
    buildField("message", formState.message, "textarea", true, "Message"),
  ];

  if (attachment?.filename) {
    fields.push(buildField("layoutFile", attachment.filename, "text", false, "Upload Layout"));
  }

  return {
    formType: "project-review",
    formLabel: "Contact Page Project Review",
    pageTitle: typeof document !== "undefined" ? document.title || "" : "",
    pagePath: typeof window !== "undefined" ? window.location.pathname || "" : "",
    pageUrl: typeof window !== "undefined" ? window.location.href || "" : "",
    submittedAt: new Date().toISOString(),
    fields,
    attachments: attachment ? [attachment] : [],
  };
}

export function ProjectReviewForm() {
  const router = useRouter();
  const [formState, setFormState] = useState(INITIAL_FORM);
  const [layoutFile, setLayoutFile] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [pending, setPending] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;

    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function onFileChange(event) {
    const file = event.target.files?.[0] || null;

    if (!file) {
      setLayoutFile(null);
      setStatus((current) => (current.type === "error" ? { type: "", message: "" } : current));
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      event.target.value = "";
      setLayoutFile(null);
      setStatus({
        type: "error",
        message: "Upload Layout must be 10MB or smaller.",
      });
      return;
    }

    if (!isAllowedUpload(file)) {
      event.target.value = "";
      setLayoutFile(null);
      setStatus({
        type: "error",
        message: "Accepted file types: PDF, DWG, DXF, PNG, JPG, JPEG, or WEBP.",
      });
      return;
    }

    setLayoutFile(file);
    setStatus((current) =>
      current.type === "error" ? { type: "", message: "" } : current,
    );
  }

  async function onSubmit(event) {
    event.preventDefault();
    setPending(true);
    setStatus({ type: "pending", message: "Sending..." });

    try {
      const attachment = layoutFile ? await fileToBase64(layoutFile) : null;
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildPayload(formState, attachment)),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Unable to send right now.");
      }

      setFormState(INITIAL_FORM);
      setLayoutFile(null);
      event.currentTarget.reset();
      setStatus({
        type: "success",
        message: "Thanks, your project review request has been emailed to our team.",
      });

      if (typeof window !== "undefined" && typeof window.__hsaTrackGaEvent === "function") {
        window.__hsaTrackGaEvent("generate_lead", {
          form_type: "project-review",
          form_label: "Contact Page Project Review",
          page_path: window.location.pathname || "/contact",
        });
      }

      router.push(SUCCESS_REDIRECT_PATH);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error && error.message
            ? error.message
            : "Unable to send right now. Please try again in a moment.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Field
          label="Name"
          name="fullName"
          onChange={updateField}
          placeholder="Your name"
          required
          value={formState.fullName}
        />
        <Field
          label="Company"
          name="company"
          onChange={updateField}
          placeholder="Company name"
          required
          value={formState.company}
        />
        <Field
          label="Email"
          name="email"
          onChange={updateField}
          placeholder="work@company.com"
          required
          type="email"
          value={formState.email}
        />
        <Field
          label="Phone / WhatsApp"
          name="phone"
          onChange={updateField}
          placeholder="+1 000 000 0000"
          type="tel"
          value={formState.phone}
        />
        <Field
          label="Country"
          name="country"
          onChange={updateField}
          placeholder="Country / region"
          value={formState.country}
        />
        <SelectField
          label="Industry"
          name="industry"
          onChange={updateField}
          options={INDUSTRY_OPTIONS}
          value={formState.industry}
        />
        <SelectField
          label="Automation Need"
          name="automationNeed"
          onChange={updateField}
          options={AUTOMATION_NEED_OPTIONS}
          required
          value={formState.automationNeed}
        />
        <Field
          label="Load Weight"
          name="loadWeight"
          onChange={updateField}
          placeholder="e.g. 800kg per pallet"
          value={formState.loadWeight}
        />
        <Field
          label="Load Size"
          name="loadSize"
          onChange={updateField}
          placeholder="e.g. 1200 x 1000mm"
          value={formState.loadSize}
        />
        <Field
          label="Daily Throughput"
          name="dailyThroughput"
          onChange={updateField}
          placeholder="e.g. 500 pallets / day"
          value={formState.dailyThroughput}
        />
        <Field
          label="Travel Distance"
          name="travelDistance"
          onChange={updateField}
          placeholder="e.g. 60m one-way"
          value={formState.travelDistance}
        />
        <Field
          label="Aisle Width"
          name="aisleWidth"
          onChange={updateField}
          placeholder="e.g. 3.2m"
          value={formState.aisleWidth}
        />
        <Field
          label="Lifting Height"
          name="liftingHeight"
          onChange={updateField}
          placeholder="e.g. 4.5m"
          value={formState.liftingHeight}
        />
        <SelectField
          label="Software Integration Requirement"
          name="softwareIntegrationRequirement"
          onChange={updateField}
          options={SOFTWARE_REQUIREMENT_OPTIONS}
          value={formState.softwareIntegrationRequirement}
        />
        <SelectField
          label="Budget Stage"
          name="budgetStage"
          onChange={updateField}
          options={BUDGET_STAGE_OPTIONS}
          value={formState.budgetStage}
        />
      </div>

      <label className="block space-y-2">
        <span className="text-[10px] font-black tracking-[0.15em] text-outline">
          Upload Layout
        </span>
        <input
          accept={ALLOWED_UPLOAD_EXTENSIONS.join(",")}
          className="w-full cursor-pointer border-2 border-dashed border-outline-variant/40 bg-surface-container-lowest px-4 py-4 text-sm font-medium text-on-surface file:mr-4 file:rounded-none file:border-0 file:bg-primary file:px-4 file:py-2 file:text-xs file:font-black file:tracking-[0.16em] file:text-white hover:border-secondary focus:border-secondary focus:outline-none"
          name="layoutUpload"
          onChange={onFileChange}
          type="file"
        />
        <p className="text-xs leading-6 text-on-surface-variant">
          Optional. PDF, DWG, DXF, PNG, JPG, or WEBP up to 10MB.
          {layoutFile ? ` Selected: ${layoutFile.name}` : ""}
        </p>
      </label>

      <label className="block space-y-2">
        <span className="text-[10px] font-black tracking-[0.15em] text-outline">Message</span>
        <textarea
          className="w-full resize-y border-2 border-outline-variant/40 bg-surface-container-lowest px-4 py-4 font-medium text-on-surface outline-none transition-all placeholder:text-outline-variant/40 focus:border-secondary focus:ring-0"
          name="message"
          onChange={updateField}
          placeholder="Share your workflow, bottlenecks, layout conditions, interface expectations, and target timeline."
          required
          rows={5}
          value={formState.message}
        />
      </label>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          className="w-full bg-secondary px-12 py-5 text-xs font-black tracking-[0.2em] text-white shadow-xl shadow-secondary/10 transition-all duration-300 hover:bg-primary md:w-auto"
          disabled={pending}
          type="submit"
        >
          {pending ? "Sending..." : "Request Project Review"}
        </button>
        <p className={`text-sm ${status.type === "error" ? "text-[#b42318]" : "text-on-surface-variant"}`}>
          {status.message}
        </p>
      </div>
    </form>
  );
}

function Field({ label, name, onChange, placeholder, required = false, type = "text", value }) {
  return (
    <label className="space-y-2">
      <span className="text-[10px] font-black tracking-[0.15em] text-outline">{label}</span>
      <input
        className="w-full border-2 border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-medium text-on-surface outline-none transition-all placeholder:text-outline-variant/40 focus:border-secondary focus:ring-0"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

function SelectField({ label, name, onChange, options, required = false, value }) {
  return (
    <label className="space-y-2">
      <span className="text-[10px] font-black tracking-[0.15em] text-outline">{label}</span>
      <select
        className="w-full border-2 border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-medium text-on-surface outline-none transition-all focus:border-secondary focus:ring-0"
        name={name}
        onChange={onChange}
        required={required}
        value={value}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
