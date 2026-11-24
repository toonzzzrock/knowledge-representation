/* Module 6 glossary extras: breakdown steps, examples, common confusion. Keys are 'lesson|term' exactly as in the lesson glossary. */
UI.glossExtra({
  '6.1|uncertainty': {
    match: [],
    steps: [
      'Uncertainty means you do not know exactly how things will turn out.',
      'You can still list the ways it might turn out.',
      'More information shrinks uncertainty, but it may never reach zero, so we reason with it instead of waiting for it to go away.',
      'Probability (next terms) is the tool that puts numbers on it.'
    ],
    ex: [
      'Tomorrow\'s weather: rain or sun. You do not know which.',
      'Two coins in the air: four outcomes are possible until they land.',
      'A die before the roll: six outcomes, each possible.',
      'Not uncertain: 2 + 2. Only one outcome is possible, and you know it.'
    ]
  },
  '6.1|world': {
    match: ['ω', 'possible world', 'possible worlds'],
    steps: [
      'A world is one complete way things could turn out.',
      '"Complete" means it settles every detail you care about, with nothing left open.',
      'Exactly one world is the true one, but you do not know which.',
      'We write a world as ω (the Greek letter omega).'
    ],
    ex: [
      'Two coins: <span class="m">H1H2</span> (coin 1 heads, coin 2 heads) is one world.',
      'The same two coins have 4 worlds in total: H1H2, H1T2, T1H2, T1T2.',
      'One die: the world "it shows 5". There are 6 worlds.',
      'Not a world: "coin 1 shows heads". It leaves coin 2 open, so it covers two worlds and is an event.'
    ],
    mix: 'World vs event: a world is one single complete outcome. An event is a group of worlds.'
  },
  '6.1|set of all worlds': {
    match: ['set of worlds'],
    steps: [
      'W is the list of every world, with none missing and none repeated.',
      'It is written in curly brackets, like <span class="m">{ H1H2, H1T2, T1H2, T1T2 }</span>.',
      'Whatever happens, the true world is one of the members of W.'
    ],
    ex: [
      'Two coins: W has 4 worlds.',
      'One die: W = {1, 2, 3, 4, 5, 6}, so 6 worlds.',
      'Two dice: each of 6 faces for die 1 with each of 6 faces for die 2, so 6 × 6 = 36 worlds.',
      'Weather tomorrow, if you only care about rain or sun: W = {rain, sun}, 2 worlds.'
    ],
    mix: 'W is the set of all worlds. A single world is ω, and an event E is a part of W.'
  },
  '6.1|probability of a world': {
    match: ['P(ω)'],
    steps: [
      'P(ω) is a number for world ω saying how likely that world is.',
      'It is never below 0 and never above 1. 0 means impossible, 1 means certain.',
      'Add the numbers of all worlds in W and you must get exactly 1.'
    ],
    ex: [
      'Fair coin 1 and biased coin 2: <span class="m">P(H1H2) = 0.5 × 0.6 = 0.3</span>.',
      'The four worlds get 0.3, 0.2, 0.3, 0.2. They add to 1.0, so this is allowed.',
      'Not allowed: 0.3, 0.3, 0.3, 0.3. They add to 1.2, more than 1.',
      'Not allowed: a world with P = 1.5, or P = -0.1.'
    ],
    mix: 'P(ω) is for one world. P(E) (an event) is the sum of P(ω) over the worlds in E.'
  },
  '6.1|sum': {
    match: ['Σ', 'add up', 'adds'],
    steps: [
      'Σ (the Greek capital sigma) means "add up".',
      'Under it you say which items to add. Here: the P(ω) of the worlds in an event.',
      'In module 6 Σ always means this sum.'
    ],
    ex: [
      'Σ of 0.3 and 0.2 is 0.5.',
      'Σ of 0.1, 0.2, 0.3, 0.4 is 1.0.',
      'Event E = {H1H2, T1T2}: <span class="m">P(E) = Σ P(ω) = 0.3 + 0.2 = 0.5</span>.',
      'Sum of the four coin worlds: 0.3 + 0.2 + 0.3 + 0.2 = 1.'
    ],
    mix: 'Σ adds a list. Π (module 6.5) multiplies a list. In module 5 the same letter Σ meant a set of atoms.'
  },
  '6.1|event': {
    match: [],
    steps: [
      'An event is a group of worlds that you care about.',
      'You choose the group by a question: "do both coins match?"',
      'Every world in the group counts as "the event happened".',
      'It can hold one world, many worlds, none, or all of W.'
    ],
    ex: [
      'Both coins match: <span class="m">E = {H1H2, T1T2}</span>.',
      'Coin 1 shows heads: <span class="m">{H1H2, H1T2}</span>, two worlds.',
      'One world alone is a (small) event: <span class="m">{H1H2}</span>.',
      'The empty event {} has P = 0. The event W itself has P = 1.'
    ],
    mix: 'World vs event: a world is one complete outcome. An event is a set of worlds, and the true world either lies in it or not.'
  },
  '6.1|made of worlds from W': {
    match: ['⊆'],
    steps: [
      '⊆ is read "is a part of" (a subset of).',
      'A ⊆ B means every member of A is also a member of B.',
      'E ⊆ W says: the event E uses only worlds that exist in W.'
    ],
    ex: [
      '<span class="m">{H1H2} ⊆ W</span> is true: that world is in W.',
      '<span class="m">{H1H2, T1T2} ⊆ W</span> is true.',
      '<span class="m">{a, b} ⊆ {a, b, c}</span> is true.',
      '<span class="m">{a, d} ⊆ {a, b, c}</span> is false, because d is not in the right group.'
    ],
    mix: 'W ⊆ W is true too: the whole set counts as a part of itself.'
  },
  '6.1|probability of an event': {
    match: ['P(E)'],
    steps: [
      'List the worlds that are in the event E.',
      'Look up P(ω) for each one.',
      'Add them: <span class="m">P(E) = Σ P(ω)</span> over the worlds ω in E.',
      'The answer is between 0 and 1.'
    ],
    ex: [
      'E = both coins match: <span class="m">P(E) = 0.3 + 0.2 = 0.5</span>.',
      'E = coin 1 heads = {H1H2, H1T2}: <span class="m">0.3 + 0.2 = 0.5</span>.',
      'E = coin 2 heads = {H1H2, T1H2}: <span class="m">0.3 + 0.3 = 0.6</span>, the bias of coin 2.',
      'E = W gives 1 (certain). E = {} gives 0 (impossible).'
    ],
    mix: 'P(E) is a sum over worlds, not a product. You add world numbers, and you multiply only inside one world (for independent coins).'
  },
  '6.1|H1, T1, H2, T2': {
    match: ['H1', 'T1', 'H2', 'T2'],
    nolink: true,
    steps: [
      'H is heads and T is tails.',
      'The small number says which coin: 1 or 2.',
      'A world glues two of them: <span class="m">H1T2</span> means coin 1 heads, coin 2 tails.'
    ],
    ex: [
      '<span class="m">H1</span>: coin 1 shows heads, chance 0.5 (fair coin).',
      '<span class="m">T2</span>: coin 2 shows tails, chance 0.4 (biased coin).',
      '<span class="m">T1H2</span>: coin 1 tails and coin 2 heads, chance 0.5 × 0.6 = 0.3.',
      'Not a world: <span class="m">H1T1</span>. One coin cannot show both.'
    ]
  },
  '6.1|independent': {
    match: ['independence'],
    nolink: true,
    steps: [
      'Two things are independent when learning one tells you nothing about the other.',
      'Then the chance of both is the chance of the first times the chance of the second.',
      'This is a modelling choice: you decide it fits (two coins in two rooms).'
    ],
    ex: [
      'Fair coin 1 and biased coin 2: <span class="m">P(H1H2) = 0.5 × 0.6 = 0.3</span>.',
      '<span class="m">P(T1T2) = 0.5 × 0.4 = 0.2</span>.',
      'Not independent: two coins glued so they always match. Then P(H1H2) is 0.5, not 0.5 × 0.6.',
      'Not independent: "it rains" and "the street is wet". Seeing one changes your belief about the other.'
    ],
    mix: 'Independent does not mean "cannot both happen". Independent coins can both land heads, with probability 0.3.'
  },

  '6.2|fact': {
    match: ['facts'],
    steps: [
      'A fact is a statement the program takes as true, with no condition attached.',
      'It has no arrow and no body.',
      'In the coin game, which coin sides came up are the facts of a world.'
    ],
    ex: [
      '<span class="m">head1.</span> means coin 1 shows heads.',
      '<span class="m">tail2.</span> means coin 2 shows tails.',
      'World ω1 has the facts head1 and head2.',
      'Not a fact: <span class="m">win(10) &lt;- head1, head2.</span> It has an arrow and a condition, so it is a rule.'
    ],
    mix: 'Fact vs rule: a fact is always true in its world. A rule only fires when its body is true.'
  },
  '6.2|rule': {
    match: ['<-', 'rules'],
    steps: [
      'A rule has a head on the left, an arrow, and a body on the right.',
      'The arrow reads "if": the head is true if the body is true.',
      'If the body is false, the rule says nothing about the head.'
    ],
    ex: [
      '<span class="m">win(10) &lt;- head1, head2.</span> : you win 10 if both coins show heads.',
      '<span class="m">win(-5) &lt;- head1, tail2.</span> : lose 5 if coin 1 heads and coin 2 tails.',
      '<span class="m">win(0) &lt;- not win(10), not win(-5).</span> : draw if neither of the others holds.'
    ],
    mix: 'Lesson 2 writes the arrow as &lt;-. From lesson 4 (ProbLog) the same idea is written :-.'
  },
  '6.2|comma in a rule': {
    match: [],
    nolink: true,
    steps: [
      'In the body of a rule, a comma means "and".',
      'Every part separated by commas must hold.',
      'If even one part fails, the body fails.'
    ],
    ex: [
      '<span class="m">head1, head2</span> : both coins heads.',
      '<span class="m">head1, tail2</span> : coin 1 heads and coin 2 tails.',
      'In world T1H2 the body <span class="m">head1, head2</span> fails, because head1 is false.',
      'Not "or": a comma never means "one of them".'
    ]
  },
  '6.2|not': {
    match: [],
    nolink: true,
    steps: [
      'In the rule language, "not" means "cannot be shown".',
      '<span class="m">not win(10)</span> is true when the rules and facts of that world do not prove win(10).',
      'This is a check on what you can prove, not a claim about the real world.'
    ],
    ex: [
      'World H1T2: win(10) cannot be shown, so <span class="m">not win(10)</span> holds.',
      'World H1H2: win(10) is shown, so <span class="m">not win(10)</span> fails.',
      'The draw rule needs both: <span class="m">not win(10), not win(-5)</span>, true in worlds T1H2 and T1T2.'
    ],
    mix: 'Not the same as "false in the real world". It only says the proof does not go through.'
  },
  '6.2|knowledge base': {
    match: ['knowledge bases'],
    steps: [
      'A knowledge base K is everything the reasoner knows.',
      'It has a certain part: rules that always hold.',
      'It has an uncertain part: chances for the things that vary.',
      'Together they say what follows, and how likely it is.'
    ],
    ex: [
      'The coin game: three win rules (certain) plus the coin chances (uncertain).',
      'Formally <span class="m">K = (W, P, {Δω})</span>: worlds, their chances, and one rulebook per world.',
      'A plain knowledge base with no chances is the one-world case: it answers yes (1) or no (0).'
    ]
  },
  '6.2|certain part': {
    match: ['Δ'],
    steps: [
      'The certain part Δ (Greek capital delta) holds rules that are true in every world.',
      'It does not depend on how the coins land.',
      'It is the rulebook shared by all worlds.'
    ],
    ex: [
      'The three win rules form Δ in the coin game.',
      '<span class="m">win(10) &lt;- head1, head2.</span> is in Δ.',
      'Not in Δ: <span class="m">head1</span>. Whether coin 1 shows heads changes from world to world.'
    ],
    mix: 'Δ is shared by all worlds. Δω (next to it) is Δ plus the facts of one world.'
  },
  '6.2|uncertain part': {
    match: ['P₁', 'P₂'],
    steps: [
      'The uncertain part says how likely each outcome is.',
      'It comes as one chance table per random thing, like P₁ for coin 1 and P₂ for coin 2.',
      'Each table adds up to 1.'
    ],
    ex: [
      '<span class="m">P₁ = {head1 ↦ 0.5, tail1 ↦ 0.5}</span> : fair coin 1, 0.5 + 0.5 = 1.',
      '<span class="m">P₂ = {head2 ↦ 0.6, tail2 ↦ 0.4}</span> : biased coin 2, 0.6 + 0.4 = 1.',
      'Not allowed: head2 ↦ 0.7 and tail2 ↦ 0.4. They add to 1.1.'
    ]
  },
  '6.2|is given probability': {
    match: ['↦'],
    steps: [
      'The arrow ↦ links a fact on the left to a chance on the right.',
      '<span class="m">head1 ↦ 0.5</span> reads "head1 has chance 0.5".',
      'It only labels a fact with a number. It is not the rule arrow.'
    ],
    ex: [
      '<span class="m">head1 ↦ 0.5</span>',
      '<span class="m">head2 ↦ 0.6</span>',
      '<span class="m">tail2 ↦ 0.4</span>',
      'Not this: <span class="m">win(10) &lt;- head1</span>. That arrow means "if", not "has chance".'
    ]
  },
  '6.2|world\'s own knowledge base': {
    match: ['Δω'],
    steps: [
      'Pick one world ω.',
      'Take the certain part Δ.',
      'Add the facts that are true in that world.',
      'The result, Δω, is the rulebook you reason with if that world is the real one.'
    ],
    ex: [
      'World H1H2: <span class="m">Δω1 = Δ ∪ {head1, head2}</span>.',
      'World H1T2: <span class="m">Δω2 = Δ ∪ {head1, tail2}</span>.',
      'The coin game has 4 worlds, so 4 rulebooks Δω1 to Δω4.',
      'In Δω1 you can derive win(10). In Δω3 (T1H2) you cannot.'
    ],
    mix: 'Δ is one rulebook for all worlds. Δω is Δ plus the facts of just one world.'
  },
  '6.2|statement': {
    match: ['φ'],
    nolink: true,
    steps: [
      'φ (Greek letter phi) stands for any claim you want to ask about.',
      'You replace it by a real claim, such as win(10).',
      'It lets us write one formula that works for every question.'
    ],
    ex: [
      'φ = <span class="m">win(10)</span>',
      'φ = <span class="m">win(-5)</span>',
      'φ = <span class="m">win(0)</span>',
      'In <span class="m">P(K ⊨ φ)</span> you can read "φ" as "your question".'
    ]
  },
  '6.2|follows for sure': {
    match: ['⊨', 'entails', 'entailment'],
    steps: [
      'Δω ⊨ φ says: with these facts and rules, φ is forced. It cannot fail.',
      'This is a yes or no question about one rulebook.',
      'The probability comes later, by adding the worlds where the answer is yes.'
    ],
    ex: [
      '<span class="m">Δω1 ⊨ win(10)</span> : head1 and head2 hold in ω1, so the rule fires.',
      '<span class="m">Δω2 ⊭ win(10)</span> : head2 is not there, so win(10) is not forced.',
      '<span class="m">Δω2 ⊨ win(-5)</span> : head1 and tail2 hold.'
    ],
    mix: 'Entails is about being forced by the facts and rules. The probability of it, P(K ⊨ φ), is the sum over worlds.'
  },
  '6.2|chance that K entails φ': {
    match: ['P(K ⊨ φ)'],
    steps: [
      'Go through each world ω.',
      'Ask: does Δω force φ? Yes or no.',
      'Add P(ω) for the worlds that say yes.',
      'That sum is <span class="m">P(K ⊨ φ)</span>.'
    ],
    ex: [
      'win(10): only ω1 says yes, so <span class="m">P = 0.3</span>.',
      'win(-5): only ω2, so <span class="m">P = 0.2</span>.',
      'win(0): ω3 and ω4, so <span class="m">P = 0.3 + 0.2 = 0.5</span>.',
      'The three answers 0.3 + 0.2 + 0.5 = 1, since every world gives exactly one prize.',
      'A plain rulebook (one world) gives 1 if it forces φ, else 0.'
    ]
  },
  '6.2|expected gain': {
    match: ['expected value'],
    steps: [
      'List each prize and its chance.',
      'Multiply each prize by its chance.',
      'Add the results.',
      'The total is the average winnings per play if you play many times.'
    ],
    ex: [
      'Coin game: <span class="m">10 × 0.3 + (-5) × 0.2 + 0 × 0.5 = 3 - 1 + 0 = 2</span> coins per game.',
      'A game that pays 4 with chance 0.25 and 0 otherwise: <span class="m">4 × 0.25 = 1</span>.',
      'Not the same as the top prize: the biggest prize is 10, but the average is 2.'
    ],
    mix: 'The expected gain is not a prize you can win in one play. It is the average over many plays.'
  },

  '6.3|formalism': {
    match: ['formalisms'],
    steps: [
      'A formalism is one fixed way of writing knowledge down.',
      'It says what the pieces look like and what counts as a conclusion.',
      'Lesson 3 shows three formalisms that all share the same pattern: worlds with chances, plus one ordinary object per world.'
    ],
    ex: [
      'Probabilistic propositional knowledge base: each world has a set of formulas.',
      'Probabilistic logic program: each world has a logic program.',
      'Probabilistic argumentation: each world has a set of arguments and attacks.'
    ]
  },
  '6.3|object per world': {
    match: ['𝒪ω'],
    steps: [
      'Each world ω gets its own ordinary (non-probabilistic) object 𝒪ω.',
      'The object can be a rulebook, a logic program, or a debate of arguments.',
      'You ask a yes or no question of it, in that world only.',
      'Add the chances of the worlds where the answer is yes.'
    ],
    ex: [
      'Knowledge base: 𝒪ω is the rulebook Δω.',
      'Logic program: 𝒪ω is a program that runs.',
      'Argumentation: 𝒪ω is a framework of arguments and attacks.',
      'Coin game: <span class="m">𝒪ω1 = Δ ∪ {head1, head2}</span> in world H1H2.'
    ],
    mix: 'The probability is only in the weights P(ω) on worlds. The object inside each world has no probability.'
  },
  '6.3|proves': {
    match: ['⊢', 'provability', 'provable'],
    steps: [
      'A proof is a chain of rule uses that ends at a claim.',
      '<span class="m">Δω ⊢ φ</span> says such a chain exists in the rulebook Δω.',
      'It is a yes or no answer about one world.'
    ],
    ex: [
      '<span class="m">Δω1 ⊢ win(10)</span> : use head1 and head2 in the first win rule.',
      '<span class="m">Δω2 ⊢ win(-5)</span> : use head1 and tail2.',
      '<span class="m">Δω3 ⊬ win(10)</span> : head1 is missing, no chain reaches win(10).'
    ],
    mix: '⊨ (entails) asks whether a claim is forced. ⊢ (proves) asks whether a proof method actually finds a proof. A sound and complete method makes them agree.'
  },
  '6.3|proof method': {
    match: ['proof system', 'resolution'],
    steps: [
      'A proof method is a fixed procedure for building proofs.',
      'It is the machine behind ⊢.',
      'Logic programs use resolution by default.'
    ],
    ex: [
      'Resolution: the method Prolog-style programs use.',
      'Natural deduction: another way to build proofs, from module 5.',
      'The method is only written R in the formula, so any good method can take its place.'
    ]
  },
  '6.3|sound and complete': {
    match: ['sound', 'complete'],
    nolink: true,
    steps: [
      'Sound: everything the method proves is really true.',
      'Complete: everything that is really true, the method can prove.',
      'Both together: the method proves exactly the true claims, no more and no less.'
    ],
    ex: [
      'Perfect answer key: it lists all correct answers (complete) and no wrong ones (sound).',
      'Not sound: a method that also "proves" win(10) in world T1H2.',
      'Not complete: a method that cannot prove win(10) in world H1H2, even though it is true.'
    ],
    mix: 'Sound is about no false answers. Complete is about no missing answers.'
  },
  '6.3|logic program': {
    match: ['logic programs'],
    steps: [
      'A logic program is a set of facts and rules.',
      'It is written so a computer can run it.',
      'Asking it a question means looking for a proof.'
    ],
    ex: [
      'Three win rules plus head1 and head2 form a small logic program.',
      'In a probabilistic logic program each world has its own such program.',
      'Not a logic program: a plain list of numbers with no rules.'
    ]
  },
  '6.3|argument': {
    match: ['arguments'],
    steps: [
      'An argument is a claim plus the reasons that support it.',
      'It can be right or wrong, and other arguments can challenge it.',
      'In argumentation we do not ask if it is true, only whether it survives.'
    ],
    ex: [
      '"It rained, so the grass is wet."',
      '"Tweety is a bird, so Tweety flies."',
      '"Tweety is a penguin, so Tweety does not fly."',
      'Not an argument: a bare claim like "Tweety flies" with no reason.'
    ]
  },
  '6.3|attack': {
    match: ['attacks'],
    steps: [
      'An attack is an arrow from one argument to another.',
      'It means the first argument contradicts, or undermines, the second.',
      'Attacks make arguments compete.'
    ],
    ex: [
      '"Tweety is a penguin, so it does not fly" attacks "Tweety is a bird, so it flies".',
      'The lesson example: "the sprinkler ran" is set against "it rained" as two competing explanations.',
      'No attack: "Tweety is a bird" and "Tweety has feathers" do not contradict each other.'
    ]
  },
  '6.3|argumentation framework': {
    match: ['F', 'framework'],
    steps: [
      'A framework is a set of arguments.',
      'Plus a list of attacks between them.',
      'Draw it as dots (arguments) and arrows (attacks).'
    ],
    ex: [
      'Two dots A and B with one arrow B to A: B attacks A.',
      'Three dots in a chain C to B to A: C attacks B, B attacks A.',
      'One dot with no arrows: a single argument nobody challenges.'
    ]
  },
  '6.3|acceptable under semantics': {
    match: ['σ', 'acceptable', 'semantics'],
    steps: [
      'Pick a survival rule, called a semantics, written σ.',
      'An argument is acceptable if it survives under that rule.',
      'In the formula, <span class="m">F ⊢σ A</span> says A is acceptable in framework F.'
    ],
    ex: [
      'Argument B with nobody attacking it: acceptable, nobody beats it.',
      'Argument A attacked by an acceptable B: not acceptable.',
      'Different survival rules can give different answers for the same framework.'
    ]
  },
  '6.3|conclusion of an argument': {
    match: ['π', 'conclusion'],
    steps: [
      'Every argument ends in a claim, its conclusion.',
      'π (Greek letter pi) stands for that claim.',
      'In structured argumentation you ask: is some acceptable argument ending in π?'
    ],
    ex: [
      'Argument "it rained, so the grass is wet": conclusion = the grass is wet.',
      'Argument "Tweety is a bird, so it flies": conclusion = Tweety flies.',
      'Two different arguments can share the same conclusion.'
    ],
    mix: 'In module 6, π is a conclusion. In lesson 6.5 (Bayesian networks), capital Π means a product.'
  },
  '6.3|PLP, PAA, PSAA': {
    match: ['PLP', 'PAA', 'PSAA'],
    nolink: true,
    steps: [
      'Three short names for three formalisms.',
      'PLP: probabilistic logic program. Per world: a logic program, asked "does it prove φ?"',
      'PAA: probabilistic abstract argumentation. Per world: a framework of arguments and attacks.',
      'PSAA: probabilistic structured argumentation. Per world: a knowledge base that builds its own arguments and attacks.'
    ],
    ex: [
      'PLP: <span class="m">P(K ⊢ φ) = Σ P(ω)</span> over worlds where Δω ⊢ φ.',
      'PAA: <span class="m">Σ P(ω)</span> over worlds where A is acceptable in Fω.',
      'PSAA: <span class="m">Σ P(ω)</span> over worlds where some acceptable argument has conclusion π.'
    ],
    mix: 'The three differ in the object inside each world. All three sum P(ω) over the worlds whose object says yes.'
  },

  '6.4|Prolog': {
    match: [],
    steps: [
      'Prolog is a programming language made of facts and rules.',
      'You run it by asking a question, and it searches for a proof.',
      'The answer is yes or no (and values for blanks).'
    ],
    ex: [
      '<span class="m">head1.</span> is a fact.',
      '<span class="m">win(10) :- head1, head2.</span> is a rule.',
      'Query <span class="m">win(10)</span> gets "true" or "false", never a chance.'
    ],
    mix: 'Prolog gives yes or no. ProbLog gives a probability.'
  },
  '6.4|ProbLog': {
    match: [],
    steps: [
      'ProbLog is Prolog plus chances.',
      'You write a number and :: before a fact or rule to make it uncertain.',
      'It reads your program as many worlds, adds up chances, and prints a probability for each query.',
      'It is the same sum over worlds as in lessons 1 to 3, done for you.'
    ],
    ex: [
      '<span class="m">0.5::head1.</span> is a coin that lands heads half the time.',
      '<span class="m">query(win(X)).</span> prints win(10): 0.3, win(-5): 0.2, win(0): 0.5.',
      'It runs as a standalone app, a Python library, or an online editor.'
    ]
  },
  '6.4|probabilistic fact': {
    match: ['::', 'probabilistic facts'],
    steps: [
      'Write a number, then ::, then a fact.',
      'It reads "this fact is true with that chance".',
      'ProbLog decides this separately in each world.'
    ],
    ex: [
      '<span class="m">0.5::head1.</span> : head1 true with chance 0.5.',
      '<span class="m">0.6::head2.</span> : head2 true with chance 0.6.',
      'No number, no ::  : <span class="m">head1.</span> is a certain fact, true in every world.',
      'Two facts <span class="m">0.5::a.</span> and <span class="m">0.5::b.</span> are chosen independently: both true with chance 0.25.'
    ]
  },
  '6.4|holds if': {
    match: [':-'],
    steps: [
      'The symbol :- separates a head on the left from a body on the right.',
      'It reads "the head is true if the body is true".',
      'It is the ProbLog spelling of the arrow &lt;- from lesson 2.'
    ],
    ex: [
      '<span class="m">win(10) :- head1, head2.</span> : win 10 if both heads.',
      '<span class="m">tail1 :- \\+ head1.</span> : tail1 holds if head1 does not.',
      'Not this: <span class="m">head1 :- win(10).</span> The head goes on the left of :-, the cause on the right.'
    ]
  },
  '6.4|and': {
    match: [],
    nolink: true,
    steps: [
      'In a rule body a comma means "and".',
      'Every part must hold for the body to hold.',
      'It is the same as the comma of lesson 2.'
    ],
    ex: [
      '<span class="m">head1, head2</span> : both coins heads.',
      '<span class="m">win(-5) :- head1, tail2.</span>',
      'Comma is never "or". To say "or" you write two rules.'
    ]
  },
  '6.4|negation as failure': {
    match: ['\\+', 'negation'],
    steps: [
      '\\+ means "cannot be shown".',
      '<span class="m">\\+ head1</span> is true when the program does not prove head1.',
      'ProbLog checks this in each world separately.'
    ],
    ex: [
      '<span class="m">tail1 :- \\+ head1.</span> : tail1 holds in the worlds where head1 is not true.',
      '<span class="m">win(0) :- \\+ win(10), \\+ win(-5).</span> : draw when neither prize can be shown.',
      'Not classical "not": if head1 is simply never mentioned, \\+ head1 is true only because it cannot be shown.'
    ],
    mix: 'The rule tail1 :- \\+ head1 works because head1 is probabilistic and decided in each world. It is a check for being unprovable, not for being false in reality.'
  },
  '6.4|annotated disjunction': {
    match: ['disjunction'],
    steps: [
      'Write several choices on one line with ; between them, each with its own chance.',
      'In each world exactly one choice is true.',
      'The chances should add to 1.'
    ],
    ex: [
      '<span class="m">0.5::head1; 0.5::tail1.</span> : exactly one of the two sides.',
      '<span class="m">0.6::head2; 0.4::tail2.</span> : the biased coin.',
      'Not the same: <span class="m">0.5::a. 0.5::b.</span> are independent, so both can be true (0.25), or both false (0.25).',
      'With <span class="m">0.5::a; 0.5::b.</span>, a and b can never both be true.'
    ],
    mix: 'A disjunction picks exactly one. Two separate probabilistic facts do not exclude each other.'
  },
  '6.4|variable': {
    match: ['variables'],
    steps: [
      'A variable is a placeholder that starts with a capital letter, like X.',
      'It stands for any name that fits.',
      'One rule with X covers every X at once.',
      'Inside one rule, the same letter means the same name everywhere.'
    ],
    ex: [
      '<span class="m">asthma(X)</span> stands for asthma(1), asthma(2), asthma(3), asthma(4).',
      '<span class="m">query(win(X)).</span> asks for every prize X, and prints win(10), win(-5), win(0).',
      'Not a variable: <span class="m">head1</span> starts with a lowercase letter, so it is a fixed name.'
    ],
    mix: 'In ProbLog a capital letter is a placeholder. A lowercase name is a fixed thing.'
  },
  '6.4|evidence': {
    match: [],
    steps: [
      'Evidence is something you observed.',
      'You write it as <span class="m">evidence(a, true).</span> or <span class="m">evidence(a, false).</span>',
      'ProbLog throws away the worlds that disagree with it.',
      'Then it rescales what is left, so the queries give probabilities given the evidence.'
    ],
    ex: [
      '<span class="m">evidence(alarm, true).</span> : the alarm rang.',
      '<span class="m">evidence(burglary, false).</span> : no burglary happened.',
      'Evidence plus <span class="m">query(burglary).</span> gives P(burglary | alarm). In the lesson 5 alarm network this is about 0.9897.'
    ],
    mix: 'Evidence changes the answer of a query. Without it, query gives the prior.'
  },
  '6.4|query': {
    match: ['queries'],
    steps: [
      'A query is the question you ask.',
      'Write <span class="m">query(b).</span> and ProbLog prints the probability that b is true.',
      'If the query has a variable, it prints one line per answer.'
    ],
    ex: [
      '<span class="m">query(win(X)).</span> prints win(10): 0.3, win(-5): 0.2, win(0): 0.5.',
      '<span class="m">query(alarm).</span> in the alarm network prints 0.58.',
      'Evidence first, then query: <span class="m">evidence(alarm, true). query(burglary).</span>'
    ]
  },
  '6.4|prior': {
    match: ['priors'],
    steps: [
      'The prior is the chance before you look at any evidence.',
      'It is what a query gives when there is no evidence line.',
      'Evidence then turns the prior into a posterior.'
    ],
    ex: [
      'Burglary in the alarm network: prior 0.7.',
      'Alarm in general: prior 0.58 (by adding over the four burglary and earthquake worlds).',
      'Coin 1 heads before anything is seen: prior 0.5.'
    ],
    mix: 'Prior = before the evidence. Posterior = after.'
  },
  '6.4|posterior': {
    match: ['P(a | b)', 'posteriors'],
    steps: [
      'The posterior is the chance after you take evidence into account.',
      'P(a | b) is read "the chance of a given b".',
      'The vertical bar | stands for "given". What stands after it is what you know.',
      'ProbLog produces it with evidence lines plus a query.'
    ],
    ex: [
      'Prior chance of burglary: 0.7. After the alarm rings: <span class="m">P(b | a) = 0.574 / 0.58 ≈ 0.9897</span>.',
      'After you learn the alarm did not ring: <span class="m">P(b | ¬a) = 0.126 / 0.42 = 0.3</span>, lower than the prior.',
      'The prior is the posterior with nothing observed.'
    ],
    mix: 'P(a | b) and P(b | a) differ. Chance of burglary given the alarm is not the chance of the alarm given a burglary.'
  },
  '6.4|percent sign': {
    match: ['%', 'comment'],
    steps: [
      'Everything after % on a line is a comment.',
      'The computer ignores it.',
      'It is a note for the human reader.'
    ],
    ex: [
      '<span class="m">0.5::head1.   % first coin, fair</span>',
      '<span class="m">0.6::head2.   % second coin, biased</span>',
      'The words after % do not change the program.'
    ]
  },

  '6.5|variable': {
    match: ['variables', 'random variable'],
    steps: [
      'A variable is a quantity that can take different values.',
      'We use a capital letter for it and a small letter for its value.',
      'Each variable becomes one node in the Bayesian network.'
    ],
    ex: [
      '<span class="m">B</span> : is there a burglary?',
      '<span class="m">E</span> : is there an earthquake?',
      '<span class="m">A</span> : does the alarm ring?',
      'The general network has variables <span class="m">X₁ … Xₙ</span>, n of them.'
    ],
    mix: 'In lesson 4, X in ProbLog meant a placeholder for a name. Here B, E, A, X₁ are things that can be true or false.'
  },
  '6.5|binary variable': {
    match: ['binary'],
    steps: [
      'A binary variable has exactly two values.',
      'Usually true or false.',
      'Its two chances add to 1, so one number is enough.'
    ],
    ex: [
      'Alarm: rings or does not ring.',
      'B burglary: <span class="m">P(b) = 0.7</span>, so <span class="m">P(¬b) = 0.3</span>.',
      'Not binary: Bob\'s activity (walk, shop, clean) has three values.'
    ]
  },
  '6.5|value': {
    match: [],
    nolink: true,
    steps: [
      'A lowercase letter means that variable is true.',
      'A lowercase letter with ¬ in front means it is false.',
      'So b is "a burglary happened" and ¬b is "no burglary".'
    ],
    ex: [
      '<span class="m">b</span> : B is true (burglary).',
      '<span class="m">e</span> : earthquake.',
      '<span class="m">¬a</span> : the alarm did not ring.',
      '<span class="m">P(b) = 0.7</span> reads: chance that the burglary variable is true.'
    ],
    mix: 'Capital B is the variable. Small b is one of its values (true).'
  },
  '6.5|not': {
    match: ['¬'],
    nolink: true,
    steps: [
      '¬ flips true to false.',
      'Write it in front of a lowercase letter.',
      '¬e means "no earthquake".'
    ],
    ex: [
      '<span class="m">¬e</span> : no earthquake, <span class="m">P(¬e) = 0.8</span>.',
      '<span class="m">P(a | b, ¬e) = 0.8</span> : alarm given burglary and no earthquake.',
      '<span class="m">P(a | ¬b, ¬e) = 0</span> : no cause, no alarm.',
      'The two chances always add: P(e) + P(¬e) = 0.2 + 0.8 = 1.'
    ],
    mix: 'Same flip as ¬ in module 5.'
  },
  '6.5|node and arrow': {
    match: ['node', 'nodes', 'arrow', 'arrows'],
    steps: [
      'A node is a variable drawn as a dot.',
      'An arrow goes from one node to another.',
      'It points from a cause to its effect.',
      'No arrow between two nodes: they do not directly depend.'
    ],
    ex: [
      '<span class="m">B → A</span> : burglary can cause the alarm.',
      '<span class="m">E → A</span> : earthquake can cause the alarm.',
      'Three nodes B, E, A and two arrows make the alarm network.',
      'No arrow between B and E: they are separate causes.'
    ]
  },
  '6.5|parents': {
    match: ['Parents', 'parent'],
    steps: [
      'The parents of a node are the nodes with an arrow into it.',
      'They are its direct causes.',
      'A node with no parents is a root.'
    ],
    ex: [
      '<span class="m">Parents(A) = {B, E}</span> : burglary and earthquake.',
      '<span class="m">Parents(B) = {}</span>, and the same for E: roots.',
      'A node with 2 parents has 4 combinations of parent values.'
    ]
  },
  '6.5|directed acyclic graph': {
    match: ['DAG', 'graph'],
    steps: [
      'A graph is dots joined by lines.',
      'Directed: every line has one direction, an arrow.',
      'Acyclic: following arrows never takes you back to where you started.',
      'So causes flow forward, never in a loop.'
    ],
    ex: [
      'B → A ← E is a DAG.',
      'A chain weather1 → weather2 → weather3 is a DAG.',
      'Not a DAG: A → B → C → A. It loops back.'
    ]
  },
  '6.5|chance given': {
    match: ['P(a | b, e)', 'conditional'],
    steps: [
      'The chance of the left thing, once you know the right things.',
      'Read | as "given".',
      'One number for each combination of the given things.'
    ],
    ex: [
      '<span class="m">P(a | b, e) = 0.9</span> : alarm given burglary and earthquake.',
      '<span class="m">P(a | b, ¬e) = 0.8</span>',
      '<span class="m">P(a | ¬b, e) = 0.1</span>',
      '<span class="m">P(a | ¬b, ¬e) = 0</span>',
      'The other side: <span class="m">P(¬a | b, e) = 1 - 0.9 = 0.1</span>.'
    ],
    mix: 'P(a | b) and P(b | a) are different numbers. The thing before the bar is the one you ask about.'
  },
  '6.5|prior': {
    match: ['priors'],
    steps: [
      'A node with no parents needs no table of causes.',
      'It has just one number, its prior.',
      'The prior is the chance of that node on its own.'
    ],
    ex: [
      '<span class="m">P(b) = 0.7</span> : burglary, prior.',
      '<span class="m">P(e) = 0.2</span> : earthquake, prior.',
      'Not a prior: <span class="m">P(a | b, e) = 0.9</span>. The alarm has parents.'
    ]
  },
  '6.5|table of a node': {
    match: ['table', 'tables'],
    steps: [
      'Look at the parents of the node.',
      'Write one row for each combination of their values.',
      'In each row, give the chance of the node being true.'
    ],
    ex: [
      'Alarm has 2 parents, so 2 × 2 = 4 rows: <span class="m">0.9, 0.8, 0.1, 0</span>.',
      'A node with 3 binary parents needs 2 × 2 × 2 = 8 rows.',
      'A node with no parents has 1 row, which is its prior.'
    ]
  },
  '6.5|joint': {
    match: ['P(x₁, …, xₙ)', 'joint distribution'],
    steps: [
      'The joint is the chance of one full combination of values for all variables together.',
      'In a Bayesian network you build it by multiplying one table entry per node.',
      'Use the value each node takes in that combination.'
    ],
    ex: [
      '<span class="m">P(b, e, a) = 0.7 × 0.2 × 0.9 = 0.126</span>.',
      '<span class="m">P(b, e, ¬a) = 0.7 × 0.2 × 0.1 = 0.014</span>.',
      '<span class="m">P(b, ¬e, a) = 0.7 × 0.8 × 0.8 = 0.448</span>.',
      '<span class="m">P(¬b, ¬e, ¬a) = 0.3 × 0.8 × 1 = 0.24</span>, since P(a | ¬b, ¬e) = 0.'
    ],
    mix: 'Joint vs marginal: the joint fixes every variable. P(a) alone (0.58) adds up many joints.'
  },
  '6.5|product': {
    match: ['Π'],
    steps: [
      'Π (the Greek capital pi) means "multiply a whole list".',
      'It does for multiplying what Σ does for adding.',
      'In a Bayesian network you multiply one table entry for each node.'
    ],
    ex: [
      'Π of 0.7, 0.2, 0.9 is <span class="m">0.7 × 0.2 × 0.9 = 0.126</span>.',
      'Π of 0.5 and 0.5 is 0.25.',
      '<span class="m">P(x₁, …, xₙ) = Π P(xᵢ | parents)</span> over i = 1 to n.'
    ],
    mix: 'Π multiplies, Σ adds. A Bayesian network joint is a product. An event probability is a sum.'
  },
  '6.5|Bayesian network': {
    match: ['Bayesian networks', 'BN'],
    steps: [
      'Draw a DAG: one node per variable, arrows from causes to effects.',
      'At each node store its table: the chance given its parents (a prior if no parents).',
      'Multiply the right entries to get any joint probability.',
      'It can be turned into a ProbLog program, as in lesson 5.'
    ],
    ex: [
      'Alarm net: B and E have priors 0.7 and 0.2, A has a 4-row table.',
      'In ProbLog: <span class="m">0.7::burglary.</span> and <span class="m">0.9::alarm :- burglary, earthquake.</span>',
      '<span class="m">P(a) = 0.126 + 0.448 + 0.006 + 0 = 0.58</span>, summing over the four burglary and earthquake worlds.'
    ]
  },

  '6.6|person number': {
    match: [],
    nolink: true,
    steps: [
      'Each person in the example has a number from 1 to 4.',
      'The number is only a name tag.',
      'A rule about person 2 is written with 2 in place of X.'
    ],
    ex: [
      '<span class="m">smokes(2)</span> : person 2 smokes.',
      '<span class="m">friend(1,2)</span> : persons 1 and 2 are friends.',
      '<span class="m">influences(4,2)</span> : person 4 can push person 2.'
    ]
  },
  '6.6|variable in a rule': {
    match: [],
    nolink: true,
    steps: [
      'X and Y are placeholders that stand for any person.',
      'Inside one rule, the same letter means the same person everywhere.',
      'Fill in a real number and the rule becomes about that person.'
    ],
    ex: [
      '<span class="m">smokes(X)</span> with X = 3 becomes smokes(3).',
      '<span class="m">smokes(X) :- friend(X,Y), influences(Y,X), smokes(Y).</span> with X = 1 and Y = 2: person 1 smokes if friend(1,2), influences(2,1) and smokes(2).',
      'Not a placeholder: <span class="m">smokes(2)</span> names one real person.'
    ]
  },
  '6.6|smokes(X)': {
    match: [],
    steps: [
      'smokes(X) is a statement: person X smokes.',
      'It is true or false for each real person.',
      'ProbLog gives the chance that it is true.'
    ],
    ex: [
      '<span class="m">smokes(2)</span> : person 2 smokes (the evidence says yes).',
      '<span class="m">smokes(1)</span> has chance 0.50877 in the lecture example.',
      '<span class="m">smokes(3)</span> and <span class="m">smokes(4)</span> have chance 0.44.'
    ]
  },
  '6.6|stress(X)': {
    match: [],
    steps: [
      'stress(X): person X is under stress.',
      'It is a probabilistic fact.',
      'The rule <span class="m">smokes(X) :- stress(X).</span> turns stress into smoking.'
    ],
    ex: [
      '<span class="m">stress(3)</span> : person 3 is stressed.',
      'If stress(3) is true, smokes(3) follows by the first rule.',
      'If it is false, the first rule does not fire, but a friend can still push person 3.'
    ]
  },
  '6.6|friend(X,Y)': {
    match: [],
    steps: [
      'friend(X,Y): X and Y are friends.',
      'The list of friend facts is the social network.',
      'The example has 5 friendships.'
    ],
    ex: [
      '<span class="m">friend(1,2)</span> : person 1 has person 2 as a friend.',
      'In <span class="m">friend(X,Y), influences(Y,X), smokes(Y)</span>, Y is the friend who may push X.',
      'Not enough alone: being a friend does not make anyone smoke. You also need influences and smokes.'
    ],
    mix: 'friend says who is connected. influences says who can push whom.'
  },
  '6.6|influences(Y,X)': {
    match: [],
    steps: [
      'influences(Y,X): Y can push X to smoke.',
      'The first place is the pusher, the second the person pushed.',
      'It is a probabilistic fact.'
    ],
    ex: [
      '<span class="m">influences(4,2)</span> : person 4 can push person 2.',
      'The lecture evidence <span class="m">evidence(influences(4,2), false)</span> says person 4 does not push 2.',
      'Order matters: influences(2,4) is a different statement.'
    ],
    mix: 'influences(Y,X) is not the same as influences(X,Y). Read the order as: pusher first, pushed second.'
  },
  '6.6|asthma(X)': {
    match: [],
    steps: [
      'asthma(X): person X has asthma.',
      'The rule <span class="m">0.4::asthma(X) :- smokes(X).</span> says: if X smokes, X gets asthma with chance 0.4.',
      'A person who does not smoke does not get asthma from this rule.'
    ],
    ex: [
      '<span class="m">asthma(2) = 0.4</span> : person 2 smokes for sure, 1 × 0.4.',
      '<span class="m">asthma(1) = 0.4 × 0.50877 = 0.203508</span>.',
      '<span class="m">asthma(3) = 0.4 × 0.44 = 0.176</span>.'
    ]
  },
  '6.6|probabilistic rule': {
    match: ['0.4::head :- body', 'probabilistic rules'],
    steps: [
      'Write a chance and :: in front of a rule.',
      'When the body holds, the head holds with that chance.',
      'If the body does not hold, the head does not follow from this rule.',
      'Chance of head = rule chance × chance of body, when the rule is the only uncertain thing.'
    ],
    ex: [
      '<span class="m">0.4::asthma(X) :- smokes(X).</span>',
      'Person 3: <span class="m">0.4 × 0.44 = 0.176</span>.',
      'Fresh: if smokes(5) had chance 0.5, asthma(5) would be 0.4 × 0.5 = 0.2.',
      'Two rules: <span class="m">0.3::asthma(X) :- smokes(X), \\+ parentHasAsthma(X).</span> and <span class="m">0.5::asthma(X) :- smokes(X), parentHasAsthma(X).</span> Person 1 uses 0.5, so asthma(1) = 0.5 × 0.50877 ≈ 0.2544.'
    ],
    mix: 'The rule chance is not the chance of the head. You must multiply by the chance that the body holds.'
  },
  '6.6|evidence': {
    match: [],
    steps: [
      'Evidence tells ProbLog something is true or false.',
      'It changes the other answers.',
      'Here: person 2 smokes, and person 4 does not push person 2.'
    ],
    ex: [
      '<span class="m">evidence(smokes(2), true).</span> : person 2 smokes.',
      '<span class="m">evidence(influences(4,2), false).</span> : person 4 does not push person 2.',
      'With the first line, asthma(2) = 1 × 0.4 = 0.4, since smoking is certain.'
    ]
  },

  '6.7|hidden state': {
    match: ['hidden states'],
    steps: [
      'A hidden state is something real that you cannot see.',
      'You only see its effects.',
      'In the story it is the weather in Bob\'s city.'
    ],
    ex: [
      'Weather in Bob\'s city: rainy or sunny.',
      'Speech: the word being said, when you only hear the sound.',
      'Not hidden: Bob\'s activity, you hear it from him.'
    ],
    mix: 'Hidden state is what you want to guess. Observation is what you can see.'
  },
  '6.7|observation': {
    match: ['observations'],
    steps: [
      'An observation is something you can see.',
      'It depends on the hidden state.',
      'It tells you a little about the state.'
    ],
    ex: [
      'Bob went for a walk.',
      'Bob cleaned the house.',
      'Walk more likely on sunny days (0.6 vs 0.1).'
    ]
  },
  '6.7|hidden Markov model': {
    match: ['HMM'],
    steps: [
      'Make a chain of days.',
      'Each day has a hidden state, like weather.',
      'The state moves from one day to the next by transition chances.',
      'Each day also emits one observation, by emission chances.',
      'It is a Bayesian network arranged as a chain.'
    ],
    ex: [
      'Alice and Bob: hidden weather, observed activity.',
      'Three days: 3 hidden states and 3 observations.',
      'Used in speech recognition, tagging words, gene prediction.'
    ]
  },
  '6.7|transition': {
    match: ['transitions'],
    steps: [
      'A transition is the chance of moving from today\'s state to tomorrow\'s.',
      'Each state has a row of chances.',
      'A row adds up to 1.'
    ],
    ex: [
      'Rain today: <span class="m">R to R 0.7</span> and <span class="m">R to S 0.3</span>. 0.7 + 0.3 = 1.',
      'Sun today: <span class="m">S to R 0.4</span> and <span class="m">S to S 0.6</span>. 0.4 + 0.6 = 1.',
      'Not a transition: the chance of walking on a sunny day. That is an emission.'
    ],
    mix: 'Transition = state to state, from day to day. Emission = state to what you see, on the same day.'
  },
  '6.7|emission': {
    match: ['emissions'],
    steps: [
      'An emission is the chance of an observation given its state.',
      'It links what is hidden to what you see.',
      'It uses the same day only.'
    ],
    ex: [
      'Walk chance: <span class="m">0.1</span> on a rainy day, <span class="m">0.6</span> on a sunny day.',
      'Rainy: the other 0.9 is shared between shop and clean.',
      'Not an emission: R to S 0.3. That moves between days.'
    ],
    mix: 'Transition goes between states. Emission goes from a state to its observation.'
  },
  '6.7|Markov assumption': {
    match: ['Markov'],
    steps: [
      'Look at today.',
      'The Markov assumption says tomorrow depends only on today.',
      'Older days add nothing once you know today.'
    ],
    ex: [
      'Rain today gives a 0.7 chance of rain tomorrow, whether yesterday was rainy or sunny.',
      'Not Markov: a weather model where tomorrow depends on the last two days.',
      'It keeps the model small: a single table of transitions.'
    ]
  },
  '6.7|path': {
    match: ['paths'],
    steps: [
      'A path is one complete guess of the hidden state on every day.',
      'With 2 states and n days there are 2ⁿ paths.',
      'Each path gets a weight.'
    ],
    ex: [
      'R, R, S is a path for 3 days.',
      '2 days: R,R  R,S  S,R  S,S, so 4 paths.',
      '3 days: 2 × 2 × 2 = 8 paths.'
    ]
  },
  '6.7|start probability': {
    match: [],
    steps: [
      'The start probability is the chance of each state on day 1.',
      'There is no earlier day, so there is nothing to move from.',
      'They add up to 1.'
    ],
    ex: [
      'Start R 0.6, S 0.4. 0.6 + 0.4 = 1.',
      'Path R, R begins with 0.6.',
      'Path S, S begins with 0.4.'
    ]
  },
  '6.7|normalise': {
    match: ['normalised', 'normalisation', 'normalising'],
    steps: [
      'Add up all the weights.',
      'Divide each weight by that total.',
      'The new numbers add to exactly 1, so they are chances.'
    ],
    ex: [
      'Weights 0.24 and 0.06: total 0.30, so 0.24/0.30 = 0.8 and 0.06/0.30 = 0.2.',
      'Bob walks twice: path S,S has weight 0.0864, total is 0.111, so <span class="m">0.0864 / 0.111 ≈ 0.778</span>.',
      'The four paths become 0.038, 0.097, 0.086 and 0.778. They add to 1.'
    ],
    mix: 'The path weights alone do not add to 1. You must divide by the total to get the posterior.'
  },
  '6.7|day index': {
    match: ['t'],
    nolink: true,
    steps: [
      'The day index t is the number of the day: 1, 2, 3, and so on.',
      'It appears in the predicates so ProbLog knows which day.'
    ],
    ex: [
      '<span class="m">weather(2, W)</span> asks about day 2.',
      '<span class="m">evidence(activity(1, walk), true).</span> : on day 1 Bob walked.',
      'With 3 days, t runs over 1, 2, 3.'
    ]
  },
  '6.7|W in a query': {
    match: [],
    nolink: true,
    steps: [
      'W is a placeholder: "which weather".',
      'ProbLog tries every possible value for W.',
      'It prints one line for each.'
    ],
    ex: [
      '<span class="m">query(weather(2, W)).</span> asks for the weather on day 2.',
      'With the walking example it prints about weather(2, sunny): 0.876 and weather(2, rainy): 0.124 (0.0972/0.111 and 0.0138/0.111).',
      'The two lines add to 1.'
    ],
    mix: 'W here is a variable in a query, not the set W of worlds.'
  },
  '6.7|posterior': {
    match: ['P(path | observations)', 'posteriors'],
    steps: [
      'The posterior is the chance of a guess after seeing the observations.',
      'For a path: weight of the path divided by the total weight of all paths.',
      'It is the normalised weight.'
    ],
    ex: [
      'Walk, walk: <span class="m">P(S,S | walk, walk) ≈ 0.778</span>.',
      'Before seeing the walks, the prior chance of path S,S was 0.4 × 0.6 = 0.24.',
      'Seeing two walks moved it from 0.24 to 0.778.'
    ],
    mix: 'Prior is before seeing Bob\'s activities. Posterior is after.'
  },

  '6.8|parameter': {
    match: ['parameters'],
    steps: [
      'A parameter is a number in the program that you may not know.',
      'The chances in front of :: are parameters.',
      'You can fix them or let ProbLog learn them.'
    ],
    ex: [
      'The chance of burglary.',
      'The chance of the alarm given burglary and earthquake.',
      'Fixed: <span class="m">0.2::earthquake.</span> Learned: <span class="m">t(_)::burglary.</span>'
    ]
  },
  '6.8|learning': {
    match: [],
    steps: [
      'Learning means ProbLog fills in unknown parameters from data.',
      'You mark which ones to learn.',
      'You give examples.',
      'It returns the same program with numbers filled in.'
    ],
    ex: [
      '8 flips with 3 heads: estimate 3/8 = 0.375.',
      '8 nights with burglary true in 2: 2/8 = 0.25.',
      'Not learning: typing 0.25 yourself.'
    ]
  },
  '6.8|example': {
    match: ['examples'],
    nolink: true,
    steps: [
      'One example is one recorded case.',
      'It lists what was seen as evidence lines.',
      'An example does not have to cover every variable.'
    ],
    ex: [
      '<span class="m">evidence(burglary, false).</span> and <span class="m">evidence(alarm, false).</span> : a night with neither.',
      'Another example: burglary true and alarm true.',
      'Each example is one night, one row in the dataset.'
    ]
  },
  '6.8|dataset': {
    match: ['datasets', 'data'],
    steps: [
      'A dataset is a list of examples.',
      'The examples are separated by lines of dashes.',
      'More examples give a steadier estimate.'
    ],
    ex: [
      '8 nights of records.',
      'Burglary true in 2 of 8 nights.',
      'A dataset of 1 example is allowed, but the estimate is rough.'
    ]
  },
  '6.8|t(...)': {
    match: ['t(_)', 't(p)', 't(0.5)'],
    steps: [
      'Put t( ) around a probability to mean "learn this one".',
      'Inside is the starting guess.',
      'Without t, the number is fixed.'
    ],
    ex: [
      '<span class="m">t(0.5)::burglary.</span> : learn, start at 0.5.',
      '<span class="m">t(_)::alarm :- burglary, earthquake.</span> : learn, random start.',
      '<span class="m">0.2::earthquake.</span> : fixed, not learned.'
    ],
    mix: 'The number inside t( ) is only a start. The learned result can differ a lot.'
  },
  '6.8|underscore': {
    match: [],
    steps: [
      'The underscore _ means "no start value given".',
      'In <span class="m">t(_)</span> ProbLog picks a random start.',
      'It does not mean 0.'
    ],
    ex: [
      '<span class="m">t(_)::stress(X) :- person(X).</span>',
      '<span class="m">t(_)::alarm :- burglary, earthquake.</span>',
      'Compare <span class="m">t(0.5)::burglary.</span> : start at 0.5.'
    ]
  },
  '6.8|dashes': {
    match: ['-----'],
    steps: [
      'A line of dashes ends one example.',
      'The next evidence lines belong to the next example.',
      'It tells ProbLog where each case stops.'
    ],
    ex: [
      '<span class="m">evidence(burglary,false).</span> then <span class="m">evidence(alarm,false).</span> then <span class="m">-----</span>',
      'Two examples need two sets of evidence lines with dashes after each.',
      'Without dashes, ProbLog would treat all the lines as one case.'
    ]
  },
  '6.8|fully observed': {
    match: [],
    steps: [
      'Fully observed means every variable is recorded in every example.',
      'Then you can just count.',
      'Learned chance = examples where it is true divided by all examples.'
    ],
    ex: [
      '8 nights, burglary true in 2: <span class="m">2/8 = 0.25</span>.',
      'Earthquake true in 3 of 8: <span class="m">3/8 = 0.375</span>.',
      '5 nights, alarm true in 4: <span class="m">4/5 = 0.8</span>.',
      'Not fully observed: the burglary column is missing in some nights.'
    ]
  },
  '6.8|hidden': {
    match: [],
    steps: [
      'Hidden means some variable is not recorded.',
      'You cannot count what you never saw.',
      'ProbLog then has to improve its estimate step by step.'
    ],
    ex: [
      'Examples record the alarm but never whether a burglary happened.',
      'In an HMM the weather is hidden, only activities are seen.',
      'Not hidden: both burglary and alarm written every night.'
    ],
    mix: 'Same idea as hidden state in lesson 7: a variable you never see.'
  },
  '6.8|expectation-maximisation': {
    match: ['EM'],
    steps: [
      'Start with a guess for the parameters.',
      'Use the data to improve the guess.',
      'Repeat.',
      'Stop when the guess barely changes.'
    ],
    ex: [
      'Like tuning a radio: nudge, listen, nudge again.',
      'Used when some variable is hidden, because plain counting is not possible.',
      'Not needed when fully observed: just count.'
    ]
  }
});
