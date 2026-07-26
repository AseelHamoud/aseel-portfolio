/* Renders the site from CONTENT (content.js). Edit content.js, not this file. */

const $ = (sel) => document.querySelector(sel);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- helpers ---------- */
function todoChip(label = 'TBD') {
  return `<span class="todo">${label}</span>`;
}

function yearsSince(dateStr) {
  const ms = Date.now() - new Date(dateStr).getTime();
  return Math.floor(ms / (365.25 * 24 * 3600 * 1000));
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

/* ---------- hero ---------- */
function renderHero() {
  const id = CONTENT.identity;
  $('#hero-location').textContent = id.location;
  $('#hero-name').textContent = id.name;
  $('#hero-headline').innerHTML = esc(id.headline).replaceAll('·', '<span class="sep">·</span>');
  $('#hero-intro').textContent = id.intro;
  const portrait = $('#hero-portrait');
  if (id.photo) {
    portrait.classList.add('has-photo');
    portrait.style.backgroundImage = `url("${id.photo}")`;
  } else {
    portrait.textContent = 'PHOTO COMING SOON';
  }
}

/* ---------- stats dashboard (computed — never invented) ---------- */
function renderStats() {
  const years = yearsSince(CONTENT.identity.aramcoJoined);
  const improvementProjects = CONTENT.projects.filter((p) => p.status !== 'research').length;
  const verified = CONTENT.learning.verified;
  const knownMinutes = verified.reduce((sum, c) => sum + (c.minutes || 0), 0);
  const hours = Math.floor(knownMinutes / 60);
  const stats = [
    { num: years, suffix: '+', lbl: 'Years at Saudi Aramco', note: 'since September 2019' },
    { num: improvementProjects, suffix: '', lbl: 'Improvement projects & tools', note: 'documented on this page' },
    { num: hours, suffix: 'h+', lbl: 'Verified learning hours', note: 'inventory in progress — grows with each record' },
    { num: verified.length, suffix: '', lbl: 'Courses & credentials', note: 'verified records only' },
  ];
  $('#stats').innerHTML = stats.map((s) => `
    <div class="stat">
      <div class="num" data-target="${s.num}" data-suffix="${esc(s.suffix)}">0${esc(s.suffix)}</div>
      <div class="lbl">${esc(s.lbl)}</div>
      <div class="note">${esc(s.note)}</div>
    </div>`).join('');
}

function animateCounters() {
  document.querySelectorAll('.stat .num').forEach((el) => {
    const target = Number(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion || target === 0) {
      el.textContent = `${target}${suffix}`;
      return;
    }
    const t0 = performance.now();
    const dur = 900;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = `${Math.round(target * (1 - Math.pow(1 - p, 3)))}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/* ---------- about ---------- */
function renderAbout() {
  $('#about-body').innerHTML = CONTENT.about.map((p) => `<p>${p}</p>`).join('');
}

/* ---------- projects ---------- */
const STATUS_LABELS = {
  'verified': 'Verified',
  'delivered': 'Delivered',
  'in-progress': 'In progress',
  'prototype': 'Prototype',
  'research': 'Research',
};

function renderProjects() {
  $('#project-list').innerHTML = CONTENT.projects.map((p) => `
    <article class="project">
      <div class="project-head">
        <h3>${esc(p.title)}</h3>
        <span class="badge ${esc(p.status)}" title="${esc(p.statusNote || '')}">${STATUS_LABELS[p.status] || esc(p.status)}</span>
      </div>
      <dl class="case">
        <div class="case-row"><dt>Challenge</dt><dd>${esc(p.challenge)}</dd></div>
        <div class="case-row"><dt>My role</dt><dd>${esc(p.role)}</dd></div>
        <div class="case-row"><dt>Solution</dt><dd>${esc(p.solution)}</dd></div>
        <div class="case-row"><dt>Impact</dt><dd>${esc(p.impact)}</dd></div>
        <div class="case-row"><dt>Tools</dt><dd class="tools">${p.tools.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</dd></div>
      </dl>
    </article>`).join('');
}

/* ---------- learning ---------- */
function fmtDuration(minutes) {
  if (minutes == null) return todoChip('duration TBD');
  const h = Math.floor(minutes / 60), m = minutes % 60;
  return h ? `${h} h ${m ? m + ' m' : ''}`.trim() : `${m} m`;
}

function renderLearning() {
  const { verified, independent, categories } = CONTENT.learning;
  const knownMinutes = verified.reduce((s, c) => s + (c.minutes || 0), 0);
  const activeCategories = new Set(verified.map((c) => c.category)).size;

  $('#learn-stats').innerHTML = [
    { num: `${Math.floor(knownMinutes / 60)}h ${knownMinutes % 60}m`, lbl: 'verified learning time recorded' },
    { num: verified.length, lbl: 'verified courses & credentials' },
    { num: `${activeCategories}/${categories.length}`, lbl: 'learning categories active' },
  ].map((s) => `
    <div class="learn-stat">
      <div class="num">${esc(String(s.num))}</div>
      <div class="lbl">${esc(s.lbl)}</div>
    </div>`).join('');

  $('#learn-verified').innerHTML = verified.map((c, i) => `
    <button class="course" aria-expanded="false" data-i="${i}">
      <span class="cat">${esc(c.category)}</span>
      <h4>${esc(c.title)}</h4>
      <p class="meta">${c.provider ? esc(c.provider) : todoChip('provider TBD')} · ${c.completed ? esc(c.completed) : todoChip()}</p>
      <div class="details">
        <p>Duration: ${fmtDuration(c.minutes)}</p>
        <p>Certificate: ${c.certificate ? `<a href="${esc(c.certificate)}">view</a>` : todoChip('file coming soon')}</p>
      </div>
      <p class="hint">Click for details</p>
    </button>`).join('');

  $('#learn-independent').innerHTML = independent.length
    ? independent.map((c) => `
      <div class="course">
        <span class="cat">${esc(c.category)}</span>
        <h4>${esc(c.title)}</h4>
        <p class="meta">${esc(c.note || '')}</p>
      </div>`).join('')
    : `<div class="empty">Books, research, and self-directed learning will be listed here as the inventory is built.</div>`;

  document.querySelectorAll('#learn-verified .course').forEach((btn) => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      btn.querySelector('.hint').textContent = open ? 'Click for details' : 'Click to close';
    });
  });
}

/* ---------- experience ---------- */
function renderExperience() {
  $('#timeline').innerHTML = CONTENT.experience.map((e) => {
    const dates = (e.start && e.end)
      ? `${esc(e.start)} — ${esc(e.end)}`
      : todoChip('dates TBD');
    return `
    <div class="t-entry">
      <time>${dates}</time>
      <h3>${esc(e.role)}</h3>
      <p class="org">${esc(e.org)}${e.location ? ' · ' + esc(e.location) : ''}</p>
      <ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
    </div>`;
  }).join('');
}

/* ---------- education ---------- */
function renderEducation() {
  const ed = CONTENT.education;
  $('#edu-body').innerHTML = `
    <div>
      <h3>${esc(ed.degree)}</h3>
      <p class="school">${esc(ed.school)} — ${esc(ed.status)}</p>
      <p class="school">${esc(ed.note)}</p>
    </div>
    <div class="gpa">${esc(ed.gpa.split(' ')[0])}<small>GPA / 4.00</small></div>`;
}

/* ---------- skills ---------- */
function renderSkills() {
  $('#skills-grid').innerHTML = Object.entries(CONTENT.skills).map(([cat, items]) => `
    <div class="skill-col">
      <h3>${esc(cat)}</h3>
      <ul>${items.map((s) => `<li class="chip">${esc(s)}</li>`).join('')}</ul>
    </div>`).join('');
}

/* ---------- certificates ---------- */
function renderCerts() {
  $('#cert-grid').innerHTML = CONTENT.learning.verified.map((c) => `
    <div class="cert">
      <div class="cert-thumb">${c.certificate ? '' : 'CERTIFICATE IMAGE — COMING SOON'}</div>
      <div class="cert-body">
        <h4>${esc(c.title)}</h4>
        <p>${c.provider ? esc(c.provider) : todoChip('provider TBD')} · ${esc(c.category)}</p>
        <p>${c.completed ? esc(c.completed) : ''} · ${fmtDuration(c.minutes)}</p>
      </div>
    </div>`).join('');
}

/* ---------- recommendations ---------- */
function renderRecs() {
  $('#recs-body').innerHTML = CONTENT.recommendations.length
    ? CONTENT.recommendations.map((r) => `<blockquote>${esc(r.quote)}<footer>${esc(r.name)}</footer></blockquote>`).join('')
    : `<div class="empty">Recommendations from supervisors and colleagues will appear here once collected.</div>`;
}

/* ---------- contact ---------- */
function renderContact() {
  const L = CONTENT.links;
  const items = [
    L.email ? `<a class="btn solid" href="mailto:${esc(L.email)}">Email me</a>` : '',
    L.linkedin ? `<a class="btn ghost" href="${esc(L.linkedin)}">LinkedIn</a>` : `<span class="btn muted">LinkedIn — coming soon</span>`,
    L.github ? `<a class="btn ghost" href="${esc(L.github)}">GitHub</a>` : `<span class="btn muted">GitHub — coming soon</span>`,
    L.cv ? `<a class="btn ghost" href="${esc(L.cv)}" download>Download CV</a>` : `<span class="btn muted">CV — coming soon</span>`,
  ];
  $('#contact-links').innerHTML = items.join('');
  $('#foot-line').textContent = `© ${new Date().getFullYear()} ${CONTENT.identity.name} — ${CONTENT.footer.disclaimer}`;
}

/* ---------- scroll behaviour ---------- */
function initScroll() {
  const nav = $('#topnav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-stuck', window.scrollY > 8);
  }, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('is-visible');
      if (e.target.id === 'stats') animateCounters();
      observer.unobserve(e.target);
    }
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal, .stat, #stats').forEach((el) => observer.observe(el));
}

/* ---------- boot ---------- */
document.title = CONTENT.meta.title;
renderHero();
renderStats();
renderAbout();
renderProjects();
renderLearning();
renderExperience();
renderEducation();
renderSkills();
renderCerts();
renderRecs();
renderContact();
initScroll();
