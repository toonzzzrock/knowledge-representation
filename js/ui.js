/* UI core: DOM helper, widget registry, quiz, lesson registry and renderer. */
(function (root) {
  var UI = root.UI = { widgets: {}, modules: [], errors: [] };

  window.addEventListener('error', function (e) {
    UI.errors.push(e.message + ' @' + (e.filename || '').split('/').pop() + ':' + e.lineno);
    var box = document.getElementById('js-errors');
    if (box) { box.hidden = false; box.textContent = 'JS-ERROR ' + UI.errors.join(' | '); }
  });

  UI.h = function (tag, attrs) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k === 'text') e.textContent = v;
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) e.setAttribute(k, v);
    });
    for (var i = 2; i < arguments.length; i++) add(e, arguments[i]);
    return e;
  };
  function add(e, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) c.forEach(function (x) { add(e, x); });
    else e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  UI.esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  // ---- progress storage
  var KEY = 'kr-final-done-v1';
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } }
  UI.done = load();
  UI.markDone = function (id) {
    UI.done[id] = 1;
    try { localStorage.setItem(KEY, JSON.stringify(UI.done)); } catch (e) { /* storage unavailable */ }
    if (UI.onProgress) UI.onProgress();
  };

  // ---- registry
  UI.addModule = function (m) { UI.modules.push(m); };
  UI.allLessons = function () {
    var out = [];
    UI.modules.forEach(function (m) { m.lessons.forEach(function (l) { out.push({ m: m, l: l, id: m.id + '.' + l.n }); }); });
    return out;
  };

  // ---- quiz
  UI.quiz = function (lessonId, qs) {
    var wrap = UI.h('div', { class: 'quiz' }, UI.h('h2', { text: 'Check yourself' }));
    var right = {};
    qs.forEach(function (q, qi) {
      var box = UI.h('div', { class: 'q' });
      box.appendChild(UI.h('div', { html: '<b>' + (qi + 1) + '.</b> ' + q.q }));
      var whyBox = UI.h('div', { class: 'why' });
      q.o.forEach(function (op) {
        var b = UI.h('button', { class: 'opt', html: op.t });
        b.addEventListener('click', function () {
          b.classList.add(op.ok ? 'ok' : 'no');
          whyBox.innerHTML = (op.ok ? 'Correct. ' : 'Not correct. ') + (op.why || '');
          if (op.ok) { right[qi] = 1; if (Object.keys(right).length === qs.length) UI.markDone(lessonId); }
        });
        box.appendChild(b);
      });
      box.appendChild(whyBox);
      wrap.appendChild(box);
    });
    return wrap;
  };

  // ---- lesson renderer: html string with {{w:name|json}} widget placeholders
  UI.renderLesson = function (mod, les) {
    var id = mod.id + '.' + les.n;
    var main = UI.h('article', { class: 'lesson' });
    main.appendChild(UI.h('div', { class: 'pill', text: (mod.label || 'Module ' + mod.id) + ' · ' + (mod.unit || 'step') + ' ' + les.n }));
    main.appendChild(UI.h('h1', { text: les.title }));
    if (les.sub) main.appendChild(UI.h('p', { class: 'sub', text: les.sub }));
    var body = UI.h('div', { class: 'body' });
    body.innerHTML = les.html.replace(/\{\{w:(\w+)(?:\|([\s\S]*?))?\}\}(?!\})/g, function (_, name, cfg) {
      return '<div class="widget-slot" data-w="' + name + '" data-cfg="' + UI.esc(cfg || '{}') + '"></div>';
    });
    main.appendChild(body);
    // "In this section": jump list of the lesson's h2 parts (buttons, since the hash is the router)
    var parts = body.querySelectorAll(':scope > h2');
    if (parts.length >= 3) {
      var toc = UI.h('nav', { class: 'toc' }, UI.h('b', { text: 'In this lesson' }));
      Array.prototype.forEach.call(parts, function (h2, i) {
        toc.appendChild(UI.h('button', { class: 'tocl', text: (i + 1) + '. ' + h2.textContent, onclick: function () { h2.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }));
      });
      main.insertBefore(toc, body);
    }
    Array.prototype.forEach.call(body.querySelectorAll('.widget-slot'), function (slot) {
      var name = slot.getAttribute('data-w'), cfg = JSON.parse(slot.getAttribute('data-cfg'));
      var fn = UI.widgets[name];
      var box = UI.h('div', { class: 'widget' });
      if (!fn) { box.textContent = 'Missing widget: ' + name; slot.replaceWith(box); return; }
      if (cfg.title) box.appendChild(UI.h('div', { class: 'wt', text: cfg.title }));
      slot.replaceWith(box);
      fn(box, cfg);
    });
    if (les.problems && les.problems.length) {
      var seen = {};
      les.problems.forEach(function (p, i) {
        main.appendChild(UI.problem(p, i + 1, function () {
          seen[i] = 1;
          if (Object.keys(seen).length === les.problems.length) UI.markDone(id);
        }));
      });
    }
    if (les.quiz && les.quiz.length) main.appendChild(UI.quiz(id, les.quiz));
    if (UI.glossLink) UI.glossLink(main, id);
    return main;
  };

  // ---- practice problem: statement, hint, step-by-step solution, answer, explanation, common mistake, optional tool
  UI.problem = function (p, num, onReveal) {
    var h = UI.h, card = h('section', { class: 'problem' + (p.mod && p.mod <= 4 ? ' nogloss' : '') });
    card.appendChild(h('div', { class: 'ph' }, h('span', { class: 'tag warn', text: p.label || 'Problem ' + num }),
      h('span', { class: 'tag', text: p.marks ? p.marks + ' marks' : (p.level || 'hard') }),
      p.mod ? h('span', { class: 'tag', text: 'module ' + p.mod }) : null, h('b', { text: ' ' + p.title })));
    card.appendChild(h('div', { class: 'pq', html: p.q }));
    var hint = h('div', { class: 'callout idea', hidden: 'hidden', html: '<b class="t">HINT</b>' + p.hint });
    var sol = h('div', { class: 'psol', hidden: 'hidden' });
    var html = '<h3>Solution, step by step</h3><div class="flow">' + p.steps.map(function (s) { return '<div class="fs">' + s + '</div>'; }).join('') + '</div>' +
      '<div class="big">' + p.answer + '<small>answer</small></div>' +
      (p.vis && p.vis.length && UI.vis ? '<h3>The answer as a picture</h3>' + p.vis.map(UI.vis).join('') : '') +
      '<div class="callout remember"><b class="t">WHY THIS WORKS</b>' + p.why + '</div>' +
      (p.mistake ? '<div class="callout warn"><b class="t">COMMON MISTAKE</b>' + p.mistake + '</div>' : '') +
      (p.paperSays ? '<div class="callout warn"><b class="t">THE ANSWER WRITTEN ON THE PRACTICE PAPER</b>' + p.paperSays + '</div>' : '');
    sol.innerHTML = html;
    if (p.tryit) {
      var tb = h('div', { class: 'widget' }), fn = UI.widgets[p.tryit.w];
      if (p.tryit.cfg && p.tryit.cfg.title) tb.appendChild(h('div', { class: 'wt', text: p.tryit.cfg.title }));
      sol.appendChild(h('p', { html: p.tryit.say || 'Check the answer in the tool:' }));
      sol.appendChild(tb);
      var built = false;
      card._build = function () { if (!built && fn) { built = true; fn(tb, p.tryit.cfg || {}); } };
    }
    var bh = h('button', { class: 'ghost', text: 'Show hint', onclick: function () { hint.hidden = !hint.hidden; bh.textContent = hint.hidden ? 'Show hint' : 'Hide hint'; } });
    var bs = h('button', { class: 'solid', text: 'Reveal solution', onclick: function () {
      sol.hidden = !sol.hidden; bs.textContent = sol.hidden ? 'Reveal solution' : 'Hide solution';
      if (!sol.hidden) { if (card._build) card._build(); if (onReveal) onReveal(); }
    } });
    card.appendChild(h('div', { class: 'row' }, bh, bs));
    card.appendChild(hint); card.appendChild(sol);
    return card;
  };
})(window);
