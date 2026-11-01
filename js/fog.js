// 起霧的玻璃
// 底層是清楚的照片，上層 canvas 是霧。
// 1. 擦：手指或滑鼠擦過的地方，霧被擦掉，之後慢慢長回來
// 2. 字：霧上有人用手指寫過的字，透出底下的照片
// 3. 水珠：偶爾有水珠沿著玻璃滑下，留下一道清楚的痕跡
// 4. 凝視：在同一個地方停住，會慢慢透出一團暖光（「因為凝視，而透出一絲暖陽」）

const CONFIG = {
  scale: 0.5,          // canvas 用一半解析度運算，省效能
  blurDivisor: 18,     // 模糊程度：先縮成 1/18 再放大
  frostAlpha: 0.55,    // 結霜紋理的強度
  tint: 'rgba(222, 230, 224, 0.42)', // 霧的顏色
  brush: 70,           // 擦拭筆刷半徑（CSS px）
  regrow: 0.010,       // 每一格補回多少霧
  dropEvery: [4500, 9000], // 水珠出現的間隔（毫秒，隨機）
  maxDrops: 2,         // 同時最多幾顆水珠
  gazeDelay: 450,      // 停住多久開始透光（毫秒）
  writingFont: '"Reenie Beanie", "Caveat", cursive',
};

const rand = (a, b) => a + Math.random() * (b - a);

