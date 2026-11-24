/* Module 7 widgets: signature checker, scope, Herbrand, evaluation, entailment, grounding, substitution, unification. */
(function () {
  var UI = window.UI, KR = window.KR, h = UI.h;

  // "a, b, f/1, g/2" -> {a:0,b:0,f:1,g:2}
  function parseSyms(s) {
    var o = {};
    s.split(',').map(function (x) { return x.trim(); }).filter(Boolean).forEach(function (x) {
      var m = /^([A-Za-z0-9_]+)(?:\/(\d+))?$/.exec(x);
      if (!m) throw new Error('Cannot read "' + x + '". Write names like a or f/1.');
      o[m[1]] = m[2] ? parseInt(m[2], 10) : 0;
    });
    return o;
  }
  function sigFields(cfg, onChange) {
    var F = UI.field('Object and function constants (name/arity, arity 0 can be omitted)', cfg.funcs || 'a, b, f/1, g/2', onChange);
    var P = UI.field('Predicates (name/arity)', cfg.preds || 'p/1, q/2', onChange);
    return { F: F, P: P, el: h('div', { class: 'row' }, F.el, P.el),
      get: function () { return { funcs: parseSyms(F.get()), preds: parseSyms(P.get()) }; } };
  }
  function presetChips(items, apply) { return UI.chips(items.map(function (x) { return { label: x }; }), function (it) { apply(it.label); }); }

  // ---- 1. signature and syntax checker
  UI.widgets.syntax = function (box, cfg) {
    var out = h('div', { class: 'out' });
    var S = sigFields(cfg, render);
    var E = UI.field('Expression to check', cfg.expr || 'p(f(a))', render);
    function render() {
      out.innerHTML = '';
      var sig;
      try { sig = S.get(); } catch (e) { out.appendChild(UI.msg('bad', UI.esc(e.message))); return; }
      var r = KR.classifyExpr(E.get(), sig);
      if (r.kind === 'bad') out.appendChild(UI.msg('bad', 'Neither a term nor a sentence: ' + UI.esc(r.why) + '.'));
      else if (r.kind === 'term') out.appendChild(UI.msg('ok', 'A <b>term</b> (it names an object). ' + (r.ground ? 'It is ground: no variables.' : 'It contains variables, so it is not ground.')));
      else out.appendChild(UI.msg('ok', 'A <b>sentence</b> (it can be true or false). ' + (r.ground ? 'It is ground.' : 'It contains variables.') + (r.free.length ? ' Free variables: ' + UI.esc(r.free.join(', ')) + ' (open sentence).' : ' No free variables (closed).')));
    }
    box.appendChild(S.el); box.appendChild(E.el);
    if (cfg.presets) box.appendChild(presetChips(cfg.presets, function (s) { E.inp.value = s; render(); }));
    box.appendChild(out); render();
  };

  // ---- 2. scope, free and bound
  UI.widgets.scope = function (box, cfg) {
    var out = h('div', { class: 'out' });
    var E = UI.field('Sentence', cfg.expr || 'forall x. p(x) & exists x. q(x,y)', render);
    function render() {
      out.innerHTML = '';
      var r = UI.safeParse(E.get());
      if (r.err) { out.appendChild(UI.msg('bad', UI.esc(r.err))); return; }
      var rows = [], qn = 0;
      (function walk(f, env) {
        if (f.t === 'atom') {
          var seen = [];
          f.args.forEach(function (a) { KR.termVars(a, []).forEach(function (v) { if (seen.indexOf(v) < 0) seen.push(v); }); });
          seen.forEach(function (v) { rows.push([KR.atomStr(f), v, env[v] ? 'bound to ' + env[v] : 'free']); });
        } else if (f.t === 'all' || f.t === 'ex') {
          var e2 = Object.assign({}, env); e2[f.v] = (f.t === 'all' ? '∀' : '∃') + f.v + ' (quantifier ' + (++qn) + ')'; walk(f.a, e2);
        } else if (f.t === 'not') walk(f.a, env);
        else { walk(f.a, env); walk(f.b, env); }
      })(r.f, {});
      out.appendChild(h('p', { html: 'Read with the scope reaching as far right as possible: <span class="m">' + UI.esc(KR.fmt(r.f)) + '</span>' }));
      out.appendChild(UI.table(['in atom', 'variable', 'status'], rows));
      var free = KR.freeVars(r.f);
      out.appendChild(UI.msg(free.length ? 'warn' : 'ok', free.length ? 'Free variables: <b>' + UI.esc(free.join(', ')) + '</b>. The sentence is <b>open</b>. By convention they are universally quantified: closing gives <span class="m">' + UI.esc(KR.fmt(KR.closeUniversal(r.f))) + '</span>.' : 'No free variables: the sentence is <b>closed</b>.'));
    }
    box.appendChild(E.el);
    if (cfg.presets) box.appendChild(presetChips(cfg.presets, function (s) { E.inp.value = s; render(); }));
    box.appendChild(out); render();
  };

  // ---- 3. Herbrand universe and base
  UI.widgets.herbrand = function (box, cfg) {
    var out = h('div', { class: 'out' });
    var S = sigFields({ funcs: cfg.funcs || '0, 1, 2, 3', preds: cfg.preds || 'even/1, odd/1' }, render);
    var depth = 2, dsl = h('input', { type: 'range', min: '0', max: '3', step: '1', value: '2' });
    var dl = h('span', { class: 'm', text: 'depth 2' });
    dsl.addEventListener('input', function () { depth = parseInt(dsl.value, 10); dl.textContent = 'depth ' + depth; render(); });
    function render() {
      out.innerHTML = '';
      var sig;
      try { sig = S.get(); } catch (e) { out.appendChild(UI.msg('bad', UI.esc(e.message))); return; }
      var hu = KR.herbrandUniverse(sig, depth), hb = KR.herbrandBase(sig, depth);
      var sh = hu.terms.slice(0, 40).map(KR.termStr);
      out.appendChild(h('p', { html: '<b>Herbrand universe HU</b> (all ground terms)' + (hu.infinite ? ', cut at nesting depth ' + depth + ' because it is infinite' : '') + ': <span class="m">{' + UI.esc(sh.join(', ')) + (hu.terms.length > 40 ? ', …' : '') + (hu.infinite ? ', …' : '') + '}</span>' }));
      if (hb.infinite) out.appendChild(UI.msg('info', '<b>HB is infinite</b>, so the set I of truth assignments is uncountable. The shown universe is only a window.'));
      else {
        var n = hb.atoms.length;
        out.appendChild(h('p', { html: '<b>Herbrand base HB</b> (all ground atoms), ' + n + ' atom(s): <span class="m">' + UI.esc(hb.atoms.slice(0, 30).map(KR.atomStr).join(', ')) + (n > 30 ? ', …' : '') + '</span>' }));
        out.appendChild(UI.msg('ok', 'Number of truth assignments |I| = 2<sup>' + n + '</sup> = <b>' + (n <= 52 ? String(Math.pow(2, n)) : '2^' + n) + '</b>.'));
      }
    }
    box.appendChild(S.el);
    box.appendChild(h('div', { class: 'row' }, h('label', { text: 'nesting depth shown ' }), dsl, dl));
    box.appendChild(out); render();
  };

  // ---- 4. evaluating quantified sentences under an assignment
  UI.widgets.evalh = function (box, cfg) {
    var sig = { funcs: parseSyms(cfg.funcs || 'a, b'), preds: parseSyms(cfg.preds || 'p/1, q/2') };
    var hb = KR.herbrandBase(sig, 0), hu = KR.herbrandUniverse(sig, 0).terms;
    var I = {}; hb.atoms.forEach(function (a) { I[KR.atomStr(a)] = (cfg.init || {})[KR.atomStr(a)] ? 1 : 0; });
    var tog = h('div', { class: 'chips' }), out = h('div', { class: 'out' });
    var E = UI.field('Sentence (free variables are read as universally quantified)', cfg.expr || 'forall x. (p(x) -> q(x,x))', render);
    function draw() {
      tog.innerHTML = '';
      hb.atoms.forEach(function (a) {
        var k = KR.atomStr(a);
        tog.appendChild(h('button', { class: 'toggle ' + (I[k] ? 't1' : 't0'), text: k + ' = ' + I[k], onclick: function () { I[k] = I[k] ? 0 : 1; draw(); render(); } }));
      });
    }
    function render() {
      out.innerHTML = '';
      var r = UI.safeParse(E.get());
      if (r.err) { out.appendChild(UI.msg('bad', UI.esc(r.err))); return; }
      var errs = []; if (!KR.checkSentence(r.f, sig, errs)) { out.appendChild(UI.msg('bad', UI.esc(errs[0]))); return; }
      var closed = KR.closeUniversal(r.f);
      var ex = KR.expandAll(closed, hu);
      out.appendChild(h('p', { html: 'Closed form: <span class="m">' + UI.esc(KR.fmt(closed)) + '</span><br>All quantifiers replaced by instances over HU = {' + UI.esc(hu.map(KR.termStr).join(', ')) + '}:<br><span class="m">' + UI.esc(KR.fmt(ex)) + '</span>' }));
      var v = KR.evalH(r.f, I, hu);
      out.appendChild(UI.msg(v ? 'ok' : 'bad', 'Under this assignment the sentence is <b>' + (v ? 'true' : 'false') + '</b>.'));
    }
    box.appendChild(h('p', { text: 'Click atoms to flip their truth value in the assignment i.' }));
    box.appendChild(tog); box.appendChild(E.el);
    if (cfg.presets) box.appendChild(presetChips(cfg.presets, function (s) { E.inp.value = s; render(); }));
    box.appendChild(out); draw(); render();
  };

  // ---- 5. entailment over a finite Herbrand base (checks all assignments)
  UI.widgets.fentail = function (box, cfg) {
    var out = h('div', { class: 'out' });
    var C = UI.field('Constants', cfg.funcs || 'a, b', render), P = UI.field('Predicates (name/arity)', cfg.preds || 'p/1, q/2', render);
    var D = UI.field('Knowledge base Δ (one sentence per line)', (cfg.delta || []).join('\n'), render, true);
    var G = UI.field('Question φ', cfg.phi || '', render);
    function render() {
      out.innerHTML = '';
      var sig;
      try { sig = { funcs: parseSyms(C.get()), preds: parseSyms(P.get()) }; } catch (e) { out.appendChild(UI.msg('bad', UI.esc(e.message))); return; }
      var hb = KR.herbrandBase(sig, 0), hu = KR.herbrandUniverse(sig, 0).terms, n = hb.atoms.length;
      if (n > 16) { out.appendChild(UI.msg('warn', '|HB| = ' + n + ' gives 2^' + n + ' assignments, too many to list. Use at most 16 ground atoms.')); return; }
      var ds = [], g;
      try {
        UI.lines(D.get()).forEach(function (s, i) { var r = UI.safeParse(s); if (r.err) throw new Error('Sentence ' + (i + 1) + ': ' + r.err); ds.push(r.f); });
        var gr = UI.safeParse(G.get()); if (gr.err) throw new Error('Question: ' + gr.err); g = gr.f;
      } catch (e) { out.appendChild(UI.msg('bad', UI.esc(e.message))); return; }
      var errs = [];
      var all = ds.concat([g]);
      for (var k = 0; k < all.length; k++) if (!KR.checkSentence(all[k], sig, errs)) { out.appendChild(UI.msg('bad', UI.esc(errs[0]))); return; }
      var names = hb.atoms.map(KR.atomStr), models = 0, counter = null;
      for (var m = 0; m < (1 << n); m++) {
        var I = {}; names.forEach(function (nm, i) { I[nm] = (m >> i) & 1; });
        if (ds.every(function (d) { return KR.evalH(d, I, hu); })) {
          models++;
          if (!KR.evalH(g, I, hu) && !counter) counter = I;
        }
      }
      out.appendChild(h('p', { html: '|HB| = ' + n + ', so ' + (1 << n) + ' truth assignments; <b>' + models + '</b> of them are models of Δ.' }));
      if (!counter) out.appendChild(UI.msg('ok', 'Δ ⊨ φ: every model of Δ makes φ true' + (models === 0 ? ' (Δ has no model, so this is vacuous)' : '') + '.'));
      else out.appendChild(UI.msg('bad', 'Δ ⊭ φ. Counter-model: true atoms = {' + UI.esc(names.filter(function (nm) { return counter[nm]; }).join(', ')) + '}; it satisfies Δ but not φ.'));
    }
    box.appendChild(h('div', { class: 'row' }, C.el, P.el)); box.appendChild(D.el); box.appendChild(G.el);
    if (cfg.presets) box.appendChild(UI.chips(cfg.presets, function (it) {
      if (it.funcs) C.inp.value = it.funcs; if (it.preds) P.inp.value = it.preds;
      D.inp.value = it.delta.join('\n'); G.inp.value = it.phi; render();
    }));
    box.appendChild(out); render();
  };

  // ---- 6. grounding for finite Herbrand logic
  UI.widgets.ground = function (box, cfg) {
    var out = h('div', { class: 'out' });
    var C = UI.field('Constants (finite, no functions)', cfg.consts || 'a, b', render);
    var D = UI.field('Sentences (one per line)', (cfg.delta || []).join('\n'), render, true);
    function render() {
      out.innerHTML = '';
      var consts = C.get().split(',').map(function (x) { return x.trim(); }).filter(Boolean), ss = [];
      try { UI.lines(D.get()).forEach(function (s, i) { var r = UI.safeParse(s); if (r.err) throw new Error('Sentence ' + (i + 1) + ': ' + r.err); ss.push(r.f); }); }
      catch (e) { out.appendChild(UI.msg('bad', UI.esc(e.message))); return; }
      if (!consts.length) { out.appendChild(UI.msg('bad', 'Give at least one constant.')); return; }
      var res = KR.ground(ss, consts);
      out.appendChild(UI.table(['sentence being processed', 'action'], res.steps.map(function (s) { return [h('span', { class: 'm', text: KR.fmt(s.f) }), s.action]; })));
      out.appendChild(h('p', { html: 'Γ (ground sentences): <span class="m">' + UI.esc(res.gamma.map(KR.fmt).join(' ;  ')) + '</span>' }));
      out.appendChild(UI.msg('ok', 'As propositional sentences: <span class="m">' + UI.esc(res.prop.map(KR.fmt).join(' ;  ')) + '</span>'));
    }
    box.appendChild(C.el); box.appendChild(D.el);
    if (cfg.presets) box.appendChild(UI.chips(cfg.presets, function (it) { C.inp.value = it.consts; D.inp.value = it.delta.join('\n'); render(); }));
    box.appendChild(out); render();
  };

  // ---- 7. substitution: apply and compose
  function splitTop(s) {
    var out = [], d = 0, cur = '';
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      if (c === '(') d++; if (c === ')') d--;
      if (c === ',' && d === 0) { out.push(cur); cur = ''; } else cur += c;
    }
    if (cur.trim()) out.push(cur);
    return out.map(function (x) { return x.trim(); }).filter(Boolean);
  }
  function parseSubst(s) {
    var o = {}; s = s.replace(/^\s*\{|\}\s*$/g, '');
    splitTop(s).forEach(function (p) {
      var m = /^(\S+?)\s*(?:<-|←)\s*(.+)$/.exec(p);
      if (!m) throw new Error('Write replacements as x <- term, separated by commas.');
      if (!KR.isVarName(m[1])) throw new Error(m[1] + ' is not a variable name.');
      o[m[1]] = KR.parseTerm(m[2]);
    });
    return o;
  }
  UI.widgets.subst = function (box, cfg) {
    var out = h('div', { class: 'out' });
    var E = UI.field('Expression', cfg.expr || 'r(x, y, z)', render);
    var A = UI.field('σ', cfg.sigma || '{x <- a, y <- f(u), z <- v}', render), B = UI.field('τ', cfg.tau || '{u <- d, v <- e, z <- g}', render);
    function render() {
      out.innerHTML = '';
      try {
        var e = KR.parseTerm(E.get()), s = parseSubst(A.get()), t = parseSubst(B.get());
        var es = KR.applyT(e, s), est = KR.applyT(es, t), st = KR.compose(s, t), e2 = KR.applyT(e, st);
        out.appendChild(UI.table(null, [
          ['Eσ (apply σ)', h('span', { class: 'm', text: KR.termStr(es) })],
          ['(Eσ)τ (then apply τ)', h('span', { class: 'm', text: KR.termStr(est) })],
          ['στ (composition)', h('span', { class: 'm', text: KR.substStr(st) })],
          ['E(στ) (apply the composition once)', h('span', { class: 'm', text: KR.termStr(e2) })]]));
        out.appendChild(UI.msg(KR.termStr(est) === KR.termStr(e2) ? 'ok' : 'bad', KR.termStr(est) === KR.termStr(e2) ? 'The last two rows agree: (Eσ)τ = E(στ), as the lemma says.' : 'The rows differ.'));
      } catch (er) { out.appendChild(UI.msg('bad', UI.esc(er.message))); }
    }
    box.appendChild(E.el); box.appendChild(h('div', { class: 'row' }, A.el, B.el)); box.appendChild(out); render();
  };

  // ---- 8. unification with trace
  UI.widgets.unifier = function (box, cfg) {
    var out = h('div', { class: 'out' });
    var A = UI.field('Expression 1', cfg.a || 'p(x, b)', render), B = UI.field('Expression 2', cfg.b || 'p(a, y)', render);
    function render() {
      out.innerHTML = '';
      try {
        var a = KR.parseTerm(A.get()), b = KR.parseTerm(B.get()), trace = [];
        var th = KR.unifyTerms(a, b, {}, trace, 0);
        out.appendChild(h('div', { class: 'trace' }, trace.map(function (t) { return h('div', { style: 'padding-left:' + (t.d * 18) + 'px', class: 'm', text: t.s }); })));
        if (th) {
          out.appendChild(UI.msg('ok', 'Unifiable. mgu θ = <span class="m">' + UI.esc(KR.substStr(th)) + '</span>. Both become <span class="m">' + UI.esc(KR.termStr(KR.applyT(a, th))) + '</span>.'));
        } else out.appendChild(UI.msg('bad', 'Not unifiable.'));
      } catch (er) { out.appendChild(UI.msg('bad', UI.esc(er.message))); }
    }
    box.appendChild(h('div', { class: 'row' }, A.el, B.el));
    if (cfg.presets) box.appendChild(UI.chips(cfg.presets, function (it) { A.inp.value = it.a; B.inp.value = it.b; render(); }));
    box.appendChild(out); render();
  };

  // propositional blow-up for a symmetric relation
  UI.widgets.pairblow = function (box) {
    var out = h('div', { class: 'out' });
    var inp = h('input', { type: 'range', min: '2', max: '50', step: '1', value: '5' });
    function draw() {
      var n = parseInt(inp.value, 10);
      out.innerHTML = '';
      out.appendChild(UI.msg('info', 'People: <b>' + n + '</b>. Atoms knows(x,y) for ordered pairs: <b>' + n * n + '</b>. Implications (x ≠ y): <b>' + n * (n - 1) + '</b>. Predicate logic: <b>1</b> sentence.'));
    }
    inp.addEventListener('input', draw);
    box.appendChild(h('div', { class: 'row' }, h('label', { text: 'number of people ' }), inp));
    box.appendChild(out); draw();
  };
})();
