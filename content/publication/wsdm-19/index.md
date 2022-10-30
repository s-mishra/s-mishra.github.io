---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Bridging Models for Popularity Prediction on Social Media"
authors: ["Swapnil Mishra"]
date: 2019-02-11T05:01:45+10:00
doi: "10.1145/3289600.3291598"

# Schedule page publish date (NOT publication's date).
publishDate: 2019-11-12T14:58:50Z

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["1"]

# Publication name and optional abbreviated publication name.
publication: "Proceedings of the Twelfth ACM International Conference on Web Search and Data Mining"
publication_short: "WSDM"

abstract: "Understanding and predicting the popularity of online items is an important open problem in social media analysis. Most of the recent work on popularity prediction is either based on learning a variety of features from full network data or using generative processes to model the event time data. We identify two gaps in the current state of the art prediction models. The first is the unexplored connection and comparison between the two aforementioned approaches. In our work, we bridge gap between feature-driven and generative models by modelling social cascade with a marked Hawkes self-exciting point process. We then learn a predictive layer on top for popularity prediction using a collection of cascade history. Secondly, the existing methods typically focus on a single source of external influence, whereas for many types of online content such as YouTube videos or news articles, attention is driven by multiple heterogeneous sources simultaneously - e.g. microblogs or traditional media coverage. We propose a recurrent neural network based model for asynchronous streams that connects multiple streams of different granularity via joint inference. We further design two new measures, one to explain the viral potential of videos, the other to uncover latent influences including seasonal trends. This work provides accurate and explainable popularity predictions, as well as computational tools for content producers and marketers to allocate resources for promotion campaigns."

# Summary. An optional shortened abstract.
summary: ""

tags: []
categories: []
featured: false

# Custom links (optional).
#   Uncomment and edit lines below to show custom links.
# links:
# - name: Follow
#   url: https://twitter.com
#   icon_pack: fab
#   icon: twitter

url_pdf: "http://delivery.acm.org/10.1145/3300000/3291598/p810-mishra.pdf?"
url_preprint: "https://dl.acm.org/citation.cfm?id=3291598"

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
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
