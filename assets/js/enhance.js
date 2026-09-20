/* ==========================================================================
   enhance.js —— 星隅 全站交互增强（原生 JS，无依赖）
   仅添加「形式」层能力，不改动任何文章与页面内容：
     1. 代码块：语言标签 + 一键复制
     2. 标题锚点：hover 出现 ¶，可复制小节链接
     3. 图片：懒加载 + 点击灯箱放大
     4. 回到顶部按钮
     5. 搜索快捷键：/  或  Ctrl/Cmd + K
     6. 正文外链：新标签页打开并补 rel
     7. 阅读进度条（文章页，若布局未提供则自动兜底创建）
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;

  function ready(fn) {
    if (doc.readyState !== 'loading') {
      fn();
    } else {
      doc.addEventListener('DOMContentLoaded', fn);
    }
  }

  /* ------------------------------------------------ 1. 代码块工具条 */
  function initCodeBlocks() {
    var blocks = doc.querySelectorAll('.post-content pre, .page-card pre');
    if (!blocks.length) return;

    Array.prototype.forEach.call(blocks, function (pre) {
      if (pre.querySelector('.code-toolbar')) return;
      // 跳过纯文本/终端示意类的多行引用块
      var code = pre.querySelector('code');
      if (!code) return;

      var lang = '';
      var m = (code.className || '').match(/language-([\w+#-]+)/i);
      if (m) lang = m[1];
      if (!lang) {
        var firstLine = (code.textContent || '').trim().split('\n')[0] || '';
        if (/^\$ |^> |^PS |^C:\\/.test(firstLine)) lang = 'shell';
      }

      var bar = doc.createElement('div');
      bar.className = 'code-toolbar';

      if (lang) {
        var tag = doc.createElement('span');
        tag.className = 'code-lang';
        tag.textContent = lang;
        bar.appendChild(tag);
      }

      var btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'code-copy';
      btn.textContent = '复制';
      btn.setAttribute('aria-label', '复制代码');
      btn.addEventListener('click', function () {
        var text = code.innerText;
        var done = function () {
          btn.textContent = '已复制';
          btn.classList.add('done');
          setTimeout(function () {
            btn.textContent = '复制';
            btn.classList.remove('done');
          }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
        } else {
          fallbackCopy(text, done);
        }
      });

      bar.appendChild(btn);
      pre.appendChild(bar);
    });
  }

  function fallbackCopy(text, done) {
    var ta = doc.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:absolute;left:-9999px;top:0;';
    doc.body.appendChild(ta);
    ta.select();
    try { doc.execCommand('copy'); done(); } catch (e) { /* 静默失败 */ }
    doc.body.removeChild(ta);
  }

  /* ------------------------------------------------ 2. 标题锚点 */
  function initHeadingAnchors() {
    var heads = doc.querySelectorAll('.post-content h2, .post-content h3, .post-content h4');
    if (!heads.length) return;

    Array.prototype.forEach.call(heads, function (h) {
      if (h.querySelector('.post-anchor')) return;
      var id = h.id;
      if (!id) return;
      var a = doc.createElement('a');
      a.className = 'post-anchor';
      a.href = '#' + id;
      a.textContent = '¶';
      a.setAttribute('aria-label', '本节链接');
      a.addEventListener('click', function () {
        if (history.replaceState) history.replaceState(null, '', '#' + id);
      });
      h.appendChild(a);
    });
  }

  /* ------------------------------------------------ 3. 图片懒加载 + 灯箱 */
  function initImages() {
    var imgs = doc.querySelectorAll('.post-content img, .page-card img');
    Array.prototype.forEach.call(imgs, function (img) {
      if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.getAttribute('decoding')) img.setAttribute('decoding', 'async');
      if (img.dataset.noZoom === 'true') return;
      img.classList.add('zoomable');
      img.addEventListener('click', function () {
        openLightbox(img.src, img.alt);
      });
    });
  }

  function openLightbox(src, alt) {
    var box = doc.createElement('div');
    box.className = 'img-lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', alt || '图片预览');

    var big = doc.createElement('img');
    big.src = src;
    big.alt = alt || '';
    box.appendChild(big);

    function close() {
      box.remove();
      doc.removeEventListener('keydown', onKey);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }

    box.addEventListener('click', close);
    doc.addEventListener('keydown', onKey);
    doc.body.appendChild(box);
  }

  /* ------------------------------------------------ 4. 回到顶部（带进度百分比） */
  function initBackToTop() {
    var btn = doc.createElement('button');
    btn.type = 'button';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', '回到顶部');
    btn.title = '回到顶部';
    btn.innerHTML = '<span class="btt-arrow">↑</span><span class="btt-pct">0%</span>';
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    doc.body.appendChild(btn);

    var pctEl = btn.querySelector('.btt-pct');
    var ticking = false;
    function update() {
      var y = window.scrollY || doc.documentElement.scrollTop;
      var height = doc.documentElement.scrollHeight - doc.documentElement.clientHeight;
      var pct = height > 0 ? Math.round((y / height) * 100) : 0;
      pctEl.textContent = pct + '%';
      btn.classList.toggle('show', y > 420);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ------------------------------------------------ 5. 搜索快捷键 */
  function initSearchShortcut() {
    var input = doc.getElementById('sidebar-search-input');
    if (!input) return;

    doc.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      var typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
      var isSlash = e.key === '/';
      var isCmdK = (e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey);
      if ((isSlash && !typing) || isCmdK) {
        e.preventDefault();
        var sidebar = doc.getElementById('sidebar');
        var overlay = doc.getElementById('sidebar-overlay');
        if (sidebar && !sidebar.classList.contains('open')) {
          sidebar.classList.add('open');
          if (overlay) overlay.classList.add('active');
        }
        input.focus();
        input.select();
      }
    });
  }

  /* ------------------------------------------------ 6. 正文外链处理 */
  function initExternalLinks() {
    var links = doc.querySelectorAll('.post-content a[href^="http"], .page-card a[href^="http"]');
    Array.prototype.forEach.call(links, function (a) {
      if (a.hostname === window.location.hostname) return;
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });
  }

  /* ------------------------------------------------ 7. 阅读进度条兜底 */
  function initProgressFallback() {
    if (doc.querySelector('.reading-progress')) return;
    if (!doc.body.classList.contains('layout-post')) return;

    var bar = doc.createElement('div');
    bar.className = 'reading-progress';
    doc.body.appendChild(bar);

    function update() {
      var top = window.scrollY || doc.documentElement.scrollTop;
      var height = doc.documentElement.scrollHeight - doc.documentElement.clientHeight;
      var pct = height > 0 ? (top / height) * 100 : 0;
      bar.style.width = Math.min(pct, 100) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ------------------------------------------------ 8. 窄屏浮动目录（TOC 三态） */
  function initTocFab() {
    var toc = doc.getElementById('post-toc');
    if (!toc) return;

    var fab = doc.createElement('button');
    fab.type = 'button';
    fab.className = 'toc-fab';
    fab.setAttribute('aria-label', '打开目录');
    fab.title = '章节目录';
    fab.innerHTML = '📑';
    doc.body.appendChild(fab);

    function isFloatingMode() {
      // 宽屏时目录本来就固定在右缘，无需浮动按钮
      return window.getComputedStyle(toc).position !== 'fixed' || window.innerWidth <= 1400;
    }

    fab.addEventListener('click', function (e) {
      e.stopPropagation();
      toc.classList.toggle('mobile-open');
    });

    doc.addEventListener('click', function (e) {
      if (!toc.classList.contains('mobile-open')) return;
      if (e.target.closest('#post-toc') || e.target.closest('.toc-fab')) return;
      toc.classList.remove('mobile-open');
    });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') toc.classList.remove('mobile-open');
    });

    // 目录内的锚点点击后收起浮层
    toc.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') toc.classList.remove('mobile-open');
    });

    var ticking = false;
    function update() {
      var y = window.scrollY || doc.documentElement.scrollTop;
      fab.classList.toggle('show', y > 320 && isFloatingMode());
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ------------------------------------------------ 9. 分享（Web Share API + 复制链接） */
  function initShare() {
    var article = doc.querySelector('.post-container');
    if (!article) return;

    var url = window.location.href;
    var title = (doc.querySelector('.post-title') || {}).textContent || doc.title;

    var row = doc.createElement('div');
    row.className = 'post-share';

    var label = doc.createElement('span');
    label.className = 'share-label';
    label.textContent = '分享这篇';
    row.appendChild(label);

    function flash(btn, text) {
      var old = btn.textContent;
      btn.textContent = text;
      btn.classList.add('done');
      setTimeout(function () {
        btn.textContent = old;
        btn.classList.remove('done');
      }, 1600);
    }

    function copyLink(btn) {
      var done = function () { flash(btn, '链接已复制'); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(function () { fallbackCopy(url, done); });
      } else {
        fallbackCopy(url, done);
      }
    }

    var shareBtn = doc.createElement('button');
    shareBtn.type = 'button';
    shareBtn.className = 'share-btn';
    shareBtn.textContent = '分享';
    shareBtn.addEventListener('click', function () {
      if (navigator.share) {
        navigator.share({ title: title, url: url }).catch(function () { /* 用户取消 */ });
      } else {
        copyLink(shareBtn);
      }
    });
    row.appendChild(shareBtn);

    var linkBtn = doc.createElement('button');
    linkBtn.type = 'button';
    linkBtn.className = 'share-btn';
    linkBtn.textContent = '复制链接';
    linkBtn.addEventListener('click', function () { copyLink(linkBtn); });
    row.appendChild(linkBtn);

    var nav = article.querySelector('.post-nav');
    if (nav) {
      article.insertBefore(row, nav);
    } else {
      var related = article.querySelector('.post-related');
      if (related) article.insertBefore(row, related);
      else article.appendChild(row);
    }
  }

  ready(function () {
    initCodeBlocks();
    initHeadingAnchors();
    initImages();
    initBackToTop();
    initSearchShortcut();
    initExternalLinks();
    initProgressFallback();
    initTocFab();
    initShare();
  });
})();
