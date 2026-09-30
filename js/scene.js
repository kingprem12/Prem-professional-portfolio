import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

// Ashima 3D simplex noise, used to deform the core.
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

function labelTexture(text) {
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  const font = "600 44px 'JetBrains Mono', monospace";
  ctx.font = font;
  const w = Math.ceil(ctx.measureText(text).width) + 56;
  c.width = w; c.height = 84;
  ctx.font = font;
  ctx.fillStyle = "rgba(10,14,32,0.78)";
  ctx.strokeStyle = "rgba(120,200,255,0.55)";
  ctx.lineWidth = 3;
  const r = 20;
  ctx.beginPath(); ctx.roundRect(2, 2, w - 4, 80, r); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "#b9e6ff";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 28, 44);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return { tex, aspect: w / 84 };
}

export function initScene(canvas, { orbitTech = [] } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  } catch {
    canvas.remove();
    return null;
  }

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSmall = () => innerWidth < 820;
  const lowPower = isSmall() || (navigator.hardwareConcurrency || 8) <= 4;

  renderer.setPixelRatio(Math.min(devicePixelRatio, lowPower ? 1.5 : 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0x05060d, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05060d, 0.02);
  const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 200);
  camera.position.set(0, 0, 9);

  // ---------- starfield ----------
  const STAR_COUNT = lowPower ? 1400 : 3200;
  const starGeo = new THREE.BufferGeometry();
  const pos = new Float32Array(STAR_COUNT * 3);
  const col = new Float32Array(STAR_COUNT * 3);
  const seed = new Float32Array(STAR_COUNT);
  const palette = [new THREE.Color("#38e1ff"), new THREE.Color("#8b5cf6"), new THREE.Color("#f472b6"), new THREE.Color("#ffffff")];
  for (let i = 0; i < STAR_COUNT; i++) {
    const r = 12 + Math.random() * 60;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
    pos[i * 3 + 2] = r * Math.cos(ph) - 10;
    const c = palette[Math.random() < 0.55 ? 3 : (Math.random() * 3) | 0];
    col.set([c.r, c.g, c.b], i * 3);
    seed[i] = Math.random();
  }
  starGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  starGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  starGeo.setAttribute("seed", new THREE.BufferAttribute(seed, 1));
  const starMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true,
    uniforms: { uTime: { value: 0 }, uPR: { value: renderer.getPixelRatio() } },
    vertexShader: /* glsl */ `
      attribute float seed; varying vec3 vColor; varying float vTw; uniform float uTime; uniform float uPR;
      void main(){
        vColor = color;
        vTw = 0.55 + 0.45 * sin(uTime * (0.6 + seed * 2.0) + seed * 40.0);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = (1.2 + seed * 2.6) * uPR * (40.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vColor; varying float vTw;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vColor, a * vTw * 0.9);
      }`,
  });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  // ---------- core ----------
  const core = new THREE.Group();
  scene.add(core);

  const blobMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uAmp: { value: 0.32 }, uHover: { value: 0 } },
    vertexShader: /* glsl */ `
      ${NOISE}
      uniform float uTime; uniform float uAmp; uniform float uHover;
      varying vec3 vN; varying vec3 vView; varying float vD;
      void main(){
        float n = snoise(normal * 1.4 + uTime * 0.35);
        float n2 = snoise(normal * 3.2 - uTime * 0.25) * 0.35;
        float d = (n + n2) * (uAmp + uHover * 0.18);
        vD = d;
        vec3 p = position + normal * d;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vN = normalize(normalMatrix * normal);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vN; varying vec3 vView; varying float vD;
      uniform float uTime;
      void main(){
        float fres = pow(1.0 - max(dot(vN, vView), 0.0), 2.4);
        vec3 cyan = vec3(0.22, 0.88, 1.0);
        vec3 violet = vec3(0.55, 0.36, 0.96);
        vec3 pink = vec3(0.96, 0.45, 0.71);
        float t = clamp(vD * 1.6 + 0.5, 0.0, 1.0);
        vec3 base = mix(violet, cyan, t);
        base = mix(base, pink, smoothstep(0.65, 1.0, t) * 0.5);
        vec3 col = base * 0.08 + base * fres * 0.95;
        col += vec3(0.02, 0.03, 0.08);
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(1.25, lowPower ? 40 : 80), blobMat);
  core.add(blob);

  const wire = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.95, 1)),
    new THREE.LineBasicMaterial({ color: 0x6fd8ff, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending })
  );
  core.add(wire);

  const nodes = new THREE.Points(
    new THREE.IcosahedronGeometry(1.95, 1),
    new THREE.PointsMaterial({ color: 0xbff3ff, size: 0.07, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  core.add(nodes);

  const ringMat = (c, o) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false });
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.75, 0.008, 8, 200), ringMat(0x38e1ff, 0.55));
  ring1.rotation.set(1.2, 0.2, 0);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.25, 0.006, 8, 200), ringMat(0x8b5cf6, 0.45));
  ring2.rotation.set(1.75, -0.5, 0.3);
  core.add(ring1, ring2);

  // orbiting tech labels
  const labels = [];
  orbitTech.forEach((t, i) => {
    const { tex, aspect } = labelTexture(t);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false });
    const s = new THREE.Sprite(mat);
    const h = 0.28;
    s.scale.set(h * aspect, h, 1);
    const ring = i % 2 === 0 ? ring1 : ring2;
    labels.push({
      sprite: s,
      radius: ring === ring1 ? 2.75 : 3.25,
      tilt: ring.rotation.clone(),
      phase: (Math.floor(i / 2) / Math.ceil(orbitTech.length / 2)) * Math.PI * 2 + (i % 2) * 0.5,
      speed: (ring === ring1 ? 0.16 : -0.11),
    });
    core.add(s);
  });

  // ---------- floating debris for depth while scrolling ----------
  const debris = new THREE.Group();
  scene.add(debris);
  const shapes = [
    new THREE.OctahedronGeometry(0.22),
    new THREE.TetrahedronGeometry(0.24),
    new THREE.TorusGeometry(0.16, 0.05, 8, 24),
    new THREE.BoxGeometry(0.26, 0.26, 0.26),
  ];
  const debrisCount = lowPower ? 14 : 30;
  for (let i = 0; i < debrisCount; i++) {
    const m = new THREE.Mesh(
      shapes[i % shapes.length],
      new THREE.MeshBasicMaterial({ color: [0x38e1ff, 0x8b5cf6, 0xf472b6][i % 3], wireframe: true, transparent: true, opacity: 0.5 })
    );
    m.position.set((Math.random() - 0.5) * 18, -Math.random() * 40 + 4, -Math.random() * 10 - 2);
    m.userData = { rx: Math.random() * 0.01, ry: Math.random() * 0.01, fy: Math.random() * Math.PI * 2 };
    debris.add(m);
  }

  // ---------- postprocessing ----------
  let composer = null;
  if (!lowPower) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.55, 0.45, 0.28));
    composer.addPass(new OutputPass());
  }

  // ---------- interaction ----------
  const mouse = new THREE.Vector2(0, 0);
  const target = new THREE.Vector2(0, 0);
  let scrollP = 0;
  let hover = 0;

  addEventListener("pointermove", (e) => {
    target.x = (e.clientX / innerWidth) * 2 - 1;
    target.y = -(e.clientY / innerHeight) * 2 + 1;
  }, { passive: true });

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    scrollP = max > 0 ? scrollY / max : 0;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function layout() {
    const w = innerWidth, h = innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer?.setSize(w, h);
    starMat.uniforms.uPR.value = renderer.getPixelRatio();
  }
  addEventListener("resize", layout);

  // where the core sits in the hero: right side on desktop, behind the text on phones
  function heroAnchor() {
    if (isSmall()) return new THREE.Vector3(1.2, 1.6, -2.5);
    return new THREE.Vector3(camera.aspect > 1.6 ? 3.1 : 2.4, 0.1, 0);
  }

  const clock = new THREE.Clock();
  let running = true;
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) { clock.getDelta(); loop(); }
  });

  const tmp = new THREE.Vector3();
  const heroPos = new THREE.Vector3();
  const deepPos = new THREE.Vector3();

  function loop() {
    if (!running) return;
    requestAnimationFrame(loop);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    const speed = reduceMotion ? 0.15 : 1;

    mouse.lerp(target, 0.05);

    // how far into the hero we've scrolled (0 → 1 over the first viewport)
    const heroOut = Math.min(scrollY / innerHeight, 1);

    heroPos.copy(heroAnchor());
    deepPos.set(isSmall() ? 2 : 6.5, 1.5, -16);
    tmp.copy(heroPos).lerp(deepPos, easeInOut(heroOut));
    core.position.lerp(tmp, 0.08);

    // shrink away as the hero scrolls out so it never sits behind body text
    const s = Math.max(1 - easeInOut(heroOut) * 1.05, 0.001);
    core.scale.setScalar(isSmall() ? s * 0.8 : s);
    core.visible = heroOut < 0.98;

    core.rotation.y += dt * 0.12 * speed + mouse.x * 0.004;
    core.rotation.x = THREE.MathUtils.lerp(core.rotation.x, mouse.y * 0.35, 0.05);

    // distance of the pointer from the core on screen drives a little "excitement"
    tmp.copy(core.position).project(camera);
    const d = Math.hypot(tmp.x - mouse.x, tmp.y - mouse.y);
    hover = THREE.MathUtils.lerp(hover, d < 0.45 ? 1 : 0, 0.06);

    blobMat.uniforms.uTime.value = t * speed;
    blobMat.uniforms.uHover.value = hover;
    starMat.uniforms.uTime.value = t;

    wire.rotation.y -= dt * 0.18 * speed;
    wire.rotation.z += dt * 0.05 * speed;
    nodes.rotation.copy(wire.rotation);
    ring1.rotation.z += dt * 0.2 * speed;
    ring2.rotation.z -= dt * 0.14 * speed;

    for (const l of labels) {
      const a = l.phase + t * l.speed * speed;
      tmp.set(Math.cos(a) * l.radius, Math.sin(a) * l.radius, 0).applyEuler(l.tilt);
      l.sprite.position.copy(tmp);
      // fade labels that pass behind the core
      l.sprite.material.opacity = THREE.MathUtils.clamp(0.35 + (tmp.z + 1.5) * 0.35, 0.15, 1) * (1 - heroOut * 0.6);
    }

    stars.rotation.y = t * 0.008 + scrollP * 0.6;
    stars.rotation.x = scrollP * 0.25;

    debris.position.y = scrollP * 34;
    for (const m of debris.children) {
      m.rotation.x += m.userData.rx * speed;
      m.rotation.y += m.userData.ry * speed;
      m.position.x += Math.sin(t * 0.3 + m.userData.fy) * 0.0015;
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.5, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.3 - scrollP * 1.2, 0.04);
    camera.lookAt(0, -scrollP * 1.2, 0);

    composer ? composer.render() : renderer.render(scene, camera);
  }

  function easeInOut(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }

  layout();
  loop();
  return { renderer };
}
