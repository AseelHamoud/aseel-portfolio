/* Renders the site from CONTENT (content.js). Edit content.js, not this file. */

const $ = (sel) => document.querySelector(sel);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- helpers ---------- */
function todoChip(label = 'TBD') {
  return `<span class="todo">${label}</span>`;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

/* ---------- hero ---------- */
function renderHero() {
  const id = CONTENT.identity;
  $('#hero-name').textContent = id.name;
  $('#hero-headline').textContent = id.headline;
  $('#hero-tagline').textContent = id.tagline;
  $('#hero-intro').textContent = id.intro;
  const portrait = $('#hero-portrait');
  if (id.photo) {
    portrait.classList.add('has-photo');
    portrait.style.backgroundImage = `url("${id.photo}")`;
  } else {
    portrait.textContent = 'PHOTO COMING SOON';
  }
}

/* ---------- statistics ----------
   The real figure is rendered straight away; the count-up is only an
   enhancement, so a visitor never sees a zero if it doesn't run.      */
function renderStats() {
  $('#stats').innerHTML = CONTENT.stats.map((s) => {
    const num = String(s.value);
    const digits = num.replace(/\D/g, '');
    const suffix = num.replace(/^\d+/, '');
    return `
    <div class="stat">
      <div class="num" data-target="${digits}" data-suffix="${esc(suffix)}">${esc(num)}</div>
      ${s.unit ? `<div class="unit">${esc(s.unit)}</div>` : ''}
      <div class="lbl">${esc(s.label)}</div>
      ${s.note ? `<div class="note">${esc(s.note)}</div>` : ''}
      ${s.breakdown ? `
        <div class="breakdown">
          <span class="breakdown-label">${esc(s.breakdownLabel || 'Made up of')}</span>
          ${s.breakdown.map((b) => `
            <div class="breakdown-row">
              <b>${esc(String(b.value))}</b><span>${esc(b.label)}</span>
            </div>`).join('')}
        </div>` : ''}
    </div>`;
  }).join('');
}

function animateCounters() {
  if (reduceMotion) return; // the real figures are already on screen
  document.querySelectorAll('.stat .num').forEach((el) => {
    const target = Number(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    if (!target) return;
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
function renderProjects() {
  $('#project-list').innerHTML = CONTENT.projects.map((p, i) => `
    <article class="project${i === 0 ? ' lead' : ''}">
      <div class="project-head">
        <h3>${esc(p.title)}</h3>
        ${p.tags ? `<div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : ''}
      </div>
      <dl class="case">
        <div class="case-row"><dt>Challenge</dt><dd>${esc(p.challenge)}</dd></div>
        <div class="case-row"><dt>My contribution</dt><dd>${esc(p.contribution)}</dd></div>
        <div class="case-row"><dt>Solution</dt><dd>${esc(p.solution)}</dd></div>
        <div class="case-row"><dt>Tools used</dt><dd class="tools">${p.tools.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</dd></div>
        <div class="case-row"><dt>Practical value</dt><dd>${esc(p.value)}</dd></div>
        ${p.evidence ? `<div class="case-row"><dt>Evidence</dt><dd>${esc(p.evidence)}</dd></div>` : ''}
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
  const { internal, external } = CONTENT.learning;

  $('#learn-internal').innerHTML = `
    <div class="learn-figures">
      <div class="learn-stat"><div class="num">${internal.hours}</div><div class="lbl">Learning Hours</div></div>
      <div class="learn-stat">
        <div class="num">${internal.activities}</div><div class="lbl">Internal Learning Activities</div>
        <div class="breakdown">
          <span class="breakdown-label">Made up of</span>
          ${internal.breakdown.map((b) => `
            <div class="breakdown-row"><b>${b.value}</b><span>${esc(b.label)}</span></div>`).join('')}
        </div>
      </div>
    </div>
    <p class="learn-note">${esc(internal.note)}</p>`;

  $('#learn-external').innerHTML = external.length
    ? external.map((c, i) => `
      <button class="course" aria-expanded="false" data-i="${i}">
        <span class="cat">${esc(c.category)}</span>
        <h4>${esc(c.title)}</h4>
        <p class="meta">${c.provider ? esc(c.provider) : todoChip('provider TBD')} · ${c.completed ? esc(c.completed) : todoChip()}</p>
        <div class="details">
          <p>Duration: ${fmtDuration(c.minutes)}</p>
          <p>Certificate: ${c.certificate ? `<a href="${esc(c.certificate)}">view</a>` : todoChip('file coming soon')}</p>
        </div>
        <p class="hint">Click for details</p>
      </button>`).join('')
    : `<div class="empty">Courses and credentials will be listed here as they are confirmed.</div>`;

  document.querySelectorAll('#learn-external .course').forEach((btn) => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      btn.querySelector('.hint').textContent = open ? 'Click for details' : 'Click to close';
    });
  });
}

/* ---------- career journey ---------- */
function renderCareer() {
  $('#career').innerHTML = CONTENT.experience.map((e) => `
    <article class="job">
      <div class="job-head">
        <div class="logo-box">
          ${e.logo
            ? `<img src="${esc(e.logo)}" alt="${esc(e.company)} logo" loading="lazy">`
            : `<span class="logo-fallback">${esc(e.company.slice(0, 2).toUpperCase())}</span>`}
        </div>
        <div class="job-title">
          <h3>${esc(e.company)}</h3>
          <p class="role">${esc(e.role)}</p>
          ${e.period ? `<p class="period">${esc(e.period)}</p>` : ''}
        </div>
      </div>
      ${e.points ? `<ul class="job-points">${e.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
      ${e.stages ? `
        <ol class="stages">
          ${e.stages.map((s) => `
            <li class="stage${s.emphasis ? ' key' : ''}">
              <div class="stage-title">
                <h4>${esc(s.title)}</h4>
                ${s.subtitle ? `<span class="stage-sub">${esc(s.subtitle)}</span>` : ''}
              </div>
              <p>${esc(s.text)}</p>
            </li>`).join('')}
        </ol>` : ''}
    </article>`).join('');
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
  $('#cert-grid').innerHTML = CONTENT.learning.external.map((c) => `
    <div class="cert">
      <div class="cert-thumb">${c.certificate ? '' : 'CERTIFICATE IMAGE — COMING SOON'}</div>
      <div class="cert-body">
        <h4>${esc(c.title)}</h4>
        <p>${c.provider ? esc(c.provider) : todoChip('provider TBD')} · ${esc(c.category)}</p>
        <p>${c.completed ? esc(c.completed) : ''} · ${fmtDuration(c.minutes)}</p>
      </div>
    </div>`).join('');
}

/* ---------- recommendation ---------- */
function renderRecommendation() {
  const r = CONTENT.recommendation;
  $('#rec-heading').textContent = r.heading;
  $('#rec-body').innerHTML = `
    <div class="rec-card">
      <p class="rec-by">${esc(r.by)}</p>
      <p class="rec-label">${esc(r.label)}</p>
      <p class="rec-text">${esc(r.summary)}</p>
    </div>`;
}

/* ---------- contact ---------- */
function renderContact() {
  const L = CONTENT.links;
  $('#contact-links').innerHTML = [
    L.email ? `<a class="btn solid" href="mailto:${esc(L.email)}">Email me</a>` : '',
    L.linkedin
      ? `<a class="btn ghost" href="${esc(L.linkedin)}">LinkedIn</a>`
      : `<span class="btn muted">LinkedIn — coming soon</span>`,
    L.cv
      ? `<a class="btn ghost" href="${esc(L.cv)}" download>Download CV</a>`
      : `<span class="btn muted">CV — coming soon</span>`,
  ].join('');
  $('#foot-line').textContent = `© ${new Date().getFullYear()} ${CONTENT.identity.name} — ${CONTENT.footer.disclaimer}`;
}

/* ---------- scroll behaviour ---------- */
function initScroll() {
  const nav = $('#topnav');
  const progress = $('#progress');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-stuck', window.scrollY > 8);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : '0';
  }, { passive: true });

  const navLinks = [...document.querySelectorAll('.top-links a[href^="#"]')];
  const sectionObserver = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      navLinks.forEach((a) => a.classList.toggle('is-current', a.hash === '#' + e.target.id));
    }
  }, { rootMargin: '-40% 0px -55% 0px' });
  navLinks.forEach((a) => {
    const sec = document.querySelector(a.hash);
    if (sec) sectionObserver.observe(sec);
  });

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
renderCareer();
renderEducation();
renderSkills();
renderCerts();
renderRecommendation();
renderContact();
initScroll();
