# abtinshahidi.github.io — redesign overlay

A fully static, modern redesign of the site (no Jekyll build needed). Unzip this at the
**root of your repository**, alongside your existing `/files`, `/notebooks`, and `/images`
folders, commit, and push. GitHub Pages serves it as-is (a `.nojekyll` file disables Jekyll).

## What's in this overlay
- `index.html` + `research/ industry/ publications/ talks/ visualizations/ teaching/ cv/` pages, `404.html`
- `assets/` — `site.css`, `site.js`, `favicon.svg`, self-hosted `fonts/`, and all figures in `viz/`
- `images/portrait.jpg` — new profile photo
- `files/Abtin_Shahidi_CV.pdf` — latest CV (wired to every "Download CV" button)
- `teaching/.../weekN/` — lightweight redirect stubs that bounce to the GitHub notebooks
- `.nojekyll`

Your existing `/files/*.pdf` (lecture slides, cheatsheets, Google verification) and
`/notebooks/` are reused and don't need to change.

## Latest content update
- CV & experience refreshed from the current CV (Independent Researcher; former Postdoc; VideoAmp).
- Industry: survey-based **lift methodology** (projection framework) and **behavioral modeling**
  (zero-inflated hierarchical point processes) rewritten from the source write-ups; imputation
  scope set to 120M U.S. households.
- Research: new hierarchical-Bayesian star-forming-sequence section with the real figures
  (SFR–mass mixture, stellar mass functions, quenching efficiency, quiescent-probability surfaces),
  plus the color–color selection and 3D UMAP embedding figures.
- Visualizations: the three reference figures (SFR–mass, 3D UMAP, color–color) now drive the gallery.
- Teaching: weekly notebooks link straight to GitHub (no on-site rendering).
- Publications: all **seven** cited papers pulled from Google Scholar.
- New profile photo.

## View locally
From the repo root (root-absolute paths need a server, not `file://`):

    python3 -m http.server 8000

then open http://localhost:8000/
