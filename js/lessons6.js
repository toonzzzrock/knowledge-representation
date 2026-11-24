/* Module 6 lessons: probabilistic logic programming. */
(function () {
  var ok = function (t, why) { return { t: t, ok: true, why: why }; };
  var no = function (t, why) { return { t: t, ok: false, why: why }; };

  UI.addModule({ id: 6, title: 'Probabilistic logic programming', lessons: [

    { n: 1, title: 'Uncertainty and probability spaces', sub: 'Possible worlds, each with a probability, and events as sets of worlds.',
      html: '' +
'<p class="lead">You flip two coins. How likely is it that both land the same way?</p>' +
'<div class="callout idea"><b class="t">WORDS AND SYMBOLS YOU NEED</b><div class="cards">' +
'<div class="card"><p><b>uncertainty</b> : not knowing how things will turn out, like tomorrow\'s weather.</p></div>' +
'<div class="card"><p><b>world</b> (ω, the Greek letter omega) : one complete way things could turn out, like coin 1 heads and coin 2 tails.</p></div>' +
'<div class="card"><p><b>set of all worlds</b> (W) : the list of every world, like the four coin outcomes.</p></div>' +
'<div class="card"><p><b>probability of a world</b> (P(ω)) : a number from 0 to 1 saying how likely it is, like 0.3 for heads and heads.</p></div>' +
'<div class="card"><p><b>sum</b> (Σ, the Greek letter sigma) : add up a list of numbers, like Σ of 0.3 and 0.2 is 0.5.</p></div>' +
'<div class="card"><p><b>event</b> (E) : a group of worlds you care about, like both coins show the same side.</p></div>' +
'<div class="card"><p><b>made of worlds from W</b> (⊆) : the symbol says "every member of the left group is also in the right group", like E ⊆ W.</p></div>' +
'<div class="card"><p><b>probability of an event</b> (P(E)) : how likely the event is, found by adding its worlds.</p></div>' +
'<div class="card"><p><b>H1, T1, H2, T2</b> : H1 is coin 1 showing heads, T1 is coin 1 showing tails, and the same for coin 2.</p></div>' +
'<div class="card"><p><b>independent</b> : the coins do not affect each other, like two coins in two different rooms.</p></div>' +
'</div></div>' +
'<h2>Start with a story</h2>' +
'<p>Before the lecture gives any names, think about a single fair coin. You cannot say how it will land, but you can still say something useful: heads and tails each get 0.5.</p>' +
'<p>Now flip two coins. Before they land, you could write out every complete way the flips might turn out: heads-heads, heads-tails, tails-heads, tails-tails. That is four ways, and exactly one of them will happen.</p>' +
'<p>Each of those complete pictures is called a <b>world</b>, written ω (omega). It is not a planet. It is one full answer to "how did everything turn out?". The list of all four is the <b>set of all worlds</b>, written W.</p>' +
'<div class="tcard"><div class="tn">world (ω)</div><div class="tr"><span class="tk">Example</span><span>Coin 1 heads and coin 2 tails: <span class="m">H1T2</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>A world <span class="m">ω ∈ W</span> is one complete assignment of truth values to all the basic propositions (here the coin outcomes); exactly one world is the actual one.</span></div></div>' +
'<div class="tcard"><div class="tn">set of all worlds (W)</div><div class="tr"><span class="tk">Example</span><span><span class="m">W = {H1H2, H1T2, T1H2, T1T2}</span>, four worlds.</span></div><div class="tr"><span class="tk">Formal</span><span>W is the set of all possible worlds, the sample space of the probability space <span class="m">(W, P)</span>.</span></div></div>' +
'<p>Now ask: are all four worlds equally likely? For a fair coin and a fair coin, yes. But with a lopsided coin, no. So each world needs a number from 0 to 1, a score for how likely it is. That score is the <b>probability of a world</b>, written P(ω).</p>' +
'<div class="tcard"><div class="tn">probability of a world (P(ω))</div><div class="tr"><span class="tk">Example</span><span><span class="m">P(H1H2) = 0.5 × 0.6 = 0.3</span>.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">P : W → [0,1]</span> assigns each world a number, with <span class="m">Σ<sub>ω∈W</sub> P(ω) = 1</span>.</span></div></div>' +
'<p>To keep track of the coins we name the coin outcomes H1, T1, H2, T2: H1 is coin 1 showing heads, T1 is coin 1 showing tails, and the same for coin 2.</p>' +
'<p>Often you do not care about one world but about a whole group of them. "Both coins show the same side" is true in two worlds, heads-heads and tails-tails. Such a group of worlds you care about is called an <b>event</b>, written E.</p>' +
'<div class="tcard"><div class="tn">event (E)</div><div class="tr"><span class="tk">Example</span><span>Both coins show the same side: <span class="m">E = {H1H2, T1T2}</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>An event is a subset of the set of worlds: <span class="m">E ⊆ W</span>.</span></div></div>' +
'<p>How likely is the event? It happens if any of its worlds happens, so we add up the numbers of its worlds. This gives the <b>probability of an event</b>, written P(E).</p>' +
'<div class="tcard"><div class="tn">probability of an event (P(E))</div><div class="tr"><span class="tk">Example</span><span><span class="m">P(E) = P(H1H2) + P(T1T2) = 0.3 + 0.2 = 0.5</span>.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">P(E) = Σ<sub>ω∈E</sub> P(ω)</span>, for <span class="m">E ⊆ W</span>.</span></div></div>' +
'<p>Adding up a list of numbers is called a <b>sum</b>, written Σ (sigma). For example, the sum of 0.3 and 0.2 is 0.5.</p>' +
'<div class="tcard"><div class="tn">sum (Σ)</div><div class="tr"><span class="tk">Example</span><span><span class="m">0.3 + 0.2 = 0.5</span>; over all four worlds <span class="m">0.3 + 0.2 + 0.3 + 0.2 = 1</span>.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">Σ<sub>i∈I</sub> x<sub>i</sub></span> is the total of the numbers <span class="m">x<sub>i</sub></span> over all indices i in I.</span></div></div>' +
'<div class="callout example"><b class="t">WORKED EXAMPLE FROM THE LECTURE: TWO COINS</b><p>Coin 1 is fair: P(H1) = P(T1) = 0.5.</p><p>Coin 2 is biased: P(H2) = 0.6, P(T2) = 0.4.</p><p>How do we get a number for a world like H1H2 from the two coins? Ask yourself: does the first coin land differently because of what the second did? If the coins are flipped in two different rooms, no. Coins like that are called <b>independent</b>: they do not influence each other. For independent parts, a joint world is the product of its parts. Multiply the two numbers.</p>' +
'<table><tr><th>World</th><th>Calculation</th><th>Probability</th></tr><tr><td>H1H2</td><td>0.5 × 0.6</td><td>0.3</td></tr><tr><td>H1T2</td><td>0.5 × 0.4</td><td>0.2</td></tr><tr><td>T1H2</td><td>0.5 × 0.6</td><td>0.3</td></tr><tr><td>T1T2</td><td>0.5 × 0.4</td><td>0.2</td></tr></table>' +
'<p>Check: 0.3 + 0.2 + 0.3 + 0.2 = 1.</p>' +
'<p>The event E is both heads or both tails, so E holds the worlds H1H2 and T1T2.</p>' +
'<div class="chain"><span>E = both heads or both tails</span><i>→</i><span>0.3 + 0.2</span><i>→</i><span>P(E) = 0.5</span></div></div>' +
'<div class="tcard"><div class="tn">independent</div><div class="tr"><span class="tk">Example</span><span>Two coins in different rooms: <span class="m">P(H1 ∧ H2) = 0.5 × 0.6 = 0.3</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>Events A and B are independent iff <span class="m">P(A ∧ B) = P(A) · P(B)</span>; equivalently <span class="m">P(A | B) = P(A)</span> when <span class="m">P(B) > 0</span>.</span></div></div>' +
'<h2>The same idea, written as a definition</h2>' +
'<p>Module 5 used sets of possible worlds with no weights: a world was either possible or not. Now every world gets a weight.</p>' +
'<div class="cards">' +
'<div class="card"><h3>Probability space</h3><p>A list of worlds, plus a number for each, and the numbers add up to 1.</p><p class="m">(W, P), P : W → [0,1], Σ P(ω) = 1</p><p>Read: W is the list of worlds, and P gives each world a number from 0 to 1.</p></div>' +
'<div class="card"><h3>Event</h3><p>A group of worlds.</p><p class="m">E ⊆ W</p><p>Read: E is made of worlds from W.</p></div>' +
'<div class="card"><h3>Probability of an event</h3><p>The total of the numbers of its worlds.</p><p class="m">P(E) = Σ over ω in E of P(ω)</p><p>Read: go through each world in E and add up its number.</p></div>' +
'</div>' +
'<div class="vs"><div class="good"><h4>PROBABILITY 1</h4><p>The event is certain.</p></div><div class="bad"><h4>PROBABILITY 0</h4><p>The event is impossible.</p></div></div>' +
'<p>Before the coins land, you do not know which of the four worlds you are in. That gap in knowledge has a name: <b>uncertainty</b>. It means limited knowledge: you cannot say which world you are in.</p>' +
'<div class="tcard"><div class="tn">uncertainty</div><div class="tr"><span class="tk">Example</span><span>Before the flips, any of the four worlds H1H2, H1T2, T1H2, T1T2 may be the real one.</span></div><div class="tr"><span class="tk">Formal</span><span>Uncertainty is not knowing which world <span class="m">ω ∈ W</span> is actual; it is modelled by a probability distribution <span class="m">P</span> over W.</span></div></div>' +
'<p>More information shrinks it. If someone tells you coin 1 landed heads, two worlds are ruled out. But it may never reach zero.</p>' +
'<h2>Try it</h2>' +
'<p>Drag the two sliders to change each coin\'s chance of heads. Tick the worlds that belong to E and watch P(E) become the sum of the ticked numbers.</p>' +
'<details class="more"><summary>More detail</summary><p>Multiplying is a modelling choice (independence), not a law. It is right only when the coins really do not affect each other.</p></details>' +
'{{w:coins|{"title":"TWO COINS","p1":0.5,"p2":0.6}}}',
      quiz: [
        { q: 'The worlds of a probability space have probabilities 0.3, 0.2, 0.3 and 0.1. What is wrong?', o: [
          ok('They sum to 0.9, but they must sum to 1', 'Definition: the probabilities of all worlds add to exactly 1.'),
          no('Nothing, each value is between 0 and 1', 'Each value being in [0,1] is necessary but the total must also be 1.'),
          no('0.1 is too small to be a world', 'Any value in [0,1] is allowed for a world.')] },
        { q: 'P(H1) = 0.5, P(H2) = 0.6, coins independent. P(H1 and T2) is', o: [
          ok('0.2', '0.5 × 0.4.'),
          no('0.3', 'That is P(H1 and H2) = 0.5 × 0.6.'),
          no('1.1', 'Probabilities of independent events multiply; they are not added.')] },
        { q: 'How do you get the probability of an event?', o: [
          ok('Add the probabilities of the worlds in it', 'P(E) = Σ over ω in E of P(ω).'),
          no('Multiply the probabilities of the worlds in it', 'Multiplication is used to build a joint world from independent parts, not to sum an event.'),
          no('Take the largest world probability in it', 'The event collects all of its worlds.')] }
      ] },

    { n: 2, title: 'Logic under uncertainty: the coin game', sub: 'A certain part, an uncertain part, and one answer per world.',
      html: '' +
'<p class="lead">You pay to play a coin game with two coins. Can you expect to win money, and how likely is each prize?</p>' +
'<div class="callout idea"><b class="t">WORDS AND SYMBOLS YOU NEED</b><div class="cards">' +
'<div class="card"><p><b>fact</b> : a statement taken as true, like head1 (coin 1 shows heads).</p></div>' +
'<div class="card"><p><b>rule</b> (&lt;-) : "this holds if that holds"; the arrow reads "if", like win(10) &lt;- head1, head2.</p></div>' +
'<div class="card"><p><b>comma in a rule</b> (,) : means "and", like head1, head2 is heads on both coins.</p></div>' +
'<div class="card"><p><b>not</b> : "cannot be shown", like not win(10) means you did not win 10.</p></div>' +
'<div class="card"><p><b>knowledge base</b> (K) : a collection of facts and rules plus the uncertain part, like the whole coin game.</p></div>' +
'<div class="card"><p><b>certain part</b> (Δ, the Greek letter delta) : the rules that always hold, like the three win rules.</p></div>' +
'<div class="card"><p><b>uncertain part</b> (P₁, P₂) : the chances, like coin 1 is heads with chance 0.5.</p></div>' +
'<div class="card"><p><b>is given probability</b> (↦) : the arrow links a fact to its chance, like head1 ↦ 0.5.</p></div>' +
'<div class="card"><p><b>world\'s own knowledge base</b> (Δω) : the certain part plus that world\'s facts, like Δ plus head1 and tail2.</p></div>' +
'<div class="card"><p><b>statement</b> (φ, the Greek letter phi) : a stand-in for any claim, like win(10).</p></div>' +
'<div class="card"><p><b>follows for sure</b> (⊨, called entails) : the claim is forced by the facts and rules, like win(10) follows from Δω1.</p></div>' +
'<div class="card"><p><b>chance that K entails φ</b> (P(K ⊨ φ)) : how likely it is that φ follows for sure, like 0.3 for win(10).</p></div>' +
'<div class="card"><p><b>expected gain</b> : average winnings per play over many plays, like 2 coins per game.</p></div>' +
'</div></div>' +
'<p>Recap: lesson 1 gave every possible world a number, and an event gets the sum of its worlds.</p>' +
'<h2>Start with a story</h2>' +
'<p>The forecast says rain with chance 0.3. A rule says: if it rains, the grass is wet. There are two worlds: a rain world and a dry world.</p>' +
'<p>Stand in the rain world. Someone tells you "it rains" and you simply accept it. A statement you accept as true like this is called a <b>fact</b>.</p>' +
'<div class="tcard"><div class="tn">fact</div><div class="tr"><span class="tk">Example</span><span><span class="m">head1</span> (coin 1 shows heads); in the rain story, "it rains".</span></div><div class="tr"><span class="tk">Formal</span><span>A fact is an atom (a rule with empty body) asserted to be true in the knowledge base.</span></div></div>' +
'<p>Now put the fact next to the rule. Must the grass be wet? Yes, there is no way around it. When the rule and the facts force a claim, we say the claim <b>follows for sure</b>. The symbol is ⊨, and the word is entails.</p>' +
'<div class="tcard"><div class="tn">follows for sure (⊨, entails)</div><div class="tr"><span class="tk">Example</span><span>Rain and "rain implies wet grass" force wet grass; <span class="m">Δω1 ⊨ win(10)</span> in the coin game.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">Δ ⊨ φ</span> iff every model of Δ (every truth assignment satisfying all of Δ) also satisfies φ.</span></div></div>' +
'<p>Now stand in the dry world. Rain is never mentioned, and no rule lets you derive it. We write <b>not</b> for that situation: not rains means rains cannot be shown. So in the dry world the grass is not forced to be wet.</p>' +
'<div class="tcard"><div class="tn">not</div><div class="tr"><span class="tk">Example</span><span><span class="m">not rains</span> in the dry world; <span class="m">not win(10)</span> when win(10) cannot be derived.</span></div><div class="tr"><span class="tk">Formal</span><span>Negation as failure: <span class="m">not a</span> holds iff <span class="m">a</span> cannot be derived from the program.</span></div></div>' +
'<p>Count the worlds where the grass is forced to be wet. Only the rain world, so the chance of wet grass is the chance of that world: 0.3. That is the whole method.</p>' +
'<p>To talk about this without naming one particular claim each time, we use a letter. φ (phi) stands for any <b>statement</b>, a claim like "the grass is wet" or win(10).</p>' +
'<div class="tcard"><div class="tn">statement (φ)</div><div class="tr"><span class="tk">Example</span><span><span class="m">φ = win(10)</span>, or "the grass is wet".</span></div><div class="tr"><span class="tk">Formal</span><span>φ is a placeholder for any formula (query) whose entailment from a knowledge base we ask about.</span></div></div>' +
'<p>We also need one name for everything we were given: the facts, the rules and the chances. That whole collection is called the <b>knowledge base</b>, written K.</p>' +
'<div class="tcard"><div class="tn">knowledge base (K)</div><div class="tr"><span class="tk">Example</span><span>The coin game: three win rules, plus <span class="m">P₁</span> and <span class="m">P₂</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>A probabilistic knowledge base <span class="m">K = (Δ, P₁, ..., Pₙ)</span>: a certain logic program Δ plus probabilistic choices <span class="m">Pᵢ</span>, each a distribution over facts.</span></div></div>' +
'<p>The number we just found is "the total chance of the worlds where φ follows for sure". We write it P(K ⊨ φ) and call it the <b>chance that K entails φ</b>.</p>' +
'<div class="tcard"><div class="tn">chance that K entails φ (P(K ⊨ φ))</div><div class="tr"><span class="tk">Example</span><span><span class="m">P(K ⊨ win(10)) = P(ω1) = 0.3</span>.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">P(K ⊨ φ) = Σ P(ω)</span> over all worlds ω with <span class="m">Δω ⊨ φ</span>.</span></div></div>' +
'<div class="callout example"><b class="t">THE COIN GAME FROM THE LECTURE</b><p>Win 10 if both coins are heads. Lose 5 if coin 1 is heads and coin 2 is tails. Otherwise it is a draw.</p>' +
'<pre class="code">win(10) &lt;- head1, head2.\nwin(-5) &lt;- head1, tail2.\nwin(0)  &lt;- not win(10), not win(-5).</pre>' +
'<p>Read the first rule: win(10) holds if head1 and head2 hold. What does the comma between head1 and head2 do? Both must hold for the rule to fire, so a <b>comma in a rule</b> means "and".</p>' +
'<p>Now sort what we have into two piles. Ask of each item: does it change from play to play? The three rules are the same every time you play, so they form the <b>certain part</b>, written Δ (delta).</p>' +
'<p>What does change is how the coins land. The chances of those outcomes form the <b>uncertain part</b>, written P₁ for coin 1 and P₂ for coin 2: P₁ = {head1 ↦ 0.5, tail1 ↦ 0.5} and P₂ = {head2 ↦ 0.6, tail2 ↦ 0.4}.</p>' +
'<p>The arrow ↦ links a fact to its chance. head1 ↦ 0.5 reads: head1 is given probability 0.5.</p></div>' +
'<div class="tcard"><div class="tn">comma in a rule</div><div class="tr"><span class="tk">Example</span><span><span class="m">win(10) &lt;- head1, head2.</span> fires only if both coins are heads.</span></div><div class="tr"><span class="tk">Formal</span><span>In a rule <span class="m">h &lt;- b₁, ..., bₙ</span> the body is the conjunction <span class="m">b₁ ∧ ... ∧ bₙ</span>.</span></div></div>' +
'<div class="tcard"><div class="tn">certain part (Δ)</div><div class="tr"><span class="tk">Example</span><span>The three rules for win(10), win(-5) and win(0).</span></div><div class="tr"><span class="tk">Formal</span><span>Δ is the deterministic logic program of the knowledge base: its facts and rules hold in every world.</span></div></div>' +
'<div class="tcard"><div class="tn">uncertain part (P₁, P₂)</div><div class="tr"><span class="tk">Example</span><span><span class="m">P₁ = {head1 ↦ 0.5, tail1 ↦ 0.5}</span>, <span class="m">P₂ = {head2 ↦ 0.6, tail2 ↦ 0.4}</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>Each <span class="m">Pᵢ</span> is a probability distribution over a set of mutually exclusive alternative facts (probabilities sum to 1); a world picks one alternative from each <span class="m">Pᵢ</span>.</span></div></div>' +
'<div class="tcard"><div class="tn">is given probability (↦)</div><div class="tr"><span class="tk">Example</span><span><span class="m">head1 ↦ 0.5</span>: head1 has probability 0.5.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">a ↦ p</span> in <span class="m">Pᵢ</span> means alternative fact a is chosen with probability p, with <span class="m">0 ≤ p ≤ 1</span>.</span></div></div>' +
'<h2>The idea, in two parts</h2>' +
'<div class="vs"><div class="good"><h4>CERTAIN PART Δ</h4><p>Ordinary logic rules that always hold.</p></div><div class="neutral"><h4>UNCERTAIN PART</h4><p>The chances of the coin outcomes.</p></div></div>' +
'<p>Reasoning means drawing logical conclusions from both parts together.</p>' +
'<p>Suppose the coins have landed: coin 1 heads, coin 2 tails. In that world the rules still apply, and now we also know two facts. The rulebook you would use there has a name: the <b>world\'s own knowledge base</b>, written Δω. It is the certain part plus that world\'s facts, here Δ plus head1 and tail2.</p>' +
'<div class="tcard"><div class="tn">world\'s own knowledge base (Δω)</div><div class="tr"><span class="tk">Example</span><span>For the world with coin 1 heads and coin 2 tails: Δ plus <span class="m">head1</span> and <span class="m">tail2</span>.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">Δω = Δ ∪ {f₁, ..., fₙ}</span>, where <span class="m">fᵢ</span> is the alternative fact chosen from <span class="m">Pᵢ</span> in world ω.</span></div></div>' +
'<h2>How to answer a question</h2>' +
'<div class="flow"><div class="fs"><b>List worlds</b><span>One outcome per coin, with probabilities.</span></div><div class="fs"><b>Build Δω</b><span>Add the world\'s facts to Δ.</span></div><div class="fs"><b>Ask logic</b><span>Does Δω prove win(10)?</span></div><div class="fs"><b>Add up</b><span>Sum the worlds where yes.</span></div></div>' +
'<div class="big"><span class="m">P(K ⊨ φ) = Σ P(ω) over worlds ω with Δω ⊨ φ</span><small>Read: add the numbers of exactly those worlds whose own knowledge base forces φ. That last step is the whole formula.</small></div>' +
'<div class="callout example"><b class="t">WORKED EXAMPLE, EVERY STEP</b>' +
'<p>Step 1: the four worlds and their numbers come from lesson 1: 0.3, 0.2, 0.3, 0.2.</p>' +
'<table><tr><th>World</th><th>Facts added to Δ</th><th>What the rules prove</th><th>Number</th></tr>' +
'<tr><td>ω1</td><td>head1, head2</td><td>win(10)</td><td>0.5 × 0.6 = 0.3</td></tr>' +
'<tr><td>ω2</td><td>head1, tail2</td><td>win(-5)</td><td>0.5 × 0.4 = 0.2</td></tr>' +
'<tr><td>ω3</td><td>tail1, head2</td><td>win(0)</td><td>0.5 × 0.6 = 0.3</td></tr>' +
'<tr><td>ω4</td><td>tail1, tail2</td><td>win(0)</td><td>0.5 × 0.4 = 0.2</td></tr></table>' +
'<p>Step 2: win(10) is proved only in ω1, so P(win(10)) = 0.3.</p>' +
'<p>Step 3: win(-5) is proved only in ω2, so P(win(-5)) = 0.2.</p>' +
'<p>Step 4: draw is proved in ω3 and ω4, so the chance of a draw is 0.3 + 0.2 = 0.5.</p></div>' +
'<h2>Try it</h2>' +
'<p>Change the coin probabilities, then read the table: every world shows what it proves and the totals are the sums of the matching rows.</p>' +
'{{w:coingame|{"title":"THE COIN GAME, WORLD BY WORLD"}}}' +
'<div class="facts"><div><b>0.3</b>win(10), world {head1, head2}</div><div><b>0.2</b>win(-5), world {head1, tail2}</div><div><b>0.5</b>draw: 0.3 + 0.2</div><div><b>2</b>expected gain</div></div>' +
'<p>Expected gain: multiply each prize by its chance and add.</p>' +
'<div class="chain"><span>expected gain</span><i>→</i><span>10 × 0.3 − 5 × 0.2 + 0 × 0.5</span><i>→</i><span>3 − 1 + 0</span><i>→</i><span>2</span></div>' +
'<p>On average you earn 2 per game. (The lecture asks whether you can earn; the expected value is the natural way to answer.)</p>' +
'<div class="callout remember"><b class="t">SPECIAL CASE</b><p>An ordinary knowledge base is one world of probability 1.</p><p>Then P(K ⊨ φ) is 1 if Δ ⊨ φ and 0 otherwise: the classical True or False.</p></div>',
      quiz: [
        { q: 'Set P(head1) = 1 and P(head2) = 1 in the tool. What is P(win(10))?', o: [
          ok('1', 'Only the world {head1, head2} has weight, and it proves win(10).'),
          no('0.3', '0.3 is the answer for the lecture numbers only.'),
          no('10', 'A probability cannot exceed 1; 10 is the prize.')] },
        { q: 'To compute P(K ⊨ φ), you', o: [
          ok('add the probabilities of the worlds whose knowledge base entails φ', 'This is the definition.'),
          no('average the probabilities over the facts in Δ', 'Δ has no probabilities itself; only the worlds do.'),
          no('check entailment once, on Δ alone', 'Δ alone does not contain the coin facts.')] }
      ] },

    { n: 3, title: 'Three formalisms, one pattern', sub: 'Probabilistic knowledge bases, logic programs and argumentation share the same shape.',
      html: '' +
'<p class="lead">Logic comes in several styles. Can the same trick, one answer per world and then add up, work for all of them?</p>' +
'<div class="callout idea"><b class="t">WORDS AND SYMBOLS YOU NEED</b><div class="cards">' +
'<div class="card"><p><b>formalism</b> : one particular way of writing down knowledge, like rules versus arguments.</p></div>' +
'<div class="card"><p><b>object per world</b> (𝒪ω) : the plain, non-probabilistic thing attached to world ω, like one rulebook per world.</p></div>' +
'<div class="card"><p><b>proves</b> (⊢, called provability) : a step-by-step proof reaches the claim, like a chain of rule uses reaching win(10).</p></div>' +
'<div class="card"><p><b>proof method</b> (R) : a fixed procedure for building proofs, like resolution, which is what Prolog-style programs use.</p></div>' +
'<div class="card"><p><b>sound and complete</b> : the method proves only true things and proves every true thing, like a perfect answer key.</p></div>' +
'<div class="card"><p><b>logic program</b> : a set of facts and rules written so a computer can run them, like the win rules.</p></div>' +
'<div class="card"><p><b>argument</b> : a claim with its supporting reasons, like "it rained, so the grass is wet".</p></div>' +
'<div class="card"><p><b>attack</b> : one argument contradicts another, like "the soil is bone dry, so the grass is not wet" against "it rained, so the grass is wet".</p></div>' +
'<div class="card"><p><b>argumentation framework</b> (F) : a set of arguments plus the attacks between them, like a debate drawn as dots and arrows.</p></div>' +
'<div class="card"><p><b>acceptable under semantics</b> (σ, the Greek letter sigma) : an argument survives its attackers under a chosen survival rule, like every attacker being beaten in turn by an accepted argument.</p></div>' +
'<div class="card"><p><b>conclusion of an argument</b> (π, the Greek letter pi) : the claim the argument ends with, like the grass is wet.</p></div>' +
'<div class="card"><p><b>PLP, PAA, PSAA</b> : short names for the probabilistic logic program, probabilistic abstract argumentation and probabilistic structured argumentation below.</p></div>' +
'</div></div>' +
'<p>Recap: lesson 2 gave one rulebook per world, asked whether the rulebook forces a claim, and added the numbers of the worlds where it does.</p>' +
'<h2>Start with a story</h2>' +
'<p>Imagine a weather forecast with three possible days: sun, cloud, rain.</p>' +
'<p>For each day you have a plan sheet, and you ask each sheet the same question: do we go out?</p>' +
'<p>The chance of going out is the total chance of the days whose sheet says yes.</p>' +
'<p>Notice that the sheets are not probabilistic at all. Each one is an ordinary, certain thing, and only the choice of which day we are in is uncertain. This plain, non-probabilistic thing attached to one world, here the plan sheet, is called the <b>object per world</b>, written 𝒪ω.</p>' +
'<div class="tcard"><div class="tn">object per world (𝒪ω)</div><div class="tr"><span class="tk">Example</span><span>The plan sheet of the rain day; in the coin game, <span class="m">Δω1 = Δ ∪ {head1, head2}</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>𝒪ω is the ordinary, non-probabilistic object (knowledge base, logic program or argumentation framework) determined by world ω, to which the per-world question is put.</span></div></div>' +
'<p>The sheets could also be written in different styles. One person writes a list of rules, another writes a debate. A particular way of writing down knowledge is called a <b>formalism</b>. The adding-up stays the same whatever the formalism.</p>' +
'<div class="tcard"><div class="tn">formalism</div><div class="tr"><span class="tk">Example</span><span>Propositional knowledge bases, logic programs, argumentation frameworks.</span></div><div class="tr"><span class="tk">Formal</span><span>A formalism is a formal language with a defined syntax and semantics for representing knowledge and reasoning with it.</span></div></div>' +
'<h2>Three styles of sheet, each with a tiny example</h2>' +
'<p>Style 1: a plain list of facts and rules, like the rain rule of lesson 2. We ask whether the claim follows for sure.</p>' +
'<p>Style 2 starts from a problem. Lesson 2 asked "does the claim follow?", but a computer needs something it can run. A set of facts and rules written so a computer can run them is called a <b>logic program</b>, like the win rules of lesson 2.</p>' +
'<div class="tcard"><div class="tn">logic program</div><div class="tr"><span class="tk">Example</span><span><span class="m">win(10) &lt;- head1, head2.</span> together with the facts <span class="m">head1.</span> and <span class="m">head2.</span></span></div><div class="tr"><span class="tk">Formal</span><span>A finite set of rules <span class="m">h &lt;- b₁, ..., bₙ</span> (facts are rules with empty body) that a proof method can execute.</span></div></div>' +
'<p>How does a computer check a claim? It builds a step-by-step proof, a chain of rule uses, starting from the facts. If the chain reaches the claim φ, we write Δω ⊢R φ and say the program <b>proves</b> it.</p>' +
'<div class="tcard"><div class="tn">proves (⊢R)</div><div class="tr"><span class="tk">Example</span><span>From head1 and head2 the rule gives <span class="m">Δω1 ⊢R win(10)</span>.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">Δω ⊢R φ</span> iff proof method R derives φ from Δω by a finite sequence of rule applications.</span></div></div>' +
'<p>The chain has to be built by some fixed recipe. That recipe is called the <b>proof method</b>, written R. Resolution, which Prolog-style programs use, is one.</p>' +
'<div class="tcard"><div class="tn">proof method (R)</div><div class="tr"><span class="tk">Example</span><span>Resolution (SLD resolution in Prolog).</span></div><div class="tr"><span class="tk">Formal</span><span>A proof method R is a fixed procedure (set of inference rules and a strategy) defining the derivability relation <span class="m">⊢R</span>.</span></div></div>' +
'<p>What would make a recipe trustworthy? It should never prove something false, and it should never miss something true. A proof method with both properties is called <b>sound and complete</b>, like an answer key that lists exactly the right answers, no more and no fewer.</p>' +
'<div class="tcard"><div class="tn">sound and complete</div><div class="tr"><span class="tk">Example</span><span>Resolution on a propositional logic program proves exactly the atoms that follow: <span class="m">Δω ⊢R φ</span> iff <span class="m">Δω ⊨ φ</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>Sound: if <span class="m">Δ ⊢R φ</span> then <span class="m">Δ ⊨ φ</span>. Complete: if <span class="m">Δ ⊨ φ</span> then <span class="m">Δ ⊢R φ</span>.</span></div></div>' +
'<p>Style 3 looks different. Instead of a rulebook, picture a debate. An <b>argument</b> is a claim together with its supporting reasons, like "it rained, so the grass is wet".</p>' +
'<div class="tcard"><div class="tn">argument</div><div class="tr"><span class="tk">Example</span><span>"It rained, so the grass is wet": premises {rain, rain implies wet}, conclusion wet.</span></div><div class="tr"><span class="tk">Formal</span><span>An argument is a pair (S, π) of a set of premises S (from the knowledge base) and a conclusion π that is derived from S.</span></div></div>' +
'<p>Every argument ends somewhere. The claim it ends with is called the <b>conclusion of an argument</b>, written π (pi). Here the conclusion is: the grass is wet.</p>' +
'<div class="tcard"><div class="tn">conclusion of an argument (π)</div><div class="tr"><span class="tk">Example</span><span>For "it rained, so the grass is wet", <span class="m">π = wet</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>For an argument (S, π), π is the claim derived from the premises S.</span></div></div>' +
'<p>Now a second speaker says B: "the soil is bone dry after a sunny week, so the grass is not wet". Its conclusion contradicts the conclusion of the first argument. When one argument contradicts another, we say it makes an <b>attack</b>, so B attacks the first argument.</p>' +
'<div class="tcard"><div class="tn">attack</div><div class="tr"><span class="tk">Example</span><span>B (conclusion: grass not wet) attacks A (conclusion: grass wet).</span></div><div class="tr"><span class="tk">Formal</span><span>Argument B attacks argument A when the conclusion of B contradicts the conclusion (or a premise) of A; in an abstract framework, an attack is an ordered pair (B, A) in the attack relation.</span></div></div>' +
'<p>Draw each argument as a dot and each attack as an arrow between dots. The picture, a set of arguments plus the attacks between them, is called an <b>argumentation framework</b>, written F.</p>' +
'<div class="tcard"><div class="tn">argumentation framework (F)</div><div class="tr"><span class="tk">Example</span><span>Arguments A and B with one attack from B to A: <span class="m">F = ({A, B}, {(B, A)})</span>.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">F = (Args, Att)</span> with a set of arguments Args and an attack relation <span class="m">Att ⊆ Args × Args</span>.</span></div></div>' +
'<p>Which arguments do we believe? One that is attacked is not automatically lost: its attacker may itself be beaten by another argument. We pick a survival rule, and an argument that survives its attackers under that rule is <b>acceptable under semantics</b> σ (sigma).</p>' +
'<div class="tcard"><div class="tn">acceptable under semantics σ</div><div class="tr"><span class="tk">Example</span><span>In <span class="m">F = ({A, B}, {(B, A)})</span>, B is acceptable (unattacked) and A is not, under grounded semantics.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">Fω ⊢σ A</span> iff argument A belongs to the extension of Fω (or to some or every extension, as the semantics σ prescribes).</span></div></div>' +
'<p>The three styles below get short names: PLP, PAA, PSAA stand for probabilistic logic program, probabilistic abstract argumentation and probabilistic structured argumentation.</p>' +
'<h2>The idea</h2>' +
'<div class="flow"><div class="fs"><b>(W, P)</b><span>Worlds with weights, as in lesson 1.</span></div><div class="fs"><b>𝒪ω</b><span>One ordinary object per world.</span></div><div class="fs"><b>Support?</b><span>Does 𝒪ω support the conclusion?</span></div><div class="fs"><b>Sum</b><span>Add P(ω) where yes.</span></div></div>' +
'<div class="big"><span class="m">P(conclusion) = Σ P(ω) over worlds ω where 𝒪ω supports it</span><small>Read: add the numbers of the worlds whose own object supports the conclusion. The formalisms differ only in what 𝒪ω is, and in the question asked per world.</small></div>' +
'<table><tr><th>Formalism</th><th>Per-world object</th><th>Question asked in each world</th></tr>' +
'<tr><td>Probabilistic propositional knowledge base</td><td>a propositional knowledge base Δω (facts and rules in plain logic)</td><td><span class="m">Δω ⊨ φ ?</span> Does φ follow for sure?</td></tr>' +
'<tr><td>Probabilistic logic program (PLP)</td><td>a logic program Δω</td><td><span class="m">Δω ⊢R φ ?</span> Can method R prove φ? (R sound and complete, by default resolution)</td></tr>' +
'<tr><td>Probabilistic abstract argumentation (PAA)</td><td>an abstract argumentation framework Fω (arguments and attacks given directly)</td><td><span class="m">Fω ⊢σ A ?</span> Is argument A acceptable under semantics σ?</td></tr>' +
'<tr><td>Probabilistic structured argumentation (PSAA)</td><td>a knowledge base Kω that generates arguments and attacks</td><td>Is some argument for π acceptable?</td></tr></table>' +
'<div class="callout example"><b class="t">WORKED EXAMPLE FROM THE LECTURE</b><p>Use the coin game of lesson 2. W = {ω1, …, ω4}, where P(ω1) = 0.3.</p>' +
'<p>Each Δωi is Δ plus the facts of one coin outcome: Δω1 = Δ ∪ {head1, head2}, Δω2 = Δ ∪ {head1, tail2}, and so on. (The symbol ∪ means "together with".)</p>' +
'<p>Step 1: ask each world whether win(10) follows. Only Δω1 says yes.</p>' +
'<p>Step 2: add the numbers of the yes worlds. There is one, so the sum is P(ω1).</p>' +
'<div class="chain"><span>only Δω1 ⊨ win(10)</span><i>→</i><span>P(K ⊨ win(10)) = P(ω1)</span><i>→</i><span>= 0.3</span></div></div>' +
'<div class="callout remember"><b class="t">CONNECTION TO THE EARLIER ARGUMENTATION LESSONS</b><p>The probabilistic propositional knowledge base and the PLP are special cases of PAA: Fω is the set of all arguments (proofs) built from Δω by a proof system such as natural deduction from module 5.</p>' +
'<div class="chain"><span>Module 5: proofs</span><i>+</i><span>earlier lessons: acceptability</span><i>+</i><span>this module: weights</span></div></div>' +
'<div class="vs"><div class="neutral"><h4>CLASSICAL AGENT</h4><p>Answers True or False.</p></div><div class="good"><h4>PROBABILISTIC AGENT</h4><p>Answers <span class="m">P(φ) = x</span>, a chance between 0 and 1.</p></div></div>' +
'<p>The agent\'s design does not change. Only the reply does.</p>',
      quiz: [
        { q: 'In a probabilistic logic program, entailment is replaced by', o: [
          ok('provability in each world with a sound and complete proof system', 'P(K ⊢ φ) = Σ P(ω) over worlds with Δω ⊢R φ.'),
          no('a single proof from the uncertain part', 'Proofs are per world, in Δω.'),
          no('the average of the facts', 'There is no averaging; worlds are summed.')] },
        { q: 'What differs between the formalisms in the table?', o: [
          ok('The object attached to each world and the question asked of it', 'The probability space and the summing step are the same.'),
          no('How the worlds are weighted', 'All three use a probability space (W, P).'),
          no('Whether the probabilities sum to 1', 'They always do.')] }
      ] },

    { n: 4, title: 'ProbLog syntax', sub: 'Prolog with probabilities, and the coin game as a program.',
      html: '' +
'<p class="lead">Writing every world by hand is slow. Is there a language where you state the chances once and the computer does the adding?</p>' +
'<div class="callout idea"><b class="t">WORDS AND SYMBOLS YOU NEED</b><div class="cards">' +
'<div class="card"><p><b>Prolog</b> : a programming language made of facts and rules you can ask questions, like the win rules of lesson 2.</p></div>' +
'<div class="card"><p><b>ProbLog</b> : Prolog where facts and rules can be uncertain, like a coin that lands heads with chance 0.5.</p></div>' +
'<div class="card"><p><b>probabilistic fact</b> (::) : the double colon reads "is true with chance", like 0.5::head1 is heads half the time.</p></div>' +
'<div class="card"><p><b>holds if</b> (:-) : the head on the left is true when the body on the right is true, like win(10) :- head1, head2.</p></div>' +
'<div class="card"><p><b>and</b> (,) : the comma between body parts means both must hold, like head1, head2.</p></div>' +
'<div class="card"><p><b>negation as failure</b> (\\+) : "cannot be shown", like \\+ head1 is true when head1 does not happen.</p></div>' +
'<div class="card"><p><b>annotated disjunction</b> (;) : exactly one listed outcome is chosen, like one coin showing either heads or tails.</p></div>' +
'<div class="card"><p><b>variable</b> (X) : a placeholder for any name, like asthma(X) for any person X.</p></div>' +
'<div class="card"><p><b>evidence</b> : something you observed, like evidence(alarm, true) means the alarm rang.</p></div>' +
'<div class="card"><p><b>query</b> : the question you ask, like query(win(X)) asks for every prize chance.</p></div>' +
'<div class="card"><p><b>prior</b> : the chance before looking at any evidence, like burglary in general, before the alarm rings.</p></div>' +
'<div class="card"><p><b>posterior</b> (P(a | b), read "chance of a given b") : the chance after taking evidence into account, like burglary given the alarm rang.</p></div>' +
'<div class="card"><p><b>percent sign</b> (%) : starts a comment the computer ignores, like % first coin, fair.</p></div>' +
'</div></div>' +
'<p>Recap: lesson 2 said the chance of a conclusion is the sum of the numbers of the worlds whose program proves it. That is the definition for a probabilistic logic program (PLP).</p>' +
'<h2>Start with a story</h2>' +
'<p>You want the chances for the two-coin game of lesson 2.</p>' +
'<p>By hand you would write four little programs, one per coin outcome, and work out each chance.</p>' +
'<p>Then you would check which programs prove the prize and add the chances. That is a lot of bookkeeping for two coins, and hopeless for twenty.</p>' +
'<p>We want a language that does the bookkeeping. The facts and rules of lesson 2, such as the win rules, already look like a program. A programming language made of facts and rules that you can ask questions is called <b>Prolog</b>.</p>' +
'<div class="tcard"><div class="tn">Prolog</div><div class="tr"><span class="tk">Example</span><span><span class="m">win(10) :- head1, head2.</span> with the facts <span class="m">head1.</span> and <span class="m">head2.</span></span></div><div class="tr"><span class="tk">Formal</span><span>A logic programming language whose programs are finite sets of definite clauses <span class="m">h :- b₁, ..., bₙ</span>, executed by SLD resolution.</span></div></div>' +
'<p>But plain Prolog has no chances: a fact is simply there or not. So we allow a fact or rule to be uncertain, like a coin that lands heads with chance 0.5. Prolog extended this way is called <b>ProbLog</b>.</p>' +
'<div class="tcard"><div class="tn">ProbLog</div><div class="tr"><span class="tk">Example</span><span><span class="m">0.5::head1.</span> says head1 is true with probability 0.5.</span></div><div class="tr"><span class="tk">Formal</span><span>A probabilistic logic programming language: a logic program plus probabilistic facts <span class="m">p::f</span>; each choice of facts is a world, and the probability of a query is the sum of the probabilities of the worlds whose program proves it.</span></div></div>' +
'<p>Two more words complete the picture. When you have seen something happen, say the alarm rang, you tell the program, and that observation is called <b>evidence</b>, written evidence(alarm, true). And the question you want answered is called a <b>query</b>, like query(win(X)), which asks for every prize chance.</p>' +
'<div class="tcard"><div class="tn">evidence</div><div class="tr"><span class="tk">Example</span><span><span class="m">evidence(alarm, true).</span> says the alarm rang.</span></div><div class="tr"><span class="tk">Formal</span><span>Evidence is a set of observed truth values <span class="m">e</span>; queries are then answered as conditional probabilities <span class="m">P(q | e) = P(q ∧ e) / P(e)</span>, for <span class="m">P(e) > 0</span>.</span></div></div>' +
'<div class="tcard"><div class="tn">query</div><div class="tr"><span class="tk">Example</span><span><span class="m">query(win(X)).</span> asks for the chance of every prize.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">query(q)</span> asks for the probability of q, <span class="m">P(q)</span>, or <span class="m">P(q | e)</span> when evidence e is given.</span></div></div>' +
'<h2>What ProbLog does</h2>' +
'<div class="flow"><div class="fs"><b>One program per world</b><span>With its probability.</span></div><div class="fs"><b>Test provability</b><span>In each world.</span></div><div class="fs"><b>Add up</b><span>ProbLog does all three for you (the PLP definition of the last step).</span></div></div>' +
'<div class="callout example"><b class="t">WORKED EXAMPLE FROM THE LECTURE: THE COIN GAME AS A PROGRAM</b>' +
'<pre class="code">0.5::head1.          % first coin, fair\ntail1 :- \\+ head1.\n0.6::head2.          % second coin, biased\ntail2 :- \\+ head2.\n\nwin(10) :- head1, head2.\nwin(-5) :- head1, tail2.\nwin(0)  :- \\+ win(10), \\+ win(-5).\n\nquery(win(X)).</pre>' +
'<p>Look at the text after the % signs: "first coin, fair" is a note for the human, not an instruction. The computer skips it. A comment starts with the <b>percent sign</b> %: the percent sign is called a comment marker here.</p>' +
'<p>Now look at the symbol :- in the rules. It plays the role of the arrow in lesson 2. It reads <b>holds if</b>: the left side is true when the right side is true.</p>' +
'<p>Read it line by line. Line 1: coin 1 is heads with chance 0.5. Line 2: tails when it is not heads. Lines 3 and 4: the same for the biased coin.</p>' +
'<p>The three win lines are the rules of lesson 2. The last line asks for every prize. Why does it write X instead of one prize? Because X is a <b>variable</b>, a placeholder for any name, here any prize.</p>' +
'<p>win(10): head1 and head2 both hold, so 0.5 × 0.6 = 0.3.</p>' +
'<p>win(-5): head1 and tail2 both hold, so 0.5 × 0.4 = 0.2.</p>' +
'<p>win(0): 1 − 0.3 − 0.2 = 0.5, which is also 0.5 × 0.6 + 0.5 × 0.4 = 0.3 + 0.2.</p>' +
'<p>Did we tell the program anything we had observed? No. So these numbers are the chances before looking at any evidence, and such a chance is called a <b>prior</b>.</p>' +
'<p>Now imagine adding evidence, say that the alarm rang. The chance of a burglary should change, because we know more. The chance after taking evidence into account is the <b>posterior</b>, written P(a | b) and read "chance of a given b", like burglary given the alarm rang.</p>' +
'<div class="facts"><div><b>0.3</b>win(10)</div><div><b>0.2</b>win(-5)</div><div><b>0.5</b>win(0)</div></div>' +
'<p>This matches the world-by-world computation of lesson 2 exactly.</p></div>' +
'<div class="tcard"><div class="tn">percent sign (%)</div><div class="tr"><span class="tk">Example</span><span><span class="m">0.5::head1. % first coin, fair</span>: the note after % is ignored.</span></div><div class="tr"><span class="tk">Formal</span><span>In ProbLog and Prolog, % starts a comment that runs to the end of the line and has no effect on the program.</span></div></div>' +
'<div class="tcard"><div class="tn">holds if (:-)</div><div class="tr"><span class="tk">Example</span><span><span class="m">win(10) :- head1, head2.</span> reads: win(10) holds if head1 and head2 hold.</span></div><div class="tr"><span class="tk">Formal</span><span>A rule <span class="m">h :- b₁, ..., bₙ</span> means the head h is true whenever the body <span class="m">b₁ ∧ ... ∧ bₙ</span> is true.</span></div></div>' +
'<div class="tcard"><div class="tn">variable (X)</div><div class="tr"><span class="tk">Example</span><span><span class="m">query(win(X)).</span> asks for every prize X.</span></div><div class="tr"><span class="tk">Formal</span><span>A variable is a placeholder (written with a capital letter) that can be replaced by any constant; a rule with variables stands for all its ground instances.</span></div></div>' +
'<div class="tcard"><div class="tn">prior</div><div class="tr"><span class="tk">Example</span><span><span class="m">P(win(10)) = 0.3</span> before any evidence is given.</span></div><div class="tr"><span class="tk">Formal</span><span>The prior is the probability <span class="m">P(a)</span> computed without conditioning on evidence.</span></div></div>' +
'<div class="tcard"><div class="tn">posterior (P(a | b))</div><div class="tr"><span class="tk">Example</span><span>P(burglary | alarm) after <span class="m">evidence(alarm, true)</span>.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">P(a | b) = P(a ∧ b) / P(b)</span>, for <span class="m">P(b) > 0</span>.</span></div></div>' +
'<h2>The same program, as a table of constructs</h2>' +
'<table><tr><th>Construct</th><th>Meaning</th></tr>' +
'<tr><td><code>0.5::head1.</code></td><td>probabilistic fact: true with probability 0.5</td></tr>' +
'<tr><td><code>tail1 :- \\+ head1.</code></td><td>negation as failure: tail1 holds when head1 cannot be shown</td></tr>' +
'<tr><td><code>0.5::head1; 0.5::tail1.</code></td><td>annotated disjunction: exactly one head is chosen, with the stated probabilities</td></tr>' +
'<tr><td><code>0.4::asthma(X) :- smokes(X).</code></td><td>probabilistic rule: when the body holds, the head holds with probability 0.4</td></tr>' +
'<tr><td><code>evidence(a, true).</code></td><td>condition on an observation: treat a as seen to be true</td></tr>' +
'<tr><td><code>query(b).</code></td><td>ask for the probability of b (the posterior, given any evidence)</td></tr></table>' +
'<h2>Pitfalls</h2>' +
'<div class="cards">' +
'<div class="card"><h3>1. Negation</h3><p><code>\\+</code> is negation as failure, not classical negation.</p><p><code>tail1 :- \\+ head1.</code> works because head1 is decided per world.</p></div>' +
'<div class="card"><h3>2. Prior vs posterior</h3><p>A query without evidence gives a prior.</p><p>Add <code>evidence</code> to get a posterior.</p></div>' +
'<div class="card"><h3>3. Disjunction vs facts</h3><div class="vs"><div class="bad"><h4>DISJUNCTION</h4><p><code>0.5::a; 0.5::b.</code> a and b are mutually exclusive.</p></div><div class="good"><h4>TWO FACTS</h4><p><code>0.5::a. 0.5::b.</code> independent, both can be true.</p></div></div></div>' +
'</div>' +
'<p>Check pitfall 3 with the coin tool of lesson 1: tick four worlds for two independent facts, and see that a disjunction leaves only two.</p>',
      quiz: [
        { q: '0.5::a. 0.5::b. are two independent facts. What is P(a and b)?', o: [
          ok('0.25', 'Independent facts multiply: 0.5 × 0.5.'),
          no('0', 'That would be the annotated disjunction 0.5::a; 0.5::b.')  ,
          no('0.5', 'That is the probability of each fact alone.')] },
        { q: 'You write 0.5::a; 0.5::b. What is P(a and b)?', o: [
          ok('0', 'Exactly one head is chosen in each world, so they never hold together.'),
          no('0.25', 'That holds for two separate facts, not an annotated disjunction.'),
          no('1', 'They cannot both be true.')] },
        { q: 'To get P(burglary | alarm) you add', o: [
          ok('evidence(alarm, true). query(burglary).', 'Evidence conditions, query asks.'),
          no('query(burglary). only', 'Without evidence you get the prior P(burglary).'),
          no('query(alarm). evidence(burglary, true).', 'That conditions on burglary and asks about alarm, the reverse.')] }
      ] },

    { n: 5, title: 'Bayesian networks in ProbLog', sub: 'A joint distribution as a product of local tables, translated rule by rule.',
      html: '' +
'<p class="lead">Your house alarm rings. Is it a burglar, an earthquake, or both, and how do you compute that?</p>' +
'<div class="callout idea"><b class="t">WORDS AND SYMBOLS YOU NEED</b><div class="cards">' +
'<div class="card"><p><b>variable</b> (B, E, A, X₁ … Xₙ) : a quantity that can take values, like B is whether a burglary happens.</p></div>' +
'<div class="card"><p><b>binary variable</b> : a variable with two values, like the alarm rings or it does not.</p></div>' +
'<div class="card"><p><b>value</b> (b, e, a) : a lowercase letter means that variable is true, like b is a burglary happened.</p></div>' +
'<div class="card"><p><b>not</b> (¬) : the symbol flips true to false, like ¬e is no earthquake.</p></div>' +
'<div class="card"><p><b>node and arrow</b> : a node is a variable drawn as a dot, and an arrow points from a cause to its effect, like burglary to alarm.</p></div>' +
'<div class="card"><p><b>parents</b> (Parents) : the nodes with arrows into a node, like burglary and earthquake are the parents of alarm.</p></div>' +
'<div class="card"><p><b>directed acyclic graph</b> (DAG) : dots joined by one-way arrows that never loop back, like causes flowing forward.</p></div>' +
'<div class="card"><p><b>chance given</b> (P(a | b, e), read "chance of a given b and e") : the chance of the left thing once the right things are known, like alarm given burglary and earthquake.</p></div>' +
'<div class="card"><p><b>prior</b> : the chance of a node with no parents, like burglary on its own.</p></div>' +
'<div class="card"><p><b>table of a node</b> : one chance for each combination of its parents\' values, like four rows for the alarm.</p></div>' +
'<div class="card"><p><b>joint</b> (P(x₁, …, xₙ)) : the chance of one full combination of values, like burglary, earthquake and alarm all true.</p></div>' +
'<div class="card"><p><b>product</b> (Π, the Greek letter pi) : multiply a whole list of numbers, like Π of 0.7, 0.2, 0.9 is 0.126.</p></div>' +
'<div class="card"><p><b>Bayesian network</b> : a DAG where each node stores its table, like the alarm picture.</p></div>' +
'</div></div>' +
'<p>Recap: lesson 4 gave ProbLog facts and rules with chances, plus evidence and query to get a posterior.</p>' +
'<h2>Start with a story</h2>' +
'<p>Your house has an alarm. A burglar can set it off, and so can an earthquake.</p>' +
'<p>Three things in this story can be true or false: a burglary happens, an earthquake happens, the alarm rings. Each is a quantity that can take values, and such a quantity is called a <b>variable</b>. We call them B, E and A.</p>' +
'<div class="tcard"><div class="tn">variable</div><div class="tr"><span class="tk">Example</span><span>B (burglary), E (earthquake), A (alarm).</span></div><div class="tr"><span class="tk">Formal</span><span>A random variable <span class="m">X</span> is a quantity with a set of possible values and a probability for each value.</span></div></div>' +
'<p>Each of these has just two possible values: it happens or it does not. A variable with two values is called a <b>binary variable</b>.</p>' +
'<div class="tcard"><div class="tn">binary variable</div><div class="tr"><span class="tk">Example</span><span>The alarm rings or it does not.</span></div><div class="tr"><span class="tk">Formal</span><span>A variable with exactly two values, true and false; <span class="m">P(X = true) + P(X = false) = 1</span>.</span></div></div>' +
'<p>We need a short way to say which value we mean. A lowercase letter means true: b is "a burglary happened". A <b>value</b> is written this way. The symbol ¬ flips true to false, so ¬e is "no earthquake".</p>' +
'<div class="tcard"><div class="tn">value (b, ¬b)</div><div class="tr"><span class="tk">Example</span><span><span class="m">b</span>: a burglary happened; <span class="m">¬e</span>: no earthquake.</span></div><div class="tr"><span class="tk">Formal</span><span>For a binary variable X, lowercase x stands for <span class="m">X = true</span> and <span class="m">¬x</span> for <span class="m">X = false</span>, with <span class="m">P(¬x) = 1 − P(x)</span>.</span></div></div>' +
'<p>Whether there is a burglary and whether there is an earthquake do not depend on each other. But the alarm depends on both.</p>' +
'<p>To show who depends on whom, draw a picture. A <b>node and arrow</b> work like this: a node is a variable drawn as a dot, and an arrow points from a cause to its effect, like burglary to alarm.</p>' +
'<div class="tcard"><div class="tn">node and arrow</div><div class="tr"><span class="tk">Example</span><span>Nodes B, E, A with arrows B → A and E → A.</span></div><div class="tr"><span class="tk">Formal</span><span>The graph <span class="m">G = (V, E)</span> has one node per variable and a directed edge <span class="m">X → Y</span> when Y\'s table depends directly on X.</span></div></div>' +
'<p>Look at the dot for the alarm: two arrows point into it, from burglary and from earthquake. The nodes with arrows into a node are its <b>parents</b>, so burglary and earthquake are the parents of alarm.</p>' +
'<div class="tcard"><div class="tn">parents</div><div class="tr"><span class="tk">Example</span><span><span class="m">Parents(A) = {B, E}</span>; B and E have no parents.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">Parents(X)</span> is the set of nodes Y with an arrow <span class="m">Y → X</span>.</span></div></div>' +
'<p>What do we store at each node? Burglary and earthquake have no parents, so nothing influences them, and a plain chance is enough. A chance stored for a node with no parents is called its <b>prior</b>, like burglary on its own.</p>' +
'<div class="tcard"><div class="tn">prior</div><div class="tr"><span class="tk">Example</span><span><span class="m">P(b) = 0.7</span>, <span class="m">P(e) = 0.2</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>For a node X with <span class="m">Parents(X) = ∅</span>, the stored distribution <span class="m">P(X)</span>, not conditioned on any other variable.</span></div></div>' +
'<p>The alarm is different. Its chance depends on which case we are in: burglary and earthquake, burglary only, earthquake only, or neither. That is four cases, so we store four chances. This list, one chance for each combination of its parents\' values, is the <b>table of a node</b>.</p>' +
'<div class="tcard"><div class="tn">table of a node</div><div class="tr"><span class="tk">Example</span><span>Alarm: four rows, 0.9, 0.8, 0.1 and 0 for the parent cases (b,e), (b,¬e), (¬b,e), (¬b,¬e).</span></div><div class="tr"><span class="tk">Formal</span><span>The conditional probability table of X lists <span class="m">P(x | values of Parents(X))</span> for every combination of parent values; a binary node with k parents has <span class="m">2<sup>k</sup></span> rows.</span></div></div>' +
'<p>One row of that table is a chance that depends on something known. It is written P(a | b, e) and read "chance of a given b and e": the chance of the alarm once burglary and earthquake are known. This is the <b>chance given</b> the parents.</p>' +
'<div class="tcard"><div class="tn">chance given (P(a | b, e))</div><div class="tr"><span class="tk">Example</span><span><span class="m">P(a | b, e) = 0.9</span>: alarm chance when both burglary and earthquake occur.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">P(a | c) = P(a ∧ c) / P(c)</span>, for <span class="m">P(c) > 0</span>.</span></div></div>' +
'<p>Now the question this machinery is for: when the alarm rings, how likely is a burglary?</p>' +
'<h2>The definition</h2>' +
'<p>The picture has one more property: arrows only run forward from causes to effects, and following them never brings you back to where you started. Such a picture is called a <b>directed acyclic graph</b>, DAG for short.</p>' +
'<div class="tcard"><div class="tn">directed acyclic graph (DAG)</div><div class="tr"><span class="tk">Example</span><span>B → A ← E has no cycle; adding A → B would create the cycle B → A → B.</span></div><div class="tr"><span class="tk">Formal</span><span>A graph with directed edges and no directed cycle: there is no path <span class="m">X → ... → X</span>.</span></div></div>' +
'<p>A DAG where each node stores such a table is called a <b>Bayesian network</b>. Over X₁ … Xₙ, it is a directed acyclic graph where each node stores the probability of its value given the values of its parents.</p>' +
'<div class="tcard"><div class="tn">Bayesian network</div><div class="tr"><span class="tk">Example</span><span>The alarm network: B → A ← E with <span class="m">P(b)</span>, <span class="m">P(e)</span> and the four-row table of A.</span></div><div class="tr"><span class="tk">Formal</span><span>A DAG over variables <span class="m">X₁, ..., Xₙ</span> with, for each node, a table <span class="m">P(Xᵢ | Parents(Xᵢ))</span>; it defines <span class="m">P(x₁, ..., xₙ) = Π<sub>i</sub> P(xᵢ | Parents(Xᵢ))</span>.</span></div></div>' +
'<div class="big"><span class="m">P(x₁, …, xₙ) = Π over i of P(xᵢ | values of the parents of Xᵢ)</span><small>Read: the chance of a full combination is the product of one table entry per node. A node with no parents stores a plain prior.</small></div>' +
'<div class="vs"><div class="neutral"><h4>THE GRAPH</h4><p>Which variables depend on which.</p></div><div class="neutral"><h4>THE TABLES</h4><p>The numbers.</p></div></div>' +
'<div class="callout example"><b class="t">WORKED EXAMPLE FROM THE LECTURE: THE ALARM</b><p>Variables B (burglary), E (earthquake), A (alarm). B and E have no parents; A has parents B and E.</p>' +
'<div class="facts"><div><b>0.7</b>P(b)</div><div><b>0.2</b>P(e)</div><div><b>0.9</b>P(a | b, e)</div><div><b>0.8</b>P(a | b, ¬e)</div><div><b>0.1</b>P(a | ¬b, e)</div><div><b>0</b>P(a | ¬b, ¬e)</div></div>' +
'<p>The chance of one full combination of values for all the variables is called the <b>joint</b>, written P(x₁, …, xₙ). One joint entry: burglary and earthquake both happen and the alarm rings. To get it we multiply a list of numbers, and multiplying a whole list is written Π, the <b>product</b>.</p>' +
'<div class="chain"><span>P(b, e, a)</span><i>→</i><span>P(b) × P(e) × P(a | b, e)</span><i>→</i><span>0.7 × 0.2 × 0.9</span><i>→</i><span>0.14 × 0.9 = 0.126</span></div>' +
'<p>Another: burglary and earthquake both happen and the alarm stays silent. P(¬a | b, e) = 1 − 0.9 = 0.1, so 0.7 × 0.2 × 0.1 = 0.014.</p></div>' +
'<div class="tcard"><div class="tn">joint (P(x₁, …, xₙ))</div><div class="tr"><span class="tk">Example</span><span><span class="m">P(b, e, a) = 0.7 × 0.2 × 0.9 = 0.126</span>.</span></div><div class="tr"><span class="tk">Formal</span><span>The joint distribution gives <span class="m">P(X₁ = x₁ ∧ ... ∧ Xₙ = xₙ)</span> for every full assignment; the values sum to 1.</span></div></div>' +
'<div class="tcard"><div class="tn">product (Π)</div><div class="tr"><span class="tk">Example</span><span><span class="m">Π of 0.7, 0.2, 0.9 = 0.126</span>.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">Π<sub>i=1..n</sub> aᵢ = a₁ · a₂ · ... · aₙ</span>.</span></div></div>' +
'<h2>Translation recipe</h2>' +
'<div class="flow"><div class="fs"><b>Priors</b><span>Each prior becomes a probabilistic fact.</span></div><div class="fs"><b>Rows</b><span>Each table row becomes a probabilistic rule; the body fixes the parent values (<code>\\+</code> for false parents).</span></div><div class="fs"><b>Zero rows</b><span>A row with probability 0 needs no rule.</span></div><div class="fs"><b>Ask</b><span>Add <code>evidence(...)</code> to condition and <code>query(...)</code> to ask.</span></div></div>' +
'<p>Applied to the alarm, the program looks like this.</p>' +
'<pre class="code">0.7::burglary.\n0.2::earthquake.\n0.9::alarm :- burglary, earthquake.\n0.8::alarm :- burglary, \\+ earthquake.\n0.1::alarm :- \\+ burglary, earthquake.\n% the row for neither has probability 0: no rule\n\nquery(alarm).</pre>' +
'<h2>Worked example: chance of the alarm, then of a burglary given the alarm</h2>' +
'<p>Step 1: the chance of each parent case, using independence (multiply). The chance of no burglary is 1 − 0.7 = 0.3, and of no earthquake 1 − 0.2 = 0.8.</p>' +
'<div class="chain"><span>b and e</span><i>→</i><span>0.7 × 0.2 = 0.14</span></div>' +
'<div class="chain"><span>b and ¬e</span><i>→</i><span>0.7 × 0.8 = 0.56</span></div>' +
'<div class="chain"><span>¬b and e</span><i>→</i><span>0.3 × 0.2 = 0.06</span></div>' +
'<div class="chain"><span>¬b and ¬e</span><i>→</i><span>0.3 × 0.8 = 0.24</span></div>' +
'<p>Step 2: multiply each by the chance the alarm rings in that case.</p>' +
'<div class="chain"><span>0.14 × 0.9</span><i>→</i><span>0.126</span></div>' +
'<div class="chain"><span>0.56 × 0.8</span><i>→</i><span>0.448</span></div>' +
'<div class="chain"><span>0.06 × 0.1</span><i>→</i><span>0.006</span></div>' +
'<div class="chain"><span>0.24 × 0</span><i>→</i><span>0</span></div>' +
'<p>Step 3: add them. P(a) = 0.126 + 0.448 + 0.006 + 0 = 0.58.</p>' +
'<p>Step 4: the alarm rang. A burglary given the alarm is the cases with a burglary and an alarm, divided by all cases with an alarm. The burglary cases are the first two rows above.</p>' +
'<div class="chain"><span>evidence: alarm is true</span><i>→</i><span>P(b | a) = (0.126 + 0.448) / 0.58 = 0.574 / 0.58</span><i>→</i><span>≈ 0.9897</span></div>' +
'<p>The alarm makes a burglary likely: from 0.7 before it rang to about 0.99 after.</p>' +
'<h2>Try it</h2>' +
'<p>Drag the sliders to change any table entry. Read the eight joint entries, the answer to the query, and the ProbLog program the tool writes for your numbers.</p>' +
'{{w:alarm|{"title":"THE ALARM NETWORK"}}}' +
'<details class="more"><summary>Things to try</summary><ul><li>Set P(a | ¬b, e) = P(a | ¬b, ¬e) = 0 and watch how an earthquake alone stops explaining the alarm.</li><li>Set P(b) = 0.01 and see the posterior fall even with the alarm on.</li></ul></details>',
      quiz: [
        { q: 'A Bayesian network has 3 binary variables. How many joint entries does the product formula define?', o: [
          ok('8', 'One per assignment, 2³.'),
          no('3', 'That is the number of variables, not assignments.'),
          no('6', 'Each variable has two values, so the count is 2³.')] },
        { q: 'P(a | ¬b, ¬e) = 0. In the ProbLog translation you', o: [
          ok('write no rule for that row', 'A probabilistic rule with probability 0 never fires, so it is unnecessary.'),
          no('write 0::alarm :- \\+ burglary, \\+ earthquake.', 'It would be harmless but is not needed.'),
          no('must add evidence(alarm, false)', 'Evidence is an observation, not part of the table.')] },
        { q: 'P(b) = 0.7 and the alarm rings. P(b | a) is', o: [
          ok('higher than 0.7', 'The alarm is much more likely under burglary, so observing it raises the belief.'),
          no('exactly 0.7', 'That is the prior; evidence updates it.'),
          no('lower than 0.7', 'A burglary raises the chance of an alarm, so seeing one supports burglary.')] }
      ] },

    { n: 6, title: 'Friends and Smokers', sub: 'Probabilistic rules over a social network.',
      html: '' +
'<p class="lead">In a group of friends, who is likely to smoke, and who is likely to get asthma?</p>' +
'<div class="callout idea"><b class="t">WORDS AND SYMBOLS YOU NEED</b><div class="cards">' +
'<div class="card"><p><b>person number</b> (1, 2, 3, 4) : each person in the example has a number, like person 2 is one of the four friends.</p></div>' +
'<div class="card"><p><b>variable in a rule</b> (X, Y) : a placeholder that stands for any person, like smokes(X) for whoever X is.</p></div>' +
'<div class="card"><p><b>smokes(X)</b> : the statement that person X smokes, like smokes(2).</p></div>' +
'<div class="card"><p><b>stress(X)</b> : person X is under stress, which can lead to smoking.</p></div>' +
'<div class="card"><p><b>friend(X,Y)</b> : X and Y are friends, like friend(1,2).</p></div>' +
'<div class="card"><p><b>influences(Y,X)</b> : Y can push X to smoke, like a friend who offers a cigarette.</p></div>' +
'<div class="card"><p><b>asthma(X)</b> : person X has asthma.</p></div>' +
'<div class="card"><p><b>probabilistic rule</b> (0.4::head :- body) : when the body holds, the head holds with that chance, like 0.4 for asthma if smoking.</p></div>' +
'<div class="card"><p><b>evidence</b> : something you are told is true or false, like evidence(smokes(2), true).</p></div>' +
'</div></div>' +
'<p>Recap: lesson 4 gave ProbLog rules and facts with chances, and lesson 5 turned a table of chances into ProbLog rules with a body and a chance.</p>' +
'<h2>Start with a story</h2>' +
'<p>Four people at school. To tell them apart without using names, give each a <b>person number</b>: 1, 2, 3 or 4. Some are stressed, some are friends.</p>' +
'<div class="tcard"><div class="tn">person number</div><div class="tr"><span class="tk">Example</span><span>The four friends are 1, 2, 3 and 4; <span class="m">friend(1,2)</span> links persons 1 and 2.</span></div><div class="tr"><span class="tk">Formal</span><span>Each person is a constant (here a number) of the program; predicates such as <span class="m">smokes</span> and <span class="m">friend</span> take these constants as arguments.</span></div></div>' +
'<p>A stressed person may start smoking. We need a way to say "person 2 smokes" as a statement that is true or false. Write <b>smokes(X)</b>, which means person X smokes, like smokes(2).</p>' +
'<div class="tcard"><div class="tn">smokes(X)</div><div class="tr"><span class="tk">Example</span><span><span class="m">smokes(2)</span>: person 2 smokes.</span></div><div class="tr"><span class="tk">Formal</span><span>A unary predicate; the atom <span class="m">smokes(c)</span> is true in a world iff the person c smokes in it.</span></div></div>' +
'<p>A person may also start because a friend who smokes pushes them. Write <b>influences(Y,X)</b> for "Y can push X to smoke", like a friend who offers a cigarette.</p>' +
'<div class="tcard"><div class="tn">influences(Y,X)</div><div class="tr"><span class="tk">Example</span><span><span class="m">influences(4,2)</span>: person 4 can push person 2 to smoke.</span></div><div class="tr"><span class="tk">Formal</span><span>A binary predicate, used here as a probabilistic fact: <span class="m">influences(y,x)</span> holds in a world iff y influences x in it.</span></div></div>' +
'<p>Smoking then raises the chance of asthma. The aim is to put this into rules that cover everyone at once.</p>' +
'<h2>The idea</h2>' +
'<p>Here is a problem. With four people, "if stressed, smokes" would need four rules: one for person 1, one for person 2, and so on. With four hundred people it would need four hundred.</p>' +
'<p>The fix is a blank to fill in, like "___ smokes if ___ is stressed", where the same name goes in both blanks. Such a blank, written X or Y, is a <b>variable in a rule</b>. It is a placeholder that stands for any person. A rule with X means "for every person X", so one rule covers all four people.</p>' +
'<div class="tcard"><div class="tn">variable in a rule</div><div class="tr"><span class="tk">Example</span><span><span class="m">smokes(X) :- stress(X).</span> covers persons 1 to 4 at once.</span></div><div class="tr"><span class="tk">Formal</span><span>A variable is universally quantified over the whole rule: <span class="m">∀X (smokes(X) ← stress(X))</span>; the rule stands for all its ground instances.</span></div></div>' +
'<p>Next, a rule also needs a chance. Not every smoker gets asthma, so we attach a chance to the rule itself. A rule that fires with a chance, written 0.4::head :- body, is called a <b>probabilistic rule</b>: when the body holds, the head holds with that chance, like 0.4 for asthma if smoking.</p>' +
'<div class="tcard"><div class="tn">probabilistic rule</div><div class="tr"><span class="tk">Example</span><span><span class="m">0.4::asthma(X) :- smokes(X).</span></span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">p::h :- b</span> abbreviates the rule <span class="m">h :- b, f</span> with a fresh independent probabilistic fact <span class="m">p::f</span>, so <span class="m">P(h | b) = p</span> for each ground instance.</span></div></div>' +
'<div class="flow"><div class="fs"><b>Stress</b><span>A person smokes if stressed.</span></div><div class="fs"><b>Friends</b><span>Or if a friend who influences them smokes.</span></div><div class="fs"><b>Asthma</b><span>Smoking raises the chance of asthma.</span></div></div>' +
'<pre class="code">smokes(X) :- stress(X).\nsmokes(X) :- friend(X,Y), influences(Y,X), smokes(Y).\n0.4::asthma(X) :- smokes(X).</pre>' +
'<p>Read line 1: X smokes if X is stressed.</p>' +
'<p>Read line 2: X smokes if X has a friend Y, Y influences X, and Y smokes.</p>' +
'<p>Read line 3: if X smokes, X gets asthma with chance 0.4.</p>' +
'<p>stress(X) and influences(Y,X) are probabilistic facts. friend(X,Y) lists the friendships.</p>' +
'<p>Both stress and several smoking friends add to the chance that X smokes.</p>' +
'<div class="callout example"><b class="t">EXAMPLE FROM THE LECTURE</b><p>4 people, 5 friendships. Evidence: <code>evidence(smokes(2), true).</code> and <code>evidence(influences(4,2), false).</code> This says: person 2 smokes, and person 4 does not influence person 2.</p>' +
'<table><tr><th>Query</th><th>Probability</th></tr><tr><td>smokes(1)</td><td>0.50877</td></tr><tr><td>smokes(3), smokes(4)</td><td>0.44</td></tr><tr><td>asthma(1)</td><td>0.203508</td></tr><tr><td>asthma(2)</td><td>0.4</td></tr><tr><td>asthma(3), asthma(4)</td><td>0.176</td></tr></table>' +
'<details class="more"><summary>More detail</summary><p>The probabilities of the stress and influence facts are in a figure, so the table is shown as reported.</p></details></div>' +
'<h2>Check the numbers yourself</h2>' +
'<p>An asthma case needs two things: the person smokes, and the asthma rule fires. Multiply the two chances.</p>' +
'<div class="cards">' +
'<div class="card"><h3>asthma(2)</h3><p>Person 2 smokes with certainty (evidence), so the smoking chance is 1, and the rule fires with probability 0.4.</p><p class="m">1 × 0.4 = 0.4</p></div>' +
'<div class="card"><h3>asthma(1)</h3><p>Smoking chance 0.50877, rule chance 0.4.</p><p class="m">0.4 × 0.50877 = 0.203508</p></div>' +
'<div class="card"><h3>asthma(3)</h3><p>Smoking chance 0.44, rule chance 0.4.</p><p class="m">0.4 × 0.44 = 0.176</p></div>' +
'</div>' +
'<div class="big"><span class="m">P(head) = rule probability × P(body)</span><small>Read: the chance of the head is the rule\'s chance times the chance of its condition. This holds when the only uncertainty is the rule itself.</small></div>' +
'<h2>Now change it</h2>' +
'<p>Replace the asthma rule by two rules: a person whose parent has asthma gets a higher chance. Add the fact <code>parentHasAsthma(1).</code> (the parent of person 1 has asthma).</p>' +
'<pre class="code">0.3::asthma(X) :- smokes(X), \\+ parentHasAsthma(X).\n0.5::asthma(X) :- smokes(X), parentHasAsthma(X).</pre>' +
'<p>Person 1 now uses the 0.5 rule, because the fact says the parent of person 1 has asthma.</p>' +
'<div class="chain"><span>person 1 uses the 0.5 rule</span><i>→</i><span>0.5 × 0.50877 = 0.254385</span><i>→</i><span>P(asthma(1)) ≈ 0.2544, up from 0.2035</span></div>' +
'<p>P(smokes(1)) does not change because the smoking rules are untouched.</p>',
      quiz: [
        { q: 'P(smokes(3)) = 0.44. What is P(asthma(3)) with the rule 0.4::asthma(X) :- smokes(X)?', o: [
          ok('0.176', '0.4 × 0.44.'),
          no('0.44', 'That ignores the rule probability.'),
          no('0.84', 'Probabilities of a rule and its body are multiplied, not added.')] },
        { q: 'Why is asthma(2) exactly 0.4?', o: [
          ok('Person 2 smokes by evidence, so only the rule probability remains', 'P(smokes(2)) = 1 under the evidence.'),
          no('Person 2 has no friends', 'Friends do not matter once smokes(2) is given as evidence.'),
          no('0.4 is the default for every person', 'Persons 1, 3 and 4 differ.')] }
      ] },

    { n: 7, title: 'Hidden Markov models', sub: 'A chain of hidden states, each emitting something you can see.',
      html: '' +
'<p class="lead">You cannot see the weather in Bob\'s city, but you hear what he did each day. Can you guess the weather?</p>' +
'<div class="callout idea"><b class="t">WORDS AND SYMBOLS YOU NEED</b><div class="cards">' +
'<div class="card"><p><b>hidden state</b> : something real you cannot see, like the weather in Bob\'s city.</p></div>' +
'<div class="card"><p><b>observation</b> : something you can see that depends on the hidden state, like Bob went for a walk.</p></div>' +
'<div class="card"><p><b>hidden Markov model</b> (HMM) : a chain of hidden states, each producing one observation, like weather and activity for each day.</p></div>' +
'<div class="card"><p><b>transition</b> : the chance of moving from today\'s state to tomorrow\'s, like rainy today to sunny tomorrow.</p></div>' +
'<div class="card"><p><b>emission</b> : the chance of an observation given its state, like walking on a sunny day.</p></div>' +
'<div class="card"><p><b>Markov assumption</b> : tomorrow depends only on today, not on earlier days, like yesterday\'s weather adds nothing.</p></div>' +
'<div class="card"><p><b>path</b> : one full guess of the hidden states, like rain, rain, sun.</p></div>' +
'<div class="card"><p><b>start probability</b> : the chance of each state on day 1, like rain on day 1 is 0.6.</p></div>' +
'<div class="card"><p><b>normalise</b> : divide each weight by the total so they add to 1, like 0.0864 out of 0.111, which is about 0.778.</p></div>' +
'<div class="card"><p><b>day index</b> (t) : the number of the day, like weather(2, W) asks about day 2.</p></div>' +
'<div class="card"><p><b>W in a query</b> : a placeholder for "which weather", like query(weather(2, W)).</p></div>' +
'<div class="card"><p><b>posterior</b> (P(path | observations), read "chance of the path given the observations") : the chance of a guess after seeing what Bob did.</p></div>' +
'</div></div>' +
'<p>Recap: lesson 5 gave a Bayesian network, where each node has a table for its parents and the joint is the product. An HMM is such a network arranged as a chain.</p>' +
'<h2>Start with a story</h2>' +
'<p>Alice lives far from Bob. She cannot see the weather there.</p>' +
'<p>Each day Bob tells her what he did: walk, shop or clean. On sunny days he mostly walks; on rainy days he mostly cleans.</p>' +
'<p>From his activities, Alice guesses the weather. That is a hidden Markov model. The next few paragraphs name its parts.</p>' +
'<p>First, which things does Alice see and which does she not? She never sees the weather, a real thing that is out of view. That is the <b>hidden state</b>. What she does hear is what Bob did on one day: something she can see that depends on the hidden state, like Bob went for a walk. This is an <b>observation</b>.</p>' +
'<div class="tcard"><div class="tn">hidden state</div><div class="tr"><span class="tk">Example</span><span>The weather on day t: rainy (R) or sunny (S).</span></div><div class="tr"><span class="tk">Formal</span><span>A latent random variable <span class="m">Sₜ</span> taking values in a finite set of states; it is never observed directly.</span></div></div>' +
'<div class="tcard"><div class="tn">observation</div><div class="tr"><span class="tk">Example</span><span>Bob went for a walk on day 1.</span></div><div class="tr"><span class="tk">Formal</span><span>A visible random variable <span class="m">Oₜ</span> whose distribution depends only on the hidden state <span class="m">Sₜ</span>.</span></div></div>' +
'<p>Now think about how the weather moves from one day to the next. Rainy today makes sunny tomorrow possible, with some chance. The chance of moving from today\'s state to tomorrow\'s, like rainy today to sunny tomorrow, is a <b>transition</b>.</p>' +
'<div class="tcard"><div class="tn">transition</div><div class="tr"><span class="tk">Example</span><span>R to S: 0.3; S to S: 0.6.</span></div><div class="tr"><span class="tk">Formal</span><span>The transition probability <span class="m">P(Sₜ₊₁ = s′ | Sₜ = s)</span>; for each s the values over s′ sum to 1.</span></div></div>' +
'<p>And how does the weather turn into what Bob does? On a sunny day he mostly walks. The chance of an observation given its state, like walking on a sunny day, is an <b>emission</b>. Each observation depends only on the state that emitted it.</p>' +
'<div class="tcard"><div class="tn">emission</div><div class="tr"><span class="tk">Example</span><span>Walk chance 0.1 on R and 0.6 on S.</span></div><div class="tr"><span class="tk">Formal</span><span>The emission probability <span class="m">P(Oₜ = o | Sₜ = s)</span>; for each s the values over o sum to 1.</span></div></div>' +
'<p>Here is a simplifying choice. To predict tomorrow\'s weather, do you need yesterday\'s as well as today\'s? We say no. The <b>Markov assumption</b> is that tomorrow depends only on today, not on earlier days: yesterday\'s weather adds nothing once you know today\'s.</p>' +
'<div class="tcard"><div class="tn">Markov assumption</div><div class="tr"><span class="tk">Example</span><span>Once today is rainy, knowing yesterday was sunny does not change the chance of tomorrow.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">P(Sₜ₊₁ | S₁, ..., Sₜ) = P(Sₜ₊₁ | Sₜ)</span>.</span></div></div>' +
'<p>We also need a starting point, since there is no yesterday for day 1. The chance of each state on day 1 is the <b>start probability</b>, like rain on day 1 is 0.6.</p>' +
'<div class="tcard"><div class="tn">start probability</div><div class="tr"><span class="tk">Example</span><span>Start R 0.6, S 0.4.</span></div><div class="tr"><span class="tk">Formal</span><span>The initial distribution <span class="m">π(s) = P(S₁ = s)</span>, with <span class="m">Σₛ π(s) = 1</span>.</span></div></div>' +
'<p>To say which day we mean we number them. The <b>day index</b> t is the number of the day: weather(2, W) asks about day 2.</p>' +
'<div class="tcard"><div class="tn">day index (t)</div><div class="tr"><span class="tk">Example</span><span><span class="m">weather(2, W)</span> asks about day 2.</span></div><div class="tr"><span class="tk">Formal</span><span>The time step <span class="m">t ∈ {1, ..., n}</span> that indexes <span class="m">Sₜ</span> and <span class="m">Oₜ</span>.</span></div></div>' +
'<p>In the ProbLog query, we do not know the weather, so we leave a blank. The <b>W in a query</b> is a placeholder for "which weather": query(weather(2, W)) asks which weather on day 2.</p>' +
'<div class="tcard"><div class="tn">W in a query</div><div class="tr"><span class="tk">Example</span><span><span class="m">query(weather(2, W)).</span> returns the chance of each weather on day 2.</span></div><div class="tr"><span class="tk">Formal</span><span>W is an unbound logic variable; the query returns <span class="m">P(weather(2, w) | evidence)</span> for every value w that makes it provable.</span></div></div>' +
'<p>One full guess of the weather for every day, like rain, rain, sun, is called a <b>path</b>.</p>' +
'<div class="tcard"><div class="tn">path</div><div class="tr"><span class="tk">Example</span><span>(R, R, S) for three days; with 2 states and 3 days there are 2³ = 8 paths.</span></div><div class="tr"><span class="tk">Formal</span><span>A sequence of hidden states <span class="m">s₁, ..., sₙ</span>, one per day.</span></div></div>' +
'<p>Of all the paths, which is most believable after hearing what Bob did? The chance of a path after seeing the observations is the <b>posterior</b>, written P(path | observations) and read "chance of the path given the observations".</p>' +
'<div class="tcard"><div class="tn">posterior (P(path | observations))</div><div class="tr"><span class="tk">Example</span><span>After two walks, P(S, S | walk, walk) = 0.0864 / 0.111 ≈ 0.778.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">P(s₁..ₙ | o₁..ₙ) = P(s₁..ₙ, o₁..ₙ) / Σ over all paths s′ of P(s′, o₁..ₙ)</span>, with <span class="m">P(s₁..ₙ, o₁..ₙ) = π(s₁) · e(o₁ | s₁) · Πₜ₌₂ⁿ a(sₜ₋₁, sₜ) · e(oₜ | sₜ)</span>.</span></div></div>' +
'<p>The path weights we compute will not add to 1 at first. To fix that, divide each weight by the total of all of them. This is what it means to <b>normalise</b>: divide each weight by the total so they add to 1, like weights 1, 1 and 2 (total 4) becoming 0.25, 0.25 and 0.5. The worked example below does this with 0.0864 out of 0.111.</p>' +
'<div class="tcard"><div class="tn">normalise</div><div class="tr"><span class="tk">Example</span><span>Weights 1, 1, 2 (total 4) become 0.25, 0.25, 0.5; 0.0864 / 0.111 ≈ 0.778.</span></div><div class="tr"><span class="tk">Formal</span><span>Given non-negative weights <span class="m">wᵢ</span> with total <span class="m">Z = Σⱼ wⱼ &gt; 0</span>, the normalised values are <span class="m">wᵢ / Z</span>, which sum to 1.</span></div></div>' +
'<p>Real uses of the same idea:</p>' +
'<div class="chain"><span>speech recognition</span><i>·</i><span>part-of-speech tagging</span><i>·</i><span>gene prediction</span><i>·</i><span>hidden market regimes</span></div>' +
'<div class="callout example"><b class="t">EXAMPLE FROM THE LECTURE: ALICE AND BOB</b><p>The hidden state is the weather (rainy or sunny). The observation is what Bob does each day (walk, shop, clean), and it depends only on that day\'s weather.</p><p>Alice guesses the weather from the activities. In ProbLog it takes four parts.</p>' +
'<div class="flow"><div class="fs"><b>Weather change</b><span>Probabilistic rules day to day.</span></div><div class="fs"><b>Activity</b><span>Probabilistic rules from weather.</span></div><div class="fs"><b>Observe</b><span><code>evidence(activity(t, a), true)</code> says that on day t Bob did a.</span></div><div class="fs"><b>Infer</b><span><code>query(weather(t, W))</code> asks which weather on day t.</span></div></div></div>' +
'<h2>How inference works</h2>' +
'<div class="flow"><div class="fs"><b>List paths</b><span>Every weather sequence. With 2 states and n days there are 2ⁿ.</span></div><div class="fs"><b>Weigh each</b><span>Start probability × emission of day 1 × transition × emission of day 2 × …</span></div><div class="fs"><b>Normalise</b><span>Divide by the total weight of all paths to get the posterior.</span></div></div>' +
'<p>This is the Bayesian network computation of lesson 5 on a chain.</p>' +
'<div class="callout example"><b class="t">WORKED EXAMPLE: TWO DAYS OF WALKING</b><p>The tool below uses these numbers: start R 0.6, S 0.4 (R is rainy, S is sunny). Transitions: R to R 0.7, R to S 0.3, S to R 0.4, S to S 0.6. Walk chance: 0.1 on R, 0.6 on S.</p>' +
'<p>Bob walks on day 1 and on day 2. There are 2 × 2 = 4 paths.</p>' +
'<div class="chain"><span>R, R</span><i>→</i><span>0.6 × 0.1 × 0.7 × 0.1</span><i>→</i><span>0.0042</span></div>' +
'<div class="chain"><span>R, S</span><i>→</i><span>0.6 × 0.1 × 0.3 × 0.6</span><i>→</i><span>0.0108</span></div>' +
'<div class="chain"><span>S, R</span><i>→</i><span>0.4 × 0.6 × 0.4 × 0.1</span><i>→</i><span>0.0096</span></div>' +
'<div class="chain"><span>S, S</span><i>→</i><span>0.4 × 0.6 × 0.6 × 0.6</span><i>→</i><span>0.0864</span></div>' +
'<p>Total weight: 0.0042 + 0.0108 + 0.0096 + 0.0864 = 0.111.</p>' +
'<p>Normalise the path sunny, sunny: 0.0864 / 0.111 ≈ 0.778.</p>' +
'<p>Two days of walking make sunshine on both days the most likely weather.</p></div>' +
'<details class="more"><summary>More detail</summary><p>Real systems use the forward algorithm to avoid listing all paths, but the answer is the same.</p></details>' +
'<h2>Try it</h2>' +
'<p>Pick an activity for each day in the drop-down boxes. Read the table of paths and the most likely weather.</p>' +
'<p>Try walk, walk, walk and then clean, clean, clean.</p>' +
'{{w:hmm|{"title":"ALICE INFERS THE WEATHER"}}}' +
'<div class="vs"><div class="good"><h4>WALKS</h4><p>Point to sunshine.</p></div><div class="bad"><h4>CLEANING</h4><p>Points to rain.</p></div></div>' +
'<p>The transition probabilities smooth the guess across days.</p>',
      quiz: [
        { q: 'In an HMM, an observation on day t depends on', o: [
          ok('the hidden state on day t only', 'This is the Markov and emission assumption.'),
          no('all earlier observations', 'The state carries all the information needed.'),
          no('the observation on day t − 1', 'Observations are linked only through the hidden states.')] },
        { q: 'A 3-day observation sequence and 2 hidden states. How many hidden paths are enumerated?', o: [
          ok('8', '2³: one weather choice per day.'),
          no('6', 'That would be 2 × 3; choices multiply across days.'),
          no('3', 'That is the number of days.')] }
      ] },

    { n: 8, title: 'Parameter learning', sub: 'Letting ProbLog estimate the probabilities from examples.',
      html: '' +
'<p class="lead">You do not know a probability: can the computer work it out from data?</p>' +
'<div class="callout idea"><b class="t">WORDS AND SYMBOLS YOU NEED</b><div class="cards">' +
'<div class="card"><p><b>parameter</b> : a number in the program that you may not know, like the chance of burglary.</p></div>' +
'<div class="card"><p><b>learning</b> : letting the computer fill in the parameters from data, like counting heads in 8 flips.</p></div>' +
'<div class="card"><p><b>example</b> : one recorded case listing what was seen, like burglary false and alarm false.</p></div>' +
'<div class="card"><p><b>dataset</b> : a list of examples, like 8 nights of records.</p></div>' +
'<div class="card"><p><b>t(...)</b> : a mark in front of a probability meaning "learn this one", like t(0.5)::burglary.</p></div>' +
'<div class="card"><p><b>underscore</b> (_) : means no start value given, like t(_) is learn from a random start.</p></div>' +
'<div class="card"><p><b>dashes</b> (-----) : the line that separates one example from the next in a dataset.</p></div>' +
'<div class="card"><p><b>fully observed</b> : every variable is seen in every example, like both burglary and alarm are recorded each night.</p></div>' +
'<div class="card"><p><b>hidden</b> : some variable is not recorded, like not knowing whether a burglary happened.</p></div>' +
'<div class="card"><p><b>expectation-maximisation</b> : guess, improve the guess using the data, and repeat, like tuning a radio step by step.</p></div>' +
'</div></div>' +
'<p>Recap: lesson 4 gave ProbLog facts such as 0.5::burglary., and lesson 5 gave the alarm network with chances you were handed.</p>' +
'<h2>Start with a story</h2>' +
'<p>You have a coin and do not know if it is fair. You flip it 8 times and get 3 heads.</p>' +
'<p>A natural estimate of the chance of heads is 3 out of 8, which is 0.375.</p>' +
'<p>The chance of heads is a number you did not know, but you needed it. A number in a program that you may not know is called a <b>parameter</b>.</p>' +
'<div class="tcard"><div class="tn">parameter</div><div class="tr"><span class="tk">Example</span><span>The chance of heads (estimated 3/8 = 0.375); the chance of burglary.</span></div><div class="tr"><span class="tk">Formal</span><span>A parameter is a probability <span class="m">p</span> of a probabilistic fact <span class="m">p::f</span> (or table entry) whose value is to be estimated from data.</span></div></div>' +
'<p>You found it by looking at what happened. Each flip is a recorded case, and a case listing what was seen is called an <b>example</b>, like burglary false and alarm false on one night in the alarm network.</p>' +
'<div class="tcard"><div class="tn">example</div><div class="tr"><span class="tk">Example</span><span>One night: <span class="m">evidence(burglary,false). evidence(alarm,false).</span></span></div><div class="tr"><span class="tk">Formal</span><span>A set of observed truth values (<span class="m">evidence(a, true/false)</span>) for atoms of the program, one training case.</span></div></div>' +
'<p>A list of examples is called a <b>dataset</b>, like 8 nights of records. For the coin, 8 flips.</p>' +
'<div class="tcard"><div class="tn">dataset</div><div class="tr"><span class="tk">Example</span><span>8 nights of records; 8 coin flips.</span></div><div class="tr"><span class="tk">Formal</span><span>A finite list of examples <span class="m">D = (e₁, ..., eₘ)</span> from which the parameters are learned.</span></div></div>' +
'<p>ProbLog does the same for the chances in a program: it counts what the data says. Letting the computer fill in the parameters from data is called <b>learning</b>.</p>' +
'<div class="tcard"><div class="tn">learning</div><div class="tr"><span class="tk">Example</span><span>From 3 heads in 8 flips, learn <span class="m">t(_)::heads</span> to be 0.375.</span></div><div class="tr"><span class="tk">Formal</span><span>Parameter learning: given a program with unknown parameters and a dataset D, find parameter values that maximise the likelihood <span class="m">P(D | parameters)</span>.</span></div></div>' +
'<h2>The idea</h2>' +
'<p>You do not always know the numbers. So in the program, we need to tell ProbLog which probabilities are unknown.</p>' +
'<p>Put a mark in front of the probability to say "learn this one". The mark is <b>t(...)</b>, like t(0.5)::burglary.</p>' +
'<div class="tcard"><div class="tn">t(...)</div><div class="tr"><span class="tk">Example</span><span><span class="m">t(0.5)::burglary.</span> learn this probability, starting at 0.5.</span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">t(p)::f</span> declares a probabilistic fact f with a learnable parameter and initial value p.</span></div></div>' +
'<p>Sometimes you have no idea of a good starting value. Then leave the slot blank with an <b>underscore</b> (_): t(_) means learn from a random start.</p>' +
'<div class="tcard"><div class="tn">underscore (_)</div><div class="tr"><span class="tk">Example</span><span><span class="m">t(_)::alarm :- burglary, earthquake.</span></span></div><div class="tr"><span class="tk">Formal</span><span><span class="m">t(_)</span> declares a learnable parameter with no given initial value; learning starts from a random value.</span></div></div>' +
'<table><tr><th>Form</th><th>Example</th><th>Meaning</th></tr>' +
'<tr><td><code>t(_)</code></td><td><code>t(_)::alarm :- burglary, earthquake.</code></td><td>learn, random start</td></tr>' +
'<tr><td><code>t(p)</code></td><td><code>t(0.5)::burglary.</code></td><td>learn, start at p (here p stands for a number you choose, like 0.5)</td></tr>' +
'<tr><td><code>p</code></td><td><code>0.2::earthquake.</code></td><td>fixed, not learned</td></tr></table>' +
'<div class="flow"><div class="fs"><b>Program</b><span>With t(...) marks.</span></div><div class="fs"><b>Dataset</b><span>Examples separated by <code>-----</code>, each a set of <code>evidence(...)</code> lines.</span></div><div class="fs"><b>Output</b><span>The same program with every <code>t(...)</code> replaced by the learned number.</span></div></div>' +
'<p>One example in a dataset looks like this: on this night there was no burglary and no alarm.</p>' +
'<pre class="code">evidence(burglary,false).\nevidence(alarm,false).\n-----</pre>' +
'<p>How does ProbLog know where one night ends and the next begins? The line ----- is called the <b>dashes</b>, and it separates one example from the next in a dataset.</p>' +
'<div class="tcard"><div class="tn">dashes (-----)</div><div class="tr"><span class="tk">Example</span><span><span class="m">evidence(alarm,false).</span> then <span class="m">-----</span> then the next night.</span></div><div class="tr"><span class="tk">Formal</span><span>In a ProbLog learning dataset, a line of dashes is the delimiter between consecutive examples.</span></div></div>' +
'<h2>What "learned" means</h2>' +
'<p>Look at your records. Did you write down every variable on every night? If both burglary and alarm are recorded each night, the data is <b>fully observed</b>.</p>' +
'<div class="tcard"><div class="tn">fully observed</div><div class="tr"><span class="tk">Example</span><span>Every night records both burglary and alarm.</span></div><div class="tr"><span class="tk">Formal</span><span>Every random variable of the model has an observed value in every example; the maximum-likelihood estimate of a prior is then the relative frequency of the fact being true.</span></div></div>' +
'<p>If you forgot to record one, like not knowing whether a burglary happened, that variable is <b>hidden</b>.</p>' +
'<div class="tcard"><div class="tn">hidden</div><div class="tr"><span class="tk">Example</span><span>Burglary is never recorded, only the alarm.</span></div><div class="tr"><span class="tk">Formal</span><span>A hidden (latent) variable is a variable of the model whose value is not observed in some or all examples.</span></div></div>' +
'<p>Hidden variables make counting impossible, because there is nothing to count. So ProbLog guesses, improves the guess using the data, and repeats. Such a loop is called <b>expectation-maximisation</b>, like tuning a radio step by step.</p>' +
'<div class="tcard"><div class="tn">expectation-maximisation (EM)</div><div class="tr"><span class="tk">Example</span><span>Guess burglary chance 0.5, compute expected counts given the alarm data, re-estimate, repeat.</span></div><div class="tr"><span class="tk">Formal</span><span>EM iterates an E-step (compute expected sufficient statistics of the hidden variables under the current parameters) and an M-step (set the parameters to maximise the likelihood given those expected counts); the likelihood never decreases.</span></div></div>' +
'<div class="vs"><div class="good"><h4>FULLY OBSERVED</h4><p>The learned probability is the fraction of examples where the fact is true.</p></div><div class="bad"><h4>SOME HIDDEN</h4><p>ProbLog improves the estimate step by step (expectation-maximisation). No closed form.</p></div></div>' +
'<div class="callout example"><b class="t">WORKED EXAMPLE: COUNTING</b><p>The tool below starts with 8 examples. Burglary is true in 2 of them and earthquake is true in 3.</p>' +
'<div class="chain"><span>t(_)::burglary</span><i>→</i><span>2 / 8</span><i>→</i><span>0.25</span></div>' +
'<div class="chain"><span>t(_)::earthquake</span><i>→</i><span>3 / 8</span><i>→</i><span>0.375</span></div></div>' +
'<h2>Try it</h2>' +
'<p>The demo covers the fully observed case. Click a true or false cell to flip it, click add example or remove to change the dataset, and watch the learned numbers move.</p>' +
'{{w:learnfreq|{"title":"LEARNING A PRIOR FROM FULLY OBSERVED EXAMPLES"}}}' +
'<div class="big"><span class="m">learned prior = (examples with the fact true) / (number of examples)</span><small>Read: count the examples where the fact holds, and divide by the count of all examples.</small></div>',
      quiz: [
        { q: 'In t(0.5)::burglary. the 0.5 is', o: [
          ok('the starting value that learning will adjust', 'Plain p without t(...) would be fixed.'),
          no('a fixed probability', 'Fixed probabilities are written without t(...).'),
          no('the number of examples', 'It is a probability.')] },
        { q: 'Fully observed data: 3 of 8 examples have burglary true. The learned prior is', o: [
          ok('3/8 = 0.375', 'The fraction of examples where the fact holds.'),
          no('0.5', 'That would be the start value, not the estimate.'),
          no('8/3', 'A probability cannot exceed 1.')] }
      ] }
  ] });
})();