export function initFog({ canvas, photo, frost, glow, writing = [], onFirstWipe }) {
  const ctx = canvas.getContext('2d');
  const fogLayer = document.createElement('canvas');
  const fctx = fogLayer.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let w = 0, h = 0, lastWidth = 0, wiped = false;
  let points = [];
  let prev = null;
  let drops = [];
  let nextDrop = performance.now() + 1200;

  function coverRect(img, cw, ch) {
    const ir = img.width / img.height, cr = cw / ch;
    let dw, dh;
    if (ir > cr) { dh = ch; dw = ch * ir; } else { dw = cw; dh = cw / ir; }
    return [(cw - dw) / 2, (ch - dh) / 2, dw, dh];
  }

  // 霧上的手寫字：用 destination-out 把字「擦」在霧上
  function drawWriting() {
    if (!writing.length) return;
    const s = CONFIG.scale;
    const size = Math.max(22, Math.min(44, w / s / 11)) * s;
    fctx.save();
    fctx.globalCompositeOperation = 'destination-out';
    fctx.fillStyle = 'rgba(0,0,0,0.78)';
    fctx.shadowColor = 'rgba(0,0,0,0.6)';
    fctx.shadowBlur = 3 * s;
    fctx.font = `${size}px ${CONFIG.writingFont}`;
    fctx.textBaseline = 'middle';
    // 固定的散落位置（相對座標），避開正中央
    const spots = [[0.06, 0.18, -6], [0.52, 0.30, 4], [0.08, 0.52, -3], [0.50, 0.66, 5], [0.10, 0.84, -5], [0.56, 0.92, 2]];
    writing.slice(0, spots.length).forEach((text, i) => {
      const [rx, ry, deg] = spots[i];
      fctx.save();
      fctx.translate(rx * w, ry * h);
      fctx.rotate((deg * Math.PI) / 180);
      fctx.fillText(text, 0, 0);
      fctx.restore();
    });
    fctx.restore();
  }

  function buildFog() {
    fogLayer.width = w; fogLayer.height = h;
    const tiny = document.createElement('canvas');
    tiny.width = Math.max(8, Math.round(w / CONFIG.blurDivisor));
    tiny.height = Math.max(8, Math.round(h / CONFIG.blurDivisor));
    tiny.getContext('2d').drawImage(photo, ...coverRect(photo, tiny.width, tiny.height));
    fctx.imageSmoothingEnabled = true;
    fctx.imageSmoothingQuality = 'high';
    fctx.drawImage(tiny, 0, 0, w, h);
    fctx.globalAlpha = CONFIG.frostAlpha;
    fctx.globalCompositeOperation = 'screen';
    fctx.drawImage(frost, ...coverRect(frost, w, h));
    fctx.globalAlpha = 1;
    fctx.globalCompositeOperation = 'source-over';
    fctx.fillStyle = CONFIG.tint;
    fctx.fillRect(0, 0, w, h);
    drawWriting();
  }

  function resize(force) {
    const rect = canvas.getBoundingClientRect();
    if (!force && Math.round(rect.width) === lastWidth) return;
    lastWidth = Math.round(rect.width);
    w = Math.max(1, Math.round(rect.width * CONFIG.scale));
    h = Math.max(1, Math.round(rect.height * CONFIG.scale));
    canvas.width = w; canvas.height = h;
    buildFog();
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.drawImage(fogLayer, 0, 0);
  }

  function wipeAt(x, y, r, strength = 0.9) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(0,0,0,${strength})`);
    g.addColorStop(0.6, `rgba(0,0,0,${strength / 2})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // ---------- 水珠 ----------
  function spawnDrop(now) {
    drops.push({
      x: rand(0.04, 0.96) * w,
      y: rand(-0.05, 0.35) * h,
      vy: 0,
      r: rand(2.2, 3.6) * CONFIG.scale,
      wobble: rand(0, Math.PI * 2),
      pause: rand(200, 900),   // 一開始先停一下，像水珠在積累
      born: now,
    });
    nextDrop = now + rand(...CONFIG.dropEvery);
  }

  function stepDrops(now) {
    ctx.globalCompositeOperation = 'destination-out';
    for (const d of drops) {
      if (now - d.born < d.pause) { wipeAt(d.x, d.y, d.r * 1.6, 0.25); continue; }
      // 水珠會一頓一頓地往下滑，越滑越快
      d.vy = Math.min(d.vy + 0.04 * CONFIG.scale * 2, 4 * CONFIG.scale * 2);
      if (Math.random() < 0.02) d.vy *= 0.2;
      d.y += d.vy;
      d.wobble += 0.08;
      d.x += Math.sin(d.wobble) * 0.25;
      wipeAt(d.x, d.y, d.r * 1.8, 0.32);
    }
    drops = drops.filter((d) => d.y < h + 20);
  }

  // ---------- 凝視：停住就透出暖光 ----------
  // 光不會一下子出現：先等一下，再慢慢暈開；位置也是慢慢飄過去，不會跳
  let gaze = { x: innerWidth / 2, y: innerHeight / 2, since: 0, active: false, level: 0 };
  let lx = gaze.x, ly = gaze.y;   // 光實際所在的位置（追著 gaze 慢慢移動）
  function updateGaze(clientX, clientY, now) {
    if (Math.hypot(clientX - gaze.x, clientY - gaze.y) > 14) {
      gaze.x = clientX; gaze.y = clientY; gaze.since = now; gaze.active = true;
    }
  }
  function endGaze() { gaze.active = false; }
  const ease = (t) => t * t * (3 - 2 * t);
  function stepGaze(now) {
    const holding = gaze.active && now - gaze.since > CONFIG.gazeDelay;
    // 亮起來慢、暗下去更慢，像雲散開又合起來
    gaze.level += holding ? 0.009 : -0.012;
    gaze.level = Math.max(0, Math.min(1, gaze.level));
    const k = holding ? 0.06 : 0.02;
    lx += (gaze.x - lx) * k;
    ly += (gaze.y - ly) * k;
    const e = ease(gaze.level);
    if (glow) {
      glow.style.setProperty('--g', e.toFixed(3));
      glow.style.transform = `translate3d(${lx.toFixed(1)}px, ${ly.toFixed(1)}px, 0)`;
      document.documentElement.style.setProperty('--gaze', e.toFixed(3));
    }
    if (holding) {
      const rect = canvas.getBoundingClientRect();
      ctx.globalCompositeOperation = 'destination-out';
      wipeAt((lx - rect.left) * CONFIG.scale, (ly - rect.top) * CONFIG.scale,
        CONFIG.brush * CONFIG.scale * (0.6 + e * 1.8), 0.06);
    }
  }

  // ---------- 主迴圈 ----------
  function frame(now) {
    if (!reduceMotion) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = CONFIG.regrow;
      ctx.drawImage(fogLayer, 0, 0);
      ctx.globalAlpha = 1;
    }
    if (points.length) {
      ctx.globalCompositeOperation = 'destination-out';
      const r = CONFIG.brush * CONFIG.scale;
      for (const p of points) {
        if (prev && p.t - prev.t < 80) {
          const dx = p.x - prev.x, dy = p.y - prev.y;
          const steps = Math.ceil(Math.hypot(dx, dy) / (r * 0.35));
          for (let i = 1; i <= steps; i++) wipeAt(prev.x + dx * i / steps, prev.y + dy * i / steps, r);
        } else {
          wipeAt(p.x, p.y, r);
        }
        prev = p;
      }
      points = [];
    }
    if (!reduceMotion) {
      if (now > nextDrop && drops.length < CONFIG.maxDrops) spawnDrop(now);
      stepDrops(now);
    }
    stepGaze(now);
    requestAnimationFrame(frame);
  }

  function addPoint(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    points.push({ x: (clientX - rect.left) * CONFIG.scale, y: (clientY - rect.top) * CONFIG.scale, t: performance.now() });
    if (!wiped) { wiped = true; onFirstWipe && onFirstWipe(); }
  }

  window.addEventListener('mousemove', (e) => {
    addPoint(e.clientX, e.clientY);
    updateGaze(e.clientX, e.clientY, performance.now());
  }, { passive: true });
  document.addEventListener('mouseleave', () => { prev = null; endGaze(); });
  window.addEventListener('touchstart', (e) => {
    prev = null;
    const t = e.touches[0];
    if (t) { addPoint(t.clientX, t.clientY); updateGaze(t.clientX, t.clientY, performance.now()); }
  }, { passive: true });
  window.addEventListener('touchmove', (e) => {
    for (const t of e.touches) addPoint(t.clientX, t.clientY);
    const t = e.touches[0];
    if (t) updateGaze(t.clientX, t.clientY, performance.now());
  }, { passive: true });
  window.addEventListener('touchend', endGaze, { passive: true });
  window.addEventListener('touchcancel', endGaze, { passive: true });
  window.addEventListener('resize', () => resize(false));

  resize(true);
  requestAnimationFrame(frame);
}
