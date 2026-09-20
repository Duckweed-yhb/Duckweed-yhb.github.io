/* ==========================================================================
   star-intro.js —— 首页「星海」入场动画
   一次访问只播一次（sessionStorage），尊重 prefers-reduced-motion。
   完全由 JS 构建 DOM 与 Canvas 绘制，不改变任何页面文案。
   画面构成：深海渐变的夜、缓缓浮现的星、偶尔划过的流星、
             底部一条起伏的海平线与潮光，中央是站名与一句诗。
   ========================================================================== */
(function () {
  'use strict';

  var KEY = 'star-intro-shown';
  var DURATION = 2600;   // 主体动画时长（毫秒）
  var EXIT = 900;        // 退场时长

  function reduceMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function alreadyShown() {
    try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }

  function markShown() {
    try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* 忽略 */ }
  }

  function build() {
    var root = document.createElement('div');
    root.className = 'star-intro';
    root.setAttribute('role', 'presentation');

    var canvas = document.createElement('canvas');
    canvas.className = 'star-intro-canvas';
    root.appendChild(canvas);

    var core = document.createElement('div');
    core.className = 'star-intro-core';
    core.innerHTML =
      '<p class="si-kicker">自信人生二百年</p>' +
      '<h1 class="si-title">星隅</h1>' +
      '<p class="si-sub">会当水击三千里</p>' +
      '<span class="si-line"></span>' +
      '<p class="si-tagline">Duckweed 的个人博客</p>';
    root.appendChild(core);

    var hint = document.createElement('button');
    hint.type = 'button';
    hint.className = 'star-intro-skip';
    hint.textContent = '轻触跳过';
    root.appendChild(hint);

    return { root: root, canvas: canvas, hint: hint };
  }

  /* ------------------------------------------------------------ Canvas 绘制 */
  function Painter(canvas) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, stars = [], meteors = [], raf = 0, t0 = performance.now();

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      stars = [];
      var count = Math.round(Math.min(200, Math.max(90, (w * h) / 9000)));
      for (var i = 0; i < count; i++) {
        var hue = Math.random();
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.86,
          r: Math.random() * 1.5 + 0.4,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 1.6 + 0.6,
          drift: (Math.random() - 0.5) * 0.05,
          // 冷白 / 淡紫 / 冰蓝三种色温
          color: hue < 0.62 ? '255,255,255' : (hue < 0.85 ? '207,196,255' : '188,217,255')
        });
      }
    }

    function spawnMeteor() {
      meteors.push({
        x: Math.random() * w * 0.7 + w * 0.15,
        y: Math.random() * h * 0.3 + h * 0.05,
        len: Math.random() * 120 + 90,
        speed: Math.random() * 3.5 + 4.5,
        life: 1
      });
    }

    function wave(offset, amp, freq, phase, t) {
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (var x = 0; x <= w; x += 6) {
        var y = h * offset + Math.sin(x * freq + t * 0.6 + phase) * amp +
                Math.sin(x * freq * 2.3 + t * 0.9 + phase) * amp * 0.35;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();
    }

    function frame(now) {
      var t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);

      // 星星：渐次浮现 + 呼吸闪烁
      stars.forEach(function (s, i) {
        var appear = Math.min(1, Math.max(0, (t * 1.4) - (i % 60) / 60));
        var twinkle = 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
        s.x += s.drift;
        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + s.color + ',' + (appear * twinkle).toFixed(3) + ')';
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(' + s.color + ',0.85)';
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // 流星
      if (Math.random() < 0.012) spawnMeteor();
      meteors = meteors.filter(function (m) {
        m.x -= m.speed * 0.9;
        m.y += m.speed * 0.9;
        m.life -= 0.012;
        if (m.life <= 0) return false;
        var grad = ctx.createLinearGradient(m.x, m.y, m.x + m.len * 0.7, m.y - m.len * 0.7);
        grad.addColorStop(0, 'rgba(207,196,255,' + (m.life * 0.95) + ')');
        grad.addColorStop(1, 'rgba(122,92,240,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x + m.len * 0.7, m.y - m.len * 0.7);
        ctx.stroke();
        return true;
      });

      // 海平线：三层潮水 + 岸边光
      ctx.save();
      var g1 = ctx.createLinearGradient(0, h * 0.66, 0, h);
      g1.addColorStop(0, 'rgba(74,159,224,0.30)');
      g1.addColorStop(1, 'rgba(10,14,30,0.75)');
      ctx.fillStyle = g1;
      wave(0.70, 9, 0.006, 0, t);

      var g2 = ctx.createLinearGradient(0, h * 0.76, 0, h);
      g2.addColorStop(0, 'rgba(122,92,240,0.34)');
      g2.addColorStop(1, 'rgba(8,11,26,0.85)');
      ctx.fillStyle = g2;
      wave(0.78, 12, 0.0045, 1.6, t);

      var g3 = ctx.createLinearGradient(0, h * 0.86, 0, h);
      g3.addColorStop(0, 'rgba(91,147,208,0.42)');
      g3.addColorStop(1, 'rgba(5,7,15,0.95)');
      ctx.fillStyle = g3;
      wave(0.88, 15, 0.003, 3.1, t);

      // 潮光：贴着海面的呼吸感
      var glow = ctx.createRadialGradient(w * 0.5, h * 0.92, 0, w * 0.5, h * 0.92, w * 0.6);
      glow.addColorStop(0, 'rgba(164,199,238,' + (0.16 + 0.06 * Math.sin(t * 1.2)).toFixed(3) + ')');
      glow.addColorStop(1, 'rgba(164,199,238,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, h * 0.6, w, h * 0.4);
      ctx.restore();

      raf = requestAnimationFrame(frame);
    }

    return {
      start: function () {
        resize();
        seed();
        t0 = performance.now();
        raf = requestAnimationFrame(frame);
      },
      stop: function () {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      },
      resize: function () {
        resize();
        seed();
      }
    };
  }

  /* ------------------------------------------------------------------ 主流程 */
  function run() {
    if (reduceMotion() || alreadyShown()) return;

    var parts = build();
    var painter = Painter(parts.canvas);
    document.body.appendChild(parts.root);
    document.body.classList.add('star-intro-open');

    // 让浏览器先完成一次布局，再触发进入动画
    requestAnimationFrame(function () {
      parts.root.classList.add('is-live');
      painter.start();
    });

    var closed = false;
    function close(immediate) {
      if (closed) return;
      closed = true;
      markShown();
      painter.stop();
      parts.root.classList.add('is-leaving');
      document.body.classList.remove('star-intro-open');
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onScrollAway);
      window.removeEventListener('touchmove', onScrollAway);
      window.removeEventListener('resize', onResize);
      setTimeout(function () {
        if (parts.root.parentNode) parts.root.parentNode.removeChild(parts.root);
      }, immediate ? 260 : EXIT);
    }

    function onKey(e) { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') close(); }
    function onScrollAway() { close(); }
    function onResize() { painter.resize(); }

    parts.root.addEventListener('click', function () { close(); });
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onScrollAway, { passive: true });
    window.addEventListener('touchmove', onScrollAway, { passive: true });
    window.addEventListener('resize', onResize);

    setTimeout(close, DURATION);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
