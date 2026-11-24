/* Module 5 widgets: Fitch stepper, modus ponens workbench, graph colouring. */
(function () {
  var UI = window.UI, KR = window.KR, h = UI.h;

  var PROOFS = {
    trans: {
      goal: '{p → q, q → r} ⊢ p → r',
      lines: [
        { n: '1', d: 0, f: 'p → q', j: 'Premise', say: 'A premise: we may write it down at any time.' },
        { n: '2', d: 0, f: 'q → r', j: 'Premise', say: 'The other premise.' },
        { n: '3.1', d: 1, f: 'p', j: 'Assumption', say: 'The goal is an implication, so open a box and assume its left side. Everything inside this box is "under the assumption p".' },
        { n: '3.2', d: 1, f: 'q', j: 'IE: 1, 3.1', say: 'Implication Elimination (modus ponens) on lines 1 and 3.1: from p → q and p we get q.' },
        { n: '3.3', d: 1, f: 'r', j: 'IE: 2, 3.2', say: 'Again IE, on line 2 and the q we just derived.' },
        { n: '4', d: 0, f: 'p → r', j: 'II: 3.1–3.3', say: 'Implication Introduction. The box showed that p leads to r, so close the box and conclude p → r. The assumption p is discharged: it does not hold outside the box.' }
      ]
    },
    nested: {
      goal: '{p → q, m → (p ∨ q)} ⊢ m → q',
      lines: [
        { n: '1', d: 0, f: 'p → q', j: 'Premise', say: 'First premise.' },
        { n: '2', d: 0, f: 'm → (p ∨ q)', j: 'Premise', say: 'Second premise.' },
        { n: '3.1', d: 1, f: 'm', j: 'Assumption', say: 'Goal m → q is an implication: assume m in an outer box.' },
        { n: '3.2', d: 1, f: 'p ∨ q', j: 'IE: 2, 3.1', say: 'From m → (p ∨ q) and m, get p ∨ q.' },
        { n: '3.3.1', d: 2, f: 'p', j: 'Assumption', say: 'To use a disjunction we need an implication from each disjunct to the target q. Start with p: open an inner box.' },
        { n: '3.3.2', d: 2, f: 'q', j: 'IE: 1, 3.3.1', say: 'Premise 1 turns p into q.' },
        { n: '3.4.1', d: 2, f: 'q', j: 'Assumption', say: 'Now the other disjunct, q, in a second inner box (the lecture numbers this box 3.4).' },
        { n: '3.4.2', d: 2, f: 'q', j: 'Reiteration: 3.4.1', say: 'q is already available, so just repeat it. The assumption itself is the conclusion.' },
        { n: '3.4.3', d: 1, f: 'q → q', j: 'II: 3.4.1–3.4.2', say: 'Closing the second inner box gives q → q.' },
        { n: '3.5', d: 1, f: 'q', j: 'OE: 3.2, 1, 3.4.3', say: 'Or Elimination: we have p ∨ q, p → q (line 1) and q → q (line 3.4.3). Either way q holds.' },
        { n: '4', d: 0, f: 'm → q', j: 'II: 3.1–3.5', say: 'Close the outer box: m leads to q, so m → q.' }
      ]
    },
    dneg: {
      goal: '⊢ p → ¬¬p',
      lines: [
        { n: '1.1', d: 1, f: 'p', j: 'Assumption', say: 'No premises at all. The goal p → ¬¬p is an implication, so open a box and assume its left side p. Inside, the target is ¬¬p.' },
        { n: '1.2.1', d: 2, f: '¬p', j: 'Assumption', say: 'The target ¬¬p is a negation: "not (¬p)". The only rule that makes a ¬ is NI, which needs ¬p → ψ and ¬p → ¬ψ for some ψ. Pick ψ = p. First build ¬p → p: open a box assuming ¬p.' },
        { n: '1.2.2', d: 2, f: 'p', j: 'Reiteration: 1.1', say: 'p is still usable here: it is the assumption of the outer box, and that box is still open. Repeat it.' },
        { n: '1.2.3', d: 1, f: '¬p → p', j: 'II: 1.2.1–1.2.2', say: 'Close the inner box with II: assuming ¬p we reached p, so ¬p → p.' },
        { n: '1.3.1', d: 2, f: '¬p', j: 'Assumption', say: 'Now the second input for NI, ¬p → ¬p. Open a new box assuming ¬p.' },
        { n: '1.3.2', d: 2, f: '¬p', j: 'Reiteration: 1.3.1', say: 'The target ¬p is the assumption itself: just repeat it (same trick as q → q in worked proof 2).' },
        { n: '1.3.3', d: 1, f: '¬p → ¬p', j: 'II: 1.3.1–1.3.2', say: 'Close the box: ¬p → ¬p.' },
        { n: '1.4', d: 1, f: '¬¬p', j: 'NI: 1.2.3, 1.3.3', say: 'NI with φ = ¬p and ψ = p: from ¬p → p and ¬p → ¬p, conclude ¬(¬p), which is ¬¬p. In words: ¬p leads to both p and ¬p, a contradiction, so ¬p is false.' },
        { n: '2', d: 0, f: 'p → ¬¬p', j: 'II: 1.1–1.4', say: 'Close the outer box: assuming p we reached ¬¬p, so p → ¬¬p. Every assumption is discharged and no premise was used, so ⊢ p → ¬¬p.' }
      ]
    },
    nonc: {
      goal: '⊢ ¬(p ∧ ¬p)',
      lines: [
        { n: '1.1', d: 1, f: 'p ∧ ¬p', j: 'Assumption', say: 'The goal ¬(p ∧ ¬p) is a negation, so the last step is NI. NI needs (p ∧ ¬p) → ψ and (p ∧ ¬p) → ¬ψ. Pick ψ = p. To build the first implication, open a box assuming p ∧ ¬p.' },
        { n: '1.2', d: 1, f: 'p', j: 'AE: 1.1', say: 'And Elimination: from p ∧ ¬p take the left part, p.' },
        { n: '2', d: 0, f: '(p ∧ ¬p) → p', j: 'II: 1.1–1.2', say: 'Close the box with II: p ∧ ¬p leads to p.' },
        { n: '3.1', d: 1, f: 'p ∧ ¬p', j: 'Assumption', say: 'Now the second implication. Open a new box with the same assumption.' },
        { n: '3.2', d: 1, f: '¬p', j: 'AE: 3.1', say: 'And Elimination again, this time taking the right part, ¬p.' },
        { n: '4', d: 0, f: '(p ∧ ¬p) → ¬p', j: 'II: 3.1–3.2', say: 'Close the box: p ∧ ¬p leads to ¬p.' },
        { n: '5', d: 0, f: '¬(p ∧ ¬p)', j: 'NI: 2, 4', say: 'NI with φ = p ∧ ¬p and ψ = p: φ leads to both p and ¬p, so φ is false. No premises were used, so ⊢ ¬(p ∧ ¬p).' }
      ]
    }
  };
  UI.widgets.fitch = function (box, cfg) {
    var P = PROOFS[cfg.proof], k = 1;
    var tbl = h('div'), say = h('div'), bar = h('div', { class: 'row' });
    function draw() {
      tbl.innerHTML = ''; say.innerHTML = '';
      var t = h('table', { class: 'proof' });
      // box chain of a line: the line number prefixes, one per depth ("3.3.1" at depth 2 -> ["3", "3.3"])
      function chain(L) { var p = L.n.split('.'), c = []; for (var j = 1; j <= L.d; j++) c.push(p.slice(0, j).join('.')); return c; }
      var shown = P.lines.slice(0, k), maxD = Math.max.apply(null, P.lines.map(function (L) { return L.d; }));
      var A = 'linear-gradient(var(--accent),var(--accent))';
      shown.forEach(function (L, i) {
        var me = chain(L), pr = i ? chain(shown[i - 1]) : [], nx = i + 1 < shown.length ? chain(shown[i + 1]) : [];
        var tr = h('tr', i === k - 1 ? { class: 'cur' } : null);
        tr.appendChild(h('td', { class: 'ln', text: L.n }));
        // one table column per box level; the bar is a background, so it fills the row height in every browser.
        // A box opens with a top tick and closes with a bottom tick; the gap between ticks separates sibling boxes.
        me.forEach(function (b, j) {
          var T = pr[j] !== b ? 5 : 0, B = nx[j] !== b ? 5 : 0;
          var bg = [A + ' left 0 top ' + T + 'px / 2px calc(100% - ' + (T + B) + 'px) no-repeat'];
          if (T) bg.push(A + ' left 0 top ' + T + 'px / 9px 2px no-repeat');
          if (B) bg.push(A + ' left 0 bottom ' + B + 'px / 9px 2px no-repeat');
          tr.appendChild(h('td', { style: 'width:12px;min-width:12px;padding:0;border:none;background:' + bg.join(',') }));
        });
        var isAsm = /^Assumption/.test(L.j);
        tr.appendChild(h('td', { colspan: String(maxD - L.d + 1), style: 'white-space:nowrap;padding-left:4px' },
          h('span', { style: isAsm ? 'border-bottom:1.5px solid var(--fg);padding-bottom:1px' : '', text: L.f })));
        tr.appendChild(h('td', { class: 'why', text: L.j }));
        t.appendChild(tr);
      });
      tbl.appendChild(t);
      say.appendChild(UI.msg('info', '<b>Line ' + P.lines[k - 1].n + '.</b> ' + UI.esc(P.lines[k - 1].say)));
      prev.disabled = k <= 1; next.disabled = k >= P.lines.length;
    }
    var prev = h('button', { class: 'ghost', text: '← back', onclick: function () { k--; draw(); } });
    var next = h('button', { class: 'solid', text: 'next line →', onclick: function () { k++; draw(); } });
    bar.appendChild(prev); bar.appendChild(next);
    box.appendChild(h('p', { html: 'Goal: <span class="m">' + UI.esc(P.goal) + '</span>' }));
    box.appendChild(tbl); box.appendChild(say); box.appendChild(bar); draw();
  };

  // modus ponens workbench: build the proof of r from p, p→q, (p→q)→(q→r)
  UI.widgets.ie = function (box, cfg) {
    var base = cfg.kb || ['p', 'p -> q', '(p -> q) -> (q -> r)'], goal = cfg.goal || 'r';
    var lines = [], out = h('div'), apps = h('div', { class: 'chips' });
    function reset() { lines = base.map(function (s) { var f = KR.parse(s); return { f: f, s: KR.fmt(f), j: 'Premise' }; }); draw(); }
    function draw() {
      out.innerHTML = ''; apps.innerHTML = '';
      var t = h('table', { class: 'proof' });
      lines.forEach(function (L, i) { t.appendChild(h('tr', null, h('td', { class: 'ln', text: String(i + 1) }), h('td', { text: L.s }), h('td', { class: 'why', text: L.j }))); });
      out.appendChild(t);
      var have = {}; lines.forEach(function (L) { have[L.s] = 1; });
      var found = 0;
      lines.forEach(function (A, i) {
        if (A.f.t !== 'imp') return;
        lines.forEach(function (B, j) {
          if (KR.fmt(A.f.a) !== B.s) return;
          var concl = KR.fmt(A.f.b); if (have[concl]) return;
          found++;
          apps.appendChild(h('button', { text: 'IE on ' + (i + 1) + ', ' + (j + 1) + '  ⇒  ' + concl, onclick: function () { lines.push({ f: A.f.b, s: concl, j: 'IE: ' + (i + 1) + ', ' + (j + 1) }); draw(); } }));
        });
      });
      if (lines.some(function (L) { return L.s === goal; })) out.appendChild(UI.msg('ok', 'You have derived <b>' + UI.esc(goal) + '</b>. This list is a proof: every line is a premise or follows by IE from earlier lines.'));
      else if (!found) out.appendChild(UI.msg('warn', 'No instance of IE applies any more and ' + UI.esc(goal) + ' is not derived. With only this rule the goal is out of reach.'));
    }
    box.appendChild(h('p', { html: 'Goal: derive <span class="m">' + UI.esc(goal) + '</span>. Each button below is an instance of IE whose two premises are already in the list.' }));
    box.appendChild(out); box.appendChild(h('div', { class: 'out' }, apps)); box.appendChild(h('button', { class: 'ghost', text: 'Reset', onclick: reset })); reset();
  };

  // graph colouring as SAT. Shared drawing: on = { vertex: [colours whose atom is 1] }.
  var GV = [1, 2, 3, 4], GC = [1, 2, 3, 4], GE = [[1, 2], [1, 3], [1, 4], [2, 4], [3, 4]];
  var POS = { 1: [130, 44], 2: [45, 115], 3: [215, 115], 4: [130, 186] };
  var FILL = { 1: '#4e79a7', 2: '#f28e2b', 3: '#59a14f', 4: '#b07aa1' };
  function onOf(on, v) { return (on && on[v]) || []; }
  function gsvg(on, V, E, maxw) {
    var xs = [], ys = [];
    V.forEach(function (v) { xs.push(POS[v][0]); ys.push(POS[v][1]); });
    var x0 = Math.min.apply(null, xs) - 45, y0 = Math.min.apply(null, ys) - 40, w = Math.max.apply(null, xs) + 45 - x0, hh = Math.max.apply(null, ys) + 50 - y0;
    var s = '<svg viewBox="' + x0 + ' ' + y0 + ' ' + w + ' ' + hh + '" class="vsvg" role="img" aria-label="graph coloured by the assignment" style="max-width:' + (maxw || 340) + 'px;width:100%;display:block;margin:0 auto">';
    E.forEach(function (e) {
      var a = POS[e[0]], b = POS[e[1]];
      var clash = onOf(on, e[0]).some(function (c) { return onOf(on, e[1]).indexOf(c) >= 0; });
      s += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" style="stroke:' + (clash ? 'var(--bad)' : 'var(--muted)') + ';stroke-width:' + (clash ? 4 : 2) + (clash ? ';stroke-dasharray:7 4' : '') + '"/>';
    });
    V.forEach(function (v) {
      var p = POS[v], r = 20, on1 = on === null ? null : onOf(on, v);
      if (on1 === null) {
        s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '" style="fill:var(--card);stroke:var(--fg);stroke-width:1.5"/>';
        s += '<text x="' + p[0] + '" y="' + (p[1] + 5) + '" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fg)">' + v + '</text>';
        return;
      }
      s += vtx(p, r, on1, v);
    });
    return s + '</svg>';
  }
  function vtx(p, r, on, v) {
    var s = '';
    if (!on.length) s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '" style="fill:var(--card);stroke:var(--bad);stroke-width:2.5;stroke-dasharray:4 3"/>';
    else if (on.length === 1) s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '" style="fill:' + FILL[on[0]] + ';stroke:var(--fg);stroke-width:1.5"/>';
    else {
      on.forEach(function (c, i) {
        var a0 = -Math.PI / 2 + 2 * Math.PI * i / on.length, a1 = -Math.PI / 2 + 2 * Math.PI * (i + 1) / on.length;
        s += '<path d="M' + p[0] + ' ' + p[1] + ' L' + (p[0] + r * Math.cos(a0)).toFixed(1) + ' ' + (p[1] + r * Math.sin(a0)).toFixed(1) + ' A' + r + ' ' + r + ' 0 ' + (a1 - a0 > Math.PI ? 1 : 0) + ' 1 ' + (p[0] + r * Math.cos(a1)).toFixed(1) + ' ' + (p[1] + r * Math.sin(a1)).toFixed(1) + ' Z" style="fill:' + FILL[c] + '"/>';
      });
      s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '" style="fill:none;stroke:var(--bad);stroke-width:2.5"/>';
    }
    s += '<text x="' + p[0] + '" y="' + (p[1] + 5) + '" text-anchor="middle" font-size="15" font-weight="700" style="fill:' + (on.length ? '#fff' : 'var(--fg)') + '">' + v + '</text>';
    var tag = on.length ? on.map(function (c) { return v + '' + c; }).join(', ') : 'no colour';
    s += '<text x="' + p[0] + '" y="' + (p[1] + (v === 1 ? -26 : 36)) + '" text-anchor="middle" font-size="11" style="fill:' + (on.length === 1 ? 'var(--muted)' : 'var(--bad)') + '">' + tag + '</text>';
    return s;
  }
  // assignment table: row = vertex, column = colour, cell = atom vc with its value; a 1 is painted in colour c
  function gridHtml(on, V, C) {
    var s = '<table class="agrid" style="border-collapse:collapse;margin:0 auto;font-size:.9em"><tr><th></th>' + C.map(function (c) { return '<th style="padding:2px 6px">colour ' + c + '</th>'; }).join('') + '</tr>';
    V.forEach(function (v) {
      s += '<tr><th style="padding:2px 6px;text-align:right">vertex ' + v + '</th>' + C.map(function (c) {
        var one = onOf(on, v).indexOf(c) >= 0;
        return '<td class="m" style="padding:3px 8px;text-align:center;border:1px solid var(--line);' + (one ? 'background:' + FILL[c] + ';color:#fff;font-weight:700' : 'color:var(--muted)') + '">' + v + c + '=' + (one ? 1 : 0) + '</td>';
      }).join('') + '</tr>';
    });
    return s + '</table>';
  }
  function legendHtml(C) {
    return C.map(function (c) { return '<span style="display:inline-block;width:11px;height:11px;border-radius:50%;background:' + FILL[c] + ';vertical-align:middle;margin:0 4px 0 10px"></span>colour ' + c; }).join('');
  }
  // static figures. cfg.figs: [{ on:['11','22',...] true atoms (omit for an uncoloured graph), v:[..], c:[..], grid:bool, cap:'', tag:'ok'|'bad' }]
  UI.widgets.gfig = function (box, cfg) {
    var row = h('div', { style: 'display:flex;flex-wrap:wrap;gap:14px;justify-content:center;align-items:flex-start' });
    cfg.figs.forEach(function (f0) {
      var f = {}; Object.keys(f0).forEach(function (k) { f[k] = f0[k]; });
      if (f.on) { var m = {}; f.on.forEach(function (a) { var v = +a[0], c = +a[1]; (m[v] = m[v] || []).push(c); }); f.on = m; }
      var V = f.v || GV, E = f.e || (f.v ? GE.filter(function (e) { return V.indexOf(e[0]) >= 0 && V.indexOf(e[1]) >= 0; }) : GE), C = f.c || GC;
      var cell = h('div', { style: 'flex:1 1 ' + (f.grid ? '440px' : '170px') + ';max-width:' + (f.grid ? '640px' : '260px') + ';text-align:center' });
      var inner = '';
      if (f.grid) inner += '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px"><div>' + gridHtml(f.on, V, C) + '</div><div style="font-size:1.6em;color:var(--muted)" title="each 1 paints its vertex">⟶</div><div style="flex:0 1 230px">' + gsvg(f.on, V, E, 230) + '</div></div>';
      else inner += gsvg(f.on === undefined ? null : f.on, V, E, f.w || 200);
      if (f.cap) inner += '<p style="font-size:.88em;margin:.3em 0">' + (f.tag ? '<span class="tag ' + f.tag + '">' + (f.tag === 'ok' ? 'allowed' : 'broken') + '</span> ' : '') + f.cap + '</p>';
      cell.innerHTML = inner;
      row.appendChild(cell);
    });
    box.appendChild(row);
    if (cfg.legend) box.appendChild(h('p', { style: 'text-align:center;font-size:.85em;color:var(--muted);margin:.4em 0 0', html: legendHtml(GC) }));
  };

  UI.widgets.colouring = function (box) {
    var V = GV, C = GC, E = GE;
    var I = {}; V.forEach(function (v) { C.forEach(function (c) { I[v + '' + c] = v === c ? 1 : 0; }); });
    var grid = h('div'), out = h('div', { class: 'out' }), pic = h('div', { class: 'gpic' });
    function curOn() { var on = {}; V.forEach(function (v) { on[v] = C.filter(function (c) { return I[v + '' + c]; }); }); return on; }
    function picture() {
      var s = gsvg(curOn(), V, E, 340);
      var legend = legendHtml(C);
      legend += '<br>Each atom set to 1 paints its vertex: vc = 1 paints vertex v with colour c. Dashed red edge: both ends share a colour (F3 fails). Split vertex: two colours (F2 fails). Empty dashed vertex: no colour (F1 fails).';
      pic.innerHTML = s + '<p style="text-align:center;font-size:.85em;color:var(--muted);margin:.3em 0 .8em">' + legend + '</p>';
    }
    function draw() {
      picture();
      grid.innerHTML = '';
      var rows = V.map(function (v) {
        return [{ text: 'vertex ' + v }].concat(C.map(function (c) {
          var k = v + '' + c;
          return { class: 'toggle ' + (I[k] ? 't1' : 't0'), style: I[k] ? 'background:' + FILL[c] + ';color:#fff' : '', text: k + '=' + I[k], onclick: function () { I[k] = I[k] ? 0 : 1; draw(); } };
        }));
      });
      grid.appendChild(UI.table(['', 'colour 1', 'colour 2', 'colour 3', 'colour 4'], rows));
      var F1 = V.every(function (v) { return C.some(function (c) { return I[v + '' + c]; }); });
      var F2 = V.every(function (v) { return C.every(function (c) { return C.every(function (d) { return c === d || !(I[v + '' + c] && I[v + '' + d]); }); }); });
      var bad = [];
      E.forEach(function (e) { C.forEach(function (c) { if (I[e[0] + '' + c] && I[e[1] + '' + c]) bad.push('vertices ' + e[0] + ' and ' + e[1] + ' both have colour ' + c); }); });
      var F3 = !bad.length;
      out.innerHTML = '';
      out.appendChild(UI.table(['Sentence', 'Meaning', 'Holds?'], [
        ['F1', 'each vertex gets at least one colour', UI.bit(F1)],
        ['F2', 'each vertex gets at most one colour', UI.bit(F2)],
        ['F3', 'adjacent vertices differ (edges 1-2, 1-3, 1-4, 2-4, 3-4)', UI.bit(F3)]]));
      if (!F3) out.appendChild(UI.msg('bad', UI.esc(bad.join('; ')) + '.'));
      if (F1 && F2 && F3) {
        var col = V.map(function (v) { return v + '↦' + C.filter(function (c) { return I[v + '' + c]; })[0]; }).join(', ');
        out.appendChild(UI.msg('ok', 'F1 ∧ F2 ∧ F3 is true, so this assignment is a model of F and encodes the colouring ' + col + '.'));
      } else out.appendChild(UI.msg('info', 'F1 ∧ F2 ∧ F3 is false, so this assignment is not a colouring.'));
    }
    box.appendChild(h('p', { text: 'Click an atom to flip it. The atom vc means "vertex v gets colour c". Start from the lecture model (11, 22, 33, 44 true), then try to make two neighbours share a colour. The picture shows the exam graph coloured by the current assignment.' }));
    box.appendChild(grid); box.appendChild(pic); box.appendChild(out); draw();
  };
})();
