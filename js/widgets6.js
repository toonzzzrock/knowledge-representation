/* Module 6 widgets: coin worlds, coin game, alarm network, HMM, frequency learning. */
(function () {
  var UI = window.UI, KR = window.KR, h = UI.h;
  function f3(x) { return (Math.round(x * 1e6) / 1e6).toString(); }

  // slider returning {el, get, set}
  function slider(label, val, onChange) {
    var out = h('span', { class: 'm', text: f3(val) });
    var inp = h('input', { type: 'range', min: '0', max: '1', step: '0.05', value: String(val) });
    inp.addEventListener('input', function () { out.textContent = f3(parseFloat(inp.value)); onChange(); });
    return { el: h('div', { class: 'row' }, h('label', { text: label + ' ' }), inp, out), get: function () { return parseFloat(inp.value); } };
  }

  // two coins: worlds and events
  UI.widgets.coins = function (box, cfg) {
    var out = h('div', { class: 'out' });
    var s1 = slider('P(H1)', cfg.p1 !== undefined ? cfg.p1 : 0.5, draw), s2 = slider('P(H2)', cfg.p2 !== undefined ? cfg.p2 : 0.6, draw);
    var W = ['H1H2', 'H1T2', 'T1H2', 'T1T2'], inE = { H1H2: 1, H1T2: 0, T1H2: 0, T1T2: 1 };
    function draw() {
      var a = s1.get(), b = s2.get();
      var pr = { H1H2: a * b, H1T2: a * (1 - b), T1H2: (1 - a) * b, T1T2: (1 - a) * (1 - b) };
      out.innerHTML = '';
      var tot = 0, pe = 0;
      var rows = W.map(function (w) {
        tot += pr[w]; if (inE[w]) pe += pr[w];
        return [
          w,
          { text: (w[0] === 'H' ? f3(a) : f3(1 - a)) + ' × ' + (w[2] === 'H' ? f3(b) : f3(1 - b)) + ' = ' + f3(pr[w]) },
          h('input', { type: 'checkbox', checked: inE[w] ? 'checked' : null, onchange: function (e) { inE[w] = e.target.checked ? 1 : 0; draw(); } })];
      });
      out.appendChild(UI.table(['world ω', 'P(ω) (independent coins: multiply)', 'in event E?'], rows));
      out.appendChild(UI.msg('info', 'Sum over all worlds = <b>' + f3(tot) + '</b> (always 1). P(E) = ' + W.filter(function (w) { return inE[w]; }).map(function (w) { return f3(pr[w]); }).join(' + ') + ' = <b>' + f3(pe) + '</b>.'));
    }
    box.appendChild(s1.el); box.appendChild(s2.el); box.appendChild(out); draw();
  };

  // coin game: win(10) if both heads, win(-5) if H1 T2, else draw
  UI.widgets.coingame = function (box, cfg) {
    var out = h('div', { class: 'out' });
    var s1 = slider('P(head1)', 0.5, draw), s2 = slider('P(head2)', 0.6, draw);
    function draw() {
      var a = s1.get(), b = s2.get();
      var W = [['head1, head2', a * b, 'win(10)', 10], ['head1, tail2', a * (1 - b), 'win(-5)', -5], ['tail1, head2', (1 - a) * b, 'win(0)', 0], ['tail1, tail2', (1 - a) * (1 - b), 'win(0)', 0]];
      var eg = 0, rows = W.map(function (w) { eg += w[1] * w[3]; return [w[0], f3(w[1]), w[2]]; });
      out.innerHTML = '';
      out.appendChild(UI.table(['world: facts that hold', 'P(world)', 'what Δω proves'], rows));
      out.appendChild(UI.msg('info', 'P(win(10)) = <b>' + f3(W[0][1]) + '</b>, P(win(-5)) = <b>' + f3(W[1][1]) + '</b>, P(win(0)) = <b>' + f3(W[2][1] + W[3][1]) + '</b>. Expected gain = 10·' + f3(W[0][1]) + ' − 5·' + f3(W[1][1]) + ' = <b>' + f3(eg) + '</b>.'));
    }
    box.appendChild(s1.el); box.appendChild(s2.el); box.appendChild(out); draw();
  };

  // alarm network
  UI.widgets.alarm = function (box) {
    var out = h('div', { class: 'out' }), code = h('pre', { class: 'code' });
    var sB = slider('P(b)', 0.7, draw), sE = slider('P(e)', 0.2, draw);
    var sA = { '11': slider('P(a | b, e)', 0.9, draw), '10': slider('P(a | b, ¬e)', 0.8, draw), '01': slider('P(a | ¬b, e)', 0.1, draw), '00': slider('P(a | ¬b, ¬e)', 0, draw) };
    var ev = 'none', qy = 'a';
    function sel(label, opts, cur, set) {
      var s = h('select', { onchange: function (e) { set(e.target.value); draw(); } }, opts.map(function (o) { return h('option', { value: o[0], text: o[1] }); }));
      s.value = cur; return h('div', { class: 'row' }, h('label', { text: label + ' ' }), s);
    }
    function draw() {
      var bn = [{ name: 'burglary', parents: [], cpt: { '': sB.get() } }, { name: 'earthquake', parents: [], cpt: { '': sE.get() } },
        { name: 'alarm', parents: ['burglary', 'earthquake'], cpt: { '11': sA['11'].get(), '10': sA['10'].get(), '01': sA['01'].get(), '00': sA['00'].get() } }];
      var evid = ev === 'none' ? {} : { alarm: ev === 'a' ? 1 : 0 };
      var r = KR.bnQuery(bn, { alarm: 1 }, {}), rb = KR.bnQuery(bn, { burglary: 1 }, evid), re = KR.bnQuery(bn, { earthquake: 1 }, evid);
      var J = KR.bnJoint(bn);
      out.innerHTML = '';
      out.appendChild(UI.table(['b', 'e', 'a', 'P(b)·P(e)·P(a | b, e)'], J.map(function (w) { return [String(w.vals.burglary), String(w.vals.earthquake), String(w.vals.alarm), f3(w.p)]; })));
      out.appendChild(UI.msg('info', 'Prior P(a) = <b>' + f3(r.posterior) + '</b>. ' + (ev === 'none'
        ? 'P(b) = ' + f3(rb.posterior) + ', P(e) = ' + f3(re.posterior) + ' (no evidence, so these are the priors).'
        : 'Given evidence a = ' + (ev === 'a' ? 'true' : 'false') + ': P(b | evidence) = <b>' + f3(rb.posterior) + '</b>, P(e | evidence) = <b>' + f3(re.posterior) + '</b>.')));
      code.textContent = KR.bnToProbLog(bn) + '\n\n' + (ev === 'none' ? '' : 'evidence(alarm, ' + (ev === 'a' ? 'true' : 'false') + ').\n') + 'query(burglary).';
    }
    box.appendChild(sB.el); box.appendChild(sE.el);
    ['11', '10', '01', '00'].forEach(function (k) { box.appendChild(sA[k].el); });
    box.appendChild(sel('Evidence', [['none', 'none'], ['a', 'alarm is true'], ['na', 'alarm is false']], ev, function (v) { ev = v; }));
    box.appendChild(out);
    box.appendChild(h('div', { class: 'wt', text: 'THE SAME NETWORK AS A PROBLOG PROGRAM' })); box.appendChild(code); draw();
  };

  // HMM with the standard textbook numbers
  UI.widgets.hmm = function (box) {
    var model = { states: ['R', 'S'], start: { R: 0.6, S: 0.4 }, trans: { R: { R: 0.7, S: 0.3 }, S: { R: 0.4, S: 0.6 } },
      emit: { R: { walk: 0.1, shop: 0.4, clean: 0.5 }, S: { walk: 0.6, shop: 0.3, clean: 0.1 } } };
    var acts = ['walk', 'shop', 'clean'], obs = ['walk', 'shop', 'clean'], out = h('div', { class: 'out' });
    box.appendChild(UI.msg('warn', 'These are the standard numbers for this example (start R 0.6, S 0.4). The lecture figure holds its own tables, so check them against yours.'));
    box.appendChild(UI.table(['', 'to R', 'to S', 'walk', 'shop', 'clean'], [
      ['from R', '0.7', '0.3', '0.1', '0.4', '0.5'], ['from S', '0.4', '0.6', '0.6', '0.3', '0.1']].map(function (r) { return r; })));
    var ctl = h('div', { class: 'row' });
    function draw() {
      ctl.innerHTML = '';
      obs.forEach(function (o, t) {
        var s = h('select', { onchange: function (e) { obs[t] = e.target.value; draw(); } }, acts.map(function (a) { return h('option', { value: a, text: a }); }));
        s.value = o; ctl.appendChild(h('span', null, 'day ' + (t + 1) + ': ', s, ' '));
      });
      var r = KR.hmmEnumerate(model, obs);
      out.innerHTML = '';
      out.appendChild(UI.table(['hidden path', 'P(path, observations)', 'P(path | observations)'], r.paths.map(function (p) { return [p.path.join(' → '), f3(p.p), f3(p.post)]; })));
      var best = r.paths.reduce(function (a, b) { return b.post > a.post ? b : a; });
      out.appendChild(UI.msg('info', 'Probability of this activity sequence = <b>' + f3(r.total) + '</b>. Most likely weather: <b>' + best.path.join(' → ') + '</b> (' + f3(best.post) + '). Day-by-day: ' + r.marginals.map(function (m, t) { return 'day ' + (t + 1) + ' R ' + f3(m.R); }).join(', ') + '.'));
    }
    box.appendChild(ctl); box.appendChild(out); draw();
  };

  // frequency learning on a fully observed dataset
  UI.widgets.learnfreq = function (box) {
    var data = [[0, 0], [0, 0], [0, 1], [1, 1], [0, 0], [1, 1], [0, 0], [0, 0]];
    var out = h('div', { class: 'out' });
    function draw() {
      out.innerHTML = '';
      var n = data.length, nb = data.filter(function (d) { return d[0]; }).length, ne = data.filter(function (d) { return d[1]; }).length;
      out.appendChild(UI.table(['example', 'burglary', 'earthquake', ''], data.map(function (d, i) {
        return [String(i + 1), { class: 'toggle ' + (d[0] ? 't1' : 't0'), text: d[0] ? 'true' : 'false', onclick: function () { d[0] = d[0] ? 0 : 1; draw(); } },
          { class: 'toggle ' + (d[1] ? 't1' : 't0'), text: d[1] ? 'true' : 'false', onclick: function () { d[1] = d[1] ? 0 : 1; draw(); } },
          h('button', { class: 'ghost', text: 'remove', onclick: function () { data.splice(i, 1); draw(); } })];
      })));
      out.appendChild(h('button', { text: 'add example', onclick: function () { data.push([0, 0]); draw(); } }));
      out.appendChild(UI.msg('info', n ? 'Learned <span class="m">t(_)::burglary</span> = ' + nb + '/' + n + ' = <b>' + f3(nb / n) + '</b>; learned <span class="m">t(_)::earthquake</span> = ' + ne + '/' + n + ' = <b>' + f3(ne / n) + '</b>.' : 'Add at least one example.'));
    }
    box.appendChild(h('p', { text: 'Each example lists the values of both variables, so the data is fully observed. Edit it and watch the learned priors move.' }));
    box.appendChild(out); draw();
  };
})();
