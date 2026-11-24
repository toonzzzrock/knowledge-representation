/* Answer visuals. UI.vis(spec) returns an HTML string (static SVG or HTML), so it also runs in node tests.
   A problem may carry vis: [spec, ...]; UI.problem draws them under "The answer as a picture".
   Specs:
   { t:'af', nodes:['A','B'], edges:[['A','B','rebut'],...], ext:[{ name:'grounded', set:['A'] }, ...], pos:{A:[x,y]} }
       one small graph per extension: in = green, attacked by the set = red, neither = grey.
   { t:'table', head:['p','q','φ'], rows:[[1,0,0],...], hl:{ 2:'bad', 0:'ok' }, note:'' }
   { t:'venn', labels:['S','M','P'], empty:['110',...], some:['101','1?1',...], note:'' }
       region code = membership bits in label order; empty = shaded, some = marked x; one '?' = x on the border of the two regions.
   { t:'tree', nodes:[{ id:1, text:'{¬p, q}' }, { id:3, text:'{}', from:[1,2], note:'resolve on q' }], bottomUp:true }
   { t:'fitch', lines:[[0,'p → q','Premise'], [1,'p','Assumption'], ...] }   depth = box nesting
   { t:'dag', nodes:['burglary','alarm'], edges:[['burglary','alarm']], notes:{ alarm:'P = 0.9 if b' } }
   { t:'arg', name:'A1', premises:['...'], concl:'...', note:'' }
*/
(function () {
  var UI = window.UI = window.UI || {};
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var C = { inn: '#2e8b57', out: '#c0392b', und: '#9aa3ad', line: '#55606b', ink: '#1d2530' };

  function arrow(x1, y1, x2, y2, r, col, label, bend) {
    var dx = x2 - x1, dy = y2 - y1, d = Math.sqrt(dx * dx + dy * dy) || 1, ux = dx / d, uy = dy / d;
    var sx = x1 + ux * r, sy = y1 + uy * r, ex = x2 - ux * (r + 6), ey = y2 - uy * (r + 6);
    var mx = (sx + ex) / 2 - uy * bend, my = (sy + ey) / 2 + ux * bend;
    var s = '<path d="M' + sx.toFixed(1) + ' ' + sy.toFixed(1) + ' Q' + mx.toFixed(1) + ' ' + my.toFixed(1) + ' ' + ex.toFixed(1) + ' ' + ey.toFixed(1) + '" stroke="' + col + '" stroke-width="1.6" fill="none" marker-end="url(#vah)"/>';
    if (label) s += '<text x="' + mx.toFixed(1) + '" y="' + (my - 3).toFixed(1) + '" font-size="10" text-anchor="middle" fill="' + C.line + '">' + esc(label) + '</text>';
    return s;
  }
  var DEFS = '<defs><marker id="vah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="' + C.line + '"/></marker></defs>';

  function afPos(spec) {
    var n = spec.nodes.length, pos = {};
    spec.nodes.forEach(function (a, i) {
      if (spec.pos && spec.pos[a]) { pos[a] = spec.pos[a]; return; }
      var ang = -Math.PI / 2 + 2 * Math.PI * i / n, R = n <= 2 ? 55 : 70;
      pos[a] = [110 + R * Math.cos(ang), 95 + R * Math.sin(ang)];
    });
    return pos;
  }
  function afSvg(spec, set, title) {
    var pos = afPos(spec), r = 17, s = '<svg viewBox="0 0 220 190" class="vsvg" role="img">' + DEFS;
    var inSet = {}, out = {};
    (set || []).forEach(function (a) { inSet[a] = 1; });
    spec.edges.forEach(function (e) { if (inSet[e[0]]) out[e[1]] = 1; });
    var has = {}; spec.edges.forEach(function (e) { has[e[0] + '>' + e[1]] = 1; });
    spec.edges.forEach(function (e) {
      var a = pos[e[0]], b = pos[e[1]];
      if (e[0] === e[1]) { s += '<path d="M' + (a[0] - 8) + ' ' + (a[1] - r) + ' C' + (a[0] - 30) + ' ' + (a[1] - 50) + ' ' + (a[0] + 30) + ' ' + (a[1] - 50) + ' ' + (a[0] + 8) + ' ' + (a[1] - r - 4) + '" stroke="' + C.line + '" stroke-width="1.6" fill="none" marker-end="url(#vah)"/>'; return; }
      s += arrow(a[0], a[1], b[0], b[1], r, C.line, e[2] || '', has[e[1] + '>' + e[0]] ? 14 : 0);
    });
    spec.nodes.forEach(function (a) {
      var p = pos[a], col = set ? (inSet[a] ? C.inn : out[a] ? C.out : C.und) : '#fff';
      s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '" fill="' + col + '" stroke="' + C.ink + '" stroke-width="1.2"/>' +
        '<text x="' + p[0] + '" y="' + (p[1] + 4) + '" font-size="' + (a.length > 3 ? 9 : 12) + '" text-anchor="middle" fill="' + (set ? '#fff' : C.ink) + '" font-weight="600">' + esc(a) + '</text>';
    });
    return '<figure class="vfig">' + s + '</svg><figcaption>' + title + '</figcaption></figure>';
  }
  function af(spec) {
    var figs = afSvg(spec, null, 'the attack graph');
    (spec.ext || []).forEach(function (x) {
      figs += afSvg(spec, x.set, '<b>' + esc(x.name) + '</b> ' + (x.set.length ? '{' + x.set.map(esc).join(', ') + '}' : '∅'));
    });
    return '<div class="vrow">' + figs + '</div>' + (spec.ext && spec.ext.length ? '<p class="vkey"><i style="background:' + C.inn + '"></i>in the set <i style="background:' + C.out + '"></i>attacked by the set <i style="background:' + C.und + '"></i>neither</p>' : '');
  }

  function table(spec) {
    var s = '<table class="vtab"><tr>' + spec.head.map(function (x) { return '<th>' + x + '</th>'; }).join('') + '</tr>';
    spec.rows.forEach(function (r, i) {
      var k = spec.hl && spec.hl[i];
      s += '<tr' + (k ? ' class="v' + k + '"' : '') + '>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
    });
    return s + '</table>';
  }

  function venn(spec) {
    var c = [[95, 80], [155, 80], [125, 132]], R = 52, id = 'v' + Math.random().toString(36).slice(2, 7);
    var s = '<svg viewBox="0 0 250 205" class="vsvg" role="img"><defs>';
    c.forEach(function (p, i) {
      s += '<clipPath id="' + id + 'c' + i + '"><circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + R + '"/></clipPath>' +
        '<mask id="' + id + 'm' + i + '"><rect width="250" height="205" fill="#fff"/><circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + R + '" fill="#000"/></mask>';
    });
    s += '</defs>';
    function region(code, fill) {
      var open = '', close = '';
      for (var i = 0; i < 3; i++) {
        open += code[i] === '1' ? '<g clip-path="url(#' + id + 'c' + i + ')">' : '<g mask="url(#' + id + 'm' + i + ')">';
        close += '</g>';
      }
      return open + '<rect width="250" height="205" fill="' + fill + '"/>' + close;
    }
    (spec.empty || []).forEach(function (code) { s += region(code, '#b9c0c7'); });
    c.forEach(function (p, i) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + R + '" fill="none" stroke="' + C.ink + '" stroke-width="1.4"/>'; });
    var lab = [[52, 32], [198, 32], [125, 200]];
    spec.labels.forEach(function (l, i) { s += '<text x="' + lab[i][0] + '" y="' + lab[i][1] + '" font-size="14" font-weight="700" text-anchor="middle" fill="' + C.ink + '">' + esc(l) + '</text>'; });
    var at = { '100': [72, 66], '010': [178, 66], '001': [125, 162], '110': [125, 58], '101': [96, 118], '011': [154, 118], '111': [125, 96] };
    (spec.some || []).forEach(function (code) {
      // one '?' puts the x on the border between the two regions it could be in ('1?1' = between 101 and 111)
      // the midpoint of the two region anchors is projected onto the circle of the unknown set, so the x sits on its edge
      var p = code.indexOf('?') < 0 ? at[code] : (function () {
        var a = at[code.replace('?', '0')], b = at[code.replace('?', '1')], o = c[code.indexOf('?')];
        var mx = (a[0] + b[0]) / 2 - o[0], my = (a[1] + b[1]) / 2 - o[1], d = Math.sqrt(mx * mx + my * my) || 1;
        return [o[0] + mx * R / d, o[1] + my * R / d];
      })();
      s += '<text x="' + p[0] + '" y="' + (p[1] + 6) + '" font-size="18" font-weight="700" text-anchor="middle" fill="' + C.out + '">x</text>'; });
    return '<div class="vrow"><figure class="vfig">' + s + '</svg><figcaption>grey = empty, x = something is there</figcaption></figure></div>';
  }

  function tree(spec) {
    var depth = {}, byId = {}, layers = [];
    spec.nodes.forEach(function (n) { byId[n.id] = n; });
    function d(n) { if (depth[n.id] !== undefined) return depth[n.id]; depth[n.id] = n.from && n.from.length ? 1 + Math.max.apply(null, n.from.map(function (f) { return d(byId[f]); })) : 0; return depth[n.id]; }
    spec.nodes.forEach(function (n) { var k = d(n); (layers[k] = layers[k] || []).push(n); });
    // nodes of a layer are spread evenly when they fit, else packed side by side; the canvas widens if a layer needs it
    var rowH = 62, pos = {}, GAP = 14;
    var widths = layers.map(function (L) { return L.map(function (n) { return Math.max(44, String(n.text).length * 6.6 + 16); }); });
    var need = widths.map(function (ws) { return ws.reduce(function (a, b) { return a + b; }, 0) + GAP * (ws.length + 1); });
    var W = Math.max(640, Math.max.apply(null, need));
    layers.forEach(function (L, k) {
      var ws = widths[k], even = ws.every(function (w) { return w + GAP <= W / (L.length + 1); }), x = (W - need[k]) / 2 + GAP;
      L.forEach(function (n, i) {
        pos[n.id] = [even ? W * (i + 1) / (L.length + 1) : x + ws[i] / 2, 26 + k * rowH, ws[i]];
        x += ws[i] + GAP;
      });
    });
    var H = 26 + (layers.length - 1) * rowH + 30, s = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="vsvg vwide" role="img">';
    spec.nodes.forEach(function (n) {
      (n.from || []).forEach(function (f) {
        var a = pos[f], b = pos[n.id];
        s += '<line x1="' + a[0] + '" y1="' + (a[1] + 12) + '" x2="' + b[0] + '" y2="' + (b[1] - 12) + '" stroke="' + C.line + '" stroke-width="1.3"/>';
      });
      if (n.note && n.from && n.from.length) { var b2 = pos[n.id]; s += '<text x="' + (b2[0] + b2[2] / 2 + 6) + '" y="' + (b2[1] - 16) + '" font-size="10" fill="' + C.line + '">' + esc(n.note) + '</text>'; }
    });
    spec.nodes.forEach(function (n) {
      var p = pos[n.id], last = n.text === '{}' || n.text === '□' || n.end;
      s += '<rect x="' + (p[0] - p[2] / 2) + '" y="' + (p[1] - 12) + '" width="' + p[2] + '" height="24" rx="6" fill="' + (last ? C.inn : n.fail ? '#f3d5d2' : '#f4f6f8') + '" stroke="' + C.ink + '" stroke-width="1"/>' +
        '<text x="' + p[0] + '" y="' + (p[1] + 4) + '" font-size="12" text-anchor="middle" fill="' + (last ? '#fff' : C.ink) + '">' + esc(n.text) + '</text>';
    });
    return '<div class="vrow"><figure class="vfig vwide">' + s + '</svg>' + (spec.note ? '<figcaption>' + spec.note + '</figcaption>' : '') + '</figure></div>';
  }

  function fitch(spec) {
    var s = '<div class="vfitch">';
    spec.lines.forEach(function (l, i) {
      var bars = ''; for (var k = 0; k < l[0]; k++) bars += '<i></i>';
      s += '<div class="vfl' + (l[2] === 'Assumption' ? ' vas' : '') + '"><span class="vn">' + (i + 1) + '</span>' + bars + '<span class="vf">' + l[1] + '</span><span class="vr">' + l[2] + '</span></div>';
    });
    return s + '</div>';
  }

  function dag(spec) {
    var depth = {}, par = {}, layers = [];
    spec.edges.forEach(function (e) { (par[e[1]] = par[e[1]] || []).push(e[0]); });
    function d(n) { if (depth[n] !== undefined) return depth[n]; depth[n] = par[n] ? 1 + Math.max.apply(null, par[n].map(d)) : 0; return depth[n]; }
    spec.nodes.forEach(function (n) { var k = d(n); (layers[k] = layers[k] || []).push(n); });
    var W = 640, rowH = 92, pos = {};
    layers.forEach(function (L, k) { L.forEach(function (n, i) { pos[n] = [W * (i + 1) / (L.length + 1), 30 + k * rowH]; }); });
    var H = 30 + (layers.length - 1) * rowH + 50, s = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="vsvg vwide" role="img">' + DEFS;
    spec.edges.forEach(function (e) { var a = pos[e[0]], b = pos[e[1]]; s += arrow(a[0], a[1], b[0], b[1], 18, C.line, '', 0); });
    spec.nodes.forEach(function (n) {
      var p = pos[n], w = Math.max(70, n.length * 7.5 + 20);
      s += '<rect x="' + (p[0] - w / 2) + '" y="' + (p[1] - 15) + '" width="' + w + '" height="30" rx="15" fill="#eef4fb" stroke="' + C.ink + '"/>' +
        '<text x="' + p[0] + '" y="' + (p[1] + 4) + '" font-size="12" text-anchor="middle" font-weight="600" fill="' + C.ink + '">' + esc(n) + '</text>';
      if (spec.notes && spec.notes[n]) s += '<text x="' + p[0] + '" y="' + (p[1] + 30) + '" font-size="10" text-anchor="middle" fill="' + C.line + '">' + esc(spec.notes[n]) + '</text>';
    });
    return '<div class="vrow"><figure class="vfig vwide">' + s + '</svg></figure></div>';
  }

  function arg(spec) {
    return '<div class="varg">' + (spec.name ? '<b class="vname">' + spec.name + '</b>' : '') + '<div class="vbody"><ol>' +
      spec.premises.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ol><div class="vconc">∴ ' + spec.concl + '</div></div>' +
      (spec.note ? '<p class="vnote">' + spec.note + '</p>' : '') + '</div>';
  }

  var R = { af: af, table: table, venn: venn, tree: tree, fitch: fitch, dag: dag, arg: arg };
  UI.visKinds = Object.keys(R);
  UI.vis = function (spec) {
    var f = R[spec.t]; if (!f) throw new Error('unknown vis type ' + spec.t);
    uid++;
    // arrowhead marker id unique per visual: a shared id would point at a marker inside some other, possibly hidden, solution
    return ('<div class="vis">' + (spec.title ? '<div class="vt">' + spec.title + '</div>' : '') + f(spec) + (spec.note && spec.t !== 'arg' && spec.t !== 'tree' ? '<p class="vnote">' + spec.note + '</p>' : '') + '</div>').replace(/vah/g, 'vah' + uid);
  };
  var uid = 0;
})();
