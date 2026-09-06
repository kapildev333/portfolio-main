# Brand guidelines — kapil-portfolio

Working reference. Not marketing copy. If a rule here disagrees with what you were
about to ship, the rule wins or the rule gets edited. No third option.

Scope: `index.html`, `resume.html`, `assets/css/style.css`, and anything added later.
Machine-readable values live in `assets/design-tokens.json`. This file explains the *why*
and holds everything a JSON file can't: voice.

---

## 1. What this site is

A backend/platform engineer in Montréal selling fixed-scope contract work. Three products:
a one-week readiness audit, a 2–4 week hardening sprint, an extra senior engineer by feature.

The buyer is a technical lead or founder at a small team. They have been sold to badly
before. They can smell a template. Everything below exists to not trip that alarm.

---

## 2. Voice

This is the most valuable section here. The colours can be replaced. The voice can't.

### 2.1 The character, precisely

**Plain.** Short declarative sentences. Ordinary words. No sentence needs a second read.

**Understated.** The site's single strongest line is a deflation, not a boast:

> "The part I'm proudest of is that it's boring to run."

It takes the biggest number on the page (28M+ requests a week) and refuses to celebrate it.
That refusal *is* the claim. A senior engineer reads "boring to run" and knows exactly how
much work that took. Anyone who doesn't isn't the buyer.

**Anti-hype.** The site sells reliability, not spectacle. Note what it never says: never
"scalable", never "world-class", never "passionate about". The word doing the most work
across the whole page is "boring".

**Concrete.** Claims carry a number, a named tool, or a named consequence:

> "Dashboards, incident history and the deploy pipeline before opinions.
> What breaks shows where to spend your money."

Two sentences. Sentence one names three artefacts. Sentence two names the reader's money.
No adjective in either.

**Commercially honest.** It names the pain it removes and prices itself against it:

> "Senior backend help without a six-month hiring cycle."

That's the whole value proposition in eight words. It doesn't describe Kapil. It describes
what the reader gets to skip.

**Ends the engagement on purpose.** The most trust-building line on the site is the one
that argues against repeat billing:

> "Runbooks, alerts and tests stay with you, so you don't need me on call
> after the engagement ends."

Keep this posture. Any copy implying dependency, retainers, or indispensability is off-brand
even when it would be true.

**Imperative, not aspirational, at the close.** The contact headline is:

> "Let's scope it."

Three words. A verb the reader recognises from their own sprint planning. Compare the
version this site is not writing: "Ready to transform your backend?"

**Section headings are counted nouns.** "Three habits". "Where I've shipped". "What they
said". "Things I built". "What I reach for". "When the laptop shuts". Short, literal,
occasionally dry. "Three habits" promises exactly three and delivers exactly three.

### 2.2 DO / DON'T

| DON'T | DO |
|---|---|
| "Leveraging cutting-edge Go microservices to deliver seamless, scalable backends." | "Go microservices with clean API boundaries and goroutine-based concurrency." |
| "Passionate about building robust, resilient systems." | "Every change is small enough to roll back in a minute." |
| "I dramatically improved incident response." | "Helped resolve 5 Sev-0 and 3 Sev-1 incidents and cut incident investigation time by 25%." |
| "Transform your engineering culture." | "Tell me what's slowing you down and I'll tell you what it takes to fix." |
| "Enterprise-grade observability solutions." | "Datadog · Prometheus · Grafana · SLOs · alerting" |
| "A game-changing pipeline that scales effortlessly." | "…reports queue depth and decision latency to Prometheus, so a growing backlog shows up before it becomes a problem." |
| "Let's build something amazing together." | "Let's scope it." |
| "Deep-dive discovery phase to unlock hidden value." | "Week one, I read your codebase, infrastructure and how you ship today." |

Pattern behind every row: replace the adjective with the artefact.

### 2.3 Banned constructions

These were deliberately removed from this site. They must not creep back in.

1. **Em dashes.** Not one on the page. Use a full stop, a colon, or a comma. If a sentence
   needs an em dash it needs to be two sentences.
