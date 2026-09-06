// ── three.js background: a point cloud that morphs sphere → knot → cube → galaxy
//    as you scroll, with mouse parallax. Everything else on the page sits on top.
import * as THREE from 'three';

const canvas = document.getElementById('gl');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const COUNT = window.innerWidth < 700 ? 7000 : 16000;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
camera.position.z = 5.2;

// ── shapes ───────────────────────────────────────────────
const R = 1.85;
const rnd = (n) => (Math.random() - 0.5) * n;

function sphere(i, n) {                       // fibonacci sphere
  const y = 1 - (i / (n - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const t = i * Math.PI * (3 - Math.sqrt(5));
  return [Math.cos(t) * r * R, y * R, Math.sin(t) * r * R];
}
function knot(i, n) {                          // (2,3) torus knot, thickened
  const u = (i / n) * Math.PI * 2 * 3;
  const p = 2, q = 3, s = 0.62;
  const cu = Math.cos(u), su = Math.sin(u);
  const r = 0.9 + 0.35 * Math.cos(q * u / p);
  return [
    r * cu * s * R + rnd(0.22),
    r * su * s * R + rnd(0.22),
    0.4 * Math.sin(q * u / p) * R + rnd(0.22),
  ];
}
function cube() {                              // hollow cube shell
  const a = R * 0.98, f = (Math.random() * 6) | 0;
  const u = rnd(2 * a), v = rnd(2 * a);
  return [[a,u,v],[-a,u,v],[u,a,v],[u,-a,v],[u,v,a],[u,v,-a]][f];
}
function galaxy(i, n) {                        // 3-arm spiral disc
  const r = Math.pow(i / n, 0.62) * R * 1.55;
  const branch = ((i % 3) / 3) * Math.PI * 2;
  const spin = r * 1.9;
  const j = Math.pow(Math.random(), 3) * (Math.random() < .5 ? 1 : -1) * 0.34;
  return [
    Math.cos(branch + spin) * r + j,
    j * 0.55,
    Math.sin(branch + spin) * r + j,
  ];
}

const A = new Float32Array(COUNT * 3), B = new Float32Array(COUNT * 3);
const C = new Float32Array(COUNT * 3), D = new Float32Array(COUNT * 3);
const seed = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  A.set(sphere(i, COUNT), i * 3);
  B.set(knot(i, COUNT), i * 3);
  C.set(cube(), i * 3);
  D.set(galaxy(i, COUNT), i * 3);
  seed[i] = Math.random();
}

const geo = new THREE.BufferGeometry();
geo.setAttribute('position', new THREE.BufferAttribute(A.slice(), 3)); // required by three
geo.setAttribute('pA', new THREE.BufferAttribute(A, 3));
geo.setAttribute('pB', new THREE.BufferAttribute(B, 3));
geo.setAttribute('pC', new THREE.BufferAttribute(C, 3));
geo.setAttribute('pD', new THREE.BufferAttribute(D, 3));
geo.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 6); // skip auto-compute

const uniforms = {
  uTime:  { value: 0 },
  uMorph: { value: 0 },      // 0..3, driven by scroll
  uFade:  { value: 1 },      // pulls the cloud back once you're reading copy
  uSize:  { value: 52 },
  uPx:    { value: renderer.getPixelRatio() },
  uMouse: { value: new THREE.Vector2() },
  uCy:    { value: new THREE.Color('#5ee7ff') },
  uVi:    { value: new THREE.Color('#a78bfa') },
  uWa:    { value: new THREE.Color('#ffb96b') },
};

