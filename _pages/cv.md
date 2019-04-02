---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* B.S. in Physics, Sharif University of Technology, Tehran, Iran 2015
* M.S. in Physics and Astronomy, University of California, Riverside, USA, 2016
* Ph.D in Physics and Astronomy, University of California, Riverside, USA, 2021-22 (expected)

Work experience
======
* Summer 2015: Research Assistant
  * Github University
  * Duties included: Tagging issues
  * Supervisor: Professor Git

* Fall 2015: Research Assistant
  * Github University
  * Duties included: Merging pull requests
  * Supervisor: Professor Hub

Computer Skills
======
* Advanced: Python
  * Packages: Numpy, Scipy, Matplotlib, Scikit-learn, Tensorflow, PyTorch
* Intermediate: Mathematica, C/C++, LaTeX, GNU/Linux, shell scripting
* Basic: javascript, Julia, R, markdown, Matlab

Publications
======
  <ul>{% for post in site.publications %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Talks
======
  <ul>{% for post in site.talks %}
    {% include archive-single-talk-cv.html %}
  {% endfor %}</ul>

Teaching
======
  <ul>{% for post in site.teaching %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
