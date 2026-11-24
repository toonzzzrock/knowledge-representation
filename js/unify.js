/* Substitution, unification (lecture algorithm), factoring, resolution and proof search. No DOM. */
(function (root) {
  var KR = root.KR = root.KR || {};
  var V = KR.V, F = KR.F, termStr = KR.termStr;

  // ---------- substitutions: plain object {varName: term} ----------
  function applyT(t, s) {
    if (t.k === 'v') return Object.prototype.hasOwnProperty.call(s, t.n) ? s[t.n] : t;
    if (!t.args.length) return t;
    return F(t.n, t.args.map(function (a) { return applyT(a, s); }));
  }
  function applyLit(l, s) { return { neg: l.neg, n: l.n, args: l.args.map(function (a) { return applyT(a, s); }) }; }
  function applyClause(c, s) { return KR.dedupeLits(c.map(function (l) { return applyLit(l, s); })); }
  function has(s, k) { return Object.prototype.hasOwnProperty.call(s, k); }
  // composition sigma tau, as in the lecture: (i) apply tau to sigma's right sides,
  // (ii) add tau's pairs whose variable is not in sigma, (iii) delete x <- x
  function compose(sigma, tau) {
    var out = {};
    Object.keys(sigma).forEach(function (x) { out[x] = applyT(sigma[x], tau); });
    Object.keys(tau).forEach(function (x) { if (!has(sigma, x)) out[x] = tau[x]; });
    Object.keys(out).forEach(function (x) { if (out[x].k === 'v' && out[x].n === x) delete out[x]; });
    return out;
  }
  function substStr(s) {
    var ks = Object.keys(s);
    return ks.length ? '{' + ks.map(function (k) { return k + ' ← ' + termStr(s[k]); }).join(', ') + '}' : '{}';
  }
  function occurs(x, t) {
    if (t.k === 'v') return t.n === x;
    return t.args.some(function (a) { return occurs(x, a); });
  }
  function termEq(a, b) { return termStr(a) === termStr(b); }

  // ---------- unification with trace ----------
  // unify(e1, e2, theta, trace, depth) -> theta or null. Both expressions are terms.
  function unifyTerms(e1, e2, theta, trace, d) {
    d = d || 0;
    function log(s) { if (trace) trace.push({ d: d, s: s }); }
    e1 = applyT(e1, theta); e2 = applyT(e2, theta);
    log('unify ' + termStr(e1) + ' and ' + termStr(e2) + ' under θ = ' + substStr(theta));
    if (termEq(e1, e2)) { log('identical, succeed'); return theta; }
    if (e1.k !== 'v' && e2.k !== 'v') {
      if (e1.n !== e2.n || e1.args.length !== e2.args.length) {
        log(e1.args.length === 0 || e2.args.length === 0 ? 'different constants or constant against compound term: fail' : 'different function symbols: fail');
        return null;
      }
      var th = theta;
      for (var i = 0; i < e1.args.length; i++) {
        th = unifyTerms(e1.args[i], e2.args[i], th, trace, d + 1);
        if (!th) return null;
      }
      return th;
    }
    var x = e1.k === 'v' ? e1 : e2, other = e1.k === 'v' ? e2 : e1;
    if (occurs(x.n, other)) { log('occur check: ' + x.n + ' occurs in ' + termStr(other) + ', fail'); return null; }
    var nt = compose(theta, (function () { var o = {}; o[x.n] = other; return o; })());
    log('bind ' + x.n + ' ← ' + termStr(other) + ', θ = ' + substStr(nt));
    return nt;
  }
  function unifyArgs(as, bs, theta, trace) {
    var th = theta;
    for (var i = 0; i < as.length; i++) { th = unifyTerms(as[i], bs[i], th, trace, 0); if (!th) return null; }
    return th;
  }
  function unifyAtoms(a, b, trace) {
    if (a.n !== b.n || a.args.length !== b.args.length) return null;
    return unifyArgs(a.args, b.args, {}, trace);
  }

  // ---------- renaming ----------
  function clauseVars(c) {
    var acc = [];
    c.forEach(function (l) { l.args.forEach(function (a) { KR.termVars(a, acc); }); });
    return acc;
  }
  function renameApart(c2, c1) {
    var taken = {}; clauseVars(c1).forEach(function (n) { taken[n] = 1; });
    var map = {};
    clauseVars(c2).forEach(function (n) {
      var nn = n; while (taken[nn]) nn = nn + "'";
      taken[nn] = 1; if (nn !== n) map[n] = V(nn);
    });
    return { clause: applyClause(c2, map), map: map };
  }

  // ---------- factoring and resolution ----------
  function factors(c) {
    var out = [];
    for (var i = 0; i < c.length; i++) for (var j = i + 1; j < c.length; j++) {
      if (c[i].neg === c[j].neg && c[i].n === c[j].n && c[i].args.length === c[j].args.length) {
        var g = unifyAtoms(c[i], c[j]);
        if (g && Object.keys(g).length) out.push({ clause: applyClause(c, g), gamma: g, i: i, j: j });
      }
    }
    return out;
  }
  // all one-step resolvents of c1 and c2 (c2 renamed apart first)
  function resolvents(c1, c2) {
    var r = renameApart(c2, c1), c2r = r.clause, out = [];
    for (var i = 0; i < c1.length; i++) for (var j = 0; j < c2r.length; j++) {
      var a = c1[i], b = c2r[j];
      if (a.neg !== b.neg && a.n === b.n && a.args.length === b.args.length) {
        var tr = [], s = unifyAtoms(a, b, tr);
        if (s) {
          var rest = c1.filter(function (_, k) { return k !== i; }).concat(c2r.filter(function (_, k) { return k !== j; }));
          out.push({ clause: applyClause(rest, s), sigma: s, i: i, j: j, c2r: c2r, renamed: r.map, trace: tr });
        }
      }
    }
    return out;
  }
  function isTaut(c) {
    for (var i = 0; i < c.length; i++) for (var j = i + 1; j < c.length; j++)
      if (c[i].neg !== c[j].neg && KR.atomStr(c[i]) === KR.atomStr(c[j])) return true;
    return false;
  }
  function canon(c) {
    var sorted = c.slice().sort(function (a, b) {
      var ka = KR.litKey(a).replace(/[A-Za-z0-9_']+(?=[,)])/g, function (m) { return KR.isVarName(m) ? '_' : m; });
      var kb = KR.litKey(b).replace(/[A-Za-z0-9_']+(?=[,)])/g, function (m) { return KR.isVarName(m) ? '_' : m; });
      return ka < kb ? -1 : ka > kb ? 1 : 0;
    });
    var map = {}, k = 0;
    sorted.forEach(function (l) { l.args.forEach(function (a) { KR.termVars(a, []).forEach(function (n) { if (!map[n]) map[n] = V('_' + (k++)); }); }); });
    return sorted.map(function (l) { return KR.litKey(applyLit(l, map)); }).join('|');
  }

  // Search for a derivation. clauses: array of clauses (premises incl. negated goal).
  // opts: maxClauses, maxLits, isTarget(clause) (default: empty clause)
  function search(clauses, opts) {
    opts = opts || {};
    var maxClauses = opts.maxClauses || 600, maxLits = opts.maxLits || 4;
    var isTarget = opts.isTarget || function (c) { return c.length === 0; };
    var recs = [], seen = {};
    function add(c, how) {
      var k = canon(c);
      if (seen[k] || isTaut(c)) return null;
      seen[k] = 1;
      var r = { id: recs.length + 1, lits: c, how: how };
      recs.push(r); return r;
    }
    var found = null;
    clauses.forEach(function (c) { var r = add(c, { type: 'premise' }); if (r && !found && isTarget(r.lits)) found = r; });
    for (var i = 0; i < recs.length && !found && recs.length < maxClauses; i++) {
      var ci = recs[i];
      var fs = factors(ci.lits);
      for (var q = 0; q < fs.length && !found; q++) {
        var rf = add(fs[q].clause, { type: 'factor', from: [ci.id], gamma: fs[q].gamma });
        if (rf && isTarget(rf.lits)) found = rf;
      }
      for (var j = 0; j <= i && !found && recs.length < maxClauses; j++) {
        var rs = resolvents(ci.lits, recs[j].lits);
        for (var k = 0; k < rs.length && !found; k++) {
          if (rs[k].clause.length > maxLits) continue;
          var rn = add(rs[k].clause, { type: 'resolve', from: [ci.id, recs[j].id], sigma: rs[k].sigma, a: rs[k].i, b: rs[k].j });
          if (rn && isTarget(rn.lits)) found = rn;
        }
      }
    }
    if (!found) return { found: false, tried: recs.length };
    // keep only ancestors, in order
    var need = {};
    (function mark(r) { if (need[r.id]) return; need[r.id] = 1; (r.how.from || []).forEach(function (id) { mark(recs[id - 1]); }); })(found);
    var keep = recs.filter(function (r) { return need[r.id]; });
    var renum = {}; keep.forEach(function (r, n) { renum[r.id] = n + 1; });
    var proof = keep.map(function (r, n) {
      return { id: n + 1, lits: r.lits, how: Object.assign({}, r.how, { from: (r.how.from || []).map(function (x) { return renum[x]; }) }) };
    });
    return { found: true, proof: proof, tried: recs.length };
  }

  KR.applyT = applyT; KR.applyLit = applyLit; KR.applyClause = applyClause; KR.compose = compose; KR.substStr = substStr;
  KR.unifyTerms = unifyTerms; KR.unifyAtoms = unifyAtoms; KR.occurs = occurs;
  KR.renameApart = renameApart; KR.factors = factors; KR.resolvents = resolvents; KR.search = search; KR.isTaut = isTaut;
  if (typeof module !== 'undefined' && module.exports) module.exports = KR;
})(typeof window !== 'undefined' ? window : globalThis);
