#!/usr/bin/env node
/* ===========================================================================
   Static site generator for swapnil mishra's academic website.
   No dependencies. Run: `node build.mjs`  ->  outputs to ./public
   Edit content in ./data/*.json, then rebuild and deploy (see README).
   =========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, "public");
const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));

const profile = read("data/profile.json");
const pubs = read("data/publications.json");

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const YEAR = new Date().getFullYear();
const SITE = "https://www.smishra.dev";

/* Obfuscate an email so it isn't present as plaintext / mailto: in the HTML.
   Stored as base64 of the reversed address; assembled into a mailto link by JS
   at runtime (see assets/js/main.js). Defeats regex/DOM email harvesters. */
function obfEmail(email) {
  return Buffer.from(email.split("").reverse().join(""), "utf8").toString("base64");
}

/* canonical link for a publication; never empty (falls back to a Scholar search) */
function pubHref(p) {
  if (p.doi) return "https://doi.org/" + p.doi;
  if (p.url) return p.url;
  return "https://scholar.google.com/scholar?q=" + encodeURIComponent(p.title);
}

/* ---------- icons (inline SVG, currentColor) ---------- */
const I = {
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  scholar: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 1 9l11 7 9-5.73V17h2V9L12 2zM5 13.18v3.83L12 21l7-3.99v-3.83l-7 4.45-7-4.45z"/></svg>',
  orcid: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zM7.37 18.16H5.62V7.91h1.75v10.25zM6.5 6.78a1.02 1.02 0 1 1 0-2.05 1.02 1.02 0 0 1 0 2.05zM18.4 13.3c0 2.96-1.88 4.86-4.9 4.86H9.6V7.91h3.9c2.9 0 4.9 1.96 4.9 4.86v.53zm-1.8-.27c0-2.02-1.26-3.22-3.2-3.22h-2.05v6.7h2.05c1.77 0 3.2-1.13 3.2-3.22v-.26z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 4.8 18.3 5.1 18.3 5.1c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>',
  university: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 9.5 12 4l9 5.5"/><path d="M5 10.5V18m4-7.5V18m6-7.5V18m4-7.5V18"/><path d="M3 21h18"/></svg>',
  cv: 'CV',
  ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 4h6v6m0-6L10 14M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>',
  data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>',
  briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
  sun: '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
  moon: '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
};

/* ---------- venue tiering for badge color ---------- */
const TOP = [/^nature$/i, /^science$/i, /^nature medicine/i, /^the lancet$/i, /^cell /i, /^nature health/i];
const HIGH = [/nature comm/i, /lancet/i, /pnas/i, /nature/i, /science/i, /^cell/i, /jama/i, /ecology letters/i];
function venueTier(v) {
  if (TOP.some((r) => r.test(v))) return "tier-top";
  if (HIGH.some((r) => r.test(v))) return "tier-high";
  return "";
}
/* short label for badge */
function venueShort(v) {
  const map = {
    "Nature Communications": "Nature Communications", "Journal of the Royal Society Interface": "J. R. Soc. Interface",
    "PLOS Computational Biology": "PLOS Comput. Biol.", "PLOS Neglected Tropical Diseases": "PLOS Negl. Trop. Dis.",
    "PLOS Global Public Health": "PLOS Glob. Public Health", "Journal of the Royal Statistical Society: Series A": "J. R. Stat. Soc. A",
    "The Lancet Infectious Diseases": "Lancet Infect. Dis.", "The Lancet Public Health": "Lancet Public Health",
    "The Lancet Global Health": "Lancet Glob. Health", "Journal of Medical Internet Research": "J. Med. Internet Res.",
    "International Journal of Infectious Diseases": "Int. J. Infect. Dis.", "Transactions on Machine Learning Research (TMLR)": "TMLR",
    "Statistics and Computing": "Stat. Comput.", "Journal of Mathematical Biology": "J. Math. Biol.",
    "Communications Medicine": "Commun. Medicine", "Communications Physics": "Commun. Physics",
    "International Journal of Approximate Reasoning": "Int. J. Approx. Reason.",
    "Wellcome Open Research": "Wellcome Open Res.", "BMC Infectious Diseases": "BMC Infect. Dis.",
    "BMC Emergency Medicine": "BMC Emerg. Med.", "Journal of Travel Medicine": "J. Travel Med.",
    "Proceedings of the Royal Society A": "Proc. R. Soc. A", "Scientific Reports": "Sci. Reports",
    "Scientific Data": "Sci. Data", "EClinicalMedicine": "EClinicalMed.",
  };
  return map[v] || v;
}

