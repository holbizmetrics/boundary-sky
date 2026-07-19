# boundary-sky

> A solar-system simulation that **renders the boundary of knowledge and labels it.**
> NASA's Eyes shows the confirmed. This shows confirmed, derived, and conjectured —
> each object and each behavior carrying its provenance, like a falsifier register
> for the sky. Consistency over quantity (the Frontier: Elite II lesson: a small,
> trustworthy sky beats a big vague one).

Born 2026-07-19, Holger + Eve, on a phone. A play-and-learn project — built to be
read, poked, and corrected.

## The three tiers

Every rendered thing declares one of:

| Tier | Meaning |
|---|---|
| `measured` | Observed/published data (ephemerides, fact sheets). Source cited. |
| `derived` | Follows from current physics/math applied to measured data. Nobody voted; the equations did. |
| `conjectured` | Consistent with everything known, unconfirmed. **Ships with its falsifier**: the observation that would kill it. |

Plus one honesty tier for the renderer itself:

| Tier | Meaning |
|---|---|
| `derived-simplification` | A knowing approximation in the *rendering* (e.g. v0's circular Moon orbit). Labeled, with the correction path named. |
| `decorative` | Not data at all (e.g. the random starfield). Labeled so nobody mistakes scenery for sky. |

## The correction rule (the PCLA move)

**A correction is the system working, not failing.** Labels are never erased —
they are appended. Demotions, promotions, and falsifications go to
`provenance-log.jsonl` (append-only, one JSON record per line). The record of
being wrong is the credibility.

## Run it

```
python -m http.server 8138
# open http://localhost:8138/
```

One codebase, four targets: Three.js on WebGL2 — Android phone, Android tablet,
Linux, Windows. No installs. (WebGPU deliberately avoided: not yet everywhere.)

## What v0 is

Earth and Moon. **True scale by default** — the Moon is far, and everyone's
mental image is wrong by about a factor of ten; this is the uncomfortable magic.
A labeled toggle offers `radii ×20` visibility mode — the toggle itself is the
first boundary label: even the rendering's lies are declared.

Known residuals, named on purpose (see `data/bodies.json` →
`render_approximations`):
- ~~Moon orbit drawn circular~~ **retired 2026-07-19 (rung 2)** — now a full
  Keplerian ellipse (e=0.0549, i=5.145°, Ω, ω), with a page-load self-check
  (perigee/apogee vs `a(1∓e)` to <1 km, Kepler residual <1e-9 rad) shown in the
  HUD. New residual: elements held *fixed* — no precession, no solar
  perturbations (up to ~5,000 km vs real ephemeris). See `provenance-log.jsonl`.
- ~~Sunlight is a fixed directional light~~ **retired 2026-07-19 (rung 3)** —
  the Sun is now a real body at the origin (IAU nominal radius), Earth orbits
  it on J2000 mean elements, and light is a point source *at* the Sun: the
  terminator and lunar phases follow from geometry. New residuals: Earth's
  elements held fixed (the ~3,000 km gap vs the fact sheet's
  perihelion/aphelion is the mean-element residual, already visible and
  named); the epoch is arbitrary (`_epoch` label: sim day 0 = perihelion +
  perigee at once).
- Starfield is random points (`decorative`).

## Roadmap rungs (base case before galaxy)

1. **Earth–Moon** (v0) — true scale, circular orbit, labels on.
2. **Keplerian orbit** — eccentricity + inclination rendered, first
   residual retired by append. Cross-verified by an independent PCLA session
   over the securedchat bus.
3. **The Sun, for real** (here) — light *from* it, Earth orbiting it. Camera
   rides with Earth; a toggle steps back to see the whole year.
4. **Planets, one at a time** (here) — all eight arrived 2026-07-19, each in
   its own commit with its own verified `arrival` record in the provenance
   log. The renderer is fully data-driven: a body is its `bodies.json` entry
   (radius, elements, parent, provenance) — no per-planet code. The log also
   carries two `correction` records against *itself* (entries 6, 14): twice
   the author quoted evidence numbers that differed from the run's printed
   output. Paste, don't paraphrase.
5. **The first `conjectured` object** (here, 2026-07-19) — Planet Nine
   (Batygin & Brown 2021 posterior peak), ghosted and dash-orbited so
   conjecture can never be mistaken for measurement, its **falsifier shipped
   in the data**: LSST non-detection + clustering-as-selection-bias kills it
   (demotion-by-append); detection promotes it to `measured`. Either outcome
   is the system working. All five rungs climbed in one day, on a phone and a
   tablet, with a PCLA session verifying over the bus.
