# How to update this website

A plain-English guide for editing the site, checking it locally, and publishing.
You only ever touch files in **`data/`** (and sometimes `assets/`). No HTML needed.

---

## The 3-step loop (this is the whole workflow)

```bash
# 1. EDIT — change a file in data/ (see "What to edit for what" below)

# 2. PREVIEW LOCALLY
node build.mjs            # rebuilds the site into ./public
open public/index.html    # opens it in your browser to check

# 3. PUBLISH
git add -A
git commit -m "Describe what you changed"
git push origin main
```

After the push, **both sites update automatically in ~1–2 minutes**:
- https://s-mishra.github.io  (GitHub Pages)
- https://www.smishra.dev    (Netlify — auto-publishes from the same build)

That's it. The sections below are just detail and troubleshooting.

---

## What to edit for what

| You want to change…                              | Edit this file                          |
|--------------------------------------------------|-----------------------------------------|
| Name, title/tagline, short intro                 | `data/profile.json`                     |
| Biography paragraphs                             | `data/profile.json` → `bio`             |
| Research interests (the chips)                   | `data/profile.json` → `interests`       |
| Appointments / positions                         | `data/profile.json` → `positions`       |
| Honours & awards                                 | `data/profile.json` → `honours`         |
| Education                                        | `data/profile.json` → `education`       |
| Social links (Scholar, ORCID, GitHub, NUS)       | `data/profile.json` → `social`          |
| Email addresses                                  | `data/profile.json` → `emails`          |
| Publications                                     | `data/publications.json` (see below)    |
| Profile photo                                    | replace `assets/img/profile.jpg`        |
| Colours / fonts / spacing                        | `assets/css/style.css`                  |

After editing any of these, run the 3-step loop above.

---

## Common edits, with examples

### Add a publication
Open `data/publications.json` and add an entry at the top (newest first):

```json
{
  "title": "My new paper title",
  "authors": [
    {"given": "S", "family": "Mishra"},
    {"given": "A", "family": "Coauthor"}
  ],
  "venue": "Nature Communications",
  "year": 2026,
  "doi": "10.1038/sxxxxx-xxx-xxxxx-x",
  "kind": "journal",
  "featured": true
}
```

- `kind` is one of: `journal`, `conference`, `chapter`, `thesis`.
- `featured: true` makes it appear in the **Featured Publications** cards on the homepage. Use `false` (or omit) for a normal list entry.
- Your own name — `{"given": "S", "family": "Mishra"}` — is **bold-ed automatically**.
- If a paper has no DOI, add a `"url": "https://…"` instead; if it has neither, the site auto-links to a Google Scholar search.

### Bulk-refresh all publications from a fresh export
Instead of hand-editing, you can regenerate the whole list:

1. Export **BibTeX** from your [NUS Discovery profile](https://discovery.nus.edu.sg/24081-swapnil-mishra/publications) (or Google Scholar).
2. Put the `.bib` file(s) into `data/sources/` (you can replace the existing ones).
3. Run:
   ```bash
   python3 scripts/build_publications.py    # rewrites data/publications.json
   node build.mjs                           # rebuild the site
   ```
4. To keep a paper "featured" after a refresh, add its DOI to the `FEATURED_DOIS`
   list near the top of `scripts/build_publications.py`.

### Change your photo
Replace the file `assets/img/profile.jpg` with a new photo of the same name
(a square-ish portrait works best), then run the 3-step loop.

### Change an email address
Edit `data/profile.json` → `emails` (and the `mailto:` entry in `social` for the
icon). Type the address normally — the build **automatically scrambles it** so
spam crawlers can't read it; it's reassembled into a working link by the page's
JavaScript. You don't need to do anything special.

---

## Local verification (before publishing)

You need **Node.js** installed (`node --version` should print something). Python
is only needed if you use the bulk publications refresh.

```bash
node build.mjs
```

- If it prints `✓ Built site → public/` you're good.
- If it prints an **error**, you probably have a typo in a `.json` file (often a
  missing comma or quote). Fix it and run again. Tip: paste the file into
  <https://jsonlint.com> to find the bad line.

Then open `public/index.html` in your browser and check:
- the change you made shows up,
- the dark-mode toggle (top-right) works,
- on the **Publications** page, the search box and the All / Featured / Journal /
  Conference filters work.

Nothing here touches the live site — `public/` is just a local preview.

---

## Publishing (going live)

```bash
git add -A
git commit -m "What you changed"
git push origin main
```

**What happens automatically when you push to `main`:**
1. A GitHub Action (`.github/workflows/gh-pages.yml`) runs `node build.mjs`.
2. It publishes the built site to the **`gh-pages`** branch.
3. **GitHub Pages** serves it at `s-mishra.github.io`, and **Netlify**
   auto-publishes the same `gh-pages` to `www.smishra.dev`.

**Confirm it went live:**
- GitHub Action: repo → **Actions** tab → the latest "Deploy GitHub Pages" run
  should be green. (Or run `gh run list --branch main --limit 1`.)
- Netlify: your project → **Deploys** → a new deploy from the `gh-pages` commit
  should appear and go green.
- Or just hard-refresh the two sites (Cmd-Shift-R) after a couple of minutes.

> Two branches, for reference: **`main`** = the source you edit; **`gh-pages`** =
> the auto-generated output. **Never edit `gh-pages` by hand** — it gets
> overwritten on every deploy.

### Manual deploy (only if the Action ever fails)
```bash
./deploy.sh
```
This builds locally and pushes `public/` straight to `gh-pages`.

---

## If something goes wrong

| Symptom                                   | What to do                                                                 |
|-------------------------------------------|----------------------------------------------------------------------------|
| `node build.mjs` errors                   | Typo in a `.json` file — check commas/quotes (jsonlint.com), fix, re-run.   |
| Action is **red** in the Actions tab      | Click it to read the error; usually a `.json` typo that also fails locally. |
| `s-mishra.github.io` didn't update        | Wait 2 min + hard-refresh; check the Action went green.                     |
| `www.smishra.dev` didn't update           | Netlify → **Deploys** → **Trigger deploy** (it normally auto-deploys).      |
| Want to undo the last change              | `git revert HEAD && git push origin main` (re-deploys the previous version).|

---

## Quick file map

```
build.mjs                      ← the generator (don't usually touch)
data/
  profile.json                 ← name, bio, titles, honours, education, social, emails
  publications.json            ← all publications
  sources/*.bib                ← raw BibTeX exports (for bulk refresh)
assets/
  img/profile.jpg              ← your photo
  css/style.css                ← look & feel
  js/main.js                   ← dark mode, search, email assembly
scripts/build_publications.py  ← regenerates publications.json from data/sources/*.bib
.github/workflows/gh-pages.yml ← the auto-deploy (build + publish to gh-pages)
public/                        ← local build output (auto-generated; not committed)
```
