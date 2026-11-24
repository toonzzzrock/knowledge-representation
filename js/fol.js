/* Predicate logic: signature checking, Herbrand universe/base, Herbrand evaluation, grounding (FHL). No DOM. */
(function (root) {
  var KR = root.KR = root.KR || {};
  var F = KR.F, V = KR.V, termStr = KR.termStr, atomStr = KR.atomStr;

  // sig = { funcs: {a:0,b:0,f:1,g:2}, preds: {p:1,q:2} }  (object constants are functions of arity 0)
  function checkTerm(t, sig, errs) {
    if (t.k === 'v') return true;
    if (sig.preds[t.n] !== undefined && sig.funcs[t.n] === undefined) { errs.push(t.n + ' is a predicate, so ' + termStr(t) + ' is a sentence, not a term'); return false; }
    if (sig.funcs[t.n] === undefined) { errs.push(t.n + ' is not in the signature'); return false; }
    if (sig.funcs[t.n] !== t.args.length) { errs.push(t.n + ' has arity ' + sig.funcs[t.n] + ' but is used with ' + t.args.length + ' argument(s)'); return false; }
    var ok = true; t.args.forEach(function (a) { if (!checkTerm(a, sig, errs)) ok = false; });
    return ok;
  }
  function checkSentence(f, sig, errs) {
    switch (f.t) {
      case 'atom':
        if (sig.preds[f.n] === undefined) { errs.push(f.n + (sig.funcs[f.n] !== undefined ? ' is a function or constant, not a predicate' : ' is not in the signature')); return false; }
        if (sig.preds[f.n] !== f.args.length) { errs.push(f.n + ' has arity ' + sig.preds[f.n] + ' but is used with ' + f.args.length + ' argument(s)'); return false; }
        var ok = true; f.args.forEach(function (a) { if (!checkTerm(a, sig, errs)) ok = false; });
        return ok;
      case 'not': return checkSentence(f.a, sig, errs);
      case 'all': case 'ex': return checkSentence(f.a, sig, errs);
      default: var l = checkSentence(f.a, sig, errs), r = checkSentence(f.b, sig, errs); return l && r;
    }
  }
  // classify an input string as term, sentence or neither
  function classifyExpr(src, sig) {
    var f;
    try { f = KR.parse(src); } catch (e) { return { kind: 'bad', why: e.message }; }
    var errs = [];
    if (f.t === 'atom' && (sig.funcs[f.n] !== undefined || (f.args.length === 0 && KR.isVarName(f.n)))) {
      var t;
      try { t = KR.parseTerm(src); } catch (e) { return { kind: 'bad', why: e.message }; }
      return checkTerm(t, sig, errs) ? { kind: 'term', ground: KR.termVars(t, []).length === 0 } : { kind: 'bad', why: errs[0] };
    }
    if (!checkSentence(f, sig, errs)) return { kind: 'bad', why: errs[0] };
    return { kind: 'sentence', f: f, free: KR.freeVars(f), ground: KR.termVarsOfFormula(f).length === 0 };
  }
  KR.termVarsOfFormula = function (f) {
    var acc = [];
    (function w(g) {
      if (g.t === 'atom') g.args.forEach(function (a) { KR.termVars(a, acc); });
      else if (g.t === 'not' || g.t === 'all' || g.t === 'ex') { if (g.v && acc.indexOf(g.v) < 0) acc.push(g.v); w(g.a); }
      else { w(g.a); w(g.b); }
    })(f);
    return acc;
  };

  // ---------- Herbrand universe and base (depth-limited when functions exist) ----------
  function herbrandUniverse(sig, depth) {
    var consts = Object.keys(sig.funcs).filter(function (n) { return sig.funcs[n] === 0; });
    var fns = Object.keys(sig.funcs).filter(function (n) { return sig.funcs[n] > 0; });
    var level = consts.map(function (c) { return F(c, []); }), all = level.slice(), seen = {};
    all.forEach(function (t) { seen[termStr(t)] = 1; });
    for (var d = 1; d <= depth && fns.length; d++) {
      var next = [];
      fns.forEach(function (fn) {
        var n = sig.funcs[fn];
        var combos = [[]];
        for (var k = 0; k < n; k++) {
          var nc = [];
          combos.forEach(function (cmb) { all.forEach(function (t) { nc.push(cmb.concat([t])); }); });
          combos = nc;
        }
        combos.forEach(function (args) { var t = F(fn, args), s = termStr(t); if (!seen[s]) { seen[s] = 1; next.push(t); } });
      });
      all = all.concat(next);
      if (all.length > 400) break;
    }
    return { terms: all, infinite: fns.length > 0 && consts.length > 0 };
  }
  function herbrandBase(sig, depth) {
    var hu = herbrandUniverse(sig, depth), out = [];
    Object.keys(sig.preds).forEach(function (p) {
      var n = sig.preds[p], combos = [[]];
      for (var k = 0; k < n; k++) {
        var nc = [];
        combos.forEach(function (cmb) { hu.terms.forEach(function (t) { nc.push(cmb.concat([t])); }); });
        combos = nc;
      }
      combos.forEach(function (args) { out.push({ t: 'atom', n: p, args: args }); });
    });
    return { atoms: out, infinite: hu.infinite && Object.keys(sig.preds).some(function (p) { return sig.preds[p] > 0; }) };
  }

  // ---------- Herbrand evaluation over a finite universe ----------
  // I maps atom strings to 0/1. Free variables are universally closed.
  function evalH(f, I, hu) {
    f = KR.closeUniversal(f);
    function ev(g) {
      switch (g.t) {
        case 'atom': return I[atomStr(g)] ? 1 : 0;
        case 'not': return ev(g.a) ? 0 : 1;
        case 'and': return ev(g.a) && ev(g.b) ? 1 : 0;
        case 'or': return ev(g.a) || ev(g.b) ? 1 : 0;
        case 'imp': return !ev(g.a) || ev(g.b) ? 1 : 0;
        case 'iff': return ev(g.a) === ev(g.b) ? 1 : 0;
        case 'all': return hu.every(function (t) { return ev(KR.substF(g.a, g.v, t)); }) ? 1 : 0;
        case 'ex': return hu.some(function (t) { return ev(KR.substF(g.a, g.v, t)); }) ? 1 : 0;
      }
    }
    return ev(f);
  }
  // expansion of the quantifier tree into plain text, one level at a time (for display)
  function expandOnce(f, hu) {
    switch (f.t) {
      case 'all': case 'ex':
        var insts = hu.map(function (t) { return KR.substF(f.a, f.v, t); });
        return insts.reduce(function (acc, x) { return acc ? { t: f.t === 'all' ? 'and' : 'or', a: acc, b: x } : x; }, null);
    }
    return f;
  }
  function expandAll(f, hu) {
    switch (f.t) {
      case 'atom': return f;
      case 'not': return { t: 'not', a: expandAll(f.a, hu) };
      case 'all': case 'ex': return expandAll(expandOnce(f, hu), hu);
      default: return { t: f.t, a: expandAll(f.a, hu), b: expandAll(f.b, hu) };
    }
  }

  // ---------- grounding for Finite Herbrand Logic ----------
  // sentences: array of formula ASTs. consts: array of constant names. Returns step table and propositional result.
  function ground(sentences, consts) {
    var hu = consts.map(function (c) { return F(c, []); });
    var steps = [], gamma = [], queue = [];
    function hasQuant(g) { return g.t === 'all' || g.t === 'ex' || (g.t === 'atom' ? false : g.t === 'not' ? hasQuant(g.a) : hasQuant(g.a) || hasQuant(g.b)); }
    function isPrenex(g) { var h = g; while (h.t === 'all' || h.t === 'ex') h = h.a; return !hasQuant(h); }
    sentences.forEach(function (s) { var c = KR.closeUniversal(s); queue.push(isPrenex(c) ? c : KR.prenex(s)); });
    var guard = 0;
    while (queue.length && guard++ < 500) {
      var phi = queue.shift();
      if (phi.t === 'all') {
        var insts = hu.map(function (t) { return KR.substF(phi.a, phi.v, t); });
        steps.push({ f: phi, action: 'expand ∀' + phi.v + ' into ' + insts.length + ' instance(s)', out: insts });
        queue = insts.concat(queue);
      } else if (phi.t === 'ex') {
        var d = hu.map(function (t) { return KR.substF(phi.a, phi.v, t); }).reduce(function (acc, x) { return acc ? { t: 'or', a: acc, b: x } : x; }, null);
        steps.push({ f: phi, action: 'expand ∃' + phi.v + ' into a disjunction', out: [d] });
        queue.unshift(d);
      } else {
        steps.push({ f: phi, action: 'ground, move to Γ', out: [] });
        gamma.push(phi);
      }
    }
    return { steps: steps, gamma: gamma, prop: gamma.map(toPropLetters) };
  }
  function toPropLetters(f) {
    switch (f.t) {
      case 'atom': return { t: 'atom', n: f.args.length ? f.n + '_' + f.args.map(termStr).join('') : f.n, args: [] };
      case 'not': return { t: 'not', a: toPropLetters(f.a) };
      default: return { t: f.t, a: toPropLetters(f.a), b: toPropLetters(f.b) };
    }
  }

  KR.checkTerm = checkTerm; KR.checkSentence = checkSentence; KR.classifyExpr = classifyExpr;
  KR.herbrandUniverse = herbrandUniverse; KR.herbrandBase = herbrandBase; KR.evalH = evalH; KR.expandAll = expandAll; KR.expandOnce = expandOnce;
  KR.ground = ground; KR.toPropLetters = toPropLetters;
  if (typeof module !== 'undefined' && module.exports) module.exports = KR;
})(typeof window !== 'undefined' ? window : globalThis);