2. **Trailing justification quips.** "…because reliability is just empathy at scale."
   "…because good code is just good communication." Delete the clause. The sentence was done.
3. **"X, no Y" headline constructions.** "Senior help, no long hire." "Fixed scope, no
   surprises." "Real results, no fluff." This shape reads as ad copy instantly. The site's
   equivalent line uses "without" inside a real sentence instead: "Senior backend help
   without a six-month hiring cycle."
4. **Tidy metaphor endings.** Do not close a section by comparing systems to gardens,
   orchestras, foundations, or houses. Close on the concrete thing.
5. **Banned words:** seamless, cutting-edge, passionate, leverage (as a verb), robust,
   world-class, synergy, unlock, empower, journey, elevate, best-in-class, holistic,
   game-changing, transformative, effortless, delightful, "solutions" (as a standalone noun).
6. **Exclamation marks.** Zero on the site. Keep it zero.
7. **First-person superlatives.** "I'm exceptional at…", "I'm the person who…". Let the
   numbers and the references carry that. The reference quotes are allowed to be warm
   because someone else wrote them.

### 2.4 The read-aloud rule

**Copy must survive being read aloud by a sceptical senior engineer.**

Practical test: imagine a staff engineer reading the line out to a colleague, deadpan.
If it would get an eye-roll, a snort, or "who wrote this", it fails. Rewrite it until it
sounds like something they'd say themselves in a design review.

Corollary: if you can't picture a specific artefact, number, or consequence behind a
sentence, the sentence is decoration. Cut it.

### 2.5 Mechanics

- Contractions: yes ("don't", "I'm", "it's"). Formal-register English reads as a template.
- British-leaning spellings are used consistently ("optimised", "prioritised", "catalogue").
  Keep them consistent within a page.
- "Montréal" always takes the accent.
- Interpunct `·` is the standard separator in mono/label text ("Go · Java · TypeScript").
- `→` closes action links. `↑` closes back-to-top. Nothing else.
- Numbers stay as digits with their real precision: `28M+`, `25%`, `5 Sev-0 and 3 Sev-1`.
  Never round up into vagueness ("tens of millions" is fine as prose variation, not as a stat).
- Second person for the offer ("your team", "you get"), first person for the work ("I read",
  "I join"). Never third-person self-reference on `index.html`. `resume.html` currently uses
  third person in "Beyond engineering" ("Writes, shoots and edits…"); that's résumé
  convention and is the one allowed exception.

---

## 3. Colour

### 3.1 The problem this section fixes

Today's variables are named for their hue, not their job: `--cy`, `--vi`, `--wa`. That means
nobody can change the accent without a global find-and-replace, and nobody can tell from a
name whether a colour is decorative or load-bearing. Worse, `--wa` (warm orange) appears in
exactly three declarations and reads as an accident.

Fix: three layers. Primitives hold hex. Semantics hold jobs. Components hold usage.
**Only the semantic layer may be referenced from component CSS.**

```
primitive          semantic              component
--c-cyan-400   →   --accent          →   --label-color, --link-hover
--c-violet-400 →   --accent-2        →   --card-no-color, --offer-accent
--c-amber-300  →   --accent-personal →   --hobby-icon-color, --hobby-link-color
```

### 3.2 Primitives (raw values, never referenced by components)

| Token | Value | Note |
|---|---|---|
| `--c-ink-950` | `#06070a` | page ground, dark |
| `--c-ink-900` | `#0b0d13` | raised ground, dark |
| `--c-ink-050` | `#eef1f7` | primary text, dark theme |
| `--c-slate-400` | `#8a93a8` | secondary text, dark theme |
| `--c-cyan-400` | `#5ee7ff` | |
| `--c-violet-400` | `#a78bfa` | |
| `--c-amber-300` | `#ffb96b` | |
| `--c-ink-contrast` | `#04121a` | text placed *on* cyan fills |
| `--c-paper-000` | `#ffffff` | résumé sheet, light |
| `--c-paper-050` | `#f7f8fa` | résumé page wash, light |
| `--c-ink-800` | `#12141a` | résumé text, light |
| `--c-slate-600` | `#565e70` | résumé secondary text, light |
| `--c-teal-700` | `#0b7285` | résumé accent, light |
| `--c-teal-800` | `#0b5566` | résumé accent, print |
| `--c-border-light` | `#e3e6ec` | résumé rule, light |
| `--c-border-dark` | `#22262f` | résumé rule, dark |
| `--c-white-a09` | `rgba(255,255,255,.09)` | site rule, dark |

