/* Renders the site from CONTENT (content.js) and, in Arabic,
   overlays CONTENT_AR (content-ar.js). Edit the content files, not this one. */

const $ = (sel) => document.querySelector(sel);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- language ---------- */
function resolveLang() {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (fromUrl === 'ar' || fromUrl === 'en') return fromUrl;
  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) { /* private mode */ }
  return saved === 'ar' ? 'ar' : 'en';
}

/* Arabic values win where present; anything missing falls back to English,
   so a half-translated file still renders a complete page. */
function overlay(en, ar) {
  if (ar === undefined || ar === null) return en;
  if (Array.isArray(en) && Array.isArray(ar)) {
    return en.map((item, i) => overlay(item, ar[i]));
  }
  if (en && ar && typeof en === 'object' && typeof ar === 'object' && !Array.isArray(en)) {
    const out = { ...en };
    for (const k of Object.keys(ar)) out[k] = overlay(en[k], ar[k]);
    return out;
  }
  return ar;
}

const LANG = resolveLang();
const HAS_AR = typeof CONTENT_AR !== 'undefined';
const C = (LANG === 'ar' && HAS_AR) ? overlay(CONTENT, CONTENT_AR) : CONTENT;

/* `skills` is keyed by the category name itself, so merging by key would
   leave both languages side by side. It replaces wholesale instead. */
if (LANG === 'ar' && HAS_AR && CONTENT_AR.skills) C.skills = CONTENT_AR.skills;

/* English UI labels; Arabic overrides come from CONTENT_AR.ui.labels */
const EN_LABELS = {
  challenge: 'Challenge', contribution: 'My contribution', solution: 'Solution',
  toolsUsed: 'Tools used', value: 'Practical value', evidence: 'Evidence',
  role: 'My Role', outcome: 'Outcome',
  madeUpOf: 'Made up of', learningHours: 'Learning Hours',
  internalActivities: 'Internal Learning Activities',
  via: 'via', viewCredential: 'View Credential',
  clickDetails: 'Click for details', clickClose: 'Click to close',
  duration: 'Duration', certificate: 'Certificate',
  certImageSoon: 'CERTIFICATE IMAGE — COMING SOON',
  providerTBD: 'provider TBD', durationTBD: 'duration TBD', fileSoon: 'file coming soon',
  emailMe: 'Email me', linkedinSoon: 'LinkedIn — coming soon', cvSoon: 'CV — coming soon',
  downloadCv: 'Download CV', gpa: 'GPA / 4.00', photoSoon: 'PHOTO COMING SOON',
  skipToContent: 'Skip to content', portraitAlt: 'Portrait of {name}',
  noCourses: 'Courses and credentials will be listed here as they are confirmed.',
  langSwitch: 'العربية',
};
const T = (LANG === 'ar' && HAS_AR && CONTENT_AR.ui && CONTENT_AR.ui.labels)
  ? { ...EN_LABELS, ...CONTENT_AR.ui.labels }
  : EN_LABELS;

/* ---------- helpers ---------- */
function todoChip(label) {
  return `<span class="todo">${esc(label)}</span>`;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

/* Swap the page's own text nodes (headings, nav, buttons) in Arabic. */
function applyLanguage() {
  const root = document.documentElement;
  root.lang = LANG;
  root.dir = LANG === 'ar' ? 'rtl' : 'ltr';

  if (LANG === 'ar' && HAS_AR && CONTENT_AR.ui) {
    const ui = CONTENT_AR.ui;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = el.dataset.i18n.split('.').reduce((o, k) => (o ? o[k] : undefined), ui);
      if (value) el.textContent = value;
    });
  }

  const brand = $('#brand');
  if (brand && LANG === 'ar' && HAS_AR) brand.textContent = CONTENT_AR.identity.name;

  const btn = $('#lang-toggle');
  if (btn) {
    btn.textContent = T.langSwitch;
    btn.setAttribute('lang', LANG === 'ar' ? 'en' : 'ar');
    btn.addEventListener('click', () => {
      const next = LANG === 'ar' ? 'en' : 'ar';
      try { localStorage.setItem('lang', next); } catch (e) { /* private mode */ }
      const url = new URL(location.href);
      url.searchParams.set('lang', next);
      location.href = url.toString();
    });
  }
}

