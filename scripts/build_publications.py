#!/usr/bin/env python3
"""
Regenerate data/publications.json from BibTeX exports in data/sources/*.bib.

Workflow to refresh your publications:
  1. Export BibTeX from NUS Discovery (https://discovery.nus.edu.sg/24081-swapnil-mishra/publications)
     or Google Scholar, and drop the .bib file(s) into data/sources/.
  2. Run:  python3 scripts/build_publications.py
  3. Run:  node build.mjs     (rebuild the site)
  4. Commit & push to main — GitHub Actions deploys automatically.

It keeps published journal articles, conference papers, book chapters and the
thesis; drops preprints/duplicates/corrections; cleans DOIs; and preserves the
"featured" flag for a curated set of papers (see FEATURED_DOIS below).
"""
import re, json, glob, os

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(HERE, "data", "sources")
OUT = os.path.join(HERE, "data", "publications.json")

# ---- Featured papers (existing highlights + recent additions) ----
FEATURED_DOIS = {d.lower() for d in [
    "10.1038/s41586-020-2405-7",      # Nature — NPIs in Europe
    "10.1126/science.abh2644",        # Science — P.1 Manaus
    "10.1007/s11222-022-10151-w",     # Stat & Computing — πVAE
    "10.1111/ele.70391",              # Ecology Letters — avian influenza
    "10.1038/s41467-026-73445-x",     # Nat Commun — urban mobility (Khoa)
    "10.1371/journal.pntd.0014135",   # PLOS NTD — dengue heterogeneity (Andra)
    "10.1098/rsif.2025.0445",         # J R Soc Interface — dengue FoI Java (Bimandra)
    "10.1371/journal.pcbi.1013642",   # PLOS Comput Biol — human mobility (Mousumi)
    "10.1038/s41467-024-54891-x",     # Nat Commun — malaria new capital Indonesia
    "10.1145/2983323.2983812",        # CIKM
    "10.1145/2623330.2623691",        # KDD
]}
FEATURED_TITLES = {
    "assessing transmissibility of sars cov 2 lineage b 1 1 7 in england",
    "modeling popularity in asynchronous social media streams with recurrent neural networks",
}

# ============================ BibTeX parser ============================
def parse_bib(path):
    txt = open(path, encoding="utf-8-sig").read()
    entries, i, n = [], 0, len(txt)
    while True:
        at = txt.find("@", i)
        if at == -1:
            break
        m = re.match(r"@(\w+)\s*\{\s*([^,]+),", txt[at:])
        if not m:
            i = at + 1; continue
        body_start = at + m.end()
        j = at + txt[at:].find("{"); depth = 1; k = j + 1
        while k < n and depth > 0:
            depth += (txt[k] == "{") - (txt[k] == "}"); k += 1
        fields = parse_fields(txt[body_start:k - 1])
        fields["_type"] = m.group(1).lower(); fields["_key"] = m.group(2).strip()
        entries.append(fields); i = k
    return entries

def parse_fields(body):
    fields, i, n = {}, 0, len(body)
    while i < n:
        fm = re.match(r"\s*(\w+)\s*=\s*", body[i:])
        if not fm:
            nc = body.find(",", i)
            if nc == -1: break
            i = nc + 1; continue
        name = fm.group(1).lower(); i += fm.end()
        if i < n and body[i] == "{":
            depth = 1; k = i + 1
            while k < n and depth > 0:
                depth += (body[k] == "{") - (body[k] == "}"); k += 1
            val = body[i + 1:k - 1]; i = k
        elif i < n and body[i] == '"':
            k = i + 1
            while k < n and body[k] != '"': k += 1
            val = body[i + 1:k]; i = k + 1
        else:
            nc = body.find(",", i); nc = n if nc == -1 else nc
            val = body[i:nc].strip(); i = nc
        while i < n and body[i] in ", \n\r\t": i += 1
        fields[name] = val.strip()
    return fields

# ============================ helpers ============================
def clean(s):
    if s is None: return ""
    s = str(s).replace("\n", " ").replace("\\&", "&").replace("\\%", "%")
    s = s.replace("\\$", "").replace("$", "").replace("{", "").replace("}", "")
    return re.sub(r"\s+", " ", s).strip()

