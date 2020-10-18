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
* Ph.D in Physics and Astronomy, [University of California, Riverside](https://www.ucr.edu/), USA, 2021-22 (expected)
* M.S. in Physics and Astronomy, [University of California, Riverside](https://www.ucr.edu/), USA, 2016
* B.S. in Physics, [Sharif University of Technology](http://www.en.sharif.edu/), Tehran, Iran 2015

Work experience
======
* 2016-now: Research Assistant
  * University of California, Riverside
  * Research topic: High redshift galaxies, multiwavelenght catalogs
  * Supervisor: Professor [Bahram Mobasher](http://faculty.ucr.edu/~mobasher/)

* 2016-2018: Teaching Assistant
  * University of California, Riverside
  * Teaching topic: Several Physics labs, ["The Origin"](https://titles.cognella.com/origins-9781626614819)
  * Duties: Assignments, exams, discussion sessions
  * Supervisor: Professor [Bahram Mobasher](http://faculty.ucr.edu/~mobasher/)

* 2015-2016: Research Assistant
  * Sharif University of Technology
  * Research topic: 21cm cosmology
  * Supervisor: Professor [Shant Baghram](http://sharif.edu/~baghram/)

* 2015-2016: Research Assistant
  * Sharif University of Technology
  * Research topic: Quantum graphity (A background independent model for quantum gravity)
  * Supervisor: Professor [Vahid Karimipour](http://physics.sharif.edu/~vahid/)


* 2012-2016: High school Teacher and tutor for students in physics and astronomy olympiads
  * Salam, Allame Helli, Allame tabatabayi High schools
  * Teaching Topics: Newotonian Mechanics, Special relativity, Orbital Mechanics, Data analysis, Stellar astrophysics, Cosmology, Thermodynamics, Electromagnetism, Optics  

Technical Skills
======

## Computer Programming:


* Advanced: Python
  <!-- * Packages: Numpy, Scipy, Matplotlib, Scikit-learn, Tensorflow, PyTorch -->
* Intermediate: Mathematica, C/C++, $\LaTeX$, GNU/Linux, shell scripting
* Basic: html, css, R, javascript, markdown, Matlab

## Observing Experience:

* **3 Nights** with [MOSFIRE](https://www2.keck.hawaii.edu/inst/mosfire/home.html) on the [Keck II](http://keckobservatory.org/index.php), [Mauna Kea](https://en.wikipedia.org/wiki/Mauna_Kea#Summit_observatories), Hawaii, USA
* 2016 Observational Astronomy [Workshop Lick Observatory](http://mthamilton.ucolick.org/EVENTS/2016/), [Mount Hamilton](https://en.wikipedia.org/wiki/Mount_Hamilton_(California)), California, USA

Publications
======
{% for post in site.publications %}
  {% include archive-single.html %}
{% endfor %}


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
