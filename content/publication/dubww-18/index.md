---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "SIR-Hawkes: Linking Epidemic Models and Hawkes Processes to Model Diffusions in Finite Populations"
authors: ["Marian-Andrei Rizoiu", "Swapnil Mishra", "Quyu Kong", "Mark Carman", "Lexing Xie"]
date: 2017-11-06T05:02:11+10:00
doi: "10.1145/3178876.3186108"

# Schedule page publish date (NOT publication's date).
publishDate: 2019-11-12T15:38:43Z

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["1"]

# Publication name and optional abbreviated publication name.
publication: "Proceedings of the 2018 World Wide Web Conference"
publication_short: "WWW"

abstract: "Among the statistical tools for online information diffusion modeling, both epidemic models and Hawkes point processes are popular choices. The former originate from epidemiology, and consider information as a viral contagion which spreads into a population of online users. The latter have roots in geophysics and finance, view individual actions as discrete events in continuous time, and modulate the rate of events according to the self-exciting nature of event sequences. Here, we establish a novel connection between these two frameworks. Namely, the rate of events in an extended Hawkes model is identical to the rate of new infections in the Susceptible-Infected-Recovered (SIR) model after marginalizing out recovery events -- which are unobserved in a Hawkes process. This result paves the way to apply tools developed for SIR to Hawkes, and vice versa. It also leads to HawkesN, a generalization of the Hawkes model which accounts for a finite population size. Finally, we derive the distribution of cascade sizes for HawkesN, inspired by methods in stochastic SIR. Such distributions provide nuanced explanations to the general unpredictability of popularity: the distribution for diffusion cascade sizes tends to have two modes, one corresponding to large cascade sizes and another one around zero."

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

url_pdf: "https://arxiv.org/pdf/1711.01679.pdf"
url_preprint: "https://arxiv.org/abs/1711.01679"
url_code: "https://github.com/computationalmedia/sir-hawkes"
url_dataset: "https://github.com/computationalmedia/sir-hawkes"
url_project: ""
url_slides: ""
url_video: ""
url_poster: ""
url_source: ""

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