### 3.3 Semantic layer — the names to use

These are the only colour names component CSS should reference.

| Token | Dark (site + résumé dark) | Light (résumé) | Job |
|---|---|---|---|
| `--surface` | `#06070a` | `#f7f8fa` | page ground |
| `--surface-raised` | `#0b0d13` | `#ffffff` | cards, sheets, sticky nav fill |
| `--text-primary` | `#eef1f7` | `#12141a` | headings, body emphasis, stat numbers |
| `--text-secondary` | `#8a93a8` | `#565e70` | body prose, captions, tag text |
| `--text-on-accent` | `#04121a` | `#04121a` | text sitting on an `--accent` fill |
| `--border` | `rgba(255,255,255,.09)` | `#e3e6ec` | every hairline rule and resting card edge |
| `--accent` | `#5ee7ff` | `#0b7285` | primary accent: section labels, links on hover, focus, active nav, card hover edge |
| `--accent-2` | `#a78bfa` | `#a78bfa` | secondary accent: enumeration, list bullets, gradient partner, engagement cards |
| `--accent-personal` | `#ffb96b` | `#ffb96b` | the human/off-hours register. See 3.4. |
| `--signal` | `#5ee7ff` | `#0b7285` | *live state only*: availability pulse, scroll progress, loading bar |

Notes:

- `--accent` and `--signal` currently resolve to the same value. Keep them separate names.
  `--accent` says "this is interactive". `--signal` says "this is a live status". They will
  diverge the first time an error or warning state is needed.
- `--accent-2` does not change between themes. Violet passes contrast on both grounds
  (7.4:1 on `#06070a`) and it is only ever used for small marks and gradients.
- The `--accent` split is what fixes the résumé divergence (section 3.5): same token name,
  different resolved value per theme.

### 3.4 `--accent-personal` — giving the orange a job

**Real usage today:** `--wa` appears three times in `style.css` — the tail of the scroll
progress gradient, `.hobby__ico` colour, `.hobby__link` colour — plus `rgba(255,185,107,…)`
in the `.hobby` card background and hover border. Every one of those is the **Offline**
section (`#offline`: YouTube, photography, writing, cooking).

So the colour already has a job. It just wasn't named. The job is:

> **`--accent-personal` marks the human register — the parts of the site that are Kapil the
> person rather than Kapil the contractor.**

Cyan is the work. Violet is the structure. Orange is the person. That's why it's warm, and
that's why there's exactly one section of it.

**Use it for:** the Offline/hobbies section (icons, links, card tint, hover border); any
future personal content — writing, talks, photos, cooking.

**Do not use it for:** anything in the commercial path — hero, offers, pricing, engagement
cards, contact CTA, résumé. Do not use it as a warning or error colour; it is a register,
not a severity. Do not introduce a fourth accent to solve a problem these three already
cover. If a section can't decide between cyan and orange, it belongs in the commercial path
and takes cyan.

The one deliberate exception is the scroll progress bar, which runs
`--accent → --accent-2 → --accent-personal` across the full page. That's a map of the
document, not a semantic claim. Leave it.

### 3.5 The résumé divergence (known defect)

`resume.html` ships its own `:root` in an inline `<style>` block with a different vocabulary:

```
--ink   (text)      vs. site --ink / semantic --text-primary
--soft  (secondary) vs. site --muted / semantic --text-secondary
--acc   (accent)    #0b7285 light, #5ee7ff dark, #0b5566 print
--line, --paper, --wash
--f-d / --f-b / --f-m   vs. site --f-display / --f-body / --f-mono
```