/* ---------- hero ---------- */
function renderHero() {
  if (!$('#hero-name')) return;
  const id = C.identity;
  $('#hero-name').textContent = id.name;
  $('#hero-headline').textContent = id.headline;
  $('#hero-tagline').textContent = id.tagline;
  $('#hero-intro').textContent = id.intro;
  const portrait = $('#hero-portrait');
  portrait.setAttribute('aria-label', T.portraitAlt.replace('{name}', id.name));
  if (id.photo) {
    portrait.classList.add('has-photo');
    portrait.style.backgroundImage = `url("${id.photo}")`;
  } else {
    portrait.textContent = T.photoSoon;
  }
}

/* ---------- statistics ----------
   The real figure is rendered straight away; the count-up is only an
   enhancement, so a visitor never sees a zero if it doesn't run.      */
function renderStats() {
  if (!$('#stats')) return;
  $('#stats').innerHTML = C.stats.map((s) => {
    const num = String(s.value);
    const digits = num.replace(/\D/g, '');
    const suffix = num.replace(/^\d+/, '');
    return `
    <div class="stat">
      <div class="num" data-target="${digits}" data-suffix="${esc(suffix)}">${esc(num)}</div>
      <div class="lbl">${esc(s.label)}</div>
      ${s.note ? `<div class="note">${esc(s.note)}</div>` : ''}
    </div>`;
  }).join('');

  /* The markup carries the real figure, so it survives with no JS and with
     reduced motion. When the count-up will run, park it at zero first —
     otherwise the visitor sees the answer before the animation starts. */
  if (!reduceMotion) {
    document.querySelectorAll('#stats .num').forEach((el) => {
      if (Number(el.dataset.target)) el.textContent = `0${el.dataset.suffix || ''}`;
    });
  }
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
      /* A frame callback can carry a timestamp from just before it was
         scheduled, which would make the first frame render a negative
         figure. Clamp both ends. */
      const p = Math.min(1, Math.max(0, (t - t0) / dur));
      /* Quadratic, not cubic: a cubic curve puts 70% of the climb into the
         first third, which reads as a jump rather than a count. */
      el.textContent = `${Math.round(target * (1 - Math.pow(1 - p, 2)))}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/* ---------- availability badge ---------- */
function renderAvailability() {
  const host = $('#availability');
  if (!host) return;
  const a = C.availability;
  if (!a || !a.open) { host.remove(); return; }
  host.innerHTML = `
    <span class="status"><span class="dot" aria-hidden="true"></span>${esc(a.label)}</span>
    <span class="status-kinds">${a.kinds.map(esc).join(' · ')}</span>`;
}

/* ---------- about ---------- */
function renderAbout() {
  if (!$('#about-body')) return;
  $('#about-body').innerHTML = C.about.map((p) => `<p>${p}</p>`).join('');
}

/* ---------- projects ----------
   The homepage shows only the featured ones; projects.html shows all.
   Nothing is deleted from the data either way.                       */
const EXT = '<svg class="ext" viewBox="0 0 12 12" aria-hidden="true" width="11" height="11"><path d="M4.5 1.5h6v6M10.5 1.5L5 7M8 9.5v1h-7v-7h1" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/* Every shot keeps its enlarge link in the markup. Whether that link is
   live is a question of available width, so CSS decides it — see the
   `.shots-lead` rules in styles.css. */
function shotFigure(im) {
  return `
        <figure class="shot">
          <a href="${esc(im.src)}" target="_blank" rel="noopener noreferrer">
            <img src="${esc(im.src)}" alt="${esc(im.alt || '')}" loading="lazy">
          </a>
          ${im.caption ? `<figcaption>${esc(im.caption)}</figcaption>` : ''}
        </figure>`;
}

function projectCard(p, isLead) {
  /* Short layout when the project gives `role` and `outcome` in place of
     the fuller contribution/solution/tools breakdown. */
  const brief = p.role && p.outcome && !p.contribution;
  const rows = brief
    ? [
        [T.challenge, esc(p.challenge)],
        [T.role, esc(p.role)],
        [T.outcome, esc(p.outcome)],
      ]
    : [
        [T.challenge, esc(p.challenge)],
        [T.contribution, esc(p.contribution)],
        [T.solution, esc(p.solution)],
        [T.toolsUsed, `<span class="tools">${(p.tools || []).map((x) => `<span class="chip">${esc(x)}</span>`).join('')}</span>`],
        [T.value, esc(p.value)],
        ...(p.evidence ? [[T.evidence, esc(p.evidence)]] : []),
      ];
  /* Images are placed by their `role` (see content.js): the lead shot sits
     under the title, credentials close the card small, and anything without
     a role keeps the original side-by-side grid after the text. */
  const shots = (p.images || []).filter((im) => im.src);
  const leadShots = shots.filter((im) => im.role === 'lead');
  const credentialShots = shots.filter((im) => im.role === 'credential');
  const plainShots = shots.filter((im) => !im.role);

  return `
    <article class="project${isLead ? ' lead' : ''}">
      <div class="project-head">
        <h3>${esc(p.title)}</h3>
        ${p.tags ? `<div class="tags">${p.tags.map((x) => `<span class="tag">${esc(x)}</span>`).join('')}</div>` : ''}
      </div>
      ${leadShots.length ? `
      <div class="shots shots-lead">${leadShots.map((im) => shotFigure(im)).join('')}</div>` : ''}
      <dl class="case${brief ? ' brief' : ''}">
        ${rows.map(([label, body]) => `
        <div class="case-row"><dt>${esc(label)}</dt><dd>${body}</dd></div>`).join('')}
      </dl>
      ${plainShots.length ? `
      <div class="shots">${plainShots.map((im) => shotFigure(im)).join('')}</div>` : ''}
      ${credentialShots.length ? `
      <div class="shots shots-credential">${credentialShots.map((im) => shotFigure(im)).join('')}</div>` : ''}
    </article>`;
}

function renderProjects() {
  const featuredHost = $('#project-list');
  if (featuredHost) {
    const featured = C.projects.filter((p) => p.featured);
    const list = featured.length ? featured : C.projects.slice(0, 3);
    featuredHost.innerHTML = list.map((p, i) => projectCard(p, i === 0)).join('');
  }
  const allHost = $('#all-projects');
  if (allHost) {
    allHost.innerHTML = C.projects.map((p, i) => projectCard(p, i === 0)).join('');
  }
}

/* Remember where the visitor was before opening the full projects page,
   so returning drops them back at Featured Projects, not the top.
   The browser also tries to restore scroll on back-navigation, so we
   take manual control and re-apply until the position sticks.        */
function initProjectNav() {
  const viewAll = $('#view-all');
  if (viewAll) {
    if (LANG === 'ar') viewAll.href = 'projects.html?lang=ar';
    viewAll.addEventListener('click', () => {
      try { sessionStorage.setItem('backToProjects', String(Math.round(window.scrollY))); } catch (e) { /* private mode */ }
    });
  }
  const back = $('.back-link');
  if (back && LANG === 'ar') back.href = 'index.html?lang=ar#projects';

  if (!$('#project-list')) return;
  let stored = null;
  try { stored = sessionStorage.getItem('backToProjects'); } catch (e) { /* private mode */ }
  if (stored === null) return;
  try { sessionStorage.removeItem('backToProjects'); } catch (e) {}

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const wanted = Number(stored);
  const root = document.documentElement;
  const prevBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';

  const place = () => {
    const section = $('#projects');
    const target = wanted > 0
      ? wanted
      : Math.round(section.getBoundingClientRect().top + window.scrollY - 70);
    window.scrollTo(0, target);
  };

  place();
  requestAnimationFrame(place);
  window.addEventListener('load', place, { once: true });
  setTimeout(() => {
    place();
    root.style.scrollBehavior = prevBehavior;
  }, 250);
}

/* ---------- learning ---------- */
function fmtDuration(minutes) {
  if (minutes == null) return todoChip(T.durationTBD);
  const h = Math.floor(minutes / 60), m = minutes % 60;
  return h ? `${h} h ${m ? m + ' m' : ''}`.trim() : `${m} m`;
}

function renderLearning() {
  if (!$('#learn-internal')) return;
  const { internal, external } = C.learning;

  $('#learn-internal').innerHTML = `
    <div class="learn-figures">
      <div class="learn-stat"><div class="num">${internal.hours}</div><div class="lbl">${esc(T.learningHours)}</div></div>
      <div class="learn-stat">
        <div class="num">${internal.activities}</div><div class="lbl">${esc(T.internalActivities)}</div>
        <div class="breakdown">
          <span class="breakdown-label">${esc(T.madeUpOf)}</span>
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
        <p class="meta">${c.provider ? esc(c.provider) : todoChip(T.providerTBD)} · ${c.completed ? esc(c.completed) : todoChip(T.providerTBD)}</p>
        <div class="details">
          <p>${esc(T.duration)}: ${fmtDuration(c.minutes)}</p>
          <p>${esc(T.certificate)}: ${c.certificate ? `<a href="${esc(c.certificate)}">${esc(T.viewCredential)}</a>` : todoChip(T.fileSoon)}</p>
        </div>
        <p class="hint">${esc(T.clickDetails)}</p>
      </button>`).join('')
    : `<div class="empty">${esc(T.noCourses)}</div>`;

  document.querySelectorAll('#learn-external .course').forEach((btn) => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      btn.querySelector('.hint').textContent = open ? T.clickDetails : T.clickClose;
    });
  });
}

/* ---------- career journey ---------- */
function logoMark(e) {
  return e.logo
    ? `<img src="${esc(e.logo)}" alt="${esc(e.company)} logo" loading="lazy">`
    : `<span class="logo-fallback">${esc(e.company.slice(0, 2).toUpperCase())}</span>`;
}

function renderCareer() {
  if (!$('#career')) return;
  $('#career').innerHTML = C.experience.map((e) => `
    <article class="job">
      <div class="job-head">
        <div class="logo-box">
          ${e.website
            ? `<a href="${esc(e.website)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(e.company)}">${logoMark(e)}</a>`
            : logoMark(e)}
        </div>
        <div class="job-title">
          <h3>${e.website
            ? `<a class="company-link" href="${esc(e.website)}" target="_blank" rel="noopener noreferrer">${esc(e.company)}${EXT}</a>`
            : esc(e.company)}</h3>
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
  if (!$('#edu-body')) return;
  const ed = C.education;
  $('#edu-body').innerHTML = `
    <div>
      <h3>${esc(ed.degree)}</h3>
      <p class="school">${esc(ed.school)} — ${esc(ed.status)}</p>
      <p class="school">${esc(ed.note)}</p>
    </div>
    <div class="gpa">${esc(ed.gpa.split(' ')[0])}<small>${esc(T.gpa)}</small></div>`;
}

