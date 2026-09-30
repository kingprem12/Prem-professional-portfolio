import { renderShowcases } from "./showcase.js";
import { profile, stats, skills, orbitTech, experience, projects, achievements, certifications, otherCredentials, education } from "./data.js";

const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;

const ICONS = {
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/></svg>',
  ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
};
const ACH_ICON = { trophy: "🏆", star: "🎓", medal: "🥈", rocket: "🚀" };

/* ---------------- render ---------------- */
function render() {
  $("#heroSummary").textContent = "I build and ship production apps: 5 live on the App Store and Play Store for Dendo and Nexa Ride. My stack runs from Flutter and React on the front to Java, Spring Boot and Laravel APIs on AWS.";
  $("#aboutSummary").textContent = profile.summary;
  $("#navResume").href = profile.resume;
  $("#heroResume").href = profile.resume;
  $("#allRepos").href = profile.github + "?tab=repositories";
  $("#year").textContent = new Date().getFullYear();

  const social = [
    { href: profile.github, icon: "github", label: "GitHub" },
    { href: profile.linkedin, icon: "linkedin", label: "LinkedIn" },
    { href: `mailto:${profile.email}`, icon: "mail", label: "Email" },
  ];
  $("#heroSocial").innerHTML = social
    .map((s) => `<a class="icon-link" href="${s.href}" ${s.href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""} aria-label="${s.label}">${ICONS[s.icon]}</a>`)
    .join("");

  $("#stats").innerHTML = stats
    .map(
      (s) => `<div class="stat glass reveal">
        <div class="stat-value grad" data-count="${s.value}" data-decimals="${s.decimals || 0}" data-prefix="${esc(s.prefix || "")}" data-suffix="${esc(s.suffix || "")}">${esc(s.prefix || "")}0${esc(s.suffix || "")}</div>
        <div class="stat-label">${esc(s.label)}</div>
      </div>`
    )
    .join("");

  $("#skillsGrid").innerHTML = skills
    .map(
      (g) => `<article class="skill-card glass reveal">
        <h3><span class="dot"></span>${esc(g.group)}</h3>
        <div class="chips">${g.items.map((i) => `<span class="chip">${esc(i)}</span>`).join("")}</div>
      </article>`
    )
    .join("");

  $("#timeline").innerHTML = experience
    .map(
      (e) => `<li class="tl-item glass reveal">
        <div class="tl-top">
          <div><h3>${esc(e.role)}</h3><div class="tl-org">${esc(e.org)}</div></div>
          <span class="tl-period">${esc(e.period)}</span>
        </div>
        <ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      </li>`
    )
    .join("");

  $("#education").innerHTML = education
    .map(
      (e) => `<div class="edu-card glass reveal">
        <span class="mono">${esc(e.period)}</span>
        <h3>${esc(e.degree)}</h3>
        <p>${esc(e.school)}</p>
        <span class="edu-score">${esc(e.score)}</span>
      </div>`
    )
    .join("");

  // projects
  const cats = [
    ["all", "All"],
    ["fullstack", "Full Stack"],
    ["cloud", "Cloud"],
    ["ai", "AI / ML"],
    ["web3", "Web3"],
    ["security", "Security"],
  ];
  $("#filters").innerHTML = cats
    .map(([k, v]) => {
      const n = k === "all" ? projects.length : projects.filter((p) => p.category.includes(k)).length;
      return `<button class="filter" role="tab" data-filter="${k}" aria-selected="${k === "all"}">${v}<span class="count">${n}</span></button>`;
    })
    .join("");

  $("#projectsGrid").innerHTML = projects
    .map((p) => {
      const links = [];
      if (p.links.code) links.push(`<a class="p-link" href="${p.links.code}" target="_blank" rel="noopener">${ICONS.github}Code</a>`);
      if (p.links.paper) links.push(`<a class="p-link" href="${p.links.paper}" target="_blank" rel="noopener">${ICONS.doc}Paper</a>`);
      if (p.links.live) links.push(`<a class="p-link" href="${p.links.live}" target="_blank" rel="noopener">${ICONS.ext}Live</a>`);
      return `<article class="project glass tilt reveal ${p.featured ? "featured" : ""}" data-cats="${p.category.join(" ")}">
        <span class="shine"></span>
        <div class="p-top">${p.featured ? '<span class="p-badge">Featured</span>' : "<span></span>"}<span class="p-year">${esc(p.year)}</span></div>
        <h3>${esc(p.title)}</h3>
        <div class="p-tag">${esc(p.tagline)}</div>
        <ul>${p.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        <div class="p-stack">${p.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
        ${links.length ? `<div class="p-links">${links.join("")}</div>` : ""}
      </article>`;
    })
    .join("");

  $("#achGrid").innerHTML = achievements
    .map((a, i) => {
      const clickable = a.cert || a.image;
      return `<article class="ach glass reveal ${clickable ? "clickable" : ""}" data-ach="${i}" ${clickable ? 'tabindex="0" role="button"' : ""}>
        <div class="ach-icon">${ACH_ICON[a.icon] || "⭐"}</div>
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.detail)}</p>
        ${clickable ? '<div class="view">View proof →</div>' : ""}
      </article>`;
    })
    .join("");

  const certCats = [
    ["all", "All"],
    ["cloud", "Cloud"],
    ["engineering", "Engineering"],
    ["security", "Security"],
    ["data", "Data"],
    ["awards", "Awards & internship"],
  ];
  $("#certFilters").innerHTML = certCats
    .map(([k, v]) => {
      const n = k === "all" ? certifications.length : certifications.filter((c) => c.tag === k).length;
      return `<button class="filter" role="tab" data-filter="${k}" aria-selected="${k === "all"}">${v}<span class="count">${n}</span></button>`;
    })
    .join("");

  $("#certGrid").innerHTML = certifications
    .map(
      (c, i) => `<button class="cert glass reveal" data-cert="${i}" data-tag="${c.tag}" aria-label="View ${esc(c.title)}">
        <div class="cert-thumb"><img src="assets/thumbs/${c.id}.jpg" alt="" loading="lazy" /></div>
        <div class="cert-body">
          <h3>${esc(c.title)}</h3>
          <div class="cert-meta"><span class="issuer">${esc(c.issuer)}</span><span>${esc(c.date)}</span></div>
        </div>
      </button>`
    )
    .join("");

  $("#otherCreds").innerHTML = `<strong>Also completed:</strong> ${otherCredentials.map(esc).join(" · ")}`;

  $("#contactEmail").href = `mailto:${profile.email}`;
  $("#contactEmail").textContent = profile.email;
  $("#contactRow").innerHTML = `
    <a class="btn btn-ghost" href="${profile.linkedin}" target="_blank" rel="noopener">${ICONS.linkedin.replace("<svg", '<svg width="18" height="18"')} LinkedIn</a>
    <a class="btn btn-ghost" href="${profile.github}" target="_blank" rel="noopener">${ICONS.github.replace("<svg", '<svg width="18" height="18"')} GitHub</a>
    <a class="btn btn-ghost" href="tel:${profile.phone.replace(/\s/g, "")}">${ICONS.phone.replace("<svg", '<svg width="18" height="18"')} ${esc(profile.phone)}</a>
    <a class="btn btn-primary" href="${profile.resume}" target="_blank" rel="noopener">Resume</a>`;
}