Three names for the same three fonts. Two names for the same two text roles. One accent that
is genuinely two different colours because the résumé supports a light theme and print, and
`#5ee7ff` is unreadable on white.

**What is a real requirement, not a defect:** the résumé needs a light theme, a dark theme,
and a print theme. `#0b7285` on white is 5.59:1; `#5ee7ff` on white is roughly 1.3:1 and
unusable. Two accent values is correct.

**What is the defect:** the divergence is expressed as *different token names* instead of
*different values for the same token names*.

**Resolution.** Adopt the semantic names above in both documents. The résumé keeps its
per-theme overrides but under shared names:

```css
:root{ --accent:#0b7285; --text-primary:#12141a; --text-secondary:#565e70;
       --surface:#f7f8fa; --surface-raised:#fff; --border:#e3e6ec; }
@media (prefers-color-scheme:dark){
  :root{ --accent:#5ee7ff; --text-primary:#eef1f7; --text-secondary:#9aa3b6;
         --surface:#10131a; --surface-raised:#0a0c11; --border:#22262f; }
}
@media print{ :root{ --accent:#0b5566; --text-primary:#000; --text-secondary:#333;
         --surface:#fff; --surface-raised:#fff; --border:#bbb; } }
```

Do this as one mechanical rename. Do not "improve" the résumé's visual design while renaming.
Note the résumé's dark `--soft` is `#9aa3b6`, not the site's `#8a93a8` — keep the résumé
value; it is tuned for the lighter `--surface-raised` and is documented in the tokens file.

Until that rename lands, treat `resume.html` as the exception it is and don't propagate its
short names anywhere new.

### 3.6 Component layer

Component tokens exist so a widget can be retinted without touching semantics. Full list with
values in `assets/design-tokens.json`. The ones in use:

`--card-bg`, `--card-border`, `--card-border-hover`, `--card-glow`, `--label-color`,
`--tag-border`, `--tag-border-hover`, `--offer-bg`, `--offer-border-hover`, `--hobby-bg`,
`--hobby-border-hover`, `--hobby-icon-color`, `--hobby-link-color`, `--nav-scrim`,
`--menu-scrim`, `--focus-ring`.

Rule: a component token resolves to a semantic token or a semantic token at an alpha. It never
holds a new hue.

---

## 4. Typography

### 4.1 Families and their jobs

| Family | Token | Weights loaded | Job |
|---|---|---|---|
| Space Grotesk | `--f-display` | 400 / 500 / 700 | Names and headlines. Hero title, section titles, card and job titles, stat numbers, the big contact line, the marquee, quote marks, logo. Anything a reader scans rather than reads. |
| Inter | `--f-body` | 400 / 500 / 600 | Prose. Paragraphs, list items, blurbs, descriptions. Everything read in sentences. |
| JetBrains Mono | `--f-mono` | 400 / 500 | Labels and technical metadata. Section numbers ("01 · Experience"), eyebrows, dates, tags, stat captions, skill bar labels, footer, contact list keys, résumé section headings. |

The mono is the tell. It is what makes the site read as written by an engineer rather than
designed for one. It is never used for a full sentence — only for labels, and always with
letter-spacing (`.05em`–`.28em`) and usually uppercase.

Never introduce a fourth family. Never use display for a paragraph. Never use mono for prose.

### 4.2 Scale

Everything fluid clamps against the viewport. Values as shipped:

| Role | Size |
|---|---|
| Body base | `clamp(15px, .55vw + 13px, 17px)`, line-height `1.65` |
| Hero title | `clamp(3.1rem, 13.5vw, 10.5rem)`, weight 700, tracking `-.045em`, leading `.88` |
| Contact headline | `clamp(2.4rem, 10vw, 6.5rem)`, weight 700, tracking `-.04em` |
| Section title | `clamp(2rem, 6vw, 4rem)`, weight 500, tracking `-.02em`, leading `1.05` |
| Menu link | `clamp(2rem, 9vw, 3.4rem)`, weight 500 |
| About lead | `clamp(1.5rem, 4.2vw, 2.9rem)`, tracking `-.025em`, max `22ch` |
| Stat number | `clamp(1.9rem, 5vw, 2.8rem)`, weight 500 |
| Card / hobby / offer title | `1.28`–`1.32rem`, weight 500 |
| Prose | `.93`–`1.05rem` |
| Tag, caption, mono label | `.66`–`.74rem` |