/* ---------- skills ---------- */
function renderSkills() {
  if (!$('#skills-grid')) return;
  $('#skills-grid').innerHTML = Object.entries(C.skills).map(([cat, items]) => `
    <div class="skill-col">
      <h3>${esc(cat)}</h3>
      <ul>${items.map((s) => `<li class="chip">${esc(s)}</li>`).join('')}</ul>
    </div>`).join('');
}

/* ---------- certificates ----------
   "View Credential" only appears when a real credential URL exists. */
function renderCerts() {
  if (!$('#cert-grid')) return;
  $('#cert-grid').innerHTML = C.learning.external.map((c) => {
    const provider = c.provider
      ? (c.providerUrl
          ? `<a href="${esc(c.providerUrl)}" target="_blank" rel="noopener noreferrer">${esc(c.provider)}${EXT}</a>`
          : esc(c.provider))
      : todoChip(T.providerTBD);
    return `
    <div class="cert">
      <div class="cert-thumb">${c.certificate ? '' : esc(T.certImageSoon)}</div>
      <div class="cert-body">
        <h4>${esc(c.title)}</h4>
        <p class="cert-provider">${esc(T.via)} ${provider}</p>
        <p class="cert-meta">${esc(c.category)}${c.completed ? ' · ' + esc(c.completed) : ''} · ${fmtDuration(c.minutes)}</p>
        ${c.credentialUrl
          ? `<a class="cert-cta" href="${esc(c.credentialUrl)}" target="_blank" rel="noopener noreferrer">${esc(T.viewCredential)}${EXT}</a>`
          : ''}
      </div>
    </div>`;
  }).join('');
}

