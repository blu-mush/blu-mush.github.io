import { BAND, SOCIALS, RELEASES, LIVE, LYRICS_ONLY, EVERYWHERE, LYRICS_CREDIT, ABOUT, MEMBERS, NEXT_SHOW, PAST_SHOWS, ROLL, MERCH, FOG_WRITING } from './data.js';
import { LYRICS } from './lyrics.js';
import { ICONS } from './icons.js';
import { initFog } from './fog.js';

// ---------- 小工具 ----------
const el = (tag, attrs = {}, ...children) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') n.className = v;
    else if (k === 'html') n.innerHTML = v;
    else n.setAttribute(k, v);
  }
  for (const c of children.flat()) if (c != null) n.append(c);
  return n;
};

const MAIL_PATH = 'M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2 .9V18h16V6.4l-8 6.2-8-6.2ZM5.6 6l6.4 5 6.4-5H5.6Z';

function icon(name) {
  const path = name === 'mail' ? MAIL_PATH : ICONS[name];
  if (!path) return el('span', { class: 'dot', 'aria-hidden': 'true' });
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', path);
  svg.append(p);
  return svg;
}

const ext = (url) => (url.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener' });

function lyricsBlock(key) {
  const stanzas = LYRICS[key];
  if (!stanzas) return null;
  return el('div', { class: 'lyrics' },
    stanzas.map((s) => el('p', {}, s.flatMap((line, i) => (i ? [el('br'), line] : [line])))));
}

// ---------- 區塊 ----------
function renderSocials() {
  return el('nav', { class: 'socials', 'aria-label': '社群' },
    SOCIALS.map((s) => el('a', { href: s.url, 'aria-label': s.label, title: s.label, ...ext(s.url) }, icon(s.icon))));
}

function platformButton(p) {
  return el('a', { class: 'platform', href: p.url, ...ext(p.url) }, icon(p.icon), el('span', {}, p.label));
}

function renderRelease(r) {
  const body = el('div', { class: 'release-body' },
    el('div', { class: 'platforms' }, r.platforms.map(platformButton)),
    r.more.length ? el('details', { class: 'more' },
      el('summary', {}, '更多平台'),
      el('div', { class: 'platforms small' }, r.more.map(platformButton))) : null,
    LYRICS[r.lyrics] ? el('details', { class: 'lyrics-toggle' },
      el('summary', {}, 'lyrics'),
      lyricsBlock(r.lyrics)) : null,
  );

  return el('details', { class: 'card release', id: r.id },
    el('summary', {},
      el('img', { class: 'cover', src: r.cover, alt: `${r.title} 封面`, width: 72, height: 72, loading: 'lazy' }),
      el('span', { class: 'meta' },
        el('span', { class: 'title' }, r.title),
        el('span', { class: 'sub' }, [r.kind, r.date].filter(Boolean).join(' · '))),
      el('span', { class: 'chev', 'aria-hidden': 'true' }, '+')),
    body);
}

function renderLive() {
  return el('section', { class: 'section', 'aria-labelledby': 'live-h' },
    el('h2', { id: 'live-h' }, 'live'),
    el('div', { class: 'live-grid' },
      LIVE.map((v) => el('a', { class: 'card live', href: v.url, ...ext(v.url) },
        el('img', { src: v.thumb, alt: '', loading: 'lazy', width: 480, height: 360 }),
        el('span', { class: 'title' }, v.title),
        el('span', { class: 'sub' }, v.where)))));
}

function renderLyricsOnly() {
  return el('section', { class: 'section', 'aria-labelledby': 'lyrics-h' },
    el('h2', { id: 'lyrics-h' }, 'lyrics'),
    LYRICS_ONLY.map((s) => el('details', { class: 'card lyric-card' },
      el('summary', {}, el('span', { class: 'title' }, s.title), el('span', { class: 'chev', 'aria-hidden': 'true' }, '+')),
      lyricsBlock(s.lyrics))),
    el('p', { class: 'credit' }, LYRICS_CREDIT));
}

function renderFooter() {
  return el('footer', { class: 'footer' },
    el('div', { class: 'everywhere' }, EVERYWHERE.map((p) => el('a', { href: p.url, ...ext(p.url) }, p.label))),
    el('a', { class: 'mail', href: `mailto:${BAND.email}` }, BAND.email),
    el('p', { class: 'copy' }, `© ${new Date().getFullYear()} ${BAND.name}`));
}

// ---------- 新增區塊 ----------
function section(id, title, ...children) {
  return el('section', { class: `section section-${id}`, 'aria-labelledby': `${id}-h` },
    el('h2', { id: `${id}-h` }, title), ...children);
}

// 直接聽：最新單曲的 Spotify 播放器（捲到附近才載入，避免拖慢首頁）
function renderListen() {
  const holder = el('div', { class: 'card listen' },
    el('p', { class: 'listen-placeholder' }, 'light on — loading…'));
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    io.disconnect();
    holder.replaceChildren(el('iframe', {
      title: 'light on — Spotify',
      src: 'https://open.spotify.com/embed/album/6SXvc4an32nH6Yitlo35Ii?utm_source=generator',
      width: '100%', height: 152, frameborder: 0, loading: 'lazy',
      allow: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
    }));
  }, { rootMargin: '200px' });
  io.observe(holder);
  return section('listen', 'now playing', holder);
}

