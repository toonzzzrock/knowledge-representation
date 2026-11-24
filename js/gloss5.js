/* Module 5 glossary extras: breakdown steps, examples, common confusion. Keys are 'lesson|term' exactly as in the lesson glossary. */
UI.glossExtra({
  '5.1|atom': {
    match: [],
    steps: [
      'An atom is the smallest piece: one statement, with no "and", "or", "not" inside it.',
      'Each atom gets a short name, usually p, q, r, or a word such as <span class="m">raining</span>.',
      'On its own an atom has no fixed truth value. A truth assignment (lesson 5.2) later says true or false for it.'
    ],
    ex: [
      '<span class="m">raining</span> is an atom: one plain statement.',
      '<span class="m">p</span> is an atom; it stands for any one statement you choose.',
      'Not an atom: <span class="m">raining ∧ cloudy</span>. It has a connective inside, so it is a formula built from two atoms.',
      'Not an atom: <span class="m">¬p</span>. It is atom p with "not" applied.'
    ],
    mix: 'Atom vs formula: every atom is a formula, but most formulas are not atoms. If you see any of ¬ ∧ ∨ → ↔, it is not an atom.'
  },
  '5.1|Σ': {
    match: [],
    steps: [
      'Σ (the Greek capital letter sigma) is a set: a list in curly brackets.',
      'The members of Σ are the atoms you are allowed to use.',
      'Every formula you build may use only atoms from Σ.'
    ],
    ex: [
      'Σ = {p, q}: you may write <span class="m">p ∧ q</span> or <span class="m">¬q</span>, but not <span class="m">r</span>.',
      'Σ = {raining, cloudy, snowing}: three atoms, so there are 2 × 2 × 2 = 8 ways to set them true or false.'
    ],
    mix: 'In module 6 the same letter Σ means "add up" (a sum). In module 5 it is the set of atoms. Read which module you are in.'
  },
  '5.1|connective': {
    match: ['connectives'],
    steps: [
      'A connective takes one or two formulas and makes a bigger formula.',
      '¬ takes one formula. ∧, ∨, →, ↔ each take two.',
      'The truth of the big formula depends only on the truth of its parts.'
    ],
    ex: [
      '¬ applied to p gives <span class="m">¬p</span>.',
      '∧ applied to p and q gives <span class="m">p ∧ q</span>.',
      '→ applied to (p ∧ q) and r gives <span class="m">(p ∧ q) → r</span>.'
    ]
  },
  '5.1|not': {
    match: ['¬', 'negation'],
    steps: [
      '¬ takes one formula and flips its truth value.',
      'If φ is true, ¬φ is false. If φ is false, ¬φ is true.',
      'Two flips cancel: ¬¬φ has the same truth value as φ.'
    ],
    ex: [
      'raining = true, so ¬raining = false.',
      'p = false, so ¬p = true.',
      '¬(p ∧ q): first work out p ∧ q, then flip the result.'
    ],
    mix: '¬p ∧ q means (¬p) ∧ q: ¬ grabs only the next piece. To negate the whole thing, write ¬(p ∧ q).'
  },
  '5.1|and': {
    match: ['∧', 'conjunction'],
    steps: [
      '∧ joins two formulas.',
      'The result is true only when both sides are true.',
      'If even one side is false, the whole thing is false.'
    ],
    ex: [
      'true ∧ true = true.',
      'true ∧ false = false.',
      'false ∧ false = false.',
      'raining ∧ cloudy is true only on a day that is both rainy and cloudy.'
    ],
    mix: '∧ (and) points up like a tent; ∨ (or) points down like a cup. Memory hook: ∧ looks like the A in "And".'
  },
  '5.1|or': {
    match: ['∨', 'disjunction'],
    steps: [
      '∨ joins two formulas.',
      'The result is true when at least one side is true.',
      'It is false only when both sides are false.'
    ],
    ex: [
      'true ∨ false = true.',
      'true ∨ true = true (this "or" allows both).',
      'false ∨ false = false.',
      'raining ∨ snowing is true on a rainy day, a snowy day, or a day with both.'
    ],
    mix: 'Everyday "or" often means "one but not both". Logic ∨ is inclusive: both true still gives true.'
  },
  '5.1|if ... then': {
    match: ['→', 'implication', 'implies'],
    steps: [
      'φ → ψ is a promise: whenever φ is true, ψ is true too.',
      'The only way to break the promise is φ true and ψ false. That single row is false.',
      'If φ is false, the promise was never tested, so φ → ψ counts as true.',
      'Same truth table as ¬φ ∨ ψ.'
    ],
    ex: [
      'cloudy = true, raining = true: cloudy → raining is true (promise kept).',
      'cloudy = true, raining = false: cloudy → raining is false (promise broken).',
      'cloudy = false, raining = true: true (no promise made about clear days).',
      'cloudy = false, raining = false: true.'
    ],
    mix: 'p → q is not the same as q → p. "If it rains, the street is wet" does not give "if the street is wet, it rained".'
  },
  '5.1|if and only if': {
    match: ['↔', 'biconditional', 'iff'],
    steps: [
      'φ ↔ ψ says both sides have the same truth value.',
      'It is true when both are true or both are false.',
      'It is the same as (φ → ψ) ∧ (ψ → φ): a promise in both directions.'
    ],
    ex: [
      'true ↔ true = true.',
      'false ↔ false = true.',
      'true ↔ false = false.',
      'raining ↔ wet streets fails on a day with rain but dry streets, and on a day with wet streets but no rain.'
    ]
  },
  '5.1|formula': {
    match: [],
    steps: [
      'Start: every atom is a formula.',
      'If φ is a formula, so is ¬φ.',
      'If φ and ψ are formulas, so are (φ ∧ ψ), (φ ∨ ψ), (φ → ψ), (φ ↔ ψ).',
      'Nothing else is a formula. φ and ψ are only placeholder names for "some formula".'
    ],
    ex: [
      '<span class="m">p</span> is a formula (an atom).',
      '<span class="m">¬p</span> is a formula (rule 2 on p).',
      '<span class="m">(¬p ∨ q) → r</span> is a formula (rules applied three times).',
      'Not a formula: <span class="m">p ∧ ∨ q</span>. Two connectives in a row with nothing between them.'
    ],
    mix: 'φ is not an atom. It is a name for any formula, so φ could be p, or ¬p, or (p ∧ q) → r.'
  },
  '5.1|language': {
    match: ['ℒ'],
    steps: [
      'ℒ (curly L) is the set of every formula you can build from the atoms in Σ.',
      'It is infinite: you can always add one more ¬ or one more ∧.',
      'Change Σ and you get a different language.'
    ],
    ex: [
      'With Σ = {p}: ℒ contains p, ¬p, ¬¬p, p ∧ p, p ∨ ¬p, and so on forever.',
      'With Σ = {p, q}: <span class="m">q → p</span> is in ℒ, but <span class="m">r</span> is not.'
    ]
  },
  '5.1|parse tree': {
    match: ['parse trees'],
    steps: [
      'Find the connective applied last: the main connective. Put it at the top.',
      'Draw one branch for each part it joins.',
      'Repeat on each part until every leaf is an atom.',
      'Brackets decide which connective is applied last.'
    ],
    ex: [
      '<span class="m">p ∧ q</span>: ∧ on top, leaves p and q.',
      '<span class="m">(p ∨ q) → r</span>: → on top; left child ∨ with leaves p and q; right child r.',
      '<span class="m">¬(p ∧ q)</span>: ¬ on top, one child ∧, which has leaves p and q.'
    ],
    mix: '<span class="m">¬p ∧ q</span> has ∧ on top (¬ binds only p). <span class="m">¬(p ∧ q)</span> has ¬ on top. Different trees, different meanings.'
  },
  '5.2|truth value': {
    match: ['truth values'],
    steps: [
      'A truth value is one of only two answers: 1 or 0.',
      '1 means true. 0 means false.',
      'Every formula gets exactly one truth value once the atoms have values.'
    ],
    ex: [
      'raining has value 1 on a rainy day.',
      'snowing has value 0 on the same day.',
      '<span class="m">raining ∧ snowing</span> then has value 0.'
    ],
    mix: 'The value 1 is not a number you add. It is just a label for "true".'
  },
  '5.2|truth assignment': {
    match: ['truth assignments', 'assignment'],
    steps: [
      'Take the atoms in Σ.',
      'Give each atom a value, 1 or 0. That choice for all atoms together is one truth assignment, called i.',
      'It describes one possible situation of the world.',
      'It must give a value to every atom, with no atom left out.'
    ],
    ex: [
      'Σ = {raining, snowing}: i = (raining = 1, snowing = 0) is one assignment.',
      'Σ = {p, q}: the four assignments are 00, 01, 10, 11 for (p, q).',
      'Not an assignment: p = 1 and nothing said about q. q has no value yet.',
      'Not an assignment: p = 1 and p = 0 together. Each atom gets one value only.'
    ],
    mix: 'An assignment gives values to atoms only. The value of a bigger formula is then worked out from it.'
  },
  '5.2|i : Σ → {0,1}': {
    match: [],
    steps: [
      'The colon and arrow say: i is a function that takes each atom in Σ and returns a value.',
      '{0,1} is the set of allowed answers: only 0 or 1.',
      'So i is a table with one row per atom and a 0 or 1 in each row.'
    ],
    ex: [
      'Σ = {p, q}: i sends p to 1 and q to 0.',
      'Σ = {raining}: i sends raining to 0.',
      'Not of this form: sending p to 2. Only 0 and 1 are allowed.'
    ]
  },
  '5.2|p↦1': {
    match: ['↦'],
    steps: [
      'The arrow ↦ reads "is sent to" or "is given the value".',
      'p↦1 means atom p gets the value 1 (true).',
      'A list of such pairs in braces writes a whole assignment.'
    ],
    ex: [
      '{p↦1, q↦0}: p is true, q is false.',
      '{p↦0, q↦0, r↦1}: only r is true.',
      'Not complete: {p↦1} when Σ = {p, q}. q is missing.'
    ],
    mix: 'The arrow ↦ is not the connective →. ↦ gives a value to an atom. → joins two formulas.'
  },
  '5.2|value of φ under i': {
    match: ['φⁱ'],
    steps: [
      'Fix an assignment i. The atoms now have values.',
      'Work up from the atoms using the connective rules from lesson 5.1.',
      'The value you reach for φ is written φⁱ. It is 1 or 0.'
    ],
    ex: [
      'i = {p↦1, q↦0}: <span class="m">(p ∨ q)</span> has value 1.',
      'Same i: <span class="m">(p ∧ q)</span> has value 0.',
      'Same i: <span class="m">(p → q)</span> has value 0, since p is 1 and q is 0.',
      'Same i: <span class="m">(¬q)</span> has value 1.'
    ],
    mix: 'The small raised i is a label for the assignment, not a power. φⁱ is not "φ to the i".'
  },
  '5.2|model of φ': {
    match: ['model', 'models'],
    steps: [
      'Pick a truth assignment i.',
      'Work out the value of φ under i.',
      'If the value is 1, then i is a model of φ. If it is 0, it is not.'
    ],
    ex: [
      'i = {p↦1, q↦0} is a model of <span class="m">p ∨ q</span>.',
      'The same i is not a model of <span class="m">p ∧ q</span>.',
      'The same i is not a model of <span class="m">p → q</span>.',
      'i = {p↦1, q↦1, r↦1} is a model of <span class="m">¬q ∨ r</span>.'
    ],
    mix: 'In this course a model is an assignment (a situation), not a diagram or a theory. A formula can have many models, or none.'
  },
  '5.2|M(φ)': {
    match: [],
    steps: [
      'Look at every possible truth assignment.',
      'Keep those where φ has value 1.',
      'The collection you keep is M(φ): the set of all models of φ.'
    ],
    ex: [
      'Σ = {p, q}: M(p ∧ q) holds just one assignment, p = q = 1.',
      'M(p ∨ q) holds three assignments: 01, 10, 11.',
      'M(p ∧ ¬p) holds none: it is the empty set.',
      'M(p) holds two assignments when Σ = {p, q}: 10 and 11.'
    ],
    mix: 'M(φ) is a set of assignments, not a number and not a truth value.'
  },
  '5.2|knowledge base': {
    match: ['Δ', 'knowledge bases'],
    steps: [
      'A knowledge base is a set of sentences (formulas) we hold true all at once.',
      'We write it Δ and list the sentences in braces.',
      'It stands for everything we know about the situation.'
    ],
    ex: [
      'Δ = {p, p → q}: we know p, and we know if p then q.',
      'Δ = {raining → wet, raining}.',
      'Δ = { } is the empty knowledge base: we know nothing yet.'
    ],
    mix: 'Δ is a set of sentences. Σ is a set of atoms. Do not swap them.'
  },
  '5.2|M(Δ)': {
    match: [],
    steps: [
      'Take every possible truth assignment.',
      'Keep an assignment only if it makes every sentence of Δ true.',
      'The kept ones form M(Δ): the models of the whole knowledge base.'
    ],
    ex: [
      'Δ = {p, q}: M(Δ) holds one assignment, p = q = 1.',
      'Δ = {p ∨ q, ¬p}: p must be 0, then q must be 1. M(Δ) holds one assignment.',
      'Δ = {p, ¬p}: no assignment works, so M(Δ) is empty.',
      'Δ = { }: no sentence can fail, so M(Δ) holds all assignments.'
    ],
    mix: 'M(Δ) is built by "every sentence", so adding a sentence to Δ can only shrink M(Δ), never grow it.'
  },
  '5.2|2ⁿ': {
    match: [],
    steps: [
      '2ⁿ means 2 multiplied by itself n times.',
      'With n atoms, each atom has 2 choices (1 or 0), and the choices are independent.',
      'So there are 2ⁿ truth assignments, and a truth table has 2ⁿ rows.'
    ],
    ex: [
      '1 atom: 2 rows.',
      '2 atoms: 2 × 2 = 4 rows.',
      '3 atoms: 2 × 2 × 2 = 8 rows.',
      '20 atoms: more than a million rows.'
    ],
    mix: 'The ⁿ is a power, not a label. 2ⁿ is not 2 × n.'
  },
  '5.3|M(φ)': {
    match: [],
    steps: [
      'M(φ) is the set of all models of φ, as in lesson 5.2.',
      'It lists every assignment that makes φ true.',
      'Below, we ask how big this set is: all of I, nothing, or in between.'
    ],
    ex: [
      'M(p ∨ q) has three assignments out of four.',
      'M(p ∨ ¬p) has all four: it is all of I.',
      'M(p ∧ ¬p) has none: it is ∅.'
    ]
  },
  '5.3|I': {
    nolink: true,
    match: [],
    steps: [
      'I (capital i) is the set of all truth assignments over Σ.',
      'It contains every assignment, whether or not a formula is true under it.',
      'If Σ has n atoms, I has 2ⁿ members.'
    ],
    ex: [
      'Σ = {p}: I = {p↦0, p↦1}, 2 members.',
      'Σ = {p, q}: I has 4 members.',
      'M(φ) is always a part of I, because its members are assignments.'
    ],
    mix: 'Small i is one assignment. Capital I is the set of all of them.'
  },
  '5.3|∅': {
    match: ['empty set'],
    steps: [
      '∅ is the set with nothing in it.',
      'Writing M(φ) = ∅ says no assignment makes φ true.',
      'It is written { } too.'
    ],
    ex: [
      'M(p ∧ ¬p) = ∅: p cannot be both 1 and 0.',
      'M({p, ¬p}) = ∅: the pair cannot hold together.',
      'Not ∅: M(p) holds the assignments with p = 1.'
    ],
    mix: '∅ is a set with no members. It is not the number 0 and not the value "false".'
  },
  '5.3|M(φ) = I': {
    match: [],
    steps: [
      'M(φ) is the assignments that make φ true. I is all assignments.',
      'They are equal when no assignment is left out.',
      'So φ is true in every possible situation.'
    ],
    ex: [
      '<span class="m">p ∨ ¬p</span>: true whether p is 1 or 0, so M = I.',
      '<span class="m">p → p</span>: M = I.',
      'Not equal: <span class="m">p ∨ q</span>. The assignment p = q = 0 is left out.'
    ],
    mix: 'M(φ) = I says "all". M(φ) ≠ ∅ only says "at least one".'
  },
  '5.3|⊊': {
    match: [],
    steps: [
      'A ⊊ B says A is inside B.',
      'It also says A is not all of B: something in B is missing from A.',
      'It is used for "some but not all".'
    ],
    ex: [
      '{1,2} ⊊ {1,2,3}: 3 is missing from the left.',
      '∅ ⊊ M(p): M(p) has something in it, so ∅ is a strict part.',
      'Not ⊊: {1,2,3} and {1,2,3}. They are equal.'
    ],
    mix: '⊊ rules out equality. ⊆ (lesson 5.5) allows equality.'
  },
  '5.3|≠': {
    match: [],
    steps: [
      'A ≠ B reads "A is not the same as B".',
      'For sets it means they differ in at least one member.',
      'M(φ) ≠ ∅ means at least one assignment makes φ true.'
    ],
    ex: [
      'M(p) ≠ ∅: yes, p = 1 works.',
      'M(p ∧ ¬p) ≠ ∅ is false: the set is empty.',
      'M(p) ≠ I when Σ = {p, q}: p = 0 is missing.'
    ]
  },
  '5.3|valid': {
    match: ['validity'],
    steps: [
      'Check every truth assignment.',
      'If φ is true under all of them, φ is valid.',
      'In set form: M(φ) = I.',
      'A valid formula says nothing about the world: it is true whatever happens.'
    ],
    ex: [
      '<span class="m">p ∨ ¬p</span> is valid.',
      '<span class="m">p → p</span> is valid.',
      '<span class="m">(p → q) ∨ (q → r)</span> is valid: to falsify it you would need q = 1 and q = 0.',
      'Not valid: <span class="m">p ∨ q</span>. It is false when p = q = 0.'
    ],
    mix: 'Valid vs satisfiable: valid means true under all assignments. Satisfiable only needs one. Every valid formula is satisfiable, but not the reverse.'
  },
  '5.3|unsatisfiable': {
    match: [],
    steps: [
      'Check every truth assignment.',
      'If φ is false under all of them, φ is unsatisfiable.',
      'In set form: M(φ) = ∅.',
      'It is a contradiction: no situation can make it true.'
    ],
    ex: [
      '<span class="m">p ∧ ¬p</span> is unsatisfiable.',
      '<span class="m">¬(p ∨ ¬p)</span> is unsatisfiable.',
      'Not unsatisfiable: <span class="m">p ∧ q</span>. p = q = 1 makes it true.'
    ],
    mix: 'Unsatisfiable is the opposite of satisfiable. φ is valid exactly when ¬φ is unsatisfiable.'
  },
  '5.3|contingent': {
    match: [],
    steps: [
      'Some assignments make φ true.',
      'Other assignments make φ false.',
      'In set form: ∅ ⊊ M(φ) ⊊ I.',
      'Most everyday statements are contingent: they depend on the facts.'
    ],
    ex: [
      '<span class="m">p</span> is contingent: true at p = 1, false at p = 0.',
      '<span class="m">p ∧ q</span> is contingent.',
      'Not contingent: <span class="m">p ∨ ¬p</span> (valid) and <span class="m">p ∧ ¬p</span> (unsatisfiable).'
    ],
    mix: 'Contingent = satisfiable and falsifiable. Valid and unsatisfiable formulas are the two non-contingent kinds.'
  },
  '5.3|satisfiable': {
    match: ['satisfy', 'satisfies', 'satisfiability'],
    steps: [
      'Look for one truth assignment that makes φ true.',
      'If one exists, φ is satisfiable. Stop at the first you find.',
      'In set form: M(φ) ≠ ∅.'
    ],
    ex: [
      '<span class="m">p ∧ q</span> is satisfiable: p = q = 1.',
      '<span class="m">p ∨ ¬p</span> is satisfiable (and valid).',
      'Not satisfiable: <span class="m">p ∧ ¬p</span>.'
    ],
    mix: 'Satisfiable means "at least one", not "most". A formula true in only one of a million assignments is still satisfiable.'
  },
  '5.3|falsifiable': {
    match: [],
    steps: [
      'Look for one truth assignment that makes φ false.',
      'If one exists, φ is falsifiable.',
      'In set form: M(φ) ≠ I.'
    ],
    ex: [
      '<span class="m">p</span> is falsifiable: p = 0.',
      '<span class="m">p ∧ ¬p</span> is falsifiable (false everywhere).',
      'Not falsifiable: <span class="m">p ∨ ¬p</span>. It is valid.'
    ],
    mix: 'φ is valid exactly when it is not falsifiable.'
  },
  '5.3|equivalent': {
    match: ['≡', 'equivalence'],
    steps: [
      'Two formulas are equivalent when they are true in exactly the same situations.',
      'In set form: M(φ) = M(ψ). We write φ ≡ ψ.',
      'So you can swap one for the other without changing any meaning.'
    ],
    ex: [
      '<span class="m">p → q</span> ≡ <span class="m">¬p ∨ q</span>.',
      '<span class="m">¬¬p</span> ≡ <span class="m">p</span>.',
      '<span class="m">¬(p ∧ q)</span> ≡ <span class="m">¬p ∨ ¬q</span> (De Morgan).',
      'Not equivalent: <span class="m">p → q</span> and <span class="m">q → p</span>. At p = 1, q = 0 they differ.'
    ],
    mix: 'φ ≡ ψ is a claim about two formulas. φ ↔ ψ is itself a formula. They are linked: φ ≡ ψ exactly when φ ↔ ψ is valid.'
  },
  '5.3|φ, ψ, χ': {
    match: [],
    steps: [
      'These Greek letters are placeholders for formulas.',
      'A statement about φ holds for any formula you put in its place.',
      'The same letter must be replaced by the same formula each time.'
    ],
    ex: [
      '"φ ∨ ¬φ is valid" covers p ∨ ¬p and also (p ∧ q) ∨ ¬(p ∧ q).',
      'φ could be p → q.',
      'In φ → ψ, φ and ψ can be the same formula or different ones.'
    ],
    mix: 'φ is not an atom. p is an atom. φ is a name that can stand for p, ¬p, or anything bigger.'
  },
  '5.4|SAT': {
    match: ['satisfiability problem'],
    steps: [
      'SAT is a question: given a formula φ, is there any assignment that makes it true?',
      'In set form: is M(φ) ≠ ∅?',
      'You can answer by trying all 2ⁿ rows of the truth table.',
      'The answer is just yes or no.'
    ],
    ex: [
      '<span class="m">p ∧ ¬p</span>: SAT answer is no.',
      '<span class="m">p ∨ q</span>: SAT answer is yes.',
      '<span class="m">(p ∨ q) ∧ ¬p ∧ ¬q</span>: no, p and q would both have to be false and one true.'
    ],
    mix: 'SAT asks whether a formula is satisfiable. It does not ask for all models, and it is not the same as asking whether it is valid.'
  },
  '5.4|SAT solver': {
    match: ['SAT solvers'],
    steps: [
      'A SAT solver is a program that answers the SAT question.',
      'It does not simply try every row. It uses clever shortcuts.',
      'On many real problems it is fast, even with thousands of atoms.'
    ],
    ex: [
      'MiniSAT is a SAT solver.',
      'Glucose is a SAT solver.',
      'Use: encode graph colouring as a formula F, then ask the solver whether F is satisfiable.'
    ],
    mix: 'A solver is fast on many real cases, not on all. The worst case is still exponential.'
  },
  '5.4|M(φ) ≠ ∅': {
    match: [],
    steps: [
      'M(φ) is the set of models of φ.',
      '≠ ∅ says that set is not empty.',
      'So at least one assignment makes φ true: φ is satisfiable. This is what SAT asks.'
    ],
    ex: [
      'M(p ∨ q) ≠ ∅: it holds three assignments.',
      'M(p ∧ q) ≠ ∅: it holds one.',
      'False: M(p ∧ ¬p) ≠ ∅. That set is empty.'
    ]
  },
  '5.4|exponential time': {
    match: ['exponential'],
    steps: [
      'The truth table has 2ⁿ rows for n atoms.',
      'Each extra atom doubles the work.',
      'Work that doubles with every step is exponential time. It becomes hopeless fast.'
    ],
    ex: [
      '10 atoms: 1,024 rows.',
      '20 atoms: over a million rows.',
      '60 atoms: far too many rows for any computer to check one by one.'
    ],
    mix: 'Exponential growth (2ⁿ) is much worse than a polynomial such as n². Doubling beats any fixed power.'
  },
  '5.4|NP-complete': {
    match: [],
    steps: [
      'NP-complete is a name for a class of hard problems.',
      'For all of them, no fast method for every case is known.',
      'SAT is in this class.',
      'A fast method for one NP-complete problem would give one for all of them.'
    ],
    ex: [
      'SAT is NP-complete.',
      'Graph colouring is NP-complete as well.',
      'The easy half: checking one given assignment against φ is quick. The hard half is finding a satisfying assignment among all 2<sup>n</sup> of them.'
    ],
    mix: 'Hard in the worst case does not mean hard on every instance. SAT solvers handle many real cases.'
  },
  '5.4|graph': {
    nolink: true,
    match: [],
    steps: [
      'A graph here is not a chart. It is dots joined by lines.',
      'The dots are things, the lines say which pairs are connected.',
      'We use graphs to model conflicts.'
    ],
    ex: [
      'Lecture graph: 4 dots, lines 1-2, 1-3, 1-4, 2-4, 3-4.',
      'Four courses as dots, a line between two courses when a student takes both.',
      'Not this kind of graph: a bar chart.'
    ]
  },
  '5.4|vertex and edge': {
    match: ['vertex', 'vertices', 'edge', 'edges'],
    steps: [
      'A vertex is one dot of the graph.',
      'An edge is a line joining two vertices.',
      'Two vertices joined by an edge are called adjacent.'
    ],
    ex: [
      'Lecture graph: vertices 1, 2, 3, 4.',
      'Edge (1,2) joins vertices 1 and 2.',
      'Vertices 2 and 3 have no edge in the lecture graph, so they are not adjacent.'
    ]
  },
  '5.4|colouring': {
    match: ['colourings', 'colour', 'colours', 'color', 'coloring'],
    steps: [
      'A colouring gives each vertex exactly one colour.',
      'The rule: two vertices joined by an edge must get different colours.',
      'Here colours stand for things such as exam slots.'
    ],
    ex: [
      'Lecture graph, 4 colours: 1→1, 2→2, 3→3, 4→4 is a colouring.',
      'Exams as vertices, slots as colours: clashing exams get different slots.',
      'Not a colouring: vertices 1 and 2 are joined by an edge and both get colour 1.'
    ]
  },
  '5.4|vc': {
    nolink: true,
    match: [],
    steps: [
      'vc is one atom. Its name is the vertex number then the colour number.',
      'It means "vertex v has colour c".',
      'True means yes, false means no.',
      'With 4 vertices and 4 colours there are 16 such atoms.'
    ],
    ex: [
      '21 means vertex 2 has colour 1.',
      '44 means vertex 4 has colour 4.',
      'If 11, 22, 33, 44 are true and the rest false, the colouring is 1→1, 2→2, 3→3, 4→4.'
    ],
    mix: 'vc is not v times c. It is a single atom name made of two symbols.'
  },
  '5.4|vc′': {
    nolink: true,
    match: [],
    steps: [
      'c′ (read "c prime") means a colour different from c.',
      'vc′ is the atom saying vertex v has that other colour.',
      'It is used to forbid two colours on one vertex.'
    ],
    ex: [
      '11 and 12: vertex 1 with colour 1, and vertex 1 with colour 2.',
      '¬(11 ∧ 12): vertex 1 does not get both colours.',
      'Not vc′: 21, since it is a different vertex.'
    ]
  },
  '5.4|F1, F2, F3, F': {
    nolink: true,
    match: ['F₁', 'F₂', 'F₃'],
    steps: [
      'F₁ says every vertex gets at least one colour.',
      'F₂ says no vertex gets two colours.',
      'F₃ says two vertices joined by an edge never share a colour.',
      'F = F₁ ∧ F₂ ∧ F₃. A model of F is a proper colouring.'
    ],
    ex: [
      'Vertex 1 gets none: F₁ fails.',
      'Vertex 1 gets colours 1 and 2: F₂ fails.',
      'Vertices 1 and 2 are joined and both get colour 1: F₃ fails.',
      '11, 22, 33, 44 true and the rest false: F₁, F₂, F₃ all hold, so F holds.'
    ],
    mix: 'F is one big formula, an "and" of three rule groups. It is not a colouring itself. Its models encode colourings.'
  },
  '5.5|entails': {
    match: ['⊨', '⊭', 'entailment', 'entail', 'entailed', 'logically entails'],
    steps: [
      'Look at every model of Δ: every assignment that makes all of Δ true.',
      'Check φ in each of those.',
      'If φ is true in all of them, then Δ entails φ, written Δ ⊨ φ.',
      'In set form: M(Δ) ⊆ M(φ).'
    ],
    ex: [
      '{p} ⊨ p ∨ q: every model of p makes p ∨ q true.',
      '{p, p → q} ⊨ q: p = 1 and p → q = 1 force q = 1.',
      'Not entailed, {p} ⊭ p ∧ q: take p = 1, q = 0.',
      '{p, ¬p} ⊨ anything: with no models the check never fails.'
    ],
    mix: '⊨ vs ⊢: ⊨ is about truth in models (meaning). ⊢ is about having a proof (symbol steps). A sound and complete system makes them agree.'
  },
  '5.5|⊆': {
    match: [],
    steps: [
      'A ⊆ B reads "every item of A is also in B".',
      'A may be equal to B or smaller.',
      'Entailment Δ ⊨ φ is exactly M(Δ) ⊆ M(φ).'
    ],
    ex: [
      '{1,2} ⊆ {1,2,3}.',
      '{1,2,3} ⊆ {1,2,3}: equality is allowed.',
      'Not ⊆: {1,4} and {1,2,3}, since 4 is missing on the right.'
    ],
    mix: '⊆ allows equal sets. ⊊ (lesson 5.3) does not.'
  },
  '5.5|⟺': {
    match: [],
    steps: [
      'A ⟺ B means A and B are true together or false together.',
      'It is about statements of the theory, written in plain logic about logic.',
      'To prove one, show both directions.'
    ],
    ex: [
      'Δ ⊨ φ ⟺ M(Δ) ⊆ M(φ).',
      'Δ ⊨ φ ⟺ Δ ∪ {¬φ} is unsatisfiable.',
      'rain ⟺ wet roof: if the roof is wet there was rain, and the other way.'
    ],
    mix: '⟺ is a statement about two claims. ↔ is a connective inside a formula.'
  },
  '5.5|∪': {
    match: [],
    steps: [
      '∪ puts two sets together into one.',
      'Each item appears once in the result.',
      'Δ ∪ {¬φ} is Δ with the sentence ¬φ added.'
    ],
    ex: [
      '{1,2} ∪ {2,3} = {1,2,3}.',
      'Δ = {p, p → q}, φ = q: Δ ∪ {¬q} = {p, p → q, ¬q}.',
      'Δ ∪ { } = Δ.'
    ],
    mix: '∪ is for sets. ∨ is "or" between formulas.'
  },
  '5.5|{ }': {
    nolink: true,
    match: [],
    steps: [
      'Curly braces hold a collection of items, written with commas.',
      'The order does not matter and repeats do not count.',
      'A knowledge base is written this way.'
    ],
    ex: [
      '{p, p → q} has two sentences.',
      '{p, q} and {q, p} are the same set.',
      '{p, p} is just {p}.',
      '{ } has nothing inside.'
    ],
    mix: 'Braces mean "set". Brackets ( ) group a formula, such as (p ∧ q) ∨ r.'
  },
  '5.5|counter-model': {
    match: ['counter-models', 'countermodel'],
    steps: [
      'Suppose you claim Δ ⊨ φ.',
      'A counter-model is a model of Δ in which φ is false.',
      'One counter-model is enough to show the claim is wrong.',
      'If none exists, the entailment holds.'
    ],
    ex: [
      '{p} ⊭ p ∧ q: i = {p↦1, q↦0} is a model of {p} where p ∧ q is false.',
      '{p ∨ q} ⊭ p: i = {p↦0, q↦1} is a counter-model.',
      'No counter-model: {p, p → q} ⊨ q.'
    ],
    mix: 'A counter-model must make all of Δ true. An assignment that falsifies a premise does not refute anything.'
  },
  '5.5|inconsistent': {
    match: ['inconsistency'],
    steps: [
      'A knowledge base is inconsistent when it has no model.',
      'No situation makes all its sentences true together.',
      'In set form: M(Δ) = ∅.',
      'Then Δ entails every formula.'
    ],
    ex: [
      '{p, ¬p} is inconsistent.',
      '{p, p → q, ¬q} is inconsistent.',
      'Consistent: {p, p → q}. p = q = 1 is a model.'
    ],
    mix: 'Everything follows from an inconsistent Δ. This is correct logic ("vacuous truth"), not a bug, but a useless knowledge base.'
  },
  '5.5|theorem': {
    match: [],
    steps: [
      'A theorem is a statement that has been proved.',
      'Once proved, you may use it without proving it again.',
      'The Unsatisfiability Theorem is the key one here.'
    ],
    ex: [
      'Unsatisfiability Theorem: Δ ⊨ φ ⟺ Δ ∪ {¬φ} is unsatisfiable.',
      'Soundness and completeness of resolution (lesson 5.9) is a theorem.',
      'Not a theorem yet: a claim you only guessed.'
    ]
  },
  '5.5|(⇒) and (⇐)': {
    match: ['(⇒)', '(⇐)'],
    steps: [
      'To prove "A ⟺ B" you prove two directions.',
      '(⇒): assume A, show B.',
      '(⇐): assume B, show A.',
      'Both must be done.'
    ],
    ex: [
      '(⇒) of the theorem: assume Δ ⊨ φ, show Δ ∪ {¬φ} is unsatisfiable.',
      '(⇐) of the theorem: assume Δ ∪ {¬φ} is unsatisfiable, show Δ ⊨ φ.',
      'Doing only (⇒) proves one-way "if", not "exactly when".'
    ]
  },
  '5.6|proof': {
    match: [],
    steps: [
      'A proof of φ from Δ is a finite list of sentences ending in φ.',
      'Each line is either a premise from Δ or follows from earlier lines by an inference rule.',
      'It uses only symbol steps, no truth tables.'
    ],
    ex: [
      'Lines 1 to 6 of the worked example prove r from {p, p → q, (p → q) → (q → r)}.',
      'Short proof: 1. p (premise), 2. p → q (premise), 3. q (IE: 1, 2).',
      'Not a proof: a line that no rule allows, or a list that does not end in φ.'
    ],
    mix: 'A proof is a checkable list, not just an argument in words. Each line must name the rule and lines it uses.'
  },
  '5.6|premise': {
    match: ['premises'],
    steps: [
      'A premise is a sentence from Δ.',
      'In a proof you may write it down at any time, labelled "Premise".',
      'It is given, not derived.'
    ],
    ex: [
      'Δ = {p, p → q}: both p and p → q are premises.',
      'q is not a premise. It is derived by IE.',
      'In a rule, the sentences above the line are its premises.'
    ],
    mix: 'A premise is given. An assumption (lesson 5.7) is only supposed for a while inside a box.'
  },
  '5.6|conclusion': {
    match: [],
    steps: [
      'A conclusion is the sentence that comes out.',
      'For a rule: the sentence under the line.',
      'For a proof: the last line.'
    ],
    ex: [
      'IE on p → q and p: conclusion q.',
      'Proof of r from Δ: the conclusion is r.',
      'Not a conclusion: line 2 of the proof, unless it is the last.'
    ]
  },
  '5.6|inference rule': {
    match: ['inference rules'],
    steps: [
      'An inference rule is a fixed pattern of one step.',
      'It lists premise schemas above a line and a conclusion schema below.',
      'If you hold sentences matching the premises, you may write the conclusion.'
    ],
    ex: [
      'Implication Elimination: from φ → ψ and φ, write ψ.',
      'Instance: from p → q and p, write q.',
      'Not a rule: "from q and p → q, write p". This is not sound.'
    ],
    mix: 'A rule works on the shape of sentences, not on their meaning. It is only trusted if the system is sound.'
  },
  '5.6|schema': {
    match: ['schemas'],
    steps: [
      'A schema is a formula pattern.',
      'It uses placeholders such as φ, ψ, χ in place of real formulas.',
      'One schema stands for infinitely many real formulas.'
    ],
    ex: [
      'φ → ψ is a schema.',
      'p → q and (p ∧ r) → ¬s both fit φ → ψ.',
      'Not a schema: ∨φ. It is not a well-formed pattern.'
    ],
    mix: 'A schema is a pattern. An instance is a real formula obtained from the pattern.'
  },
  '5.6|meta-variable': {
    match: ['meta-variables', 'metavariable'],
    steps: [
      'A meta-variable is a placeholder inside a schema.',
      'We write it φ, ψ or χ.',
      'It stands for any formula, small or big.'
    ],
    ex: [
      'In φ → ψ, φ may be p and ψ may be ¬q.',
      'φ may also be (p ∧ q) ∨ r.',
      'Not a meta-variable: p. It is an atom of Σ.'
    ],
    mix: 'Atoms (p, q) are names for facts in the language. Meta-variables (φ, ψ) are names we use to talk about formulas.'
  },
  '5.6|instance': {
    match: [],
    steps: [
      'Take a schema or rule.',
      'Replace each meta-variable by a real formula.',
      'Use the same formula for the same meta-variable everywhere.'
    ],
    ex: [
      'p → q is an instance of φ → ψ, with φ = p and ψ = q.',
      'The rule IE with φ = p → q and ψ = q → r gives: from (p → q) → (q → r) and p → q, write q → r.',
      'Not an instance: from p → q and r, write q. The φ would be p and r at the same time.'
    ]
  },
  '5.6|Implication Elimination': {
    match: ['IE', 'modus ponens', 'Modus ponens'],
    steps: [
      'Suppose you have the sentence φ → ψ.',
      'Suppose you also have the sentence φ.',
      'Then you may write ψ.',
      'This is the first rule of the course, used again in Fitch.'
    ],
    ex: [
      'p → q and p give q.',
      'raining → wet, raining give wet.',
      '(p → q) → (q → r) and p → q give q → r.',
      'Not allowed: p → q and q do not give p.'
    ],
    mix: 'IE is not the same as II (Implication Introduction). IE uses an implication. II builds one by a box.'
  },
  '5.6|⟹': {
    match: [],
    steps: [
      'Written between sentences and a result, ⟹ reads "from these we can conclude this".',
      'It is a short way to write one inference rule step.',
      'It shows a step, not a truth.'
    ],
    ex: [
      'p → q, p ⟹ q.',
      'p ∧ q ⟹ p.',
      'Not valid as a step: q, p → q ⟹ p.'
    ],
    mix: '⟹ shows a step in a rule. ⊢ says a full proof exists. ⊨ says truth in models.'
  },
  '5.6|proves': {
    match: ['⊢', 'provable', 'proved'],
    steps: [
      'Δ ⊢ φ says there is a finite proof of φ from Δ.',
      'The small R under ⊢ names the proof system whose rules are allowed.',
      'It talks about steps you can write down, not about truth.'
    ],
    ex: [
      '{p, p → q} ⊢ q (one IE step).',
      '{p → q, q → r} ⊢ p → r (Fitch box, lesson 5.7).',
      'No proof: {p ∧ q} ⊢ p fails in a system that only has IE, since IE cannot take ∧ apart. Fitch has AE for this.'
    ],
    mix: '⊢ vs ⊨: ⊢ is "a proof exists", ⊨ is "true in all models". Soundness and completeness say they agree.'
  },
  '5.6|sound': {
    match: ['soundness'],
    steps: [
      'A proof system R is sound if everything it proves is really entailed.',
      'In symbols: Δ ⊢ φ gives Δ ⊨ φ.',
      'So it never proves anything false.'
    ],
    ex: [
      'IE is sound: if φ → ψ and φ are true, ψ is true.',
      'A bad rule "from p → q and q, write p" is not sound.',
      'A sound system may still be weak: with no rules at all it is sound, but proves almost nothing.'
    ],
    mix: 'Sound vs complete: sound means no wrong proofs. Complete means no missing proofs. You want both.'
  },
  '5.6|complete': {
    match: ['completeness'],
    steps: [
      'A proof system R is complete if every entailed formula has a proof.',
      'In symbols: Δ ⊨ φ gives Δ ⊢ φ.',
      'So it misses nothing.'
    ],
    ex: [
      'Fitch is complete: every entailment can be proved.',
      'IE alone is not complete: {p ∧ q} ⊨ p, but IE cannot prove it.',
      'Resolution is complete as refutation, not as plain derivation.'
    ],
    mix: 'Sound vs complete: sound means no wrong proofs. Complete means no missing proofs.'
  },
  '5.6|⇒': {
    match: [],
    steps: [
      'A ⇒ B reads "if A holds then B holds".',
      'It is used for statements of the theory.',
      'Soundness is written Δ ⊢ φ ⇒ Δ ⊨ φ.'
    ],
    ex: [
      'Soundness: Δ ⊢ φ ⇒ Δ ⊨ φ.',
      'Completeness: Δ ⊨ φ ⇒ Δ ⊢ φ.',
      'Both together: Δ ⊢ φ ⟺ Δ ⊨ φ.'
    ],
    mix: '⇒ is one direction. ⟺ is both directions. Do not use ⇒ inside a formula: there you write →.'
  },
  '5.7|Fitch': {
    match: ['Fitch proof', 'Fitch proofs'],
    steps: [
      'Fitch is a proof system with ten rules.',
      'Each connective gets an introduction rule (to build it) and an elimination rule (to use it).',
      'Rules may open a box to make an assumption.',
      'It works on any formula, with no rewriting needed.'
    ],
    ex: [
      'To show p ∧ q, prove p and prove q, then use AI.',
      'To use p ∧ q, take p by AE.',
      'Proof of p → r from {p → q, q → r}: assume p in a box, get q, get r, close with II.'
    ],
    mix: 'Fitch vs resolution: Fitch works on any formula and is built by hand. Resolution needs clauses and refutes the negated goal.'
  },
  '5.7|introduction rule': {
    match: ['introduction rules', 'introduction'],
    steps: [
      'An introduction rule builds a sentence with a given connective.',
      'It says what you must already have.',
      'The name ends in I: NI, AI, OI, II, BI.'
    ],
    ex: [
      'AI: from φ and ψ, write φ ∧ ψ.',
      'OI: from φ, write φ ∨ ψ.',
      'BI: from φ → ψ and ψ → φ, write φ ↔ ψ.',
      'II: assume φ, reach ψ in a box, write φ → ψ.'
    ],
    mix: 'Introduction makes a connective appear. Elimination uses one up.'
  },
  '5.7|elimination rule': {
    match: ['elimination rules', 'elimination'],
    steps: [
      'An elimination rule uses a sentence with a given connective.',
      'It tells what you may take out of it.',
      'The name ends in E: NE, AE, OE, IE, BE.'
    ],
    ex: [
      'AE: from φ ∧ ψ, write φ (or ψ).',
      'IE: from φ → ψ and φ, write ψ.',
      'NE: from ¬¬φ, write φ.',
      'BE: from φ ↔ ψ, write φ → ψ (or ψ → φ).'
    ],
    mix: 'Elimination uses a sentence you hold. Introduction builds a new one.'
  },
  '5.7|assumption': {
    match: [],
    steps: [
      'An assumption is a sentence you suppose for the moment.',
      'You write it at the top of a box.',
      'You want to see what follows from it.',
      'It is not given, and it does not last past the box.'
    ],
    ex: [
      '"Suppose p" starts the box in the proof of p → r.',
      'Inside the box you may use the assumption and everything above the box.',
      'After the box closes, p is no longer usable as a fact.'
    ],
    mix: 'A premise is in Δ and stays usable. An assumption lives only inside its box.'
  },
  '5.7|subproof (box)': {
    match: ['subproof', 'subproofs', 'box', 'boxes'],
    steps: [
      'A subproof is a smaller proof drawn inside a box.',
      'It starts with an assumption.',
      'Lines inside may use lines above the box.',
      'Lines outside may not use lines inside, except through the box as a whole (rule II).'
    ],
    ex: [
      'Transitivity: box 3 assumes p, derives q, then r. Line 4 is p → r.',
      'Nested: in the proof of m → q, box 3.3 sits inside box 3.',
      'Not allowed: using line 3.2 (inside the box) as a free line outside.'
    ],
    mix: 'The conclusion of II sits outside the box, not inside.'
  },
  '5.7|discharged': {
    match: ['discharge'],
    steps: [
      'An assumption is discharged when its box closes.',
      'That happens when you apply the rule II.',
      'After that you may not use the assumption as if it were true.',
      'What stays is the implication: φ → ψ.'
    ],
    ex: [
      'Assume p, derive r, close: p is discharged, we keep p → r.',
      'p is not in the premises, and still the proof is fine, because it is discharged.',
      'Not allowed: use p on a later line after its box closed.'
    ]
  },
  '5.7|φ₁ … φₙ and φᵢ': {
    match: ['φ₁', 'φₙ', 'φᵢ'],
    steps: [
      'The small low numbers are labels for formulas in a list.',
      'φ₁ is the first, φₙ is the last, n is how many.',
      'φᵢ is any one of them.'
    ],
    ex: [
      'n = 3: φ₁, φ₂, φ₃ are three formulas.',
      'AI on p, q, r gives p ∧ q ∧ r.',
      'AE on p ∧ q ∧ r gives φᵢ: p, or q, or r.'
    ],
    mix: 'The low numbers are positions in a list, not powers.'
  },
  '5.7|abbreviations': {
    match: ['NI', 'NE', 'AI', 'AE', 'OI', 'OE', 'II', 'BI', 'BE'],
    steps: [
      'The first letter names the connective: N = not, A = and, O = or, I = implication, B = biconditional.',
      'The second letter says what the rule does: I = introduction, E = elimination.',
      'IE (Implication Elimination) has its own entry.'
    ],
    ex: [
      'AI = And Introduction.',
      'OE = Or Elimination.',
      'II = Implication Introduction (the rule that closes a box).',
      'BE = Biconditional Elimination.'
    ],
    mix: 'II is two letters: implication, introduction. It is not a number.'
  },
  '5.8|literal': {
    match: ['literals'],
    steps: [
      'A literal is an atom, or an atom with one ¬ in front.',
      'Nothing bigger counts.',
      'Literals are the building blocks of clauses.'
    ],
    ex: [
      'p is a literal.',
      '¬p is a literal.',
      'Not a literal: ¬¬p (two negations).',
      'Not a literal: p ∨ q (a formula with a connective).'
    ]
  },
  '5.8|clause': {
    match: ['clauses'],
    steps: [
      'A clause is a set of literals in braces.',
      'It stands for the "or" of its literals.',
      'The clause is true when at least one literal in it is true.',
      'Order and repeats do not matter.'
    ],
    ex: [
      '{p, ¬q, r} means p ∨ ¬q ∨ r.',
      '{p} means just p.',
      '{¬p, q} means ¬p ∨ q, which is p → q.',
      'Not a clause: {p ∧ q}. A literal cannot contain ∧.'
    ],
    mix: 'Inside one clause the literals are joined by or. A list of clauses is joined by and.'
  },
  '5.8|disjunction / conjunction': {
    match: [],
    steps: [
      'A disjunction is an "or" of parts: φ₁ ∨ φ₂ ∨ ... ',
      'A conjunction is an "and" of parts: φ₁ ∧ φ₂ ∧ ... ',
      'A clause is a disjunction of literals.',
      'A CNF is a conjunction of such clauses.'
    ],
    ex: [
      'p ∨ q ∨ ¬r is a disjunction.',
      'p ∧ q ∧ ¬r is a conjunction.',
      '(p ∨ q) ∧ ¬r is a conjunction of a disjunction and a literal.'
    ],
    mix: 'Dis-junction is "or". Con-junction is "and". ∧ looks like the A in "And".'
  },
  '5.8|CNF': {
    match: ['conjunctive normal form'],
    steps: [
      'CNF is a shape for formulas: Conjunctive Normal Form.',
      'It is an "and" of clauses, each clause an "or" of literals.',
      'Every formula has an equivalent formula in CNF.'
    ],
    ex: [
      'a ∧ ¬b is in CNF (two one-literal clauses).',
      '(p ∨ q) ∧ ¬r is in CNF.',
      'Not CNF: a → b (has →).',
      'Not CNF: ¬¬a (double negation).',
      'Not CNF: (a ∧ b) ∨ ¬a (an "or" of an "and": that is DNF).'
    ],
    mix: 'CNF is ands of ors. DNF is ors of ands.'
  },
  '5.8|clausal form': {
    match: [],
    steps: [
      'Take a formula in CNF.',
      'Write each clause as a set of literals.',
      'Put all clauses in an outer set.',
      'This set of sets is the clausal form, the input to resolution.'
    ],
    ex: [
      'a ∧ ¬b gives {{a}, {¬b}}.',
      '(p ∨ q) ∧ ¬r gives {{p, q}, {¬r}}.',
      'For a knowledge base, take the union of its sentences\' clausal forms.',
      'a ∨ a gives {{a}}: repeats collapse in a set.'
    ],
    mix: 'Same meaning as the CNF, only written differently. Inner braces mean "or", the outer set means "and".'
  },
  '5.8|empty clause': {
    match: ['{}'],
    steps: [
      'A clause is true when at least one of its literals is true.',
      'The empty clause has no literals, so none can be true.',
      'So it is false in every situation: unsatisfiable.',
      'It is written { } or {}.'
    ],
    ex: [
      '{} is the empty clause: an "or" of nothing.',
      'A set of clauses that contains {} is unsatisfiable.',
      'Not the empty clause: {p}. It has one literal.'
    ],
    mix: 'The empty clause {} is a clause with nothing in it (always false). The empty set of clauses is a CNF with no conditions (always true). Do not mix them.'
  },
  '5.8|DNF': {
    match: [],
    steps: [
      'DNF is Disjunctive Normal Form.',
      'It is an "or" of "and" groups.',
      'It is the reverse of CNF.'
    ],
    ex: [
      '(a ∧ b) ∨ ¬a is in DNF.',
      '(p ∧ q) ∨ (r ∧ ¬s) is in DNF.',
      'Not DNF: (p ∨ q) ∧ r. It is CNF.'
    ],
    mix: 'Resolution needs CNF, not DNF.'
  },
  '5.8|De Morgan': {
    match: ['De Morgan\'s'],
    steps: [
      'These two rules move a ¬ inside brackets.',
      '¬(φ ∨ ψ) becomes ¬φ ∧ ¬ψ.',
      '¬(φ ∧ ψ) becomes ¬φ ∨ ¬ψ.',
      'The connective flips, ∧ to ∨ and ∨ to ∧.'
    ],
    ex: [
      '¬(p ∨ q) ≡ ¬p ∧ ¬q.',
      '¬(p ∧ q) ≡ ¬p ∨ ¬q.',
      '¬(¬p ∧ q) ≡ p ∨ ¬q.',
      'Wrong: ¬(p ∨ q) is not ¬p ∨ ¬q.'
    ],
    mix: 'Do not keep the connective. Pushing ¬ in must flip ∧ and ∨.'
  },
  '5.8|INDO': {
    match: [],
    steps: [
      'I: take Implications out. φ → ψ becomes ¬φ ∨ ψ.',
      'N: push Negations in until they sit on atoms (use De Morgan, ¬¬φ becomes φ).',
      'D: Distribute ∨ over ∧ so you get an "and" of "or"s.',
      'O: take Operators out. Each "or" becomes a clause, the "and" becomes the outer set.'
    ],
    ex: [
      'g ∧ (r → f): I gives g ∧ (¬r ∨ f); O gives {{g}, {¬r, f}}.',
      '(p → q) → (q → r) ends as {{p, ¬q, r}, {¬q, r}}.',
      'D step: p ∨ (q ∧ r) becomes (p ∨ q) ∧ (p ∨ r).'
    ],
    mix: 'Do the letters in order. Distribute ∨ over ∧, never the other way round.'
  },
  '5.9|complementary literals': {
    match: ['complementary pair', 'complementary'],
    steps: [
      'Two literals are complementary when one is the negation of the other.',
      'They sit in two different clauses.',
      'Resolution cancels them.'
    ],
    ex: [
      'q and ¬q are complementary.',
      '{p, q} and {¬q, r}: q and ¬q cancel.',
      'Not complementary: p and ¬q (different atoms).',
      'Not complementary: p and p.'
    ],
    mix: 'Resolve on exactly one complementary pair per step. Cancelling two pairs at once is wrong.'
  },
  '5.9|χ': {
    match: [],
    steps: [
      'In the general resolution rule, χ stands for one literal.',
      'The first clause contains χ.',
      'The second clause contains ¬χ.'
    ],
    ex: [
      'χ = q: clauses {p, q} and {¬q, r}.',
      'χ = ¬p: the other clause contains p.',
      'The letter is "chi", the Greek letter, not an x.'
    ]
  },
  '5.9|φ₁, …, φₘ and ψ₁, …, ψₙ': {
    match: [],
    steps: [
      'These are the other literals in the two clauses.',
      'φ₁, …, φₘ are in the first clause beside χ.',
      'ψ₁, …, ψₙ are in the second clause beside ¬χ.',
      'The resolvent is exactly these literals together.'
    ],
    ex: [
      '{p, q} and {¬q, r}: φ₁ = p, ψ₁ = r.',
      '{p, s, q} and {¬q, r}: φ₁ = p, φ₂ = s, ψ₁ = r.',
      '{q} and {¬q}: no others, so the resolvent is {}.'
    ]
  },
  '5.9|resolution': {
    match: ['resolve', 'resolves', 'resolved', 'resolution rule'],
    steps: [
      'Take two clauses, one containing χ and the other ¬χ.',
      'Remove both χ and ¬χ.',
      'Join what is left of the two clauses into a new clause.',
      'This is the only rule of the system.'
    ],
    ex: [
      '{p, q} and {¬q, r} give {p, r}.',
      '{p} and {¬p} give {}.',
      '{¬q, r} and {q} give {r}: modus ponens as a special case.',
      'Not allowed: {p, q} and {¬p, ¬q} to {} (two pairs cancelled). Only one pair per step.'
    ],
    mix: 'Resolution is a rule on clauses. Fitch rules work on any formula.'
  },
  '5.9|resolvent': {
    match: ['resolvents'],
    steps: [
      'The resolvent is the new clause a resolution step produces.',
      'It holds all other literals of both parents.',
      'It is true whenever both parents are true.'
    ],
    ex: [
      '{p, q}, {¬q, r}: resolvent {p, r}.',
      '{¬p, r}, {p, q}: resolvent {q, r}.',
      '{r}, {¬r}: resolvent {}.'
    ]
  },
  '5.9|derivation': {
    match: ['derivations', 'resolution derivation'],
    steps: [
      'A derivation is a list of clauses.',
      'Each clause is given (in Δ) or is a resolvent of two earlier clauses.',
      'It ends at the clause you wanted.'
    ],
    ex: [
      'From {¬p,r}, {¬q,r}, {p,q}: {q,r}, then {r}.',
      'Each line names its two parents, such as "Resolve 1, 3 on p".',
      'Not a derivation of {a, ¬a} from nothing: there is no clause to start from.'
    ],
    mix: 'A derivation of φ is not a resolution proof of φ. A proof refutes ¬φ (lesson 5.10).'
  },
  '5.9|sound': {
    match: ['soundness'],
    steps: [
      'Resolution is sound: whatever it derives is entailed.',
      'Reason: if both parent clauses are true, the resolvent is true too.',
      'Why: if χ is true, ¬χ is false, so the second clause needs one of its other literals true. If χ is false, the first clause needs one of its other literals true.',
      'So if {r} is derived from Δ, then Δ ⊨ r.'
    ],
    ex: [
      '{p, q}, {¬q, r}: any assignment making both true makes {p, r} true.',
      '{p} and {¬p} give {}: these two never hold together, and {} is never true.',
      'Never happens: true parent clauses and a false resolvent.'
    ],
    mix: 'Sound is not complete. Plain derivation cannot get a ∨ ¬a from nothing, which is why we refute (lesson 5.10).'
  },
  '5.10|refutation': {
    match: ['refute', 'refuting', 'refutes'],
    steps: [
      'To prove φ, assume ¬φ is true as well as Δ.',
      'Show this leads to a contradiction.',
      'A contradiction shows Δ ∪ {¬φ} is unsatisfiable.',
      'By the Unsatisfiability Theorem, Δ ⊨ φ.'
    ],
    ex: [
      'To prove r from {p, p → q, q → r}: add ¬r and derive {}.',
      'To prove a ∨ ¬a from nothing: add ¬(a ∨ ¬a), get {a} and {¬a}, then {}.',
      'Failing case: if you cannot reach {} (and nothing more resolves), the goal does not follow.'
    ],
    mix: 'Refutation proves φ by killing ¬φ. You never prove φ directly.'
  },
  '5.10|negated goal': {
    match: ['negated goals'],
    steps: [
      'The goal is the sentence φ you want to prove.',
      'Negate it: write ¬φ.',
      'Convert to clauses and add it to the premises.'
    ],
    ex: [
      'Goal r gives negated goal ¬r, clause {¬r}.',
      'Goal p ∧ q gives ¬(p ∧ q), clause {¬p, ¬q}.',
      'Goal a ∨ ¬a gives ¬(a ∨ ¬a), clauses {¬a} and {a}.'
    ],
    mix: 'Negate the whole goal first, then convert. ¬(p ∧ q) is not {¬p}, {¬q}.'
  },
  '5.10|empty clause': {
    match: ['{}'],
    steps: [
      'The empty clause {} has no literals, so it is never true.',
      'You get it by resolving two clauses that are exact opposites, such as {r} and {¬r}.',
      'Reaching it means the clauses cannot all hold together.',
      'So the negated goal was impossible, and the goal follows.'
    ],
    ex: [
      '{r} and {¬r} give {}.',
      'In the proof of r: line 8 is {} from {¬r} and {r}.',
      'Not yet done: you reached {q} or {r}, but not {}.'
    ],
    mix: 'Reaching {} does not mean the premises are wrong. It means the premises plus ¬φ clash, so φ follows.'
  },
  '5.10|clausal(Δ ∪ {¬φ})': {
    nolink: true,
    match: [],
    steps: [
      'Take Δ and add ¬φ.',
      'Convert each sentence to clauses with INDO.',
      'The union of all those clauses is clausal(Δ ∪ {¬φ}).',
      'It is the starting list of a resolution proof.'
    ],
    ex: [
      'Δ = {p, p → q}, φ = q: clauses {p}, {¬p, q}, {¬q}.',
      'Δ = {p, p → q, (p → q) → (q → r)}, φ = r: {p}, {¬p,q}, {p,¬q,r}, {¬q,r}, {¬r}.',
      'Δ = { }, φ = a ∨ ¬a: {¬a}, {a}.'
    ]
  },
  '5.10|resolution proof': {
    match: ['resolution proofs'],
    steps: [
      'Take clausal(Δ ∪ {¬φ}).',
      'Apply resolution again and again.',
      'If you derive {}, you have a resolution proof of φ from Δ.'
    ],
    ex: [
      'Prove r: clauses 1 to 5, then {q}, {r}, {} in lines 6 to 8.',
      'Prove a ∨ ¬a from nothing: {a} and {¬a} give {}.',
      'Not a proof: a resolution derivation of {r} alone. It never refutes ¬r.'
    ],
    mix: 'Resolution proof = derive {} from Δ plus ¬φ. Resolution derivation = just derive some clause. Soundness and completeness: Δ ⊨ φ exactly when a resolution proof exists.'
  },
  '5.10|argument': {
    nolink: true,
    match: [],
    steps: [
      'Here an argument is not a quarrel.',
      'It is a conclusion plus the reasons: premises and rule steps that lead to it.',
      'A proof Δ ⊢ φ can be read as an argument for φ.'
    ],
    ex: [
      'The proof of r from {p, p → q, (p → q) → (q → r)}: premises are some of Δ, conclusion is r.',
      'Conclusion q, premises p and p → q, step IE.',
      'Not an argument here: a bare claim with no reasons.'
    ]
  },
  '5.10|strict rule': {
    match: ['strict rules', 'strict inference rules'],
    steps: [
      'A strict rule has no exceptions.',
      'If its premises are true, its conclusion must be true.',
      'All rules of propositional proof systems are strict.',
      'So every proof is a deductive argument.'
    ],
    ex: [
      'IE (modus ponens) is strict.',
      'The resolution rule is strict.',
      'Not strict: "birds usually fly, tweety is a bird, so tweety flies".'
    ],
    mix: 'Strict rules never fail. Defeasible rules can be overridden.'
  },
  '5.10|defeasible rule': {
    match: ['defeasible rules', 'defeasible'],
    steps: [
      'A defeasible rule usually holds but can be overridden.',
      'A new fact can defeat it.',
      'Propositional proof systems have none: that set is empty.'
    ],
    ex: [
      '"Birds usually fly."',
      'Exception: penguins. The rule is defeated for Tweety the penguin.',
      'Not defeasible: IE, which has no exceptions.'
    ],
    mix: 'Defeasible is the opposite of strict. This module has only strict rules.'
  }
});
