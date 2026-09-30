// Animated product showcases: Dendo (food delivery), Nexa Ride (ride hailing), AgriShield-X.
import { showcases } from "./data.js";

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const APPLE = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.37 12.5c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.77-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.66zM14.1 5.73c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.67 1.37-.58.67-1.09 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.27z"/></svg>';
const PLAY = '<svg viewBox="0 0 24 24"><path fill="#34d399" d="M3.6 2.3 13.4 12l-9.8 9.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1Z"/><path fill="#60a5fa" d="m16.8 8.6-3.4 3.4L3.6 2.3c.2-.1.5-.1.8 0l12.4 6.3Z"/><path fill="#f87171" d="m16.8 15.4-12.4 6.3c-.3.1-.6.1-.8 0l9.8-9.7 3.4 3.4Z"/><path fill="#fbbf24" d="m20.3 10.4-3.5-1.8-3.4 3.4 3.4 3.4 3.5-1.8c.9-.5.9-1.7 0-2.2Z"/></svg>';

function storeButtons(app) {
  const b = [];
  if (app.ios) b.push(`<a class="store-btn" href="${app.ios}" target="_blank" rel="noopener">${APPLE}<span><small>Download on the</small>App Store</span></a>`);
  if (app.play) b.push(`<a class="store-btn" href="${app.play}" target="_blank" rel="noopener">${PLAY}<span><small>Get it on</small>Google Play</span></a>`);
  return `<div class="store-row">${b.join("")}</div>`;
}

function appCards(apps) {
  return apps
    .map(
      (a) => `<article class="app-card glass">
        <div class="app-head">
          <span class="app-icon">${a.icon}</span>
          <div><h4>${esc(a.name)}</h4><span class="app-who mono">${esc(a.who)}${a.downloads ? ` · ${esc(a.downloads)} downloads` : ""}</span></div>
        </div>
        <p>${esc(a.blurb)}</p>
        <ul>${a.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        ${storeButtons(a)}
      </article>`
    )
    .join("");
}

const chips = (list) => list.map((s) => `<span class="chip">${esc(s)}</span>`).join("");

const wheel = (cx, cy, r, cls = "") => `
  <g class="wheel ${cls}" transform="translate(${cx} ${cy})">
    <g class="spin"><circle r="${r}" fill="#0b0d16"/><circle r="${r * 0.55}" fill="#3a3f55"/>
    <path d="M0 ${-r * 0.55}V${r * 0.55}M${-r * 0.55} 0H${r * 0.55}" stroke="#8b91ad" stroke-width="1.6"/></g>
  </g>`;