const material = new THREE.ShaderMaterial({
  uniforms,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexShader: /* glsl */`
    attribute vec3 pA; attribute vec3 pB; attribute vec3 pC; attribute vec3 pD;
    attribute float seed;
    uniform float uTime, uMorph, uSize, uPx;
    uniform vec2 uMouse;
    varying float vSeed; varying float vDepth;

    void main(){
      vec3 p = mix(pA, pB, smoothstep(0.0, 1.0, clamp(uMorph,       0.0, 1.0)));
      p      = mix(p,  pC, smoothstep(0.0, 1.0, clamp(uMorph - 1.0, 0.0, 1.0)));
      p      = mix(p,  pD, smoothstep(0.0, 1.0, clamp(uMorph - 2.0, 0.0, 1.0)));

      // gentle organic drift so it never looks frozen
      float t = uTime * 0.35 + seed * 30.0;
      p += 0.055 * vec3(sin(t + p.y * 2.4), cos(t * 1.1 + p.z * 2.1), sin(t * 0.9 + p.x * 2.7));

      // cursor pushes the cloud around
      vec2 d = p.xy - uMouse * 2.4;
      p.xy += normalize(d + 0.0001) * 0.28 / (1.0 + dot(d, d) * 2.2);

      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      vDepth = clamp((-mv.z - 2.5) / 5.0, 0.0, 1.0);
      vSeed  = seed;
      gl_PointSize = uSize * uPx * (0.35 + seed * 0.9) / -mv.z;
      gl_Position  = projectionMatrix * mv;
    }`,
  fragmentShader: /* glsl */`
    uniform vec3 uCy, uVi, uWa;
    uniform float uMorph, uFade;
    varying float vSeed; varying float vDepth;

    void main(){
      float d = length(gl_PointCoord - 0.5);
      if (d > 0.5) discard;
      float a = smoothstep(0.5, 0.05, d);
      vec3 c = mix(uCy, uVi, vSeed);
      c = mix(c, uWa, smoothstep(2.1, 3.0, uMorph) * vSeed);
      gl_FragColor = vec4(c, a * (0.10 + 0.34 * (1.0 - vDepth)) * uFade);
    }`,
});

const points = new THREE.Points(geo, material);
// keep the cloud out of the reading column on wide screens
const offset = () => (innerWidth > 900 ? 1.5 : 0);
points.position.x = offset();
scene.add(points);

// ── interaction ──────────────────────────────────────────
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
addEventListener('pointermove', (e) => {
  mouse.tx = (e.clientX / innerWidth) * 2 - 1;
  mouse.ty = -((e.clientY / innerHeight) * 2 - 1);
}, { passive: true });

let scrollP = 0;
const maxScroll = () => Math.max(1, document.body.scrollHeight - innerHeight);

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  uniforms.uPx.value = renderer.getPixelRatio();
  points.position.x = offset();
});

// pause when the tab is hidden; no point burning a GPU nobody is looking at
let visible = true;
document.addEventListener('visibilitychange', () => { visible = !document.hidden; });

const clock = new THREE.Clock();
function tick() {
  requestAnimationFrame(tick);
  if (!visible) return;

  const t = clock.getElapsedTime();
  uniforms.uTime.value = t;

  scrollP += ((scrollY / maxScroll()) - scrollP) * 0.07;
  uniforms.uMorph.value = scrollP * 3;
  // full strength on the hero, then back off so text stays readable. The cloud
  // sits on the right, which is exactly where the body columns are, so it has to
  // reach its floor by the time the first section of copy arrives.
  uniforms.uFade.value = 1 - 0.74 * Math.min(1, scrollP * 12);

  mouse.x += (mouse.tx - mouse.x) * 0.045;
  mouse.y += (mouse.ty - mouse.y) * 0.045;
  uniforms.uMouse.value.set(mouse.x, mouse.y);

  points.rotation.y = t * 0.05 + mouse.x * 0.35 + scrollP * 1.6;
  points.rotation.x = mouse.y * -0.28 + scrollP * 0.9;
  camera.position.z = 5.2 - scrollP * 1.1;
  camera.position.x = mouse.x * 0.35;
  camera.position.y = mouse.y * 0.25;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

if (reduced) {
  uniforms.uMorph.value = 0.4;
  uniforms.uFade.value = 0.55;
  renderer.render(scene, camera);
} else {
  tick();
}

canvas.classList.add('on');
window.dispatchEvent(new Event('scene:ready'));
