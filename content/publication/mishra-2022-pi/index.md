---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: 'π VAE: a stochastic process prior for Bayesian deep learning with MCMC'
subtitle: ''
summary: ''
authors:
- Swapnil Mishra
- Seth Flaxman
- Tresnia Berah
- Harrison Zhu
- Mikko Pakkanen
- Samir Bhatt
tags: []
categories: []
date: '2022-01-01'
doi: "10.1007/s11222-022-10151-w"
lastmod: 2022-10-30T08:24:27+01:00
featured: true
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ''
  focal_point: ''
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
publishDate: '2022-10-30T07:24:27.157295Z'
publication_types:
- '2'
abstract: 'Stochastic processes provide a mathematically elegant way to model complex data. In theory, they provide flexible priors over function classes that can encode a wide range of interesting assumptions. However, in practice efficient inference by optimisation or marginalisation is difficult, a problem further exacerbated with big data and high dimensional input spaces. We propose a novel variational autoencoder (VAE) called the prior encoding variational autoencoder (𝜋VAE). 𝜋VAE is a new continuous stochastic process. We use 𝜋VAE to learn low dimensional embeddings of function classes by combining a trainable feature mapping with generative model using a VAE. We show that our framework can accurately learn expressive function classes such as Gaussian processes, but also properties of functions such as their integrals. For popular tasks, such as spatial interpolation, 𝜋VAE achieves state-of-the-art performance both in terms of accuracy and computational efficiency. Perhaps most usefully, we demonstrate an elegant and scalable means of performing fully Bayesian inference for stochastic processes within probabilistic programming languages such as Stan.'
publication: '*Statistics and Computing*'

links:
- name: Supplementary Material
  url: https://link.springer.com/article/10.1007/s11222-022-10151-w#appendices

url_pdf: "https://link.springer.com/content/pdf/10.1007/s11222-022-10151-w.pdf"
url_code: "https://github.com/MLGlobalHealth/pi-vae "
url_dataset: "https://github.com/MLGlobalHealth/pi-vae "
---
