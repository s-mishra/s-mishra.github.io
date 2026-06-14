/* ===========================================================================
   Site interactions: theme toggle, mobile nav, scroll reveal, pub search/filter
   =========================================================================== */
(function () {
  "use strict";

  /* ----- Theme toggle ----- */
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ----- Email de-obfuscation (assemble mailto links at runtime so the
     address is never present as plaintext/mailto in the static HTML) ----- */
  function decodeEmail(s) {
    try { return atob(s).split("").reverse().join(""); } catch (e) { return ""; }
  }
  Array.prototype.forEach.call(document.querySelectorAll(".email-link"), function (a) {
    var email = decodeEmail(a.getAttribute("data-e") || "");
    if (!email) return;
    a.setAttribute("href", "mailto:" + email);
    var label = a.querySelector(".et");
    if (label) label.textContent = email;
  });

  /* ----- Mobile nav ----- */
  var burger = document.getElementById("navBurger");
  var navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", function () { navLinks.classList.toggle("open"); });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") navLinks.classList.remove("open");
    });
  }

  /* ----- Scroll reveal ----- */
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var els = document.querySelectorAll(".section, .pub-card, .grant-card");
    els.forEach(function (el) { el.style.opacity = "0"; el.style.transform = "translateY(16px)"; el.style.transition = "opacity .5s ease, transform .5s ease"; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.style.opacity = "1"; en.target.style.transform = "none"; io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ----- Publications search + filter ----- */
  var search = document.getElementById("pubSearch");
  var filters = document.getElementById("pubFilters");
  var countEl = document.getElementById("pubCount");
  var noResults = document.getElementById("noResults");
  if (!search && !filters) return;

  var rows = Array.prototype.slice.call(document.querySelectorAll(".pub-row"));
  var groups = Array.prototype.slice.call(document.querySelectorAll(".year-group"));
  var activeFilter = "all";

  function apply() {
    var q = (search ? search.value : "").trim().toLowerCase();
    var shown = 0;
    rows.forEach(function (r) {
      var matchQ = !q || r.getAttribute("data-search").indexOf(q) !== -1;
      var matchF =
        activeFilter === "all" ? true :
        activeFilter === "featured" ? r.getAttribute("data-featured") === "true" :
        r.getAttribute("data-kind") === activeFilter;
      var vis = matchQ && matchF;
      r.style.display = vis ? "" : "none";
      if (vis) shown++;
    });
    // hide empty year groups
    groups.forEach(function (g) {
      var visibleRows = Array.prototype.slice.call(g.querySelectorAll(".pub-row")).some(function (r) { return r.style.display !== "none"; });
      g.style.display = visibleRows ? "" : "none";
    });
    if (countEl) countEl.textContent = shown + " result" + (shown === 1 ? "" : "s");
    if (noResults) noResults.style.display = shown === 0 ? "block" : "none";
  }

  if (search) search.addEventListener("input", apply);
  if (filters) {
    filters.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filters.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-filter");
      apply();
    });
  }
  apply();
})();