def norm(t):
    t = clean(t).lower()
    t = re.sub(r"^report\s*\d+:\s*", "", t)
    t = t.replace("π", "pi")
    return " ".join(re.sub(r"[^a-z0-9]+", " ", t).split())

def clean_doi(doi):
    doi = (doi or "").strip().lower().replace("https://doi.org/", "").replace("http://dx.doi.org/", "")
    doi = re.sub(r"\s.*$", "", doi); doi = re.sub(r"originally.*$", "", doi); doi = doi.rstrip(".")
    return doi if re.match(r"10\.\d{4,9}/", doi) else ""

def parse_authors(a):
    out = []
    for part in re.split(r"\s+and\s+", clean(a)):
        part = part.strip().rstrip(",")
        if not part: continue
        if "," in part:
            fam, giv = part.split(",", 1); out.append({"family": fam.strip(), "given": giv.strip()})
        else:
            toks = part.split()
            out.append({"family": toks[-1], "given": " ".join(toks[:-1])} if len(toks) >= 2 else {"family": part, "given": ""})
    return out

VMAP = {
  "nat commun": "Nature Communications", "ecol lett": "Ecology Letters",
  "plos neglected tropical di": "PLOS Neglected Tropical Diseases", "plos neglected tropical diseases": "PLOS Neglected Tropical Diseases",
  "plos computational biology": "PLOS Computational Biology", "plos one": "PLOS ONE", "plos global public health": "PLOS Global Public Health",
  "eclinicalmedicine": "EClinicalMedicine", "bmj global health": "BMJ Global Health", "bmj open": "BMJ Open",
  "jama network open": "JAMA Network Open", "lancet public health": "The Lancet Public Health",
  "lancet infectious diseases": "The Lancet Infectious Diseases", "lancet global health": "The Lancet Global Health",
  "lancet": "The Lancet", "nature medicine": "Nature Medicine", "nature": "Nature", "science": "Science",
  "communications medicine": "Communications Medicine", "communications physics": "Communications Physics",
  "scientific reports": "Scientific Reports", "scientific data": "Scientific Data", "statistics and computing": "Statistics and Computing",
  "cell genomics": "Cell Genomics", "nature health": "Nature Health", "epidemics": "Epidemics", "age and ageing": "Age and Ageing",
  "bmc public health": "BMC Public Health", "bmc infectious diseases": "BMC Infectious Diseases", "bmc medicine": "BMC Medicine",
  "bmc emergency medicine": "BMC Emergency Medicine", "journal of travel medicine": "Journal of Travel Medicine",
  "wellcome open research": "Wellcome Open Research", "journal of mathematical bi": "Journal of Mathematical Biology",
  "journal of mathematical biology": "Journal of Mathematical Biology", "transactions on machine le": "Transactions on Machine Learning Research (TMLR)",
  "proceedings of the royal s": "Proceedings of the Royal Society A", "nature communications": "Nature Communications",
}
def conf_name(title, e):
    nt = norm(title); doi = clean(e.get("doi", "")).lower(); bt = clean(e.get("booktitle", "")).lower()
    if "experiments with non parametric topic models" in nt or "2623330" in doi: return "ACM SIGKDD (KDD)"
    if "feature driven and point process" in nt or "2983323" in doi: return "ACM CIKM"
    if "modeling popularity in asynchronous" in nt or "icwsm" in bt: return "AAAI ICWSM"
    if "bridging models for popularity" in nt or "wsdm" in bt: return "ACM WSDM"
    if "sir-hawkes" in nt or "web conference 2018" in bt: return "The Web Conference (WWW)"
    if "gaussian process nowcasting" in nt or "uncerta" in bt: return "Conf. on Uncertainty in AI (UAI)"
    return clean(e.get("booktitle", ""))
