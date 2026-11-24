/* Glossary: index of every "WORDS AND SYMBOLS YOU NEED" entry, term links in lesson text, one popup.
   Short meanings come from the lesson html (one source). Extra detail comes from js/gloss5/6/7.js via UI.glossExtra. */
(function () {
  var UI = window.UI, h = UI.h;
  var TITLE = 'WORDS AND SYMBOLS YOU NEED';
  var extras = {};           // 'lessonId|term' -> { match, steps, ex, mix }
  var index = null;          // [{ key, lesson, order, mod, term, sym, short, match: [strings] }]
  var STOP = { and: 1, or: 1, not: 1, sum: 1, if: 1, then: 1, a: 1, i: 1 };

  UI.glossExtra = function (map) { Object.keys(map).forEach(function (k) { extras[k] = map[k]; }); };

  function strip(s) { return s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').trim(); }

  /* Parse one lesson's glossary block into entries (same regex as tmp/extract_gloss.js). */
  function parse(html) {
    var i = html.indexOf(TITLE), out = [];
    if (i < 0) return out;
    var end = html.indexOf('</div></div>', i);
    var block = html.slice(i, end > 0 ? end : i + 20000), re = /<p><b>([\s\S]*?)<\/b>([\s\S]*?)<\/p>/g, r;
    while ((r = re.exec(block))) {
      var rest = r[2], sym = '', mean;
      var mm = /^\s*\(([\s\S]*?)\)\s*:\s*([\s\S]*)$/.exec(rest);
      if (mm) { sym = mm[1]; mean = mm[2]; } else mean = rest.replace(/^\s*:\s*/, '');
      out.push({ term: strip(r[1]), sym: sym, short: mean.trim() });
    }
    return out;
  }

  function build() {
    index = [];
    UI.allLessons().forEach(function (x, order) {
      parse(x.l.html || '').forEach(function (e) {
        e.lesson = x.id; e.order = order; e.mod = x.m.id; e.key = x.id + '|' + e.term;
        var ext = extras[e.key] || {};
        var m = ext.nolink ? [] : [e.term];
        if (!ext.nolink && /^[a-z][a-z -]*[a-z]$/i.test(e.term) && !/s$/.test(e.term)) m.push(e.term + 's');
        (ext.match || []).forEach(function (s) { m.push(s); });
        e.match = m.filter(function (s) { s = s.trim(); return s && !/^[A-Za-z0-9]$/.test(s) && !STOP[s.toLowerCase()]; });
        e.ext = ext;
        index.push(e);
      });
    });
  }
  UI.glossIndex = function () { if (!index) build(); return index; };

  /* For a lesson, map each surface string to its entry: latest definition at or before the lesson,
     same module first, then earlier modules. */
  function lookup(lessonId) {
    var all = UI.allLessons(), cur = null;
    all.forEach(function (x, i) { if (x.id === lessonId) cur = { order: i, mod: x.m.id }; });
    var map = {}, mods = {};
    if (!cur) return map;
    // module preference: own module, then the module it builds on; P (practice) mixes all, so drop strings with rival meanings
    var pref = { 5: [5], 6: [6, 5], 7: [7, 5, 6] }[cur.mod];
    var rank = function (x) { var i = pref ? pref.indexOf(x.mod) : -1; return (i < 0 ? 0 : (pref.length - i) * 1e6) + x.order; };
    UI.glossIndex().forEach(function (e) {
      if (e.order > cur.order) return;
      e.match.forEach(function (s) {
        var k = keyOf(s), old = map[k];
        (mods[k] = mods[k] || {})[e.mod] = 1;
        if (!old || rank(e) >= rank(old)) map[k] = e;
      });
    });
    if (!pref) Object.keys(mods).forEach(function (k) { if (Object.keys(mods[k]).length > 1) delete map[k]; });
    return map;
  }

  /* Plain lowercase words match any capitalisation of the first letter; symbols and abbreviations match exactly. */
  function plain(s) { return /^[a-z][a-z' -]*$/.test(s); }
  function keyOf(s) { return plain(s) ? s.toLowerCase() : s; }

  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  var SKIP = 'A,BUTTON,INPUT,TEXTAREA,SELECT,CODE,PRE,H1,H2,H3,SCRIPT,STYLE,LABEL';

  /* Wrap term occurrences in text nodes under root. */
  function link(root, map) {
    var keys = Object.keys(map).sort(function (a, b) { return b.length - a.length; });
    if (!keys.length) return 0;
    var parts = keys.map(function (k) {
      var p = plain(k) ? '[' + k[0].toUpperCase() + k[0] + ']' + escRe(k.slice(1)) : escRe(k);
      if (/^[a-z]/i.test(k)) p = '(?<![A-Za-z])' + p;
      if (/[a-z]$/i.test(k)) p = p + '(?![A-Za-z])';
      return p;
    });
    var re = new RegExp(parts.join('|'), 'g'), n = 0;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (t) {
        for (var p = t.parentNode; p && p !== root; p = p.parentNode) {
          if (SKIP.split(',').indexOf(p.nodeName) >= 0) return NodeFilter.FILTER_REJECT;
          if (p.classList && (p.classList.contains('widget') || p.classList.contains('gl') || p.classList.contains('gblock') || p.classList.contains('opt') || p.classList.contains('nogloss'))) return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    var BLOCK = /^(P|LI|TD|TH|DIV|SECTION|ARTICLE)$/;
    // lesson body: one section per h2, so a term is underlined at its first mention in each section only;
    // elsewhere (problems, quiz) once per paragraph
    var sec = 0, secOf = new Map(), body = root.querySelector('.body');
    if (body) Array.prototype.forEach.call(body.children, function (el) { if (el.nodeName === 'H2') sec++; secOf.set(el, 'sec' + sec); });
    var seen = new Map();   // section or block -> { entry key: 1 }
    nodes.forEach(function (t) {
      var s = t.nodeValue; re.lastIndex = 0;
      var blk = t.parentNode, top = t.parentNode;
      while (top && top !== root && !secOf.has(top)) top = top.parentNode;
      while (blk && blk !== root && !BLOCK.test(blk.nodeName)) blk = blk.parentNode;
      if (top && secOf.has(top)) blk = secOf.get(top);
      if (!seen.has(blk)) seen.set(blk, {});
      var done = seen.get(blk);
      if (!re.test(s)) return;
      re.lastIndex = 0;
      var frag = document.createDocumentFragment(), last = 0, r;
      while ((r = re.exec(s))) {
        var e = map[keyOf(r[0])] || map[r[0].toLowerCase()];
        if (!e || done[e.key]) continue;
        done[e.key] = 1;
        if (r.index > last) frag.appendChild(document.createTextNode(s.slice(last, r.index)));
        frag.appendChild(h('span', { class: 'gl', tabindex: '0', 'data-k': e.key, text: r[0] }));
        last = r.index + r[0].length; n++;
      }
      if (last < s.length) frag.appendChild(document.createTextNode(s.slice(last)));
      t.parentNode.replaceChild(frag, t);
    });
    return n;
  }

  /* Replace the wall of cards with a compact table; each term opens the popup. */
  /* The glossary block stays in the lesson source as data for the popups; the reader never sees it.
     Terms are explained in the lesson text where they are first used, and underlined for re-lookup. */
  function dropBlock(root) {
    Array.prototype.forEach.call(root.querySelectorAll('.callout.idea'), function (box) {
      var t = box.querySelector('b.t');
      if (t && t.textContent === TITLE) box.parentNode.removeChild(box);
    });
  }

  // ---- popup
  var pop = null, pinned = false, timer = null;
  function byKey(k) { var r = null; UI.glossIndex().forEach(function (e) { if (e.key === k) r = e; }); return r; }
  function list(items) { return '<ol>' + items.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>'; }
  function fill(e, full) {
    var x = e.ext || {};
    var html = '<div class="gp-h"><b>' + UI.esc(e.term) + '</b>' + (e.sym ? ' <span class="gsym">' + e.sym + '</span>' : '') +
      '<a class="gp-from" href="#' + e.lesson + '">from ' + e.lesson + '</a></div>' +
      '<div class="gp-short">' + e.short + '</div>';
    if (full) {
      if (x.steps && x.steps.length) html += '<div class="gp-sec">Break it down</div>' + list(x.steps);
      if (x.ex && x.ex.length) html += '<div class="gp-sec">Examples</div>' + list(x.ex);
      if (x.mix) html += '<div class="gp-sec warn">Do not confuse</div><p>' + x.mix + '</p>';
      html += '<button class="ghost gp-x">Close</button>';
    } else if ((x.steps && x.steps.length) || (x.ex && x.ex.length)) html += '<div class="gp-more">Click for breakdown and examples</div>';
    pop.innerHTML = html;
    pop.classList.toggle('full', !!full);
  }
  function place(el) {
    pop.hidden = false;
    var r = el.getBoundingClientRect(), w = Math.min(420, window.innerWidth - 16);
    pop.style.width = w + 'px';
    var left = Math.max(8, Math.min(r.left, window.innerWidth - w - 8));
    pop.style.left = (left + window.scrollX) + 'px';
    var ph = pop.offsetHeight, below = r.bottom + 6, top = below;
    if (below + ph > window.innerHeight - 8) top = r.top - ph - 6 > 8 ? r.top - ph - 6 : window.innerHeight - ph - 8;
    pop.style.top = (Math.max(8, top) + window.scrollY) + 'px';
  }
  function show(el, full) {
    var e = byKey(el.getAttribute('data-k'));
    if (!e) return;
    fill(e, full); place(el); pinned = !!full;
  }
  function hide() { if (pop) { pop.hidden = true; pinned = false; } }
  UI.glossHide = hide;

  function ensurePop() {
    if (pop) return;
    pop = h('div', { id: 'gpop', role: 'dialog', hidden: 'hidden' });
    document.body.appendChild(pop);
    document.addEventListener('click', function (ev) {
      var t = ev.target.closest && ev.target.closest('.gl,.gterm');
      if (t) { ev.preventDefault(); show(t, true); return; }
      if (ev.target.closest && ev.target.closest('.gp-x')) { hide(); return; }
      if (!pop.contains(ev.target)) hide();
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') hide();
      if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.classList && ev.target.classList.contains('gl')) { ev.preventDefault(); show(ev.target, true); }
    });
    document.addEventListener('mouseover', function (ev) {
      var t = ev.target.closest && ev.target.closest('.gl,.gterm');
      clearTimeout(timer);
      if (t && !pinned) timer = setTimeout(function () { show(t, false); }, 220);
      else if (!t && !pinned && !(pop.contains(ev.target))) timer = setTimeout(hide, 250);
    });
    window.addEventListener('hashchange', hide);
  }

  /* Called by UI.renderLesson after widgets are in place. */
  UI.glossLink = function (root, lessonId) {
    ensurePop();
    dropBlock(root);
    return link(root, lookup(lessonId));
  };
})();