function renderShows() {
  const next = NEXT_SHOW
    ? el('div', { class: 'card next-show' },
        el('span', { class: 'sub' }, 'next'),
        el('span', { class: 'title' }, `${NEXT_SHOW.date}　${NEXT_SHOW.venue}`),
        NEXT_SHOW.with ? el('span', { class: 'sub' }, `w/ ${NEXT_SHOW.with}`) : null,
        NEXT_SHOW.url ? el('a', { class: 'platform', href: NEXT_SHOW.url, ...ext(NEXT_SHOW.url) }, el('span', {}, '購票 / 資訊')) : null)
    : el('a', { class: 'card next-show empty', href: SOCIALS[0].url, ...ext(SOCIALS[0].url) },
        el('span', { class: 'sub' }, 'next'),
        el('span', { class: 'title' }, '下一場還在霧裡'),
        el('span', { class: 'sub' }, '追蹤 IG 等消息 →'));

  const wall = el('div', { class: 'poster-wall', tabindex: 0, 'aria-label': '過去的演出海報，可左右滑動' },
    PAST_SHOWS.map((s) => el('a', { class: 'poster', href: s.poster, ...ext(s.poster) },
      el('img', { src: s.poster, alt: `${s.date} ${s.title || ''} @ ${s.venue} 海報`, loading: 'lazy' }),
      el('span', { class: 'poster-meta' },
        el('span', { class: 'date' }, s.date),
        el('span', {}, [s.title, `@ ${s.venue}`].filter(Boolean).join(' ')),
        el('span', { class: 'sub' }, `w/ ${s.with}`)))));
  return section('shows', 'shows', next, wall);
}

// 毛片：一條底片，照片平常是糊的，滑到中間或摸到才對焦
function renderRoll() {
  const strip = el('div', { class: 'roll', tabindex: 0, 'aria-label': '照片底片，可左右滑動' },
    ROLL.map((src, i) => el('figure', { class: 'frame' },
      el('img', { src, alt: '', loading: 'lazy' }),
      el('figcaption', {}, String(i + 1).padStart(2, '0') + 'A'))));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) e.target.classList.toggle('focus', e.isIntersecting);
  }, { root: strip, rootMargin: '0px -30% 0px -30%', threshold: 0.5 });
  requestAnimationFrame(() => strip.querySelectorAll('.frame').forEach((f) => io.observe(f)));
  return section('roll', '毛片', strip);
}

function renderAbout() {
  const langs = [['zh', '中'], ['en', 'EN'], ['ja', '日']];
  const body = el('div', { class: 'about-text' });
  const show = (lang) => {
    body.replaceChildren(...ABOUT[lang].map((t) => el('p', { lang: { zh: 'zh-Hant', en: 'en', ja: 'ja' }[lang] }, t)));
    tabs.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  };
  const tabs = el('div', { class: 'lang-tabs', role: 'group', 'aria-label': '語言' },
    langs.map(([k, label]) => {
      const b = el('button', { type: 'button', 'data-lang': k }, label);
      b.addEventListener('click', () => show(k));
      return b;
    }));
  show('zh');
  const members = el('ul', { class: 'members' },
    MEMBERS.map((m) => el('li', {}, el('span', { class: 'title' }, m.name), el('span', { class: 'sub' }, m.role))));
  return section('about', 'about', el('div', { class: 'card about' }, tabs, body, members));
}

function renderMerch() {
  return section('merch', 'merch',
    el('div', { class: 'card merch' },
      el('ul', {}, MERCH.items.map((t) => el('li', {}, t))),
      el('p', { class: 'sub' }, MERCH.note)));
}

// 毛毛蟲：往下捲，牠就往前爬
function initCaterpillar() {
  const bug = el('img', { class: 'caterpillar', src: 'assets/img/caterpillar.png', alt: '', 'aria-hidden': 'true' });
  document.body.append(bug);
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, scrollY / max) : 0;
    bug.style.setProperty('--p', p.toFixed(4));
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

// ---------- 組裝 ----------
const app = document.getElementById('app');
app.append(
  el('header', { class: 'hero' },
    el('h1', {}, el('img', { class: 'logo', src: 'assets/img/logo.png', alt: BAND.name, width: 1200, height: 174 })),
    el('p', { class: 'tagline' }, BAND.tagline),
    renderSocials()),
  renderListen(),
  el('section', { class: 'section', 'aria-labelledby': 'music-h' },
    el('h2', { id: 'music-h' }, 'music'),
    RELEASES.map(renderRelease)),
  renderShows(),
  renderRoll(),
  renderLive(),
  renderAbout(),
  renderLyricsOnly(),
  renderMerch(),
  renderFooter(),
);
initCaterpillar();

// ---------- 霧 ----------
const hint = document.getElementById('hint');
const load = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
const portrait = window.matchMedia('(max-aspect-ratio: 1/1)').matches;
const photoSrc = portrait ? 'assets/img/bg-portrait.jpg' : 'assets/img/bg-landscape.jpg';
document.querySelector('.photo').style.backgroundImage = `url("${photoSrc}")`;

// 等手寫字型載入，霧上的字才寫得出來（載不到就用備用字型）
const fontReady = document.fonts ? document.fonts.load('40px "Reenie Beanie"').catch(() => {}) : Promise.resolve();
Promise.all([load(photoSrc), load('assets/img/frost.jpg'), fontReady]).then(([photo, frost]) => {
  initFog({
    canvas: document.getElementById('fog'),
    glow: document.getElementById('glow'),
    writing: FOG_WRITING,
    photo, frost,
    onFirstWipe: () => hint.classList.add('gone'),
  });
  document.body.classList.add('fog-ready');
}).catch(() => {
  // 圖片載入失敗也不影響連結：就留一片霧色背景
  document.body.classList.add('fog-failed');
});
