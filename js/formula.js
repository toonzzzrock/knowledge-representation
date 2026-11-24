/* Formula engine: parser, printer, truth tables, clausal-form conversion (INDO / INSEADO).
   Pure functions, no DOM. Loads in the browser (window.KR) and in node (globalThis.KR). */
(function (root) {
  var KR = root.KR = root.KR || {};

  // ---------- tokenizer ----------
  var SYMS = [
    ['<->', 'iff'], ['<=>', 'iff'], ['↔', 'iff'],
    ['->', 'imp'], ['=>', 'imp'], ['→', 'imp'],
    ['/\\', 'and'], ['∧', 'and'], ['&', 'and'], ['^', 'and'],
    ['\\/', 'or'], ['∨', 'or'], ['|', 'or'],
    ['¬', 'not'], ['~', 'not'], ['!', 'not'],
    ['∀', 'all'], ['∃', 'ex'],
    ['(', '('], [')', ')'], [',', ','], ['.', '.'], [':', '.']
  ];

  function tokenize(s) {
    var out = [], i = 0;
    while (i < s.length) {
      var c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      var hit = false;
      for (var k = 0; k < SYMS.length; k++) {
        if (s.startsWith(SYMS[k][0], i)) { out.push({ t: SYMS[k][1], s: SYMS[k][0], pos: i }); i += SYMS[k][0].length; hit = true; break; }
      }
      if (hit) continue;
      var m = /^[A-Za-z_][A-Za-z0-9_]*'*/.exec(s.slice(i));
      if (m) {
        var w = m[0];
        var type = (w === 'forall') ? 'all' : (w === 'exists') ? 'ex' : 'id';
        out.push({ t: type, s: w, pos: i }); i += w.length; continue;
      }
      throw new Error("Unexpected character '" + c + "' at position " + i);
    }
    out.push({ t: 'end', s: '', pos: s.length });
    return out;
  }

  // ---------- term helpers ----------
  var VARRE = /^([A-Z][A-Za-z0-9_]*|[u-z][0-9]*)'*$/;
  function isVarName(n) { return VARRE.test(n); }
  function V(n) { return { k: 'v', n: n }; }
  function F(n, args) { return { k: 'f', n: n, args: args || [] }; }

  // ---------- parser ----------
  function parse(src) {
    var toks = tokenize(src), p = 0;
    function peek() { return toks[p]; }
    function eat(t) {
      if (toks[p].t !== t) throw new Error("Expected '" + t + "' but found '" + (toks[p].s || 'end of input') + "'");
      return toks[p++];
    }
    function parseTerm() {
      var t = eat('id'), n = t.s;
      if (peek().t === '(') {
        p++;
        var args = [];
        if (peek().t !== ')') { args.push(parseTerm()); while (peek().t === ',') { p++; args.push(parseTerm()); } }
        eat(')');
        return F(n, args);
      }
      return isVarName(n) ? V(n) : F(n, []);
    }
    function parseIff() {
      var l = parseImp();
      while (peek().t === 'iff') { p++; var r = parseImp(); l = { t: 'iff', a: l, b: r }; }
      return l;
    }
    function parseImp() {
      var l = parseOr();
      if (peek().t === 'imp') { p++; var r = parseImp(); return { t: 'imp', a: l, b: r }; }
      return l;
    }
    function parseOr() {
      var l = parseAnd();
      while (peek().t === 'or') { p++; var r = parseAnd(); l = { t: 'or', a: l, b: r }; }
      return l;
    }
    function parseAnd() {
      var l = parseUnary();
      while (peek().t === 'and') { p++; var r = parseUnary(); l = { t: 'and', a: l, b: r }; }
      return l;
    }
    function parseUnary() {
      var tk = peek();
      if (tk.t === 'not') { p++; return { t: 'not', a: parseUnary() }; }
      if (tk.t === 'all' || tk.t === 'ex') {
        p++;
        var v = eat('id').s;
        if (peek().t === '.') p++;
        return { t: tk.t, v: v, a: parseIff() };
      }
      if (tk.t === '(') { p++; var f = parseIff(); eat(')'); return f; }
      if (tk.t === 'id') {
        p++;
        var args = [];
        if (peek().t === '(') {
          p++;
          if (peek().t !== ')') { args.push(parseTerm()); while (peek().t === ',') { p++; args.push(parseTerm()); } }
          eat(')');
        }
        return { t: 'atom', n: tk.s, args: args };
      }
      throw new Error("Unexpected '" + (tk.s || 'end of input') + "'");
    }
    var f = parseIff();
    if (peek().t !== 'end') throw new Error("Unexpected '" + peek().s + "'");
    return f;
  }

  // parse a bare term such as f(x,g(a))
  function parseTermString(src) {
    var toks = tokenize(src), p = 0;
    function peek() { return toks[p]; }
    function eat(t) { if (toks[p].t !== t) throw new Error("Expected '" + t + "' but found '" + (toks[p].s || 'end of input') + "'"); return toks[p++]; }
    function term() {
      var n = eat('id').s;
      if (peek().t === '(') {
        p++; var args = [];
        if (peek().t !== ')') { args.push(term()); while (peek().t === ',') { p++; args.push(term()); } }
        eat(')'); return F(n, args);
      }
      return isVarName(n) ? V(n) : F(n, []);
    }
    var t = term();
    if (peek().t !== 'end') throw new Error("Unexpected '" + peek().s + "'");
    return t;
  }

  // ---------- printing ----------
  function termStr(t) {
    if (t.k === 'v') return t.n;
    if (!t.args.length) return t.n;
    return t.n + '(' + t.args.map(termStr).join(',') + ')';
  }
  function atomStr(a) { return a.args.length ? a.n + '(' + a.args.map(termStr).join(',') + ')' : a.n; }
  var PREC = { iff: 1, imp: 2, or: 3, and: 4 };
  function endsWithQuant(f) {
    if (f.t === 'all' || f.t === 'ex') return true;
    if (f.t === 'not') return endsWithQuant(f.a);
    return false;
  }
  function fmt(f) {
    switch (f.t) {
      case 'atom': return atomStr(f);
      case 'not': return '¬' + wrapUn(f.a);
      case 'all': return '∀' + f.v + '.' + fmt(f.a);
      case 'ex': return '∃' + f.v + '.' + fmt(f.a);
      default:
        var sym = { and: ' ∧ ', or: ' ∨ ', imp: ' → ', iff: ' ↔ ' }[f.t];
        return wrapBin(f.a, f.t, 'l') + sym + wrapBin(f.b, f.t, 'r');
    }
  }
  function wrapUn(c) { return (c.t === 'atom' || c.t === 'not' || c.t === 'all' || c.t === 'ex') ? fmt(c) : '(' + fmt(c) + ')'; }
  function wrapBin(c, parent, side) {
    if (c.t === 'atom') return fmt(c);
    if (c.t === 'not') return endsWithQuant(c) ? '(' + fmt(c) + ')' : fmt(c);
    if (c.t === 'all' || c.t === 'ex') return '(' + fmt(c) + ')';
    var pc = PREC[c.t], pp = PREC[parent];
    var need = pc < pp || (pc === pp && (parent === 'iff' || (parent === 'imp' && side === 'l')));
    return need ? '(' + fmt(c) + ')' : fmt(c);
  }
  function litStr(l) { return (l.neg ? '¬' : '') + atomStr(l); }
  function clauseStr(c) { return c.length ? '{' + c.map(litStr).join(', ') + '}' : '{}'; }
  function clausesStr(cs) { return '{' + cs.map(clauseStr).join(', ') + '}'; }

  // ---------- structural helpers ----------
  function mapTermVars(t, fn) {
    if (t.k === 'v') return fn(t);
    return F(t.n, t.args.map(function (a) { return mapTermVars(a, fn); }));
  }
  function termVars(t, acc) {
    if (t.k === 'v') { if (acc.indexOf(t.n) < 0) acc.push(t.n); } else t.args.forEach(function (a) { termVars(a, acc); });
    return acc;
  }
  function freeVars(f, bound, acc) {
    bound = bound || []; acc = acc || [];
    switch (f.t) {
      case 'atom': f.args.forEach(function (a) { termVars(a, []).forEach(function (n) { if (bound.indexOf(n) < 0 && acc.indexOf(n) < 0) acc.push(n); }); }); break;
      case 'not': freeVars(f.a, bound, acc); break;
      case 'all': case 'ex': freeVars(f.a, bound.concat([f.v]), acc); break;
      default: freeVars(f.a, bound, acc); freeVars(f.b, bound, acc);
    }
    return acc;
  }
  function substF(f, v, term) {
    switch (f.t) {
      case 'atom': return { t: 'atom', n: f.n, args: f.args.map(function (a) { return mapTermVars(a, function (x) { return x.n === v ? term : x; }); }) };
      case 'not': return { t: 'not', a: substF(f.a, v, term) };
      case 'all': case 'ex': return f.v === v ? f : { t: f.t, v: f.v, a: substF(f.a, v, term) };
      default: return { t: f.t, a: substF(f.a, v, term), b: substF(f.b, v, term) };
    }
  }
  function atomsOf(f, acc) {
    acc = acc || [];
    if (f.t === 'atom') { var s = atomStr(f); if (acc.indexOf(s) < 0) acc.push(s); }
    else if (f.t === 'not' || f.t === 'all' || f.t === 'ex') atomsOf(f.a, acc);
    else { atomsOf(f.a, acc); atomsOf(f.b, acc); }
    return acc;
  }
  function symbolsOf(f, acc) {
    acc = acc || {};
    function tm(t) { if (t.k === 'f') { acc[t.n] = 1; t.args.forEach(tm); } }
    if (f.t === 'atom') { acc[f.n] = 1; f.args.forEach(tm); }
    else if (f.t === 'not' || f.t === 'all' || f.t === 'ex') symbolsOf(f.a, acc);
    else { symbolsOf(f.a, acc); symbolsOf(f.b, acc); }
    return acc;
  }

  // ---------- propositional semantics ----------
  function evalProp(f, i) {
    switch (f.t) {
      case 'atom': return i[f.n] ? 1 : 0;
      case 'not': return evalProp(f.a, i) ? 0 : 1;
      case 'and': return evalProp(f.a, i) && evalProp(f.b, i) ? 1 : 0;
      case 'or': return evalProp(f.a, i) || evalProp(f.b, i) ? 1 : 0;
      case 'imp': return !evalProp(f.a, i) || evalProp(f.b, i) ? 1 : 0;
      case 'iff': return evalProp(f.a, i) === evalProp(f.b, i) ? 1 : 0;
    }
    throw new Error('quantifier in propositional formula');
  }
  // all assignments over atoms, true-first order
  function assignments(atoms) {
    var n = atoms.length, out = [];
    for (var r = 0; r < (1 << n); r++) {
      var i = {};
      for (var k = 0; k < n; k++) i[atoms[k]] = ((((1 << n) - 1 - r) >> (n - 1 - k)) & 1);
      out.push(i);
    }
    return out;
  }
  function truthTable(formulas) {
    var atoms = [];
    formulas.forEach(function (f) { atomsOf(f, []).forEach(function (a) { if (atoms.indexOf(a) < 0) atoms.push(a); }); });
    var rows = assignments(atoms).map(function (i) { return { i: i, vals: formulas.map(function (f) { return evalProp(f, i); }) }; });
    return { atoms: atoms, rows: rows };
  }
  function classify(f) {
    var t = truthTable([f]), ones = t.rows.filter(function (r) { return r.vals[0]; }).length;
    var n = t.rows.length;
    return { models: ones, total: n, valid: ones === n, unsat: ones === 0, contingent: ones > 0 && ones < n };
  }
  // does Δ entail φ ?  returns model counts and counter-models
  function entails(delta, phi) {
    var t = truthTable(delta.concat([phi]));
    var m = [], bad = [];
    t.rows.forEach(function (r) {
      var allD = r.vals.slice(0, delta.length).every(function (x) { return x; });
      if (allD) { m.push(r); if (!r.vals[delta.length]) bad.push(r); }
    });
    return { table: t, models: m, counter: bad, holds: bad.length === 0 };
  }

  // ---------- clausal form ----------
  function impOut(f) {
    switch (f.t) {
      case 'atom': return f;
      case 'not': return { t: 'not', a: impOut(f.a) };
      case 'all': case 'ex': return { t: f.t, v: f.v, a: impOut(f.a) };
      case 'imp': return { t: 'or', a: { t: 'not', a: impOut(f.a) }, b: impOut(f.b) };
      case 'iff':
        var a = impOut(f.a), b = impOut(f.b);
        return { t: 'and', a: { t: 'or', a: { t: 'not', a: a }, b: b }, b: { t: 'or', a: a, b: { t: 'not', a: b } } };
      default: return { t: f.t, a: impOut(f.a), b: impOut(f.b) };
    }
  }
  function nnf(f, neg) {
    switch (f.t) {
      case 'atom': return neg ? { t: 'not', a: f } : f;
      case 'not': return nnf(f.a, !neg);
      case 'and': case 'or': return { t: neg ? (f.t === 'and' ? 'or' : 'and') : f.t, a: nnf(f.a, neg), b: nnf(f.b, neg) };
      case 'all': case 'ex': return { t: neg ? (f.t === 'all' ? 'ex' : 'all') : f.t, v: f.v, a: nnf(f.a, neg) };
    }
    throw new Error('implication not removed');
  }
  function standardize(f) {
    var used = {};
    freeVars(f).forEach(function (n) { used[n] = 1; });
    function fresh(n) {
      if (!used[n]) { used[n] = 1; return n; }
      var base = n.replace(/'+$/, ''), k = 1, c;
      do { c = base + k; k++; } while (used[c]);
      used[c] = 1; return c;
    }
    function go(g, env) {
      switch (g.t) {
        case 'atom':
          return { t: 'atom', n: g.n, args: g.args.map(function (a) { return mapTermVars(a, function (x) { return env[x.n] ? V(env[x.n]) : x; }); }) };
        case 'not': return { t: 'not', a: go(g.a, env) };
        case 'all': case 'ex':
          var nn = fresh(g.v), e2 = Object.assign({}, env); e2[g.v] = nn;
          return { t: g.t, v: nn, a: go(g.a, e2) };
        default: return { t: g.t, a: go(g.a, env), b: go(g.b, env) };
      }
    }
    return go(f, {});
  }
  function skolemize(f, shared) {
    var free = freeVars(f), usedSyms = symbolsOf(f), cc = 0, fc = 0;
    if (shared) Object.keys(usedSyms).forEach(function (k) { shared[k] = 1; });
    function newName(isFn) {
      var n;
      do { n = isFn ? 'f' + (++fc) : 'c' + (++cc); } while (usedSyms[n] || (shared && shared[n]));
      usedSyms[n] = 1; if (shared) shared[n] = 1; return n;
    }
    function go(g, univ) {
      switch (g.t) {
        case 'atom': return g;
        case 'not': return g;
        case 'all': return { t: 'all', v: g.v, a: go(g.a, univ.concat([g.v])) };
        case 'ex':
          var deps = univ.concat(free.filter(function (x) { return univ.indexOf(x) < 0; }));
          var term = deps.length ? F(newName(true), deps.map(V)) : F(newName(false), []);
          return go(substF(g.a, g.v, term), univ);
        default: return { t: g.t, a: go(g.a, univ), b: go(g.b, univ) };
      }
    }
    return go(f, []);
  }
  function dropAlls(f) {
    switch (f.t) {
      case 'atom': case 'not': return f;
      case 'all': return dropAlls(f.a);
      default: return { t: f.t, a: dropAlls(f.a), b: dropAlls(f.b) };
    }
  }
  function litOf(f) { // f is atom or not(atom)
    return f.t === 'not' ? { neg: true, n: f.a.n, args: f.a.args } : { neg: false, n: f.n, args: f.args };
  }
  function litKey(l) { return (l.neg ? '~' : '') + atomStr(l); }
  function dedupeLits(ls) {
    var seen = {}, out = [];
    ls.forEach(function (l) { var k = litKey(l); if (!seen[k]) { seen[k] = 1; out.push(l); } });
    return out;
  }
  function cnfClauses(f) {
    switch (f.t) {
      case 'atom': case 'not': return [[litOf(f)]];
      case 'and': return cnfClauses(f.a).concat(cnfClauses(f.b));
      case 'or':
        var A = cnfClauses(f.a), B = cnfClauses(f.b), out = [];
        A.forEach(function (x) { B.forEach(function (y) { out.push(dedupeLits(x.concat(y))); }); });
        return out;
    }
    throw new Error('unexpected node ' + f.t);
  }
  function dedupeClauses(cs) {
    var seen = {}, out = [];
    cs.forEach(function (c) {
      var k = c.map(litKey).sort().join('|');
      if (!seen[k]) { seen[k] = 1; out.push(c); }
    });
    return out;
  }
  function clausesToFormula(cs) {
    function lit(l) { var a = { t: 'atom', n: l.n, args: l.args }; return l.neg ? { t: 'not', a: a } : a; }
    function fold(arr, op) { return arr.reduce(function (acc, x) { return acc ? { t: op, a: acc, b: x } : x; }, null); }
    return fold(cs.map(function (c) { return fold(c.map(lit), 'or'); }), 'and');
  }
  // Full pipeline. mode 'prop' gives INDO steps, 'fol' gives INSEADO steps.
  // shared (optional): one symbol table passed to every call for a premise set, so Skolem names stay fresh across sentences.
  function toClauses(f, mode, shared) {
    var steps = [], cur = f;
    steps.push({ name: 'Input', f: cur });
    cur = impOut(cur); steps.push({ name: 'I  Implications out', f: cur });
    cur = nnf(cur, false); steps.push({ name: 'N  Negations in', f: cur });
    if (mode === 'fol') {
      cur = standardize(cur); steps.push({ name: 'S  Standardize variables', f: cur });
      cur = skolemize(cur, shared); steps.push({ name: 'E  Existentials out (Skolem)', f: cur });
      cur = dropAlls(cur); steps.push({ name: 'A  Alls out', f: cur });
    }
    var cs = dedupeClauses(cnfClauses(cur));
    var cnf = clausesToFormula(cs);
    steps.push({ name: 'D  Distribution', f: cnf });
    steps.push({ name: 'O  Operators out', clauses: cs });
    return { steps: steps, clauses: cs };
  }

  // ---------- prenex form (for grounding) ----------
  function closeUniversal(f) {
    var fv = freeVars(f);
    for (var k = fv.length - 1; k >= 0; k--) f = { t: 'all', v: fv[k], a: f };
    return f;
  }
  function prenex(f) {
    var g = standardize(nnf(impOut(closeUniversal(f)), false));
    function pull(h) {
      switch (h.t) {
        case 'atom': case 'not': return { prefix: [], m: h };
        case 'all': case 'ex':
          var r = pull(h.a); return { prefix: [{ q: h.t, v: h.v }].concat(r.prefix), m: r.m };
        default:
          var l = pull(h.a), rr = pull(h.b);
          return { prefix: l.prefix.concat(rr.prefix), m: { t: h.t, a: l.m, b: rr.m } };
      }
    }
    var r = pull(g), out = r.m;
    for (var k = r.prefix.length - 1; k >= 0; k--) out = { t: r.prefix[k].q, v: r.prefix[k].v, a: out };
    return out;
  }

  KR.parse = parse; KR.parseTerm = parseTermString; KR.tokenize = tokenize;
  KR.fmt = fmt; KR.termStr = termStr; KR.atomStr = atomStr; KR.litStr = litStr; KR.clauseStr = clauseStr; KR.clausesStr = clausesStr;
  KR.isVarName = isVarName; KR.V = V; KR.F = F;
  KR.freeVars = freeVars; KR.substF = substF; KR.atomsOf = atomsOf; KR.symbolsOf = symbolsOf; KR.mapTermVars = mapTermVars; KR.termVars = termVars;
  KR.evalProp = evalProp; KR.assignments = assignments; KR.truthTable = truthTable; KR.classify = classify; KR.entails = entails;
  KR.impOut = impOut; KR.nnf = nnf; KR.standardize = standardize; KR.skolemize = skolemize; KR.dropAlls = dropAlls;
  KR.toClauses = toClauses; KR.prenex = prenex; KR.closeUniversal = closeUniversal; KR.litKey = litKey; KR.dedupeLits = dedupeLits;
  if (typeof module !== 'undefined' && module.exports) module.exports = KR;
})(typeof window !== 'undefined' ? window : globalThis);
