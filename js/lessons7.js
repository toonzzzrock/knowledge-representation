/* Module 7 lessons: predicate logic with Herbrand semantics and resolution. */
(function () {
  var ok = function (t, why) { return { t: t, ok: true, why: why }; };
  var no = function (t, why) { return { t: t, ok: false, why: why }; };
  /* glossary block: items are [term, symbol or '', plain meaning with a tiny example] */
  var G = function (items) {
    var line = function (i) { return '<b>' + i[0] + '</b>' + (i[1] ? ' (<span class="m">' + i[1] + '</span>)' : '') + ' : ' + i[2]; };
    var h = items.length > 4
      ? '<div class="cards">' + items.map(function (i) { return '<div class="card"><p>' + line(i) + '</p></div>'; }).join('') + '</div>'
      : items.map(function (i) { return '<p>' + line(i) + '</p>'; }).join('');
    return '<div class="callout idea"><b class="t">WORDS AND SYMBOLS YOU NEED</b>' + h + '</div>';
  };
  var TIP = '<p>In the tool, type <code>forall</code> for ∀, <code>exists</code> for ∃, <code>-></code> for →, <code>~</code> for ¬, <code>&amp;</code> for ∧ and <code>|</code> for ∨.</p>';

  UI.addModule({ id: 7, title: 'Predicate logic and resolution', lessons: [

    { n: 1, title: 'Why predicate logic?', sub: 'One general rule instead of one per pair.',
      html: '' +
'<p class="lead">You know 30 classmates and want to say "if one person knows another, the other knows them back". Must you write 900 separate sentences?</p>' +
G([
  ['predicate', 'knows(x,y)', 'a named relationship between things; <span class="m">likes(ann,bob)</span> says Ann likes Bob'],
  ['argument', '', 'one thing placed inside the brackets of a predicate; knows(x,y) has two arguments'],
  ['object constant', 'jack', 'a name for one specific thing; jack, jill, or the number 0'],
  ['variable', 'x', 'a stand-in for some thing we have not named; x can mean any person'],
  ['for all', '∀', 'the claim holds for every thing; ∀x. happy(x) says everybody is happy'],
  ['there is at least one', '∃', 'the claim holds for some thing; ∃x. happy(x) says somebody is happy'],
  ['connectives', '¬ ∧ ∨ → ↔', 'from module 5: not, and, or, if-then, if-and-only-if; A → B says if A then B'],
  ['strictly inside', '⊊', 'a set that fits inside another and is smaller; {1,2} ⊊ {1,2,3}'],
  ['expressive', '', 'able to say more; a language that can state rules the other cannot']
]) +
'<p>From module 5 you know atoms: fixed statements such as JackKnowsJill that are true or false, joined by connectives.</p>' +
'<h2>A class roster</h2>' +
'<p>Take a roster of 30 students and the rule: if student A knows student B, then B knows A.</p>' +
'<p>With atoms you need one sentence per ordered pair of students. That is 30 × 30 = 900 sentences.</p>' +
'<p>With a variable (a stand-in for a student) you say it once: "for any two students, if the first knows the second, the second knows the first".</p>' +
'<div class="vs"><div class="bad"><h4>PROPOSITIONAL</h4><p>"If one person knows another then the second knows the first; Jack knows Jill."</p><p class="m">JackKnowsJill → JillKnowsJack</p><p class="m">AliceKnowsBob → BobKnowsAlice</p><p>... and so on, n² atoms for n people.</p></div>' +
'<div class="good"><h4>WITH VARIABLES</h4><div class="big">∀x. ∀y. (knows(x,y) → knows(y,x))<small>read: for all x, for all y, if x knows y then y knows x. One sentence for every pair.</small></div></div></div>' +
'<h2>What is new</h2>' +
'<p>The one-sentence version uses a few pieces that atoms did not have. Look at it again and ask what each piece is doing.</p>' +
'<h3>Saying who relates to whom</h3>' +
'<p>The atom JackKnowsJill is one sealed statement. It hides that two people are involved. What we want is a statement with slots for the people, like a form with blanks: "___ knows ___".</p>' +
'<p>Fill the blanks with jack and jill and you get a claim that is true or false. A named relationship between things, with blanks to fill, is called a <b>predicate</b>. We write knows(x,y) for "x knows y", and likes(ann,bob) says Ann likes Bob.</p>' +
'<div class="tcard"><div class="tn">predicate</div><div class="tr"><span class="tk">Example</span><span><span class="m">knows(x,y)</span>, <span class="m">likes(ann,bob)</span>, <span class="m">happy(x)</span></span></div><div class="tr"><span class="tk">Formal</span><span>A predicate (relation constant) is a symbol p of fixed arity n that, applied to n terms, forms an atomic sentence <span class="m">p(t₁,…,tₙ)</span>.</span></div></div>' +
'<p>The things that fill the blanks, inside the brackets, are the <b>arguments</b>. knows has two arguments.</p>' +
'<div class="tcard"><div class="tn">argument</div><div class="tr"><span class="tk">Example</span><span>In <span class="m">knows(jack,jill)</span> the arguments are <span class="m">jack</span> and <span class="m">jill</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>The arguments of <span class="m">p(t₁,…,tₙ)</span> are the terms t₁,…,tₙ, one per argument place of p.</span></div></div>' +
'<h3>Naming one thing, or any thing</h3>' +
'<p>Two kinds of name can fill a blank. The first is a pointer to one particular thing: jack, jill, or the number 0. A name for one specific thing is called an <b>object constant</b>.</p>' +
'<div class="tcard"><div class="tn">object constant</div><div class="tr"><span class="tk">Example</span><span><span class="m">jack</span>, <span class="m">jill</span>, <span class="m">0</span></span></div><div class="tr"><span class="tk">Formal</span><span>An object constant is a symbol of the signature with arity 0; it is a term and names one fixed object.</span></div></div>' +
'<p>The second is a blank we deliberately leave open. In knows(x,y) we do not say who x or y is, so each can mean any person. Such a stand-in for a thing we have not named is called a <b>variable</b>.</p>' +
'<div class="tcard"><div class="tn">variable</div><div class="tr"><span class="tk">Example</span><span><span class="m">x</span> and <span class="m">y</span> in <span class="m">knows(x,y)</span></span></div><div class="tr"><span class="tk">Formal</span><span>A variable is a term that is not in the signature; it takes its value from a quantifier or a substitution.</span></div></div>' +
'<h3>How many people does the claim cover?</h3>' +
'<p>A variable alone does not finish the roster rule. Does it hold for every pair, or only for some pair? We need words for "everyone" and "someone". A symbol that says how many things a claim covers is called a <b>quantifier</b>.</p>' +
'<div class="tcard"><div class="tn">quantifier</div><div class="tr"><span class="tk">Example</span><span><span class="m">∀x. happy(x)</span> (everybody), <span class="m">∃x. happy(x)</span> (somebody)</span></div><div class="tr"><span class="tk">Formal</span><span>A quantifier is ∀ or ∃ applied to a variable x and a sentence φ, giving <span class="m">∀x.φ</span> or <span class="m">∃x.φ</span>.</span></div></div>' +
'<p>Compare two sentences about happy(x). "Everybody is happy" and "somebody is happy" differ only in how many people they cover.</p>' +
'<p><b>For all</b>, written ∀, means every thing: ∀x. happy(x) says everybody is happy. <b>There is at least one</b>, written ∃, means some thing: ∃x. happy(x) says somebody is happy.</p>' +
'<div class="tcard"><div class="tn">for all (∀)</div><div class="tr"><span class="tk">Example</span><span><span class="m">∀x. happy(x)</span>: everybody is happy</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">∀x.φ</span> is true iff φ is true for every value of x in the universe.</span></div></div>' +
'<div class="tcard"><div class="tn">there is at least one (∃)</div><div class="tr"><span class="tk">Example</span><span><span class="m">∃x. happy(x)</span>: somebody is happy</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">∃x.φ</span> is true iff φ is true for at least one value of x in the universe.</span></div></div>' +
'<h3>What stays the same</h3>' +
'<p>Nothing about gluing statements together has changed. The <b>connectives</b> ¬ ∧ ∨ → ↔ stay as in module 5: not, and, or, if-then, if-and-only-if. A → B says if A then B.</p>' +
'<div class="tcard"><div class="tn">connectives</div><div class="tr"><span class="tk">Example</span><span><span class="m">¬happy(x)</span>, <span class="m">knows(x,y) → knows(y,x)</span></span></div><div class="tr"><span class="tk">Formal</span><span>The connectives ¬, ∧, ∨, →, ↔ build a sentence from one or two sentences, with the same truth tables as in propositional logic.</span></div></div>' +
'<h2>More than propositional logic</h2>' +
'<p>Everything you could say with atoms, you can still say. Predicate logic keeps it all and adds more, much as a big toolbox contains the small one.</p>' +
'<p>To write this down, let L₂ stand for propositional logic and L₁ for predicate logic. We need a sign for "fits inside and is strictly smaller". Compare {1,2} and {1,2,3}: the first fits inside the second, and the second has something extra. A set that fits inside another and is smaller is read <b>strictly inside</b>, written ⊊, as {1,2} ⊊ {1,2,3}.</p>' +
'<div class="tcard"><div class="tn">strictly inside (⊊)</div><div class="tr"><span class="tk">Example</span><span><span class="m">{1,2} ⊊ {1,2,3}</span></span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">A ⊊ B</span> iff A ⊆ B and A ≠ B, that is, every element of A is in B and B has an element not in A.</span></div></div>' +
'<div class="big">L₂ ⊊ L₁<small>every sentence of L₂ is also a sentence of L₁, and L₁ has more.</small></div>' +
'<p>A proposition is a predicate with no arguments.</p>' +
'<p>A language that can say more than another is called <b>expressive</b> (or more expressive). Predicate logic is more expressive: it can state rules such as the roster rule in one sentence, which propositional logic cannot.</p>' +
'<div class="tcard"><div class="tn">expressive</div><div class="tr"><span class="tk">Example</span><span>The roster rule is one sentence in predicate logic, but needs 900 atom sentences in propositional logic.</span></div><div class="tr"><span class="tk">Formal</span><span>Language L₁ is more expressive than L₂ if everything statable in L₂ is statable in L₁ and something statable in L₁ is not statable in L₂.</span></div></div>' +
'<p>So predicate logic contains propositional logic and says strictly more.</p>' +
'<h2>See the blow-up</h2>' +
'<p>Drag the number of people up and watch how many implications propositional logic needs. One per ordered pair (skip self-pairs if you wish).</p>' +
'{{w:pairblow|{"title":"HOW MANY IMPLICATIONS DOES PROPOSITIONAL LOGIC NEED?"}}}' +
'<div class="callout remember"><b class="t">PLAN FOR THIS MODULE</b>' +
'<div class="flow"><div class="fs"><b>Syntax</b><span>steps 2, 3: how to write sentences</span></div><div class="fs"><b>Herbrand meaning</b><span>steps 4 to 6: when a sentence is true</span></div><div class="fs"><b>Links</b><span>propositional logic and Prolog, step 7</span></div><div class="fs"><b>Resolution</b><span>steps 8 to 11: clauses, unification, rule, refutation</span></div></div></div>',
      quiz: [
        { q: 'What does ∀x. ∀y. (knows(x,y) → knows(y,x)) replace in propositional logic?', o: [
          ok('One implication for every pair of people', 'Each pair needs its own atoms; the quantifiers cover all pairs at once.'),
          no('A single atom', 'A single atom cannot express a relationship between two people.'),
          no('Nothing, propositional logic can state it directly', 'It needs one sentence per pair.')] },
        { q: 'Which is new in predicate logic compared to propositional logic?', o: [
          ok('Variables and quantifiers', 'They allow general statements about objects.'),
          no('The connective →', 'Module 5 already had →.'),
          no('Truth values', 'Truth values are the same.')] }
      ] },

    { n: 2, title: 'Syntax: signatures, terms, sentences', sub: 'What counts as a name for an object, and what counts as a statement.',
      html: '' +
'<p class="lead">Which of these is a legal thing to write: "parent(ann, bob)" or "mother(parent(ann, bob))"?</p>' +
G([
  ['signature', 'Σ', 'the list of symbols you are allowed to use; {ann, bob, mother/1}'],
  ['arity', '', 'how many arguments a symbol takes; mother takes 1'],
  ['name/number', 'f/1', 'a symbol with its arity; g/2 takes two arguments'],
  ['unary, binary, ternary', '', 'takes one, two, three arguments; plus/3 is ternary'],
  ['function constant', 'f', 'a symbol that turns objects into an object; mother(ann) names a person'],
  ['relation constant (predicate)', 'p', 'a symbol that turns objects into a claim; parent(ann,bob) is true or false'],
  ['term', '', 'any expression that names an object; ann, mother(ann), x'],
  ['atomic sentence', 'p(t₁,…,tₙ)', 'a predicate applied to terms, also called a relational sentence; parent(ann,bob)'],
  ['0-ary predicate', 'p/0', 'a predicate with no arguments, just a plain true/false atom; rain']
]) +
'<p>In module 5 an atom like p was a sealed box: true or false, with nothing inside. That was fine for "it is raining", but useless for a family. We want to talk about Ann, about Ann\'s mother, and about who is whose parent. So we open the box and give atoms parts.</p>' +
'<h2>A family tree</h2>' +
'<p>Take a tiny family: two people, ann and bob. We also want two ways of talking about them: "the mother of someone", and "someone is a parent of someone".</p>' +
'<p>Look at these three expressions and ask of each one: could I point at it, or could I agree or disagree with it?</p>' +
'<table><tr><th>expression</th><th>what it is</th></tr>' +
'<tr><td class="m">mother(ann)</td><td>a person you could point at. Asking "is it true?" makes no sense.</td></tr>' +
'<tr><td class="m">parent(mother(ann), ann)</td><td>a claim. You can agree or disagree: it is true or false.</td></tr>' +
'<tr><td class="m">mother(parent(ann,bob))</td><td>nonsense. A claim has no mother.</td></tr></table>' +
'<p>The first kind, expressions that point at something, get their own word: an expression that points at an object is called a <b>term</b>. A plain name like ann is a term. So is mother(ann), and so is mother(mother(ann)): each still points at one person. A variable x is a term too; it points at someone we have not chosen yet.</p>' +
'<div class="tcard"><div class="tn">term</div><div class="tr"><span class="tk">Example</span><span><span class="m">ann</span>, <span class="m">x</span>, <span class="m">mother(ann)</span>, <span class="m">mother(mother(x))</span></span></div><div class="tr"><span class="tk">Formal</span><span>A term is an object constant, a variable, or <span class="m">f(t₁,…,tₙ)</span> where f is an n-ary function constant and t₁,…,tₙ are terms.</span></div></div>' +
'<p>The second kind, expressions you can agree or disagree with, are sentences, just as in module 5. The difference is that a sentence is now built out of terms.</p>' +
'<div class="callout remember"><b class="t">RULE OF THUMB</b><p>Functions give things. Predicates give claims. A predicate only takes things, never claims.</p></div>' +
'<h2>The signature: the vocabulary of one problem</h2>' +
'<p>Before writing anything about the family, we fix which words we are allowed to use: ann, bob, mother and parent. Think of it as the vocabulary list printed at the top of an exam question. Everything you write must use these words and nothing else.</p>' +
'<p>That list is the <b>signature</b>, written Σ. Variables such as x are not on it: they are free to use in any problem, like punctuation.</p>' +
'<div class="tcard"><div class="tn">signature</div><div class="tr"><span class="tk">Example</span><span class="m">Σ = {ann, bob, mother/1, parent/2}</span></div><div class="tr"><span class="tk">Formal</span><span>A signature Σ is a set of object constants, function constants and relation constants, each with its arity. Variables are not in Σ.</span></div></div>' +
'<p>A vocabulary list also has to say how each word is used. mother needs one person: mother(ann). parent needs two: parent(ann, bob). Writing parent(ann) is as broken as the sentence "Ann is a parent of". The number of slots a symbol needs is its <b>arity</b>.</p>' +
'<p>The lecture writes the arity after a slash, as name/number: mother/1, parent/2. Old Latin words name the small cases: a symbol is <b>unary, binary, ternary</b> when it has one, two, three slots. For example plus/3 is ternary: plus(x, y, z) reads "x plus y is z".</p>' +
'<div class="tcard"><div class="tn">arity</div><div class="tr"><span class="tk">Example</span><span><span class="m">mother/1</span>: unary, <span class="m">parent/2</span>: binary, <span class="m">plus/3</span>: ternary, <span class="m">ann</span>: arity 0</span></div><div class="tr"><span class="tk">Formal</span><span>The arity of a symbol is the fixed number n of arguments it takes, written <span class="m">name/n</span>. Every use must have exactly n arguments.</span></div></div>' +
'<h2>Three kinds of symbol</h2>' +
'<p>Sort the family words by what they produce.</p>' +
'<ul><li>ann and bob take no slots and simply name a person. They are object constants, with arity 0.</li>' +
'<li>mother takes a person and gives back a person. A symbol that turns objects into an object is a <b>function constant</b>. Function constants are how we build longer terms.</li>' +
'<li>parent takes two people and gives back a claim. A symbol that turns objects into a claim is a <b>relation constant</b>, usually called a predicate. Predicates are how we build sentences.</li></ul>' +
'<div class="tcard"><div class="tn">function constant</div><div class="tr"><span class="tk">Example</span><span><span class="m">mother/1</span>: <span class="m">mother(ann)</span> is a term</span></div><div class="tr"><span class="tk">Formal</span><span>An n-ary function constant f with terms t₁,…,tₙ forms the term <span class="m">f(t₁,…,tₙ)</span>.</span></div></div>' +
'<div class="tcard"><div class="tn">relation constant (predicate)</div><div class="tr"><span class="tk">Example</span><span><span class="m">parent/2</span>: <span class="m">parent(ann, bob)</span> is a sentence</span></div><div class="tr"><span class="tk">Formal</span><span>An n-ary relation constant p with terms t₁,…,tₙ forms the atomic sentence <span class="m">p(t₁,…,tₙ)</span>.</span></div></div>' +
'<div class="callout example"><b class="t">SIGNATURES FROM THE LECTURE</b><table><tr><th>Σ</th><th>Reads as</th></tr>' +
'<tr><td class="m">{a, b, f/1, g/2, p/1, q/2}</td><td>objects a, b; unary function f; binary function g; unary predicate p; binary predicate q</td></tr>' +
'<tr><td class="m">{p/0, q/0}</td><td>two 0-ary predicates: propositional logic</td></tr>' +
'<tr><td class="m">{0, s/1, plus/3}</td><td>object 0, unary function s, ternary predicate plus</td></tr></table></div>' +
'<h2>Same arity, different kind</h2>' +
'<p>The number after the slash is only the count of arguments. It does not say what kind of symbol it is.</p>' +
'<div class="vs"><div class="neutral"><h4>FUNCTION, e.g. s/1</h4><p>Builds a <b>term</b>: it names an object.</p><p class="m">s(0)</p><p>Read: "the number after 0". It has no truth value.</p></div>' +
'<div class="neutral"><h4>PREDICATE, e.g. odd/1</h4><p>Builds a <b>sentence</b>: it states something.</p><p class="m">odd(s(0))</p><p>Read: "the number after 0 is odd". It is true or false.</p></div></div>' +
'<p>So <span class="m">odd(s(0))</span> is a sentence, but <span class="m">s(odd(0))</span> is not: a function needs terms, and <span class="m">odd(0)</span> is a sentence.</p>' +
'<h2>Build-up order</h2>' +
'<div class="flow"><div class="fs"><b>Term</b><span>object constant, variable, or <span class="m">f(t₁,…,tₙ)</span> with each tᵢ a term</span></div>' +
'<div class="fs"><b>Atomic sentence</b><span class="m">p(t₁,…,tₙ)</span></div>' +
'<div class="fs"><b>Logical sentence</b><span>combine sentences with ¬ ∧ ∨ → ↔</span></div>' +
'<div class="fs"><b>Quantified sentence</b><span><span class="m">∀x.S</span> or <span class="m">∃x.S</span>, where S is a sentence</span></div></div>' +
'<p>Terms over {0, s/1}: <span class="m">0, s(0), s(s(0)), x, s(x)</span>. Read s(0) as "the number after 0".</p>' +
'<div class="vs"><div class="good"><h4>SENTENCE</h4><p class="m">p(f(a))</p><p>f(a) is a term, so p can take it.</p></div>' +
'<div class="bad"><h4>NOT A SENTENCE</h4><p class="m">p(p(a))</p><p>p(a) is a sentence, not a term.</p><p class="m">plus(plus(0,0,0),x,x)</p><p>plus(0,0,0) is not a term.</p></div></div>' +
'<h2>Try it</h2>' +
'<p>Click each preset in turn: <code>p(a)</code>, <code>p(f(a))</code>, <code>p(p(a))</code>, <code>q(Y)</code> (wrong arity) and <code>f(g(a,b))</code> (a term). Look at the verdict line: it says term, sentence or neither, and names each mistake.</p>' +
TIP +
'{{w:syntax|{"title":"IS IT A TERM, A SENTENCE, OR NEITHER?","funcs":"a, b, f/1, g/2","preds":"p/1, q/2","expr":"p(f(a))","presets":["p(a)","p(p(a))","q(Y)","f(g(a,b))","forall x. (p(x) -> q(x,x))","g(a,x)"]}}}' +
'<div class="facts"><div><b>∞</b>terms, even for a finite signature (f(a), f(f(a)), …)</div><div><b>∞</b>sentences, once variables are allowed</div><div><b>1</b>relational sentence for Σ = {a, b, f/1, g/2, p/0}: p</div></div>',
      quiz: [
        { q: 'With Σ = {a, f/1, p/1}, which is a sentence?', o: [
          ok('p(f(a))', 'f(a) is a term, so p can be applied to it.'),
          no('f(p(a))', 'p(a) is a sentence, not a term, so f cannot take it.'),
          no('f(a)', 'f(a) is a term; it names an object and has no truth value.')] },
        { q: 'q has arity 2. Is q(Y) a sentence?', o: [
          ok('No, it has the wrong number of arguments', 'The arity in the signature must match.'),
          no('Yes, Y is a variable', 'Variables are fine, but arity must still be 2.'),
          no('Yes, any predicate may take one argument', 'Arity is fixed per symbol.')] },
        { q: 'Σ = {a, b, f/1, g/2, p/0}. How many relational sentences exist?', o: [
          ok('1', 'Only p, since p has no arguments.'),
          no('Infinitely many', 'That would need a predicate with at least one argument.'),
          no('0', 'p/0 applied to no terms is itself a sentence.')] }
      ] },

    { n: 3, title: 'Scope, free and bound variables', sub: 'Which quantifier owns which variable.',
      html: '' +
'<p class="lead">In "x passed the exam", who is x? In "every student x passed", it is clear. What decides this?</p>' +
G([
  ['expression', '', 'a term or a sentence; mother(x), or p(x) ∧ q(x)'],
  ['ground', '', 'containing no variables; p(a) is ground, p(x) is not'],
  ['scope', '', 'the part of the text a quantifier controls; in ∀x.S the scope is S'],
  ['bound', '', 'a variable occurrence controlled by a quantifier; x in ∀x.p(x)'],
  ['free', '', 'a variable occurrence no quantifier controls; y in ∃x.q(x,y)'],
  ['closed / open', '', 'closed has no free variables, open has some; ∀x.p(x) is closed']
]) +
'<p>Lesson 1 gave us ∀ ("for all"), ∃ ("there is at least one") and variables; lesson 2 gave us sentences. Now we ask a practical question: when a variable shows up, who is it standing for?</p>' +
'<h2>A class roster again</h2>' +
'<p>"For every student x, x passed." Here x is just a label for the student being checked. The label only means something inside that sentence.</p>' +
'<p>"x passed" on its own is incomplete. Nobody told us who x is. Could you say whether it is true? No, you would have to ask "which x?".</p>' +
'<p>A programming loop works the same way: the loop variable exists only inside the loop. A loop inside a loop that reuses the name hides the outer one.</p>' +
'<h2>How far does a quantifier reach?</h2>' +
'<p>Take "for every student x, x passed". Which words did the "for every student x" cover? Just the part right after it: "x passed". The words before it, or in a different sentence, are not affected.</p>' +
'<p>The stretch of text that a quantifier controls is called its <b>scope</b>. The scope of <span class="m">∀x.S</span> or <span class="m">∃x.S</span> is S, reaching as far right as possible.</p>' +
'<div class="tcard"><div class="tn">scope</div><div class="tr"><span class="tk">Example</span><span>In <span class="m">∀x.(p(x) ∧ q(x))</span> the scope of ∀x is <span class="m">p(x) ∧ q(x)</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>In <span class="m">∀x.S</span> or <span class="m">∃x.S</span>, the scope of the quantifier is the sentence S, reaching as far right as possible.</span></div></div>' +
'<h2>Who owns each x?</h2>' +
'<p>Now look at one single x written somewhere in a sentence and ask: is there a quantifier on x that covers this spot? Two answers are possible, and they get two names.</p>' +
'<ul><li>Yes, a quantifier covers it. The occurrence is <b>bound</b>: x in <span class="m">∀x.p(x)</span> is bound. If two quantifiers on x both cover the spot, the inner one wins, just as an inner loop hides an outer one.</li>' +
'<li>No, nobody covers it, like "x passed" on its own. The occurrence is <b>free</b>: y in <span class="m">∃x.q(x,y)</span> is free.</li></ul>' +
'<div class="tcard"><div class="tn">bound</div><div class="tr"><span class="tk">Example</span><span>x in <span class="m">∀x.p(x)</span>; both x in <span class="m">∀x.(p(x) ∧ q(x))</span></span></div><div class="tr"><span class="tk">Formal</span><span>An occurrence of variable x is bound if it lies in the scope of a quantifier ∀x or ∃x; it is bound to the innermost such quantifier.</span></div></div>' +
'<div class="tcard"><div class="tn">free</div><div class="tr"><span class="tk">Example</span><span>y in <span class="m">∃x.q(x,y)</span>; x in <span class="m">p(x)</span></span></div><div class="tr"><span class="tk">Formal</span><span>An occurrence of variable x is free if it is not in the scope of any quantifier on x.</span></div></div>' +
'<h2>Sorting pieces of text</h2>' +
'<p>Sometimes we only care whether a piece of text mentions variables at all. First we need one word for both kinds of piece, names for objects and claims. A term or a sentence is called an <b>expression</b>. mother(x) is a term, and p(x) ∧ q(x) is a sentence, and both are expressions.</p>' +
'<div class="tcard"><div class="tn">expression</div><div class="tr"><span class="tk">Example</span><span><span class="m">mother(x)</span> (a term), <span class="m">p(x) ∧ q(x)</span> (a sentence)</span></div><div class="tr"><span class="tk">Formal</span><span>An expression is a term or a sentence over a signature Σ.</span></div></div>' +
'<p>An expression with no variables in it is called <b>ground</b>: p(a) is ground, p(x) is not. Think of ground as "nothing left to fill in".</p>' +
'<div class="tcard"><div class="tn">ground</div><div class="tr"><span class="tk">Example</span><span><span class="m">p(a)</span>, <span class="m">q(a, f(b))</span> are ground; <span class="m">p(x)</span> is not</span></div><div class="tr"><span class="tk">Formal</span><span>An expression is ground iff it contains no variables.</span></div></div>' +
'<p>For sentences we ask a different question: does any occurrence go unowned? A sentence with no free variables is <b>closed</b>; one with some is <b>open</b>, which we write <b>closed / open</b> for short. ∀x.p(x) is closed. A closed sentence is complete, like a question with every blank filled in.</p>' +
'<div class="tcard"><div class="tn">closed / open</div><div class="tr"><span class="tk">Example</span><span>Closed: <span class="m">∀x.p(x)</span>. Open: <span class="m">∃x.q(x,y)</span> (y is free).</span></div><div class="tr"><span class="tk">Formal</span><span>A sentence is closed iff it has no free variable occurrences; it is open iff it has at least one.</span></div></div>' +
'<div class="callout example"><b class="t">EXAMPLE FROM THE LECTURE</b>' +
'<div class="vs"><div class="bad"><h4>OPEN</h4><p class="m">∀x.p(x) ∧ ∃x.q(x,y)</p><p>First x: bound to ∀x. Second x: bound to ∃x. y is free.</p></div>' +
'<div class="good"><h4>CLOSED</h4><p class="m">∀x.p(x) ∧ ∃y.q(x,y)</p><p>The x in q is bound to ∀x, y to ∃y.</p></div></div>' +
'<p>The scope reaches as far right as possible, so ∀x covers everything after it.</p></div>' +
'<p>Now try it. The tool marks each variable as bound (and to which quantifier) or free. Start with the loaded sentence, then click the presets and watch y and the second x.</p>' +
TIP +
'{{w:scope|{"title":"WHO OWNS EACH VARIABLE?","expr":"forall x. p(x) & exists x. q(x,y)","presets":["forall x. p(x) & exists y. q(x,y)","p(x) & q(x,y)","forall x. exists y. q(x,y)","forall x. p(x) | forall x. q(x)"]}}}' +
'<h2>Closing an open sentence</h2>' +
'<div class="big">p(x) ∧ q(x,y)  =  ∀x.∀y.(p(x) ∧ q(x,y))<small>lecture convention: free variables count as "for all"; the tool prints the closed form</small></div>' +
'<details class="more"><summary>More detail</summary><p>An existential closure (putting ∃ in front instead) is also valid but is not the default. Prolog queries use it, see step 7.</p></details>',
      quiz: [
        { q: 'In ∀x.(p(x) ∧ ∃x.q(x)), the x in q(x) is bound to', o: [
          ok('∃x, the nearest quantifier', 'The inner quantifier hides the outer one.'),
          no('∀x', '∀x is shadowed by the inner ∃x for that occurrence.'),
          no('neither, it is free', 'It is inside the scope of ∃x.')] },
        { q: 'p(x) ∧ q(x,y) is read, by convention, as', o: [
          ok('∀x.∀y.(p(x) ∧ q(x,y))', 'Free variables are universally quantified.'),
          no('∃x.∃y.(p(x) ∧ q(x,y))', 'Existential closure is used for Prolog queries, not by the semantics convention.'),
          no('it has no meaning', 'Open sentences are given meaning by closing them.')] }
      ] },

    { n: 4, title: 'Herbrand semantics: universe, base, assignments', sub: 'Meaning defined over ground terms and ground atoms only.',
      html: '' +
'<p class="lead">When is "∀x. happy(x)" true? We need a precise list of what x can be and what facts exist.</p>' +
G([
  ['Herbrand semantics', '', 'a way to give meaning using only the names in the signature; no outside objects'],
  ['ground term', '', 'a term with no variables; mother(ann), not mother(x)'],
  ['Herbrand universe', 'HU', 'the set of all ground terms, every object we can name; {ann, bob} for two names'],
  ['ground atom', '', 'a predicate applied to ground terms only; happy(ann)'],
  ['Herbrand base', 'HB', 'the set of all ground atoms; happy(ann), happy(bob), tall(ann), tall(bob)'],
  ['truth assignment', 'i', 'a choice of true (1) or false (0) for every ground atom; Ann happy, Bob not'],
  ['set of all assignments', 'I', 'every possible choice of values; 16 of them for 4 atoms'],
  ['number of elements', '|I|', 'how many members a set has; |{a,b,c}| is 3'],
  ['map', 'HB → {0,1}', 'a rule giving each atom one value, 0 or 1']
]) +
'<p>In module 5 every atom got a value 0 or 1, and that told us when a sentence was true. We want the same for predicate logic, but now a sentence like ∀x. happy(x) talks about "every x". Every what? To check it, we need a precise list of what x can be, and a precise list of the facts that could be true or false.</p>' +
'<h2>Two people</h2>' +
'<p>A tiny world has two people, ann and bob, and two properties, happy and tall.</p>' +
'<h3>What can x be?</h3>' +
'<p>If ∀x. happy(x) must be checked, which things do we try for x? The simplest answer: only the things we have names for, here ann and bob. Nothing outside the vocabulary.</p>' +
'<p>Names built without variables, such as ann, bob, or mother(ann) in a signature that has mother, are all fine to try. mother(x) is not: it still has a blank in it. A term with no variables is called a <b>ground term</b>. The set of all ground terms, every object we can name, is the <b>Herbrand universe</b>, written HU. Here HU has 2 objects.</p>' +
'<div class="tcard"><div class="tn">ground term</div><div class="tr"><span class="tk">Example</span><span><span class="m">ann</span>, <span class="m">mother(ann)</span> are ground; <span class="m">mother(x)</span> is not</span></div><div class="tr"><span class="tk">Formal</span><span>A ground term is a term containing no variables.</span></div></div>' +
'<div class="tcard"><div class="tn">Herbrand universe (HU)</div><div class="tr"><span class="tk">Example</span><span>Σ = {ann, bob}: <span class="m">HU = {ann, bob}</span>. Σ = {0, s/1}: <span class="m">HU = {0, s(0), s(s(0)), …}</span></span></div><div class="tr"><span class="tk">Formal</span><span>The Herbrand universe HU of a signature Σ is the set of all ground terms over Σ.</span></div></div>' +
'<h3>Which facts exist?</h3>' +
'<p>Plug the names into the predicates: happy(ann), happy(bob), tall(ann), tall(bob). Each is a statement with no blanks, which is either true or false, just like an atom of module 5. A predicate applied to ground terms only is called a <b>ground atom</b>. The set of all ground atoms is the <b>Herbrand base</b>, written HB. Here HB has 4 atoms.</p>' +
'<div class="tcard"><div class="tn">ground atom</div><div class="tr"><span class="tk">Example</span><span><span class="m">happy(ann)</span>, <span class="m">tall(bob)</span></span></div><div class="tr"><span class="tk">Formal</span><span>A ground atom is an atomic sentence <span class="m">p(t₁,…,tₙ)</span> in which every tᵢ is a ground term.</span></div></div>' +
'<div class="tcard"><div class="tn">Herbrand base (HB)</div><div class="tr"><span class="tk">Example</span><span>happy, tall over {ann, bob}: <span class="m">HB = {happy(ann), happy(bob), tall(ann), tall(bob)}</span>, 4 atoms</span></div><div class="tr"><span class="tk">Formal</span><span>The Herbrand base HB of Σ is the set of all ground atoms over Σ: all <span class="m">p(t₁,…,tₙ)</span> with p an n-ary relation constant and each tᵢ in HU.</span></div></div>' +
'<h3>A possible world</h3>' +
'<p>Now imagine deciding, for each of the 4 facts, whether it is true or false. One full set of decisions is a possible world, say Ann happy and Bob not. That choice of 1 or 0 for every ground atom is called a <b>truth assignment</b>, written i. With 4 facts there are 2 × 2 × 2 × 2 = 16 possible worlds.</p>' +
'<div class="tcard"><div class="tn">truth assignment</div><div class="tr"><span class="tk">Example</span><span><span class="m">i(happy(ann)) = 1</span>, <span class="m">i(happy(bob)) = 0</span>, and a value for the other 2 atoms</span></div><div class="tr"><span class="tk">Formal</span><span>A truth assignment is a function <span class="m">i : HB → {0,1}</span> giving every ground atom exactly one value.</span></div></div>' +
'<p>The collection of all possible worlds is the <b>set of all assignments</b>, written I. Here I has 16 members. To say how many, we use bars: the <b>number of elements</b> of a set is written with bars, so |{a,b,c}| is 3, and here |I| = 16.</p>' +
'<div class="tcard"><div class="tn">set of all assignments (I)</div><div class="tr"><span class="tk">Example</span><span>4 atoms: <span class="m">|I| = 2⁴ = 16</span></span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">I = {i | i : HB → {0,1}}</span>, the set of all truth assignments; <span class="m">|I| = 2^|HB|</span> when HB is finite.</span></div></div>' +
'<div class="tcard"><div class="tn">number of elements (|S|)</div><div class="tr"><span class="tk">Example</span><span><span class="m">|{a,b,c}| = 3</span>, <span class="m">|I| = 16</span></span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">|S|</span> is the cardinality of the set S, the number of its members.</span></div></div>' +
'<h3>The name for the whole idea</h3>' +
'<p>Notice what we did: meaning came only from the names in the signature, with no outside objects such as real people. Giving meaning this way is called <b>Herbrand semantics</b>.</p>' +
'<div class="tcard"><div class="tn">Herbrand semantics</div><div class="tr"><span class="tk">Example</span><span>Σ = {ann, bob, happy/1}: x ranges over {ann, bob}, and a world is a choice of 0 or 1 for happy(ann) and happy(bob).</span></div><div class="tr"><span class="tk">Formal</span><span>Herbrand semantics interprets sentences over HU and HB: quantifiers range over HU, and a truth assignment <span class="m">i : HB → {0,1}</span> fixes which ground atoms are true.</span></div></div>' +
'<h2>The same idea, written with symbols</h2>' +
'<p>A truth assignment gives each atom exactly one value, 0 or 1. Mathematicians call such a rule a <b>map</b>: a truth assignment is a map from HB to {0,1}.</p>' +
'<div class="tcard"><div class="tn">map</div><div class="tr"><span class="tk">Example</span><span><span class="m">i : HB → {0,1}</span> sends happy(ann) to 1 and happy(bob) to 0</span></div><div class="tr"><span class="tk">Formal</span><span>A map <span class="m">f : A → B</span> assigns to every element of A exactly one element of B.</span></div></div>' +
'<table><tr><th>idea</th><th>in the two-people world</th><th>written</th></tr>' +
'<tr><td>Herbrand universe</td><td>ann, bob</td><td class="m">HU = all ground terms</td></tr>' +
'<tr><td>Herbrand base</td><td>happy(ann), happy(bob), tall(ann), tall(bob)</td><td class="m">HB = all p(t₁,…,tₙ) with each tᵢ in HU</td></tr>' +
'<tr><td>truth assignment</td><td>one choice of 0 or 1 for each of the 4 atoms</td><td class="m">i : HB → {0,1}</td></tr>' +
'<tr><td>all assignments</td><td>16 worlds</td><td class="m">I, with |I| = 2^|HB|</td></tr></table>' +
'<div class="callout example"><b class="t">EXAMPLES FROM THE LECTURE</b>' +
'<p class="m">Σ = {0, 1, 2, 3, even/1, odd/1}</p>' +
'<div class="facts"><div><b>4</b>objects in HU: 0,1,2,3</div><div><b>8</b>atoms in HB: even(0) … even(3), odd(0) … odd(3)</div><div><b>256</b>assignments, |I| = 2⁸</div></div>' +
'<p class="m">Σ = {0, s/1, plus/3}: HU = {0, s(0), s(s(0)), …} is infinite and so is HB.</p></div>' +
'<h2>Try it</h2>' +
'<p>In the signature box, add <code>s/1</code> to the object list and press build. HU turns infinite and the tool shows a window of it. Then remove it again and compare the counts of HU, HB and I.</p>' +
'{{w:herbrand|{"title":"BUILD HU AND HB","funcs":"0, 1, 2, 3","preds":"even/1, odd/1"}}}' +
'<div class="callout remember"><b class="t">SIZES</b><table><tr><th>If</th><th>Then</th></tr>' +
'<tr><td>Σ has an object constant and a function constant</td><td>HU is infinite</td></tr>' +
'<tr><td>HB is finite</td><td>I is finite, 2^|HB| elements</td></tr>' +
'<tr><td>HB is countably infinite (can be listed one by one)</td><td>I is uncountable (cannot be listed)</td></tr></table></div>',
      quiz: [
        { q: 'Σ = {a, b, p/1, q/2}. How many atoms are in HB?', o: [
          ok('6', 'p gives p(a), p(b); q gives q(a,a), q(a,b), q(b,a), q(b,b).'),
          no('4', 'That counts only the q atoms.'),
          no('3', 'Count every predicate applied to every combination of constants.')] },
        { q: 'For that Σ, how many truth assignments are there?', o: [
          ok('64', '2⁶, one value per ground atom.'),
          no('6', 'That is |HB|, not |I|.'),
          no('12', 'That is 2 × 6; assignments multiply across atoms.')] },
        { q: 'Σ = {a, f/1, p/1}. HU is', o: [
          ok('infinite: a, f(a), f(f(a)), …', 'A function constant together with an object constant generates infinitely many ground terms.'),
          no('{a}', 'f(a) is also a ground term.'),
          no('{a, f}', 'f alone is not a term; it needs an argument.')] }
      ] },

    { n: 5, title: 'Evaluating quantified sentences', sub: 'A quantifier is a conjunction or disjunction over the Herbrand universe.',
      html: '' +
'<p class="lead">Given a world, how do you decide whether "everybody has a pen" or "somebody has a pen" is true?</p>' +
G([
  ['instance', 'S[x←t]', 'the sentence S with every x replaced by the name t; p(x) becomes p(a)'],
  ['evaluate', 'Sⁱ', 'work out true or false for S under the assignment i; p(a) ∧ p(b) under i'],
  ['conjunction', '', 'an "and" of several sentences; p(a) ∧ p(b)'],
  ['disjunction', '', 'an "or" of several sentences; p(a) ∨ p(b)'],
  ['if and only if', 'iff', 'true in exactly the same cases; "x is even iff x/2 is whole"'],
  ['implication true by falsity', '', 'A → B is true whenever A is false; "if pigs fly, I win" is true']
]) +
'<p>Lesson 4 gave us HU (the names), HB (the facts) and an assignment i (which facts are true). Now we put them to work: given a world, is a quantified sentence true?</p>' +
'<h2>Checking a room</h2>' +
'<p>"Everybody in this room has a pen": walk to each person and check. It is true only if all checks pass.</p>' +
'<p>"Somebody in this room has a pen": walk around until you find one. It is true if at least one check passes.</p>' +
'<p>Predicate logic does exactly this, with HU as the people in the room.</p>' +
'<p>Notice what each check is. For the person Ann, "x has a pen" becomes "Ann has a pen", the same sentence with the blank filled by a name. That filled-in copy is an <b>instance</b>, written S[x←t]: the sentence S with every x replaced by the name t. For example p(x) becomes p(a).</p>' +
'<div class="tcard"><div class="tn">instance</div><div class="tr"><span class="tk">Example</span><span><span class="m">p(x)[x←a] = p(a)</span>; <span class="m">q(x,x)[x←b] = q(b,b)</span></span></div><div class="tr"><span class="tk">Formal</span><span>The instance <span class="m">S[x←t]</span> is the sentence obtained from S by replacing every free occurrence of x by the ground term t.</span></div></div>' +
'<p>Notice too how the checks are combined. "Everybody" needs check 1 and check 2 and check 3, an "and" of many sentences, called a <b>conjunction</b>. "Somebody" needs check 1 or check 2 or check 3, an "or" of many sentences, called a <b>disjunction</b>. Over two people a and b: p(a) ∧ p(b) is a conjunction and p(a) ∨ p(b) is a disjunction.</p>' +
'<div class="tcard"><div class="tn">conjunction</div><div class="tr"><span class="tk">Example</span><span><span class="m">p(a) ∧ p(b)</span></span></div><div class="tr"><span class="tk">Formal</span><span>A conjunction <span class="m">φ₁ ∧ … ∧ φₙ</span> is true iff every φᵢ is true.</span></div></div>' +
'<div class="tcard"><div class="tn">disjunction</div><div class="tr"><span class="tk">Example</span><span><span class="m">p(a) ∨ p(b)</span></span></div><div class="tr"><span class="tk">Formal</span><span>A disjunction <span class="m">φ₁ ∨ … ∨ φₙ</span> is true iff at least one φᵢ is true.</span></div></div>' +
'<h2>The rule</h2>' +
'<p>Walking through the room and reporting true or false is what we call to <b>evaluate</b> a sentence: work out true or false for it under an assignment i, written Sⁱ. We do it by recursion (build up from smaller parts) as in module 5, plus two quantifier cases.</p>' +
'<div class="tcard"><div class="tn">evaluate (Sⁱ)</div><div class="tr"><span class="tk">Example</span><span>Under i with p(a)=1, p(b)=0: <span class="m">(p(a) ∧ p(b))ⁱ = 0</span></span></div><div class="tr"><span class="tk">Formal</span><span>The value <span class="m">Sⁱ ∈ {0,1}</span> of a sentence S under assignment i is defined by recursion: an atom gets i(atom), connectives use their truth tables, and quantifiers use the instance rules below.</span></div></div>' +
'<p>To state the cases exactly we need a phrase for "true in exactly the same cases", for instance "x is even exactly when x/2 is whole". It is called <b>if and only if</b>, written iff.</p>' +
'<div class="tcard"><div class="tn">if and only if (iff)</div><div class="tr"><span class="tk">Example</span><span>"x is even iff x/2 is whole"; <span class="m">(∃x.S)ⁱ = 1 iff S[x←t] is true for some t</span></span></div><div class="tr"><span class="tk">Formal</span><span>A iff B means A and B are true in exactly the same cases: A implies B and B implies A.</span></div></div>' +
'<div class="big">(∀x.S)ⁱ = 1 iff S[x←t] is true for every t in HU<br>(∃x.S)ⁱ = 1 iff S[x←t] is true for some t in HU<small>S[x←t]: replace every x in S by the ground term t. The small i means: under assignment i.</small></div>' +
'<div class="vs"><div class="neutral"><h4>∀ IS A CONJUNCTION</h4><p>Of all instances, possibly infinite.</p></div><div class="neutral"><h4>∃ IS A DISJUNCTION</h4><p>Of all instances, possibly infinite.</p></div></div>' +
'<p>The range is HU, the ground <i>terms</i>, not HB. A variable stands for an object, not for a fact.</p>' +
'<div class="callout example"><b class="t">EXAMPLE FROM THE LECTURE (EXAMPLE 11)</b>' +
'<p>Σ = {a, b, p/1, q/2}. Under i: p(a) = 1, p(b) = 0, q(a,a) = 1, q(a,b) = 0, q(b,a) = 1, q(b,b) = 0.</p>' +
'<p class="m">φ = ∀x.(p(x) → q(x,x))</p>' +
'<p>Step 1: HU = {a, b}, so we need two instances.</p>' +
'<p>Step 2: x←a gives p(a) → q(a,a), that is 1 → 1, true.</p>' +
'<p>Step 3: x←b gives p(b) → q(b,b), that is 0 → 0, true because p(b) is false. Is that fair? Compare a promise: "if pigs fly, I win". Pigs do not fly, so the promise is never broken. A promise is only broken when the condition holds and the result fails. This is called <b>implication true by falsity</b>: A → B is true whenever A is false.</p>' +
'<div class="tcard"><div class="tn">implication true by falsity</div><div class="tr"><span class="tk">Example</span><span><span class="m">p(b) → q(b,b)</span> with p(b) = 0 and q(b,b) = 0 is true</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">(A → B)ⁱ = 1</span> iff <span class="m">Aⁱ = 0</span> or <span class="m">Bⁱ = 1</span>; so it is true whenever the premise A is false.</span></div></div>' +
'<p>Step 4: both instances are true, so φ is true under i.</p>' +
'<div class="chain"><span>p(a) → q(a,a): true</span><i>and</i><span>p(b) → q(b,b): true, as p(b) is false</span><i>→</i><span>φ true under i</span></div></div>' +
'<p>Now try it. The tool shows the assignment as switches for each ground atom. Flip a switch and watch the verdict on each instance change. Then click the presets.</p>' +
TIP +
'{{w:evalh|{"title":"EVALUATE UNDER i","expr":"forall x. (p(x) -> q(x,x))","init":{"p(a)":1,"q(a,a)":1,"q(b,a)":1},"presets":["forall x. (p(x) -> q(x,x))","exists y. q(a,y)","q(a,y)","forall x. exists y. q(x,y)","exists y. forall x. q(x,y)"]}}}' +
'<h2>Exercise 7 from the lecture</h2>' +
'<div class="vs"><div class="good"><h4>TRUE</h4><p class="m">exists y. q(a,y)</p><p>q(a,a) = 1.</p></div><div class="bad"><h4>FALSE</h4><p class="m">q(a,y)</p><p>Read as ∀y.q(a,y); q(a,b) = 0.</p></div></div>' +
'<p>In the tool above, load q(a,y), then flip q(a,b) to 1 and see the sentence become true.</p>' +
'<div class="callout warn"><b class="t">FREE VARIABLES</b><p><span class="m">q(a,y)</span> is the same sentence as <span class="m">∀y.q(a,y)</span> (lesson 3 convention). That is why it is false, not "undefined".</p></div>',
      quiz: [
        { q: 'HU = {a, b}. ∃x.p(x) is the same as', o: [
          ok('p(a) ∨ p(b)', 'An existential is a disjunction of its instances.'),
          no('p(a) ∧ p(b)', 'That is ∀x.p(x).'),
          no('p(x)', 'The quantified sentence has no free variable; its instances are ground.')] },
        { q: 'i makes p(a) true and p(b) false. Is ∀x.p(x) true?', o: [
          ok('No, the instance p(b) is false', 'A universal needs every instance true.'),
          no('Yes, p(a) is true', 'One true instance is not enough.'),
          no('Cannot say', 'The assignment decides every instance.')] },
        { q: 'The quantifier ranges over', o: [
          ok('HU, the ground terms', 'Instances replace the variable by a ground term.'),
          no('HB, the ground atoms', 'Atoms are sentences, not objects; a variable stands for an object.'),
          no('all variables', 'Variables are what is being replaced.')] }
      ] },

    { n: 6, title: 'Models, entailment and quantifier order', sub: 'The semantic notions of module 5 carry over; quantifier order and categorical forms are the new traps.',
      html: '' +
'<p class="lead">"Everybody admires someone" and "someone is admired by everybody": do they say the same thing?</p>' +
G([
  ['model set', 'M(φ)', 'all assignments in I that make φ true; the worlds where φ holds'],
  ['subset', '⊆', 'every member of the left set is in the right set; {1,2} ⊆ {1,2,3}'],
  ['premises', 'Δ', 'a set of sentences we assume true; Δ = {p(a)}'],
  ['entails', 'Δ ⊨ φ', 'every world making all of Δ true also makes φ true; p(a) ⊨ p(a) ∨ p(b)'],
  ['exactly when', '⟺', 'each side holds in exactly the same cases; used to define ⊨'],
  ['counter-model', '', 'a world where the premises hold and the conclusion fails; shows entailment is false'],
  ['categorical form', '', 'an everyday statement pattern with "all", "some" or "no"; all cats are animals']
]) +
'<p>Good news: the semantic ideas of module 5 carry over unchanged. Valid means true in every assignment, unsatisfiable true in none, satisfiable true in at least one, falsifiable false in at least one, contingent both true and false somewhere. In module 5, Δ ⊨ φ meant M(Δ) is inside M(φ). Only the worlds are new: they are now assignments to ground atoms.</p>' +
'<h2>A first entailment</h2>' +
'<p>Take Σ = {a, b, p/1}. Suppose we are told p(a) and nothing else. What else must then be true? In every world where p(a) is true, p(a) ∨ p(b) is true too. No world can make p(a) true and that "or" false.</p>' +
'<p>We need names for the two roles. The sentences we are told to assume true are the <b>premises</b>, and the set of premises is written Δ. Here Δ = {p(a)}.</p>' +
'<div class="tcard"><div class="tn">premises (Δ)</div><div class="tr"><span class="tk">Example</span><span><span class="m">Δ = {p(a)}</span>; <span class="m">Δ = {¬S(a), ¬S(b)}</span></span></div><div class="tr"><span class="tk">Formal</span><span>Premises are a set Δ of sentences assumed true.</span></div></div>' +
'<p>When every world making all of Δ true also makes φ true, we say Δ <b>entails</b> φ, written Δ ⊨ φ. So here Δ entails p(a) ∨ p(b).</p>' +
'<div class="tcard"><div class="tn">entails (⊨)</div><div class="tr"><span class="tk">Example</span><span><span class="m">{p(a)} ⊨ p(a) ∨ p(b)</span> holds; <span class="m">{p(a)} ⊨ p(a) ∧ p(b)</span> does not</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">Δ ⊨ φ</span> iff every truth assignment i that satisfies all sentences of Δ also satisfies φ.</span></div></div>' +
'<h2>The same idea, with sets of worlds</h2>' +
'<p>Imagine drawing a circle around the worlds where φ is true. That circle is the <b>model set</b> M(φ): all assignments in I that make φ true, the worlds where φ holds. Valid, contingent, unsatisfiable, satisfiable, falsifiable: same conditions on M(φ) as before.</p>' +
'<div class="tcard"><div class="tn">model set (M(φ))</div><div class="tr"><span class="tk">Example</span><span>Σ = {a, p/1}: <span class="m">M(p(a))</span> is the set of assignments with i(p(a)) = 1</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">M(φ) = {i ∈ I | φⁱ = 1}</span>, the set of assignments that satisfy φ.</span></div></div>' +
'<p>Entailment then says: the circle for Δ sits inside the circle for φ. When every member of the left set is in the right set, the left is a <b>subset</b> of the right, written ⊆: {1,2} ⊆ {1,2,3}.</p>' +
'<div class="tcard"><div class="tn">subset (⊆)</div><div class="tr"><span class="tk">Example</span><span><span class="m">{1,2} ⊆ {1,2,3}</span>, and <span class="m">{1,2,3} ⊆ {1,2,3}</span></span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">A ⊆ B</span> iff every element of A is an element of B.</span></div></div>' +
'<p>One more bit of notation. To define ⊨ we say two things hold in exactly the same cases, which we write <b>exactly when</b> or ⟺.</p>' +
'<div class="tcard"><div class="tn">exactly when (⟺)</div><div class="tr"><span class="tk">Example</span><span><span class="m">Δ ⊨ φ ⟺ M(Δ) ⊆ M(φ)</span></span></div><div class="tr"><span class="tk">Formal</span><span>A ⟺ B means A holds in exactly the cases in which B holds, so each implies the other.</span></div></div>' +
'<div class="big">Δ ⊨ φ ⟺ M(Δ) ⊆ M(φ)<small>the sign ⟺ reads exactly when: each side holds in exactly the same cases. Here it defines ⊨.</small></div>' +
'<p>For a finite Herbrand base the tool lists all 2^|HB| assignments and tests entailment by brute force.</p>' +
'<p>Try it. Click each preset. The tool lists the worlds and says whether Δ entails φ. If it does not, one world must be inside Δ\'s circle but outside φ\'s. That world is a <b>counter-model</b>: a world where Δ holds but φ fails, which shows entailment is false.</p>' +
'<div class="tcard"><div class="tn">counter-model</div><div class="tr"><span class="tk">Example</span><span>For <span class="m">{p(a)} ⊨ p(a) ∧ p(b)</span>: the world with p(a) = 1, p(b) = 0</span></div><div class="tr"><span class="tk">Formal</span><span>A counter-model to <span class="m">Δ ⊨ φ</span> is an assignment i with i ⊨ Δ (all of Δ true) and φⁱ = 0.</span></div></div>' +
TIP +
'{{w:fentail|{"title":"DOES Δ ENTAIL φ?","funcs":"a, b","preds":"p/1, q/2","delta":["p(a)"],"phi":"p(a) | p(b)","presets":[{"label":"{p(a)} ⊨ p(a)∨p(b)","delta":["p(a)"],"phi":"p(a) | p(b)"},{"label":"{p(a)} ⊨ p(a)∧p(b)","delta":["p(a)"],"phi":"p(a) & p(b)"},{"label":"{p(a),p(b)} ⊨ p(a)∧p(b)","delta":["p(a)","p(b)"],"phi":"p(a) & p(b)"}]}}}' +
'<h2>Quantifier order matters</h2>' +
'<p>Picture a school where q(x,y) means "x admires y".</p>' +
'<p>"Everybody admires someone": each student has a hero, maybe a different one each.</p>' +
'<p>"Someone is admired by everybody": one single star that the whole school admires.</p>' +
'<p>The second is much stronger. Same kind of quantifier: swapping is harmless. Mixed ∀ and ∃: it is not.</p>' +
'<div class="vs"><div class="good"><h4>STRONGER</h4><p class="m">∃y.∀x.q(x,y)</p><p>Someone is admired by everybody.</p></div><div class="neutral"><h4>WEAKER</h4><p class="m">∀x.∃y.q(x,y)</p><p>Everybody admires someone, possibly different people.</p></div></div>' +
'<div class="chain"><span>∃y.∀x.q(x,y)</span><i>⊨</i><span>∀x.∃y.q(x,y)</span><i>holds; the reverse does not</i></div>' +
'<p>If one y works for every x, then each x has a y.</p>' +
'<p>Try both directions in the tool below. The second preset gives a counter-model: two students each admiring a different person.</p>' +
'{{w:fentail|{"title":"QUANTIFIER ORDER","funcs":"a, b","preds":"q/2","delta":["exists y. forall x. q(x,y)"],"phi":"forall x. exists y. q(x,y)","presets":[{"label":"∃y∀x ⊨ ∀x∃y","delta":["exists y. forall x. q(x,y)"],"phi":"forall x. exists y. q(x,y)"},{"label":"∀x∃y ⊨ ∃y∀x ?","delta":["forall x. exists y. q(x,y)"],"phi":"exists y. forall x. q(x,y)"},{"label":"∀y∀x ⊨ ∀x∀y","delta":["forall y. forall x. q(x,y)"],"phi":"forall x. forall y. q(x,y)"}]}}}' +
'<div class="callout example"><b class="t">FROM THE STANFORD BOOK §8.3: FREE VARIABLES</b><p>Does <span class="m">q(x, y)</span> entail <span class="m">q(y, x)</span>? Yes. A sentence with free variables is true only if every instance is true, so <span class="m">q(x, y)</span> says the same as <span class="m">∀x.∀y.q(x, y)</span>. That says q holds for every pair, and so does <span class="m">∀x.∀y.q(y, x)</span>. Reading a free variable as "some x" gives the wrong answer.</p></div>' +
'<h2>Categorical statements</h2>' +
'<p>Think of the sentences people actually say: "all cats are animals", "some dogs are friendly", "no cat is a dog". They look different, but each one has the same shape: a quantity word ("all", "some", "no"), then one group S, then another group P.</p>' +
'<p>Such a fixed everyday pattern is called a <b>categorical form</b>. Here is how each translates, with S and P as predicates such as cat and dog.</p>' +
'<div class="tcard"><div class="tn">categorical form</div><div class="tr"><span class="tk">Example</span><span>"All cats are animals": <span class="m">∀x.(cat(x) → animal(x))</span>; "Some dogs are friendly": <span class="m">∃x.(dog(x) ∧ friendly(x))</span></span></div><div class="tr"><span class="tk">Formal</span><span>The four categorical forms are: all S are P, <span class="m">∀x.(S(x) → P(x))</span>; some S are P, <span class="m">∃x.(S(x) ∧ P(x))</span>; no S are P, <span class="m">∀x.(S(x) → ¬P(x))</span>; some S are not P, <span class="m">∃x.(S(x) ∧ ¬P(x))</span>.</span></div></div>' +
'<table><tr><th>Form</th><th>Predicate logic</th></tr>' +
'<tr><td>All S are P</td><td class="m">∀x.(S(x) → P(x))</td></tr><tr><td>Some S are P</td><td class="m">∃x.(S(x) ∧ P(x))</td></tr>' +
'<tr><td>No S are P</td><td class="m">∀x.(S(x) → ¬P(x))</td></tr><tr><td>Some S are not P</td><td class="m">∃x.(S(x) ∧ ¬P(x))</td></tr></table>' +
'<div class="callout warn"><b class="t">THE CLASSIC ERROR</b><p>"All" goes with →, "some" with ∧.</p>' +
'<div class="vs"><div class="bad"><h4>ALL, WRONG</h4><p class="m">∀x.(S(x) ∧ P(x))</p><p>Claims everything is an S.</p></div><div class="bad"><h4>SOME, WRONG</h4><p class="m">∃x.(S(x) → P(x))</p><p>True whenever something is not an S.</p></div></div>' +
'<p>Test it: over constants a, b with Δ = {¬S(a), ¬S(b)}, φ = ∃x.(S(x) → P(x)) is entailed, which is clearly not what "some S are P" means.</p></div>' +
'<p>Run that test below: the tool should report that Δ entails φ, although nothing is S.</p>' +
'{{w:fentail|{"title":"WRONG WAY TO SAY SOME S ARE P","funcs":"a, b","preds":"S/1, P/1","delta":["~S(a)","~S(b)"],"phi":"exists x. (S(x) -> P(x))"}}}' +
'<p>Two more facts: not everybody is happy exactly when somebody is not happy, and nobody is happy exactly when everybody is not happy.</p>' +
'<div class="cards"><div class="card"><h3>Valid</h3><p class="m">¬∀x.p(x) ↔ ∃x.¬p(x)</p></div><div class="card"><h3>Valid</h3><p class="m">¬∃x.p(x) ↔ ∀x.¬p(x)</p></div></div>',
      quiz: [
        { q: 'Which entailment holds?', o: [
          ok('∃y.∀x.q(x,y) ⊨ ∀x.∃y.q(x,y)', 'A single y that works for all x gives each x a y.'),
          no('∀x.∃y.q(x,y) ⊨ ∃y.∀x.q(x,y)', 'Each x may use a different y; the tool finds a counter-model.'),
          no('Both directions hold', 'Only one does.')] },
        { q: 'How do you write "No cat is a dog"?', o: [
          ok('∀x.(cat(x) → ¬dog(x))', 'All with →, and the property is negated.'),
          no('∀x.(cat(x) ∧ ¬dog(x))', 'This says everything is a cat that is not a dog.'),
          no('∃x.(cat(x) → ¬dog(x))', 'That is true whenever some object is not a cat.')] },
        { q: 'Is ∀x.∀y.q(x,y) equivalent to ∀y.∀x.q(x,y)?', o: [
          ok('Yes', 'Swapping quantifiers of the same kind changes nothing.'),
          no('No, order always matters', 'It matters only for mixed ∀ and ∃.'),
          no('Only when HU is finite', 'It holds in every case.')] }
      ] },

    { n: 7, title: 'Finite Herbrand logic and Prolog', sub: 'When predicate logic collapses to propositional logic, and how Prolog fits in.',
      html: '' +
'<p class="lead">If a world has only two people, can we replace "for all" by a plain list and use propositional logic?</p>' +
G([
  ['Finite Herbrand Logic', 'FHL', 'predicate logic with finitely many names and no functions; Σ = {a, b, p/1}'],
  ['prenex form', '', 'every quantifier moved to the front, nothing free; ∀x.∃y.p(x,y)'],
  ['grounding', '', 'replacing each quantifier by its instances; ∀x.p(x) becomes p(a) ∧ p(b)'],
  ['Γ (gamma)', 'Γ', 'the list of ground sentences already finished; Δ is the list still to process'],
  ['rewrite as letters', '↦', 'maps to; p(a) ↦ p_a turns a ground atom into a plain propositional letter'],
  ['Prolog', '', 'a programming language that runs logic rules; reachable(X,Z) :- edge(X,Z).'],
  ['rule and query', ':-  and  ?-', 'a rule says "head holds if body holds" (written head :- body.); a query asks whether something holds (typed after ?-)'],
  ['binding', '', 'a value found for a variable; X = a']
]) +
'<p>Δ is a set of premise sentences (lesson 6), and propositional logic (module 5) has plain letters with no objects inside. Is there a case where predicate logic secretly is that simpler thing?</p>' +
'<h2>Two people</h2>' +
'<p>Suppose the only people are ann and bob.</p>' +
'<p>"Everybody is happy" is just "ann is happy and bob is happy".</p>' +
'<p>"Somebody is happy" is just "ann is happy or bob is happy".</p>' +
'<p>Look at what happened: no ∀ or ∃ is left. We have plain statements about a few fixed facts, which is propositional logic.</p>' +
'<p>The trick of replacing each quantifier by its instances has a name: it is called <b>grounding</b>. For example ∀x.p(x) becomes p(a) ∧ p(b).</p>' +
'<div class="tcard"><div class="tn">grounding</div><div class="tr"><span class="tk">Example</span><span>HU = {a, b}: <span class="m">∀x.p(x)</span> becomes <span class="m">p(a) ∧ p(b)</span>; <span class="m">∃x.p(x)</span> becomes <span class="m">p(a) ∨ p(b)</span></span></div><div class="tr"><span class="tk">Formal</span><span>Grounding replaces <span class="m">∀v.φ</span> by the conjunction of all instances φ[v←τ] and <span class="m">∃v.φ</span> by their disjunction, for τ ranging over the finite HU, until no quantifier remains.</span></div></div>' +
'<h2>Finite Herbrand logic (FHL)</h2>' +
'<p>Grounding works because the list of names is short. With a function symbol like mother we could never finish the list, so we require HU to be finite: it is just the set of object constants.</p>' +
'<p>While grounding we keep two piles, like a to-do list and a done list. Δ is what is still to process, and the done pile is called <b>Γ</b> (gamma): the list of ground sentences already finished. The whole procedure has three stages:</p>' +
'<div class="flow"><div class="fs"><b>Prenex form</b><span>Closed sentence, all quantifiers in front. Rename duplicate variables, pull quantifiers out, close free variables.</span></div>' +
'<div class="fs"><b>Grounding</b><span>List Δ to process, list Γ done. A ground sentence moves to Γ. ∀v.φ becomes all instances φ[τ]. ∃v.φ becomes the disjunction of its instances.</span></div>' +
'<div class="fs"><b>Rewrite as letters</b><span class="m">Each ground atom gets a letter: p(a) ↦ p_a, where ↦ means "maps to"</span></div></div>' +
'<div class="tcard"><div class="tn">Γ (gamma)</div><div class="tr"><span class="tk">Example</span><span>After step 1 of the example below, <span class="m">Γ = {p(a)}</span></span></div><div class="tr"><span class="tk">Formal</span><span>Γ is the set of ground sentences already processed; a sentence of Δ moves to Γ once it is ground, and grounding ends when Δ is empty.</span></div></div>' +
'<div class="tcard"><div class="tn">prenex form</div><div class="tr"><span class="tk">Example</span><span><span class="m">∀x.∃y.p(x,y)</span>; <span class="m">∀x.∀y.∃z.(p(x,y) ∨ q(z))</span></span></div><div class="tr"><span class="tk">Formal</span><span>A closed sentence is in prenex form iff it is a quantifier prefix <span class="m">Q₁x₁…Qₙxₙ</span> (each Q is ∀ or ∃) followed by a quantifier-free sentence.</span></div></div>' +
'<div class="tcard"><div class="tn">rewrite as letters (↦)</div><div class="tr"><span class="tk">Example</span><span><span class="m">p(a) ↦ p_a</span>, <span class="m">q(b) ↦ q_b</span></span></div><div class="tr"><span class="tk">Formal</span><span>Each ground atom is mapped one-to-one to a propositional letter, turning the ground sentences into a propositional set.</span></div></div>' +
'<div class="callout example"><b class="t">EXAMPLE FROM THE LECTURE (EXAMPLE 14)</b>' +
'<p class="m">Σ = {a, b, p/1, q/1}, Δ = {p(a), ∀x.(p(x) → q(x)), ∃x.q(x)}</p>' +
'<p>Step 1: p(a) is ground, so it moves to Γ.</p>' +
'<p>Step 2: ∀x.(p(x) → q(x)) becomes its two instances p(a) → q(a) and p(b) → q(b), both ground, so both move to Γ.</p>' +
'<p>Step 3: ∃x.q(x) becomes q(a) ∨ q(b), ground, so it moves to Γ.</p>' +
'<p>Step 4: each ground atom gets a letter.</p>' +
'<div class="chain"><span>Γ = {p(a), p(a) → q(a), p(b) → q(b), q(a) ∨ q(b)}</span><i>→</i><span>{p_a, p_a → q_a, p_b → q_b, q_a ∨ q_b}</span></div>' +
'<p>The tool prints each implication as ¬p_a ∨ q_a.</p></div>' +
'<p>Now try it. Press the grounding button and read the finished list Γ. Then click the Exercise 8 preset.</p>' +
TIP +
'{{w:ground|{"title":"GROUNDING","consts":"a, b","delta":["p(a)","forall x. (p(x) -> q(x))","exists x. q(x)"],"presets":[{"label":"Example 14","consts":"a, b","delta":["p(a)","forall x. (p(x) -> q(x))","exists x. q(x)"]},{"label":"Exercise 8","consts":"a, b","delta":["(forall y. p(x,y)) | (exists y. q(y))","exists x. ~q(x)"]}]}}}' +
'<h2>Exercise 8</h2>' +
'<p>The second preset is the lecture exercise, with parentheses so each quantifier covers only its own disjunct (a disjunct is one side of an "or"). The x is free, so by the lesson 3 convention it gets a ∀. The tool picks its own Skolem names for the ∃ variables; Skolem names are explained in lesson 8.</p>' +
'<div class="chain"><span class="m">(∀y.p(x,y)) ∨ (∃y.q(y))</span><i>prenex</i><span class="m">∀x.∀y.∃z.(p(x,y) ∨ q(z))</span><i>ground</i><span class="m">p_xy ∨ q_a ∨ q_b for each (x,y), plus ¬q_a ∨ ¬q_b</span></div>' +
'<details class="more"><summary>More detail</summary><p>Predicate logic with function symbols is strictly more expressive; only the finite fragment is propositional in disguise.</p></details>' +
'<h2>Predicate logic versus Prolog</h2>' +
'<p>Everything so far is logic on paper. Is there a program that actually uses it? There is: you write down facts and rules, and the computer answers questions from them. A programming language that runs logic rules this way is called <b>Prolog</b>.</p>' +
'<div class="tcard"><div class="tn">Prolog</div><div class="tr"><span class="tk">Example</span><span><span class="m">reachable(X,Z) :- edge(X,Z).</span></span></div><div class="tr"><span class="tk">Formal</span><span>Prolog is a programming language whose programs are rules (and facts) of the form <span class="m">H :- B₁, …, Bₙ.</span> and whose computation answers queries.</span></div></div>' +
'<p>Here is a rule from a Prolog program.</p>' +
'<p><code>reachable(X,Z) :- reachable(X,Y), reachable(Y,Z).</code> It says Z is reachable from X if some Y is reachable from X and Z from Y.</p>' +
'<p>Two kinds of line appear in Prolog. The rule above says "the head is true if all of the body is true", and is written with <code>:-</code>. The other kind is a question typed at the prompt after <code>?-</code>, asking "is there an answer?". Together they are the <b>rule and query</b> pair.</p>' +
'<div class="tcard"><div class="tn">rule and query</div><div class="tr"><span class="tk">Example</span><span>Rule <span class="m">reachable(X,Z) :- reachable(X,Y), reachable(Y,Z).</span> Query <span class="m">?- reachable(a,Z).</span></span></div><div class="tr"><span class="tk">Formal</span><span>A rule <span class="m">H :- B₁,…,Bₙ.</span> reads <span class="m">∀x₁…∀xₘ.(H ← B₁ ∧ … ∧ Bₙ)</span>; a query <span class="m">?- Q₁,…,Qₙ.</span> reads <span class="m">∃x₁…∃xₘ.(Q₁ ∧ … ∧ Qₙ)</span>.</span></div></div>' +
'<p>Try the question <code>?- reachable(a,Z).</code> Prolog does not just say yes or no. It finds a value for Z, and a value found for a variable is called a <b>binding</b>. If the program also has the fact <code>reachable(a,b).</code>, written above the rule, the first answer is Z = b.</p>' +
'<div class="tcard"><div class="tn">binding</div><div class="tr"><span class="tk">Example</span><span>For <span class="m">?- reachable(a,Z).</span> the binding <span class="m">Z = b</span></span></div><div class="tr"><span class="tk">Formal</span><span>A binding assigns a ground term to a query variable, <span class="m">X = t</span>; the bindings of a successful query form its answer.</span></div></div>' +
'<h2>The same idea, written in logic</h2>' +
'<div class="vs"><div class="neutral"><h4>RULE</h4><p class="m">H :- B1, …, Bn.</p><p class="m">∀x₁…∀xₘ.(H ← B₁ ∧ … ∧ Bₙ)</p><p>Rule variables are universal: for all x₁ up to xₘ.</p></div>' +
'<div class="neutral"><h4>QUERY</h4><p class="m">?- Q1, …, Qn.</p><p class="m">∃x₁…∃xₘ.(Q₁ ∧ … ∧ Qₙ)</p><p>Query variables are existential, so a successful query returns bindings, an answer.</p></div></div>' +
'<p>Prolog has no logical negation ¬ (only negation as failure: "not provable"), and a rule head must be a single relational sentence.</p>' +
'<div class="big">∀X.∀Y.∀Z.(reachable(X,Z) ← reachable(X,Y) ∧ reachable(Y,Z))<small>the logic reading of the reachable rule above</small></div>',
      quiz: [
        { q: 'Which signature gives Finite Herbrand Logic?', o: [
          ok('{a, b, p/1}', 'No function symbols, finitely many constants.'),
          no('{a, f/1, p/1}', 'The function f makes HU infinite.'),
          no('{f/1, p/1}', 'Still has a function symbol.')] },
        { q: 'With constants a, b, how is ∃x.q(x) grounded?', o: [
          ok('q(a) ∨ q(b)', 'An existential becomes the disjunction of its instances.'),
          no('q(a) ∧ q(b)', 'That is the grounding of ∀x.q(x).'),
          no('It cannot be grounded', 'In FHL every quantifier can be expanded.')] },
        { q: 'In a Prolog query, variables are read as', o: [
          ok('existentially quantified', 'The query asks whether some bindings make it true, and returns them.'),
          no('universally quantified', 'That is how rule variables are read.'),
          no('free and ignored', 'They are quantified.')] }
      ] },

    { n: 8, title: 'Clausal form with quantifiers: INSEADO', sub: 'Seven steps, including the Skolem trick for existentials.',
      html: '' +
'<p class="lead">Resolution wants clauses: sets of literals, read as "or", with no quantifiers. How do you get rid of "there is at least one" without losing its meaning?</p>' +
G([
  ['literal', '', 'an atom or a negated atom; p(a) or ¬p(a)'],
  ['clause', '{…}', 'a set of literals read as "or"; {¬p(x), q(x)} means ¬p(x) ∨ q(x)'],
  ['clausal form', '', 'a sentence rewritten as a list of clauses, all required at once (an "and" of ors)'],
  ['INSEADO', '', 'the seven-step recipe for clausal form; the letters are the step initials'],
  ['De Morgan', '', 'pushing ¬ inside: ¬(A ∧ B) becomes ¬A ∨ ¬B'],
  ['Skolem constant', 'c', 'a brand-new name for the one thing an ∃ promised; "the culprit"'],
  ['Skolem function', 'f(x)', 'a brand-new function naming the promised thing for each x; "x\'s mother"'],
  ['witness', '', 'the thing that makes an ∃ sentence true; Ann for "someone is happy"'],
  ['equisatisfiable', '', 'one is satisfiable exactly when the other is; not the same meaning']
]) +
'<p>In module 5 (lessons 8 to 10) resolution worked on clauses: a clause is a set of literals meaning their "or", and resolution joins two clauses that contain a literal and its negation. Resolution is like a machine with one input slot: it only accepts clauses. Our sentences have ∀ and ∃ in them, so they do not fit yet. This lesson is the converter.</p>' +
'<p>First the target. Take a few clauses, say {¬p(x), q(x)} and {p(a)}, and require all of them at once. A sentence rewritten as a list of clauses, all required at once (an "and" of ors), is in <b>clausal form</b>.</p>' +
'<div class="tcard"><div class="tn">clausal form</div><div class="tr"><span class="tk">Example</span><span><span class="m">{¬p(x), q(x)}</span> and <span class="m">{p(a)}</span> together: (¬p(x) ∨ q(x)) ∧ p(a)</span></div><div class="tr"><span class="tk">Formal</span><span>A sentence is in clausal form iff it is a set of clauses (each a set of literals, read as a disjunction), the whole set read as their conjunction, with all variables implicitly universally quantified.</span></div></div>' +
'<h2>Naming the unknown</h2>' +
'<p>The hard part is ∃. "Someone stole the cake" says there is a thief but not who. We cannot just delete the ∃, since that would lose "there is one". Instead, give the unknown thief a code name, say <span class="m">culprit</span>, and talk about the culprit from then on.</p>' +
'<p>A brand-new name for the one thing an ∃ promised is called a <b>Skolem constant</b>. The thing that makes the ∃ sentence true, Ann for "someone is happy", is its <b>witness</b>; the Skolem constant is a name for the witness.</p>' +
'<div class="tcard"><div class="tn">Skolem constant</div><div class="tr"><span class="tk">Example</span><span><span class="m">∃x.p(x)</span> becomes <span class="m">p(c)</span> with c a new constant</span></div><div class="tr"><span class="tk">Formal</span><span>For <span class="m">∃x.φ</span> with no enclosing ∀, a Skolem constant is a new object constant c not in Σ; replace the sentence by <span class="m">φ[x←c]</span>.</span></div></div>' +
'<div class="tcard"><div class="tn">witness</div><div class="tr"><span class="tk">Example</span><span>Ann is a witness of "someone is happy" when happy(ann) is true</span></div><div class="tr"><span class="tk">Formal</span><span>A witness of <span class="m">∃x.φ</span> under i is a ground term t in HU with <span class="m">(φ[x←t])ⁱ = 1</span>.</span></div></div>' +
'<p>Now a harder case. "Everybody has a mother" means each person has a mother, and different people have different mothers. One code name for everybody would be wrong: it would claim a single shared mother. So the code name must depend on the person: <span class="m">mother(x)</span>.</p>' +
'<p>A brand-new function that names the promised thing for each x is called a <b>Skolem function</b>. The rule: the code name may depend on every ∀ that sits outside the ∃.</p>' +
'<div class="tcard"><div class="tn">Skolem function</div><div class="tr"><span class="tk">Example</span><span><span class="m">∀x.∃y.q(x,y)</span> becomes <span class="m">∀x.q(x,f(x))</span> with f a new function symbol</span></div><div class="tr"><span class="tk">Formal</span><span>For <span class="m">∃y.φ</span> inside the scope of ∀x₁,…,∀xₙ, replace y by <span class="m">f(x₁,…,xₙ)</span> where f is a new n-ary function constant not in Σ.</span></div></div>' +
'<h2>The seven steps</h2>' +
'<p>The conversion is a recipe with seven steps. It is called <b>INSEADO</b>: the letters are the step initials, one per step. Apply the steps in order.</p>' +
'<div class="tcard"><div class="tn">INSEADO</div><div class="tr"><span class="tk">Example</span><span>I implications out, N negations in, S standardize, E existentials out, A alls out, D distribution, O operators out</span></div><div class="tr"><span class="tk">Formal</span><span>INSEADO is the seven-step procedure that converts a sentence into clausal form, in the order Implications, Negations, Standardize, Existentials, Alls, Distribution, Operators.</span></div></div>' +
'<div class="flow">' +
'<div class="fs"><b>I: Implications out</b><span class="m">φ → ψ ⇒ ¬φ ∨ ψ ;  φ ↔ ψ ⇒ (¬φ ∨ ψ) ∧ (φ ∨ ¬ψ)</span></div>' +
'<div class="fs"><b>N: Negations in</b><span>Double negation, De Morgan, <span class="m">¬∀x.φ ⇒ ∃x.¬φ</span>, <span class="m">¬∃x.φ ⇒ ∀x.¬φ</span></span></div>' +
'<div class="fs"><b>S: Standardize</b><span>Own variable per quantifier: <span class="m">∀x.p(x) ∨ ∀x.q(x) ⇒ ∀x.p(x) ∨ ∀y.q(y)</span></span></div>' +
'<div class="fs"><b>E: Existentials out</b><span>Replace each ∃-variable by a Skolem constant or Skolem function of the enclosing ∀-variables (and free variables)</span></div>' +
'<div class="fs"><b>A: Alls out</b><span>Drop the ∀ prefixes; variables stay implicitly universal</span></div>' +
'<div class="fs"><b>D: Distribution</b><span class="m">φ ∨ (ψ ∧ χ) ⇒ (φ ∨ ψ) ∧ (φ ∨ χ)</span></div>' +
'<div class="fs"><b>O: Operators out</b><span>Each conjunct (one part of an "and") is a clause; each disjunction is the set of its literals</span></div></div>' +
'<h2>The Skolem trick</h2>' +
'<p>"There exists y with g(y)" cannot just lose its ∃. Give the witness a new name.</p>' +
'<div class="vs"><div class="good"><h4>NO ENCLOSING ∀: CONSTANT</h4><p class="m">∃x.p(x) ⇒ p(a)</p><p>a is a new constant.</p></div>' +
'<div class="good"><h4>INSIDE A ∀: FUNCTION</h4><p class="m">∀x.∃y.q(x,y) ⇒ ∀x.q(x,f(x))</p><p>f is a new function symbol.</p></div></div>' +
'<p>The Skolem term must mention every enclosing ∀-variable; a constant is right only when no ∀ encloses it.</p>' +
'<div class="callout example"><b class="t">EXAMPLES FROM THE LECTURE (15 AND 16)</b>' +
'<p class="m">∃y.(g(y) ∧ ∀z.(r(z) → f(y,z)))</p>' +
'<p>The ∃ is outermost, so a constant works: clauses {g(c₁)} and {¬r(z), f(c₁,z)}.</p>' +
'<p>Now the negation <span class="m">¬∃y.(g(y) ∧ ∀z.(r(z) → f(y,z)))</span>.</p>' +
'<p>Step N pushes ¬ inside, and it reads <span class="m">∀y.(¬g(y) ∨ ∃z.(r(z) ∧ ¬f(y,z)))</span>.</p>' +
'<p>The ∃z is inside ∀y, so z becomes a function h(y): {¬g(y), r(h(y))} and {¬g(y), ¬f(y,h(y))}.</p></div>' +
'<p>Now try it. The converter shows each INSEADO step on the loaded sentence. Click the presets and check, for each ∃, whether a constant or a function appears.</p>' +
TIP +
'{{w:cnf|{"title":"INSEADO CONVERTER","mode":"fol","formula":"~exists y. (g(y) & forall z. (r(z) -> f(y,z)))","presets":["exists y. (g(y) & forall z. (r(z) -> f(y,z)))","forall x. exists y. loves(x,y)","~forall x. forall y. loves(x,y)","forall x. p(x) | forall x. q(x)"]}}}' +
'<p>One caution about what the conversion promises. The new Skolem names did not exist in the original sentence, so the clauses cannot mean exactly the same thing. What survives is satisfiability: if one is satisfiable, so is the other. Two sentences like that are called <b>equisatisfiable</b>.</p>' +
'<div class="tcard"><div class="tn">equisatisfiable</div><div class="tr"><span class="tk">Example</span><span><span class="m">∃x.p(x)</span> and <span class="m">p(c)</span> (c a new constant): both satisfiable, yet not equivalent</span></div><div class="tr"><span class="tk">Formal</span><span>Sentences φ and ψ are equisatisfiable iff φ is satisfiable exactly when ψ is satisfiable.</span></div></div>' +
'<div class="callout warn"><b class="t">EQUISATISFIABLE, NOT EQUIVALENT</b>' +
'<div class="vs"><div class="bad"><h4>NOT</h4><p>Logically equivalent: Skolem symbols are new.</p></div><div class="good"><h4>BUT</h4><p>Equisatisfiable: the input is satisfiable iff the clauses are. That is enough, since entailment is tested by unsatisfiability.</p></div></div>' +
'<p>Always standardize before Skolemizing, or different quantifiers capture each other\'s variables.</p>' +
'<p>The converter picks its own names for Skolem symbols, so they may differ from c₁ and h in the lecture text.</p></div>',
      quiz: [
        { q: 'Skolemize ∀x.∃y.q(x,y).', o: [
          ok('q(x, f(x)) with f a new function', 'The witness y may depend on x.'),
          no('q(x, c) with c a new constant', 'A constant would make y the same for all x; that is the stronger statement ∃y.∀x.q(x,y).'),
          no('q(x, y)', 'The existential must be replaced by a Skolem term.')] },
        { q: 'The clausal form of ϕ is satisfiable. What follows?', o: [
          ok('ϕ is satisfiable', 'INSEADO preserves satisfiability in both directions.'),
          no('ϕ is equivalent to its clausal form', 'Skolem symbols are new, so equivalence fails.'),
          no('ϕ is valid', 'Satisfiable does not mean valid.')] },
        { q: 'Which step is done before Skolemizing and dropping ∀?', o: [
          ok('S, standardize variables', 'Otherwise ∀x.p(x) ∨ ∀x.q(x) would give the two quantifiers the same variable.'),
          no('D, distribution', 'D comes after A.'),
          no('O, operators out', 'O is last.')] }
      ] },

    { n: 9, title: 'Substitutions and unification', sub: 'Making two expressions equal by replacing variables.',
      html: '' +
'<p class="lead">"Ann knows ___" and "___ knows Bob" have blanks. What do you write in the blanks so both read the same?</p>' +
G([
  ['substitution', 'σ, τ, θ', 'a list of replacements for variables; {x←a} replaces x by a'],
  ['replacement', 'x←t', 'read "x is replaced by t"; y←f(b) replaces y by f(b)'],
  ['apply', 'φσ', 'carry out the replacements of σ on φ; p(x)σ with σ = {x←a} is p(a)'],
  ['composition', 'στ', 'one substitution that does σ then τ in a single step'],
  ['unifier', '', 'a substitution that makes two expressions identical; {x←a, y←b} for p(x,b) and p(a,y)'],
  ['most general unifier', 'mgu', 'the unifier that commits to the least; every other unifier is a special case of it'],
  ['compound term', '', 'a function applied to arguments; f(b), g(a,x)'],
  ['functor', '', 'the function symbol at the front of a compound term; f in f(b)'],
  ['clash', '', 'two different fixed names that cannot be made equal; a and b'],
  ['occur check', '', 'the test that a variable is not inside the term it is set to; x inside f(x)']
]) +
'<p>Lesson 2 gave us terms (names built from constants, variables and functions) and lesson 3 gave us variables. Here is a new problem: resolution cancels a literal against its negation, but p(a) and ¬p(x) are not identical. How do we decide when two expressions "match"?</p>' +
'<h2>Filling blanks</h2>' +
'<p>Take the two patterns <span class="m">knows(x, bob)</span> and <span class="m">knows(ann, y)</span>. They differ, but only in their blanks.</p>' +
'<p>Put ann in x and bob in y. Both now read <span class="m">knows(ann, bob)</span>.</p>' +
'<p>Notice that we invented no extra facts. We filled only the blanks that had to be filled, with exactly what was needed.</p>' +
'<p>A fill-in that makes two expressions identical is called a <b>unifier</b>. The one that commits to the least, so that every other unifier is a special case of it, is the <b>most general unifier</b>, written mgu. Here {x←ann, y←bob} is both.</p>' +
'<div class="tcard"><div class="tn">unifier</div><div class="tr"><span class="tk">Example</span><span><span class="m">{x←ann, y←bob}</span> unifies <span class="m">knows(x,bob)</span> and <span class="m">knows(ann,y)</span>: both become <span class="m">knows(ann,bob)</span></span></div><div class="tr"><span class="tk">Formal</span><span>A substitution σ is a unifier of expressions φ and ψ iff <span class="m">φσ = ψσ</span>.</span></div></div>' +
'<div class="tcard"><div class="tn">most general unifier (mgu)</div><div class="tr"><span class="tk">Example</span><span>For <span class="m">p(x,y)</span> and <span class="m">p(a,v)</span>: mgu <span class="m">{x←a, y←v}</span>; <span class="m">{x←a, y←b, v←b}</span> is a less general unifier</span></div><div class="tr"><span class="tk">Formal</span><span>A unifier σ of φ and ψ is most general iff for every unifier θ of φ and ψ there is a substitution δ with <span class="m">θ = σδ</span>.</span></div></div>' +
'<p>This is what resolution needs. With variables, two literals only look alike after the blanks are filled.</p>' +
'<h2>Substitutions</h2>' +
'<p>Each single fill-in, like putting ann in x, is worth a name. It is called a <b>replacement</b>, written x←t and read "x is replaced by t", as y←f(b) replaces y by f(b).</p>' +
'<div class="tcard"><div class="tn">replacement (x←t)</div><div class="tr"><span class="tk">Example</span><span><span class="m">x←a</span>, <span class="m">y←f(b)</span>, <span class="m">v←w</span></span></div><div class="tr"><span class="tk">Formal</span><span>A replacement <span class="m">x←t</span> pairs a variable x with a term t, read "x is replaced by t".</span></div></div>' +
'<p>One list of such fill-ins, done together, is a <b>substitution</b>: a finite set of replacements, each variable ← term. We write σ, τ, θ for substitutions:</p>' +
'<p class="m">{x←a, y←f(b), v←w}</p>' +
'<div class="tcard"><div class="tn">substitution (σ, τ, θ)</div><div class="tr"><span class="tk">Example</span><span><span class="m">σ = {x←a, y←f(b), v←w}</span></span></div><div class="tr"><span class="tk">Formal</span><span>A substitution is a finite set of replacements <span class="m">{x₁←t₁,…,xₙ←tₙ}</span> with distinct variables xᵢ, each tᵢ a term.</span></div></div>' +
'<p>Carrying out a substitution on an expression is to <b>apply</b> it. Applying σ to φ is written φσ, and all replacements happen at once. Under the substitution above, <span class="m">p(x,x,y,z)</span> becomes <span class="m">p(a,a,f(b),z)</span>. With σ = {x←a}, p(x)σ is p(a).</p>' +
'<div class="tcard"><div class="tn">apply (φσ)</div><div class="tr"><span class="tk">Example</span><span><span class="m">p(x,x,y,z){x←a, y←f(b), v←w} = p(a,a,f(b),z)</span></span></div><div class="tr"><span class="tk">Formal</span><span>φσ is the expression obtained from φ by simultaneously replacing every occurrence of each variable xᵢ of σ by its term tᵢ.</span></div></div>' +
'<p>Sometimes we fill blanks twice, once and then again. Apply σ, then τ. This is a cascade, written <span class="m">(φσ)τ</span>. Could one single list of fill-ins do the same job in one go?</p>' +
'<p>Yes, and that list is called the <b>composition</b> στ: one substitution that does both in a single step, <span class="m">(φσ)τ = φ(στ)</span>.</p>' +
'<div class="tcard"><div class="tn">composition (στ)</div><div class="tr"><span class="tk">Example</span><span>σ = {x←a, y←f(u), z←v}, τ = {u←d, v←e, z←g}: <span class="m">στ = {x←a, y←f(d), z←e, u←d, v←e}</span></span></div><div class="tr"><span class="tk">Formal</span><span>στ is obtained from σ by applying τ to each right-hand side, adding every pair of τ whose variable is not a variable of σ, and deleting pairs x←x; then <span class="m">(φσ)τ = φ(στ)</span>.</span></div></div>' +
'<p>How to build στ, in three moves:</p>' +
'<div class="flow"><div class="fs"><b>Apply τ</b><span>to the right sides of σ</span></div><div class="fs"><b>Add</b><span>the pairs of τ whose variable is not in σ</span></div><div class="fs"><b>Delete</b><span>any x←x</span></div></div>' +
'<div class="callout example"><b class="t">EXAMPLE FROM THE LECTURE</b>' +
'<p class="m">σ = {x←a, y←f(u), z←v},  τ = {u←d, v←e, z←g}</p>' +
'<p>Step 1: apply τ to the right sides of σ. a stays a. f(u) becomes f(d). v becomes e. That gives x←a, y←f(d), z←e.</p>' +
'<p>Step 2: add the pairs of τ whose variable is not in σ. u←d and v←e are new; z←g is not, since z is already in σ.</p>' +
'<p>Step 3: delete any x←x. There is none.</p>' +
'<div class="big">στ = {x←a, y←f(d), z←e, u←d, v←e}<small>the pair z←g is dropped because z is already in σ</small></div></div>' +
'<p>Try it. Type σ and τ (the loaded ones are the lecture example) and an expression. The tool shows the result after σ, after τ, and the composed στ.</p>' +
'{{w:subst|{"title":"APPLY AND COMPOSE","expr":"r(x, y, z)","sigma":"{x <- a, y <- f(u), z <- v}","tau":"{u <- d, v <- e, z <- g}"}}}' +
'<h2>Unifiers and the mgu</h2>' +
'<p>Now the precise statement. A substitution σ is a <b>unifier</b> of φ and ψ when φσ = ψσ. There can be many. For p(x,y) and p(a,v), one unifier is overkill and one is just enough:</p>' +
'<div class="vs"><div class="neutral"><h4>UNIFIERS</h4><p class="m">{x←a, y←b, v←b}</p><p class="m">{x←a, y←v}</p></div><div class="good"><h4>MGU</h4><p>Every other unifier is obtained from it by further substitution.</p><p class="m">{x←a, y←v}</p><p>more general than <span class="m">{x←a, y←f(c), v←f(c)}</span></p></div></div>' +
'<h2>Variable or constant? It decides everything</h2>' +
'<div class="vs"><div class="good"><h4>VARIABLE, e.g. x, y, z, u</h4><p>An empty name tag: it can be filled in with any term.</p><p class="m">y ← a is allowed</p></div>' +
'<div class="bad"><h4>CONSTANT, e.g. a, b, 0, jack</h4><p>One fixed object: it can never be replaced.</p><p class="m">b ← a is impossible</p></div></div>' +
'<p>Unification only changes variables. Take <span class="m">p(x,x)</span> against two different partners. Watch for two fixed names that cannot be made equal, such as a and b: that is a <b>clash</b>.</p>' +
'<div class="tcard"><div class="tn">clash</div><div class="tr"><span class="tk">Example</span><span><span class="m">a</span> against <span class="m">b</span> in <span class="m">p(x,x)</span> with <span class="m">p(a,b)</span></span></div><div class="tr"><span class="tk">Formal</span><span>A clash occurs when two expressions to be unified are different constants, a constant and a compound term, or compound terms with different functors or arities; unification then fails.</span></div></div>' +
'<div class="vs"><div class="good"><h4>p(x,x) with p(a,y)</h4><p>x ← a, then a against y: y is a variable, so y ← a. Unifier {x ← a, y ← a}.</p></div>' +
'<div class="bad"><h4>p(x,x) with p(a,b)</h4><p>x ← a, then a against b: both are constants and they differ. No unifier.</p></div></div>' +
'<p>One more trap. Try to set x to f(x). Then x is f(x), which is f(f(x)), and so on without end: no finite term fits. A variable cannot be set to a term that contains it. The test for this is called the <b>occur check</b>: x must not appear inside the term it is set to, as x inside f(x).</p>' +
'<div class="tcard"><div class="tn">occur check</div><div class="tr"><span class="tk">Example</span><span><span class="m">x←f(x)</span> fails; <span class="m">x←f(y)</span> passes</span></div><div class="tr"><span class="tk">Formal</span><span>Before adding <span class="m">x←t</span>, check that x does not occur in t (t ≠ x); if it does, unification fails.</span></div></div>' +
'<h2>The unification algorithm</h2>' +
'<p>Keep a running substitution θ, empty at the start. Compare the two expressions and apply the first case that fits. A function applied to arguments, such as f(b) or g(a,x), is a <b>compound term</b>, and the function symbol at its front (f in f(b)) is its <b>functor</b>.</p>' +
'<div class="tcard"><div class="tn">compound term</div><div class="tr"><span class="tk">Example</span><span><span class="m">f(b)</span>, <span class="m">g(a,x)</span></span></div><div class="tr"><span class="tk">Formal</span><span>A compound term is a term <span class="m">f(t₁,…,tₙ)</span> with n ≥ 1, where f is an n-ary function constant and each tᵢ is a term.</span></div></div>' +
'<div class="tcard"><div class="tn">functor</div><div class="tr"><span class="tk">Example</span><span>f in <span class="m">f(b)</span>; g in <span class="m">g(a,x)</span></span></div><div class="tr"><span class="tk">Formal</span><span>The functor of a compound term <span class="m">f(t₁,…,tₙ)</span> is its outermost function symbol f (with arity n).</span></div></div>' +
'<div class="flow"><div class="fs"><b>Identical</b><span>Succeed.</span></div>' +
'<div class="fs"><b>Clash</b><span>Different constants, a constant against a compound term, or different function symbols: fail.</span></div>' +
'<div class="fs"><b>Variable x</b><span>Already bound in θ: unify its binding with the other side. Else if x occurs in the other side, fail (occur check); else add x ← other.</span></div>' +
'<div class="fs"><b>Compound</b><span>Same functor and arity: unify argument by argument, passing θ along.</span></div></div>' +
'<p>Work through the four lecture cases: click each preset, press run, and read the trace line by line. Each line shows the pair being compared and the current θ. Look for where it succeeds, where it clashes, and where the occur check fires.</p>' +
'{{w:unifier|{"title":"UNIFICATION TRACE","a":"p(x, b)","b":"p(a, y)","presets":[{"a":"p(x, b)","b":"p(a, y)","label":"p(x,b) / p(a,y)"},{"a":"p(x, x)","b":"p(a, y)","label":"p(x,x) / p(a,y)"},{"a":"p(x, x)","b":"p(a, b)","label":"p(x,x) / p(a,b)"},{"a":"p(x, x)","b":"p(y, f(y))","label":"p(x,x) / p(y,f(y))"}]}}}' +
'<div class="callout warn"><b class="t">OCCUR CHECK</b>' +
'<div class="chain"><span class="m">p(x,x) / p(y,f(y))</span><i>x ← y, then y = f(y)</i><span>infinite term f(f(f(…)))</span><i>→</i><span class="tag bad">fail</span></div>' +
'<p>Do not skip the check when deciding unifiability by hand.</p>' +
'<details class="more"><summary>Prolog</summary><p>Prolog\'s plain <code>=</code> omits this check and can build such terms; <code>unify_with_occurs_check/2</code> does full unification.</p></details></div>',
      quiz: [
        { q: 'Is p(x,x) unifiable with p(a,b)?', o: [
          ok('No', 'x ← a first, then a and b are different constants.'),
          no('Yes, with {x←a, x←b}', 'A variable gets one binding.'),
          no('Yes, with {x←a}', 'Under {x←a} the second expression is p(a,b), the first p(a,a): not equal.')] },
        { q: 'Why does p(x,x) fail against p(y,f(y))?', o: [
          ok('Occur check: y occurs in f(y)', 'After x ← y, the second argument asks y = f(y).'),
          no('Different predicates', 'Both use p.'),
          no('Different arities', 'Both have two arguments.')] },
        { q: 'Which is the mgu of p(x,y) and p(a,v)?', o: [
          ok('{x←a, y←v}', 'Every other unifier is an instance of this one.'),
          no('{x←a, y←b, v←b}', 'It is a unifier but more specific than needed.'),
          no('{x←a}', 'Not a unifier: p(a,y) and p(a,v) still differ.')] }
      ] },

    { n: 10, title: 'The resolution rule with variables', sub: 'Three attempts at the rule, each fixing a failure of the previous one.',
      html: '' +
'<p class="lead">How do you cancel "everyone who is p is s" against "a is p" when the literals only match after filling in blanks?</p>' +
G([
  ['complementary literals', '', 'a literal and its negation; p(a) and ¬p(a)'],
  ['resolvent', '', 'the new clause made by cancelling a complementary pair; {r(b), s(a)}'],
  ['rename apart', 'x′', 'give one clause fresh variable names so two clauses share none; x becomes x′'],
  ['factor', '', 'a clause after merging literals that unify; {p(x), p(y)} gives {p(x)}'],
  ['empty clause', '{}', 'a clause with no literals, meaning a contradiction; it cannot be true'],
  ['derivation', '', 'a list of clauses where each is a premise or a resolvent of earlier ones']
]) +
'<p>Propositional resolution takes {p, q} and {¬p, r} and gives {q, r}. Lesson 9 gave the mgu, the least commitment that makes two expressions equal. Clauses are from lesson 8. Now we combine them: can resolution still cancel when the two literals only match after filling blanks?</p>' +
'<h2>A small case</h2>' +
'<p>Clause 1: {¬p(x), s(x)}, read "for everyone, if p then s".</p>' +
'<p>Clause 2: {p(a)}, read "a is p".</p>' +
'<p>Look at p(a) and ¬p(x). They are not identical, so plain cancelling fails. But fill x with a, and they become p(a) and ¬p(a): one says p(a) holds, the other says it does not. They cancel.</p>' +
'<p>A literal and its negation, such as p(a) and ¬p(a), are called <b>complementary literals</b>.</p>' +
'<div class="tcard"><div class="tn">complementary literals</div><div class="tr"><span class="tk">Example</span><span><span class="m">p(a)</span> and <span class="m">¬p(a)</span>; after <span class="m">{x←a}</span>, <span class="m">p(a)</span> and <span class="m">¬p(x)</span></span></div><div class="tr"><span class="tk">Formal</span><span>Literals φ and ¬φ (the same atom, once with ¬) are complementary. With variables, φ and ¬ψ can be made complementary iff φ and ψ have a unifier: they become <span class="m">φσ</span> and <span class="m">¬φσ</span> for σ = mgu(φ, ψ).</span></div></div>' +
'<p>What is left after cancelling, with the same fill-in applied, is {s(a)}: "a is s". That new clause is the <b>resolvent</b>, and this is the resolution rule with variables.</p>' +
'<div class="tcard"><div class="tn">resolvent</div><div class="tr"><span class="tk">Example</span><span><span class="m">{¬p(x), s(x)}</span> and <span class="m">{p(a)}</span> give <span class="m">{s(a)}</span></span></div><div class="tr"><span class="tk">Formal</span><span>For clauses Φ ∪ {φ} and Ψ ∪ {¬ψ} sharing no variables, with σ = mgu(φ, ψ), the resolvent is <span class="m">(Φ ∪ Ψ)σ</span>.</span></div></div>' +
'<p>If everything cancels, nothing is left. A clause with no literals is the <b>empty clause</b> {}. It means a contradiction, since it cannot be true.</p>' +
'<div class="tcard"><div class="tn">empty clause ({})</div><div class="tr"><span class="tk">Example</span><span><span class="m">{p(a)}</span> and <span class="m">{¬p(a)}</span> resolve to <span class="m">{}</span></span></div><div class="tr"><span class="tk">Formal</span><span>The empty clause {} contains no literals; as a disjunction of nothing it is false under every assignment, so it is unsatisfiable.</span></div></div>' +
'<p>So "the same literal" now means "unifiable".</p>' +
'<p>The lecture builds the rule in three versions, each fixing a failure of the one before.</p>' +
'<div class="flow"><div class="fs"><b>Version 1: simple</b><span>Fails when clauses share a variable name.</span></div><div class="fs"><b>Version 2: rename apart</b><span>Fails when one pair leaves a literal behind.</span></div><div class="fs"><b>Version 3: factoring</b><span>Final rule.</span></div></div>' +
'<h2>Version 1: simple</h2>' +
'<p>Let σ = mgu(φ, ψ) for φ in one clause and ¬ψ in the other. The resolvent is the rest of both clauses with σ applied.</p>' +
'<div class="rule"><div class="top">{p(a,y), r(y)}   {¬p(x,b), s(x)}</div><div class="bot">{r(b), s(a)}</div><span class="why">σ = {x←a, y←b}</span></div>' +
'<div class="vs"><div class="bad"><h4>IT FAILS ON</h4><p class="m">{p(a,x)}  and  {¬p(x,b)}</p></div><div class="neutral"><h4>WHY</h4><p>The clauses are contradictory (x = b in the first, x = a in the second). But p(a,x) and p(x,b) do not unify: both use the name x.</p></div></div>' +
'<h2>Version 2: rename apart</h2>' +
'<p>A variable name only has meaning inside its own clause, like a loop variable inside its own loop. Two clauses that both say x are not talking about the same x. So give one clause fresh names first. This is to <b>rename apart</b>: {p(a,x)} becomes {p(a,x′)}. The mgu is {x′←b, x←a}, and the resolvent is {}.</p>' +
'<div class="tcard"><div class="tn">rename apart</div><div class="tr"><span class="tk">Example</span><span><span class="m">{p(a,x)}</span> becomes <span class="m">{p(a,x′)}</span> before resolving with <span class="m">{¬p(x,b)}</span></span></div><div class="tr"><span class="tk">Formal</span><span>Renaming apart replaces the variables of one clause by fresh variables so that the two clauses share no variable; this preserves the clause meaning.</span></div></div>' +
'<div class="vs"><div class="bad"><h4>IT STILL FAILS ON</h4><p class="m">{p(x), p(y)}  and  {¬p(u), ¬p(v)}</p></div><div class="neutral"><h4>WHY</h4><p>They are jointly unsatisfiable, but resolving one pair always leaves a literal behind, so {} never appears.</p></div></div>' +
'<h2>Version 3: with factoring</h2>' +
'<p>The trouble in version 2 was a clause holding two literals that say the same thing, like p(x) and p(y). We want to fold them into one. When several literals of a clause unify, we apply their mgu and merge them. The result is a <b>factor</b> of the clause.</p>' +
'<div class="tcard"><div class="tn">factor</div><div class="tr"><span class="tk">Example</span><span><span class="m">{p(x), p(y)}</span> has the factor <span class="m">{p(x)}</span>; <span class="m">{p(x), p(f(y)), r(x,y)}</span> has the factor <span class="m">{p(f(y)), r(f(y),y)}</span></span></div><div class="tr"><span class="tk">Formal</span><span>If literals φ₁,…,φₖ of a clause C unify with mgu σ, then Cσ (in which they merge into one literal) is a factor of C.</span></div></div>' +
'<div class="chain"><span class="m">{p(x), p(y)}</span><i>factor</i><span class="m">{p(x)}</span><i>with</i><span class="m">{¬p(u)}</span><i>→</i><span class="m">{}</span></div>' +
'<p class="m">{p(x), p(f(y)), r(x,y)} has the factor {p(f(y)), r(f(y), y)} via {x←f(y)}.</p>' +
'<div class="big">Final rule<small>rename, factor, unify one literal against a complementary one, drop the pair, apply the mgu to the rest</small></div>' +
'<h2>Try it</h2>' +
'<p>The tool renames apart and factors for you. Load the first preset, click a literal in each clause to resolve them, and use the factor button to merge literals in one clause. Keep going until the empty clause {} appears.</p>' +
TIP +
'{{w:refute|{"title":"RESOLUTION WITH VARIABLES","mode":"fol","premises":["p(x) | p(y)","~p(u) | ~p(v)"],"presets":[{"label":"p(x)∨p(y) with ¬p(u)∨¬p(v)","premises":["p(x) | p(y)","~p(u) | ~p(v)"]},{"label":"{p(a,x)} with {¬p(x,b)}","premises":["p(a,x)","~p(x,b)"]},{"label":"grandparent (Example 25)","premises":["p(art,bob)","p(art,bud)","p(bob,cal)","p(bud,coe)","~p(x,y) | ~p(y,z) | g(x,z)"]}]}}}' +
'<div class="callout example"><b class="t">EXAMPLE 25: GRANDPARENT</b>' +
'<p>Read p(x,y) as "x is a parent of y" and g(x,z) as "x is a grandparent of z". The rule {¬p(x,y), ¬p(y,z), g(x,z)} says: if x is a parent of y and y of z then x is a grandparent of z.</p>' +
'<div class="chain"><span class="m">{p(art,bob)} + rule</span><i>→</i><span class="m">{¬p(bob,z), g(art,z)}</span><i>+ {p(bob,cal)} →</i><span class="m">{g(art,cal)}</span></div>' +
'<p>Step 1: unify p(art,bob) with p(x,y): x←art, y←bob. The rule becomes {¬p(bob,z), g(art,z)}.</p>' +
'<p>Step 2: unify p(bob,cal) with p(bob,z): z←cal. The result is {g(art,cal)}, so Art is Cal\'s grandparent.</p></div>' +
'<p>A resolution <i>derivation</i> is a list where each clause is a premise or a resolvent of earlier ones.</p>',
      quiz: [
        { q: 'Why must the variables of one clause be renamed apart before resolving?', o: [
          ok('Variables are local to a clause; sharing a name can block a valid unification', '{p(a,x)} and {¬p(x,b)} are contradictory but p(a,x), p(x,b) do not unify.'),
          no('To make the clauses shorter', 'Renaming does not change length.'),
          no('Because variables must be constants', 'Renaming only changes variable names.')] },
        { q: '{p(x), p(y)} and {¬p(u), ¬p(v)} resolve to {} only with', o: [
          ok('factoring', 'Merge the two literals in each clause first.'),
          no('renaming alone', 'Renaming leaves one literal behind in every resolvent.'),
          no('a second premise', 'The two clauses already suffice.')] },
        { q: 'A resolvent of two clauses always contains', o: [
          ok('the mgu applied to the rest of both clauses', 'Every remaining literal receives σ.'),
          no('the unified literal', 'The complementary pair is removed.'),
          no('only literals of the first clause', 'Literals of both clauses are kept.')] }
      ] },

    { n: 11, title: 'Resolution proofs and answer extraction', sub: 'Refute the negated goal, then read answers off the derivation.',
      html: '' +
'<p class="lead">How can a program prove a claim, and how can it tell you which thing makes the claim true?</p>' +
G([
  ['goal', '', 'the sentence we want to prove; "everybody loves everybody"'],
  ['negated goal', '¬φ', 'the goal with ¬ in front; we assume it and look for a contradiction'],
  ['refutation', '', 'a derivation of the empty clause {} that shows a set of clauses is unsatisfiable'],
  ['refutation-complete', '', 'if the clauses are unsatisfiable, resolution can always reach {}'],
  ['generatively complete', '', 'able to derive every consequence directly; resolution is not'],
  ['Peirce\'s law', '', 'a valid sentence that needs no premises: ((p → q) → p) → p'],
  ['answer extraction', '', 'reading off which values make a sentence true, not just yes or no'],
  ['Fitch', '', 'the natural deduction proof system of module 5, step 7']
]) +
'<p>Lesson 8 turns sentences into clauses, lesson 10 gives the resolution rule, and {} is the empty clause, a contradiction. Put them together: how can resolution, which only cancels literals, prove anything?</p>' +
'<h2>Proof by contradiction</h2>' +
'<p>You want to show "the cookie jar is not empty". Assume the opposite: it is empty. If that leads to nonsense with what you know, your assumption was wrong.</p>' +
'<p>Resolution does the same. The sentence we want to prove is the <b>goal</b>. Assume the goal is false, add that to the premises, and look for a contradiction. The goal with ¬ in front is called the <b>negated goal</b>.</p>' +
'<div class="tcard"><div class="tn">goal</div><div class="tr"><span class="tk">Example</span><span><span class="m">∀x.∀y.loves(x,y)</span> (everybody loves everybody)</span></div><div class="tr"><span class="tk">Formal</span><span>The goal is the sentence φ to be shown to follow from the premises Δ, that is, <span class="m">Δ ⊨ φ</span>.</span></div></div>' +
'<div class="tcard"><div class="tn">negated goal</div><div class="tr"><span class="tk">Example</span><span><span class="m">¬∀x.∀y.loves(x,y)</span>, which gives the clause <span class="m">{¬loves(jack,jill)}</span></span></div><div class="tr"><span class="tk">Formal</span><span>The negated goal is ¬φ; since <span class="m">Δ ⊨ φ</span> iff <span class="m">Δ ∪ {¬φ}</span> is unsatisfiable, we convert Δ ∪ {¬φ} to clauses and refute it.</span></div></div>' +
'<div class="flow"><div class="fs"><b>Write</b><span>The premises and the negated goal.</span></div><div class="fs"><b>Convert</b><span>Every sentence to clauses (the negated goal introduces Skolem constants).</span></div><div class="fs"><b>Resolve</b><span>Using mgus, until you derive {}.</span></div></div>' +
'<p>What have we built? A chain of resolution steps that ends in {}, and so shows that a set of clauses cannot all be true. A derivation of the empty clause {} that shows a set of clauses is unsatisfiable is called a <b>refutation</b>.</p>' +
'<div class="tcard"><div class="tn">refutation</div><div class="tr"><span class="tk">Example</span><span>Example 26: clauses 1 to 5 end in <span class="m">{}</span>, so the clause set is unsatisfiable</span></div><div class="tr"><span class="tk">Formal</span><span>A refutation of a set of clauses Γ is a resolution derivation from Γ whose last clause is the empty clause {}.</span></div></div>' +
'<p>How strong is this? If the clauses really are unsatisfiable, repeated resolution will always reach {}. This property is called <b>refutation-complete</b>.</p>' +
'<div class="tcard"><div class="tn">refutation-complete</div><div class="tr"><span class="tk">Example</span><span>The unsatisfiable set <span class="m">{p(x), p(y)}, {¬p(u), ¬p(v)}</span> has a refutation (with factoring)</span></div><div class="tr"><span class="tk">Formal</span><span>Resolution is refutation-complete: if a set of clauses Γ is unsatisfiable, then there is a resolution derivation of {} from Γ.</span></div></div>' +
'<p>It is a narrower promise than it sounds. Resolution is not <b>generatively complete</b>, which means able to derive every consequence directly. For example, {p(a), ¬p(a)} follows from no premises at all, but resolution cannot derive that clause from nothing. Never derive the goal directly.</p>' +
'<div class="tcard"><div class="tn">generatively complete</div><div class="tr"><span class="tk">Example</span><span>{p(a), ¬p(a)} follows from no premises, yet resolution cannot derive it from nothing</span></div><div class="tr"><span class="tk">Formal</span><span>A proof method is generatively complete iff for every Δ and every φ with <span class="m">Δ ⊨ φ</span> it can derive φ (or its clauses) from Δ; resolution is not.</span></div></div>' +
'<details class="more"><summary>More detail</summary><p><b>Fitch</b> is the natural deduction proof system from module 5, step 7. Herbrand resolution proves exactly what Fitch proves (the inferential equivalence theorem), with a much smaller search.</p></details>' +
'<div class="callout example"><b class="t">EXAMPLE 26: EVERYBODY LOVES EVERYBODY</b>' +
'<p>Premises ∀x.∃y.loves(x,y) (everybody loves someone) and ∀u.∀v.∀w.(loves(v,w) → loves(u,v)) (if v loves anybody, everybody loves v). Goal ∀x.∀y.loves(x,y).</p>' +
'<p>The negated goal after INSEADO gives {¬loves(jack,jill)}, with jack and jill the Skolem constants for the ∃ in ¬∀x.∀y.loves(x,y).</p>' +
'<table><tr><th>#</th><th>Clause</th><th>From</th></tr>' +
'<tr><td>1</td><td class="m">{loves(x,f(x))}</td><td>premise 1</td></tr>' +
'<tr><td>2</td><td class="m">{¬loves(v,w), loves(u,v)}</td><td>premise 2</td></tr>' +
'<tr><td>3</td><td class="m">{¬loves(jack,jill)}</td><td>negated goal</td></tr>' +
'<tr><td>4</td><td class="m">{loves(u,x)}</td><td>1, 2 with v←x, w←f(x)</td></tr>' +
'<tr><td>5</td><td class="m">{}</td><td>4, 3</td></tr></table></div>' +
'<p>Now try it. Click each preset, then resolve two clauses at a time (or press the "Show a proof for me" button) until {} appears. Compare the first preset with the table above. The tool picks its own Skolem names.</p>' +
TIP +
'{{w:refute|{"title":"EXAMPLE 26","mode":"fol","premises":["forall x. exists y. loves(x,y)","forall u. forall v. forall w. (loves(v,w) -> loves(u,v))"],"goal":"forall x. forall y. loves(x,y)","presets":[{"label":"Ex 26: loves","premises":["forall x. exists y. loves(x,y)","forall u. forall v. forall w. (loves(v,w) -> loves(u,v))"],"goal":"forall x. forall y. loves(x,y)"},{"label":"Ex 28: p(x,y)","premises":["forall x. forall y. forall z. ((p(x,y) & p(y,z)) -> p(x,z))","forall x. p(x,a)","forall y. p(a,y)"],"goal":"forall x. forall y. p(x,y)"},{"label":"Ex 29: exists r","premises":["p(a)","forall x. (p(x) -> q(x))","forall x. (q(x) -> r(x))"],"goal":"exists x. r(x)"},{"label":"Peirce (Ex 27)","premises":[],"goal":"forall x. (((p(x) -> q(x)) -> p(x)) -> p(x))"}]}}}' +
'<div class="cards"><div class="card"><h3>Example 28</h3><p>A transitive-style rule and two facts.</p></div><div class="card"><h3>Example 29</h3><p>An existential goal becomes a universal negated clause.</p></div><div class="card"><h3>Example 27</h3><p>Peirce\'s law: ((p → q) → p) → p, a valid sentence that needs no premises, so none are given.</p></div></div>' +
'<h2>Answer extraction</h2>' +
'<p><b>Answer extraction</b> means reading off the <i>values</i> that make a sentence true, not just yes or no. So far a proof only says yes. Often you want more: not "is anything q?" but "who is q?".</p>' +
'<div class="tcard"><div class="tn">answer extraction</div><div class="tr"><span class="tk">Example</span><span>From <span class="m">p(x) → q(x)</span> and <span class="m">p(a)</span>, question "who is q?": add <span class="m">{¬q(z), goal(z)}</span>, derive <span class="m">{goal(a)}</span>, answer z = a</span></div><div class="tr"><span class="tk">Formal</span><span>To find values for v with <span class="m">φ(v)</span>, add the clause form of <span class="m">φ(v) → goal(v)</span> for a fresh predicate goal; a derived clause <span class="m">{goal(t)}</span> gives the answer v = t.</span></div></div>' +
'<div class="flow"><div class="fs"><b>Rewrite</b><span>Turn the question φ(v) into the rule φ(v) → goal(v), where goal is a fresh predicate.</span></div><div class="fs"><b>Derive</b><span>A goal clause.</span></div><div class="fs"><b>Read</b><span>Its arguments are the answer.</span></div></div>' +
'<div class="callout example"><b class="t">EXAMPLE</b><p>From p(x) → q(x) and p(a), find z with q(z): add {¬q(z), goal(z)}.</p>' +
'<p>Step 1: p(x) → q(x) as a clause is {¬p(x), q(x)}.</p>' +
'<p>Step 2: resolve it with {¬q(z), goal(z)}, giving {¬p(z), goal(z)}.</p>' +
'<p>Step 3: resolve that with {p(a)}, giving {goal(a)}. The answer is z = a.</p>' +
'<div class="chain"><span class="m">{¬p(x), q(x)}</span><i>→</i><span class="m">{¬p(z), goal(z)}</span><i>+ {p(a)} →</i><span class="m">{goal(a)}</span><i>→</i><span class="tag ok">z = a</span></div></div>' +
'<p>Run it below. The loaded goal clause is the question; press resolve until only a goal clause is left, and read its argument.</p>' +
'{{w:refute|{"title":"ANSWER EXTRACTION","mode":"fol","target":"goal","premises":["~p(x) | q(x)","p(a)"],"goal":"~q(z) | goal(z)"}}}' +
'<p>The workbench stops at a clause made only of goal literals and reports it as the answer.</p>' +
'<div class="callout example"><b class="t">FROM THE STANFORD BOOK §14.8: WHO IS JON\'S PARENT?</b><p>Facts: <span class="m">f(art, jon)</span> (Art is Jon\'s father), <span class="m">f(bob, kim)</span>, and the rule "every father is a parent", <span class="m">f(x, y) → p(x, y)</span>. Question: <span class="m">p(x, jon)</span>, so add <span class="m">{¬p(x, jon), goal(x)}</span>.</p>' +
'<table><tr><th>#</th><th>Clause</th><th>Why</th></tr>' +
'<tr><td>1</td><td class="m">{f(art, jon)}</td><td>Premise</td></tr>' +
'<tr><td>2</td><td class="m">{f(bob, kim)}</td><td>Premise</td></tr>' +
'<tr><td>3</td><td class="m">{¬f(x, y), p(x, y)}</td><td>Premise</td></tr>' +
'<tr><td>4</td><td class="m">{¬p(x, jon), goal(x)}</td><td>Goal</td></tr>' +
'<tr><td>5</td><td class="m">{¬f(x, jon), goal(x)}</td><td>3, 4 with y ← jon</td></tr>' +
'<tr><td>6</td><td class="m">{goal(art)}</td><td>1, 5 with x ← art</td></tr></table>' +
'<p>Answer: art. Fact 2 is never used, because kim is not jon.</p>' +
'<p>The book then changes fact 1 to "Art or Bob is Jon\'s father": <span class="m">{f(art, jon), f(bob, jon)}</span>. The proof now ends in <span class="m">{goal(art), goal(bob)}</span>, which means one of the two is the answer, but not which one. The second preset below runs this case.</p></div>' +
'{{w:refute|{"title":"WHO IS JON\'S PARENT?","mode":"fol","target":"goal","premises":["f(art, jon)","f(bob, kim)","f(x, y) -> p(x, y)"],"goal":"~p(x, jon) | goal(x)","presets":[{"label":"book §14.8","premises":["f(art, jon)","f(bob, kim)","f(x, y) -> p(x, y)"],"goal":"~p(x, jon) | goal(x)"},{"label":"Art or Bob is the father","premises":["f(art, jon) | f(bob, jon)","f(x, y) -> p(x, y)"],"goal":"~p(x, jon) | goal(x)"}]}}}' +
'<div class="callout remember"><b class="t">PITFALLS TO KEEP</b><div class="cards">' +
'<div class="card"><h3>Order</h3><p>∃y.∀x entails ∀x.∃y, not the reverse.</p></div>' +
'<div class="card"><h3>All S are P</h3><p>∀x.(S(x) → P(x)), never ∀x.(S(x) ∧ P(x)).</p></div>' +
'<div class="card"><h3>Skolem term</h3><p>A function of all enclosing ∀-variables; a constant only if none encloses it.</p></div>' +
'<div class="card"><h3>Standardize</h3><p>Before Skolemizing or dropping ∀.</p></div>' +
'<div class="card"><h3>Negate the goal</h3><p>Resolution is complete for refutation only.</p></div>' +
'<div class="card"><h3>Versions 1 and 2</h3><p>Rename apart and factor.</p></div>' +
'<div class="card"><h3>Empty</h3><p>The empty clause {} means contradiction; the empty set of clauses means true.</p></div>' +
'<div class="card"><h3>Occur check</h3><p>Do not skip it.</p></div></div></div>',
      quiz: [
        { q: 'To prove ∃x.r(x) from your premises you add which clause(s)?', o: [
          ok('{¬r(x)}, from ∀x.¬r(x)', 'The negation of an existential is universal, and the ∀ is dropped.'),
          no('{r(c)} for a Skolem constant c', 'That would assume the goal; refutation assumes its negation.'),
          no('Nothing, the goal needs no clause', 'The negated goal is what produces the contradiction.')] },
        { q: 'You derive {} from the clauses of Δ and ¬φ. This shows', o: [
          ok('Δ ⊨ φ', 'Δ together with ¬φ is unsatisfiable.'),
          no('Δ ⊨ ¬φ', 'That would require adding φ, not ¬φ.'),
          no('Δ is inconsistent', 'The contradiction may come from ¬φ only.')] },
        { q: 'In answer extraction the final clause is {goal(a)} when', o: [
          ok('z = a makes the question true', 'The arguments of the derived goal clause are the answer.'),
          no('a is a Skolem constant of the negated goal', 'Answer extraction uses the rule φ → goal, not a negated goal.'),
          no('the question has no answer', 'Then goal would not be derivable.')] }
      ] }
  ] });
})();
