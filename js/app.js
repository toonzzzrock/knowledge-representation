/* Router, sidebar, home page. */
(function () {
  var UI = window.UI, h = UI.h;
  var side = document.getElementById('side'), main = document.getElementById('main');

  function buildSide(cur) {
    side.innerHTML = '';
    side.appendChild(h('a', { href: '#home', class: cur === 'home' ? 'cur' : '' }, h('span', { class: 'n', text: '⌂' }), 'Start here'));
    UI.modules.forEach(function (m) {
      side.appendChild(h('h3', { text: (m.label || 'Module ' + m.id) + ': ' + m.title }));
      m.lessons.forEach(function (l) {
        var id = m.id + '.' + l.n;
        side.appendChild(h('a', { href: '#' + id, class: cur === id ? 'cur' : '' },
          h('span', { class: 'n', text: id }), h('span', { text: l.title }),
          UI.done[id] ? h('span', { class: 'tick', text: '✓' }) : null));
      });
    });
    var all = UI.allLessons(), n = all.filter(function (x) { return UI.done[x.id]; }).length;
    document.getElementById('progress').textContent = n + ' / ' + all.length + ' steps checked';
  }

  function home() {
    var wrap = h('article', null,
      h('h1', { text: 'Knowledge Representation, step by step' }),
      h('p', { class: 'sub', text: 'Modules 5, 6 and 7 of CSS434, taught as short steps. Every step has the same shape.' }));
    wrap.appendChild(h('ol', { class: 'steps' },
      h('li', { html: '<b>One idea</b> in plain words, with its definition.' }),
      h('li', { html: '<b>A worked example</b> taken from the lecture, with each line explained.' }),
      h('li', { html: '<b>Try it</b>: an interactive tool preloaded with that example. Change it and watch what happens.' }),
      h('li', { html: '<b>Check yourself</b>: a few questions. Every wrong answer tells you why it is wrong.' })));
    var cards = h('div', { class: 'cards' });
    var blurbs = {
      5: 'How to decide what follows from what in propositional logic: models, entailment, proofs, Fitch, and resolution by refutation.',
      6: 'How to attach probabilities to logic: possible worlds, probabilistic logic programs, ProbLog, Bayesian networks, HMMs.',
      7: 'Variables and quantifiers: Herbrand semantics, clausal form with Skolem functions, unification, and resolution with answer extraction.'
    };
    UI.modules.forEach(function (m) {
      cards.appendChild(h('div', { class: 'card' }, h('h3', { text: (m.label || 'Module ' + m.id) + ': ' + m.title }),
        h('p', { text: m.blurb || blurbs[m.id] || '' }),
        h('p', null, h('a', { href: '#' + m.id + '.' + m.lessons[0].n, text: 'Start ' + (m.label ? m.label.toLowerCase() : 'module ' + m.id) + ' →' }),
          ' (' + m.lessons.length + (m.unit === 'set' ? ' sets)' : ' steps)'))));
    });
    wrap.appendChild(cards);
    wrap.appendChild(h('div', { class: 'callout remember' }, h('b', { class: 't', text: 'HOW TO USE THIS' }),
      h('p', { text: 'Go in order: module 6 reuses entailment from module 5, and module 7 reuses clausal form and resolution, now with variables. Your progress is kept in this browser. A step turns into a tick once you answer all of its questions correctly.' })));
    return wrap;
  }

  function route() {
    var id = (location.hash || '#home').slice(1), view, cur = id;
    var all = UI.allLessons(), idx = -1;
    all.forEach(function (x, i) { if (x.id === id) idx = i; });
    if (idx < 0) { view = home(); cur = 'home'; }
    else {
      view = UI.renderLesson(all[idx].m, all[idx].l);
      var prev = all[idx - 1], next = all[idx + 1];
      view.appendChild(h('div', { class: 'nav2' },
        prev ? h('a', { href: '#' + prev.id }, h('button', { class: 'ghost', text: '← ' + prev.l.title })) : h('span'),
        next ? h('a', { href: '#' + next.id }, h('button', { class: 'solid', text: next.l.title + ' →' })) : h('span')));
    }
    main.innerHTML = ''; main.appendChild(view);
    buildSide(cur);
    document.body.classList.remove('open');
    window.scrollTo(0, 0);
    document.title = (idx >= 0 ? all[idx].l.title + ' · ' : '') + 'Knowledge Representation, step by step';
  }
  UI.onProgress = function () { buildSide((location.hash || '#home').slice(1)); };
  document.getElementById('menu').addEventListener('click', function () { document.body.classList.toggle('open'); });
  window.addEventListener('hashchange', route);
  route();
})();
