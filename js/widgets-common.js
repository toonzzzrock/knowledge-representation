/* Shared widget helpers and the logic tools used by several lessons. */
(function () {
  var UI = window.UI, KR = window.KR, h = UI.h;

  // ---------- helpers ----------
  UI.msg = function (kind, text) { return h('div', { class: 'msg ' + kind, html: text }); };
  UI.field = function (label, value, onChange, multi) {
    var inp = multi ? h('textarea', { spellcheck: 'false' }) : h('input', { type: 'text', spellcheck: 'false' });
    inp.value = value;
    inp.addEventListener('input', function () { onChange(inp.value); });
    var wrap = h('div', { class: 'grow' }, label ? h('label', { text: label }) : null, inp);
    return { el: wrap, inp: inp, get: function () { return inp.value; }, set: function (v) { inp.value = v; onChange(v); } };
  };
  UI.chips = function (items, onPick) {
    return h('div', { class: 'chips' }, items.map(function (it) {
      return h('button', { class: 'ghost', text: it.label, onclick: function () { onPick(it); } });
    }));
  };
  UI.table = function (head, rows, cls) {
    var t = h('table', cls ? { class: cls } : null);
    if (head) t.appendChild(h('tr', null, head.map(function (x) { return h('th', typeof x === 'object' ? x : { text: x }); })));
    rows.forEach(function (r) {
      t.appendChild(h('tr', r.cls ? { class: r.cls } : null, (r.cells || r).map(function (c) {
        return typeof c === 'object' && c !== null && !(c instanceof Node) ? h('td', c) : h('td', null, c);
      })));
    });
    return h('div', { class: 'scroll' }, t);
  };
  UI.safeParse = function (s) { try { return { f: KR.parse(s) }; } catch (e) { return { err: e.message }; } };
  function lines(s) { return s.split('\n').map(function (x) { return x.trim(); }).filter(Boolean); }
  UI.lines = lines;
  function bit(x) { return { class: x ? 't1' : 't0', text: x ? 'T' : 'F' }; }
  UI.bit = bit;
  UI.m = function (s) { return h('span', { class: 'm', text: s }); };

  // ---------- parse tree ----------
  function treeLines(f, prefix, last, isRoot, out) {
    var label;
    switch (f.t) {
      case 'atom': label = KR.atomStr(f); break;
      case 'not': label = '¬'; break;
      case 'and': label = '∧'; break; case 'or': label = '∨'; break;
      case 'imp': label = '→'; break; case 'iff': label = '↔'; break;
      case 'all': label = '∀' + f.v; break; case 'ex': label = '∃' + f.v; break;
    }
    out.push(isRoot ? label : prefix + (last ? '└─ ' : '├─ ') + label);
    var kids = f.t === 'atom' ? [] : (f.b ? [f.a, f.b] : [f.a]);
    var np = isRoot ? '' : prefix + (last ? '   ' : '│  ');
    kids.forEach(function (k, i) { treeLines(k, np, i === kids.length - 1, false, out); });
    return out;
  }
  UI.treeText = function (f) { return treeLines(f, '', true, true, []).join('\n'); };

  UI.widgets.parsetree = function (box, cfg) {
    var out = h('div', { class: 'out' });
    var fld = UI.field('Formula (use ¬ ∧ ∨ → ↔, or ~ & | -> <->)', cfg.formula || 'p -> (q & ~r)', render);
    function render() {
      out.innerHTML = '';
      var r = UI.safeParse(fld.get());
      if (r.err) { out.appendChild(UI.msg('bad', 'Not a formula: ' + UI.esc(r.err))); return; }
      var atoms = KR.atomsOf(r.f, []);
      out.appendChild(h('div', { class: 'tree', text: UI.treeText(r.f) }));
      out.appendChild(h('p', { html: 'Fully read as: <span class="m">' + UI.esc(KR.fmt(r.f)) + '</span><br>Atoms: <span class="m">' + atoms.map(UI.esc).join(', ') + '</span> (' + atoms.length + ' atoms, so ' + Math.pow(2, atoms.length) + ' truth assignments).' }));
    }
    box.appendChild(fld.el); box.appendChild(out);
    if (cfg.presets) box.insertBefore(UI.chips(cfg.presets.map(function (p) { return { label: p }; }), function (it) { fld.set(it.label); fld.inp.value = it.label; }), out);
    render();
  };

  // ---------- evaluate under an assignment, bottom up ----------
  UI.widgets.evaltree = function (box, cfg) {
    var I = {}, out = h('div', { class: 'out' }), togg = h('div', { class: 'chips' });
    var fld = UI.field('Formula', cfg.formula || '(p | q) & (~q | r)', render);
    (cfg.init || { p: 1, q: 0, r: 1 });
    var init = cfg.init || { p: 1, q: 0, r: 1 };
    Object.keys(init).forEach(function (k) { I[k] = init[k]; });
    function sub(f, acc) {
      if (f.t !== 'atom') { if (f.a) sub(f.a, acc); if (f.b) sub(f.b, acc); }
      acc.push(f); return acc;
    }
    function render() {
      out.innerHTML = ''; togg.innerHTML = '';
      var r = UI.safeParse(fld.get());
      if (r.err) { out.appendChild(UI.msg('bad', 'Not a formula: ' + UI.esc(r.err))); return; }
      var atoms = KR.atomsOf(r.f, []);
      atoms.forEach(function (a) { if (I[a] === undefined) I[a] = 0; });
      atoms.forEach(function (a) {
        togg.appendChild(h('button', { class: I[a] ? 'solid' : 'ghost', text: a + ' = ' + (I[a] ? 1 : 0), onclick: function () { I[a] = I[a] ? 0 : 1; render(); } }));
      });
      var seen = {}, rows = [];
      sub(r.f, []).forEach(function (g) {
        var s = KR.fmt(g); if (seen[s]) return; seen[s] = 1;
        rows.push([UI.m(s), UI.bit(KR.evalProp(g, I))]);
      });
      out.appendChild(UI.table(['Subformula (smallest first)', 'Value'], rows));
      var v = KR.evalProp(r.f, I);
      out.appendChild(UI.msg(v ? 'ok' : 'bad', 'Under this assignment the whole formula is <b>' + (v ? 'true, so it is a model of the formula' : 'false, so it is not a model') + '</b>.'));
    }
    box.appendChild(h('p', { text: 'Click an atom to flip its value. The table evaluates the formula bottom-up, exactly like the recursive definition.' }));
    box.appendChild(fld.el); box.appendChild(togg); box.appendChild(out); render();
  };

  // ---------- truth table / classification / equivalence ----------
  UI.widgets.proptable = function (box, cfg) {
    var out = h('div', { class: 'out' });
    var fld = UI.field(cfg.multi ? 'Sentences (one per line). Rows where every sentence is true are the models.' : 'Formula', cfg.multi ? (cfg.formulas || []).join('\n') : (cfg.formula || 'p -> q'), render, !!cfg.multi);
    function render() {
      out.innerHTML = '';
      var src = cfg.multi ? lines(fld.get()) : [fld.get()], fs = [];
      for (var i = 0; i < src.length; i++) {
        var r = UI.safeParse(src[i]);
        if (r.err) { out.appendChild(UI.msg('bad', 'Line ' + (i + 1) + ' is not a formula: ' + UI.esc(r.err))); return; }
        fs.push(r.f);
      }
      if (!fs.length) return;
      var tt = KR.truthTable(fs);
      if (tt.atoms.length > 6) { out.appendChild(UI.msg('warn', 'Too many atoms (' + tt.atoms.length + ') to show a table. Use at most 6.')); return; }
      var head = tt.atoms.concat(src.map(function (_, i) { return cfg.multi ? 'S' + (i + 1) : 'value'; }));
      var models = 0;
      var rows = tt.rows.map(function (r) {
        var all = r.vals.every(Boolean); if (all) models++;
        var cells = tt.atoms.map(function (a) { return { class: 'c', text: r.i[a] ? '1' : '0' }; }).concat(r.vals.map(UI.bit));
        return { cls: all ? 'sel' : '', cells: cells };
      });
      out.appendChild(UI.table(head, rows));
      if (cfg.multi) out.appendChild(UI.msg(models ? 'info' : 'bad', 'Number of models: <b>' + models + '</b> of ' + tt.rows.length + ' assignments' + (models ? '' : '. No model, so the set is unsatisfiable.')));
      else {
        var c = KR.classify(fs[0]);
        var kind = c.valid ? 'valid (true under every assignment)' : c.unsat ? 'unsatisfiable (true under none)' : 'contingent (true under some, false under others)';
        out.appendChild(UI.msg('info', 'Models: <b>' + c.models + '</b> of ' + c.total + '. The formula is <b>' + kind + '</b>. It is ' + (c.unsat ? 'not ' : '') + 'satisfiable and ' + (c.valid ? 'not ' : '') + 'falsifiable.'));
      }
    }
    box.appendChild(fld.el);
    if (cfg.presets) box.appendChild(UI.chips(cfg.presets.map(function (p) { return { label: p }; }), function (it) { fld.inp.value = it.label; render(); }));
    box.appendChild(out); render();
  };

  UI.widgets.equiv = function (box, cfg) {
    var out = h('div', { class: 'out' });
    var A = UI.field('Formula A', cfg.a || 'p -> q', render), B = UI.field('Formula B', cfg.b || '~p | q', render);
    function render() {
      out.innerHTML = '';
      var ra = UI.safeParse(A.get()), rb = UI.safeParse(B.get());
      if (ra.err || rb.err) { out.appendChild(UI.msg('bad', 'Check the syntax: ' + UI.esc(ra.err || rb.err))); return; }
      var tt = KR.truthTable([ra.f, rb.f]);
      if (tt.atoms.length > 6) { out.appendChild(UI.msg('warn', 'Use at most 6 atoms.')); return; }
      var diff = tt.rows.filter(function (r) { return r.vals[0] !== r.vals[1]; });
      var rows = tt.rows.map(function (r) {
        return { cls: r.vals[0] !== r.vals[1] ? 'sel' : '', cells: tt.atoms.map(function (a) { return { class: 'c', text: r.i[a] ? '1' : '0' }; }).concat([UI.bit(r.vals[0]), UI.bit(r.vals[1])]) };
      });
      out.appendChild(UI.table(tt.atoms.concat(['A', 'B']), rows));
      out.appendChild(UI.msg(diff.length ? 'bad' : 'ok', diff.length ? 'Not equivalent: the highlighted rows are assignments where A and B differ, so M(A) ≠ M(B).' : 'Equivalent: M(A) = M(B), every assignment gives the same value.'));
    }
    box.appendChild(h('div', { class: 'row' }, A.el, B.el)); box.appendChild(out); render();
  };

  // ---------- entailment ----------
  UI.widgets.entail = function (box, cfg) {
    var out = h('div', { class: 'out' });
    var D = UI.field('Knowledge base Δ (one sentence per line)', (cfg.delta || []).join('\n'), render, true);
    var G = UI.field('Question φ', cfg.phi || 'q', render);
    function render() {
      out.innerHTML = '';
      var ds = lines(D.get()), fs = [];
      for (var i = 0; i < ds.length; i++) { var r = UI.safeParse(ds[i]); if (r.err) { out.appendChild(UI.msg('bad', 'Δ line ' + (i + 1) + ': ' + UI.esc(r.err))); return; } fs.push(r.f); }
      var g = UI.safeParse(G.get()); if (g.err) { out.appendChild(UI.msg('bad', 'φ: ' + UI.esc(g.err))); return; }
      var tt = KR.truthTable(fs.concat([g.f]));
      if (tt.atoms.length > 6) { out.appendChild(UI.msg('warn', 'Use at most 6 atoms.')); return; }
      var e = KR.entails(fs, g.f);
      var rows = tt.rows.map(function (r) {
        var inM = r.vals.slice(0, fs.length).every(Boolean), phi = r.vals[fs.length];
        return { cls: inM ? 'sel' : '', cells: tt.atoms.map(function (a) { return { class: 'c', text: r.i[a] ? '1' : '0' }; })
          .concat([{ class: inM ? 't1' : 't0', text: inM ? 'model of Δ' : '' }, UI.bit(phi), { class: 'c', text: inM && !phi ? 'counter-model' : (inM ? 'agrees' : '') }]) };
      });
      out.appendChild(UI.table(tt.atoms.concat(['Δ all true?', 'φ', 'check']), rows));
      out.appendChild(UI.msg(e.holds ? 'ok' : 'bad',
        'Models of Δ: <b>' + e.models.length + '</b>. Models of Δ where φ is false: <b>' + e.counter.length + '</b>. So Δ ' + (e.holds ? '<b>entails</b>' : '<b>does not entail</b>') + ' φ.'));
      out.appendChild(UI.msg('info', 'Same answer through the Unsatisfiability Theorem: Δ ∪ {¬φ} has <b>' + e.counter.length + '</b> model(s), so it is ' + (e.counter.length ? 'satisfiable, hence no entailment.' : 'unsatisfiable, hence entailment.') +
        (e.models.length === 0 ? ' Note Δ itself has no model: it entails everything (vacuous entailment).' : '')));
    }
    box.appendChild(D.el); box.appendChild(G.el);
    if (cfg.presets) box.appendChild(UI.chips(cfg.presets, function (it) { D.inp.value = it.delta.join('\n'); G.inp.value = it.phi; render(); }));
    box.appendChild(out); render();
  };

  // ---------- clausal-form converter (INDO for propositional, INSEADO for predicate) ----------
  UI.widgets.cnf = function (box, cfg) {
    var out = h('div', { class: 'out' }), mode = cfg.mode || 'prop';
    var fld = UI.field(mode === 'fol' ? 'Sentence (∀ ∃ as ∀x. ∃x. or forall x. exists x.; variables are x y z u v w or capitalised)' : 'Formula', cfg.formula || '(p -> q) -> (q -> r)', render);
    function render() {
      out.innerHTML = '';
      var r = UI.safeParse(fld.get());
      if (r.err) { out.appendChild(UI.msg('bad', 'Not a formula: ' + UI.esc(r.err))); return; }
      var res;
      try { res = KR.toClauses(r.f, mode); } catch (e) { out.appendChild(UI.msg('bad', UI.esc(e.message))); return; }
      var rows = [];
      var prev = null;
      res.steps.forEach(function (s) {
        var txt = s.clauses ? KR.clausesStr(s.clauses) : KR.fmt(s.f);
        rows.push({ cls: prev === txt ? '' : '', cells: [{ text: s.name }, h('span', { class: 'm', text: txt }), { class: 'c', text: prev === txt ? 'no change' : '' }] });
        prev = txt;
      });
      out.appendChild(UI.table(['Step', 'Result', ''], rows));
      out.appendChild(UI.msg('info', 'Clausal form: <span class="m">' + UI.esc(KR.clausesStr(res.clauses)) + '</span>'));
    }
    box.appendChild(fld.el);
    if (cfg.presets) box.appendChild(UI.chips(cfg.presets.map(function (p) { return { label: p }; }), function (it) { fld.inp.value = it.label; render(); }));
    box.appendChild(out); render();
  };

  // ---------- resolution workbench (propositional and predicate) ----------
  // cfg: mode, premises[], goal (optional sentence to prove), target ('empty' | 'goal'), clauseInput (premises already clauses)
  UI.widgets.refute = function (box, cfg) {
    var mode = cfg.mode || 'prop', lines0 = [], recs = [], sel = null, log = h('div'), list = h('div'), info = h('div');
    var P = UI.field('Premises Δ (one sentence per line)', (cfg.premises || []).join('\n'), build, true);
    var G = UI.field(cfg.target === 'goal' ? 'Rule that defines the answer (used instead of a negated goal)' : 'Goal φ to prove (it is negated and added automatically)', cfg.goal || '', build);
    var showGoal = cfg.goal !== undefined;

    function build() {
      recs = []; sel = null; log.innerHTML = ''; info.innerHTML = '';
      var prem = lines(P.get()), cls = [], detail = [], used = {};
      try {
        prem.forEach(function (s, i) {
          var r = UI.safeParse(s); if (r.err) throw new Error('Premise ' + (i + 1) + ': ' + r.err);
          var c = KR.toClauses(r.f, mode, used).clauses; cls = cls.concat(c); detail.push(s + '  ⇒  ' + KR.clausesStr(c));
        });
        if (showGoal && G.get().trim()) {
          var g = UI.safeParse(cfg.target === 'goal' ? G.get() : '~(' + G.get() + ')'); if (g.err) throw new Error('Goal: ' + g.err);
          var gc = KR.toClauses(g.f, mode, used).clauses; cls = cls.concat(gc);
          detail.push((cfg.target === 'goal' ? G.get() : '¬(' + G.get() + ')') + '  ⇒  ' + KR.clausesStr(gc));
        }
      } catch (e) { info.appendChild(UI.msg('bad', UI.esc(e.message))); list.innerHTML = ''; return; }
      cls.forEach(function (c, i) {
        recs.push({ id: i + 1, lits: c, why: i < prem.length ? 'premise' : 'premise' });
      });
      info.appendChild(h('details', null, h('summary', { text: 'Show how each sentence became clauses (' + (mode === 'fol' ? 'INSEADO' : 'INDO') + ')' }),
        h('div', { class: 'trace' }, detail.map(function (d) { return h('div', { text: d }); }))));
      draw();
    }
    function isTarget(c) { return cfg.target === 'goal' ? (c.length > 0 && c.every(function (l) { return l.n === 'goal'; })) : c.length === 0; }
    function litEl(r, j) {
      var l = r.lits[j];
      var on = sel && sel.r === r.id && sel.j === j;
      return h('span', { class: 'lit' + (on ? ' on' : ''), text: KR.litStr(l), onclick: function () { pick(r, j); } });
    }
    function draw() {
      list.innerHTML = '';
      var done = null;
      recs.forEach(function (r) {
        var cell = h('div', { class: 'clause' }, h('span', { class: 'm', text: r.id + '.  ' }), '{');
        r.lits.forEach(function (l, j) { if (j) cell.appendChild(document.createTextNode(', ')); cell.appendChild(litEl(r, j)); });
        cell.appendChild(document.createTextNode('}'));
        cell.appendChild(h('span', { class: 'sub', text: '   ' + r.why }));
        if (mode === 'fol') {
          KR.factors(r.lits).forEach(function (f) {
            cell.appendChild(h('button', { class: 'ghost', text: 'factor ' + KR.clauseStr(f.clause), style: 'margin-left:8px', onclick: function () { addRec(f.clause, 'factor of ' + r.id + ' with γ = ' + KR.substStr(f.gamma)); } }));
          });
        }
        if (isTarget(r.lits)) done = r;
        list.appendChild(cell);
      });
      if (done) list.appendChild(UI.msg('ok', cfg.target === 'goal'
        ? 'Derived <span class="m">' + UI.esc(KR.clauseStr(done.lits)) + '</span>. The bindings in the goal literal are the answer.'
        : 'The empty clause <span class="m">{}</span> is derived: Δ ∪ {¬φ} is unsatisfiable, so the goal follows from Δ.'));
    }
    function addRec(c, why) {
      var key = KR.clauseStr(c);
      if (recs.some(function (x) { return KR.clauseStr(x.lits) === key; })) { log.innerHTML = ''; log.appendChild(UI.msg('warn', 'That clause is already in the list.')); return; }
      recs.push({ id: recs.length + 1, lits: c, why: why }); sel = null; draw();
    }
    function pick(r, j) {
      log.innerHTML = '';
      if (!sel) { sel = { r: r.id, j: j }; draw(); return; }
      var a = recs[sel.r - 1], b = r;
      if (sel.r === r.id && sel.j === j) { sel = null; draw(); return; }
      var la = a.lits[sel.j], lb = b.lits[j];
      var ia = sel.j; sel = null;
      if (la.n !== lb.n || la.args.length !== lb.args.length) { log.appendChild(UI.msg('bad', 'Different predicates (' + UI.esc(la.n) + ' and ' + UI.esc(lb.n) + '): nothing to cancel.')); draw(); return; }
      if (la.neg === lb.neg) { log.appendChild(UI.msg('bad', 'Both literals have the same sign. Resolution needs one positive and one negated literal.')); draw(); return; }
      var rs = KR.resolvents(a.lits, b.lits).filter(function (x) { return x.i === ia && x.j === j; });
      if (!rs.length) {
        var tr = [], rn = KR.renameApart(b.lits, a.lits);
        var lb2 = KR.applyLit(lb, rn.map); KR.unifyAtoms(la, lb2, tr);
        log.appendChild(UI.msg('bad', 'The two atoms do not unify, so these literals cannot be cancelled.'));
        log.appendChild(h('div', { class: 'trace' }, tr.map(function (t) { return h('div', { text: new Array(t.d + 1).join('  ') + t.s }); })));
        draw(); return;
      }
      var x = rs[0], why = 'resolve ' + a.id + ', ' + b.id + (mode === 'fol' ? ' with σ = ' + KR.substStr(x.sigma) : ' on ' + la.n);
      addRec(x.clause, why);
      if (mode === 'fol' && Object.keys(x.renamed).length) log.appendChild(UI.msg('info', 'Variables of clause ' + b.id + ' were renamed apart first: ' + UI.esc(KR.substStr(x.renamed)) + '.'));
    }
    var controls = h('div', { class: 'row' },
      h('button', { class: 'solid', text: 'Show a proof for me', onclick: function () {
        log.innerHTML = '';
        var base = recs.filter(function (r) { return r.why === 'premise'; }).map(function (r) { return r.lits; });
        var res = KR.search(base, { isTarget: isTarget, maxClauses: 900, maxLits: 4 });
        if (!res.found) { log.appendChild(UI.msg('warn', 'No derivation found within the search limit (' + res.tried + ' clauses tried). If the goal does not follow from the premises, resolution can never reach the target.')); return; }
        recs = res.proof.map(function (p) {
          var how = p.how.type === 'premise' ? 'premise' : p.how.type === 'factor' ? 'factor of ' + p.how.from[0] : 'resolve ' + p.how.from.join(', ') + (mode === 'fol' ? ' with σ = ' + KR.substStr(p.how.sigma) : '');
          return { id: p.id, lits: p.lits, why: how };
        });
        sel = null; draw();
        log.appendChild(UI.msg('info', 'Only the clauses that the final step depends on are shown (' + recs.length + ' lines).'));
      } }),
      h('button', { class: 'ghost', text: 'Reset', onclick: build }));
    box.appendChild(P.el);
    if (showGoal) box.appendChild(G.el);
    if (cfg.presets) box.appendChild(UI.chips(cfg.presets, function (it) {
      P.inp.value = it.premises.join('\n'); if (showGoal) G.inp.value = it.goal || ''; build();
    }));
    box.appendChild(info);
    box.appendChild(h('p', { class: 'sub', text: mode === 'fol'
      ? 'To resolve: click one literal, then click a complementary literal in another clause (or another literal of the same clause). The tool renames variables apart and computes the most general unifier.'
      : 'To resolve: click one literal, then click its negation in another clause.' }));
    box.appendChild(controls); box.appendChild(list); box.appendChild(log);
    build();
  };
})();
