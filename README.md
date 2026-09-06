# kapil-portfolio

Interactive 3D portfolio + printable résumé for **Kapil Soni**, backend and platform
engineer (Go, Kubernetes, Kafka), pitching fixed-scope contract work.
Static. No build step, no npm install. Open `index.html` and it runs.

```
index.html          portfolio (WebGL hero, scroll motion)
resume.html         one-page résumé, prints straight to PDF
assets/css/style.css
assets/img/          reference headshots
assets/js/scene.js  three.js point cloud that morphs on scroll
assets/js/main.js   GSAP reveals, Lenis smooth scroll, cursor, tilt
```

Libraries load from jsDelivr: three 0.169, GSAP 3.12 + ScrollTrigger, Lenis 1.1.

## Run locally

```bash
python3 -m http.server 8000    # ES modules need http://, not file://
```

## Host on GitHub Pages

```bash
gh repo create kapil-portfolio --public --source=. --push
```

Then **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
Live at `https://kapildev333.github.io/kapil-portfolio/`.

To keep the old URL instead, push this into the existing `portfolio-main` repo.
To get `kapildev333.github.io` with no path, name the repo `kapildev333.github.io`.

## Fill in before you publish

Two links are placeholders, both marked `data-todo` in `index.html`:

- YouTube channel URL, in the `#offline` section
- Photography / Instagram URL, in the `#offline` section

Everything else comes from `Kapil-Soni-Resume_1.html`. When that résumé changes, the
matching copy lives in `index.html` (`#about`, `#work`, `#projects`, `#process`, `#stack`)
and in `resume.html`. They are deliberately duplicated rather than templated, since a
one-page résumé and a pitch page word the same facts differently.

## Notes

- Respects `prefers-reduced-motion`: WebGL freezes, all entrance animation is skipped.
- WebGL pauses when the tab is hidden.
- Particle count drops from 16k to 7k under 700px wide.
