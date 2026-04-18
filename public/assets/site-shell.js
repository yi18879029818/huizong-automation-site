(function () {
  function route(key) {
    return (window.__SITE_ROUTES__ || {})[key] || '#';
  }

  function goto(key) {
    window.location.href = route(key);
  }

  function normalize(text) {
    return (text || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function showToast(msg) {
    var toast = document.querySelector('.hsa-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'hsa-toast';
      document.body.appendChild(toast);
    }

    toast.textContent = msg;
    toast.classList.add('show');
    window.clearTimeout(window.__hsaToastTimer);
    window.__hsaToastTimer = window.setTimeout(function () {
      toast.classList.remove('show');
    }, 2600);
  }

  function ensureExpertModal() {
    var modal = document.querySelector('.hsa-expert-modal');
    if (modal) {
      return modal;
    }

    modal = document.createElement('div');
    modal.className = 'hsa-expert-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      '<div class="hsa-expert-modal__backdrop" data-hsa-close-modal></div>' +
      '<div class="hsa-expert-modal__panel" role="dialog" aria-modal="true" aria-labelledby="hsa-expert-modal-title">' +
        '<button class="hsa-expert-modal__close" type="button" aria-label="Close dialog" data-hsa-close-modal>' +
          '<span class="material-symbols-outlined">close</span>' +
        '</button>' +
        '<div class="hsa-expert-modal__header">' +
          '<h3 id="hsa-expert-modal-title">Get in Touch</h3>' +
          '<p>Our team will respond within 24 hours</p>' +
        '</div>' +
        '<form class="hsa-expert-modal__form">' +
          '<div class="hsa-expert-modal__grid">' +
            '<label class="hsa-expert-modal__field">' +
              '<span>Full Name <em>*</em></span>' +
              '<input type="text" name="fullName" placeholder="John Smith" required />' +
            '</label>' +
            '<label class="hsa-expert-modal__field">' +
              '<span>Company <em>*</em></span>' +
              '<input type="text" name="company" placeholder="Acme Logistics" required />' +
            '</label>' +
          '</div>' +
          '<label class="hsa-expert-modal__field">' +
            '<span>Email <em>*</em></span>' +
            '<input type="email" name="email" placeholder="john@company.com" required />' +
          '</label>' +
          '<label class="hsa-expert-modal__field">' +
            '<span>Phone / WhatsApp</span>' +
            '<input type="text" name="phone" placeholder="+86 135 1081 6743" />' +
          '</label>' +
          '<label class="hsa-expert-modal__field">' +
            '<span>Message</span>' +
            '<textarea name="message" rows="5" placeholder="Tell us about your warehouse automation needs..."></textarea>' +
          '</label>' +
          '<button class="hsa-expert-modal__submit" type="submit">Send Message</button>' +
        '</form>' +
      '</div>';

    document.body.appendChild(modal);
    return modal;
  }

  function setExpertModal(open) {
    var modal = ensureExpertModal();
    var panel = modal.querySelector('.hsa-expert-modal__panel');
    var firstInput = modal.querySelector('input, textarea');

    if (open) {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('hsa-modal-open');
      window.setTimeout(function () {
        if (firstInput) {
          firstInput.focus();
        }
      }, 60);
      return;
    }

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('hsa-modal-open');
    if (panel) {
      panel.scrollTop = 0;
    }
  }

  function bindExpertModal() {
    var modal = ensureExpertModal();

    document.querySelectorAll('.hsa-cta').forEach(function (cta) {
      if (cta.dataset.hsaModalBound) {
        return;
      }
      cta.dataset.hsaModalBound = '1';
      cta.addEventListener('click', function (ev) {
        ev.preventDefault();
        setExpertModal(true);
      });
    });

    modal.addEventListener('click', function (ev) {
      if (ev.target.closest('[data-hsa-close-modal]')) {
        setExpertModal(false);
      }
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && modal.classList.contains('is-open')) {
        setExpertModal(false);
      }
    });
  }

  function bindForms() {
    document.querySelectorAll('form').forEach(function (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        showToast('Local preview mode: form interaction works, but data is not submitted to a server.');
      });
    });
  }

  function makeClickable(el, key) {
    if (!el || el.dataset.hsaLinked) {
      return;
    }

    el.dataset.hsaLinked = '1';
    el.classList.add('hsa-card-linked');
    el.addEventListener('click', function (ev) {
      if (ev.target.closest('a,button,input,textarea,label,summary')) {
        return;
      }
      goto(key);
    });
  }

  function bindTextTargets() {
    var map = [
      ['speak with an expert', 'contact'],
      ['expert consultation', 'contact'],
      ['request demo', 'contact'],
      ['start your consultation', 'contact'],
      ['consult our architects', 'contact'],
      ['consult with an expert', 'contact'],
      ['connect with our experts', 'contact'],
      ['explore solutions', 'solutions'],
      ['view all case studies', 'case-studies'],
      ['all case studies', 'case-studies'],
      ['about', 'about'],
      ['home', 'home']
    ];

    document.querySelectorAll('a[href="#"], a:not([href]), button').forEach(function (el) {
      var text = normalize(el.textContent);
      for (var i = 0; i < map.length; i += 1) {
        if (text && text.indexOf(map[i][0]) !== -1) {
          var key = map[i][1];
          if (el.tagName === 'A') {
            el.setAttribute('href', route(key));
          } else if (el.getAttribute('type') !== 'submit') {
            el.addEventListener('click', function (targetKey) {
              return function () {
                goto(targetKey);
              };
            }(key));
          }
          break;
        }
      }
    });
  }

  function bindOverviewCards() {
    var cards = [
      ['agv forklift', 'products-agv-forklift'],
      ['lifting agv', 'products-lifting-agv'],
      ['storage agv', 'products-storage-agv'],
      ['agv roller', 'products-agv-roller'],
      ['composite mobile robot', 'products-composite-mobile-robot'],
      ['asrs', 'solutions-asrs'],
      ['material handling', 'solutions-material-handling'],
      ['picking', 'solutions-picking'],
      ['software', 'solutions-software'],
      ['automated warehouse upgrade', 'case-studies-project-warehouse-upgrade'],
      ['warehouse automation solutions for an electronics manufacturer', 'case-studies-picking'],
      ['mini load automated storage', 'case-studies-asrs'],
      ['unit load asrs', 'case-studies-asrs'],
      ['workshop intralogistics', 'case-studies-material-handling'],
      ['smart home manufacturing', 'case-studies-material-handling']
    ];

    cards.forEach(function (pair) {
      document.querySelectorAll('h2,h3,h4').forEach(function (head) {
        if (normalize(head.textContent).indexOf(pair[0]) !== -1) {
          var wrapper = head.closest('article, .group, .kinetic-card, .cursor-pointer, .p-8, .p-10, .p-12');
          if (wrapper) {
            makeClickable(wrapper, pair[1]);
          }
        }
      });
    });
  }

  function bindDesktopMenus() {
    var groups = Array.prototype.slice.call(document.querySelectorAll('.hsa-top-group'));
    if (!groups.length) {
      return;
    }

    var summaryRouteMap = {
      'products': 'products',
      'solutions': 'solutions',
      'case studies': 'case-studies'
    };

    function closeOthers(current) {
      groups.forEach(function (group) {
        if (group !== current) {
          window.clearTimeout(group.__hsaCloseTimer);
          group.removeAttribute('open');
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
        group.removeAttribute('open');
      }, 220);
    }

    function closeAll() {
      groups.forEach(function (group) {
        clearCloseTimer(group);
        group.removeAttribute('open');
      });
    }

    groups.forEach(function (group) {
      var summary = group.querySelector('summary');
      var dropdown = group.querySelector('.hsa-dropdown');
      var summaryText = summary ? normalize(summary.textContent) : '';
      var routeKey = summaryRouteMap[summaryText];

      group.addEventListener('toggle', function () {
        if (group.open) {
          closeOthers(group);
        }
      });

      group.addEventListener('pointerenter', function () {
        clearCloseTimer(group);
        closeOthers(group);
        group.setAttribute('open', 'open');
      });

      group.addEventListener('pointerleave', function () {
        scheduleClose(group);
      });

      if (summary) {
        summary.addEventListener('pointerenter', function () {
          clearCloseTimer(group);
          closeOthers(group);
          group.setAttribute('open', 'open');
        });
      }

      if (dropdown) {
        dropdown.addEventListener('pointerenter', function () {
          clearCloseTimer(group);
          group.setAttribute('open', 'open');
        });

        dropdown.addEventListener('pointerleave', function () {
          scheduleClose(group);
        });
      }

      if (summary && routeKey) {
        summary.addEventListener('click', function (ev) {
          ev.preventDefault();
          goto(routeKey);
        });
      }
    });

    document.addEventListener('click', function (ev) {
      if (ev.target.closest('.hsa-top-group')) {
        return;
      }

      closeAll();
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Escape') {
        return;
      }

      closeAll();
    });
  }

  function bindMobile() {
    var btn = document.querySelector('.hsa-mobile-toggle');
    var menu = document.querySelector('.hsa-mobile-menu');
    if (!btn || !menu) {
      return;
    }

    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function enhanceFooters() {
    document.querySelectorAll('.hsa-footer').forEach(function (footer) {
      var oldNews = footer.querySelector('.hsa-footer-news');
      if (oldNews) {
        oldNews.remove();
      }

      var inner = footer.querySelector('.hsa-footer-inner');
      if (!inner || inner.querySelector('.hsa-footer-signup')) {
        return;
      }

      var introCol = inner.firstElementChild;
      if (introCol && !introCol.querySelector('.hsa-footer-contact')) {
        var contact = document.createElement('div');
        contact.className = 'hsa-footer-contact';
        contact.innerHTML =
          '<a class="hsa-footer-contact-link" href="mailto:contact@huizong-automation.com" aria-label="Email">' +
            '<span class="material-symbols-outlined">mail</span>' +
          '</a>' +
          '<a class="hsa-footer-contact-link" href="tel:+8613510816743" aria-label="Phone">' +
            '<span class="material-symbols-outlined">call</span>' +
          '</a>' +
          '<a class="hsa-footer-contact-link" href="' + route('contact') + '" aria-label="Consultation">' +
            '<span class="material-symbols-outlined">forum</span>' +
          '</a>' +
          '<a class="hsa-footer-contact-link" href="' + route('contact') + '" aria-label="Support">' +
            '<span class="material-symbols-outlined">support_agent</span>' +
          '</a>';
        introCol.appendChild(contact);
      }

      var news = document.createElement('div');
      news.className = 'hsa-footer-signup';
      news.innerHTML =
        '<h4 class="hsa-footer-signup-title">Newsletter signup</h4>' +
        '<p class="hsa-footer-signup-copy">Get monthly updates on warehouse automation systems, software releases, and new case studies.</p>' +
        '<form class="hsa-news-form">' +
          '<label class="hsa-news-label" for="hsa-news-email">Email</label>' +
          '<input id="hsa-news-email" class="hsa-news-input" type="email" name="email" placeholder="Email" required />' +
          '<label class="hsa-news-check">' +
            '<input type="checkbox" name="consent" checked />' +
            '<span>Yes, I agree to receive monthly newsletter content from Huizong Intelligent Automation.</span>' +
          '</label>' +
          '<div class="hsa-news-captcha" aria-hidden="true">' +
            '<div class="hsa-news-captcha-box"></div>' +
            '<div class="hsa-news-captcha-copy">' +
              '<strong>Human verification</strong>' +
              '<span>Local preview placeholder</span>' +
            '</div>' +
            '<div class="hsa-news-captcha-badge">CAPTCHA</div>' +
          '</div>' +
          '<button class="hsa-news-submit" type="submit">Subscription</button>' +
        '</form>' +
        '<div class="hsa-social">' +
          '<h4>Follow Us</h4>' +
          '<div class="hsa-social-links">' +
            '<a class="hsa-social-link" href="#" aria-label="Facebook">FB</a>' +
            '<a class="hsa-social-link" href="#" aria-label="LinkedIn">IN</a>' +
            '<a class="hsa-social-link" href="#" aria-label="YouTube">YT</a>' +
          '</div>' +
        '</div>';

      inner.appendChild(news);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    enhanceFooters();
    bindExpertModal();
    bindDesktopMenus();
    bindMobile();
    bindForms();
    bindTextTargets();
    bindOverviewCards();
  });
}());