Two rules that hold the whole scale together:

1. **Tracking tightens as size grows.** Display type above ~2rem is always negative-tracked.
   Mono labels below 1rem are always positive-tracked. Body is untracked.
2. **Measure is capped.** Prose blocks carry a `ch` max-width: `56ch` hero blurb, `62ch`
   about body, `66ch` process lead, `70ch` job bullets, `72ch` résumé summary, `52ch` contact
   sub, `22ch` about lead. Never ship an uncapped paragraph.

Weight vocabulary: 400 body, 500 for headings and emphasis, 600 résumé bold, 700 reserved for
the hero title, the contact headline, and the logo. A 500-weight heading next to 400 prose is
the site's default contrast. Do not reach for 700 to add emphasis.

---

## 5. Space and shape

### 5.1 Rhythm

- Page gutter: `--pad: clamp(1.25rem, 5vw, 4.5rem)`. Everything horizontal uses it.
- Content max width: `--max: 1240px`, centred.
- Section vertical: `clamp(5rem, 12vw, 9rem)`. This is the site's single biggest interval and
  is what makes it feel unhurried. Don't shrink it to fit more in.
- Grid gaps: `1.1rem` for card grids, `1.5rem`–`2rem` for two-column layouts,
  `clamp(2.5rem, 5vw, 4rem)` between timeline entries.
- Inside a card: `1.6rem 1.5rem 1.5rem` (top-heavier than bottom, deliberately).
- Stack spacing inside prose: `1.15rem` between paragraphs, `.5rem` between list items.

Breakpoints in use: `820px` (drop cursor and hero side-rail), `900px` (burger menu; timeline
stacks), `960px` (about goes two-column; job rows go label + content), `1000px` (wide card
spans two columns). Don't add new ones without deleting one.

### 5.2 Radius

Three values. That's the whole system.

| Radius | Where | Why |
|---|---|---|
| `18px` | Cards: `.card`, `.hobby`, `.offer`, `.quote` | The default container shape. |
| `24px` | `.portrait__frame` (inner image `23px`, because of the 1px gradient border) | One step softer, used once, for the one human photograph. |
| `999px` | Pills: nav logo, nav CTA, `.btn`, `.tags span`, `.offer__len` | Anything clickable-and-small or label-like. |

Also in play: `50%` for dots and avatars, `12px` for the small `.hobby__ico` square, `14px`
for the résumé sheet. Don't add a fifth card radius. If a new container isn't 18px, ask why
it isn't a card.

### 5.3 Depth

Borders do the work, not shadows. A resting surface is a 1px `--border` hairline over a very
low-alpha gradient plus `backdrop-filter: blur(10px)`. Shadow appears only on hover, and it
is a coloured glow rather than a drop shadow:
`0 24px 60px -30px rgba(94,231,255,.4)`. Never add a neutral grey box-shadow.

---

## 6. Motion

Principles, in priority order.

1. **Reduced motion is respected and must stay that way.** `style.css` ends with a
   `prefers-reduced-motion: reduce` block that kills animation and transition duration,
   forces revealed content visible (`opacity:1 !important; transform:none !important`), and
   dims the WebGL canvas to `.5`. `resume.html` has its own equivalent for `.fade`.
   Every new animated element must be covered by that block or add its own. This is not
   optional and is not a nice-to-have.
2. **Content is visible without JavaScript.** Reveal opacity is scoped to `.js [data-reveal]`,
   and the `js` class is set by an inline script. Never move the initial `opacity:0` out of
   that scope.
3. **One easing curve.** `--ease: cubic-bezier(.22,1,.36,1)`. Fast out, long settle.
   Use it for anything with distance. Plain `ease` is acceptable only for opacity fades.
