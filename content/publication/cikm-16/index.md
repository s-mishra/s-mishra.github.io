---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Feature Driven and Point Process Approaches for Popularity Prediction"
authors:  ["Swapnil Mishra", "Marian-Andrei Rizoiu", "Lexing Xie"]
date: 2016-10-24T05:04:00
doi: "10.1145/2983323.2983812"

# Schedule page publish date (NOT publication's date).
publishDate: 2019-11-12T14:57:50Z

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["1"]

# Publication name and optional abbreviated publication name.
publication: "Proceedings of the 25th ACM International Conference on Information and Knowledge Management"
publication_short: "CIKM"

abstract: "Predicting popularity, or the total volume of information outbreaks, is an important subproblem for understanding collective behavior in networks. Each of the two main types of recent approaches to the problem, feature-driven and generative models, have desired qualities and clear limitations. This paper bridges the gap between these solutions with a new hybrid approach and a new performance benchmark. We model each social cascade with a marked Hawkes self-exciting point process, and estimate the content virality, memory decay, and user influence. We then learn a predictive layer for popularity prediction using a collection of cascade history. To our surprise, Hawkes process with a predictive overlay outperform recent feature-driven and generative approaches on existing tweet data [44] and a new public benchmark on news tweets. We also found that a basic set of user features and event time summary statistics performs competitively in both classification and regression tasks, and that adding point process information to the feature set further improves predictions. From these observations, we argue that future work on popularity prediction should compare across feature-driven and generative modeling approaches in both classification and regression tasks."

# Summary. An optional shortened abstract.
summary: ""

tags: []
categories: []
featured: true

# Custom links (optional).
#   Uncomment and edit lines below to show custom links.
# links:
# - name: Follow
#   url: https://twitter.com
#   icon_pack: fab
#   icon: twitter

url_pdf: "https://arxiv.org/pdf/1608.04862.pdf"
url_preprint: "https://arxiv.org/abs/1608.04862"
url_code: "https://git.io/v6rIN"
url_dataset: "https://git.io/v6rIN"
url_project: "http://cm.cecs.anu.edu.au/post/fdhawkesforpopularity/"
url_slides: "http://cm.cecs.anu.edu.au/documents/smishra_cikm16_presentation.pdf"
url_video: ""
url_poster: ""
url_source: ""

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image: 
  caption: ""
  focal_point: "smart"
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects: []

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: ""
---
