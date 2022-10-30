---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Experiments with non-parametric topic models"
authors: ["Wray L. Buntine", "Swapnil Mishra"]
date: 2014-08-24T05:01:45+10:00
doi: "10.1145/2623330.2623691"

# Schedule page publish date (NOT publication's date).
publishDate: 2019-11-12T14:57:24Z

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["1"]

# Publication name and optional abbreviated publication name.
publication: "Proceedings of the 20th ACM SIGKDD international conference on Knowledge discovery and data mining"
publication_short: "KDD"

abstract: "In topic modelling, various alternative priors have been developed, for instance asymmetric and symmetric priors for the document-topic and topic-word matrices respectively, the hierarchical Dirichlet process prior for the document-topic matrix and the hierarchical Pitman-Yor process prior for the topic-word matrix. For information retrieval, language models exhibiting word burstiness are important. Indeed, this burstiness effect has been show to help topic models as well, and this requires additional word probability vectors for each document. Here we show how to combine these ideas to develop high-performing non-parametric topic models exhibiting burstiness based on standard Gibbs sampling. Experiments are done to explore the behavior of the models under different conditions and to compare the algorithms with previously published. The full non-parametric topic models with burstiness are only a small factor slower than standard Gibbs sampling for LDA and require double the memory, making them very competitive. We look at the comparative behaviour of different models and present some experimental insights."

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

url_pdf: "files/p881-buntine.pdf?"
url_preprint: "https://dl.acm.org/citation.cfm?id=2623691"
url_code: "https://github.com/wbuntine/topic-models"
url_dataset: ""
url_project: "https://topicmodels.org/2014/08/28/kdd-2014/"
url_slides: "https://topicmodelsdotorg.files.wordpress.com/2014/10/kdd14talk.pdf"
url_video: "http://videolectures.net/kdd2014_buntine_mishra_topic_models/"

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
