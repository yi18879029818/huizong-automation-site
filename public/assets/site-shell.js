(function () {
  function route(key) {
    return (window.__SITE_ROUTES__ || {})[key] || "#";
  }

  function goto(key) {
    window.location.href = route(key);
  }

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function showToast(msg) {
    var toast = document.querySelector(".hsa-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "hsa-toast";
      document.body.appendChild(toast);
    }

    toast.textContent = msg;
    toast.classList.add("show");
    window.clearTimeout(window.__hsaToastTimer);
    window.__hsaToastTimer = window.setTimeout(function () {
      toast.classList.remove("show");
    }, 2600);
  }

  function trimValue(value) {
    return (typeof value === "string" ? value : "").replace(/\s+/g, " ").trim();
  }

  function trimMultilineValue(value) {
    return (typeof value === "string" ? value : "")
      .replace(/\r\n?/g, "\n")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function cleanLabel(text) {
    return trimValue((text || "").replace(/\*/g, ""));
  }

  function getSubmitButton(form) {
    return form.querySelector('button[type="submit"], input[type="submit"]');
  }

  function getStatusBaseClass(form) {
    return form.classList.contains("hsa-expert-modal__form")
      ? "hsa-expert-modal__status"
      : "hsa-form-status";
  }

  function ensureStatusNode(form) {
    var status = form.__hsaStatusNode;
    var submitButton;

    if (status && status.parentNode) {
      return status;
    }

    status = form.querySelector(".hsa-expert-modal__status, .hsa-form-status");
    if (status) {
      form.__hsaStatusNode = status;
      return status;
    }

    status = document.createElement("p");
    status.className = getStatusBaseClass(form);
    status.setAttribute("aria-live", "polite");

    if (form.classList.contains("hsa-expert-modal__form")) {
      submitButton = getSubmitButton(form);
      if (submitButton && submitButton.parentNode) {
        submitButton.parentNode.insertBefore(status, submitButton);
      } else {
        form.appendChild(status);
      }
    } else if (form.parentNode) {
      form.parentNode.insertBefore(status, form.nextSibling);
    } else {
      form.appendChild(status);
    }

    form.__hsaStatusNode = status;
    return status;
  }

  function setFormStatus(form, message, tone) {
    var status = ensureStatusNode(form);
    var baseClass = getStatusBaseClass(form);

    if (!status) {
      return;
    }

    status.textContent = message || "";
    status.className = baseClass + (tone ? " is-" + tone : "");
  }

  function getFieldLabel(field, form) {
    var label;
    var previous;

    if (field.dataset && field.dataset.label) {
      return cleanLabel(field.dataset.label);
    }

    label = field.closest("label");
    if (label) {
      return cleanLabel(label.textContent);
    }

    previous = field.previousElementSibling;
    if (previous && previous.tagName === "LABEL") {
      return cleanLabel(previous.textContent);
    }

    if (field.id) {
      label = form.querySelector('label[for="' + field.id + '"]');
      if (label) {
        return cleanLabel(label.textContent);
      }
    }

    return cleanLabel(field.name || "Field");
  }

  function getFieldValue(field) {
    var selected;

    if (field.type === "checkbox") {
      if (field.checked) {
        return field.value && field.value !== "on" ? trimValue(field.value) : "Yes";
      }
      return "No";
    }

    if (field.type === "radio") {
      return field.checked ? trimValue(field.value) : "";
    }

    if (field.tagName === "TEXTAREA") {
      return trimMultilineValue(field.value);
    }

    if (field.tagName === "SELECT" && field.multiple) {
      selected = Array.prototype.slice.call(field.options)
        .filter(function (option) {
          return option.selected;
        })
        .map(function (option) {
          return trimValue(option.value || option.textContent);
        })
        .filter(Boolean);
      return selected.join(", ");
    }

    return trimValue(field.value);
  }

  function buildFormPayload(form) {
    var fields = [];
    var replyTo = "";
    var elements = form.querySelectorAll("input[name], select[name], textarea[name]");
    var i;
    var field;
    var type;
    var value;
    var payloadField;

    for (i = 0; i < elements.length; i += 1) {
      field = elements[i];
      type = (field.type || field.tagName || "text").toLowerCase();

      if (field.disabled || type === "submit" || type === "button" || type === "reset") {
        continue;
      }

      value = getFieldValue(field);

      if (!value && !field.required && type !== "checkbox") {
        continue;
      }

      payloadField = {
        name: field.name,
        label: getFieldLabel(field, form),
        value: value,
        required: Boolean(field.required),
        type: type
      };

      fields.push(payloadField);

      if ((type === "email" || field.name.toLowerCase() === "email") && value) {
        replyTo = value;
      }
    }

    return {
      formType: form.dataset.formType || "general",
      formLabel: form.dataset.formLabel || "Website Form",
      pageTitle: document.title || "",
      pagePath: window.location.pathname || "",
      pageUrl: window.location.href || "",
      submittedAt: new Date().toISOString(),
      replyTo: replyTo,
      fields: fields
    };
  }

  function validatePayload(payload) {
    var i;
    var field;

    if (!payload.fields.length) {
      return "This form is not configured correctly.";
    }

    for (i = 0; i < payload.fields.length; i += 1) {
      field = payload.fields[i];

      if (field.required && (!field.value || field.value === "No")) {
        return "Please complete the required fields.";
      }

      if ((field.type === "email" || field.name.toLowerCase() === "email") && field.value && !isValidEmail(field.value)) {
        return "Please enter a valid email address.";
      }
    }

    return "";
  }

  function bindManagedForm(form) {
    if (!form || form.dataset.hsaFormBound) {
      return;
    }

    form.dataset.hsaFormBound = "1";
    form.setAttribute("novalidate", "novalidate");
    ensureStatusNode(form);

    form.addEventListener("submit", function (ev) {
      var submitButton = getSubmitButton(form);
      var payload;
      var validationMessage;
      var originalLabel;

      ev.preventDefault();
      payload = buildFormPayload(form);
      validationMessage = validatePayload(payload);

      if (validationMessage) {
        setFormStatus(form, validationMessage, "error");
        return;
      }

      setFormStatus(form, "Sending...", "pending");

      if (submitButton) {
        originalLabel = submitButton.dataset.originalLabel || submitButton.textContent;
        submitButton.dataset.originalLabel = originalLabel;
        submitButton.disabled = true;
        submitButton.textContent = form.dataset.sendingLabel || "Sending...";
      }

      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          return response.json().catch(function () {
            return {};
          }).then(function (result) {
            if (!response.ok || !result.ok) {
              throw new Error(result.error || "Unable to send right now.");
            }

            form.reset();
            setFormStatus(
              form,
              form.dataset.successMessage || "Thanks, your form has been sent successfully.",
              "success"
            );
            showToast(form.dataset.successMessage || "Form sent successfully.");

            if (form.classList.contains("hsa-expert-modal__form")) {
              window.setTimeout(function () {
                setExpertModal(false);
                setFormStatus(form, "", "");
              }, 1200);
            }
          });
        })
        .catch(function () {
          setFormStatus(
            form,
            "Unable to send right now. Please try again in a moment.",
            "error"
          );
          showToast("Unable to send right now. Please try again.");
        })
        .finally(function () {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = submitButton.dataset.originalLabel || "Submit";
          }
        });
    });
  }

  function ensureExpertModal() {
    var modal = document.querySelector(".hsa-expert-modal");
    if (modal) {
      return modal;
    }

    modal = document.createElement("div");
    modal.className = "hsa-expert-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML =
      '<div class="hsa-expert-modal__backdrop" data-hsa-close-modal></div>' +
      '<div class="hsa-expert-modal__panel" role="dialog" aria-modal="true" aria-labelledby="hsa-expert-modal-title">' +
        '<button class="hsa-expert-modal__close" type="button" aria-label="Close dialog" data-hsa-close-modal>' +
          '<span class="material-symbols-outlined">close</span>' +
        "</button>" +
        '<div class="hsa-expert-modal__header">' +
          '<h3 id="hsa-expert-modal-title">Get in Touch</h3>' +
          "<p>Our team will respond within 24 hours</p>" +
        "</div>" +
        '<form class="hsa-expert-modal__form" data-hsa-form data-form-type="consultation" data-form-label="Expert Modal Inquiry" data-success-message="Thanks, your request has been emailed to our team." novalidate>' +
          '<div class="hsa-expert-modal__grid">' +
            '<label class="hsa-expert-modal__field">' +
              "<span>Full Name <em>*</em></span>" +
              '<input type="text" name="fullName" placeholder="John Smith" maxlength="120" required />' +
            "</label>" +
            '<label class="hsa-expert-modal__field">' +
              "<span>Company <em>*</em></span>" +
              '<input type="text" name="company" placeholder="Acme Logistics" maxlength="160" required />' +
            "</label>" +
          "</div>" +
          '<label class="hsa-expert-modal__field">' +
            "<span>Email <em>*</em></span>" +
            '<input type="email" name="email" placeholder="john@company.com" maxlength="254" required />' +
          "</label>" +
          '<label class="hsa-expert-modal__field">' +
            "<span>Phone / WhatsApp</span>" +
            '<input type="text" name="phone" placeholder="+86 135 1081 6743" maxlength="40" />' +
          "</label>" +
          '<label class="hsa-expert-modal__field">' +
            "<span>Message <em>*</em></span>" +
            '<textarea name="message" rows="5" maxlength="4000" placeholder="Tell us about your warehouse automation needs..." required></textarea>' +
          "</label>" +
          '<p class="hsa-expert-modal__status" aria-live="polite"></p>' +
          '<button class="hsa-expert-modal__submit" type="submit">Send Message</button>' +
        "</form>" +
      "</div>";

    document.body.appendChild(modal);
    return modal;
  }

  function ensureSalesModal() {
    var modal = document.querySelector(".hsa-sales-modal");

    if (modal) {
      return modal;
    }

    modal = document.createElement("div");
    modal.className = "hsa-sales-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML =
      '<div class="hsa-sales-modal__backdrop" data-hsa-close-sales-modal></div>' +
      '<div class="hsa-sales-modal__panel" role="dialog" aria-modal="true" aria-labelledby="hsa-sales-modal-title">' +
        '<button class="hsa-sales-modal__close" type="button" aria-label="Close dialog" data-hsa-close-sales-modal>' +
          '<span class="material-symbols-outlined">close</span>' +
        "</button>" +
        '<div class="hsa-sales-modal__body">' +
          '<img class="hsa-sales-modal__qr" src="' + route("home").replace(/index\.html$/, "") + 'assets/images/sales-qr-placeholder.svg" alt="Sales QR code" />' +
          '<h3 id="hsa-sales-modal-title" class="hsa-sales-modal__title">sales</h3>' +
        "</div>" +
      "</div>";

    document.body.appendChild(modal);
    return modal;
  }

  function setExpertModal(open) {
    var modal = ensureExpertModal();
    var panel = modal.querySelector(".hsa-expert-modal__panel");
    var firstInput = modal.querySelector("input, textarea");

    if (open) {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("hsa-modal-open");
      setFormStatus(modal.querySelector(".hsa-expert-modal__form"), "", "");
      window.setTimeout(function () {
        if (firstInput) {
          firstInput.focus();
        }
      }, 60);
      return;
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("hsa-modal-open");
    if (panel) {
      panel.scrollTop = 0;
    }
  }

  function setSalesModal(open) {
    var modal = ensureSalesModal();

    if (open) {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("hsa-modal-open");
      return;
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("hsa-modal-open");
  }

  function bindExpertModal() {
    var modal = ensureExpertModal();

    document.querySelectorAll(".hsa-cta").forEach(function (cta) {
      if (cta.dataset.hsaModalBound) {
        return;
      }
      cta.dataset.hsaModalBound = "1";
      cta.addEventListener("click", function (ev) {
        ev.preventDefault();
        setExpertModal(true);
      });
    });

    modal.addEventListener("click", function (ev) {
      if (ev.target.closest("[data-hsa-close-modal]")) {
        setExpertModal(false);
      }
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && modal.classList.contains("is-open")) {
        setExpertModal(false);
      }
    });
  }

  function bindSalesModal() {
    var modal = ensureSalesModal();

    document.addEventListener("click", function (ev) {
      if (ev.target.closest("[data-hsa-open-sales-modal]")) {
        ev.preventDefault();
        setSalesModal(true);
        return;
      }

      if (ev.target.closest("[data-hsa-close-sales-modal]")) {
        setSalesModal(false);
      }
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && modal.classList.contains("is-open")) {
        setSalesModal(false);
      }
    });
  }

  function bindForms() {
    document.querySelectorAll("form").forEach(function (form) {
      if (form.classList.contains("hsa-expert-modal__form") || form.hasAttribute("data-hsa-form")) {
        bindManagedForm(form);
      }
    });
  }

  function makeClickable(el, key) {
    if (!el || el.dataset.hsaLinked) {
      return;
    }

    el.dataset.hsaLinked = "1";
    el.classList.add("hsa-card-linked");
    el.addEventListener("click", function (ev) {
      if (ev.target.closest("a,button,input,textarea,label,summary")) {
        return;
      }
      goto(key);
    });
  }

  function bindTextTargets() {
    var map = [
      ["speak with an expert", "contact"],
      ["expert consultation", "contact"],
      ["request demo", "contact"],
      ["start your consultation", "contact"],
      ["consult our architects", "contact"],
      ["consult with an expert", "contact"],
      ["connect with our experts", "contact"],
      ["explore solutions", "solutions"],
      ["view all case studies", "case-studies"],
      ["all case studies", "case-studies"],
      ["about", "about"],
      ["home", "home"]
    ];

    document.querySelectorAll('a[href="#"], a:not([href]), button').forEach(function (el) {
      var text = normalize(el.textContent);
      var i;

      for (i = 0; i < map.length; i += 1) {
        if (text && text.indexOf(map[i][0]) !== -1) {
          if (el.tagName === "A") {
            el.setAttribute("href", route(map[i][1]));
          } else if (el.getAttribute("type") !== "submit") {
            el.addEventListener("click", function (targetKey) {
              return function () {
                goto(targetKey);
              };
            }(map[i][1]));
          }
          break;
        }
      }
    });
  }

  function bindOverviewCards() {
    var cards = [
      ["agv forklift", "products-agv-forklift"],
      ["lifting agv", "products-lifting-agv"],
      ["storage agv", "products-storage-agv"],
      ["agv roller", "products-agv-roller"],
      ["composite mobile robot", "products-composite-mobile-robot"],
      ["asrs", "solutions-asrs"],
      ["material handling", "solutions-material-handling"],
      ["picking", "solutions-picking"],
      ["software", "solutions-software"],
      ["automated warehouse upgrade", "case-studies-project-warehouse-upgrade"],
      ["warehouse automation solutions for an electronics manufacturer", "case-studies-picking"],
      ["mini load automated storage", "case-studies-asrs"],
      ["unit load asrs", "case-studies-asrs"],
      ["workshop intralogistics", "case-studies-material-handling"],
      ["smart home manufacturing", "case-studies-material-handling"]
    ];

    cards.forEach(function (pair) {
      document.querySelectorAll("h2,h3,h4").forEach(function (head) {
        if (normalize(head.textContent).indexOf(pair[0]) !== -1) {
          var wrapper = head.closest("article, .group, .kinetic-card, .cursor-pointer, .p-8, .p-10, .p-12");
          if (wrapper) {
            makeClickable(wrapper, pair[1]);
          }
        }
      });
    });
  }

  function bindDesktopMenus() {
    var groups = Array.prototype.slice.call(document.querySelectorAll(".hsa-top-group"));
    if (!groups.length) {
      return;
    }

    var summaryRouteMap = {
      products: "products",
      solutions: "solutions",
      "case studies": "case-studies"
    };

    function closeOthers(current) {
      groups.forEach(function (group) {
        if (group !== current) {
          window.clearTimeout(group.__hsaCloseTimer);
          group.removeAttribute("open");
        }
      });
    }

    function clearCloseTimer(group) {
      window.clearTimeout(group.__hsaCloseTimer);
      group.__hsaCloseTimer = null;
    }

    function scheduleClose(group) {
      clearCloseTimer(group);
      group.__hsaCloseTimer = window.setTimeout(function () {
        group.removeAttribute("open");
      }, 220);
    }

    function closeAll() {
      groups.forEach(function (group) {
        clearCloseTimer(group);
        group.removeAttribute("open");
      });
    }

    groups.forEach(function (group) {
      var summary = group.querySelector("summary");
      var dropdown = group.querySelector(".hsa-dropdown");
      var summaryText = summary ? normalize(summary.textContent) : "";
      var routeKey = summaryRouteMap[summaryText];

      group.addEventListener("toggle", function () {
        if (group.open) {
          closeOthers(group);
        }
      });

      group.addEventListener("pointerenter", function () {
        clearCloseTimer(group);
        closeOthers(group);
        group.setAttribute("open", "open");
      });

      group.addEventListener("pointerleave", function () {
        scheduleClose(group);
      });

      if (summary) {
        summary.addEventListener("pointerenter", function () {
          clearCloseTimer(group);
          closeOthers(group);
          group.setAttribute("open", "open");
        });
      }

      if (dropdown) {
        dropdown.addEventListener("pointerenter", function () {
          clearCloseTimer(group);
          group.setAttribute("open", "open");
        });

        dropdown.addEventListener("pointerleave", function () {
          scheduleClose(group);
        });
      }

      if (summary && routeKey) {
        summary.addEventListener("click", function (ev) {
          ev.preventDefault();
          goto(routeKey);
        });
      }
    });

    document.addEventListener("click", function (ev) {
      if (ev.target.closest(".hsa-top-group")) {
        return;
      }

      closeAll();
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.key !== "Escape") {
        return;
      }

      closeAll();
    });
  }

  function bindMobile() {
    var btn = document.querySelector(".hsa-mobile-toggle");
    var menu = document.querySelector(".hsa-mobile-menu");
    if (!btn || !menu) {
      return;
    }

    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function enhanceFooters() {
    document.querySelectorAll(".hsa-footer").forEach(function (footer) {
      var oldNews = footer.querySelector(".hsa-footer-news");
      var inner = footer.querySelector(".hsa-footer-inner");
      var introCol;
      var contact;
      var news;

      if (oldNews) {
        oldNews.remove();
      }

      if (!inner || inner.querySelector(".hsa-footer-signup")) {
        return;
      }

      introCol = inner.firstElementChild;
      if (introCol && !introCol.querySelector(".hsa-footer-contact")) {
        contact = document.createElement("div");
        contact.className = "hsa-footer-contact";
        contact.innerHTML =
          '<a class="hsa-footer-contact-link" href="mailto:sales@robotlyne.com" aria-label="Email">' +
            '<span class="material-symbols-outlined">mail</span>' +
          "</a>" +
          '<a class="hsa-footer-contact-link" href="https://wa.me/8613510816743?text=Hello%20there!" aria-label="WhatsApp" target="_blank" rel="noreferrer">' +
            '<span class="hsa-footer-contact-icon-svg" aria-hidden="true">' +
              '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.56 0 .26 5.29.26 11.79c0 2.08.54 4.1 1.58 5.89L0 24l6.49-1.71a11.8 11.8 0 0 0 5.58 1.42h.01c6.51 0 11.8-5.29 11.8-11.79 0-3.15-1.22-6.11-3.36-8.44Z" fill="currentColor"/>' +
                '<path d="M12.08 21.71h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.85 1.01 1.03-3.76-.23-.39a9.8 9.8 0 0 1-1.49-5.2c0-5.4 4.4-9.79 9.82-9.79 2.62 0 5.08 1.02 6.93 2.88a9.74 9.74 0 0 1 2.88 6.92c0 5.39-4.41 9.79-9.8 9.79Z" fill="#fff"/>' +
                '<path d="M8.17 6.76c-.2 0-.42.01-.64.52-.21.49-.79 1.9-.79 2.05 0 .16-.02.34.1.51.11.18.82 1.33 1.97 2.38 1.48 1.34 2.74 1.76 3.12 1.95.38.2.61.17.83-.1.23-.28.94-1.09 1.19-1.46.25-.36.5-.3.85-.18.35.12 2.22 1.05 2.6 1.24.38.18.63.27.72.42.1.16.1.9-.21 1.78-.31.87-1.79 1.67-2.48 1.74-.64.06-1.46.09-2.35-.19-.54-.17-1.23-.4-2.13-.77-3.75-1.52-6.2-5.18-6.39-5.43-.18-.25-1.52-1.99-1.52-3.8 0-1.8.96-2.69 1.3-3.06.34-.36.74-.46.99-.46h.71c.23 0 .54-.1.85.63.31.74 1.05 2.55 1.14 2.73.09.18.15.39.03.63-.12.25-.18.4-.36.61-.18.21-.38.46-.54.62-.18.18-.36.38-.15.73.2.34.91 1.49 1.95 2.42 1.35 1.21 2.49 1.58 2.84 1.76.35.18.56.16.77-.09.21-.24.89-1.03 1.12-1.38.23-.35.47-.3.8-.18.33.11 2.08.97 2.44 1.15.36.18.6.27.69.42.09.15.09.87-.2 1.72-.3.86-1.71 1.64-2.38 1.72-.67.08-1.53.11-2.47-.19-.58-.18-1.31-.43-2.27-.82-4.01-1.64-6.62-5.63-6.82-5.91-.2-.28-1.66-2.19-1.66-4.18s1.06-2.97 1.44-3.38c.38-.42.84-.52 1.11-.52h.48Z" fill="currentColor"/>' +
              "</svg>" +
            "</span>" +
          "</a>" +
          '<a class="hsa-footer-contact-link" href="tel:8613510816743" aria-label="Phone">' +
            '<span class="material-symbols-outlined">call</span>' +
          "</a>" +
          '<button class="hsa-footer-contact-link hsa-footer-contact-trigger" type="button" aria-label="Sales QR" data-hsa-open-sales-modal>' +
            '<span class="material-symbols-outlined">support_agent</span>' +
          "</button>";
        introCol.appendChild(contact);
      }

      news = document.createElement("div");
      news.className = "hsa-footer-signup";
      news.innerHTML =
        '<h4 class="hsa-footer-signup-title">Newsletter signup</h4>' +
        '<p class="hsa-footer-signup-copy">Get monthly updates on warehouse automation systems, software releases, and new case studies.</p>' +
        '<form class="hsa-news-form" data-hsa-form data-form-type="newsletter" data-form-label="Footer Newsletter Signup" data-success-message="Thanks, your newsletter signup has been emailed to our team.">' +
          '<label class="hsa-news-label" for="hsa-news-email">Email</label>' +
          '<input id="hsa-news-email" class="hsa-news-input" type="email" name="email" placeholder="Email" required />' +
          '<label class="hsa-news-check">' +
            '<input type="checkbox" name="consent" value="Yes" checked />' +
            '<span>Yes, I agree to receive monthly newsletter content from Huizong Intelligent Automation.</span>' +
          "</label>" +
          '<div class="hsa-news-captcha" aria-hidden="true">' +
            '<div class="hsa-news-captcha-box"></div>' +
            '<div class="hsa-news-captcha-copy">' +
              "<strong>Human verification</strong>" +
              "<span>Local preview placeholder</span>" +
            "</div>" +
            '<div class="hsa-news-captcha-badge">CAPTCHA</div>' +
          "</div>" +
          '<button class="hsa-news-submit" type="submit">Subscription</button>' +
        "</form>" +
        '<div class="hsa-social">' +
          "<h4>Follow Us</h4>" +
          '<div class="hsa-social-links">' +
            '<a class="hsa-social-link" href="https://www.facebook.com/people/Robotlyne/61585733840584/" aria-label="Facebook" target="_blank" rel="noreferrer">' +
              '<span class="hsa-social-icon" aria-hidden="true">' +
                '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
                  '<path d="M13.37 20.5v-7.53h2.54l.38-2.94h-2.92V8.15c0-.85.23-1.43 1.45-1.43H16V4.09c-.56-.06-1.12-.09-1.68-.09-2.5 0-4.2 1.53-4.2 4.33v1.7H7.5v2.94h2.62v7.53h3.25Z" fill="currentColor"/>' +
                "</svg>" +
              "</span>" +
            "</a>" +
            '<a class="hsa-social-link" href="https://www.linkedin.com/company/huizongzhineng/" aria-label="LinkedIn" target="_blank" rel="noreferrer">' +
              '<span class="hsa-social-icon" aria-hidden="true">' +
                '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
                  '<path d="M6.43 8.56a1.86 1.86 0 1 1 0-3.72 1.86 1.86 0 0 1 0 3.72Zm-1.6 11.1h3.19V9.83H4.83v9.83ZM10.4 9.83h3.06v1.34h.04c.43-.8 1.47-1.65 3.02-1.65 3.23 0 3.82 2.13 3.82 4.9v5.24h-3.18V15c0-1.1-.02-2.53-1.54-2.53-1.54 0-1.78 1.2-1.78 2.44v4.75H10.4V9.83Z" fill="currentColor"/>' +
                "</svg>" +
              "</span>" +
            "</a>" +
            '<a class="hsa-social-link" href="https://www.youtube.com/@Robotlyne" aria-label="YouTube" target="_blank" rel="noreferrer">' +
              '<span class="hsa-social-icon" aria-hidden="true">' +
                '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
                  '<path d="M19.62 7.24a2.48 2.48 0 0 0-1.74-1.75C16.34 5 12 5 12 5s-4.34 0-5.88.49A2.48 2.48 0 0 0 4.38 7.24 25.7 25.7 0 0 0 4 12a25.7 25.7 0 0 0 .38 4.76 2.48 2.48 0 0 0 1.74 1.75C7.66 19 12 19 12 19s4.34 0 5.88-.49a2.48 2.48 0 0 0 1.74-1.75A25.7 25.7 0 0 0 20 12a25.7 25.7 0 0 0-.38-4.76ZM10.5 15.5v-7l6 3.5-6 3.5Z" fill="currentColor"/>' +
                "</svg>" +
              "</span>' +
            "</a>" +
          "</div>" +
        "</div>";

      inner.appendChild(news);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    enhanceFooters();
    bindExpertModal();
    bindSalesModal();
    bindDesktopMenus();
    bindMobile();
    bindForms();
    bindTextTargets();
    bindOverviewCards();
  });
}());