/* ---------------- typing effect ---------------- */
function typeRoles() {
  const el = $("#typed");
  const roles = profile.roles;
  if (reduceMotion) { el.textContent = roles[0]; return; }
  let r = 0, i = 0, del = false;
  const tick = () => {
    const word = roles[r];
    i += del ? -1 : 1;
    el.textContent = word.slice(0, i);
    let wait = del ? 35 : 70;
    if (!del && i === word.length) { del = true; wait = 1800; }
    else if (del && i === 0) { del = false; r = (r + 1) % roles.length; wait = 350; }
    setTimeout(tick, wait);
  };
  tick();
}

/* ---------------- reveal + counters ---------------- */
function observe() {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("in");
        e.target.querySelectorAll?.("[data-count]").forEach(countUp);
        io.unobserve(e.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    // stagger siblings in the same grid
    const idx = [...el.parentElement.children].indexOf(el);
    el.style.transitionDelay = `${Math.min(idx, 6) * 70}ms`;
    io.observe(el);
  });
}

function countUp(el) {
  const end = parseFloat(el.dataset.count);
  const dec = +el.dataset.decimals;
  const pre = el.dataset.prefix, suf = el.dataset.suffix;
  if (reduceMotion) { el.textContent = pre + end.toFixed(dec) + suf; return; }
  const dur = 1600, t0 = performance.now();
  const step = (now) => {
    const p = Math.min((now - t0) / dur, 1);
    const v = end * (1 - Math.pow(1 - p, 4));
    el.textContent = pre + v.toFixed(dec) + suf;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------------- 3D tilt + spotlight ---------------- */
function tilt() {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll(".tilt").forEach((card) => {
    const max = card.classList.contains("photo-card") ? 10 : 6;
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(1000px) rotateY(${(x - 0.5) * max}deg) rotateX(${(0.5 - y) * max}deg) translateZ(0)`;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.transition = "transform .6s var(--ease), border-color .3s";
      card.style.transform = "";
      setTimeout(() => (card.style.transition = ""), 600);
    });
    card.addEventListener("pointerenter", () => (card.style.transition = "border-color .3s"));
  });
  document.querySelectorAll(".skill-card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

/* ---------------- filters ---------------- */
function filters(barSel, itemSel, match) {
  const bar = $(barSel);
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    bar.querySelectorAll(".filter").forEach((b) => b.setAttribute("aria-selected", b === btn));
    const f = btn.dataset.filter;
    document.querySelectorAll(itemSel).forEach((el) => {
      const show = f === "all" || match(el, f);
      el.classList.toggle("hide", !show);
      if (show) { el.classList.remove("in"); requestAnimationFrame(() => el.classList.add("in")); }
    });
  });
}

/* ---------------- certificate viewer ---------------- */
function viewer() {
  const dlg = $("#viewer"), body = $("#viewerBody");
  const open = (title, src) => {
    $("#viewerTitle").textContent = title;
    $("#viewerOpen").href = src;
    body.innerHTML = src.endsWith(".pdf")
      ? `<iframe src="${src}#toolbar=0&view=FitH" title="${esc(title)}"></iframe>`
      : `<img src="${src}" alt="${esc(title)}" />`;
    dlg.showModal();
  };
  const close = () => { dlg.close(); body.innerHTML = ""; };
  $("#viewerClose").addEventListener("click", close);
  dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); });
  dlg.addEventListener("close", () => (body.innerHTML = ""));

  $("#certGrid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cert]");
    if (!b) return;
    const c = certifications[+b.dataset.cert];
    open(`${c.title} · ${c.issuer}`, `assets/certs/${c.file}`);
  });
  const openAch = (el) => {
    const a = achievements[+el.dataset.ach];
    if (a.cert) { const c = certifications.find((x) => x.id === a.cert); open(a.title, `assets/certs/${c.file}`); }
    else if (a.image) open(a.title, a.image);
  };
  $("#achGrid").addEventListener("click", (e) => { const el = e.target.closest(".ach.clickable"); if (el) openAch(el); });
  $("#achGrid").addEventListener("keydown", (e) => {
    const el = e.target.closest(".ach.clickable");
    if (el && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openAch(el); }
  });
}

/* ---------------- nav ---------------- */
function nav() {
  const navEl = $("#nav"), links = $("#navLinks"), btn = $("#menuBtn");
  let last = scrollY;
  addEventListener("scroll", () => {
    const y = scrollY;
    navEl.classList.toggle("hidden", y > last && y > 300 && !links.classList.contains("open"));
    last = y;
  }, { passive: true });

  btn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { links.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
  });

  const map = new Map([...links.querySelectorAll("a")].map((a) => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { map.forEach((a) => a.classList.remove("active")); map.get(e.target.id)?.classList.add("active"); }
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

function cursorGlow() {
  if (!finePointer) return;
  const g = $("#cursorGlow");
  let x = 0, y = 0, cx = 0, cy = 0;
  addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; g.style.opacity = 1; }, { passive: true });
  (function f() { cx += (x - cx) * 0.12; cy += (y - cy) * 0.12; g.style.transform = `translate(${cx - 260}px, ${cy - 260}px)`; requestAnimationFrame(f); })();
  g.style.left = "0"; g.style.top = "0";
}

/* ---------------- boot ---------------- */
render();
renderShowcases($("#showcase"));
nav();
viewer();
filters("#filters", ".project", (el, f) => el.dataset.cats.split(" ").includes(f));
filters("#certFilters", ".cert", (el, f) => el.dataset.tag === f);
tilt();
cursorGlow();

const finish = () => {
  $("#loader").classList.add("done");
  document.body.classList.add("ready");
  typeRoles();
  observe();
};

import("./scene.js")
  .then(({ initScene }) => initScene($("#scene"), { orbitTech }))
  .catch((err) => { console.warn("3D scene unavailable:", err); $("#scene")?.remove(); })
  .finally(() => setTimeout(finish, 250));