/* ---------- recommendation ---------- */
function renderRecommendation() {
  if (!$('#rec-heading')) return;
  const r = C.recommendation;
  $('#rec-heading').textContent = r.heading;
  $('#rec-body').innerHTML = `
    <div class="rec-card">
      <p class="rec-by">${esc(r.by)}</p>
      ${r.byTitle ? `<p class="rec-title">${esc(r.byTitle)}</p>` : ''}
      ${r.byRelation ? `<p class="rec-relation">${esc(r.byRelation)}</p>` : ''}
      <p class="rec-label">${esc(r.label)}</p>
      <p class="rec-text">${esc(r.summary)}</p>
    </div>`;
}

/* ---------- contact ---------- */
function renderContact() {
  const foot = $('#foot-line');
  if (foot) {
    foot.textContent = `© ${new Date().getFullYear()} ${C.identity.name} — ${C.footer.disclaimer}`;
  }
  const host = $('#contact-links');
  if (!host) return;
  const L = C.links;
  host.innerHTML = [
    L.email ? `<a class="btn solid" href="mailto:${esc(L.email)}">${esc(T.emailMe)}</a>` : '',
    L.linkedin
      ? `<a class="btn ghost" href="${esc(L.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>`
      : `<span class="btn muted">${esc(T.linkedinSoon)}</span>`,
    L.cv
      ? `<a class="btn ghost" href="${esc(L.cv)}" download>${esc(T.downloadCv)}</a>`
      : `<span class="btn muted">${esc(T.cvSoon)}</span>`,
  ].join('');
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

  const navLinks = [...document.querySelectorAll('.top-links a[href*="#"]')];
  const sectionObserver = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      navLinks.forEach((a) => a.classList.toggle('is-current', a.hash === '#' + e.target.id));
    }
  }, { rootMargin: '-40% 0px -55% 0px' });
  navLinks.forEach((a) => {
    if (!a.hash) return;
    const sec = document.querySelector(a.hash);
    if (sec) sectionObserver.observe(sec);
  });

  const observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('is-visible');
      observer.unobserve(e.target);
    }
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  /* The stats cards and their figures share one trigger, so the count-up
     starts on the same frame the boxes appear instead of trailing behind
     them. The row sits just under the hero, so this holds back until the row
     is properly on screen — a bottom margin rather than a visibility ratio,
     which stays correct on a phone where the stacked row can be taller than
     the screen and a ratio might never be met. */
  const statsEl = $('#stats');
  if (statsEl) {
    const statsObserver = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        statsEl.querySelectorAll('.stat').forEach((card) => card.classList.add('is-visible'));
        animateCounters();
        statsObserver.unobserve(e.target);
      }
    }, { threshold: 0, rootMargin: '0px 0px -15% 0px' });
    statsObserver.observe(statsEl);
  }
}

/* Keep the chosen language on internal links so it survives navigation. */
function keepLangOnLinks() {
  if (LANG !== 'ar') return;
  document.querySelectorAll('a[href$=".html"], a[href*=".html#"]').forEach((a) => {
    const url = new URL(a.getAttribute('href'), location.href);
    if (url.origin !== location.origin) return;
    url.searchParams.set('lang', 'ar');
    a.setAttribute('href', url.pathname.split('/').pop() + url.search + url.hash);
  });
}

/* ---------- boot ---------- */
applyLanguage();
if ($('#hero-name')) {
  document.title = C.meta.title;
} else if ($('#all-projects') && LANG === 'ar' && HAS_AR && CONTENT_AR.ui && CONTENT_AR.ui.pageTitles) {
  document.title = CONTENT_AR.ui.pageTitles.projects;
}
renderHero();
renderAvailability();
renderStats();
renderAbout();
renderProjects();
initProjectNav();
renderLearning();
renderCareer();
renderEducation();
renderSkills();
renderCerts();
renderRecommendation();
renderContact();
keepLangOnLinks();
initScroll();
