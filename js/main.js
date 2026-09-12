/**
 * ============================================================
 * MAIN.JS — Dourwe Leba Achille Portfolio
 * Handles: navigation, theme toggle, scroll effects, typing
 * animation, scroll-reveal, project/design rendering + filters,
 * animated counters, GitHub stats (optional), contact form.
 * ============================================================
 */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     THEME TOGGLE
  --------------------------------------------------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("dla-theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  themeToggle?.addEventListener("click", function () {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("dla-theme", next);
    themeToggle.setAttribute("aria-label", next === "light" ? "Switch to dark mode" : "Switch to light mode");
  });

  /* ---------------------------------------------------------
     MOBILE NAV
  --------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navOverlay = document.getElementById("navOverlay");

  function closeNav() {
    navMenu.classList.remove("open");
    navOverlay.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }
  function openNav() {
    navMenu.classList.add("open");
    navOverlay.classList.add("active");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
  }
  navToggle?.addEventListener("click", function () {
    navMenu.classList.contains("open") ? closeNav() : openNav();
  });
  navOverlay?.addEventListener("click", closeNav);
  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  /* ---------------------------------------------------------
     HEADER SCROLL STATE + SCROLL PROGRESS + BACK TO TOP
  --------------------------------------------------------- */
  const header = document.getElementById("siteHeader");
  const scrollProgress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");

  function onScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle("scrolled", scrollY > 12);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = progress + "%";

    if (backToTop) backToTop.style.opacity = scrollY > 500 ? "1" : "0";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop?.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  /* ---------------------------------------------------------
     SCROLLSPY — highlight active nav link
  --------------------------------------------------------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link[data-nav]");

  const spyObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach(function (s) { spyObserver.observe(s); });

  /* ---------------------------------------------------------
     SCROLL REVEAL — re-triggers both scrolling down and up
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (prefersReducedMotion) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------------------------------------------------
     TYPING ANIMATION — cycles through professional roles
  --------------------------------------------------------- */
  const roles = [
    "Desktop Application Developer",
    "Python Automation Developer",
    "Full-Stack Developer",
    "Flutter Developer",
    "Database Analyst",
    "Junior Graphic Designer"
  ];
  const typedEl = document.getElementById("typedRole");

  if (typedEl) {
    if (prefersReducedMotion) {
      typedEl.textContent = roles[0];
    } else {
      let roleIndex = 0, charIndex = 0, deleting = false;
      const TYPE_SPEED = 55, DELETE_SPEED = 30, HOLD = 1500, GAP = 400;

      function tick() {
        const current = roles[roleIndex];
        if (!deleting) {
          charIndex++;
          typedEl.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = true;
            return setTimeout(tick, HOLD);
          }
          return setTimeout(tick, TYPE_SPEED);
        } else {
          charIndex--;
          typedEl.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            return setTimeout(tick, GAP);
          }
          return setTimeout(tick, DELETE_SPEED);
        }
      }
      tick();
    }
  }

  /* ---------------------------------------------------------
     ANIMATED COUNTERS (About stats)
  --------------------------------------------------------- */
  const statProjects = document.getElementById("statProjects");
  if (statProjects && Array.isArray(window.projects)) {
    statProjects.setAttribute("data-count-to", String(window.projects.length));
  }

  function animateCount(el) {
    const target = parseInt(el.getAttribute("data-count-to"), 10) || 0;
    if (prefersReducedMotion) { el.textContent = target; return; }
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll(".stat-num[data-count-to]");
  const counterObserver = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach(function (c) { counterObserver.observe(c); });

  /* ---------------------------------------------------------
     CARD RENDERING — Projects & Designs (data-driven)
  --------------------------------------------------------- */
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }

  function renderProjects(list) {
    const grid = document.getElementById("projectsGrid");
    if (!grid) return;
    if (!list.length) {
      grid.innerHTML = '<p class="empty-state">No projects in this category yet.</p>';
      return;
    }
    grid.innerHTML = list.map(function (p) {
      const githubLink = p.github
        ? '<a href="' + escapeHtml(p.github) + '" target="_blank" rel="noopener"><i class="bi bi-github"></i> Code</a>'
        : '<span class="disabled"><i class="bi bi-github"></i> Code</span>';
      const demoLink = p.demo
        ? '<a href="' + escapeHtml(p.demo) + '" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right"></i> Live Demo</a>'
        : '<span class="disabled"><i class="bi bi-box-arrow-up-right"></i> Live Demo</span>';
      return (
        '<article class="project-card" data-category="' + escapeHtml(p.category) + '" data-reveal="fade-up">' +
          '<div class="card-media">' +
            '<img src="' + escapeHtml(p.image) + '" alt="' + escapeHtml(p.title) + '" loading="lazy" onerror="this.src=\'assets/images/projects/placeholder.svg\'">' +
            '<span class="card-category">' + escapeHtml(p.category) + '</span>' +
          '</div>' +
          '<div class="card-body">' +
            '<h3>' + escapeHtml(p.title) + '</h3>' +
            '<p>' + escapeHtml(p.description) + '</p>' +
            '<div class="card-tags">' + p.technologies.map(function (t) { return '<span>' + escapeHtml(t) + '</span>'; }).join("") + '</div>' +
            '<div class="card-links">' + githubLink + demoLink + '</div>' +
          '</div>' +
        '</article>'
      );
    }).join("");
    observeNewReveals(grid);
  }

  function renderDesigns(list) {
    const grid = document.getElementById("designsGrid");
    if (!grid) return;
    if (!list.length) {
      grid.innerHTML = '<p class="empty-state">No designs in this category yet.</p>';
      return;
    }
    grid.innerHTML = list.map(function (d) {
      return (
        '<article class="design-card" data-category="' + escapeHtml(d.category) + '" data-reveal="fade-up">' +
          '<div class="card-media">' +
            '<img src="' + escapeHtml(d.image) + '" alt="' + escapeHtml(d.title) + '" loading="lazy" onerror="this.src=\'assets/images/designs/placeholder.svg\'">' +
            '<span class="card-category">' + escapeHtml(d.category) + '</span>' +
          '</div>' +
          '<div class="card-body">' +
            '<h3>' + escapeHtml(d.title) + '</h3>' +
            '<p>' + escapeHtml(d.description) + '</p>' +
            (d.software ? '<div class="card-tags"><span>' + escapeHtml(d.software) + '</span></div>' : '') +
          '</div>' +
        '</article>'
      );
    }).join("");
    observeNewReveals(grid);
  }

  function observeNewReveals(container) {
    const els = container.querySelectorAll("[data-reveal]");
    if (prefersReducedMotion) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    const obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    els.forEach(function (el) { obs.observe(el); });
  }

  const projectsData = Array.isArray(window.projects) ? window.projects : [];
  const designsData = Array.isArray(window.designs) ? window.designs : [];

  renderProjects(projectsData);
  renderDesigns(designsData);

  /* ---------------------------------------------------------
     FILTERING
  --------------------------------------------------------- */
  function setupFilters(barId, data, renderFn) {
    const bar = document.getElementById(barId);
    if (!bar) return;
    bar.addEventListener("click", function (e) {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      bar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      const filtered = filter === "ALL" ? data : data.filter(function (item) { return item.category === filter; });
      renderFn(filtered);
    });
  }
  setupFilters("projectFilters", projectsData, renderProjects);
  setupFilters("designFilters", designsData, renderDesigns);

  /* ---------------------------------------------------------
     GITHUB STATS (optional — fails silently if unavailable)
  --------------------------------------------------------- */
  const githubStatsEl = document.getElementById("githubStats");
  if (githubStatsEl) {
    fetch("https://api.github.com/users/ACHILLE0LEBA")
      .then(function (res) { if (!res.ok) throw new Error("GitHub API unavailable"); return res.json(); })
      .then(function (data) {
        githubStatsEl.innerHTML =
          '<div class="g-stat"><strong>' + (data.public_repos ?? "—") + '</strong><span>Public Repos</span></div>' +
          '<div class="g-stat"><strong>' + (data.followers ?? "—") + '</strong><span>Followers</span></div>' +
          '<div class="g-stat"><strong>' + (data.following ?? "—") + '</strong><span>Following</span></div>';
      })
      .catch(function () {
        // Silently hide stats if the GitHub API is unreachable — the CTA button still works.
        githubStatsEl.innerHTML = "";
      });
  }

  /* ---------------------------------------------------------
     CONTACT FORM (front-end only — connect a backend/service)
  --------------------------------------------------------- */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  contactForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    // NOTE: There is no backend wired up yet. Connect this form to a service
    // such as Formspree, EmailJS, or your own API endpoint to actually send messages.
    formStatus.textContent = "Thanks for reaching out! (Connect this form to an email service to receive messages.)";
    contactForm.reset();
  });

})();