def venue_name(e):
    if e["_type"] == "inproceedings": return conf_name(e.get("title", ""), e)
    v = clean(e.get("journal", e.get("booktitle", ""))); nv = v.lower().strip()
    if nv in VMAP: return VMAP[nv]
    if "royal stati" in nv: return "Journal of the Royal Statistical Society: Series A"
    if "royal socie" in nv: return "Journal of the Royal Society Interface"
    if "medical interne" in nv: return "Journal of Medical Internet Research"
    if "international journal of i" in nv: return "International Journal of Infectious Diseases"
    if "international journal of a" in nv: return "International Journal of Approximate Reasoning"
    return v
def year_of(e):
    m = re.search(r"\d{4}", clean(e.get("year", ""))); return int(m.group()) if m else 0

DROP = re.compile(r"^(reply to|authors? reply|author correction|correction|erratum)", re.I)
def excluded(title):
    nt = clean(title).lower()
    if DROP.search(nt): return True
    for s in ["reply to the discussion", "contribution to the discussion", "authors' reply", "author's reply",
              "tracking progress towards malaria in elimination in china", "a tutorial on hawkes processes"]:
        if s in nt: return True
    return nt.endswith("reply")
DOI_FIX = {"deep learning and mcmc with aggvae": "10.48550/arxiv.2305.19779"}

# ============================ build ============================
def main():
    files = sorted(glob.glob(os.path.join(SRC, "*.bib")))
    if not files:
        raise SystemExit(f"No .bib files found in {SRC}")
    merged = {}
    for f in sorted(files, key=lambda p: -os.path.getsize(p)):  # largest first
        for e in parse_bib(f):
            key = clean_doi(e.get("doi", "")) or norm(e.get("title", ""))
            if not key: continue
            if key in merged:
                for k, v in e.items():
                    merged[key].setdefault(k, v)
            else:
                merged[key] = e

    records = []
    for e in merged.values():
        title = clean(e.get("title", ""))
        if not title or excluded(title): continue
        t = e["_type"]
        if t not in ("article", "inproceedings", "incollection"): continue   # drop @misc preprints
        kind = {"article": "journal", "inproceedings": "conference", "incollection": "chapter"}[t]
        venue = venue_name(e)
        if venue.lower() in ("research square", "res sq") or year_of(e) == 0:
            continue  # unpublished/no-year stubs
        nt = norm(title)
        doi = clean_doi(e.get("doi", "")) or DOI_FIX.get(nt, "")
        if kind == "chapter" and not venue: venue = "Springer (Book Chapter)"
        if not (venue.strip() or doi or clean(e.get("url", ""))): continue
        records.append({
            "title": title.rstrip(".").replace("π VAE", "πVAE"),
            "authors": parse_authors(e.get("author", "")),
            "venue": venue, "year": year_of(e),
            "volume": clean(e.get("volume", "")), "number": clean(e.get("number", "")), "pages": clean(e.get("pages", "")),
            "doi": doi, "url": ("https://doi.org/" + doi) if doi else clean(e.get("url", "")),
            "kind": kind, "abstract": clean(e.get("abstract", "")),
            "featured": (doi in FEATURED_DOIS) or (nt in FEATURED_TITLES),
        })

    # PhD thesis (not in Discovery export)
    records.append({
        "title": "Linking Models for Collective Attention in Social Media",
        "authors": [{"family": "Mishra", "given": "Swapnil"}],
        "venue": "PhD Thesis, The Australian National University", "year": 2019,
        "volume": "", "number": "", "pages": "", "doi": "10.25911/5dca7c908fc38",
        "url": "https://doi.org/10.25911/5dca7c908fc38", "kind": "thesis", "abstract": "", "featured": False})

    seen_doi, seen_title, final = set(), set(), []
    for r in sorted(records, key=lambda r: (-r["year"], r["title"].lower())):
        nt = norm(r["title"])
        if (r["doi"] and r["doi"] in seen_doi) or nt in seen_title: continue
        if r["doi"]: seen_doi.add(r["doi"])
        seen_title.add(nt); final.append(r)

    json.dump(final, open(OUT, "w"), indent=1, ensure_ascii=False)
    from collections import Counter
    print(f"Wrote {len(final)} publications to {OUT}")
    print("  kinds:", dict(Counter(r["kind"] for r in final)), "| featured:", sum(r["featured"] for r in final))

if __name__ == "__main__":
    main()
