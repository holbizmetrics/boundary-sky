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
- Starfield is random points (`decorative`) — **except one**: as of rung 6,
  Proxima Centauri sits among them in its true direction, a `measured` star.

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
6. **The first parallax** (2026-07-23) — the sky leaves the solar system.
   Two comets (Halley, Hale-Bopp) and seven moons (the Moon, the four
   Galileans, Titan, Triton) arrived first; Hale-Bopp's near-parabolic orbit
   (e=0.995) forced a safeguarded Kepler solver, logged finding → resolution →
   arrival. Then the first star: **Proxima Centauri**, drawn in its true sky
   direction (RA/Dec → ecliptic) but **not to scale** — its real distance,
   4.02×10¹³ km, is 8,898× Neptune's orbit and 67× beyond the far clip plane,
   so the position is an honest `derived-simplification` while the *distance*
   is `measured` by parallax. That distance is **rung 1 of the cosmic distance
   ladder** (the Moon's laser ranging is rung 0): two purely-geometric rungs,
   now visible as a structure in one sky. The scale chasm is the datum.
7. **The scale chasm, laddered** (2026-07-24) — rung 6 left a named-open
   residual: Proxima's true distance overflows the scene, so it could only be
   shown by direction, not position. This rung crosses that gap *in-app*. A
   **distance-ladder view** toggle (off by default — the true-scale sky stays
   the honest one) remaps radial distance onto a base-10 **log axis**: 600
   scene units per decade of km. Direction is preserved exactly; only the
   radius is log-distorted (so orbit shapes are hidden — a log radius is not an
   ellipse). Now the Moon (~1901 units), the planets, Planet Nine (~3391) and
   **Proxima (~5162)** sit in one readable frame, the ~4-decade Neptune→Proxima
   chasm rendered as *structure* instead of an off-screen absence. Moons
   collapse onto their planets (the view is heliocentric — a moon's orbit is
   sub-pixel on this scale), named as a residual, not a bug. A load-time
   self-check asserts the map stays monotonic and every body lands inside the
   far plane; verified headless over all 22 bodies (visual check awaits an
   operator's eyeball — no browser on the build host).
8. **The ladder's second rung** (2026-07-24) — a second star, chosen to
   *climb* the ladder rather than repeat rung 1: **δ Cephei**, the prototype
   Cepheid variable and the most important single star in the history of
   measuring the universe. Its period–luminosity law (Leavitt, 1908–12) is
   **rung 2** of the cosmic distance ladder — the first rung that reaches
   *beyond* parallax range, out to other galaxies (Hubble used it on
   Andromeda). The honest subtlety, spelled out in its provenance: δ Cephei's
   *own* distance here is still rung 1 — HST parallax (3.66 mas → 890 ly),
   not the P–L law, because you *calibrate* the law with the parallax, you
   don't measure this star from it (that would be circular). So this one star
   is exactly where rung 2 bolts onto rung 1. At 8.4×10¹⁵ km it is 210×
   Proxima's distance — invisible before rung 7, but on the log ladder it
   sits at ~6555 units, just outside Proxima (~5162): the ladder visibly
   reaching further with each rung, rungs 0-1-2 now in one sky. Ladder
   self-check re-run over all 23 bodies, PASS.
   **The star now breathes:** its marker pulses on the measured 5.366-day
   period between magnitude 3.48 and 4.37, with the characteristic Cepheid
   fast-rise / slow-decline light curve (the asymmetry is itself a measured
   signature; the exact profile is a labeled `derived-simplification`). The
   pulsation *is* the standard candle — Leavitt's law reads this very period
   to fix the luminosity — so watching it pulse is watching rung 2 work. A
   live magnitude readout in the HUD shows the current value; a load-time
   self-check confirms the curve hits the measured extremes exactly.