/* ---------- author formatting (bold Swapnil Mishra) ---------- */
function isMe(a) {
  const fam = (a.family || "").toLowerCase();
  const giv = (a.given || "").toLowerCase();
  return fam === "mishra" && (giv === "s" || giv.startsWith("swapnil") || giv === "s.");
}
function fmtAuthors(authors, max = 0) {
  let list = authors;
  let trailing = "";
  if (max && authors.length > max) {
    list = authors.slice(0, max);
    trailing = ` <span class="etal">et al.</span>`;
  }
  const parts = list.map((a) => {
    const given = a.given ? a.given.replace(/\s+/g, "").split(/(?=[A-Z])/).map(x=>x[0]?x[0].toUpperCase()+".":"").join("") : "";
    const name = esc(`${given} ${a.family}`.trim());
    return isMe(a) ? `<span class="me">${name}</span>` : name;
  });
  return parts.join(", ") + trailing;
}

/* ---------- publication links ---------- */
function pubLinks(p) {
  const out = [];
  if (p.doi) out.push(`<a class="pub-link" href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noopener">${I.doc} DOI</a>`);
  else if (p.url) out.push(`<a class="pub-link" href="${esc(p.url)}" target="_blank" rel="noopener">${I.ext} Link</a>`);
  else out.push(`<a class="pub-link" href="${esc(pubHref(p))}" target="_blank" rel="noopener">${I.search} Scholar</a>`);
  // Ecology Letters free read link (author share)
  if (p.doi === "10.1111/ele.70391")
    out.push(`<a class="pub-link" href="https://onlinelibrary.wiley.com/share/author/JXP7N6IWRWAUQWHAKR9E?target=10.1111/ele.70391" target="_blank" rel="noopener">${I.ext} Read</a>`);
  return out.join("");
}