/* ======================= DENDO ======================= */
function dendoScene() {
  const foods = ["🍔", "🍕", "🍛", "🍜", "🍩", "🥤", "🌮", "🍗", "🍰", "🥗"];
  const bubbles = foods
    .map((f, i) => `<text class="food-bubble" x="${70 + i * 26}" y="120" font-size="${22 + (i % 3) * 5}" style="animation-delay:${(i * 0.55).toFixed(2)}s">${f}</text>`)
    .join("");
  return `
  <svg class="scene-svg" viewBox="0 0 900 420" preserveAspectRatio="xMinYMax slice" aria-hidden="true">
    <defs>
      <linearGradient id="dSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a0f24"/><stop offset="1" stop-color="#3a1a1c"/></linearGradient>
      <linearGradient id="dWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1d2e"/><stop offset="1" stop-color="#1c1422"/></linearGradient>
      <radialGradient id="dGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffb347" stop-opacity=".55"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>
      <linearGradient id="dWin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffcf7a"/><stop offset="1" stop-color="#ff8a3d"/></linearGradient>
      <pattern id="stripes" width="40" height="60" patternUnits="userSpaceOnUse"><rect width="20" height="60" fill="#ff4d3d"/><rect x="20" width="20" height="60" fill="#fff1e0"/></pattern>
    </defs>
    <rect width="900" height="420" fill="url(#dSky)"/>
    <!-- city far -->
    <circle cx="560" cy="80" r="26" fill="#ffe7c2" opacity=".85"/><circle cx="572" cy="72" r="24" fill="#1d1026"/>
    <g class="parallax slow">
      ${[0, 900].map((o) => `<g transform="translate(${o} 0)">${[40, 110, 170, 260, 330, 420, 500, 590, 660, 750, 820].map((x, i) => {
        const y = 150 + (i * 37) % 90, w = 50 + (i * 13) % 30;
        const wins = [0, 1, 2, 3].map((j) => ((i + j) % 3 ? `<rect x="${x + 10 + (j % 2) * 20}" y="${y + 14 + Math.floor(j / 2) * 26}" width="9" height="12" fill="#ffb86b" opacity=".55"/>` : "")).join("");
        return `<rect x="${x}" y="${y}" width="${w}" height="300" fill="#2e1d36"/>${wins}`;
      }).join("")}</g>`).join("")}
    </g>
    <path d="M360 110 Q470 150 580 112 T800 118" stroke="#6b4a5a" stroke-width="1.5" fill="none"/>
    ${Array.from({ length: 12 }, (_, i) => `<circle class="bulb" cx="${372 + i * 36}" cy="${126 + Math.sin(i * 0.9) * 8}" r="3.5" fill="${["#ffcf5a", "#ff6b6b", "#7ee7c7"][i % 3]}" style="animation-delay:${(i * 0.15).toFixed(2)}s"/>`).join("")}
    <!-- restaurant -->
    <g transform="translate(30 70)">
      <circle cx="170" cy="170" r="200" fill="url(#dGlow)"/>
      <rect x="0" y="40" width="340" height="230" rx="6" fill="url(#dWall)" stroke="#4a3350"/>
      <rect x="40" y="0" width="260" height="46" rx="10" fill="#140d18" stroke="#ff7a45" stroke-width="2"/>
      <text class="neon" x="170" y="32" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="26" letter-spacing="6" fill="#ffd9a0">DENDO KITCHEN</text>
      <path d="M-8 52 H348 V92 Q339 104 330 92 Q321 104 312 92 Q303 104 294 92 Q285 104 276 92 Q267 104 258 92 Q249 104 240 92 Q231 104 222 92 Q213 104 204 92 Q195 104 186 92 Q177 104 168 92 Q159 104 150 92 Q141 104 132 92 Q123 104 114 92 Q105 104 96 92 Q87 104 78 92 Q69 104 60 92 Q51 104 42 92 Q33 104 24 92 Q15 104 6 92 Q-1 104 -8 92 Z" fill="url(#stripes)"/>
      <!-- kitchen window -->
      <rect x="22" y="112" width="220" height="140" rx="8" fill="url(#dWin)"/>
      <rect x="22" y="112" width="220" height="140" rx="8" fill="none" stroke="#5a3a50" stroke-width="6"/>
      <!-- shelf -->
      <rect x="34" y="132" width="80" height="4" fill="#b85a2a"/><text x="40" y="130" font-size="16">🧂🫙🍶</text>
      <!-- chef -->
      <g class="chef" transform="translate(150 150)">
        <g class="chef-body">
          <rect x="-26" y="30" width="52" height="70" rx="16" fill="#ffffff"/>
          <path d="M-10 32 L0 46 L10 32 Z" fill="#ff4d3d"/>
          <circle cx="0" cy="40" r="1.8" fill="#c9ccd8"/><circle cx="0" cy="56" r="1.8" fill="#c9ccd8"/>
          <circle cx="0" cy="12" r="18" fill="#e0a877"/>
          <circle cx="-6" cy="10" r="2" fill="#2a1b12"/><circle cx="6" cy="10" r="2" fill="#2a1b12"/>
          <path d="M-6 18 Q0 23 6 18" stroke="#2a1b12" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M-8 3 Q0 -2 8 3" stroke="#3a2618" stroke-width="3" fill="none"/>
          <g fill="#fff"><circle cx="-12" cy="-12" r="11"/><circle cx="0" cy="-17" r="12"/><circle cx="12" cy="-12" r="11"/><rect x="-16" y="-10" width="32" height="10" rx="2"/></g>
        </g>
        <!-- arm + pan (tosses) -->
        <g class="pan-arm">
          <rect x="-44" y="42" width="30" height="10" rx="5" fill="#ffffff"/>
          <rect x="-80" y="44" width="40" height="5" rx="2" fill="#3a2e2a"/>
          <ellipse cx="-96" cy="48" rx="24" ry="6" fill="#1a1a1f" stroke="#555" />
          <g class="toss"><text x="-110" y="40" font-size="16">🍤</text><text x="-94" y="36" font-size="14">🥦</text></g>
        </g>
        <!-- stove + flames -->
        <rect x="-126" y="74" width="62" height="26" rx="4" fill="#2b2b33"/>
        <g class="flames" transform="translate(-96 72)">
          <path d="M-12 0 Q-10 -12 -6 -4 Q-4 -16 0 -6 Q4 -18 6 -4 Q10 -12 12 0 Z" fill="#ff7a1a"/>
          <path d="M-6 0 Q-4 -8 0 -3 Q4 -9 6 0 Z" fill="#ffd23d"/>
        </g>
        <g class="steam" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7">
          <path d="M-104 28 q-6 -10 0 -20 q6 -10 0 -20"/><path d="M-92 26 q-6 -10 0 -20 q6 -10 0 -20" style="animation-delay:.8s"/>
        </g>
      </g>
      <!-- counter with ready order -->
      <rect x="10" y="244" width="244" height="14" rx="3" fill="#6b3a24"/>
      <g class="ready-bag" transform="translate(206 222)"><rect x="-14" y="-6" width="28" height="26" rx="4" fill="#ff4d3d"/><text x="0" y="13" text-anchor="middle" font-size="13" font-weight="700" fill="#fff" font-family="Space Grotesk">D</text></g>
      <text class="bell" x="30" y="242" font-size="18">🛎️</text>
      <!-- door -->
      <rect x="262" y="130" width="60" height="140" rx="4" fill="#130c16" stroke="#5a3a50" stroke-width="3"/>
      <circle cx="312" cy="200" r="3" fill="#ffb347"/>
      <text x="292" y="160" text-anchor="middle" font-size="11" font-weight="700" fill="#34d399" font-family="JetBrains Mono">OPEN</text>
    </g>
    ${bubbles}
    <!-- road -->
    <rect y="344" width="900" height="76" fill="#15131c"/>
    <rect y="340" width="900" height="6" fill="#2f2a38"/>
    <line class="lane" x1="0" y1="384" x2="900" y2="384" stroke="#f5c35b" stroke-width="3" stroke-dasharray="28 22"/>
    <!-- delivery rider -->
    <g class="dendo-rider">
      <g class="speed" stroke="#ffb347" stroke-width="2.5" stroke-linecap="round" opacity=".8"><path d="M-40 -34H-10"/><path d="M-56 -22H-18"/><path d="M-36 -10H-8"/></g>
      <path d="M8 -20 H70 Q84 -20 88 -6 L90 2 H4 Z" fill="#ff4d3d"/>
      <rect x="14" y="-50" width="30" height="28" rx="4" fill="#ff4d3d" stroke="#fff" stroke-width="1.5"/>
      <text x="29" y="-30" text-anchor="middle" font-size="15" font-weight="700" fill="#fff" font-family="Space Grotesk">D</text>
      <path d="M46 -24 L60 -52 L68 -52" stroke="#1c1c24" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M58 -40 L76 -30" stroke="#ffd9a0" stroke-width="5" stroke-linecap="round"/>
      <circle cx="62" cy="-62" r="11" fill="#ff4d3d"/><rect x="62" y="-66" width="12" height="6" rx="2" fill="#1b2433"/>
      <path d="M84 -26 L92 -40" stroke="#c9ccd8" stroke-width="3" stroke-linecap="round"/>
      <circle cx="94" cy="-16" r="4" fill="#fff6c9"/>
      <path class="beam" d="M96 -16 L170 -34 L170 4 Z" fill="#fff6c9" opacity=".18"/>
      ${wheel(20, 2, 12)}${wheel(80, 2, 12)}
    </g>
  </svg>`;
}

function dendoPhone() {
  const cats = [["🍛", "Biryani"], ["🍕", "Pizza"], ["🍔", "Burgers"], ["🍜", "Noodles"], ["🍗", "Chicken"], ["🌯", "Rolls"], ["🍰", "Desserts"], ["🥤", "Juices"], ["🥗", "Healthy"], ["🍦", "Ice cream"]];
  const row = cats.map(([e, n]) => `<span class="cat"><b>${e}</b>${n}</span>`).join("");
  const steps = ["Order accepted", "Chef is cooking", "Picked up by rider", "On the way", "Delivered 🎉"];
  return `
  <div class="phone dendo-phone" aria-hidden="true">
    <div class="notch"></div>
    <div class="ph-top"><span class="ph-brand">dendo</span><span class="ph-loc">📍 Coimbatore</span></div>
    <div class="ph-search">🔍 Search biryani, pizza, cakes…</div>
    <div class="cats"><div class="cats-track">${row}${row}</div></div>
    <div class="near">
      <div class="near-title">Popular near you</div>
      <div class="rest"><b>🍛</b><span>Biryani House<small>★ 4.6 · 25 min · ₹₹</small></span></div>
      <div class="rest"><b>🍕</b><span>Pizza Point<small>★ 4.4 · 20 min · ₹₹</small></span></div>
    </div>
    <div class="live-card">
      <div class="live-head"><span>Live order</span><span class="eta">ETA 12 min</span></div>
      <div class="track-line"><span class="track-fill"></span><span class="track-bike">🛵</span></div>
      <ol class="steps">${steps.map((s, i) => `<li style="--i:${i}">${s}</li>`).join("")}</ol>
    </div>
  </div>`;
}

/* ======================= NEXA ======================= */
const VEH = {
  cab: `<g><path d="M4 30 L14 14 Q18 8 28 8 L78 8 Q86 8 92 14 L104 24 Q114 26 114 34 L114 40 L4 40 Z" fill="#ffc93c"/>
        <path d="M22 14 Q24 11 30 11 L50 11 L50 24 L16 24 Z" fill="#1c2a44"/><path d="M54 11 L76 11 Q82 11 88 16 L96 24 L54 24 Z" fill="#1c2a44"/>
        <rect x="40" y="0" width="26" height="9" rx="2" fill="#111"/><text x="53" y="7.5" text-anchor="middle" font-size="7" font-weight="700" fill="#ffc93c" font-family="JetBrains Mono">NEXA</text>
        <rect x="4" y="30" width="110" height="3" fill="#111" opacity=".5"/><circle cx="111" cy="30" r="3" fill="#fff6c9"/>
        <path class="beam" d="M113 30 L190 18 L190 46 Z" fill="#fff6c9" opacity=".16"/>${wheel(28, 40, 9)}${wheel(90, 40, 9)}</g>`,
  auto: `<g><path d="M8 40 L8 16 Q8 4 22 4 L66 4 Q76 4 80 14 L84 40 Z" fill="#1f9d55"/>
        <path d="M8 26 L84 26 L90 40 L8 40 Z" fill="#ffd43b"/><rect x="50" y="10" width="26" height="16" rx="3" fill="#1c2a44"/>
        <rect x="16" y="10" width="28" height="16" rx="3" fill="#0f1a2c"/><circle cx="32" cy="16" r="4" fill="#e0a877"/>
        <circle cx="88" cy="32" r="3" fill="#fff6c9"/><path class="beam" d="M90 32 L160 22 L160 44 Z" fill="#fff6c9" opacity=".16"/>
        ${wheel(24, 42, 8)}${wheel(80, 42, 8)}</g>`,
  bike: `<g><path d="M24 34 L48 20 L70 20 L84 34" stroke="#a78bfa" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M44 20 L58 4" stroke="#1c1c24" stroke-width="7" stroke-linecap="round"/><circle cx="60" cy="-6" r="9" fill="#38e1ff"/>
        <path d="M58 8 L78 14" stroke="#e0a877" stroke-width="4" stroke-linecap="round"/><path d="M78 12 L84 22" stroke="#c9ccd8" stroke-width="3"/>
        <circle cx="86" cy="24" r="3" fill="#fff6c9"/><path class="beam" d="M88 24 L150 14 L150 36 Z" fill="#fff6c9" opacity=".16"/>
        ${wheel(24, 36, 11)}${wheel(84, 36, 11)}</g>`,
  ev: `<g><path d="M4 32 Q6 20 20 16 L40 8 Q48 5 60 5 L80 5 Q92 6 104 18 L116 24 Q122 27 122 34 L122 40 L4 40 Z" fill="#14b8a6"/>
        <path d="M42 11 Q50 8 60 8 L62 8 L62 20 L30 20 Z" fill="#0c2233"/><path d="M66 8 L80 8 Q88 9 98 20 L66 20 Z" fill="#0c2233"/>
        <text x="40" y="34" font-size="12" fill="#eafffb">⚡</text><rect x="4" y="30" width="118" height="2" fill="#5eead4" opacity=".8"/>
        <circle cx="119" cy="30" r="3" fill="#dffcff"/><path class="beam" d="M121 30 L200 18 L200 46 Z" fill="#dffcff" opacity=".16"/>
        ${wheel(30, 40, 9)}${wheel(98, 40, 9)}</g>`,
  parcel: `<g><rect x="4" y="2" width="32" height="28" rx="3" fill="#f59e0b"/><path d="M4 12 H36 M20 2 V30" stroke="#92400e" stroke-width="2"/>
        <path d="M10 30 H66 Q80 30 84 40 H6 Z" fill="#6366f1"/><path d="M40 26 L54 2" stroke="#1c1c24" stroke-width="6" stroke-linecap="round"/>
        <circle cx="56" cy="-8" r="9" fill="#f472b6"/><path d="M78 26 L86 12" stroke="#c9ccd8" stroke-width="3"/>
        <circle cx="86" cy="30" r="3" fill="#fff6c9"/>${wheel(18, 42, 10)}${wheel(74, 42, 10)}</g>`,
};

function nexaScene() {
  const lane1 = [["cab", 9, 0], ["bike", 6.5, 2.2], ["ev", 8, 4.6], ["auto", 11, 6.4]];
  const lane2 = [["auto", 12, 0.8], ["parcel", 8.5, 3.4], ["cab", 10, 6], ["bike", 7, 8.5]];
  const vehicles = (lane, y, sc) =>
    lane.map(([k, dur, delay]) => `<g class="veh" style="animation-duration:${dur}s;animation-delay:-${delay}s"><g transform="translate(0 ${y}) scale(${sc})">${VEH[k]}</g></g>`).join("");
  const buildings = (seed, h, fill, win) =>
    [0, 900].map((o) => `<g transform="translate(${o} 0)">${Array.from({ length: 14 }, (_, i) => {
      const w = 40 + ((i * seed) % 30), x = i * 64, top = h + ((i * seed * 7) % 80);
      const wins = Array.from({ length: 6 }, (_, j) => ((i + j) % 3 ? `<rect x="${x + 8 + (j % 2) * 16}" y="${top + 12 + Math.floor(j / 2) * 22}" width="8" height="10" fill="${win}" opacity="${0.4 + ((i * j) % 5) / 10}"/>` : "")).join("");
      return `<rect x="${x}" y="${top}" width="${w}" height="${320 - top}" fill="${fill}"/>${wins}`;
    }).join("")}</g>`).join("");
  return `
  <svg class="scene-svg" viewBox="0 0 900 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <linearGradient id="nSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1030"/><stop offset=".6" stop-color="#3b1d5a"/><stop offset="1" stop-color="#b8456b"/></linearGradient>
      <radialGradient id="nSun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffb4a2"/><stop offset=".5" stop-color="#ff6b8b" stop-opacity=".5"/><stop offset="1" stop-color="#ff6b8b" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="900" height="420" fill="url(#nSky)"/>
    <circle cx="640" cy="250" r="150" fill="url(#nSun)"/>
    <g class="parallax slow">${buildings(7, 120, "#1b1438", "#ffd88a")}</g>
    <g class="parallax mid">${buildings(11, 170, "#120d26", "#8be9ff")}</g>
    <!-- road -->
    <rect y="300" width="900" height="120" fill="#101018"/>
    <rect y="296" width="900" height="6" fill="#3a3550"/>
    <line class="lane fast" x1="0" y1="356" x2="900" y2="356" stroke="#e5e7eb" stroke-width="3" stroke-dasharray="36 28" opacity=".7"/>
    <g class="parallax lamps">${[0, 900].map((o) => `<g transform="translate(${o} 0)">${[60, 240, 420, 600, 780].map((x) => `<g transform="translate(${x} 0)"><rect x="-2" y="226" width="4" height="72" fill="#4b4666"/><path d="M0 228 H16" stroke="#4b4666" stroke-width="4"/><circle cx="18" cy="231" r="4" fill="#ffe8a3"/><path d="M18 233 L4 298 H34 Z" fill="#ffe8a3" opacity=".08"/></g>`).join("")}</g>`).join("")}</g>
    <g class="lane-a">${vehicles(lane1, 292, 1)}</g>
    <g class="lane-b">${vehicles(lane2, 350, 1.12)}</g>
  </svg>`;
}

function nexaPhone() {
  const opts = [["🏍️", "Bike", "2 min", "₹49"], ["🛺", "Auto", "3 min", "₹89"], ["🚗", "Cab", "4 min", "₹159"], ["⚡", "EV", "5 min", "₹139"], ["📦", "Parcel", "3 min", "₹59"]];
  return `
  <div class="phone nexa-phone" aria-hidden="true">
    <div class="notch"></div>
    <div class="map">
      <svg viewBox="0 0 220 150" preserveAspectRatio="none">
        <g stroke="#2a2f4a" stroke-width="6" fill="none"><path d="M0 40 H220"/><path d="M0 110 H220"/><path d="M60 0 V150"/><path d="M160 0 V150"/><path d="M0 150 L120 0"/></g>
        <path class="route" d="M24 128 C60 128 60 110 60 90 S80 40 110 40 S160 40 160 20 L190 18" stroke="#38e1ff" stroke-width="4" fill="none" stroke-linecap="round"/>
        <circle cx="24" cy="128" r="6" fill="#34d399" stroke="#fff" stroke-width="2"/>
        <circle cx="190" cy="18" r="6" fill="#f472b6" stroke="#fff" stroke-width="2"/>
      </svg>
      <span class="map-car">🚗</span>
    </div>
    <div class="sheet">
      <div class="sheet-title">Choose a ride</div>
      <ul class="ride-opts">${opts.map(([e, n, t, p], i) => `<li style="--i:${i}"><b>${e}</b><span>${n}<small>${t} away</small></span><em>${p}</em></li>`).join("")}</ul>
      <div class="otp"><span>START OTP</span><b>4 8 2 1</b></div>
    </div>
  </div>`;
}

/* ======================= AGRI ======================= */
function agriScene() {
  return `
  <div class="agri-scene" aria-hidden="true">
    <div class="agri-stars"></div>
    <div class="sat-orbit"><div class="sat">
      <svg viewBox="0 0 80 40" width="80"><rect x="30" y="12" width="20" height="16" rx="3" fill="#cbd5e1"/><rect x="0" y="15" width="28" height="10" fill="#2563eb" stroke="#93c5fd"/><rect x="52" y="15" width="28" height="10" fill="#2563eb" stroke="#93c5fd"/><circle cx="40" cy="30" r="3" fill="#38e1ff"/></svg>
      <div class="sat-beam"></div>
    </div></div>
    <div class="field-wrap"><div class="field" id="agriField"></div><div class="scanline"></div></div>
    <div class="legend mono"><span><i style="background:#22c55e"></i>Healthy</span><span><i style="background:#eab308"></i>Watch</span><span><i style="background:#ef4444"></i>Drought</span></div>
  </div>`;
}

function agriPanel() {
  return `
  <div class="agri-panel glass" aria-hidden="true">
    <div class="ap-head mono"><span>Forecast · next-month VHI</span><span class="live-dot">LIVE</span></div>
    <svg class="chart" viewBox="0 0 300 120" preserveAspectRatio="none">
      <g stroke="#1f2a44" stroke-width="1">${[20, 50, 80, 110].map((y) => `<path d="M0 ${y}H300"/>`).join("")}</g>
      <path class="line actual" d="M0 70 C20 60 35 40 55 48 S90 90 110 78 S150 30 175 38 S215 85 240 70 S280 40 300 44" fill="none" stroke="#64748b" stroke-width="2.5"/>
      <path class="line pred" d="M0 74 C22 62 36 44 56 50 S92 86 112 76 S152 34 176 40 S214 80 240 68 S282 44 300 46" fill="none" stroke="#34d399" stroke-width="3"/>
    </svg>
    <div class="ap-legend mono"><span><i style="background:#64748b"></i>observed</span><span><i style="background:#34d399"></i>PSO-LightGBM</span></div>
    <div class="sensors">
      <div><small>Temp</small><b data-sensor="temp">31.4</b><em>°C</em></div>
      <div><small>Humidity</small><b data-sensor="hum">62</b><em>%</em></div>
      <div><small>Soil moisture</small><b data-sensor="soil">38</b><em>%</em></div>
      <div><small>Rain</small><b data-sensor="rain">0.0</b><em>mm</em></div>
    </div>
    <div class="ap-foot mono">ESP32 field node → dashboard</div>
  </div>`;
}

function startAgri(root) {
  const field = root.querySelector("#agriField");
  const COLS = 22, ROWS = 14;
  const cells = [];
  for (let i = 0; i < COLS * ROWS; i++) {
    const c = document.createElement("i");
    field.appendChild(c);
    cells.push(c);
  }
  const color = (v) => {
    // v in 0..1: 0 = severe drought, 1 = healthy
    const stops = [[239, 68, 68], [234, 179, 8], [34, 197, 94]];
    const t = Math.max(0, Math.min(1, v)) * 2;
    const a = stops[Math.floor(Math.min(t, 1.999))], b = stops[Math.floor(Math.min(t, 1.999)) + 1];
    const f = t - Math.floor(Math.min(t, 1.999));
    return `rgb(${a.map((x, k) => Math.round(x + (b[k] - x) * f)).join(",")})`;
  };
  let t = 0;
  const paint = () => {
    t += 0.035;
    for (let y = 0; y < ROWS; y++)
      for (let x = 0; x < COLS; x++) {
        const v = 0.55 + 0.28 * Math.sin(x * 0.35 + t) * Math.cos(y * 0.42 - t * 0.7) + 0.2 * Math.sin((x + y) * 0.18 - t * 0.5) - (x > 13 && y < 6 ? 0.3 : 0);
        const cell = cells[y * COLS + x];
        cell.style.background = color(v);
        cell.style.transform = `translateZ(${Math.round((1 - v) * 14)}px)`;
      }
  };
  const sensors = [...root.querySelectorAll("[data-sensor]")];
  const base = { temp: 31.4, hum: 62, soil: 38, rain: 0 };
  const tick = () => {
    for (const s of sensors) {
      const k = s.dataset.sensor;
      const j = { temp: 0.6, hum: 3, soil: 2, rain: 0.3 }[k];
      const v = Math.max(0, base[k] + (Math.random() - 0.5) * j * 2);
      s.textContent = k === "temp" || k === "rain" ? v.toFixed(1) : Math.round(v);
    }
  };
  let raf, iv, on = false;
  const loop = () => { paint(); raf = setTimeout(() => requestAnimationFrame(loop), 90); };
  return {
    play() { if (on) return; on = true; loop(); iv = setInterval(tick, 1400); },
    pause() { on = false; clearTimeout(raf); clearInterval(iv); },
  };
}

/* ======================= render ======================= */
export function renderShowcases(root) {
  const d = showcases.dendo, n = showcases.nexa, a = showcases.agri;
  root.innerHTML = `
  <article class="show show-dendo" id="dendo">
    <header class="show-head reveal">
      <div class="show-brand"><span class="show-logo dendo-logo">D</span><div><h3>Dendo</h3><p class="mono">Food delivery platform · 3 live apps · iOS &amp; Android</p></div></div>
      <p class="show-lead">A restaurant cooks it, a rider brings it, a customer tracks every step. I worked across all three apps and the backend that connects them during my internship.</p>
      <div class="show-stats mono"><span><b>3</b> apps in production</span><span><b>470+</b> commits (app + backend)</span><span><b>Jul–Sep 2026</b> internship</span></div>
    </header>
    <div class="stage reveal">${dendoScene()}${dendoPhone()}</div>
    <div class="app-grid three">${appCards(d.apps)}</div>
    <div class="p-stack show-stack">${chips(d.stack)}</div>
  </article>

  <article class="show show-nexa" id="nexa">
    <header class="show-head reveal">
      <div class="show-brand"><span class="show-logo nexa-logo">N</span><div><h3>Nexa Ride</h3><p class="mono">Ride hailing · bike · auto · cab · EV · parcel</p></div></div>
      <p class="show-lead">One app to move people and parcels across the city, and a partner app for the drivers who do it. Upfront fares, OTP-verified pickups and live tracking.</p>
      <div class="show-stats mono"><span><b>5</b> ride types</span><span><b>2</b> apps live</span><span><b>iOS + Android</b></span></div>
    </header>
    <div class="stage reveal">${nexaScene()}${nexaPhone()}</div>
    <div class="app-grid two">${appCards(n.apps)}</div>
    <div class="p-stack show-stack">${chips(n.stack)}</div>
  </article>

  <article class="show show-agri" id="agrishield">
    <header class="show-head reveal">
      <div class="show-brand"><span class="show-logo agri-logo">🌾</span><div><h3>AgriShield-X</h3><p class="mono">Satellite drought forecasting · IEEE paper · final-year project</p></div></div>
      <p class="show-lead">Predicts next month's Vegetation Health Index from satellite and climate data, so farmers see drought coming before it hits. ESP32 field sensors feed a live dashboard.</p>
      <div class="show-stats mono"><span><b>1.36M</b> grid records</span><span><b>4,937</b> cells</span><span><b>2001–2023</b> satellite data</span></div>
    </header>
    <div class="stage agri-stage reveal">${agriScene()}${agriPanel()}</div>
    <div class="app-grid two">
      <article class="app-card glass">
        <div class="app-head"><span class="app-icon">🛰️</span><div><h4>Forecasting platform</h4><span class="app-who mono">React · FastAPI · AWS</span></div></div>
        <p>PSO-tuned LightGBM behind a JWT-secured FastAPI backend, with Admin and Farmer dashboards, a drought map, explainability and crop recommendations. Deployed on EC2 and S3 with Docker and Terraform.</p>
        <div class="store-row"><a class="p-link" href="${a.links.code}" target="_blank" rel="noopener">Code →</a><a class="p-link" href="${a.links.paper}" target="_blank" rel="noopener">IEEE paper →</a></div>
      </article>
      <article class="app-card glass">
        <div class="app-head"><span class="app-icon">📡</span><div><h4>IoT field network</h4><span class="app-who mono">ESP32 · PHP dashboard</span></div></div>
        <p>ESP32 nodes stream temperature, humidity, soil moisture and rain readings to a live dashboard, alongside an India-wide drought model trained on NASA POWER data for 1,169 points.</p>
        <div class="store-row"><a class="p-link" href="${a.links.iot}" target="_blank" rel="noopener">Code →</a></div>
      </article>
    </div>
    <div class="p-stack show-stack">${chips(a.stack)}</div>
  </article>`;

  const agri = startAgri(root.querySelector(".show-agri"));

  // Dendo order tracker: light one more step every 2s, in time with the 10s progress bar.
  const steps = [...root.querySelectorAll(".steps li")];
  let k = 0;
  setInterval(() => { k = (k + 1) % (steps.length + 1); steps.forEach((li, i) => li.classList.toggle("on", i < k)); }, 2000);

  // Only animate stages that are on screen.
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      e.target.classList.toggle("playing", e.isIntersecting);
      if (e.target.classList.contains("agri-stage")) e.isIntersecting ? agri.play() : agri.pause();
    }
  }, { threshold: 0.05 });
  root.querySelectorAll(".stage").forEach((s) => io.observe(s));
}
