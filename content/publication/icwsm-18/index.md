---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Modeling Popularity in Asynchronous Social Media Streams with Recurrent Neural Networks"
authors: ["Swapnil Mishra", "Marian-Andrei Rizoiu", "Lexing Xie"]
date: 2018-04-06T14:57:58Z
doi: ""

# Schedule page publish date (NOT publication's date).
publishDate: 2019-11-12T14:57:58Z

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["1"]

# Publication name and optional abbreviated publication name.
publication: "THE 12TH INTERNATIONAL AAAI CONFERENCE ON WEB AND SOCIAL MEDIA"
publication_short: "ICWSM"

abstract: "Understanding and predicting the popularity of online items is an important open problem in social media analysis. Considerable progress has been made recently in data-driven predictions, and in linking popularity to external promotions. However, the existing methods typically focus on a single source of external influence, whereas for many types of online content such as YouTube videos or news articles, attention is driven by multiple heterogeneous sources simultaneously - e.g. microblogs or traditional media coverage. Here, we propose RNN-MAS, a recurrent neural network for modeling asynchronous streams. It is a sequence generator that connects multiple streams of different granularity via joint inference. We show RNN-MAS not only to outperform the current state-of-the-art Youtube popularity prediction system by 17%, but also to capture complex dynamics, such as seasonal trends of unseen influence. We define two new metrics: promotion score quantifies the gain in popularity from one unit of promotion for a Youtube video; the loudness level captures the effects of a particular user tweeting about the video. We use the loudness level to compare the effects of a video being promoted by a single highly-followed user (in the top 1% most followed users) against being promoted by a group of mid-followed users. We find that results depend on the type of content being promoted: superusers are more successful in promoting Howto and Gaming videos, whereas the cohort of regular users are more influential for Activism videos. This work provides more accurate and explainable popularity predictions, as well as computational tools for content producers and marketers to allocate resources for promotion campaigns."

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

url_pdf: "https://arxiv.org/pdf/1804.02101.pdf"
url_preprint: "https://arxiv.org/abs/1804.02101"
url_code: "https://github.com/computationalmedia/rnn-mas"
url_dataset: "https://github.com/computationalmedia/rnn-mas"
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