/* ---------- nav + head ---------- */
function head(title, desc, extraCss = "") {
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="author" content="Swapnil Mishra">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${SITE}/assets/img/profile.jpg">
<meta name="twitter:card" content="summary">
<meta name="twitter:image" content="${SITE}/assets/img/profile.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,500;6..72,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect rx='20' width='100' height='100' fill='%233b5bdb'/><text x='50' y='68' font-size='56' text-anchor='middle' fill='white' font-family='Georgia,serif' font-weight='600'>SM</text></svg>">
<script>(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();</script>
${extraCss}
</head>`;
}

function navbar(active) {
  const links = [
    ["index.html#about", "About"],
    ["index.html#appointments", "Positions"],
    ["publications.html", "Publications"],
    ["index.html#contact", "Contact"],
  ];
  return `<nav class="nav"><div class="wrap nav-inner">
  <a class="brand" href="index.html"><span class="mark">SM</span> Swapnil Mishra</a>
  <div class="nav-links" id="navLinks">
    ${links.map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}
  </div>
  <div class="nav-actions">
    <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">${I.sun}${I.moon}</button>
    <button class="nav-burger" id="navBurger" aria-label="Menu">${I.menu}</button>
  </div>
</div></nav>`;
}

function socials() {
  return `<div class="socials">${profile.social.map((s) => {
    const icon = I[s.icon] || I.ext;
    if (s.url.startsWith("mailto:")) {
      // email: no plaintext / mailto in HTML — JS assembles the link at runtime
      return `<a class="email-link" data-e="${obfEmail(s.url.slice(7))}" title="${esc(s.label)}" aria-label="${esc(s.label)}" role="link" tabindex="0">${icon}</a>`;
    }
    const ext = s.url.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
    return `<a href="${esc(s.url)}" title="${esc(s.label)}" aria-label="${esc(s.label)}"${ext}>${icon}</a>`;
  }).join("")}</div>`;
}

function footer() {
  return `<footer class="footer"><div class="wrap footer-inner">
    <span>© ${YEAR} Swapnil Mishra</span>
    <span>Saw Swee Hock School of Public Health · National University of Singapore</span>
  </div></footer>`;
}

/* =========================================================================
   INDEX PAGE
   ========================================================================= */
function buildIndex() {
  const featured = pubs.filter((p) => p.featured).sort((a, b) => b.year - a.year);

  const featuredCards = featured.map((p) => `
    <article class="pub-card">
      <div class="pub-meta">
        <span class="venue-badge ${venueTier(p.venue)}">${esc(venueShort(p.venue))}</span>
        <span class="year-tag">${p.year}</span>
      </div>
      <div class="pub-title"><a href="${esc(pubHref(p))}" target="_blank" rel="noopener">${esc(p.title)}</a></div>
      <p class="pub-authors">${fmtAuthors(p.authors, 8)}</p>
      <div class="pub-links">${pubLinks(p)}</div>
    </article>`).join("");

  const jsonld = {
    "@context": "https://schema.org", "@type": "Person", name: "Swapnil Mishra",
    jobTitle: profile.tagline, affiliation: { "@type": "Organization", name: profile.affiliation },
    url: "https://www.smishra.dev/", image: "https://www.smishra.dev/assets/img/profile.jpg",
    sameAs: profile.social.filter((s) => s.url.startsWith("http")).map((s) => s.url),
  };

  return `${head("Swapnil Mishra — Public Health · Machine Learning · Bayesian Modelling",
    profile.shortIntro)}
<body>
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
${navbar("home")}

<header class="hero"><div class="wrap hero-grid">
  <div class="hero-text">
    <h1>${esc(profile.name)}</h1>
    <p class="role">${esc(profile.tagline)}</p>
    <p class="affil"><a href="${esc(profile.affiliationUrl)}">${profile.affiliation}</a></p>
    <p class="intro">${esc(profile.shortIntro)}</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="publications.html">${I.doc} View Publications</a>
      <a class="btn btn-ghost" href="index.html#contact">${I.email} Get in touch</a>
    </div>
    ${socials()}
  </div>
  <div class="hero-photo"><img src="${esc(profile.photo)}" alt="Swapnil Mishra" width="248" height="248"></div>
</div></header>

<main>
<section class="section" id="about"><div class="wrap">
  <div class="section-head"><span class="section-eyebrow">About</span><h2>Biography</h2></div>
  <div class="about-grid">
    <div class="about-bio">
      ${profile.bio.map((p) => `<p>${p}</p>`).join("")}
      <div class="chips" style="margin-top:20px">${profile.interests.map((i) => `<span class="chip">${esc(i)}</span>`).join("")}</div>
    </div>
    <aside class="side-card">
      <div class="side-block">
        <h3>Education</h3>
        ${profile.education.map((e) => `<div class="edu-item"><div class="deg">${esc(e.degree)}</div><div class="inst">${esc(e.institution)}</div><div class="yr">${esc(e.year)}</div></div>`).join("")}
      </div>
    </aside>
  </div>
</div></section>

<section class="section" id="appointments"><div class="wrap">
  <div class="section-head"><span class="section-eyebrow">Roles</span><h2>Appointments &amp; Honours</h2></div>
  <div class="two-col">
    <div class="panel">
      <h3>${I.briefcase} Appointments</h3>
      ${profile.positions.map((p) => `<div class="pos-item"><div class="r">${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">${p.role}</a>` : p.role}</div><div class="o">${p.org}</div></div>`).join("")}
    </div>
    <div class="panel">
      <h3>${I.award} Honours &amp; Awards</h3>
      ${profile.honours.map((h) => `<div class="honour"><div class="yr">${esc(h.year)}</div><div><div class="ttl">${esc(h.title)}</div><div class="org">${esc(h.org)}</div></div></div>`).join("")}
    </div>
  </div>
</div></section>

<section class="section" id="featured"><div class="wrap">
  <div class="section-head"><span class="section-eyebrow">Research</span><h2>Featured Publications</h2>
    <p class="section-sub">Selected work — see the <a href="publications.html">full list of ${pubs.length} publications</a>.</p></div>
  <div class="pub-grid">${featuredCards}</div>
  <div class="center-link"><a class="btn btn-ghost" href="publications.html">All publications ${I.ext}</a></div>
</div></section>

<section class="section" id="contact"><div class="wrap">
  <div class="section-head"><span class="section-eyebrow">Get in touch</span><h2>Contact</h2></div>
  <div class="contact-card">
    <p>I'm always happy to hear about research collaborations, PhD and postdoc opportunities, and questions about my work. The best way to reach me is by email.</p>
    <div class="email-row">${(profile.emails || []).map((e) => `<a class="btn btn-primary email-link" data-e="${obfEmail(e)}" aria-label="Email" role="link" tabindex="0">${I.email} <span class="et">${esc(e.replace("@", " [at] "))}</span></a>`).join("")}</div>
    <div style="margin-top:22px">${socials()}</div>
  </div>
</div></section>
</main>

${footer()}
<script src="assets/js/main.js"></script>
</body></html>`;
}

/* =========================================================================
   PUBLICATIONS PAGE
   ========================================================================= */
function buildPublications() {
  const sorted = [...pubs].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  const years = [...new Set(sorted.map((p) => p.year))].sort((a, b) => b - a);

  const kindLabel = { journal: "Journal", conference: "Conference", chapter: "Chapter", thesis: "Thesis" };

  const groups = years.map((yr) => {
    const items = sorted.filter((p) => p.year === yr);
    const rows = items.map((p) => {
      const link = pubHref(p);
      const blob = `${p.title} ${p.authors.map((a) => a.family + " " + a.given).join(" ")} ${p.venue} ${p.year}`.toLowerCase();
      return `<div class="pub-row ${p.featured ? "is-featured" : ""}" data-kind="${p.kind}" data-featured="${p.featured}" data-search="${esc(blob)}">
        <div class="venue-col"><span class="venue-badge ${venueTier(p.venue)}">${esc(venueShort(p.venue))}</span></div>
        <div class="pub-main">
          <div class="pub-title">${p.featured ? '<span class="star" title="Featured">★</span> ' : ""}<a href="${esc(link)}" target="_blank" rel="noopener">${esc(p.title)}</a></div>
          <p class="pub-authors">${fmtAuthors(p.authors, 12)}</p>
          <div class="pub-meta-line" style="color:var(--text-mut);font-size:.86rem;margin-bottom:8px">
            <em>${esc(p.venue)}</em>${p.volume ? `, ${esc(p.volume)}` : ""}${p.pages ? ` (${esc(p.pages)})` : ""} · ${kindLabel[p.kind] || ""}
          </div>
          <div class="pub-links">${pubLinks(p)}</div>
        </div>
      </div>`;
    }).join("");
    return `<div class="year-group" data-year="${yr}"><h2 class="year-heading">${yr}</h2>${rows}</div>`;
  }).join("");

  const jsonld = {
    "@context": "https://schema.org", "@type": "CollectionPage",
    name: "Publications — Swapnil Mishra", url: SITE + "/publications.html",
    about: { "@type": "Person", name: "Swapnil Mishra", url: SITE + "/" },
  };

  return `${head("Publications — Swapnil Mishra", `All ${pubs.length} publications by Swapnil Mishra.`)}
<body>
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
${navbar("pubs")}
<header class="pubpage-hero"><div class="wrap">
  <h1>Publications</h1>
  <p class="section-sub">${pubs.length} peer-reviewed articles, conference papers and book chapters. ★ marks featured work. For preprints and citation metrics, see <a href="https://scholar.google.com/citations?user=RqbpaXcAAAAJ" target="_blank" rel="noopener">Google&nbsp;Scholar</a>.</p>
</div></header>

<div class="pub-toolbar"><div class="wrap pub-toolbar-inner">
  <div class="search-box">${I.search}<input type="search" id="pubSearch" placeholder="Search title, author, venue…" aria-label="Search publications"></div>
  <div class="filters" id="pubFilters">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="featured">★ Featured</button>
    <button class="filter-btn" data-filter="journal">Journal</button>
    <button class="filter-btn" data-filter="conference">Conference</button>
  </div>
  <span class="pub-count" id="pubCount"></span>
</div></div>

<main><div class="wrap" id="pubList">
  ${groups}
  <div class="no-results" id="noResults">No publications match your search.</div>
</div></main>

${footer()}
<script src="assets/js/main.js"></script>
</body></html>`;
}

/* =========================================================================
   WRITE OUTPUT
   ========================================================================= */
function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "index.html"), buildIndex());
fs.writeFileSync(path.join(OUT, "publications.html"), buildPublications());
copyDir(path.join(ROOT, "assets"), path.join(OUT, "assets"));
// Netlify: serve static, no build
fs.writeFileSync(path.join(OUT, "netlify.toml"), '[build]\n  publish = "."\n  command = ""\n');
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

const featuredCount = pubs.filter((p) => p.featured).length;
console.log(`✓ Built site → public/`);
console.log(`  ${pubs.length} publications (${featuredCount} featured)`);
console.log(`  pages: index.html, publications.html`);
