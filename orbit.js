// orbit.js -- the Kepler machinery shared by index.html and moon.html.
// One copy on purpose: the Moon experiment measures THIS code against JPL, so the page
// that draws the sky and the page that tests it must run the same functions.
// Fixed mean elements, two-body only: no precession, no perturbations (by design; the
// labels say so). orbitAt's optional el.M0 (radians) sets the mean anomaly at simDays 0;
// index.html leaves it unset, so every body starts at periapsis there.
export const DEG = Math.PI / 180;

export function makeOrbit(o) {
  return {
    a: o.semi_major_axis_km, e: o.eccentricity,
    i: o.inclination_deg * DEG, Om: o.ascending_node_deg * DEG,
    w: o.arg_periapsis_deg * DEG, T: o.sidereal_period_days,
    parent: o.parent
  };
}
export function solveKepler(M, e) {
  // Safeguarded Newton: the root of E - e*sinE = M lies within e of M
  // (since E = M + e*sinE), so [M-e, M+e] is a guaranteed bracket. Plain
  // undamped Newton from E=M diverges as e->1 (the derivative 1-e*cosE
  // collapses near perihelion); bisection fallback keeps every step inside
  // the bracket so near-parabolic orbits (Hale-Bopp, e=0.995) converge.
  let lo = M - e, hi = M + e;
  let E = M + e * Math.sin(M);
  for (let k = 0; k < 100; k++) {
    const f = E - e * Math.sin(E) - M;
    if (f > 0) hi = E; else lo = E;
    const fp = 1 - e * Math.cos(E);
    let En = E - f / fp;
    if (!(En > lo && En < hi)) En = 0.5 * (lo + hi);
    if (Math.abs(En - E) < 1e-14) return En;
    E = En;
  }
  return E;
}
export function keplerPos(el, E) {
  const { a, e, i, Om, w } = el;
  const r = a * (1 - e * Math.cos(E));
  const nu = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2),
                            Math.sqrt(1 - e) * Math.cos(E / 2));
  const wv = w + nu;
  const X = r * (Math.cos(Om) * Math.cos(wv) - Math.sin(Om) * Math.sin(wv) * Math.cos(i));
  const Y = r * (Math.sin(Om) * Math.cos(wv) + Math.cos(Om) * Math.sin(wv) * Math.cos(i));
  const Z = r * Math.sin(wv) * Math.sin(i);
  return { x: X, y: Z, z: Y, r }; // ecliptic → scene: x-z is the ecliptic, y is north
}
export function orbitAt(el, simDays) {
  const M = ((simDays / el.T) % 1) * Math.PI * 2 + (el.M0 || 0);
  return keplerPos(el, solveKepler(M, el.e));
}
