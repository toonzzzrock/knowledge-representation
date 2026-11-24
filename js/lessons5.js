/* Module 5 lessons: propositional proof systems. */
(function () {
  var ok = function (t, why) { return { t: t, ok: true, why: why }; };
  var no = function (t, why) { return { t: t, ok: false, why: why }; };
  /* Glossary block: items are [term, symbol or '', meaning plus example]. */
  var words = function (items) {
    var one = function (it) {
      return '<b>' + it[0] + '</b>' + (it[1] ? ' (' + it[1] + ')' : '') + ' : ' + it[2];
    };
    var body = items.length > 4
      ? '<div class="cards">' + items.map(function (it) { return '<div class="card"><p>' + one(it) + '</p></div>'; }).join('') + '</div>'
      : items.map(function (it) { return '<p>' + one(it) + '</p>'; }).join('');
    return '<div class="callout idea"><b class="t">WORDS AND SYMBOLS YOU NEED</b>' + body + '</div>';
  };

  UI.addModule({ id: 5, title: 'Propositional proof systems', lessons: [

    { n: 1, title: 'The language of propositional logic', sub: 'Atoms, connectives, formulas.',
      html: '' +
'<p class="lead">How do we write down statements such as "if it is cloudy then it is raining" in a way a computer can check?</p>' +
words([
  ['atom', 'p, q, r', 'one plain statement that is either true or false. Example: "it is raining".'],
  ['Σ', 'the Greek letter sigma', 'the list of atoms we are allowed to use. Example: Σ = {raining, snowing, cloudy}.'],
  ['connective', '', 'a small word that joins statements into a bigger one. Example: "and", "or", "not".'],
  ['not', '¬', 'flips a statement. Example: ¬raining means "it is not raining".'],
  ['and', '∧', 'true only when both sides are true. Example: raining ∧ cloudy.'],
  ['or', '∨', 'true when at least one side is true. Example: raining ∨ snowing.'],
  ['if ... then', '→', 'a promise: if the left side holds, so does the right. Example: cloudy → raining.'],
  ['if and only if', '↔', 'both sides are true together or false together. Example: raining ↔ wet streets.'],
  ['formula', 'φ, ψ', 'any correctly built statement; φ and ψ are placeholder names for any formulas. Example: ¬p, or p ∧ q.'],
  ['language', 'ℒ', 'the collection of all formulas we can build from Σ. Example: p, ¬p, (p ∧ q) all belong.'],
  ['parse tree', '', 'a drawing of a formula, last-applied connective on top. Example: p ∧ q has ∧ above p and q.']
]) +
'<h2>Start with an everyday picture</h2>' +
'<p>A computer cannot read "if it is cloudy then it is raining" the way you do. To let it check statements, we need a strict way to write them down. Think of Lego: a few kinds of small brick, and a few ways to snap them together.</p>' +
'<p>Take that sentence and cut it up. It is built from two small statements, <i>cloudy</i> and <i>raining</i>, joined by "if ... then".</p>' +
'<p>Look at <i>raining</i> on its own. Can you ask "is this true?" and get a plain yes or no? Yes. Nothing inside it needs to be split further. A small statement like that, true or false on its own, is called an <b>atom</b>. We write p, q, r for atoms.</p>' +
'<div class="tcard"><div class="tn">atom</div><div class="tr"><span class="tk">Example</span><span><span class="m">raining</span>, <span class="m">cloudy</span>, <span class="m">p</span></span></div><div class="tr"><span class="tk">Formal</span><span>An element of the signature Σ: a propositional variable with no internal structure, which an assignment sends to 0 or 1.</span></div></div>' +
'<p>Before we write anything, we also agree which atoms are on the table, like choosing which bricks are in the box. That list is written <span class="m">Σ = {p, q, r, …}</span>. The dots mean "and so on".</p>' +
'<p>Now look at what joins the bricks. In our sentence it was "if ... then". Other sentences use "and", "or", "not". Each of these is a fixed way to build a bigger statement out of smaller ones, and they are called <b>connectives</b>. There are five, and each one has a symbol:</p>' +
'<p class="m">¬ not &nbsp; ∧ and &nbsp; ∨ or</p><p class="m">→ if … then &nbsp; ↔ if and only if</p>' +
'<div class="tcard"><div class="tn">connective</div><div class="tr"><span class="tk">Example</span><span><span class="m">¬raining</span>, <span class="m">raining ∧ cloudy</span>, <span class="m">cloudy → raining</span></span></div><div class="tr"><span class="tk">Formal</span><span>One of the symbols ¬, ∧, ∨, →, ↔ used to build a formula from one formula (¬) or two formulas (the other four).</span></div></div>' +
'<p>So "if it is cloudy then it is raining" is written <span class="m">cloudy → raining</span>.</p>' +
'<h2>Building formulas</h2>' +
'<p>Not every pile of symbols is a sensible statement: "p ∨ ∧ q" is gibberish. So we need a rule that separates the buildable from the unbuildable. We give two building rules. Everything you can make with them, and nothing else, is a <b>formula</b>, and the collection of all formulas over Σ is called the <b>language</b> ℒ.</p>' +
'<div class="tcard"><div class="tn">formula / language</div><div class="tr"><span class="tk">Example</span><span>With Σ = {p, q}: <span class="m">p</span>, <span class="m">¬p</span>, <span class="m">(p ∧ q)</span> are formulas; <span class="m">p ∨ ∧ q</span> is not.</span></div><div class="tr"><span class="tk">Formal</span><span>ℒ is the smallest set such that every atom of Σ is in ℒ, and if φ, ψ ∈ ℒ then ¬φ, (φ∧ψ), (φ∨ψ), (φ→ψ), (φ↔ψ) ∈ ℒ. Its members are the formulas.</span></div></div>' +
'<div class="flow"><div class="fs"><b>Atom</b><span>every atom on its own is a formula</span></div><div class="fs"><b>Wrap</b><span class="m">¬φ, (φ∧ψ), (φ∨ψ), (φ→ψ), (φ↔ψ)</span><span>if φ and ψ are formulas, each of these is a formula too</span></div></div>' +
'<p>Read the second rule as: take any formulas you already have, and wrap them with a connective.</p>' +
'<p>Watch one formula grow from the atom p. Each arrow applies a rule to the previous result.</p>' +
'<div class="chain"><span>p</span><i>→</i><span>¬p</span><i>→</i><span>¬¬p</span><i>→</i><span>(p ∨ (p ∧ q))</span><i>→</i><span>…</span></div>' +
'<p>The wrap rule can reuse its own output, so even one atom gives infinitely many formulas.</p>' +
'<div class="callout example"><b class="t">EXAMPLE FROM THE LECTURE</b><p>With Σ = {raining, snowing, cloudy}, each row is one formula and how to say it aloud:</p>' +
'<table><tr><th>Formula</th><th>Reading</th></tr><tr><td class="m">¬raining</td><td>it is not raining</td></tr><tr><td class="m">raining ∧ snowing</td><td>raining and snowing</td></tr><tr><td class="m">raining ∨ snowing</td><td>raining or snowing (possibly both)</td></tr><tr><td class="m">cloudy → raining</td><td>if cloudy then raining</td></tr></table></div>' +
'<h2>Try it</h2>' +
'<p>Type a formula into the box, or click a preset. Look at the drawing: the top node is the connective applied last, and the leaves at the bottom are atoms.</p>' +
'<p>Think of a family tree, but for a formula: the last connective applied is the ancestor at the top, and its parts hang below it. Such a drawing is called a <b>parse tree</b>.</p>' +
'<div class="tcard"><div class="tn">parse tree</div><div class="tr"><span class="tk">Example</span><span><span class="m">cloudy → (raining ∨ snowing)</span>: root →, children cloudy and ∨, and ∨ has children raining and snowing.</span></div><div class="tr"><span class="tk">Formal</span><span>The tree of a formula φ whose leaves are atoms and whose internal nodes are connectives; the root is the connective applied last, and its children are the parse trees of its immediate subformulas.</span></div></div>' +
'{{w:parsetree|{"title":"PARSE TREE","formula":"cloudy -> (raining | snowing)","presets":["p -> (q & ~r)","~~p","(p | q) & (~q | r)","p <-> ~q"]}}}' +
'<p>Meaning is computed from the leaves up, so every definition in this module reads a formula as a tree.</p>' +
'<details class="more"><summary>Invalid strings</summary><p>In the box above, type <code>p &amp;</code> or <code>-> p</code>. The tool refuses them, because a connective needs its operands.</p></details>' +
'<div class="callout remember"><b class="t">REMEMBER</b><p>When you drop brackets, the connectives bind in this order, tightest first. The symbol › means "binds tighter than".</p><div class="chain"><span>¬</span><i>›</i><span>∧</span><i>›</i><span>∨</span><i>›</i><span>→</span><i>›</i><span>↔</span></div><p>When in doubt, add brackets. → groups to the right: <span class="m">p → q → r</span> means <span class="m">p → (q → r)</span>.</p></div>',
      quiz: [
        { q: 'Which of these is <b>not</b> a formula?', o: [
          ok('p ∨ ∧ q', 'Correct: ∨ and ∧ are binary connectives, each needs a formula on both sides.'),
          no('¬¬p', 'Negation can be applied to any formula, including ¬p, so ¬¬p is a formula.'),
          no('(p ∧ q) → r', 'Rule 2 applied twice: first p ∧ q, then → with r.')] },
        { q: 'Σ has the single atom p. How many formulas does ℒ contain?', o: [
          ok('Infinitely many', 'Nesting never stops: p, ¬p, ¬¬p, p ∧ p, ….'),
          no('Exactly 1', 'Only the atom itself would count, but rule 2 adds more.'),
          no('Exactly 5', 'There is one formula per connective only if you may not nest, which the definition allows.')] }
      ] },

    { n: 2, title: 'Truth assignments and models', sub: 'Truth values and models.',
      html: '' +
'<p class="lead">If I tell you which atoms are true and which are false, can you say whether a whole formula is true?</p>' +
'<p>From step 1 you know: an atom is one plain statement, Σ is the list of atoms, and a formula is built from atoms with ¬ ∧ ∨ → ↔.</p>' +
words([
  ['truth value', '1 and 0', 'the two possible answers for a statement: 1 means true, 0 means false. Example: "raining" has value 1.'],
  ['truth assignment', 'i', 'a choice of 1 or 0 for every atom. Example: raining = 1, snowing = 0.'],
  ['i : Σ → {0,1}', '', 'reads "i gives each atom in Σ a value that is 0 or 1". Example: i sends p to 1.'],
  ['p↦1', '↦', 'reads "p is given the value 1". Example: {p↦1, q↦0} makes p true, q false.'],
  ['value of φ under i', 'φⁱ', 'the 1 or 0 that formula φ gets when we use assignment i. Example: p ∨ q gets 1 when p is 1.'],
  ['model of φ', '', 'a truth assignment that makes φ true. Example: p = 1, q = 0 is a model of p ∨ q.'],
  ['M(φ)', '', 'the list of all situations where φ comes out true. Example: M(p ∧ q) has one situation.'],
  ['knowledge base', 'Δ', 'a collection of sentences we believe at once. Example: Δ = {p, p → q}.'],
  ['M(Δ)', '', 'the list of situations where every sentence of Δ is true together. Example: the situations fitting all our rules.'],
  ['2ⁿ', '', '2 multiplied by itself n times. Example: 3 atoms give 2 × 2 × 2 = 8.']
]) +
'<h2>Start with light switches</h2>' +
'<p>Last step we only wrote formulas down. Now we want to know whether one is true. But "cloudy → raining" has no answer until we know whether it is actually cloudy. So what we need is a way to say how the world stands, and a way to read a formula against it.</p>' +
'<p>A room has three switches: p (hall), q (kitchen), r (porch). Each is on or off, and nothing in between. We write 1 for on and 0 for off.</p>' +
'<p>That 1 or 0 is the answer to "is this atom true?" for one switch. It is called its <b>truth value</b>: 1 means true, 0 means false.</p>' +
'<div class="tcard"><div class="tn">truth value</div><div class="tr"><span class="tk">Example</span><span>Switch p on gives <span class="m">1</span>; switch q off gives <span class="m">0</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>An element of {0, 1}, where 1 stands for true and 0 for false.</span></div></div>' +
'<p>Now walk through the house and note every switch at once: hall on, kitchen off, porch on. One complete snapshot like that, a choice of 1 or 0 for every atom, is a <b>truth assignment</b>. We write it {p↦1, q↦0, r↦1}. The arrow ↦ reads "is given the value".</p>' +
'<div class="tcard"><div class="tn">truth assignment</div><div class="tr"><span class="tk">Example</span><span><span class="m">i = {p↦1, q↦0, r↦1}</span>; with 3 atoms there are 2³ = 8 of them.</span></div><div class="tr"><span class="tk">Formal</span><span>A function <span class="m">i : Σ → {0,1}</span> giving every atom of Σ a truth value; it extends to all formulas by the connective rules.</span></div></div>' +
'<p>The same idea, written with a function: <span class="m">i : Σ → {0,1}</span> reads "i gives each atom in Σ a value that is 0 or 1". Here i is the name of the assignment.</p>' +
'<p>Next, a rule hangs on the wall: "hall on OR kitchen on". With the snapshot above, is the rule met? Yes. With another snapshot it might not be. So a rule gets a 1 or a 0 from each snapshot. The 1 or 0 a formula φ gets under i is the <b>value of φ under i</b>, written φⁱ.</p>' +
'<div class="tcard"><div class="tn">value of φ under i</div><div class="tr"><span class="tk">Example</span><span>With <span class="m">i = {p↦1, q↦0}</span>: <span class="m">(p ∨ q)ⁱ = 1</span> and <span class="m">(p → q)ⁱ = 0</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>φⁱ ∈ {0,1}, defined by recursion on φ: pⁱ = i(p) for an atom, and each connective is evaluated from the values of its parts by its truth table.</span></div></div>' +
'<p>Some snapshots meet the rule and some do not. A snapshot that meets the rule is called a <b>model of φ</b>, where φ is the rule: a truth assignment that makes it true. We write M(φ) for the list of all models of φ.</p>' +
'<div class="tcard"><div class="tn">model of φ, M(φ)</div><div class="tr"><span class="tk">Example</span><span><span class="m">{p↦1, q↦0}</span> is a model of <span class="m">p ∨ q</span>; <span class="m">M(p ∧ q)</span> has exactly one model over {p, q}.</span></div><div class="tr"><span class="tk">Formal</span><span>An assignment i is a model of φ iff φⁱ = 1. <span class="m">M(φ) = {i : φⁱ = 1}</span>.</span></div></div>' +
'<p>One rule is rarely the whole story. Suppose the wall has two notices: "hall on" and "if hall then kitchen". We believe both at once. A collection of sentences we believe at the same time is called a <b>knowledge base</b>, written Δ.</p>' +
'<p>A snapshot that obeys both notices must make <i>every</i> sentence of Δ true. Such a snapshot is a model of Δ, and we write M(Δ) for the list of all of them.</p>' +
'<div class="tcard"><div class="tn">knowledge base, M(Δ)</div><div class="tr"><span class="tk">Example</span><span><span class="m">Δ = {p, p → q}</span> has the single model <span class="m">{p↦1, q↦1}</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>A knowledge base Δ is a set of formulas of ℒ. An assignment i is a model of Δ iff φⁱ = 1 for every φ ∈ Δ; <span class="m">M(Δ) = ⋂<sub>φ∈Δ</sub> M(φ)</span>.</span></div></div>' +
'<div class="facts"><div><b>2ⁿ</b>assignments for n atoms</div><div><b>independent</b>each atom chosen on its own</div></div>' +
'<p>Check with the switches: 3 switches, 2 × 2 × 2 = 8 settings.</p>' +
'<h2>Computing a formula from the atoms up</h2>' +
'<p>Once the atoms have values, each connective has a fixed rule. Here φ and ψ stand for any two formulas.</p>' +
'<table><tr><th>Formula</th><th>True exactly when</th></tr>' +
'<tr><td class="m">¬φ</td><td>φ is false</td></tr><tr><td class="m">φ ∧ ψ</td><td>both are true</td></tr><tr><td class="m">φ ∨ ψ</td><td>at least one is true</td></tr>' +
'<tr><td class="m">φ → ψ</td><td>φ is false <b>or</b> ψ is true</td></tr><tr><td class="m">φ ↔ ψ</td><td>φ and ψ have the same value</td></tr></table>' +
'<p>The arrow is the surprising one. Think of a promise: "if it rains, I bring an umbrella".</p>' +
'<p>The promise is broken only when it rains and I bring none. If it does not rain, the promise cannot be broken.</p>' +
'<div class="big">φ → ψ is false only when φ = 1 and ψ = 0</div>' +
'<div class="callout example"><b class="t">EXAMPLE FROM THE LECTURE</b><p>Let <span class="m">i = {p↦1, q↦0, r↦1}</span>. We compute each formula step by step.</p>' +
'<table><tr><th>Formula</th><th>Value</th><th>Why</th></tr><tr><td class="m">p ∨ q</td><td><span class="tag ok">1</span></td><td>p is 1, so at least one side is true</td></tr><tr><td class="m">¬q ∨ r</td><td><span class="tag ok">1</span></td><td>q is 0, so ¬q is 1; one side is true</td></tr><tr><td class="m">p → q</td><td><span class="tag bad">0</span></td><td>premise p true, conclusion q false</td></tr></table>' +
'<p>So i is a model of the first two formulas and not of the third.</p></div>' +
'<h2>Try it: evaluate bottom-up</h2>' +
'<p>Click an atom to flip it between 1 and 0. Watch which bracketed part changes, and how the top value follows.</p>' +
'{{w:evaltree|{"title":"EVALUATE UNDER AN ASSIGNMENT","formula":"(p | q) & (~q | r)","init":{"p":1,"q":0,"r":1}}}}' +
'<p>Check the arrow rule with p -&gt; q: with p = 0 the implication is true whatever q is. That is the definition, and it makes "if p then q" fail only when p is true and q is false.</p>' +
'<h2>Finding all models of a knowledge base</h2>' +
'<p>A knowledge base Δ is a bag of sentences that must all hold together. Its models are the settings that satisfy every one of them.</p>' +
'<div class="flow"><div class="fs"><b>Write the table</b><span>all 2ⁿ rows</span></div><div class="fs"><b>Delete rows</b><span>where some sentence of Δ is false</span></div><div class="fs"><b>Read off M(Δ)</b><span>what is left</span></div></div>' +
'<p>Here Δ = {p → q, q → r, (p → q) → (q → r)}. In the table below, look for the highlighted rows: those are the rows where all three sentences are true.</p>' +
'{{w:proptable|{"title":"MODELS OF A KNOWLEDGE BASE","multi":true,"formulas":["p -> q","q -> r","(p -> q) -> (q -> r)"]}}}' +
'<p>The result, with each model written as the values of (p, q, r):</p>' +
'<div class="facts"><div><b>4</b>models</div><div><b>000</b>(p,q,r)</div><div><b>001</b>(p,q,r)</div><div><b>011</b>(p,q,r)</div><div><b>111</b>(p,q,r)</div></div>' +
'<details class="more"><summary>Why does this work? Why exactly these four</summary><div class="vs"><div class="good"><h4>q = 1</h4><p>p → q holds, so the third sentence forces q → r, hence r = 1.</p></div><div class="good"><h4>q = 0</h4><p>q → r holds and p → q forces p = 0, leaving r free.</p></div></div></details>',
      quiz: [
        { q: 'A language has 5 atoms. How many truth assignments exist?', o: [
          ok('32', '2⁵ = 32: each of the 5 atoms is independently 0 or 1.'),
          no('10', 'That would be 5 × 2. Choices multiply across atoms, they do not add.'),
          no('25', 'That is 5². The base is the number of values (2), the exponent is the number of atoms.')] },
        { q: 'p is false. What is the value of p → q?', o: [
          ok('True, whatever q is', 'φ → ψ is true when φ is false or ψ is true.'),
          no('False', 'An implication is false only when the left side is true and the right side is false.'),
          no('Same as q', 'That would be the biconditional with p replaced, not the implication.')] },
        { q: 'How many models does p ∨ q have over Σ = {p, q}?', o: [
          ok('3', '(1,1), (1,0), (0,1). Only (0,0) fails.'),
          no('1', 'Only the case where both are true is a model of p ∧ q, not of p ∨ q.'),
          no('4', 'That is every assignment; (0,0) makes p ∨ q false.')] }
      ] },

    { n: 3, title: 'Valid, contingent, unsatisfiable', sub: 'Classifying a sentence by its models; equivalence.',
      html: '' +
'<p class="lead">How can we tell whether a sentence is true no matter what, never true, or sometimes true?</p>' +
'<p>From step 2 you know: an assignment gives every atom 1 or 0, and a model of a sentence is an assignment that makes it true.</p>' +
words([
  ['M(φ)', '', 'the list of all situations where φ comes out true (from step 2). Example: M(p ∨ q) has three situations.'],
  ['I', 'capital i', 'the list of all possible assignments, true or not. Example: for 2 atoms, I has 4 entries.'],
  ['∅', 'empty set', 'the list with nothing in it. Example: no situation makes p ∧ ¬p true.'],
  ['M(φ) = I', '', 'reads "φ is true in every possible situation". Example: p ∨ ¬p.'],
  ['⊊', '', 'reads "is inside, but is not the whole thing". Example: {1,2} ⊊ {1,2,3}.'],
  ['≠', '', 'reads "is not the same as". Example: M(φ) ≠ ∅ means some situation works.'],
  ['valid', '', 'true under every assignment. Example: "it is red or not red".'],
  ['unsatisfiable', '', 'true under no assignment. Example: "it is red and not red".'],
  ['contingent', '', 'true under some, false under others. Example: "the light is red".'],
  ['satisfiable', '', 'true under at least one assignment. Example: p ∧ q, by p = q = 1.'],
  ['falsifiable', '', 'false under at least one assignment. Example: p, by p = 0.'],
  ['equivalent', '≡', 'two formulas true in exactly the same situations. Example: p → q and ¬p ∨ q.'],
  ['φ, ψ, χ', '', 'placeholder names for any formulas (as in step 1). Example: φ could be p → q.']
]) +
'<h2>Start with a traffic light</h2>' +
'<p>Let p mean "the light is red". There are only two situations: p = 1 (red) and p = 0 (not red). Try three sentences in both.</p>' +
'<table><tr><th>situation</th><th>p ∨ ¬p<br><small>red or not red</small></th><th>p<br><small>red</small></th><th>p ∧ ¬p<br><small>red and not red</small></th></tr>' +
'<tr><td>p = 1</td><td>1</td><td>1</td><td>0</td></tr><tr><td>p = 0</td><td>1</td><td>0</td><td>0</td></tr>' +
'<tr><th>column</th><th>all 1s</th><th>a mix</th><th>all 0s</th></tr></table>' +
'<p>Read the table one column at a time, and ask of each: would I bet on it, or against it, before I look at the light? The first column is a sure bet. The third is a sure loss. The middle one is a coin toss that depends on the world. Logic gives each of these three cases a name.</p>' +
'<div class="cards">' +
'<div class="card"><h3>all 1s: valid</h3><p>True in every situation. "Red or not red" never fails, though it tells you nothing.</p></div>' +
'<div class="card"><h3>a mix: contingent</h3><p>True in some situations, false in others. "Red" depends on the light.</p></div>' +
'<div class="card"><h3>all 0s: unsatisfiable</h3><p>True in no situation. "Red and not red" can never be met.</p></div>' +
'</div>' +
'<div class="tcard"><div class="tn">valid / contingent / unsatisfiable</div><div class="tr"><span class="tk">Example</span><span><span class="m">p ∨ ¬p</span> is valid, <span class="m">p</span> is contingent, <span class="m">p ∧ ¬p</span> is unsatisfiable.</span></div><div class="tr"><span class="tk">Formal</span><span>With I the set of all assignments: φ is valid iff M(φ) = I; unsatisfiable iff M(φ) = ∅; contingent iff ∅ ⊊ M(φ) ⊊ I.</span></div></div>' +
'<p>Sometimes we only care about one question: can this sentence ever come out 1? Valid and contingent sentences both can. A sentence with at least one row of 1 is called <b>satisfiable</b>.</p>' +
'<div class="tcard"><div class="tn">satisfiable</div><div class="tr"><span class="tk">Example</span><span><span class="m">p ∧ q</span> is satisfiable by p = q = 1; <span class="m">p ∧ ¬p</span> is not.</span></div><div class="tr"><span class="tk">Formal</span><span>φ is satisfiable iff some assignment makes it true, i.e. M(φ) is not empty.</span></div></div>' +
'<p>Turn the question around: can it ever come out 0? Contingent and unsatisfiable sentences can. A sentence with at least one row of 0 is called <b>falsifiable</b>.</p>' +
'<div class="tcard"><div class="tn">falsifiable</div><div class="tr"><span class="tk">Example</span><span><span class="m">p</span> is falsifiable by p = 0; <span class="m">p ∨ ¬p</span> is not.</span></div><div class="tr"><span class="tk">Formal</span><span>φ is falsifiable iff some assignment makes it false, i.e. M(φ) is not all of I.</span></div></div>' +
'<p>So a contingent sentence is both satisfiable and falsifiable, while "red or not red" is satisfiable but not falsifiable.</p>' +
'<h2>The same idea, written with models</h2>' +
'<p>The lecture says it with sets, because that scales to any number of atoms. From step 2, M(φ) is the set of models of φ: the rows where φ is 1. Write I for the set of all rows, and ∅ for the empty set. Then "all 1s" is M(φ) = I, and "all 0s" is M(φ) = ∅.</p>' +
'<table><tr><th>kind</th><th>in the table</th><th>with sets</th></tr>' +
'<tr><td>valid</td><td>all 1s</td><td class="m">M(φ) = I</td></tr>' +
'<tr><td>unsatisfiable</td><td>all 0s</td><td class="m">M(φ) = ∅</td></tr>' +
'<tr><td>contingent</td><td>a mix</td><td class="m">∅ ⊊ M(φ) ⊊ I</td></tr>' +
'<tr><td>satisfiable</td><td>at least one 1</td><td class="m">M(φ) ≠ ∅</td></tr>' +
'<tr><td>falsifiable</td><td>at least one 0</td><td class="m">M(φ) ≠ I</td></tr></table>' +
'<p>The sign ⊊ reads "is inside, but is not the whole": M(φ) has something in it, and it is not everything.</p>' +
'<h2>Worked example</h2>' +
'<div class="callout example"><b class="t">EXAMPLE FROM THE LECTURE</b><p>Is <span class="m">(p → q) ∨ (q → r)</span> valid?</p>' +
'<p>An or-sentence is false only if both of its parts are false. So we ask: can both parts be false together?</p>' +
'<div class="flow"><div class="fs"><b>p → q false</b><span class="m">p = 1, q = 0</span></div><div class="fs"><b>q → r false</b><span class="m">q = 1, r = 0</span></div><div class="fs"><b>Clash</b><span>q = 0 and q = 1 at once</span></div></div>' +
'<p>We needed q = 0 for the first part and q = 1 for the second. No assignment does both.</p>' +
'<p>So it can never be false, so it is <span class="tag ok">valid</span>. The table confirms it.</p></div>' +
'<p>In the tool below, look at the rightmost column. All 1s means valid, all 0s means unsatisfiable, a mix means contingent. Then click each preset.</p>' +
'{{w:proptable|{"title":"CLASSIFY A FORMULA","formula":"(p -> q) | (q -> r)","presets":["p | ~p","p & ~p","p -> q","(p -> q) -> (q -> r)"]}}}' +
'<h2>Equivalence</h2>' +
'<p>Two different-looking sentences can say the same thing. "If it is Sunday the shop is closed" and "it is not Sunday, or the shop is closed" allow exactly the same days. In symbols these are p → q and ¬p ∨ q, which look different. How do we tell whether two formulas say the same thing? Compare the rows where each is true.</p>' +
'<p>Two formulas that are true in exactly the same assignments are called <b>equivalent</b>.</p>' +
'<div class="tcard"><div class="tn">equivalent</div><div class="tr"><span class="tk">Example</span><span><span class="m">p → q ≡ ¬p ∨ q</span>; <span class="m">¬(p ∨ q) ≡ ¬p ∧ ¬q</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>φ ≡ ψ iff <span class="m">M(φ) = M(ψ)</span>, i.e. φⁱ = ψⁱ for every assignment i.</span></div></div>' +
'<div class="big">φ ≡ ψ when M(φ) = M(ψ)<small>logically equivalent: true in exactly the same assignments</small></div>' +
'<p>Look at the tool: it compares two formulas row by row and says whether every row agrees. The default pair is the first step of clause conversion in step 8, where implications are removed.</p>' +
'{{w:equiv|{"title":"ARE THESE EQUIVALENT?","a":"p -> q","b":"~p | q"}}}' +
'<p>Now type <code>~(p | q)</code> in A and <code>~p &amp; ~q</code> in B. This pair is called De Morgan.</p>' +
'<p>Another equivalent pair: "if it rains the street is wet" and "if the street is dry it did not rain". Write them as p → q and ¬q → ¬p. The second is built from the first by swapping the two sides and negating each, and it is called the <b>contrapositive</b>.</p>' +
'<div class="tcard"><div class="tn">contrapositive</div><div class="tr"><span class="tk">Example</span><span>The contrapositive of <span class="m">p → q</span> is <span class="m">¬q → ¬p</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>The contrapositive of φ → ψ is ¬ψ → ¬φ; it is equivalent to φ → ψ.</span></div></div>' +
'<div class="callout remember"><b class="t">USEFUL ALWAYS-TRUE PATTERNS</b>' +
'<p>Each pattern below is valid for any formulas φ, ψ, χ. Name on top, pattern underneath.</p>' +
'<div class="cards">' +
'<div class="card"><h3>Double negation</h3><p class="m">φ ↔ ¬¬φ</p><p>Not-not equals the original.</p></div>' +
'<div class="card"><h3>De Morgan</h3><p class="m">¬(φ∨ψ) ↔ (¬φ∧¬ψ)</p><p class="m">¬(φ∧ψ) ↔ (¬φ∨¬ψ)</p></div>' +
'<div class="card"><h3>Implication introduction</h3><p class="m">φ → (ψ → φ)</p></div>' +
'<div class="card"><h3>Implication distribution</h3><p class="m">(φ→(ψ→χ)) → ((φ→ψ)→(φ→χ))</p></div>' +
'</div><p>Verify each with the tool above: enter the pattern as one formula and check that every row is 1.</p></div>',
      quiz: [
        { q: 'Which is valid?', o: [
          ok('p ∨ ¬p', 'Whatever p is, one disjunct is true.'),
          no('p → q', 'It is false when p = 1 and q = 0, so it is only contingent.'),
          no('p ∧ ¬p', 'This is unsatisfiable, the opposite of valid.')] },
        { q: 'If φ is valid, which statement is always true?', o: [
          ok('φ is satisfiable', 'Valid means M(φ) = I, and I is not empty, so M(φ) ≠ ∅.'),
          no('φ is falsifiable', 'Valid means there is no falsifying assignment.'),
          no('φ is contingent', 'Contingent excludes M(φ) = I.')] },
        { q: 'p → q and ¬q → ¬p (the contrapositive) are', o: [
          ok('equivalent', 'Check the table: both are false exactly when p = 1 and q = 0.'),
          no('not equivalent, one is stronger', 'They have the same models, so neither is stronger.'),
          no('both valid', 'Both are false when p = 1, q = 0.')] }
      ] },

    { n: 4, title: 'SAT and modelling a problem', sub: 'Graph colouring as a propositional sentence.',
      html: '' +
'<p class="lead">If I give you a hard puzzle, such as fitting exams into time slots, can a computer solve it by treating it as a logic sentence?</p>' +
'<p>From step 2 you know: a model of a sentence is an assignment of 1 or 0 to atoms that makes it true, and M(φ) is the list of all such models.</p>' +
words([
  ['SAT', '', 'the question "is there any way to make this sentence true?". Example: is p ∧ ¬p satisfiable? No.'],
  ['SAT solver', '', 'a program that answers SAT fast on real problems. Example: MiniSAT, Glucose.'],
  ['M(φ) ≠ ∅', '', 'reads "the list of situations that make φ true is not empty". Example: p ∨ q has three.'],
  ['exponential time', '', 'work that doubles when you add one atom. Example: 20 atoms means over a million rows.'],
  ['NP-complete', '', 'a hard problem class: no fast method known for all cases. Example: SAT is in this class.'],
  ['graph', '', 'dots joined by lines. Example: 4 courses with lines between clashing ones.'],
  ['vertex and edge', '', 'a vertex is a dot, an edge is a line between two dots. Example: edge 1-2 joins vertices 1 and 2.'],
  ['colouring', '', 'giving each vertex one colour so joined vertices differ. Example: exams as vertices, slots as colours.'],
  ['vc', 'v and c are numbers', 'the atom meaning "vertex v has colour c". Example: 21 means vertex 2 has colour 1.'],
  ['vc′', 'c prime', 'the atom for a different colour c′ on the same vertex. Example: 11 and 12 are vertex 1 with colours 1 and 2.'],
  ['F1, F2, F3, F', '', 'three groups of rules written as sentences; F joins all three with ∧ ("and"). Example: F means all rules hold.']
]) +
'<h2>Start with an exam timetable</h2>' +
'<p>A school has 4 exams and 4 time slots. Some pairs of exams share students, so they cannot sit in the same slot.</p>' +
'<p>The task: give every exam one slot, so that no two clashing exams share a slot.</p>' +
'<p>The puzzle is easier to see as a picture. Draw each exam as a dot and each clash as a line between two dots. A picture made of dots joined by lines is called a <b>graph</b>.</p>' +
'<p>Each dot is a <b>vertex</b> and each line is an <b>edge</b>. Together they are the <b>vertex and edge</b> of a graph: a vertex is a dot, an edge is a line between two dots.</p>' +
'<div class="tcard"><div class="tn">graph, vertex, edge</div><div class="tr"><span class="tk">Example</span><span>Vertices 1 to 4 (exams), edges 1-2, 1-3, 1-4, 2-4, 3-4 (clashes).</span></div><div class="tr"><span class="tk">Formal</span><span>A graph is a pair G = (V, E) with V a set of vertices and E a set of edges, each edge a pair {v, w} of vertices.</span></div></div>' +
'{{w:gfig|{"figs":[{"w":240,"cap":"The exam timetable as a graph. Exam 1 clashes with 2, 3 and 4; exam 4 clashes with 1, 2 and 3; exams 2 and 3 share no students, so no line joins them."}]}}}' +
'<p>Now give each slot a colour. The rule "clashing exams never share a slot" becomes: no line may join two dots of the same colour. Giving each vertex one colour so that joined vertices differ is called <b>graph colouring</b>.</p>' +
'<div class="tcard"><div class="tn">graph colouring</div><div class="tr"><span class="tk">Example</span><span>Colours 1 to 4 for vertices 1 to 4: <span class="m">1↦1, 2↦2, 3↦3, 4↦4</span> is a proper colouring of the exam graph.</span></div><div class="tr"><span class="tk">Formal</span><span>A function c from V to a set of colours such that <span class="m">c(v) ≠ c(w)</span> for every edge {v, w} ∈ E.</span></div></div>' +
'<p>Three attempts on the same graph. Read each picture by its lines: a line is fine when its two ends differ in colour.</p>' +
'{{w:gfig|{"legend":true,"figs":[{"on":["11","22","33","44"],"tag":"ok","cap":"Every exam in its own slot. Uses 4 colours."},{"on":["11","22","32","43"],"tag":"ok","cap":"Exams 2 and 3 share slot 2: allowed, no line joins them. Only 3 colours."},{"on":["11","21","33","44"],"tag":"bad","cap":"Exams 1 and 2 both in slot 1, but a line joins them (dashed red)."}]}}}' +
'<p>The idea of this step: instead of searching the picture by hand, write the whole puzzle as one logic sentence F. Any model of F is a valid timetable. Then the only question left is the one logic can already ask: is there any assignment that makes F true?</p>' +
'<p>That question has a name. Asking whether a sentence has at least one model is called <b>SAT</b>, short for satisfiability.</p>' +
'<div class="tcard"><div class="tn">SAT</div><div class="tr"><span class="tk">Example</span><span><span class="m">p ∨ q</span>: yes (p = 1). <span class="m">p ∧ ¬p</span>: no.</span></div><div class="tr"><span class="tk">Formal</span><span>The decision problem: given a propositional formula φ, is <span class="m">M(φ) ≠ ∅</span>, i.e. does some assignment satisfy φ?</span></div></div>' +
'<div class="big">SAT: given φ, is M(φ) ≠ ∅ ?<small>in words: does at least one assignment make φ true?</small></div>' +
'<div class="vs"><div class="bad"><h4>TRUTH TABLE</h4><p>Checks all 2ⁿ assignments: exponential time.</p></div><div class="good"><h4>MODERN SOLVERS</h4><p>MiniSAT, Glucose, Riss handle many real instances quickly.</p></div></div>' +
'<p>The truth table is hopeless for big problems: every new atom doubles the rows, so 20 atoms already mean over a million rows. This kind of growth is called <b>exponential time</b>.</p>' +
'<table><tr><th>atoms n</th><th>rows 2ⁿ</th><th>size (each step adds 4 atoms, rows grow 16×)</th></tr>' +
'<tr><td>4</td><td>16</td><td><span style="display:inline-block;height:10px;width:4px;background:var(--accent)"></span></td></tr>' +
'<tr><td>8</td><td>256</td><td><span style="display:inline-block;height:10px;width:16px;background:var(--accent)"></span></td></tr>' +
'<tr><td>12</td><td>4,096</td><td><span style="display:inline-block;height:10px;width:64px;background:var(--accent)"></span></td></tr>' +
'<tr><td><b>16</b></td><td><b>65,536</b></td><td><span style="display:inline-block;height:10px;width:256px;max-width:100%;background:var(--bad)"></span> our 4-exam puzzle (16 atoms, built below)</td></tr>' +
'<tr><td>20</td><td>1,048,576</td><td><span style="display:inline-block;height:10px;width:100%;background:var(--bad)"></span> 16× longer again: off the page</td></tr></table>' +
'<div class="tcard"><div class="tn">exponential time</div><div class="tr"><span class="tk">Example</span><span>A truth table has 2ⁿ rows: 20 atoms give over a million rows.</span></div><div class="tr"><span class="tk">Formal</span><span>An algorithm runs in exponential time if its running time on inputs of size n grows at least like cⁿ for some constant c &gt; 1.</span></div></div>' +
'<p>Yet people have built programs that answer SAT quickly on real problems. Such a program is called a <b>SAT solver</b>, for example MiniSAT or Glucose.</p>' +
'<div class="tcard"><div class="tn">SAT solver</div><div class="tr"><span class="tk">Example</span><span>MiniSAT, Glucose, Riss.</span></div><div class="tr"><span class="tk">Formal</span><span>A program that decides, for a given propositional formula (usually in CNF), whether it is satisfiable, and returns a model if so.</span></div></div>' +
'<p>This does not make SAT easy in general. SAT is <b>NP-complete</b>: it belongs to a class of hard problems for which no polynomial algorithm is known.</p>' +
'<div class="tcard"><div class="tn">NP-complete</div><div class="tr"><span class="tk">Example</span><span>SAT (Cook-Levin theorem); graph colouring with 3 or more colours.</span></div><div class="tr"><span class="tk">Formal</span><span>A problem is NP-complete iff it is in NP (a solution can be checked in polynomial time) and every problem in NP reduces to it in polynomial time.</span></div></div>' +
'<h2>Building the sentence</h2>' +
'<p>Logic only knows atoms that are true or false, so we turn each possible choice into one. Take vertices 1 to 4 and colours 1 to 4. For every pair we ask a yes or no question: "does vertex v get colour c?". The atom for that question is written <b>vc</b>, with v and c numbers, so 21 means vertex 2 has colour 1.</p>' +
'<div class="tcard"><div class="tn">vc (colouring atom)</div><div class="tr"><span class="tk">Example</span><span><span class="m">21</span> is true iff vertex 2 has colour 1; 16 such atoms for 4 vertices and 4 colours.</span></div><div class="tr"><span class="tk">Formal</span><span>For each vertex v and colour c, an atom vc, true under an assignment iff the colouring gives v the colour c.</span></div></div>' +
'<h2>From a truth assignment to a picture</h2>' +
'<p>A truth assignment gives each of the 16 atoms a 1 or a 0. Lay the atoms out in a table: one row per vertex, one column per colour. Atom vc sits in row v, column c.</p>' +
'<p>To read the picture off the table, go row by row. In row v, every 1 paints vertex v with the colour of its column. So the table on the left and the graph on the right say the same thing.</p>' +
'{{w:gfig|{"figs":[{"grid":true,"on":["11","22","32","43"],"cap":"Row 3 has its 1 under colour 2, so vertex 3 is painted colour 2. All other cells in that row are 0."}]}}}' +
'<p>This works for any assignment, also for bad ones. A row can hold no 1, or two 1s, and the picture then shows exactly that:</p>' +
'{{w:gfig|{"figs":[{"grid":true,"on":["11","12","22","44"],"cap":"Row 1 has two 1s (11 and 12): vertex 1 is painted twice, shown split. Row 3 has no 1: vertex 3 stays empty. Vertices 1 and 2 both carry colour 2, so line 1-2 clashes."}]}}}' +
'<p>So the 1s in each row pick the colours of one vertex. Not every assignment is a timetable: we want exactly one 1 per row, and no two joined vertices with their 1 in the same column. The rules below say exactly that, as sentences.</p>' +
'<table><tr><th>part</th><th>in plain words</th><th>general form</th><th>one example on our graph</th><th>how many</th></tr>' +
'<tr><td><b>atoms</b></td><td>one yes/no question per (vertex, colour) pair: "does vertex v get colour c?"</td><td class="m">vc</td><td class="m">21 = "vertex 2 gets colour 1"</td><td>4 × 4 = 16 atoms</td></tr>' +
'<tr><td><b>F1</b><br>at least one</td><td>every vertex gets some colour (no row of all 0s)</td><td class="m">v1 ∨ v2 ∨ v3 ∨ v4</td><td class="m">11 ∨ 12 ∨ 13 ∨ 14</td><td>1 per vertex: 4</td></tr>' +
'<tr><td><b>F2</b><br>at most one</td><td>no vertex gets two colours (no row with two 1s)</td><td class="m">¬(vc ∧ vc′), c ≠ c′</td><td class="m">¬(11 ∧ 12)</td><td>6 colour pairs × 4 vertices: 24</td></tr>' +
'<tr><td><b>F3</b><br>neighbours differ</td><td>two vertices joined by a line never share a colour</td><td class="m">¬(vc ∧ wc), {v,w} an edge</td><td class="m">¬(11 ∧ 21)</td><td>5 edges × 4 colours: 20</td></tr>' +
'<tr><td><b>F</b></td><td>all rules at once</td><td class="m">F1 ∧ F2 ∧ F3</td><td colspan="2">a model of F is exactly one proper colouring, and each proper colouring is exactly one model</td></tr></table>' +
'<p>Three things can go wrong with a colouring, and each gets its own group of rules. The names F1, F2, F3, F stand for these groups and their join: F joins all three with ∧ ("and").</p>' +
'<p>F1 rules out a vertex with no colour: every vertex has some colour. F2 rules out a vertex with two colours: no vertex has two. F3 rules out a clash: two joined vertices never share a colour.</p>' +
'<p>Each rule forbids one picture. The pictures below show what each rule rules out, on a piece of the graph:</p>' +
'{{w:gfig|{"figs":[{"v":[1],"on":[],"tag":"bad","cap":"F1 forbids this: row 1 is all 0, vertex 1 has no colour. F1 for vertex 1 is 11 ∨ 12 ∨ 13 ∨ 14."},{"v":[1],"on":["11","12"],"tag":"bad","cap":"F2 forbids this: 11 and 12 both 1. F2 contains ¬(11 ∧ 12)."},{"v":[1,2],"on":["11","21"],"tag":"bad","cap":"F3 forbids this: edge 1-2 with both ends colour 1. F3 contains ¬(11 ∧ 21)."}]}}}' +
'<p>In F2 the symbol vc′ (read "v c prime") is the atom for a different colour c′ on the same vertex v. So 11 and 12 are vertex 1 with colours 1 and 2, and ¬(vc ∧ vc′) says they are not both true.</p>' +
'<div class="facts"><div><b>4 × 4</b>vertices × colours</div><div><b>16</b>atoms</div></div>' +
'<div class="callout example"><b class="t">EXAMPLE FROM THE LECTURE</b><p>Vertices 1 to 4, edges 1-2, 1-3, 1-4, 2-4, 3-4.</p>' +
'<p>Take atoms 11, 22, 33, 44 true and the other 12 atoms false. That is the colouring 1↦1, 2↦2, 3↦3, 4↦4, where each vertex gets the colour with its own number.</p>' +
'{{w:gfig|{"figs":[{"grid":true,"on":["11","22","33","44"],"cap":"The lecture model: one 1 per row, and on every line the two ends differ."}]}}}' +
'<p>Check F1: every vertex has one true atom. Check F2: every vertex has only one true atom. Check F3: on every edge the two ends have different colours.</p>' +
'<p>So this assignment satisfies F.</p></div>' +
'<p>Now try it. Click atoms in the grid to switch them on or off, and read which of F1, F2, F3 holds.</p>' +
'{{w:colouring|{"title":"CHECK AN ASSIGNMENT AGAINST F1, F2, F3"}}}' +
'<p>Things to try, each breaks exactly one rule:</p>' +
'<div class="cards">' +
'<div class="card"><h3>Switch on 12 as well</h3><p><span class="tag bad">F2 fails</span></p></div>' +
'<div class="card"><h3>Switch off a whole row</h3><p><span class="tag bad">F1 fails</span></p></div>' +
'<div class="card"><h3>11 and 21 both true</h3><p><span class="tag bad">F3 fails</span> (1 and 2 are adjacent)</p></div>' +
'</div>' +
'<h2>Another model: rules about people</h2>' +
'<div class="callout example"><b class="t">FROM THE STANFORD BOOK §2.6</b><p>Atoms: <span class="m">c</span> = a person is cool, <span class="m">f</span> = funny, <span class="m">p</span> = popular. Each English rule becomes one constraint.</p>' +
'<table><tr><th>English</th><th>Constraint</th></tr>' +
'<tr><td>(1) If a person is cool or funny, then he is popular.</td><td class="m">c ∨ f → p</td></tr>' +
'<tr><td>(2) A person is popular only if he is cool or funny.</td><td class="m">p → c ∨ f</td></tr>' +
'<tr><td>(3) Popular if and only if cool or funny.</td><td class="m">p ↔ c ∨ f</td></tr>' +
'<tr><td>(4) No one is both cool and funny.</td><td class="m">¬(c ∧ f)</td></tr></table>' +
'<p>"Only if" points the arrow the other way: (2) is the converse of (1), and (3) is both together.</p>' +
'<p>Check a person who is cool, funny and popular (c = f = p = 1): (1), (2), (3) are 1, but (4) is <span class="m">¬(1 ∧ 1) = 0</span>. So this assignment is not a model of the theory. The models are the people who are popular and exactly one of cool or funny, plus the person who is none of the three.</p></div>' +
'<p>The table below lists all 8 assignments of (c, f, p). The highlighted rows satisfy all four constraints at once.</p>' +
'{{w:proptable|{"title":"MODELS OF THE FOUR RULES","multi":true,"formulas":["c | f -> p","p -> c | f","p <-> c | f","~(c & f)"]}}}' +
'<h2>When F has no model</h2>' +
'<p>Now allow only 2 colours. Then F has 8 atoms (4 vertices × 2 colours). Look at vertices 1, 2 and 4: each pair is joined by a line, a triangle. Three dots that all touch need three different colours, so with 2 colours some line always clashes.</p>' +
'{{w:gfig|{"figs":[{"c":[1,2],"grid":true,"on":["11","22","32","41"],"tag":"bad","cap":"One of the 16 assignments that give each vertex one of 2 colours. Edge 1-4 clashes. Any other choice breaks another edge of the triangle 1, 2, 4."}]}}}' +
'<p>So F with 2 colours has no model: M(F) = ∅. A SAT solver answers "unsatisfiable", which means "this timetable needs more than 2 slots". The answer from logic is an answer about the graph.</p>',
      quiz: [
        { q: 'Which sentence stops a single vertex from carrying two colours?', o: [
          ok('F2', 'F2 forbids vc ∧ vc′ for different colours c, c′ at the same vertex.'),
          no('F1', 'F1 only demands at least one colour; it allows several.'),
          no('F3', 'F3 is about two different vertices joined by an edge.')] },
        { q: 'With 5 vertices and 3 colours, how many atoms are needed?', o: [
          ok('15', 'One atom per pair (vertex, colour): 5 × 3.'),
          no('8', 'That adds 5 + 3; the atoms are pairs, so multiply.'),
          no('243', 'That is 3⁵, the number of colourings, not the number of atoms.')] },
        { q: 'F has no model. What does that tell you about the graph?', o: [
          ok('It cannot be coloured with the given colours', 'Models of F correspond exactly to proper colourings.'),
          no('It has no edges', 'A graph without edges is easy to colour.'),
          no('F contains a mistake', 'Not necessarily: some graphs do need more colours.')] }
      ] },

    { n: 5, title: 'Entailment and the Unsatisfiability Theorem', sub: 'When a conclusion follows, and the trick behind proofs.',
      html: '' +
'<p class="lead">When we know a set of facts, which other statements are forced to be true?</p>' +
'<p>From earlier steps you know: a model of a sentence is an assignment making it true; M(φ) is the list of all models of φ; Δ is a knowledge base (a bag of sentences); unsatisfiable means "true under no assignment".</p>' +
words([
  ['entails', '⊨', 'Δ ⊨ φ means: whenever every sentence of Δ is true, φ is true. Example: {p, p → q} entails q.'],
  ['⊆', '', 'reads "every item on the left is also on the right". Example: {1,2} ⊆ {1,2,3}.'],
  ['⟺', '', 'reads "exactly when": the two sides are true together or false together. Example: rain ⟺ wet roof.'],
  ['∪', '', 'puts two collections together. Example: Δ ∪ {¬φ} is Δ with ¬φ added.'],
  ['{ }', 'braces', 'a bag of sentences, order ignored. Example: {p, p → q} has two sentences.'],
  ['counter-model', '', 'a model of Δ where φ is false. Example: p true, q false for {p} and p ∧ q.'],
  ['inconsistent', '', 'a knowledge base with no model. Example: {p, ¬p} cannot all hold.'],
  ['theorem', '', 'a statement that has been proved true. Example: the Unsatisfiability Theorem below.'],
  ['(⇒) and (⇐)', '', 'the two directions of ⟺: "left gives right" and "right gives left". Example: (⇒) proves one way.']
]) +
'<h2>Start with an everyday case</h2>' +
'<p>You know two facts: "it is Monday" and "if it is Monday, the bins go out".</p>' +
'<p>Must the bins go out? Think of every possible world you could be in. In any world where both facts hold, the bins go out. There is no world where both facts hold and the bins stay in.</p>' +
'<p>That is a stronger thing than "the bins probably go out": the conclusion is forced. When a conclusion is true in every world where all the facts are true, we say the facts <b>entail</b> it: the set of facts entails the conclusion.</p>' +
'<div class="tcard"><div class="tn">entails (⊨)</div><div class="tr"><span class="tk">Example</span><span><span class="m">{p, p → q} ⊨ q</span>; but <span class="m">{p} ⊭ p ∧ q</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>Δ ⊨ φ iff every truth assignment that satisfies all of Δ also satisfies φ, i.e. every model of Δ is a model of φ.</span></div></div>' +
'<p>In symbols the two facts are p and p → q, and the conclusion is q. Braces { } mean a bag of sentences with order ignored, so the two facts are Δ = {p, p → q}. We write entailment with the sign ⊨.</p>' +
'<div class="big">Δ ⊨ φ  ⟺  M(Δ) ⊆ M(φ)<small>every situation where all of Δ is true is also a situation where φ is true</small></div>' +
'<p>Here M(Δ) is the situations where all of Δ holds, and M(φ) is where φ holds. M(Δ) sits inside M(φ).</p>' +
'<div class="callout example"><b class="t">EXAMPLES FROM THE LECTURE</b>' +
'<div class="vs"><div class="good"><h4>YES</h4><p class="m">{p} ⊨ p ∨ q</p><p class="m">{p, p → q} ⊨ q</p><p>Any assignment with p and p → q true must have q true.</p></div><div class="bad"><h4>NO</h4><p class="m">{p} ⊨ p ∧ q</p><p>Take q false.</p></div></div></div>' +
'<h2>Worked example: {p, p → q} ⊨ q</h2>' +
'<p>List all four rows for (p, q). A row is a model of Δ only if p is true and p → q is true.</p>' +
'<table><tr><th>(p, q)</th><th>p</th><th>p → q</th><th>Model of Δ?</th><th>q</th></tr>' +
'<tr><td class="m">(1,1)</td><td>1</td><td>1</td><td>yes</td><td>1</td></tr>' +
'<tr><td class="m">(1,0)</td><td>1</td><td>0</td><td>no</td><td>0</td></tr>' +
'<tr><td class="m">(0,1)</td><td>0</td><td>1</td><td>no</td><td>1</td></tr>' +
'<tr><td class="m">(0,0)</td><td>0</td><td>1</td><td>no</td><td>0</td></tr></table>' +
'<p>Only (1,1) is a model of Δ, and q is 1 there. So Δ ⊨ q.</p>' +
'<h2>Try it</h2>' +
'<p>Click a preset, or edit Δ and φ. Rows in blue are models of Δ. Entailment holds exactly when φ is true in every blue row.</p>' +
'<p>To show something does not follow, you only need one world that breaks it: a world where all of Δ holds but φ fails. Such a blue row where φ is false is called a <b>counter-model</b>. Look for one: if you find it, entailment fails.</p>' +
'<div class="tcard"><div class="tn">counter-model</div><div class="tr"><span class="tk">Example</span><span>For <span class="m">{p} ⊨ p ∧ q</span>: <span class="m">{p↦1, q↦0}</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>An assignment i ∈ M(Δ) with φⁱ = 0; Δ ⊨ φ fails iff a counter-model exists.</span></div></div>' +
'{{w:entail|{"title":"DOES Δ ENTAIL φ?","delta":["p","p -> q"],"phi":"q","presets":[{"label":"{p} ⊨ p∨q","delta":["p"],"phi":"p | q"},{"label":"{p} ⊨ p∧q","delta":["p"],"phi":"p & q"},{"label":"modus ponens","delta":["p","p -> q"],"phi":"q"},{"label":"inconsistent Δ","delta":["p","~p"],"phi":"r"}]}}}' +
'<p>One strange case remains. What if the facts contradict each other, like {p, ¬p}? No world makes both true. A knowledge base with no model is called <b>inconsistent</b>.</p>' +
'<div class="tcard"><div class="tn">inconsistent</div><div class="tr"><span class="tk">Example</span><span><span class="m">Δ = {p, ¬p}</span> has no model.</span></div><div class="tr"><span class="tk">Formal</span><span>Δ is inconsistent (unsatisfiable) iff <span class="m">M(Δ) = ∅</span>, i.e. no assignment satisfies every sentence of Δ.</span></div></div>' +
'<div class="callout warn"><b class="t">VACUOUS ENTAILMENT</b><p>If Δ has no model, <span class="m">M(Δ) = ∅ ⊆ M(φ)</span> for every φ, so an inconsistent knowledge base entails everything.</p><p>Why: with no situation where Δ holds, there is no counter-model to find. Try the preset "inconsistent Δ".</p><p>That is a feature of the definition, not a bug.</p></div>' +
'<h2>Worked example from the book: fickle Mary</h2>' +
'<div class="callout example"><b class="t">FROM THE STANFORD BOOK §3.4</b><p>If Mary loves Pat, she loves Quincy: <span class="m">p → q</span>. If it is Monday, she loves Pat or Quincy: <span class="m">m → p ∨ q</span>. Does it follow that if it is Monday, she loves Quincy, <span class="m">m → q</span>?</p>' +
'<table><tr><th>(m, p, q)</th><th>m → p ∨ q</th><th>p → q</th><th>Model of Δ?</th><th>m → q</th></tr>' +
'<tr><td class="m">(1,1,1)</td><td>1</td><td>1</td><td>yes</td><td>1</td></tr>' +
'<tr><td class="m">(1,1,0)</td><td>1</td><td>0</td><td>no</td><td>0</td></tr>' +
'<tr><td class="m">(1,0,1)</td><td>1</td><td>1</td><td>yes</td><td>1</td></tr>' +
'<tr><td class="m">(1,0,0)</td><td>0</td><td>1</td><td>no</td><td>0</td></tr>' +
'<tr><td class="m">(0,1,1)</td><td>1</td><td>1</td><td>yes</td><td>1</td></tr>' +
'<tr><td class="m">(0,1,0)</td><td>1</td><td>0</td><td>no</td><td>1</td></tr>' +
'<tr><td class="m">(0,0,1)</td><td>1</td><td>1</td><td>yes</td><td>1</td></tr>' +
'<tr><td class="m">(0,0,0)</td><td>1</td><td>1</td><td>yes</td><td>1</td></tr></table>' +
'<p>Five rows are models of Δ, and m → q is 1 in every one of them. So Δ ⊨ m → q. The rows where m → q is 0 are all ruled out by a premise. Lesson 5.7 proves the same entailment with Fitch (worked proof 2).</p></div>' +
'{{w:entail|{"title":"CHECK FICKLE MARY","delta":["p -> q","m -> p | q"],"phi":"m -> q"}}}' +
'<h2>The Unsatisfiability Theorem</h2>' +
'<p>Checking entailment by hand means looking at every world where Δ holds. It would be easier if we could ask a single yes or no question that a SAT solver can answer. A statement that has been proved true, like the one below, is called a <b>theorem</b>, and this one turns "does it follow?" into "is there a contradiction?". The next steps rely on it.</p>' +
'<div class="tcard"><div class="tn">theorem</div><div class="tr"><span class="tk">Example</span><span>The Unsatisfiability Theorem: <span class="m">Δ ⊨ φ ⟺ Δ ∪ {¬φ}</span> is unsatisfiable.</span></div><div class="tr"><span class="tk">Formal</span><span>A statement that has been proved from the definitions and earlier theorems.</span></div></div>' +
'<div class="callout idea"><b class="t">THEOREM</b><p class="m" style="text-align:center">Δ ⊨ φ  ⟺  Δ ∪ {¬φ} is unsatisfiable</p><p>In words: φ follows from Δ exactly when adding "not φ" to Δ makes a contradiction.</p></div>' +
'<p>Why it holds, one direction at a time:</p>' +
'<div class="vs"><div class="neutral"><h4>(⇒) ENTAILMENT GIVES CLASH</h4><div class="chain"><span>Δ ⊨ φ</span><i>→</i><span>models of Δ make φ true</span><i>→</i><span>¬φ false there</span><i>→</i><span>no model of Δ ∪ {¬φ}</span></div></div>' +
'<div class="neutral"><h4>(⇐) CLASH GIVES ENTAILMENT</h4><div class="chain"><span>Δ ∪ {¬φ} unsatisfiable</span><i>→</i><span>a model of Δ cannot satisfy ¬φ</span><i>→</i><span>it satisfies φ</span><i>→</i><span>Δ ⊨ φ</span></div></div></div>' +
'<p>The tool above prints this view too: the number of models of Δ ∪ {¬φ} equals the number of counter-models.</p>' +
'<div class="callout remember"><b class="t">WHY THIS MATTERS</b><p>To test entailment, do not prove φ directly. Negate it, add it to the knowledge base, and look for a contradiction.</p><p>Resolution (step 9) is built on exactly this.</p></div>',
      quiz: [
        { q: 'Δ = {p ∨ q, ¬p}. Does Δ entail q?', o: [
          ok('Yes', 'The only model of Δ is p = 0, q = 1, and q is true there.'),
          no('No', 'Δ has exactly one model, (0,1), where q is true. Use the tool to see it.'),
          no('Cannot say without more atoms', 'The truth table over p and q is complete.')] },
        { q: 'Δ is unsatisfiable. Which statement is true?', o: [
          ok('Δ ⊨ φ for every φ', 'M(Δ) = ∅ is a subset of every M(φ).'),
          no('Δ ⊨ φ for no φ', 'The empty set is a subset of every set.'),
          no('Δ ⊨ φ only for valid φ', 'It entails valid and invalid sentences alike.')] },
        { q: 'To check Δ ⊨ φ with a SAT solver you ask whether ___ is satisfiable.', o: [
          ok('Δ ∪ {¬φ}', 'Entailment holds exactly when this set has no model.'),
          no('Δ ∪ {φ}', 'That only tells you φ is consistent with Δ, not that it is forced.'),
          no('¬Δ ∪ {φ}', 'That is not what the theorem says.')] }
      ] },

    { n: 6, title: 'Proofs, inference rules, soundness and completeness', sub: 'From checking meaning to a mechanical procedure.',
      html: '' +
'<p class="lead">Checking 2ⁿ truth-table rows is too slow. Can we reach the answer with a few safe steps instead?</p>' +
'<p>From step 5 you know: Δ ⊨ φ means every model of Δ makes φ true. That is a claim about meaning, checked over all assignments.</p>' +
words([
  ['proof', '', 'a list of sentences where each line is allowed by a rule. Example: lines 1 to 6 below.'],
  ['premise', '', 'a sentence we are given and may use freely. Example: p, from Δ.'],
  ['conclusion', '', 'the sentence a rule or proof ends with. Example: q, from p and p → q.'],
  ['inference rule', '', 'a fixed step: if you have these sentences, you may write that one. Example: from p → q and p, write q.'],
  ['schema', '', 'a pattern where φ, ψ, χ stand for any formulas. Example: φ → ψ.'],
  ['meta-variable', 'φ, ψ, χ', 'a placeholder inside a schema. Example: φ may stand for p, or for ¬q.'],
  ['instance', '', 'a schema with each placeholder replaced by a real formula, the same way each time. Example: p → q is an instance of φ → ψ.'],
  ['Implication Elimination', 'IE', 'also called modus ponens: from φ → ψ and φ, infer ψ. Example: it rains, and rain gives wet, so wet.'],
  ['⟹', '', 'reads "from these sentences we can conclude this one". Example: p → q, p ⟹ q.'],
  ['proves', '⊢', 'Δ ⊢ φ means φ has a proof from Δ. Example: {p, p → q} ⊢ q. The small R below it names the proof system.'],
  ['sound', '', 'a proof system that never proves a false thing. Example: a calculator that is never wrong.'],
  ['complete', '', 'a proof system that can prove everything that is true. Example: a map that reaches every town.'],
  ['⇒', '', 'reads "implies". Example: Δ ⊢ φ ⇒ Δ ⊨ φ.']
]) +
'<h2>Start with a game</h2>' +
'<p>Step 5 gave us a way to check entailment, but it means looking at every row of a table. Think of chess instead. You do not check every possible future. You just make legal moves, one at a time, and trust that legal moves lead somewhere sensible.</p>' +
'<p>Could logic work the same way? We would want a small set of allowed moves, each applied by looking at the shape of the sentences only, never at a truth table. Such a move is called an <b>inference rule</b>.</p>' +
'<div class="tcard"><div class="tn">inference rule</div><div class="tr"><span class="tk">Example</span><span>From <span class="m">p → q</span> and <span class="m">p</span>, write <span class="m">q</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>A rule of the form φ₁, …, φₙ ⟹ φ: from sentences matching the premise schemas one may write the sentence matching the conclusion schema, by syntactic form alone.</span></div></div>' +
'<p>Not any moves will do. A good set of moves should never lead us to a false answer, and should be able to reach every true one. Hold on to those two wishes; the end of this step names them.</p>' +
'<h2>One legal move, then the pattern</h2>' +
'<p>Say we hold two sentences: <span class="m">p → q</span> ("if it is Monday the bins go out") and <span class="m">p</span> ("it is Monday").</p>' +
'<p>A sentence we are given and may use freely is called a <b>premise</b>. Both of these are premises.</p>' +
'<div class="tcard"><div class="tn">premise</div><div class="tr"><span class="tk">Example</span><span><span class="m">p</span> and <span class="m">p → q</span>, both from Δ.</span></div><div class="tr"><span class="tk">Formal</span><span>A sentence of Δ, or a sentence given to a rule as input; it may be used freely as a line.</span></div></div>' +
'<p>The move: from them we may write down <span class="m">q</span>. The sentence a step ends with is its <b>conclusion</b>, here q.</p>' +
'<div class="tcard"><div class="tn">conclusion</div><div class="tr"><span class="tk">Example</span><span><span class="m">q</span>, from <span class="m">p</span> and <span class="m">p → q</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>The sentence a rule application produces from its premises.</span></div></div>' +
'<p>Look at what the move actually used. Did it need Monday or bins? No. It only needed one sentence of the shape "something → something else" and another sentence that is the first "something". Any sentences of the shape "φ → ψ" and "φ" give "ψ".</p>' +
'<p>A pattern like "φ → ψ", where the letters stand for any formulas, is called a <b>schema</b>. The letters φ, ψ, χ inside it are placeholders, called <b>meta-variables</b>.</p>' +
'<div class="tcard"><div class="tn">schema, meta-variable</div><div class="tr"><span class="tk">Example</span><span>Schema <span class="m">φ → ψ</span> with meta-variables φ and ψ; it covers <span class="m">p → q</span> and <span class="m">¬r → (p ∧ q)</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>A schema is an expression over the language extended with meta-variables φ, ψ, χ, … ranging over formulas of ℒ.</span></div></div>' +
'<p>Put the premise schemas above a line and the conclusion schema below, and you have the <b>inference rule</b> in its written form. Ours is called <b>Implication Elimination</b> (IE, also modus ponens): if you hold an if-then sentence and also its "if" part, you may write its "then" part.</p>' +
'<div class="big">from φ → ψ and φ, infer ψ<small>Implication Elimination (IE, modus ponens)</small></div>' +
'<div class="tcard"><div class="tn">Implication Elimination (IE)</div><div class="tr"><span class="tk">Example</span><span>From <span class="m">p → q</span> and <span class="m">p</span> infer <span class="m">q</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>The rule <span class="m">φ → ψ, φ ⟹ ψ</span> for all formulas φ, ψ (modus ponens).</span></div></div>' +
'<p>A schema is a form with blanks; to use it we fill the blanks. Replacing φ by p and ψ by q gives p → q and p, the move we just made. A schema with every meta-variable replaced consistently by a concrete formula is called an <b>instance</b> of it. "Consistently" means the same formula fills the same blank each time.</p>' +
'<div class="tcard"><div class="tn">instance</div><div class="tr"><span class="tk">Example</span><span><span class="m">p → q</span> is an instance of <span class="m">φ → ψ</span> (φ = p, ψ = q).</span></div><div class="tr"><span class="tk">Formal</span><span>The result of substituting a formula of ℒ for each meta-variable of a schema, the same formula for every occurrence of the same meta-variable.</span></div></div>' +
'<p>Two instances. In the second, φ is the whole formula p → q.</p>' +
'<div class="cards">' +
'<div class="card"><h3>Instance 1</h3><p class="m">p → q, p ⟹ q</p></div>' +
'<div class="card"><h3>Instance 2</h3><p class="m">(p → q) → (q → r), p → q ⟹ q → r</p><p>Here φ is the whole formula p → q.</p></div>' +
'</div>' +
'<div class="callout idea"><b class="t">PROOF</b><p>A proof of φ from Δ is a finite list of sentences ending in φ. Each line is a premise from Δ or the conclusion of a rule applied to earlier lines.</p></div>' +
'<div class="tcard"><div class="tn">proof</div><div class="tr"><span class="tk">Example</span><span>Lines 1 to 6 of the worked example below, ending in <span class="m">r</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>A proof of φ from Δ is a finite sequence of formulas ending in φ, each a member of Δ or obtained from earlier lines by an inference rule.</span></div></div>' +
'<h2>Worked example: prove r</h2>' +
'<p>Δ = {p, p → q, (p → q) → (q → r)}, goal r. Write the premises as lines 1 to 3, then apply IE.</p>' +
'<div class="chain"><span>1. p</span><i>,</i><span>2. p → q</span><i>,</i><span>3. (p → q) → (q → r)</span></div>' +
'<div class="chain"><span>4. q (IE on lines 1,2)</span></div>' +
'<div class="chain"><span>5. q → r (IE on lines 2,3)</span></div>' +
'<div class="chain"><span>6. r (IE on lines 4,5)</span></div>' +
'<p>Line 4: from p → q and p we get q. Line 5: line 3 is an implication whose left side is line 2, so we get its right side q → r. Line 6: from q → r and q we get r.</p>' +
'<div class="callout example"><b class="t">FROM THE STANFORD BOOK §4.4: MENDELSON RULES IC AND ID</b><p>Prove <span class="m">p → r</span> from <span class="m">p → q</span> and <span class="m">q → r</span> with no boxes. Two more Mendelson rules are needed: IC (Implication Creation) turns φ into <span class="m">ψ → φ</span>, and ID (Implication Distribution) turns <span class="m">φ → (ψ → χ)</span> into <span class="m">(φ → ψ) → (φ → χ)</span>.</p>' +
'<table><tr><th>#</th><th>Line</th><th>Why</th></tr>' +
'<tr><td>1</td><td class="m">p → q</td><td>Premise</td></tr>' +
'<tr><td>2</td><td class="m">q → r</td><td>Premise</td></tr>' +
'<tr><td>3</td><td class="m">p → (q → r)</td><td>IC: 2</td></tr>' +
'<tr><td>4</td><td class="m">(p → q) → (p → r)</td><td>ID: 3</td></tr>' +
'<tr><td>5</td><td class="m">p → r</td><td>IE: 4, 1</td></tr></table>' +
'<p>Compare with Fitch in lesson 5.7: there the same result comes from opening a box with p. Mendelson has no boxes, so IC and ID do that job.</p></div>' +
'<h2>Try it: build the proof yourself</h2>' +
'<p>Click a button to add the next line. Each button is an instance of IE that can be used right now. Keep going until r appears.</p>' +
'{{w:ie|{"title":"PROOF WORKBENCH (ONLY RULE: IE)","kb":["p","p -> q","(p -> q) -> (q -> r)"],"goal":"r"}}}' +
'<h2>Soundness and completeness</h2>' +
'<p>We now have two separate ways to say "φ follows from Δ". One is about meaning: Δ ⊨ φ, checked over all worlds. The other is about moves: we can reach φ from Δ by legal steps. We say Δ <b>proves</b> φ, and write <span class="m">Δ ⊢<sub>R</sub> φ</span>, when φ has a proof from Δ using only rules of the system R. The small R names the proof system.</p>' +
'<div class="tcard"><div class="tn">proves (⊢)</div><div class="tr"><span class="tk">Example</span><span><span class="m">{p, p → q} ⊢<sub>IE</sub> q</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>Δ ⊢<sub>R</sub> φ iff there is a proof of φ from Δ using only the rules of system R.</span></div></div>' +
'<p>These two could disagree, which is exactly the worry from the chess picture. The two wishes from the start of this step now get names.</p>' +
'<p>Think of a calculator. One that never shows a wrong answer is <b>sound</b>. One that can answer every sum you could ask is <b>complete</b>. A proof system is sound when it never proves what is false, and complete when it can prove everything that is true. With ⊢ for "can prove" and ⊨ for "is true":</p>' +
'<div class="vs"><div class="good"><h4>SOUND</h4><p class="m">Δ ⊢ φ ⇒ Δ ⊨ φ</p><p>Every proof is correct: nothing false is proved.</p></div><div class="good"><h4>COMPLETE</h4><p class="m">Δ ⊨ φ ⇒ Δ ⊢ φ</p><p>Every entailed sentence can be proved.</p></div></div>' +
'<div class="tcard"><div class="tn">sound</div><div class="tr"><span class="tk">Example</span><span>IE alone is sound: from <span class="m">p → q</span> and <span class="m">p</span> it only ever gives <span class="m">q</span>, which is entailed.</span></div><div class="tr"><span class="tk">Formal</span><span>A proof system R is sound iff for all Δ and φ: Δ ⊢<sub>R</sub> φ implies Δ ⊨ φ.</span></div></div>' +
'<div class="tcard"><div class="tn">complete</div><div class="tr"><span class="tk">Example</span><span>IE alone is not complete: <span class="m">∅ ⊨ p → p</span> but IE cannot start a proof from nothing.</span></div><div class="tr"><span class="tk">Formal</span><span>A proof system R is complete iff for all Δ and φ: Δ ⊨ φ implies Δ ⊢<sub>R</sub> φ.</span></div></div>' +
'<div class="big">Δ ⊢ φ  ⟺  Δ ⊨ φ<small>⊨ is about models, ⊢ is about proofs</small></div>' +
'<h2>Three systems</h2>' +
'<p>Later steps use three proof systems. Only their names and inputs matter for now.</p>' +
'<div class="cards">' +
'<div class="card"><h3>Mendelson</h3><p>Rules IE, IC, ID, CR (named in the lecture; only IE is used on this page).</p><p>Input: only ¬ and →.</p></div>' +
'<div class="card"><h3>Resolution</h3><p>One rule.</p><p>Input: clauses (CNF), proof by refutation. Steps 8 to 10 explain these words.</p></div>' +
'<div class="card"><h3>Fitch</h3><p>10 introduction and elimination rules.</p><p>Input: whole language. See step 7.</p></div>' +
'</div>' +
'<p>The restrictions cost nothing: every formula has an equivalent using only ¬ and →, and an equivalent in CNF.</p>',
      quiz: [
        { q: 'A rule applied to sentences in Δ derives a sentence that Δ does not entail. What is wrong?', o: [
          ok('The system is unsound', 'Soundness says every derived sentence is entailed.'),
          no('The system is incomplete', 'Incompleteness means something entailed cannot be proved; here something false was proved.'),
          no('Nothing, proofs may go beyond entailment', 'A proof that goes beyond entailment is exactly what soundness forbids.')] },
        { q: 'Δ ⊨ φ holds but no proof of φ exists in system R. R is', o: [
          ok('not complete', 'Completeness requires a proof whenever Δ ⊨ φ.'),
          no('not sound', 'Nothing false was proved.'),
          no('inconsistent', 'The situation says nothing about contradictions.')] },
        { q: 'In the proof workbench, which pair gives q → r?', o: [
          ok('(p → q) → (q → r) with p → q', 'IE needs an implication and exactly its left side.'),
          no('p with p → q', 'That gives q, not q → r.'),
          no('q with q → r', 'q → r is not in Δ at that stage; it is the result.')] }
      ] },

    { n: 7, title: 'Fitch natural deduction', sub: 'Ten rules: an introduction and an elimination per connective.',
      html: '' +
'<p class="lead">How do people argue "if A then B", and can we write that down as strict rules?</p>' +
'<p>From step 6 you know: a proof is a list of lines, each allowed by an inference rule, and IE (modus ponens) turns φ → ψ and φ into ψ.</p>' +
words([
  ['Fitch', '', 'a proof system with two rules per connective. Example: one rule to build ∧, one to use ∧.'],
  ['introduction rule', '', 'tells how to prove a sentence that has a given connective. Example: to prove p ∧ q, prove both.'],
  ['elimination rule', '', 'tells how to use a sentence that has a given connective. Example: from p ∧ q you may take p.'],
  ['assumption', '', 'a sentence you suppose for the moment, not a premise. Example: "suppose it rains".'],
  ['subproof (box)', '', 'a part of a proof that works under an assumption. Example: everything inside "suppose it rains".'],
  ['discharged', '', 'an assumption that is closed with its box and cannot be used afterwards. Example: the "suppose" ends.'],
  ['φ₁ … φₙ and φᵢ', '', 'φ₁ is the first formula, φₙ the last, φᵢ any one of them. Example: with n = 3 there are three formulas.'],
  ['abbreviations', 'NI NE AI AE OI OE II IE BI BE', 'N = negation, A = and, O = or, I = implication, B = biconditional (↔), then I = intro or E = elim. Example: AI is and intro.']
]) +
'<h2>Start with how people argue</h2>' +
'<p>You say: "Suppose it rains. Then the streets get wet. So: if it rains, the streets get wet."</p>' +
'<p>Notice the three moves. You supposed something you did not know. You worked out a result under that supposition. Then you dropped the supposition and kept only an if-then. Step 6 had no way to do that: IE only combines sentences you already hold.</p>' +
'<p>This habit of arguing is the core of <b>Fitch</b> natural deduction, a proof system built the way people argue. It has two rules for every connective, like a toolbox with a "make" tool and a "use" tool for each part.</p>' +
'<div class="tcard"><div class="tn">Fitch natural deduction</div><div class="tr"><span class="tk">Example</span><span>Prove <span class="m">p → r</span> from <span class="m">p → q</span> and <span class="m">q → r</span> by assuming p in a box.</span></div><div class="tr"><span class="tk">Formal</span><span>A proof system with ten rules, two per connective (NI, NE, AI, AE, OI, OE, II, IE, BI, BE), where a proof may assume a formula inside a box.</span></div></div>' +
'<p>The "make" tool says how to prove a formula that has the connective. It is called an <b>introduction rule</b>. For example, to prove p ∧ q, prove p and prove q.</p>' +
'<div class="tcard"><div class="tn">introduction rule</div><div class="tr"><span class="tk">Example</span><span>AI: from <span class="m">p</span> and <span class="m">q</span> get <span class="m">p ∧ q</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>A rule whose conclusion has a given connective as main connective; it states what suffices to prove such a formula.</span></div></div>' +
'<p>The "use" tool says what you may do with a formula you already hold. It is called an <b>elimination rule</b>. For example, from p ∧ q you may take p.</p>' +
'<div class="tcard"><div class="tn">elimination rule</div><div class="tr"><span class="tk">Example</span><span>AE: from <span class="m">p ∧ q</span> get <span class="m">p</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>A rule with a premise whose main connective is a given connective; it states what may be derived from such a formula.</span></div></div>' +
'<div class="vs"><div class="neutral"><h4>INTRODUCTION</h4><p>How to prove a formula with that connective.</p></div><div class="neutral"><h4>ELIMINATION</h4><p>How to use one.</p></div></div>' +
'<p>The ten rules are listed below. Their short names are abbreviations: the first letter names the connective (N not, A and, O or, I implication, B biconditional), the second says I for intro or E for elim. So AI is and-intro and OE is or-elim.</p>' +
'<p>In the table, "From" is what you must already have; "Get" is what you may write.</p>' +
'<p>Some rules take any number of formulas, so the table counts them. In the table, φ₁ … φₙ and φᵢ mean: φ₁ is the first formula, φₙ the last, φᵢ any one of them. With n = 3 there are three formulas.</p>' +
'<table><tr><th>Rule</th><th>From</th><th>Get</th></tr>' +
'<tr><td>1. NI, negation intro</td><td class="m">φ → ψ and φ → ¬ψ</td><td class="m">¬φ</td></tr>' +
'<tr><td>2. NE, negation elim</td><td class="m">¬¬φ</td><td class="m">φ</td></tr>' +
'<tr><td>3. AI, and intro</td><td class="m">φ₁ … φₙ</td><td class="m">φ₁ ∧ … ∧ φₙ</td></tr>' +
'<tr><td>4. AE, and elim</td><td class="m">φ₁ ∧ … ∧ φₙ</td><td class="m">any φᵢ</td></tr>' +
'<tr><td>5. OI, or intro</td><td class="m">some φᵢ</td><td class="m">φ₁ ∨ … ∨ φₙ</td></tr>' +
'<tr><td>6. OE, or elim</td><td class="m">φ₁ ∨ … ∨ φₙ and φ₁→ψ, …, φₙ→ψ</td><td class="m">ψ</td></tr>' +
'<tr><td>7. II, implication intro</td><td>a box that assumes φ and ends with ψ</td><td class="m">φ → ψ</td></tr>' +
'<tr><td>8. IE, implication elim</td><td class="m">φ → ψ and φ</td><td class="m">ψ</td></tr>' +
'<tr><td>9. BI, biconditional intro</td><td class="m">φ → ψ and ψ → φ</td><td class="m">φ ↔ ψ</td></tr>' +
'<tr><td>10. BE, biconditional elim</td><td class="m">φ ↔ ψ</td><td class="m">φ → ψ (or ψ → φ)</td></tr></table>' +
'<div class="callout idea"><b class="t">THE ONE RULE WITH A BOX</b><p>Back to the rain argument. "Suppose it rains" is not a fact you were given, so it is not a premise. It is only an <b>assumption</b>: a sentence you suppose for the moment.</p>' +
'<div class="tcard"><div class="tn">assumption</div><div class="tr"><span class="tk">Example</span><span>"Suppose it rains": <span class="m">p</span> assumed at the top of a box.</span></div><div class="tr"><span class="tk">Formal</span><span>A formula that opens a subproof; it is not a member of Δ and may be used only inside that subproof.</span></div></div>' +
'<p>Everything you conclude while supposing it is only true inside that supposition. So we draw a box around that part of the proof. A part of a proof that works under an assumption is a <b>subproof</b>. II is the only rule that opens one.</p>' +
'<div class="tcard"><div class="tn">subproof</div><div class="tr"><span class="tk">Example</span><span>The box that assumes <span class="m">p</span> and ends in <span class="m">r</span>, closed by II to give <span class="m">p → r</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>A block of lines that begins with an assumption φ; its lines may be used only inside the block, and closing it with II yields φ → ψ for its last line ψ.</span></div></div>' +
'<div class="flow"><div class="fs"><b>Assume φ</b><span>open the box</span></div><div class="fs"><b>Work inside</b><span>reach ψ</span></div><div class="fs"><b>Close the box</b><span>write <span class="m">φ → ψ</span> outside</span></div></div>' +
'<p>Once the box is closed, "suppose it rains" is over; you cannot lean on it later as if it were a fact. We say the assumption is <b>discharged</b>: it is usable only inside its box, and what leaves the box is the if-then.</p>' +
'<div class="tcard"><div class="tn">discharged</div><div class="tr"><span class="tk">Example</span><span>After II closes the box, <span class="m">p</span> is discharged and only <span class="m">p → r</span> remains outside.</span></div><div class="tr"><span class="tk">Formal</span><span>An assumption is discharged when its subproof is closed; it is then unavailable to later lines, which may use only the rule\'s conclusion.</span></div></div></div>' +
'<h2>Worked proof 1: transitivity of implication</h2>' +
'<p>Given p → q and q → r, prove p → r. Click the step button to reveal one line at a time, and read the comment beside each line.</p>' +
'{{w:fitch|{"title":"STEP THROUGH THE PROOF","proof":"trans"}}}' +
'<p>The pattern: the goal is an implication, so assume its left side, derive its right side inside the box, close the box.</p>' +
'<h2>Worked proof 2: a nested subproof</h2>' +
'<p>A box inside a box, using Or Elimination. Again click to reveal one line at a time. Notice the indentation: it shows how many assumptions are open.</p>' +
'{{w:fitch|{"title":"STEP THROUGH THE PROOF","proof":"nested"}}}' +
'<h2>Worked proof 3: from no premises, with NI</h2>' +
'<p>Can we prove <span class="m">¬¬p</span> from nothing? No. With p = 0, <span class="m">¬¬p</span> is false, and Fitch is sound: anything it proves from no premises is true in every row. What we can prove from nothing is <span class="m">p → ¬¬p</span>, which is true in every row.</p>' +
'<p>With no premises, the proof starts with an assumption. The new rule here is NI. In this lecture, NI does not close a box itself: it takes two implications <span class="m">φ → ψ</span> and <span class="m">φ → ¬ψ</span>, and each one is built by its own II box.</p>' +
'<p>Plan it backwards from the goal (strategy table below):</p>' +
'<table><tr><th>goal</th><th>its main connective says</th><th>so we</th></tr>' +
'<tr><td class="m">p → ¬¬p</td><td>→ : use II</td><td>open a box, assume p, aim for ¬¬p</td></tr>' +
'<tr><td class="m">¬¬p, read as ¬(¬p)</td><td>¬ : use NI with φ = ¬p, ψ = p</td><td>need ¬p → p and ¬p → ¬p</td></tr>' +
'<tr><td class="m">¬p → p</td><td>→ : use II</td><td>inner box: assume ¬p, repeat the outer p</td></tr>' +
'<tr><td class="m">¬p → ¬p</td><td>→ : use II</td><td>inner box: assume ¬p, repeat it</td></tr></table>' +
'{{w:fitch|{"title":"STEP THROUGH THE PROOF","proof":"dneg"}}}' +
'<p>The other direction: with ¬¬p given as a premise, p is one step of NE (¬¬φ ⟹ φ). From no premises, ⊢ ¬¬p → p takes one box: assume ¬¬p, NE gives p, close with II.</p>' +
'<h2>Worked proof 4: no contradiction, ⊢ ¬(p ∧ ¬p)</h2>' +
'<p>This one is from the Stanford book (§5.6). The goal is a negation, so NI is the last step. NI needs two implications from <span class="m">p ∧ ¬p</span>: one ending in p and one ending in ¬p. Each comes from its own box, closed by II, and AE splits the ∧.</p>' +
'{{w:fitch|{"title":"STEP THROUGH THE PROOF","proof":"nonc"}}}' +
'<h2>Strategy: work backwards from the goal</h2>' +
'<p>Look at the main connective of the goal. It tells you the first move.</p>' +
'<table><tr><th>Goal looks like</th><th>Try</th></tr>' +
'<tr><td class="m">φ → ψ</td><td>open a box, assume φ, derive ψ, close with II</td></tr>' +
'<tr><td class="m">¬φ</td><td>derive φ → ψ and φ → ¬ψ for some ψ, then NI</td></tr>' +
'<tr><td class="m">φ ∧ ψ</td><td>prove both, then AI</td></tr>' +
'<tr><td class="m">φ ∨ ψ</td><td>prove one disjunct, then OI</td></tr>' +
'<tr><td class="m">φ ↔ ψ</td><td>prove both implications, then BI</td></tr>' +
'<tr><td>an atom</td><td>eliminate premises (AE, IE, OE, BE); if stuck, prove ¬¬p and use NE</td></tr></table>',
      quiz: [
        { q: 'You must prove p → (q → p). What is the first move?', o: [
          ok('Open a box and assume p', 'The goal is an implication, so assume its left side p and aim for q → p.'),
          no('Apply IE', 'IE needs an implication already available; none is.'),
          no('Apply AI', 'The goal is not a conjunction.')] },
        { q: 'After closing a box with II, the assumption p', o: [
          ok('can no longer be used', 'It is discharged; only the implication outside the box remains.'),
          no('is still available as a premise', 'Then every implication proof would prove its left side outright.'),
          no('becomes a premise of the whole proof', 'Assumptions are local to their boxes.')] },
        { q: 'Which rule opens a subproof?', o: [
          ok('Implication Introduction', 'It is the only rule with a box in the lecture list.'),
          no('Implication Elimination', 'IE just combines two existing lines.'),
          no('Or Introduction', 'OI needs no assumption.')] }
      ] },

    { n: 8, title: 'Clausal form: the INDO recipe', sub: 'Converting any formula to a set of clauses.',
      html: '' +
'<p class="lead">Can we rewrite any formula into one fixed, simple shape that a machine handles easily?</p>' +
'<p>From earlier steps you know: ¬ is not, ∧ is and, ∨ is or, → is if-then, and two formulas are equivalent (≡) when they are true in the same assignments.</p>' +
words([
  ['literal', '', 'an atom or a negated atom. Example: p, or ¬p.'],
  ['clause', '{ }', 'a list of literals joined by or, written inside braces. Example: {p, ¬q, r} means p ∨ ¬q ∨ r.'],
  ['disjunction / conjunction', '', 'a formula made of ors / a formula made of ands. Example: p ∨ q / p ∧ q.'],
  ['CNF', '', 'a formula that is ands of clauses. Example: (p ∨ q) ∧ ¬r.'],
  ['clausal form', '', 'the same CNF written as a set of sets of literals. Example: {{p, q}, {¬r}}.'],
  ['empty clause', '{}', 'a clause with no literals: never true. Example: nothing inside can be true.'],
  ['DNF', '', 'the reverse shape: ors of ands. Example: (a ∧ b) ∨ ¬a.'],
  ['De Morgan', '', 'the rules for pushing a ¬ inside brackets. Example: ¬(p ∨ q) becomes ¬p ∧ ¬q.'],
  ['INDO', '', 'four steps: Implications out, Negations in, Distribution, Operators out. Example: the recipe below.']
]) +
'<h2>Start with a shopping list</h2>' +
'<p>Formulas come in endless shapes: nested arrows, negations over brackets, ands inside ors. A program that has to handle all of them needs many special cases. If we could always rewrite a formula into one fixed, tidy shape, the program would only need to handle that one. Here is the shape, as a shopping list.</p>' +
'<p>Imagine a list of requirements: "buy milk OR juice", and also "buy bread OR rolls", and also "no butter".</p>' +
'<p>Look at one line, say "milk OR juice". It is made of simple items joined by or. Look at the list as a whole: every line must be satisfied, so the lines are joined by and.</p>' +
'<p>Each simple item, such as <i>milk</i> or <i>no butter</i>, is an atom or a negated atom. It is called a <b>literal</b>. Examples: p, ¬p.</p>' +
'<div class="tcard"><div class="tn">literal</div><div class="tr"><span class="tk">Example</span><span><span class="m">p</span> and <span class="m">¬p</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>A formula of the form p or ¬p, where p is an atom.</span></div></div>' +
'<p>Each line is an or-list of literals. It is called a <b>clause</b>, and we write it inside braces. For example {p, ¬q, r} means p ∨ ¬q ∨ r.</p>' +
'<div class="tcard"><div class="tn">clause</div><div class="tr"><span class="tk">Example</span><span><span class="m">{p, ¬q, r}</span> stands for <span class="m">p ∨ ¬q ∨ r</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>A finite set of literals, read as their disjunction; it is true under i iff at least one of its literals is true under i.</span></div></div>' +
'<p>Logic has words for the two kinds of join. A formula made of ors is a disjunction and one made of ands is a conjunction: <b>disjunction / conjunction</b> are the or-version and the and-version, p ∨ q / p ∧ q. So a clause is a disjunction of literals.</p>' +
'<div class="tcard"><div class="tn">disjunction / conjunction</div><div class="tr"><span class="tk">Example</span><span><span class="m">p ∨ q</span> is a disjunction; <span class="m">p ∧ q</span> is a conjunction.</span></div><div class="tr"><span class="tk">Formal</span><span>A disjunction is φ₁ ∨ … ∨ φₙ, true iff some φₖ is true; a conjunction is φ₁ ∧ … ∧ φₙ, true iff every φₖ is true.</span></div></div>' +
'<p>The whole shopping list is a big "and" of lines, each line an "or" of simple items. In other words, a conjunction of clauses. This shape is called <b>CNF</b>.</p>' +
'<div class="tcard"><div class="tn">CNF</div><div class="tr"><span class="tk">Example</span><span><span class="m">(p ∨ q) ∧ ¬r</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>Conjunctive normal form: a conjunction of clauses, i.e. a conjunction of disjunctions of literals.</span></div></div>' +
'<p>Since order and repeats do not matter on a shopping list, we may write the same CNF as a set of sets of literals: for example {{p, q}, {¬r}}. That is its <b>clausal form</b>.</p>' +
'<div class="tcard"><div class="tn">clausal form</div><div class="tr"><span class="tk">Example</span><span><span class="m">(p ∨ q) ∧ ¬r</span> becomes <span class="m">{{p, q}, {¬r}}</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>A CNF formula written as a set of clauses, each clause a set of literals; the set is true iff every clause is true.</span></div></div>' +
'<p>One odd case: what if a line has no items at all? A requirement "buy one of these" with nothing listed can never be met, because there is nothing to pick. That line is the <b>empty clause</b>, written {}: an empty disjunction, never true, so unsatisfiable.</p>' +
'<div class="tcard"><div class="tn">empty clause</div><div class="tr"><span class="tk">Example</span><span><span class="m">{}</span> is false under every assignment, so <span class="m">{{p}, {¬p}}</span> with {} added stays unsatisfiable.</span></div><div class="tr"><span class="tk">Formal</span><span>The clause containing no literals, {}; as an empty disjunction it is false under every assignment.</span></div></div>' +
'<p>Being sets, clauses ignore duplicates and order: <span class="m">a ∨ a ≡ a</span>.</p>' +
'<p>Now sort some formulas by asking: is it a list of lines joined by and, each line made only of literals joined by or? The reverse shape, ors of ands, is called DNF.</p>' +
'<table><tr><th>Formula</th><th>CNF?</th><th>Clausal form</th></tr><tr><td class="m">a ∧ ¬b ∧ (¬a ∨ b)</td><td><span class="tag ok">yes</span></td><td class="m">{{a}, {¬b}, {¬a, b}}</td></tr><tr><td class="m">¬¬a</td><td><span class="tag bad">no</span></td><td>none yet</td></tr><tr><td class="m">a → b</td><td><span class="tag bad">no</span></td><td>none yet</td></tr><tr><td class="m">(a ∧ b) ∨ ¬a</td><td><span class="tag bad">no</span> (a DNF shape)</td><td>none yet</td></tr></table>' +
'<h2>The four steps: INDO</h2>' +
'<p>Most formulas are not in CNF yet. We need a fixed recipe that turns any formula into clausal form without changing its meaning. The recipe has four steps, named by their first letters: <b>INDO</b>.</p>' +
'<div class="tcard"><div class="tn">INDO</div><div class="tr"><span class="tk">Example</span><span><span class="m">p → q</span> becomes <span class="m">¬p ∨ q</span> at step I, which is already the clause <span class="m">{¬p, q}</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>The conversion to clausal form in four equivalence-preserving steps: Implications out, Negations in, Distribution of ∨ over ∧, Operators out (to sets).</span></div></div>' +
'<div class="flow">' +
'<div class="fs"><b>I: Implications out</b><span class="m">φ → ψ  becomes  ¬φ ∨ ψ</span></div>' +
'<div class="fs"><b>N: Negations in</b><span>push ¬ down to the atoms (double negation, De Morgan)</span></div>' +
'<div class="fs"><b>D: Distribution</b><span class="m">φ ∨ (ψ ∧ χ) ≡ (φ ∨ ψ) ∧ (φ ∨ χ)</span><span>until a conjunction of disjunctions</span></div>' +
'<div class="fs"><b>O: Operators out</b><span>each conjunct is a clause; each disjunction is the set of its literals</span></div>' +
'</div>' +
'<div class="callout example"><b class="t">EXAMPLE FROM THE LECTURE</b><p>Convert <span class="m">(p → q) → (q → r)</span>.</p>' +
'<p>Step I: replace each → by "not left, or right", inside and out.</p>' +
'<div class="chain"><span>I</span><i>→</i><span>¬(¬p ∨ q) ∨ (¬q ∨ r)</span></div>' +
'<p>Step N: De Morgan turns ¬(¬p ∨ q) into ¬¬p ∧ ¬q, and double negation turns ¬¬p into p.</p>' +
'<div class="chain"><span>N</span><i>→</i><span>(p ∧ ¬q) ∨ (¬q ∨ r)</span></div>' +
'<p>Step D: spread the or over the and, so the first part becomes two or-lists.</p>' +
'<div class="chain"><span>D</span><i>→</i><span>(p ∨ ¬q ∨ r) ∧ (¬q ∨ ¬q ∨ r)</span></div>' +
'<p>Step O: each side of the and is one clause, and a clause is the set of its literals.</p>' +
'<div class="chain"><span>O</span><i>→</i><span>{{p, ¬q, r}, {¬q, r}}</span></div>' +
'<p>The repeated ¬q collapses.</p></div>' +
'<h2>Try it</h2>' +
'<p>Type a formula, or click a preset, and step through I, N, D, O. Compare each line with the worked example above.</p>' +
'<div class="callout example"><b class="t">FROM THE STANFORD BOOK §6.2</b><p>Convert <span class="m">¬(g ∧ (r → f))</span>. Every step does something here.</p>' +
'<table><tr><th>Step</th><th>Result</th></tr>' +
'<tr><td>start</td><td class="m">¬(g ∧ (r → f))</td></tr>' +
'<tr><td>I</td><td class="m">¬(g ∧ (¬r ∨ f))</td></tr>' +
'<tr><td>N (De Morgan)</td><td class="m">¬g ∨ ¬(¬r ∨ f)</td></tr>' +
'<tr><td>N (De Morgan)</td><td class="m">¬g ∨ (¬¬r ∧ ¬f)</td></tr>' +
'<tr><td>N (double ¬)</td><td class="m">¬g ∨ (r ∧ ¬f)</td></tr>' +
'<tr><td>D</td><td class="m">(¬g ∨ r) ∧ (¬g ∨ ¬f)</td></tr>' +
'<tr><td>O</td><td class="m">{¬g, r}, {¬g, ¬f}</td></tr></table>' +
'<p>Without the leading ¬, <span class="m">g ∧ (r → f)</span> gives <span class="m">{g}, {¬r, f}</span>. One ¬ changes the clauses completely. Both are presets below.</p></div>' +
'{{w:cnf|{"title":"INDO CONVERTER","mode":"prop","formula":"(p -> q) -> (q -> r)","presets":["~(g & (r -> f))","g & (r -> f)","(p -> q) <-> r","~(a & b) | c","p | (q & r)"]}}}' +
'<p>A knowledge base converts to the union of the clausal forms of its sentences.</p>' +
'<p>For Δ = {p, p → q, (p → q) → (q → r)}: <span class="m">{{p}, {¬p, q}, {p, ¬q, r}, {¬q, r}}</span>.</p>' +
'<div class="vs"><div class="good"><h4>STEP D</h4><p>Distribute ∨ over ∧.</p></div><div class="bad"><h4>PITFALL</h4><p>Never ∧ over ∨: that produces DNF.</p></div></div>' +
'<p>After step N, ¬ may only sit directly on atoms.</p>',
      quiz: [
        { q: 'Clausal form of a ∧ (b → c)?', o: [
          ok('{{a}, {¬b, c}}', 'b → c becomes ¬b ∨ c; the ∧ splits into two clauses.'),
          no('{{a, ¬b, c}}', 'That is a ∨ ¬b ∨ c, a single clause with a different meaning.'),
          no('{{a}, {b, c}}', 'The implication must become ¬b ∨ c, not b ∨ c.')] },
        { q: 'What is the value of the empty clause {} under any assignment?', o: [
          ok('False', 'A clause is true when some literal is true; with no literals that is impossible.'),
          no('True', 'It is the empty disjunction, not the empty conjunction.'),
          no('Depends on the assignment', 'It has no atoms, so nothing can change.')] },
        { q: 'Which formula is in CNF?', o: [
          ok('(p ∨ q) ∧ ¬r', 'A conjunction of the clauses {p, q} and {¬r}.'),
          no('(p ∧ q) ∨ r', 'A disjunction containing a conjunction: not CNF.'),
          no('¬(p ∨ q)', 'The negation sits on a compound formula.')] }
      ] },

    { n: 9, title: 'The resolution rule', sub: 'Cancel a literal against its negation.',
      html: '' +
'<p class="lead">If two or-lists share an item and its opposite, can we cancel them and get a new, shorter list?</p>' +
'<p>From step 8 you know: a literal is an atom or negated atom, a clause is an or-list of literals written in braces, and {} is the empty clause, which is never true.</p>' +
words([
  ['complementary literals', '', 'a literal and its negation. Example: q and ¬q.'],
  ['χ', 'chi', 'a placeholder for one literal, used in the general rule. Example: χ could be q.'],
  ['φ₁, …, φₘ and ψ₁, …, ψₙ', '', 'the other literals in the first and second clause. Example: {p, q} has φ₁ = p besides q.'],
  ['resolution', '', 'a rule that cancels one complementary pair across two clauses. Example: {p, q} and {¬q, r} give {p, r}.'],
  ['resolvent', '', 'the clause that comes out of one resolution step. Example: {p, r} above.'],
  ['derivation', '', 'a list of clauses where each is given or is a resolvent of two earlier ones. Example: the chain below.'],
  ['sound', '', 'never gives a false conclusion (step 6). Example: if the inputs hold, so does the resolvent.']
]) +
'<h2>Start with two statements</h2>' +
'<p>Statement A: "The bus is late, or I walk." Statement B: "The bus is not late, or I am tired".</p>' +
'<p>Both are or-lists, so in step 8 they would be clauses. Can we squeeze a new fact out of them without a truth table? Walk through the two cases. Either the bus is late or it is not.</p>' +
'<p>If it is late, B tells us I am tired. If it is not, A tells us I walk.</p>' +
'<p>Whichever case holds, "I walk or I am tired" is true. Notice what happened: "late" appeared in one statement and "not late" in the other, and they cancelled each other. We kept the rest.</p>' +
'<p>A literal and its negation, such as "late" and "not late", or q and ¬q, are called <b>complementary literals</b>.</p>' +
'<div class="tcard"><div class="tn">complementary literals</div><div class="tr"><span class="tk">Example</span><span><span class="m">q</span> and <span class="m">¬q</span>; "late" and "not late".</span></div><div class="tr"><span class="tk">Formal</span><span>Two literals p and ¬p for an atom p.</span></div></div>' +
'<p>Cancelling one complementary pair across two clauses and keeping everything else is the <b>resolution</b> rule.</p>' +
'<div class="tcard"><div class="tn">resolution</div><div class="tr"><span class="tk">Example</span><span><span class="m">{p, q}</span> and <span class="m">{¬q, r}</span> give <span class="m">{p, r}</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>From clauses C₁ ∪ {p} and C₂ ∪ {¬p}, infer C₁ ∪ C₂, where p is an atom and C₁, C₂ are sets of literals.</span></div></div>' +
'<p>To write it in general we need names for the pieces. χ (chi) is a placeholder for the one literal being cancelled. The names φ₁, …, φₘ and ψ₁, …, ψₙ stand for the other literals in the first and the second clause.</p>' +
'<div class="big">{φ₁, …, χ, …, φₘ} and {ψ₁, …, ¬χ, …, ψₙ}  give  {φ₁, …, φₘ, ψ₁, …, ψₙ}<small>the resolvent is everything else from both clauses</small></div>' +
'<p>The new clause that comes out of one resolution step is called the <b>resolvent</b>. In the bus story it is "I walk or I am tired".</p>' +
'<div class="tcard"><div class="tn">resolvent</div><div class="tr"><span class="tk">Example</span><span>Resolvent of <span class="m">{p, q}</span> and <span class="m">{¬q, r}</span> on q: <span class="m">{p, r}</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>The clause C₁ ∪ C₂ obtained by one resolution step on a complementary pair p, ¬p.</span></div></div>' +
'<h2>Why it is sound</h2>' +
'<p>Can this rule ever produce something false from true inputs? In any model, χ is true or false.</p>' +
'<div class="vs"><div class="good"><h4>χ TRUE</h4><p>¬χ is false, so the second clause is satisfied by one of the ψ.</p></div><div class="bad"><h4>χ FALSE</h4><p>The first clause is satisfied by one of the φ.</p></div></div>' +
'<p>Either way one of the remaining literals is true.</p>' +
'<div class="callout example"><b class="t">EXAMPLES</b>' +
'<p>Cancel q against ¬q, keep p and r:</p>' +
'<div class="chain"><span>{p, q}</span><i>+</i><span>{¬q, r}</span><i>→</i><span>{p, r}</span></div>' +
'<p>Cancel p against ¬p, nothing is left, so the result is the empty clause:</p>' +
'<div class="chain"><span>{p}</span><i>+</i><span>{¬p}</span><i>→</i><span>{}</span></div>' +
'<p><b>Modus ponens is a special case:</b> <span class="m">q → r</span> is the clause <span class="m">{¬q, r}</span>; with <span class="m">{q}</span> it resolves to <span class="m">{r}</span>.</p></div>' +
'<h2>Try it: a derivation</h2>' +
'<p>One step rarely reaches the clause you want, so we chain steps, reusing earlier results as new inputs. A list of clauses where each line is given or is a resolvent of two earlier lines is called a <b>resolution derivation</b>. A derivation of C from clauses Δ is such a list ending in C.</p>' +
'<div class="tcard"><div class="tn">resolution derivation</div><div class="tr"><span class="tk">Example</span><span><span class="m">{¬p, r}, {p, q} ⟹ {q, r}</span>, then with <span class="m">{¬q, r}</span> ⟹ <span class="m">{r}</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>A derivation of C from a set of clauses Δ is a finite sequence of clauses ending in C, each a member of Δ or a resolvent of two earlier clauses.</span></div></div>' +
'<p>Premises: p → r, q → r, p ∨ q. In the tool, click a literal such as p, then click its negation ¬p in another clause. The new clause appears. Keep going until {r} appears.</p>' +
'{{w:refute|{"title":"RESOLVE BY CLICKING","mode":"prop","premises":["p -> r","q -> r","p | q"],"stop":"r"}}}' +
'<p>One path from the lecture:</p>' +
'<div class="chain"><span>{¬p, r} + {p, q} on p</span><i>→</i><span>{q, r}</span><i>→</i><span>{¬q, r} + {q, r} on q</span><i>→</i><span>{r}</span></div>' +
'<p>In each step the words "on p" or "on q" name the literal that was cancelled.</p>' +
'<div class="callout warn"><b class="t">LIMIT OF DERIVATIONS</b><p>Resolution <i>derivations</i> are sound but not complete.</p><p><span class="m">a ∨ ¬a</span> is entailed by the empty knowledge base, but with no clauses you cannot derive <span class="m">{a, ¬a}</span>.</p><p>The next step fixes this with refutation.</p></div>',
      quiz: [
        { q: 'Resolvent of {a, b} and {¬b, ¬c}?', o: [
          ok('{a, ¬c}', 'Cancel b against ¬b and keep the rest.'),
          no('{a, b, ¬b, ¬c}', 'That is just the union; the complementary pair must be removed.'),
          no('{}', 'The empty clause needs two unit clauses {x} and {¬x}.')] },
        { q: 'Resolving {p} with {¬p} gives', o: [
          ok('the empty clause', 'Nothing is left after cancelling p and ¬p; the result is a contradiction.'),
          no('{p, ¬p}', 'The complementary pair is removed, not kept.'),
          no('nothing, the rule does not apply', 'It applies: p and ¬p are complementary.')] },
        { q: 'You may cancel two complementary pairs in one step, for example resolving {a, b} with {¬a, ¬b} to get {}.', o: [
          ok('False: the result {} would be wrong', 'Resolution removes only one complementary pair per step. {a,b} and {¬a,¬b} are satisfiable (a true, b false), yet {} is unsatisfiable. Resolving on a gives {b, ¬b}.'),
          no('True', 'This would make the rule unsound.'),
          no('True, but only for propositional logic', 'It is unsound in every version.')] }
      ] },

    { n: 10, title: 'Resolution proofs by refutation', sub: 'Prove a goal by showing its negation is contradictory.',
      html: '' +
'<p class="lead">How can resolution prove a sentence is true, when it can only cancel literals and never invent new truths from nothing?</p>' +
'<p>From earlier steps you know: Δ ⊨ φ means φ follows from Δ (step 5); the Unsatisfiability Theorem says Δ ⊨ φ exactly when Δ ∪ {¬φ} is unsatisfiable (step 5); INDO converts sentences to clauses (step 8); resolution cancels a literal against its negation (step 9).</p>' +
words([
  ['refutation', '', 'proving something by showing its opposite leads to a contradiction. Example: assume the butler is innocent, find a clash.'],
  ['negated goal', '¬φ', 'the goal sentence with a not in front. Example: goal r gives negated goal ¬r.'],
  ['empty clause', '{}', 'the clause with no literals; reaching it means a contradiction. Example: {r} + {¬r} gives {}.'],
  ['clausal(Δ ∪ {¬φ})', '', 'the clauses of Δ together with the clause for ¬φ. Example: {p}, {¬p, q}, {¬q}.'],
  ['resolution proof', '', 'a derivation of {} from the clauses of the premises and the negated goal. Example: the chain below.'],
  ['argument', '', 'a conclusion together with the reasons that lead to it. Example: a proof of r from Δ.'],
  ['strict rule', '', 'a rule with no exceptions: true premises always give a true conclusion. Example: modus ponens.'],
  ['defeasible rule', '', 'a rule that can be overridden by exceptions. Example: "birds usually fly".']
]) +
'<h2>Start with a detective</h2>' +
'<p>A detective wants to prove the butler did it. She says: "Suppose he did not do it. Then the facts I already have clash with each other."</p>' +
'<p>The clash shows the supposition was impossible, so the butler did it. Notice she never argued for the butler directly. She attacked the opposite and showed it cannot hold. Proving a claim by showing its opposite cannot hold is called <b>refutation</b>.</p>' +
'<div class="tcard"><div class="tn">refutation</div><div class="tr"><span class="tk">Example</span><span>To prove <span class="m">r</span>, assume <span class="m">¬r</span> and derive a contradiction.</span></div><div class="tr"><span class="tk">Formal</span><span>Proving φ from Δ by showing that Δ ∪ {¬φ} is unsatisfiable (in resolution: deriving the empty clause).</span></div></div>' +
'<p>Is that legitimate in logic? Yes: the Unsatisfiability Theorem says it is exactly right.</p>' +
'<p>Resolution suits this well, because it cancels literals and never builds new truths from nothing. So what does a clash look like in clauses? Resolve {p} with {¬p} and nothing is left. A clause with no literals, written {}, is never true. Reaching it is the clash, and it is called the <b>empty clause</b>.</p>' +
'<div class="big">To prove φ, add ¬φ to the premises and derive the empty clause.<small>reaching {} means a contradiction, so φ follows</small></div>' +
'<p>Putting the detective and the derivation together gives the name: a <b>resolution proof</b> of φ from Δ is a resolution derivation of the <b>empty clause</b> from the clausal form of <span class="m">Δ ∪ {¬φ}</span>.</p>' +
'<div class="big">Δ ⊨ φ  ⟺  {} is derivable from clausal(Δ ∪ {¬φ})</div>' +
'<div class="tcard"><div class="tn">resolution proof</div><div class="tr"><span class="tk">Example</span><span>Δ = {p, p → q, (p → q) → (q → r)}, goal r: {p}, {¬p, q}, {¬q, r}, {¬r} derive {} in three steps.</span></div><div class="tr"><span class="tk">Formal</span><span>A resolution proof of φ from Δ is a resolution derivation of {} from clausal(Δ ∪ {¬φ}).</span></div></div>' +
'<div class="callout idea"><b class="t">RECIPE</b>' +
'<div class="flow"><div class="fs"><b>Collect</b><span>premises and the negated goal ¬φ</span></div><div class="fs"><b>Convert</b><span>every sentence to clauses with INDO</span></div><div class="fs"><b>Resolve until {}</b><span>reached: φ follows. Clauses run out: φ does not follow</span></div></div></div>' +
'<div class="callout example"><b class="t">EXAMPLE FROM THE LECTURE</b><p>Prove r from {p, p → q, (p → q) → (q → r)}.</p>' +
'<p>First convert. The goal is r, so the negated goal is ¬r, the clause {¬r}.</p>' +
'<div class="cards"><div class="card"><h3>Clauses of Δ</h3><p class="m">{p}, {¬p, q}, {p, ¬q, r}, {¬q, r}</p></div><div class="card"><h3>Negated goal</h3><p class="m">{¬r}</p></div></div>' +
'<p>Now resolve, one step at a time:</p>' +
'<div class="chain"><span>{p} + {¬p, q}</span><i>→</i><span>{q}</span><i>→</i><span>{¬q, r} + {q}</span><i>→</i><span>{r}</span><i>→</i><span>{r} + {¬r}</span><i>→</i><span>{}</span></div>' +
'<p>{p} and {¬p, q} cancel p and leave {q}. {q} and {¬q, r} cancel q and leave {r}. {r} and {¬r} cancel r and leave {}.</p>' +
'<p>We reached {}, so r follows.</p></div>' +
'<h2>Try it</h2>' +
'<p>Click two complementary literals to resolve by hand, or press "Show a proof for me".</p>' +
'<p>Then click the preset "not entailed", where the goal is <code>s</code>. Look for the message that no refutation exists: the clauses run out before {} appears.</p>' +
'{{w:refute|{"title":"REFUTATION WORKBENCH","mode":"prop","premises":["p","p -> q","(p -> q) -> (q -> r)"],"goal":"r","presets":[{"label":"lecture example","premises":["p","p -> q","(p -> q) -> (q -> r)"],"goal":"r"},{"label":"valid with no premises: a ∨ ¬a","premises":[],"goal":"a | ~a"},{"label":"not entailed","premises":["p","p -> q"],"goal":"s"},{"label":"cases: p∨q, p→r, q→r","premises":["p | q","p -> r","q -> r"],"goal":"r"}]}}}' +
'<p>Refutation also handles valid sentences with an empty premise set: ¬(a ∨ ¬a) has clausal form {{¬a}, {a}}, and those two clauses resolve to {} at once.</p>' +
'<div class="callout idea"><b class="t">THEOREM</b><p>Resolution is sound and complete as a refutation system: <span class="m">Δ ⊨ φ</span> if and only if there is a resolution proof of φ from Δ.</p></div>' +
'<div class="callout example"><b class="t">FROM THE STANFORD BOOK §6.4: A SET WITH NO MODEL</b><p>No goal this time: show that the four clauses <span class="m">{p, q}, {p, ¬q}, {¬p, q}, {¬p, ¬q}</span> are unsatisfiable. Each clause rules out one of the four rows of (p, q), so no row survives.</p>' +
'<table><tr><th>#</th><th>Clause</th><th>Why</th></tr>' +
'<tr><td>1</td><td class="m">{p, q}</td><td>Premise</td></tr>' +
'<tr><td>2</td><td class="m">{p, ¬q}</td><td>Premise</td></tr>' +
'<tr><td>3</td><td class="m">{¬p, q}</td><td>Premise</td></tr>' +
'<tr><td>4</td><td class="m">{¬p, ¬q}</td><td>Premise</td></tr>' +
'<tr><td>5</td><td class="m">{p}</td><td>1, 2 (on q)</td></tr>' +
'<tr><td>6</td><td class="m">{¬p}</td><td>3, 4 (on q)</td></tr>' +
'<tr><td>7</td><td class="m">{ }</td><td>5, 6 (on p)</td></tr></table>' +
'<p>The book also does the workbench example above. In clause form, <span class="m">(p → q) → (q → r)</span> becomes two clauses, <span class="m">{p, ¬q, r}</span> and <span class="m">{¬q, r}</span>. Resolving <span class="m">{p}</span> with <span class="m">{¬p, q}</span> gives <span class="m">{q}</span>, then <span class="m">{q}</span> with <span class="m">{¬q, r}</span> gives <span class="m">{r}</span>, then <span class="m">{r}</span> with the negated goal <span class="m">{¬r}</span> gives <span class="m">{ }</span>.</p></div>' +
'<h2>Proofs as arguments</h2>' +
'<p>The midterm treated reasoning differently: as an exchange of arguments. Our detective also gave one. A conclusion together with the reasons that lead to it is called an <b>argument</b>.</p>' +
'<div class="tcard"><div class="tn">argument</div><div class="tr"><span class="tk">Example</span><span>Conclusion <span class="m">r</span> with the proof lines from Δ that lead to it.</span></div><div class="tr"><span class="tk">Formal</span><span>A pair of a conclusion and the premises and rule applications that support it; here a proof, with axioms Δ, the rules R, and no exceptions or preferences.</span></div></div>' +
'<p>A proof reads as a deductive argument: conclusion φ, premises the part of Δ the proof uses, each step a <b>strict rule</b>. A strict rule has no exceptions: true premises always give a true conclusion, like modus ponens. A rule that can be overridden, like "birds usually fly", is a <b>defeasible rule</b>, and proofs here use none.</p>' +
'<div class="tcard"><div class="tn">strict rule</div><div class="tr"><span class="tk">Example</span><span>Modus ponens: from <span class="m">p → q</span> and <span class="m">p</span>, always <span class="m">q</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>A rule whose conclusion is true in every model in which all its premises are true; it admits no exceptions.</span></div></div>' +
'<div class="tcard"><div class="tn">defeasible rule</div><div class="tr"><span class="tk">Example</span><span>"Birds usually fly": it holds unless an exception, such as a penguin, applies.</span></div><div class="tr"><span class="tk">Formal</span><span>A rule whose conclusion is only presumed when its premises hold, and which may be defeated by a conflicting argument.</span></div></div>' +
'<div class="chain"><span>(Δ, R, ∅, ∅)</span><i>=</i><span>axioms Δ</span><i>+</i><span>strict rules R</span><i>+</i><span>no defeasible rules</span><i>+</i><span>no preferences</span></div>' +
'<p>Read the four slots in order: given facts Δ, strict rules R, then two empty slots for exception-style rules and for preferences between rules.</p>' +
'<p>Because all rules are strict, true premises force a true conclusion.</p>' +
'<details class="more"><summary>Link to the midterm</summary><p>In a Dung-style framework an argument is an opaque node in a graph. Here it is a proof with inner structure.</p></details>' +
'<div class="callout warn"><b class="t">COMMON PITFALLS</b>' +
'<div class="cards">' +
'<div class="card"><h3>1. Two symbols</h3><p>⊨ is semantic entailment (about models), ⊢ is provability (about proofs). Soundness and completeness say they coincide.</p></div>' +
'<div class="card"><h3>2. Derivation vs proof</h3><p>A resolution <i>derivation</i> of φ is not a resolution <i>proof</i> of φ; the proof refutes ¬φ.</p></div>' +
'<div class="card"><h3>3. Inconsistent Δ</h3><p>It entails everything: vacuous, not a bug.</p></div>' +
'</div></div>',
      quiz: [
        { q: 'To prove r from Δ by resolution, which clauses do you start from?', o: [
          ok('clausal(Δ) plus {¬r}', 'The negated goal joins the premises, and you look for {}.'),
          no('clausal(Δ) plus {r}', 'Adding r cannot reveal a contradiction that proves r.'),
          no('only clausal(Δ)', 'Δ alone may be satisfiable; the contradiction appears only after adding ¬φ.')] },
        { q: 'Resolution runs out of new clauses without deriving {}. For Δ and goal φ, this means', o: [
          ok('Δ does not entail φ', 'By completeness, an entailed goal would produce {}. Δ ∪ {¬φ} is satisfiable.'),
          no('Δ entails φ but the proof is long', 'Completeness says the empty clause is reachable in finitely many steps.'),
          no('the clausal conversion was wrong', 'Not necessarily; the search is exhausted.')] },
        { q: 'Why can resolution not directly derive a ∨ ¬a from no premises?', o: [
          ok('There are no clauses to start from, so derivations cannot generate new truths', 'Refutation fixes this by starting from the clauses of ¬(a ∨ ¬a).'),
          no('a ∨ ¬a is not entailed by the empty set', 'It is valid, so every Δ entails it.'),
          no('the rule is unsound', 'It is sound; the issue is generating clauses from nothing.')] }
      ] }
  ] });
})();