4. **Duration bands.**
   - `.3s` — colour and border on small interactive elements.
   - `.35s`–`.45s` — hover transforms, card edges, backdrop changes, nav state.
   - `.7s` — clip-path menu open, loader dismiss, résumé fade-in.
   - `1.2s` — WebGL canvas opacity.
   - Ambient loops: `2s` scroll hint, `2.4s` availability pulse, `8s` grain, `38s` marquee.
   Nothing between `.3s` and `1.2s` that the user is waiting on.
5. **Motion reports state, it doesn't perform.** The pulse means available. The progress bar
   means position. The bars mean proficiency. If an animation doesn't answer a question the
   reader has, cut it.
6. **Hover moves ≤ 2px.** `.btn:hover` is `translateY(-2px)`. Keep that ceiling.
7. **Ambient effects stay under the copy.** Grain at `.035` opacity, WebGL behind a
   `linear-gradient` scrim so the hero text keeps its contrast. Any new background effect
   needs the same treatment.

---

## 7. Accessibility floor

Non-negotiable. These are the minimums, not the targets.

- **Contrast.** Body text ≥ 4.5:1. Large text (≥24px, or ≥19px bold) and non-text indicators
  ≥ 3:1. Measured on the shipped palette:

  | Pair | Ratio |
  |---|---|
  | `--text-primary` on `--surface` (dark) | 17.8:1 |
  | `--text-secondary` on `--surface` (dark) | 6.54:1 |
  | `--accent` cyan on `--surface` (dark) | 13.8:1 |
  | `--accent-2` violet on `--surface` (dark) | 7.4:1 |
  | `--accent-personal` on `--surface` (dark) | 11.9:1 |
  | `--text-on-accent` on cyan fill | 13.0:1 |
  | Résumé light: text on paper / soft on paper / accent on paper | 18.4 / 6.5 / 5.6:1 |
  | Résumé print accent `#0b5566` on white | 8.4:1 |

  All pass. Any new colour must be measured before it ships, and `--text-secondary` is the
  floor — do not introduce a dimmer grey.

- **Visible focus is required.** This is the current gap: `style.css` defines hover states
  everywhere and no `:focus-visible` anywhere, and `a{color:inherit}` plus a custom cursor
  make keyboard position hard to see. Every interactive element needs a focus ring using
  `--focus-ring` (a 2px `--accent` outline at 2px offset). Never `outline:none` without an
  equal-or-better replacement. Fix this before adding any new interactive component.

- **Decoration is hidden.** Cursor, progress bar, grain, WebGL canvas, marquee, scroll hint
  and hero side-rail all carry `aria-hidden="true"`. Keep that discipline; anything purely
  visual gets hidden from the accessibility tree.

- **Semantics.** Real landmarks (`header`/`nav`/`main`/`footer`), one `h1` per page, ordered
  lists for the timeline and the process steps, `figure`/`figcaption` for quotes and portrait,
  `aria-expanded` on the burger, `aria-live="polite"` on the rotating role text. Keep it.

- **Images.** Every content image has real alt text and explicit `width`/`height`.
  Decorative images get `alt=""`.

- **Touch targets** ≥ 44×44px effective. The custom cursor is already suppressed under
  `(hover:none)` and `820px`.

- **Print.** The résumé must remain printable: forced light values, borders off, page breaks
  avoided inside entries, `@page{margin:14mm}`. Don't break the print block.

---

## 8. Applying this to new work

Checklist before shipping anything:

1. Read the copy aloud, deadpan. Would a sceptical senior engineer keep a straight face?
2. Does every claim carry a number, an artefact, or a named consequence?
3. Zero em dashes, zero banned words, zero exclamation marks?
4. Does the CSS reference only semantic and component tokens — no raw hex, no `--cy`/`--vi`/`--wa`?
5. Is orange confined to the personal register?
6. 18px if it's a card, 999px if it's a pill?
7. Does it have a visible focus state and does it stop moving under `prefers-reduced-motion`?
8. Is the prose measure capped in `ch`?
