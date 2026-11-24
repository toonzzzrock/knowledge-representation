/* Probability helpers: possible worlds, Bayesian network enumeration, ProbLog text, HMM enumeration. No DOM. */
(function (root) {
  var KR = root.KR = root.KR || {};

  // independent binary variables -> list of worlds {vals:{name:0/1}, p}
  function worldsIndependent(vars) { // vars: [{name, p}] with p = P(name = 1)
    var out = [{ vals: {}, p: 1 }];
    vars.forEach(function (v) {
      var nx = [];
      out.forEach(function (w) {
        [1, 0].forEach(function (b) {
          var vals = Object.assign({}, w.vals); vals[v.name] = b;
          nx.push({ vals: vals, p: w.p * (b ? v.p : 1 - v.p) });
        });
      });
      out = nx;
    });
    return out;
  }
  function sumWorlds(ws, pred) { return ws.reduce(function (s, w) { return pred(w) ? s + w.p : s; }, 0); }

  // Bayesian network over binary variables: nodes in topological order,
  // node = {name, parents:[names], cpt:{ '10': P(node=1 | parents as 1,0 string) }}
  function bnJoint(bn) {
    var worlds = [{ vals: {}, p: 1 }];
    bn.forEach(function (nd) {
      var nx = [];
      worlds.forEach(function (w) {
        var key = nd.parents.map(function (pn) { return w.vals[pn]; }).join('');
        var p1 = nd.cpt[key];
        [1, 0].forEach(function (b) {
          var vals = Object.assign({}, w.vals); vals[nd.name] = b;
          nx.push({ vals: vals, p: w.p * (b ? p1 : 1 - p1) });
        });
      });
      worlds = nx;
    });
    return worlds;
  }
  function bnQuery(bn, query, evidence) {
    var ws = bnJoint(bn);
    function match(w, cond) { return Object.keys(cond).every(function (k) { return w.vals[k] === cond[k]; }); }
    var pe = sumWorlds(ws, function (w) { return match(w, evidence || {}); });
    var pqe = sumWorlds(ws, function (w) { return match(w, evidence || {}) && match(w, query); });
    return { pEvidence: pe, pJoint: pqe, posterior: pe > 0 ? pqe / pe : NaN };
  }
  function num(x) { return String(Math.round(x * 1e6) / 1e6); }
  function bnToProbLog(bn) {
    var lines = [];
    bn.forEach(function (nd) {
      if (!nd.parents.length) { lines.push(num(nd.cpt['']) + '::' + nd.name + '.'); return; }
      Object.keys(nd.cpt).sort().reverse().forEach(function (key) {
        var p = nd.cpt[key]; if (p <= 0) return;
        var body = nd.parents.map(function (pn, i) { return key[i] === '1' ? pn : '\\+ ' + pn; }).join(', ');
        lines.push(num(p) + '::' + nd.name + ' :- ' + body + '.');
      });
    });
    return lines.join('\n');
  }

  // HMM by enumeration over all hidden paths (short sequences only)
  function hmmEnumerate(model, obs) {
    var S = model.states, paths = [[]];
    for (var t = 0; t < obs.length; t++) {
      var nx = [];
      paths.forEach(function (pth) { S.forEach(function (s) { nx.push(pth.concat([s])); }); });
      paths = nx;
    }
    var res = paths.map(function (pth) {
      var p = model.start[pth[0]] * model.emit[pth[0]][obs[0]];
      for (var t2 = 1; t2 < obs.length; t2++) p *= model.trans[pth[t2 - 1]][pth[t2]] * model.emit[pth[t2]][obs[t2]];
      return { path: pth, p: p };
    });
    var total = res.reduce(function (s, r) { return s + r.p; }, 0);
    res.forEach(function (r) { r.post = r.p / total; });
    var marg = obs.map(function (_, t) {
      var m = {}; S.forEach(function (s) { m[s] = 0; });
      res.forEach(function (r) { m[r.path[t]] += r.post; });
      return m;
    });
    return { paths: res, total: total, marginals: marg };
  }

  KR.worldsIndependent = worldsIndependent; KR.sumWorlds = sumWorlds;
  KR.bnJoint = bnJoint; KR.bnQuery = bnQuery; KR.bnToProbLog = bnToProbLog; KR.hmmEnumerate = hmmEnumerate;
  if (typeof module !== 'undefined' && module.exports) module.exports = KR;
})(typeof window !== 'undefined' ? window : globalThis);
