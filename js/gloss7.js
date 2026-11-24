/* Module 7 glossary extras: breakdown steps, examples, common confusion. Keys are 'lesson|term' exactly as in the lesson glossary. */
UI.glossExtra({
  '7.1|predicate': {
    match: ['predicates'],
    steps: [
      'A predicate is a name for a relationship or property, such as <span class="m">likes</span> or <span class="m">happy</span>.',
      'You write the name, then brackets, then the things it is about: <span class="m">likes(ann,bob)</span>.',
      'The whole thing is a claim, so it is either true or false.',
      'The number of things inside the brackets is fixed for each predicate.'
    ],
    ex: [
      '<span class="m">likes(ann,bob)</span>: says Ann likes Bob. Two things inside the brackets.',
      '<span class="m">happy(ann)</span>: says Ann is happy. One thing inside.',
      '<span class="m">knows(x,y)</span>: says x knows y, for whatever x and y stand for.',
      'Not a predicate: <span class="m">mother(ann)</span> (a function: it names a person, not a claim).'
    ],
    mix: 'Predicate vs function: a predicate application is true or false, a function application names a thing. <span class="m">happy(ann)</span> is a claim, <span class="m">mother(ann)</span> is a person.'
  },
  '7.1|argument': {
    match: [],
    steps: [
      'An argument is one slot inside the brackets of a predicate (or function).',
      'In <span class="m">knows(x,y)</span> the first argument is x and the second is y.',
      'Order matters: the first slot and the second slot play different roles.'
    ],
    ex: [
      '<span class="m">knows(x,y)</span> has two arguments: x and y.',
      '<span class="m">happy(ann)</span> has one argument: ann.',
      '<span class="m">knows(jack,jill)</span> and <span class="m">knows(jill,jack)</span> have the same arguments in a different order, so they say different things.'
    ],
    mix: 'Here "argument" means a slot in brackets. It is not the everyday meaning (a quarrel) and not a proof (a chain of reasoning).'
  },
  '7.1|object constant': {
    match: ['object constants'],
    steps: [
      'An object constant is a fixed name for one specific thing.',
      'Each time you use the name, it points at the same thing.',
      'It is written as a plain word or number, with no brackets.'
    ],
    ex: [
      '<span class="m">jack</span> and <span class="m">jill</span> name two people.',
      '<span class="m">0</span> names the number zero.',
      'Not an object constant: <span class="m">x</span>. A variable stands for any thing, not one fixed thing.',
      'Not an object constant: <span class="m">mother(ann)</span>. It has brackets, so it is built from a function.'
    ],
    mix: 'Constant vs variable: a constant is one fixed thing (jack). A variable is a blank that can be filled by any thing (x).'
  },
  '7.1|variable': {
    match: ['variables'],
    steps: [
      'A variable is a blank space that stands for some thing we have not named.',
      'It is written as a letter such as x, y or z.',
      'A quantifier (∀ or ∃) says how the blank is to be filled: by every thing, or by at least one.'
    ],
    ex: [
      'In <span class="m">∀x. happy(x)</span>, x stands for any person.',
      'In <span class="m">knows(x,y)</span>, x and y are two blanks.',
      'Not a variable: <span class="m">jack</span>. It is a constant, one fixed thing.'
    ],
    mix: 'Variable vs constant: x can be replaced by many things, jack cannot. Variables are not part of the signature.'
  },
  '7.1|for all': {
    match: ['∀', 'universal quantifier'],
    steps: [
      '∀ is read "for all". It is followed by a variable and then a sentence.',
      '<span class="m">∀x. S</span> says that S is true whatever thing x stands for.',
      'In this course you can read it as a long "and": S for the first name, and S for the second name, and so on.'
    ],
    ex: [
      '<span class="m">∀x. happy(x)</span>: everybody is happy.',
      '<span class="m">∀x. ∀y. (knows(x,y) → knows(y,x))</span>: whenever one person knows another, the second knows the first.',
      'With names ann and bob only, <span class="m">∀x. happy(x)</span> means <span class="m">happy(ann) ∧ happy(bob)</span>.',
      'It fails if one thing breaks it: if bob is not happy, <span class="m">∀x. happy(x)</span> is false.'
    ],
    mix: '∀ vs ∃: ∀ needs every thing to work, so one counter-example kills it. ∃ needs just one thing to work.'
  },
  '7.1|there is at least one': {
    match: ['∃', 'existential quantifier'],
    steps: [
      '∃ is read "there is at least one". It is followed by a variable and then a sentence.',
      '<span class="m">∃x. S</span> says that S is true for some thing x, maybe more than one.',
      'In this course you can read it as a long "or": S for the first name, or S for the second name, and so on.'
    ],
    ex: [
      '<span class="m">∃x. happy(x)</span>: somebody is happy.',
      'With names ann and bob only, it means <span class="m">happy(ann) ∨ happy(bob)</span>.',
      '<span class="m">∃y. loves(ann,y)</span>: Ann loves someone.',
      'It fails only if nobody works: if neither Ann nor Bob is happy, <span class="m">∃x. happy(x)</span> is false.'
    ],
    mix: '"At least one" includes "all". If everybody is happy, then <span class="m">∃x. happy(x)</span> is also true.'
  },
  '7.1|connectives': {
    match: [],
    steps: [
      'Connectives glue sentences into bigger sentences. They are the same ones as in module 5.',
      '¬ is "not", ∧ is "and", ∨ is "or", → is "if-then", ↔ is "if and only if".',
      'They work the same way here, but now the sentences they join can contain variables and quantifiers.'
    ],
    ex: [
      '<span class="m">happy(ann) ∧ happy(bob)</span>: both are happy.',
      '<span class="m">knows(x,y) → knows(y,x)</span>: if x knows y then y knows x.',
      '<span class="m">¬happy(ann)</span>: Ann is not happy.'
    ],
    mix: 'Connectives join sentences. Quantifiers (∀, ∃) bind a variable. Do not mix them up: ∧ needs two sentences, ∀ needs a variable and one sentence.'
  },
  '7.1|strictly inside': {
    match: ['⊊'],
    steps: [
      'A ⊊ B says that every member of A is also in B.',
      'The "strictly" part says B has at least one member that A does not have.',
      'The lesson uses it to say a language is more expressive: it can write every sentence the smaller one can, and more.'
    ],
    ex: [
      '<span class="m">{1,2} ⊊ {1,2,3}</span>: true. 3 is the extra member.',
      '<span class="m">{1,2,3} ⊊ {1,2,3}</span>: false. Nothing is left over.',
      'Propositional sentences ⊊ predicate logic sentences: every propositional sentence is a predicate logic sentence, but not the other way round.'
    ],
    mix: '⊊ vs ⊆: ⊆ allows the two sets to be equal. ⊊ does not.'
  },
  '7.1|expressive': {
    match: ['expressiveness', 'more expressive'],
    nolink: true,
    steps: [
      'A language is more expressive when it can say things the other language cannot.',
      'Formally, L₁ is more expressive than L₂ if the sentences of L₂ are strictly inside those of L₁.',
      'Predicate logic is more expressive than propositional logic because it can state a general rule once.'
    ],
    ex: [
      'Propositional logic needs one sentence per pair of people. Predicate logic: <span class="m">∀x. ∀y. (knows(x,y) → knows(y,x))</span> says it once.',
      'Predicate logic can say "everybody has a mother". Propositional logic has no way to say "everybody".',
      'Not more expressive: a language that writes exactly the same sentences as another.'
    ],
    mix: 'Expressive here is about which sentences you can write. It has nothing to do with feelings or style.'
  },
  '7.2|signature': {
    match: ['signatures', 'Σ'],
    steps: [
      'A signature is the list of symbols you are allowed to use.',
      'It holds object constants, function constants and predicates, each function and predicate with its arity.',
      'Variables are not in the signature. You may always use them.',
      'Everything you write must be built only from the signature and variables.'
    ],
    ex: [
      '<span class="m">Σ = {a, b, f/1, g/2, p/1, q/2}</span>: objects a, b; one-place function f; two-place function g; one-place predicate p; two-place predicate q.',
      '<span class="m">Σ = {0, s/1, plus/3}</span>: object 0, function s, three-place predicate plus.',
      '<span class="m">Σ = {p/0, q/0}</span>: two plain true/false atoms. This is propositional logic.',
      'With the first Σ, <span class="m">r(a)</span> is not allowed: r is not in the signature.'
    ],
    mix: 'In module 5 Σ is the set of atoms, in module 6 it also means a sum. In module 7 it is the symbol list with arities.'
  },
  '7.2|arity': {
    match: [],
    steps: [
      'Arity is a number: how many arguments a symbol takes.',
      'Each function and predicate has one fixed arity.',
      'Using it with the wrong number of arguments gives something that is not a sentence or term.'
    ],
    ex: [
      '<span class="m">mother/1</span> has arity 1: <span class="m">mother(ann)</span>.',
      '<span class="m">q/2</span> has arity 2: <span class="m">q(a,b)</span>.',
      '<span class="m">p/0</span> has arity 0: just <span class="m">p</span>.',
      'Wrong: <span class="m">q(a)</span> when q has arity 2.'
    ]
  },
  '7.2|name/number': {
    match: [],
    steps: [
      'A slash joins a symbol name to its arity: <span class="m">f/1</span> reads "f with arity 1".',
      'The part after the slash is a number of arguments, not a division.',
      'You only write the slash when you list the signature. In sentences you write <span class="m">f(a)</span>.'
    ],
    ex: [
      '<span class="m">g/2</span>: g takes two arguments, so <span class="m">g(a,b)</span> is fine.',
      '<span class="m">plus/3</span>: three arguments, <span class="m">plus(0,0,0)</span>.',
      '<span class="m">p/0</span>: no arguments, so just <span class="m">p</span>.'
    ],
    mix: 'f/1 is not a fraction and not a term. It is a label in the signature.'
  },
  '7.2|unary, binary, ternary': {
    match: ['unary', 'binary', 'ternary'],
    steps: [
      'These words are names for arities 1, 2 and 3.',
      'Unary takes one argument, binary takes two, ternary takes three.',
      'They apply to both functions and predicates.'
    ],
    ex: [
      'Unary: <span class="m">mother/1</span> or <span class="m">happy/1</span>.',
      'Binary: <span class="m">knows/2</span> or <span class="m">g/2</span>.',
      'Ternary: <span class="m">plus/3</span>.'
    ],
    mix: 'Binary here means "two arguments". It has nothing to do with binary numbers.'
  },
  '7.2|function constant': {
    match: ['function constants', 'function symbol'],
    steps: [
      'A function constant is a symbol that takes objects and gives back another object.',
      'You write it like a predicate: name, brackets, arguments.',
      'The result is a thing, so it can be used as an argument of another symbol.'
    ],
    ex: [
      '<span class="m">mother(ann)</span>: names Ann\'s mother, a person.',
      '<span class="m">mother(mother(ann))</span>: Ann\'s grandmother. The result feeds the function again.',
      '<span class="m">s(0)</span>: with s/1, the number after 0.',
      'Not a function: <span class="m">happy(ann)</span>, it is true or false, so happy is a predicate.'
    ],
    mix: 'Function vs predicate: a function builds a name for a thing, a predicate builds a claim. <span class="m">happy(mother(ann))</span> is fine, <span class="m">mother(happy(ann))</span> is not.'
  },
  '7.2|relation constant (predicate)': {
    match: ['relation constant', 'relation constants', 'relational sentence'],
    steps: [
      'A relation constant is another name for a predicate.',
      'It takes objects (terms) and gives a claim, which is true or false.',
      'Each relation constant has an arity, written in the signature, such as <span class="m">parent/2</span>.'
    ],
    ex: [
      '<span class="m">parent(ann,bob)</span>: a claim, true or false.',
      '<span class="m">p(a)</span> with <span class="m">p/1</span>.',
      '<span class="m">rain</span> with <span class="m">rain/0</span>: a claim with no arguments.',
      'Not allowed: <span class="m">p(p(a))</span>. The inner p(a) is a claim, and predicates take terms only.'
    ],
    mix: 'Relation constant = predicate. It is not the same as an object constant, which is a name for a thing.'
  },
  '7.2|term': {
    match: ['terms'],
    steps: [
      'A term is any expression that names an object (a thing).',
      'There are three kinds: an object constant, a variable, or a function applied to terms.',
      'Predicates take terms as arguments. A term is never true or false.'
    ],
    ex: [
      '<span class="m">ann</span>: an object constant, so a term.',
      '<span class="m">x</span>: a variable, so a term.',
      '<span class="m">mother(ann)</span> and <span class="m">mother(mother(x))</span>: functions on terms, so terms.',
      'Not a term: <span class="m">happy(ann)</span>. It is a sentence (true or false).'
    ],
    mix: 'Term vs sentence: terms name things and go inside predicates. Sentences are true or false and go with connectives.'
  },
  '7.2|atomic sentence': {
    match: ['atomic sentences', 'p(t₁,…,tₙ)'],
    steps: [
      'An atomic sentence is a predicate applied to the right number of terms.',
      'It has no connective and no quantifier in it.',
      'It is the smallest sentence that is true or false. It is also called a relational sentence.'
    ],
    ex: [
      '<span class="m">parent(ann,bob)</span>: atomic.',
      '<span class="m">q(x,f(a))</span>: atomic, the terms may contain variables.',
      '<span class="m">rain</span>: atomic, a predicate with no arguments.',
      'Not atomic: <span class="m">p(a) ∧ p(b)</span> or <span class="m">¬p(a)</span> or <span class="m">∀x. p(x)</span>.'
    ],
    mix: 'Atomic sentence vs term: <span class="m">p(a)</span> is true or false, <span class="m">f(a)</span> names a thing.'
  },
  '7.2|0-ary predicate': {
    match: ['0-ary', 'p/0'],
    steps: [
      'A 0-ary predicate takes no arguments, so it is written without brackets.',
      'It is just a plain true/false statement, like an atom in module 5.',
      'A signature with only 0-ary predicates gives propositional logic.'
    ],
    ex: [
      '<span class="m">rain</span> with <span class="m">rain/0</span>.',
      '<span class="m">Σ = {p/0, q/0}</span>: then <span class="m">p ∧ ¬q</span> is a sentence.',
      'Not 0-ary: <span class="m">p(a)</span>. It has one argument.'
    ],
    mix: 'A 0-ary predicate is not an object constant: <span class="m">rain</span> is a claim, but <span class="m">jack</span> is a thing.'
  },
  '7.3|expression': {
    match: ['expressions'],
    nolink: true,
    steps: [
      'An expression is a term or a sentence.',
      'The word lets us make rules that cover both, such as "ground" and "unify".'
    ],
    ex: [
      '<span class="m">mother(x)</span>: an expression (a term).',
      '<span class="m">p(x) ∧ q(x)</span>: an expression (a sentence).',
      '<span class="m">p(a,y)</span>: an expression, and unification works on pairs of these.'
    ],
    mix: 'Expression is the umbrella word. A term is one kind, a sentence is the other kind.'
  },
  '7.3|ground': {
    match: ['ground sentence'],
    steps: [
      'An expression is ground if it has no variables in it.',
      'You can check by looking: any letter like x, y, z means it is not ground.',
      'Ground expressions talk about particular things only.'
    ],
    ex: [
      '<span class="m">p(a)</span>: ground.',
      '<span class="m">q(a,f(b))</span>: ground.',
      '<span class="m">p(x)</span>: not ground, it has x.',
      '<span class="m">∀x. p(a)</span>: the lesson counts this as not ground, because the variable x still appears.'
    ],
    mix: 'Ground does not mean true. <span class="m">p(a)</span> is ground and may still be false.'
  },
  '7.3|scope': {
    match: [],
    steps: [
      'Each quantifier controls a part of the sentence. That part is its scope.',
      'In <span class="m">∀x. S</span> or <span class="m">∃x. S</span>, the scope is S.',
      'A quantifier reaches as far right as it can, up to a closing bracket.'
    ],
    ex: [
      'In <span class="m">∀x. ∃y. q(x,y)</span> the scope of ∃y is <span class="m">q(x,y)</span>.',
      'In the same sentence the scope of ∀x is <span class="m">∃y. q(x,y)</span>.',
      'In <span class="m">∀x. p(x) ∧ r(x)</span> the scope of ∀x is the whole <span class="m">p(x) ∧ r(x)</span>, since it reaches as far as it can.'
    ],
    mix: 'Scope is the part of the sentence the quantifier covers, not the set of things x ranges over.'
  },
  '7.3|bound': {
    match: [],
    steps: [
      'Look at one occurrence of a variable and the quantifiers around it.',
      'It is bound if some quantifier of that variable covers it.',
      'If two quantifiers of the same variable cover it, the innermost one wins.'
    ],
    ex: [
      'In <span class="m">∀x. p(x)</span>, x is bound by ∀x.',
      'In <span class="m">∀x. (p(x) ∧ ∃x. q(x,y))</span>, the first x is bound by ∀x and the second x is bound by ∃x.',
      'In <span class="m">∃x. q(x,y)</span>, x is bound but y is not.'
    ],
    mix: 'Bound vs free: bound means a quantifier covers it, free means none does.'
  },
  '7.3|free': {
    match: [],
    steps: [
      'Look at one occurrence of a variable.',
      'It is free if no quantifier for that variable covers it.',
      'In this course a free variable is read as if it had a ∀ in front.'
    ],
    ex: [
      'In <span class="m">∃x. q(x,y)</span>, y is free.',
      'In <span class="m">p(x)</span>, x is free, so it means <span class="m">∀x. p(x)</span>.',
      'In <span class="m">∀x. p(x)</span>, nothing is free.'
    ],
    mix: 'Free vs bound: free variables are unprotected. Add a ∀ in front to close the sentence.'
  },
  '7.3|closed / open': {
    match: ['closed', 'open sentence'],
    nolink: true,
    steps: [
      'A sentence is closed if no variable in it is free.',
      'It is open if at least one variable is free.',
      'To close an open sentence, put a ∀ for each free variable in front.'
    ],
    ex: [
      '<span class="m">∀x. p(x)</span>: closed.',
      '<span class="m">∃x. q(x,y)</span>: open, since y is free.',
      '<span class="m">p(a)</span>: closed. A ground sentence has no variables at all.',
      'Closing <span class="m">∃x. q(x,y)</span> gives <span class="m">∀y. ∃x. q(x,y)</span>.'
    ],
    mix: 'Closed is not the same as ground. <span class="m">∀x. p(x)</span> is closed but not ground.'
  },
  '7.4|Herbrand semantics': {
    match: ['Herbrand'],
    steps: [
      'Semantics says when a sentence is true. Herbrand semantics does this using only names from the signature.',
      'The things are the names themselves. There is no outside world of objects.',
      'We list every ground atom, then say true or false for each one. A sentence gets its truth from that list.'
    ],
    ex: [
      'Σ = {ann, bob, happy/1}: the things are ann and bob. A world says whether <span class="m">happy(ann)</span> and <span class="m">happy(bob)</span> are true.',
      'Σ = {0, s/1, plus/3}: the things are 0, s(0), s(s(0)) and so on.',
      'Not Herbrand style: asking "which real person does ann refer to?"'
    ],
    mix: 'In some textbooks a separate domain and interpretation give meaning. Here there is neither: names stand for themselves.'
  },
  '7.4|ground term': {
    match: ['ground terms'],
    steps: [
      'A ground term is a term with no variables.',
      'It is built from object constants and functions only.',
      'It names one definite thing.'
    ],
    ex: [
      '<span class="m">ann</span> and <span class="m">mother(ann)</span>: ground terms.',
      '<span class="m">s(s(0))</span>: a ground term.',
      'Not ground: <span class="m">mother(x)</span>.',
      'Not a term at all: <span class="m">happy(ann)</span>, a sentence.'
    ]
  },
  '7.4|Herbrand universe': {
    match: ['HU'],
    steps: [
      'The Herbrand universe HU is the set of all ground terms.',
      'It is every thing we can name using the signature.',
      'With only object constants it is finite. With a function and a constant it is infinite.'
    ],
    ex: [
      'Σ = {ann, bob}: <span class="m">HU = {ann, bob}</span>.',
      'Σ = {0, 1, 2, 3, even/1, odd/1}: <span class="m">HU = {0,1,2,3}</span>.',
      'Σ = {0, s/1, plus/3}: <span class="m">HU = {0, s(0), s(s(0)), …}</span>, infinite.',
      'Predicates add nothing to HU: only constants and functions name things.'
    ],
    mix: 'HU is made of things (terms). HB is made of claims (atoms).'
  },
  '7.4|ground atom': {
    match: ['ground atoms'],
    steps: [
      'A ground atom is a predicate applied to ground terms only.',
      'It is a claim, so it is true or false, with no variables left.',
      'The set of all of them is the Herbrand base.'
    ],
    ex: [
      '<span class="m">happy(ann)</span>: a ground atom.',
      '<span class="m">likes(ann,mother(bob))</span>: a ground atom.',
      'Not ground: <span class="m">happy(x)</span>.',
      'Not an atom: <span class="m">happy(ann) ∧ happy(bob)</span>. It has a connective.'
    ],
    mix: 'Ground atom vs ground term: an atom is true or false, a term names a thing.'
  },
  '7.4|Herbrand base': {
    match: ['HB'],
    steps: [
      'The Herbrand base HB is the set of all ground atoms.',
      'Make it by putting every ground term of HU into every predicate.',
      'It is the list of all basic claims that a world must decide.'
    ],
    ex: [
      'Σ = {ann, bob, happy/1, tall/1}: <span class="m">HB = {happy(ann), happy(bob), tall(ann), tall(bob)}</span>. That is 4 atoms.',
      'Σ = {0, 1, 2, 3, even/1, odd/1}: 4 + 4 = 8 atoms.',
      'Σ = {0, s/1, plus/3}: HB is infinite: <span class="m">plus(0,0,0)</span>, <span class="m">plus(0,s(0),0)</span>, …'
    ],
    mix: 'HB holds atoms (claims). HU holds terms (things). Count them separately.'
  },
  '7.4|truth assignment': {
    match: ['truth assignments'],
    steps: [
      'A truth assignment picks true (1) or false (0) for every ground atom in HB.',
      'It is written i. It is one complete way the world could be.',
      'Every atom must get exactly one value.'
    ],
    ex: [
      'HB = {happy(ann), happy(bob)}: <span class="m">i</span> with ann happy and bob not is a truth assignment: 1 for the first atom, 0 for the second.',
      'Another assignment: both 0.',
      'Not an assignment: a choice that leaves <span class="m">happy(bob)</span> without a value.'
    ],
    mix: 'In module 5 an assignment covered atoms. Here the atoms are the ground atoms of the Herbrand base.'
  },
  '7.4|set of all assignments': {
    match: [],
    nolink: true,
    steps: [
      'I is the set of all truth assignments.',
      'Each member of I is one possible world.',
      'If HB has n atoms, each atom can be 0 or 1, so I has 2ⁿ members.'
    ],
    ex: [
      '4 atoms: 2 × 2 × 2 × 2 = 16 assignments.',
      'Σ = {0, 1, 2, 3, even/1, odd/1}: 8 atoms, so 2⁸ = 256 assignments.',
      '1 atom: just 2 assignments, 0 and 1.'
    ],
    mix: 'I is a set of worlds. Do not confuse it with a single assignment i.'
  },
  '7.4|number of elements': {
    match: ['|I|', '|HB|'],
    nolink: true,
    steps: [
      'Bars around a set mean "count its members".',
      '|S| is a number: how many things are in S.'
    ],
    ex: [
      '<span class="m">|{a,b,c}| = 3</span>.',
      '<span class="m">|HB| = 8</span> for the even/odd example, so <span class="m">|I| = 2⁸ = 256</span>.',
      '<span class="m">|{}| = 0</span>.'
    ],
    mix: 'These bars are not absolute value. Around a set they mean its size.'
  },
  '7.4|map': {
    match: ['HB → {0,1}'],
    nolink: true,
    steps: [
      'A map is a rule that gives each input exactly one output.',
      '<span class="m">HB → {0,1}</span> reads: each ground atom gets one value, 0 or 1.',
      'A truth assignment is exactly such a map.'
    ],
    ex: [
      '<span class="m">happy(ann) ↦ 1</span>, <span class="m">happy(bob) ↦ 0</span>.',
      'A map that gives <span class="m">happy(ann)</span> both 0 and 1 is not allowed.',
      'A map that skips an atom is not allowed either.'
    ],
    mix: 'The arrow → inside HB → {0,1} says "from this set to that set". It is not the if-then connective.'
  },
  '7.5|instance': {
    match: ['instances', 'S[x←t]'],
    steps: [
      'Take a sentence S and a variable x.',
      'Write S[x←t] for S with every x replaced by the ground term t.',
      'To check a quantified sentence we look at its instances, one for each ground term.'
    ],
    ex: [
      '<span class="m">p(x)[x←a]</span> is <span class="m">p(a)</span>.',
      '<span class="m">(p(x) → q(x,x))[x←b]</span> is <span class="m">p(b) → q(b,b)</span>.',
      'The instances of <span class="m">∀x. p(x)</span> with names a, b are <span class="m">p(a)</span> and <span class="m">p(b)</span>.',
      'Replace every x, not just one: <span class="m">q(x,x)[x←a]</span> is <span class="m">q(a,a)</span>.'
    ],
    mix: 'Instance here replaces one variable by a ground term. Later (lesson 7.9) a substitution may replace variables by terms that still contain variables.'
  },
  '7.5|evaluate': {
    match: ['Sⁱ'],
    nolink: true,
    steps: [
      'To evaluate a sentence S under an assignment i, work out whether S is true (1) or false (0) in that world.',
      'Write the answer Sⁱ.',
      'Ground atoms are looked up in i. Connectives are computed as in module 5. Quantifiers are replaced by their instances.'
    ],
    ex: [
      'i: p(a)=1, p(b)=0. Then <span class="m">(p(a) ∧ p(b))ⁱ = 0</span>.',
      'Same i: <span class="m">(p(a) ∨ p(b))ⁱ = 1</span>.',
      'Same i: <span class="m">(∀x. p(x))ⁱ = 0</span>, since the instance p(b) is 0.',
      'Same i: <span class="m">(∃x. p(x))ⁱ = 1</span>, since p(a) is 1.'
    ],
    mix: 'Sⁱ here is a truth value, not "S to the power i".'
  },
  '7.5|conjunction': {
    match: ['conjunctions', '∧'],
    steps: [
      'A conjunction is an "and" of sentences.',
      'It is true only when every part is true.',
      '∀x.S acts like a conjunction over all the instances of S.'
    ],
    ex: [
      '<span class="m">p(a) ∧ p(b)</span>: true only if both are true.',
      'Names a, b: <span class="m">∀x. p(x)</span> is the same as <span class="m">p(a) ∧ p(b)</span>.',
      'If p(a)=1 and p(b)=0 the conjunction is false.'
    ],
    mix: 'Conjunction (and) vs disjunction (or): and needs all parts true, or needs at least one.'
  },
  '7.5|disjunction': {
    match: ['disjunctions', '∨'],
    steps: [
      'A disjunction is an "or" of sentences.',
      'It is true when at least one part is true.',
      '∃x.S acts like a disjunction over all the instances of S.'
    ],
    ex: [
      '<span class="m">p(a) ∨ p(b)</span>: true if either one is true, or both.',
      'Names a, b: <span class="m">∃x. p(x)</span> is the same as <span class="m">p(a) ∨ p(b)</span>.',
      'If p(a)=0 and p(b)=0 the disjunction is false.'
    ],
    mix: 'In logic "or" is not exclusive: both true still makes it true.'
  },
  '7.5|if and only if': {
    match: ['iff', '↔'],
    steps: [
      '"A iff B" means A and B are true in exactly the same cases.',
      'So if A holds then B holds, and if B holds then A holds.',
      'The lesson also uses it in definitions, such as "S is true iff its instances are true".'
    ],
    ex: [
      '"x is even iff x/2 is whole": both sides hold for 4, both fail for 5.',
      '<span class="m">p ↔ q</span> is true when p and q have the same value, 1,1 or 0,0.',
      'Not iff: "x is even if x is 4". 6 is even but not 4, so the two sides differ.'
    ],
    mix: 'If-then goes one way only. Iff goes both ways.'
  },
  '7.5|implication true by falsity': {
    match: ['true by falsity'],
    steps: [
      'A → B is false in only one case: A is true and B is false.',
      'So if A is false, A → B is true, whatever B is.',
      'It says nothing happens in the "if" case, so nothing can go wrong.'
    ],
    ex: [
      '"If pigs fly, I win the lottery" is true, because pigs do not fly.',
      'With p(b)=0 the instance <span class="m">p(b) → q(b,b)</span> is true even if q(b,b)=0.',
      'Not true: <span class="m">p(a) → q(a,a)</span> with p(a)=1 and q(a,a)=0.'
    ],
    mix: 'This is why ∀x.(p(x) → q(x)) does not claim anything exists. It only checks the cases where p holds.'
  },
  '7.6|model set': {
    match: ['M(φ)'],
    steps: [
      'M(φ) is the set of all assignments in I that make φ true.',
      'Think of it as all the worlds where φ holds.',
      'For a set of sentences Δ, M(Δ) holds the worlds where every sentence of Δ is true.'
    ],
    ex: [
      'HB = {p(a), p(b)}: <span class="m">M(p(a))</span> = the 2 assignments with p(a)=1.',
      '<span class="m">M(p(a) ∧ p(b))</span> = just the assignment with both 1.',
      '<span class="m">M(p(a) ∧ ¬p(a))</span> is the empty set: no world works.',
      '<span class="m">M(p(a) ∨ ¬p(a))</span> is all of I.'
    ],
    mix: 'M(φ) is a set of worlds, not a truth value.'
  },
  '7.6|subset': {
    match: ['⊆'],
    steps: [
      'A ⊆ B says every member of A is also a member of B.',
      'The two sets may be equal.',
      'Entailment is defined with it: <span class="m">M(Δ) ⊆ M(φ)</span>.'
    ],
    ex: [
      '<span class="m">{1,2} ⊆ {1,2,3}</span>: true.',
      '<span class="m">{1,2,3} ⊆ {1,2,3}</span>: true, equal sets count.',
      '<span class="m">{1,4} ⊆ {1,2,3}</span>: false, 4 is not in the right set.',
      'The empty set is a subset of every set.'
    ],
    mix: '⊆ allows equality, ⊊ does not.'
  },
  '7.6|premises': {
    match: ['premise', 'Δ'],
    steps: [
      'Premises are the sentences we assume to be true.',
      'We collect them in a set, usually called Δ.',
      'The question is then what else must be true if all of Δ is.'
    ],
    ex: [
      '<span class="m">Δ = {p(a)}</span>: one premise.',
      '<span class="m">Δ = {p(a), ∀x. (p(x) → q(x))}</span>: two premises, and q(a) follows.',
      '<span class="m">Δ = {}</span>: no premises. Only valid sentences follow.'
    ],
    mix: 'A premise is assumed, not proven. Δ is a set of sentences, not a single sentence.'
  },
  '7.6|entails': {
    match: ['entail', 'entailment', 'entailed', '⊨'],
    steps: [
      'Δ ⊨ φ reads "Δ entails φ".',
      'It means every world that makes all of Δ true also makes φ true.',
      'In symbols: <span class="m">M(Δ) ⊆ M(φ)</span>.',
      'To refute it, find one world where Δ holds but φ fails.'
    ],
    ex: [
      '<span class="m">{p(a)} ⊨ p(a) ∨ p(b)</span>: yes, p(a) true makes the or true.',
      '<span class="m">{p(a), p(b)} ⊨ p(a) ∧ p(b)</span>: yes.',
      '<span class="m">{p(a)} ⊭ p(a) ∧ p(b)</span>: no, a world with p(a)=1, p(b)=0 is a counter-model.',
      '<span class="m">{∃y. ∀x. q(x,y)} ⊨ ∀x. ∃y. q(x,y)</span>: yes. The converse fails.'
    ],
    mix: 'Entails (⊨) is about all worlds, not one. → is a connective inside a sentence, ⊨ is a claim about a set of sentences.'
  },
  '7.6|exactly when': {
    match: ['⟺'],
    nolink: true,
    steps: [
      'A ⟺ B says A and B hold in exactly the same cases.',
      'It is used in definitions: Δ ⊨ φ ⟺ M(Δ) ⊆ M(φ).',
      'You can read it as "if and only if".'
    ],
    ex: [
      '<span class="m">(¬φ)ⁱ = 1 ⟺ φⁱ = 0</span>: ¬φ is true exactly when φ is false.',
      '<span class="m">Δ ⊨ φ ⟺ M(Δ) ⊆ M(φ)</span>: the definition of entailment.',
      'Not exactly when: "if it rains the street is wet". The street can be wet for other reasons.'
    ],
    mix: 'Exactly when is a two-way link. A plain "if" is one way only.'
  },
  '7.6|counter-model': {
    match: ['counter-models', 'counter-example', 'counterexample'],
    steps: [
      'A counter-model is one world where all premises are true and the conclusion is false.',
      'One counter-model is enough to show Δ does not entail φ.',
      'If no counter-model exists, Δ ⊨ φ.'
    ],
    ex: [
      '<span class="m">{p(a)}</span> and <span class="m">p(a) ∧ p(b)</span>: the world p(a)=1, p(b)=0 is a counter-model, so no entailment.',
      '<span class="m">{p(a)}</span> and <span class="m">p(a) ∨ p(b)</span>: no counter-model exists, so entailment holds.',
      'A world where the premises fail is no counter-model, even if the conclusion fails too.'
    ],
    mix: 'A counter-model needs premises true and conclusion false, both.'
  },
  '7.6|categorical form': {
    match: ['categorical', 'categorical forms'],
    steps: [
      'Categorical forms are four everyday sentence patterns: all, some, no, some are not.',
      'Each has a fixed translation into predicate logic.',
      'All uses →. Some uses ∧.'
    ],
    ex: [
      'All S are P: <span class="m">∀x. (S(x) → P(x))</span>. All cats are animals.',
      'Some S are P: <span class="m">∃x. (S(x) ∧ P(x))</span>.',
      'No S are P: <span class="m">∀x. (S(x) → ¬P(x))</span>.',
      'Some S are not P: <span class="m">∃x. (S(x) ∧ ¬P(x))</span>.'
    ],
    mix: 'The classic error: ∀ with ∧ ("everything is a cat and an animal") or ∃ with → (true if anything is not a cat). Use ∀ with → and ∃ with ∧.'
  },
  '7.7|Finite Herbrand Logic': {
    match: ['FHL'],
    steps: [
      'Finite Herbrand Logic is predicate logic with finitely many object constants and no function constants.',
      'Then the Herbrand universe is just the constants, so it is finite.',
      'Every quantifier can be replaced by an "and" or an "or" over those constants.',
      'So FHL is no stronger than propositional logic.'
    ],
    ex: [
      'FHL: <span class="m">Σ = {a, b, p/1}</span>. HU = {a, b}.',
      'FHL: <span class="m">Σ = {ann, bob, parent/2}</span>.',
      'Not FHL: <span class="m">Σ = {0, s/1, plus/3}</span>. The function s makes HU infinite.'
    ],
    mix: 'Full predicate logic is strictly more expressive than propositional logic. Only the finite fragment matches it.'
  },
  '7.7|prenex form': {
    match: ['prenex'],
    steps: [
      'A sentence is in prenex form when all quantifiers stand at the very front.',
      'After them comes a part with no quantifier at all.',
      'It must also be closed: nothing free.',
      'To get there: rename clashing variables, pull quantifiers out over the connectives, add ∀ for free variables.'
    ],
    ex: [
      '<span class="m">∀x. ∃y. ∀z. (p(x,y) ∨ q(z))</span>: prenex.',
      '<span class="m">∀x. ∃y. p(x,y) ∨ ∃y. q(y)</span>: not prenex, a quantifier sits behind ∨.',
      '<span class="m">∀x. (p(x,y) ∨ q(x))</span>: not prenex, y is free.',
      '<span class="m">∀y. p(x,y) ∨ ∃y. q(y)</span> becomes <span class="m">∀x. ∀y. ∃z. (p(x,y) ∨ q(z))</span>, after renaming the second y to z.'
    ],
    mix: 'Prenex form is not clausal form: prenex keeps ∃ and ∀, clausal form removes them.'
  },
  '7.7|grounding': {
    match: ['ground out'],
    steps: [
      'Grounding removes quantifiers by writing out their instances.',
      '∀x.φ becomes the "and" of all instances of φ, one for each constant.',
      '∃x.φ becomes the "or" of the instances.',
      'This needs a finite set of constants, as in FHL.'
    ],
    ex: [
      'Names a, b: <span class="m">∀x. p(x)</span> becomes <span class="m">p(a) ∧ p(b)</span>.',
      'Names a, b: <span class="m">∃x. q(x)</span> becomes <span class="m">q(a) ∨ q(b)</span>.',
      'In the lesson, <span class="m">∀x. (p(x) → q(x))</span> gives <span class="m">p(a) → q(a)</span> and <span class="m">p(b) → q(b)</span>.',
      'Cannot ground: with <span class="m">s/1</span> the constants are infinite.'
    ],
    mix: 'Grounding is not substituting for one variable only. It handles every quantifier, one at a time, until none is left.'
  },
  '7.7|Γ (gamma)': {
    match: ['Γ'],
    steps: [
      'Grounding uses two lists. Δ holds sentences still to process.',
      'Γ holds sentences already ground and finished.',
      'Take a sentence from Δ. If ground, move it to Γ. If quantified, replace it by its instances.',
      'When Δ is empty, Γ is the answer.'
    ],
    ex: [
      '<span class="m">p(a)</span> is already ground, so it goes straight into Γ.',
      '<span class="m">∀x. (p(x) → q(x))</span> is replaced in Δ by <span class="m">p(a) → q(a)</span> and <span class="m">p(b) → q(b)</span>, which then go into Γ.',
      'Lesson end result: <span class="m">Γ = {p(a), p(a) → q(a), p(b) → q(b), q(a) ∨ q(b)}</span>.'
    ],
    mix: 'Γ is the done pile, Δ the to-do pile. In lesson 7.6 Δ meant the premises. Here it is the to-do list of grounding.'
  },
  '7.7|rewrite as letters': {
    match: ['↦'],
    steps: [
      'After grounding, every sentence is made of ground atoms.',
      'Give each ground atom its own plain letter. The arrow ↦ reads "maps to".',
      'Now the sentences are propositional and module 5 tools apply.'
    ],
    ex: [
      '<span class="m">p(a) ↦ p_a</span> and <span class="m">q(b) ↦ q_b</span>.',
      '<span class="m">p(a) → q(a)</span> becomes <span class="m">p_a → q_a</span>.',
      '<span class="m">q(a) ∨ q(b)</span> becomes <span class="m">q_a ∨ q_b</span>.',
      'Same atom, same letter: both <span class="m">p(a)</span> must become <span class="m">p_a</span>.'
    ],
    mix: '↦ is renaming, not the implication arrow →.'
  },
  '7.7|Prolog': {
    match: [],
    steps: [
      'Prolog is a programming language where you write logic rules and ask questions.',
      'The computer answers by searching for proofs.',
      'Its rules are special sentences of predicate logic.'
    ],
    ex: [
      '<span class="m">reachable(X,Z) :- edge(X,Z).</span>: a rule.',
      '<span class="m">?- reachable(a,X).</span>: a query.',
      'Prolog has no logical ¬, only negation as failure.'
    ],
    mix: 'Prolog writes variables with capital letters and is a restricted part of predicate logic.'
  },
  '7.7|rule and query': {
    match: [':-', 'query', 'queries'],
    steps: [
      'A rule <span class="m">H :- B1, B2.</span> says H holds if B1 and B2 hold.',
      'As a sentence it is <span class="m">∀ (B1 ∧ B2 → H)</span>, all its variables universal.',
      'A query asks whether something holds. Its variables are existential: it looks for a value.',
      'The head H is a single atom.'
    ],
    ex: [
      '<span class="m">reachable(X,Z) :- reachable(X,Y), reachable(Y,Z).</span> means <span class="m">∀X,Y,Z. (reachable(X,Y) ∧ reachable(Y,Z) → reachable(X,Z))</span>.',
      'Query <span class="m">reachable(a,X), p(X).</span> means <span class="m">∃X. (reachable(a,X) ∧ p(X))</span>.',
      'Not a Prolog rule: a head like <span class="m">p ∨ q</span>.'
    ],
    mix: 'In a rule, variables are universal. In a query they are existential. The same letter X means different things.'
  },
  '7.7|binding': {
    match: ['bindings'],
    steps: [
      'A binding is a value found for a variable.',
      'Prolog prints it as <span class="m">X = a</span>.',
      'It is the answer to a query: the thing that makes the query true.'
    ],
    ex: [
      'Query <span class="m">happy(X).</span> with fact <span class="m">happy(ann).</span> gives <span class="m">X = ann</span>.',
      'Query <span class="m">edge(a,Y).</span> may give <span class="m">Y = b</span>, then more bindings.',
      'No binding: if nothing makes the query true, Prolog says false.'
    ],
    mix: 'A binding is a result. A variable that is "bound" in logic (by a quantifier) is a different idea.'
  },
  '7.8|literal': {
    match: ['literals'],
    steps: [
      'A literal is an atom, or an atom with ¬ in front.',
      'Nothing more: no ∧, ∨, quantifier or double negation.',
      'Literals are the building blocks of clauses.'
    ],
    ex: [
      '<span class="m">p(a)</span>: a literal.',
      '<span class="m">¬p(a)</span>: a literal.',
      '<span class="m">p(x)</span>: a literal, variables allowed.',
      'Not literals: <span class="m">¬¬p(b)</span>, <span class="m">∃x. p(x)</span>, <span class="m">p(a) ∨ q(a)</span>.'
    ]
  },
  '7.8|clause': {
    match: ['clauses'],
    steps: [
      'A clause is a set of literals in curly brackets.',
      'Read the commas as "or": at least one literal must be true.',
      'Variables in a clause are implicitly universal.'
    ],
    ex: [
      '<span class="m">{¬p(x), q(x)}</span> means <span class="m">¬p(x) ∨ q(x)</span>.',
      '<span class="m">{p(a)}</span>: a clause with one literal.',
      '<span class="m">{}</span>: the empty clause, always false.',
      'The set has no repeats and no order: <span class="m">{p(a), q(a)}</span> is the same as <span class="m">{q(a), p(a)}</span>.'
    ],
    mix: 'Commas inside one clause mean "or". Separate clauses together mean "and".'
  },
  '7.8|clausal form': {
    match: [],
    steps: [
      'Clausal form is a list of clauses that must all be true at once.',
      'Each clause is an "or" of literals, so the whole list is an "and" of ors.',
      'Any sentence can be turned into one, with INSEADO.',
      'Resolution works only on clausal form.'
    ],
    ex: [
      '<span class="m">p(a) ∧ (¬q(a) ∨ r(a))</span> becomes <span class="m">{p(a)}</span> and <span class="m">{¬q(a), r(a)}</span>.',
      '<span class="m">∀x. (p(x) → q(x))</span> becomes <span class="m">{¬p(x), q(x)}</span>.',
      'Not clausal form: <span class="m">p(a) → q(a)</span>, it still has →.'
    ],
    mix: 'Clausal form is not logically equivalent to the original when ∃ is present. It is equisatisfiable.'
  },
  '7.8|INSEADO': {
    match: [],
    steps: [
      'INSEADO is the seven-step recipe for clausal form. Each letter starts a step.',
      'I: implications out. N: negations in. S: standardize variables.',
      'E: existentials out (Skolem). A: alls out. D: distribution. O: operators out.',
      'Do the steps in this order.'
    ],
    ex: [
      'I: <span class="m">p → q</span> becomes <span class="m">¬p ∨ q</span>.',
      'N: <span class="m">¬∀x. p(x)</span> becomes <span class="m">∃x. ¬p(x)</span>.',
      'E: <span class="m">∃y. g(y)</span> becomes <span class="m">g(greg)</span>.',
      'D: <span class="m">p ∨ (q ∧ r)</span> becomes <span class="m">(p ∨ q) ∧ (p ∨ r)</span>.',
      'O: <span class="m">(p ∨ q) ∧ r</span> becomes clauses <span class="m">{p, q}</span> and <span class="m">{r}</span>.'
    ],
    mix: 'Standardize (S) comes before Skolemizing (E) and dropping alls (A). Otherwise two quantifiers on x can capture each other.'
  },
  '7.8|De Morgan': {
    match: ['De Morgan\'s'],
    steps: [
      'De Morgan\'s laws push a ¬ inside a bracket.',
      'The connective flips: ∧ becomes ∨ and ∨ becomes ∧.',
      'Each part gets its own ¬.',
      'The quantifier version: ¬∀ becomes ∃¬, and ¬∃ becomes ∀¬.'
    ],
    ex: [
      '<span class="m">¬(A ∧ B)</span> becomes <span class="m">¬A ∨ ¬B</span>.',
      '<span class="m">¬(A ∨ B)</span> becomes <span class="m">¬A ∧ ¬B</span>.',
      '<span class="m">¬∀x. p(x)</span> becomes <span class="m">∃x. ¬p(x)</span>.',
      '<span class="m">¬∃x. p(x)</span> becomes <span class="m">∀x. ¬p(x)</span>.'
    ],
    mix: 'Common slip: writing <span class="m">¬(A ∧ B) = ¬A ∧ ¬B</span>. The connective must flip.'
  },
  '7.8|Skolem constant': {
    match: ['Skolem constants'],
    steps: [
      'An ∃ says something exists but does not name it.',
      'If no ∀ encloses that ∃, give the thing a brand-new constant name.',
      'Then drop the ∃ and use the name.',
      'The name must be new: not already in the signature.'
    ],
    ex: [
      '<span class="m">∃x. p(x)</span> becomes <span class="m">p(c)</span>, c new.',
      '<span class="m">∃y. (g(y) ∧ ∀z. (r(z) → f(y,z)))</span> becomes <span class="m">g(greg) ∧ ∀z. (r(z) → f(greg,z))</span>.',
      'Negated goal <span class="m">¬∀x.∀y. loves(x,y)</span> becomes <span class="m">¬loves(jack,jill)</span>, two Skolem constants.',
      'Not a constant case: <span class="m">∀x. ∃y. loves(x,y)</span>. A ∀ encloses ∃y, so you need a function.'
    ],
    mix: 'Skolem constant vs Skolem function: use a constant when no ∀ is around the ∃. Use a function of the enclosing ∀ variables when there is one.'
  },
  '7.8|Skolem function': {
    match: ['Skolem functions', 'Skolem term'],
    steps: [
      'Sometimes the thing promised by ∃ depends on a ∀ variable.',
      '"Everybody has a mother": each person has their own mother.',
      'So name the thing with a new function of the ∀ variables, like <span class="m">mother(x)</span>.',
      'The function must take every ∀ variable that encloses the ∃.'
    ],
    ex: [
      '<span class="m">∀x. ∃y. loves(x,y)</span> becomes <span class="m">∀x. loves(x,f(x))</span>.',
      '<span class="m">∀y. (¬g(y) ∨ ∃z. (r(z) ∧ ¬f(y,z)))</span> gives z the name <span class="m">h(y)</span>.',
      '<span class="m">∀x. ∀y. ∃z. q(x,y,z)</span> gives <span class="m">q(x,y,f(x,y))</span>: two enclosing ∀ variables, so f takes two arguments.',
      'Wrong: a constant for <span class="m">∀x. ∃y. loves(x,y)</span> says one person y is loved by all.'
    ],
    mix: 'Skolem function vs Skolem constant: a function is needed when the ∃ sits inside a ∀. A constant is a function with no arguments.'
  },
  '7.8|witness': {
    match: ['witnesses'],
    nolink: true,
    steps: [
      'A witness is a thing that makes an ∃ sentence true.',
      'A Skolem constant or function names an unknown witness.',
      'There may be several witnesses. Skolemizing picks a name for one of them.'
    ],
    ex: [
      'For <span class="m">∃x. happy(x)</span>, Ann is a witness if happy(ann) is true.',
      'For <span class="m">∀x. ∃y. loves(x,y)</span>, the witness depends on x, which is why <span class="m">f(x)</span> is used.',
      'If nothing makes the body true, the ∃ sentence has no witness and is false.'
    ],
    mix: 'Here witness is the thing, not a person who saw something.'
  },
  '7.8|equisatisfiable': {
    match: ['equisatisfiability'],
    steps: [
      'Two sets of sentences are equisatisfiable if one is satisfiable exactly when the other is.',
      'Satisfiable means some world makes all of them true.',
      'INSEADO gives a clause set equisatisfiable with the input.',
      'This is weaker than equivalent, because new Skolem symbols appear.'
    ],
    ex: [
      '<span class="m">∃x. p(x)</span> and <span class="m">p(c)</span>: both satisfiable, equisatisfiable.',
      'But they are not equivalent: <span class="m">p(c)</span> says one named thing, <span class="m">∃x. p(x)</span> does not.',
      'If the input is unsatisfiable, so are its clauses. This is what resolution relies on.'
    ],
    mix: 'Equisatisfiable is not equal in meaning. The two may be true in different worlds.'
  },
  '7.9|substitution': {
    match: ['substitutions', 'σ', 'τ', 'θ'],
    steps: [
      'A substitution is a list of replacements, one per variable.',
      'It is written in curly brackets with arrows: <span class="m">{x←a, y←f(b)}</span>.',
      'Each variable appears on the left at most once.',
      'Applying it swaps every listed variable at once.'
    ],
    ex: [
      '<span class="m">{x←a}</span>: replace x by a.',
      '<span class="m">{x←a, y←f(b), v←w}</span>: three replacements.',
      '<span class="m">p(x,y){x←a, y←b}</span> is <span class="m">p(a,b)</span>.',
      'The empty substitution <span class="m">{}</span> changes nothing.'
    ],
    mix: 'A substitution replaces variables by terms. It never replaces constants.'
  },
  '7.9|replacement': {
    match: ['replacements', 'x←t'],
    nolink: true,
    steps: [
      'One replacement <span class="m">x←t</span> says "x is replaced by t".',
      'The left side is a variable, the right side is any term.',
      'A substitution is a set of replacements.'
    ],
    ex: [
      '<span class="m">y←f(b)</span>: y becomes f(b).',
      '<span class="m">v←w</span>: variable v becomes variable w, which is allowed.',
      'Not allowed: <span class="m">a←b</span>. The left side must be a variable.'
    ],
    mix: 'The arrow ← points from the variable to its new term. In 7.5, S[x←t] used the same arrow.'
  },
  '7.9|apply': {
    match: ['φσ', 'application'],
    nolink: true,
    steps: [
      'To apply a substitution σ to an expression φ, replace each variable in φ by its listed term.',
      'All replacements happen at once, in one pass.',
      'The result is written φσ.'
    ],
    ex: [
      '<span class="m">p(x){x←a}</span> is <span class="m">p(a)</span>.',
      '<span class="m">p(x,x,y,z){x←a, y←f(b), v←w}</span> is <span class="m">p(a,a,f(b),z)</span>: z is not listed so it stays, v is not in the sentence.',
      '<span class="m">q(x,y){x←y, y←a}</span> is <span class="m">q(y,a)</span>: at once, so the new y is not replaced again.'
    ],
    mix: 'Everything swaps at once, not one after another. Otherwise the last example would give q(a,a).'
  },
  '7.9|composition': {
    match: ['στ', 'compose'],
    nolink: true,
    steps: [
      'στ is one substitution that does the same as applying σ and then τ.',
      'First apply τ to the right sides of σ.',
      'Then add the replacements of τ whose variable is not in σ.',
      'Finally delete anything of the form x←x.'
    ],
    ex: [
      '<span class="m">{x←a, y←f(u), z←v}{u←d, v←e, z←g}</span> = <span class="m">{x←a, y←f(d), z←e, u←d, v←e}</span>. The τ pair z←g is dropped because σ already has z.',
      '<span class="m">{x←a, y←v}{v←f(c)}</span> = <span class="m">{x←a, y←f(c), v←f(c)}</span>.',
      '<span class="m">{x←y}{y←x}</span> = <span class="m">{y←x}</span>: x←y becomes x←x and is deleted.'
    ],
    mix: 'Order matters: στ is usually not τσ.'
  },
  '7.9|unifier': {
    match: ['unifiers', 'unify', 'unifiable'],
    steps: [
      'Take two expressions that contain variables.',
      'A unifier is a substitution that makes them identical after applying it.',
      'If one exists, the expressions are unifiable.',
      'Several unifiers can exist for the same pair.'
    ],
    ex: [
      '<span class="m">p(x,b)</span> and <span class="m">p(a,y)</span>: <span class="m">{x←a, y←b}</span> makes both <span class="m">p(a,b)</span>.',
      '<span class="m">p(x,y)</span> and <span class="m">p(a,v)</span>: <span class="m">{x←a, y←b, v←b}</span> works, and so does <span class="m">{x←a, y←v}</span>.',
      'Not unifiable: <span class="m">p(x,x)</span> and <span class="m">p(a,b)</span>. x cannot be both a and b.',
      'Not unifiable: <span class="m">p(a)</span> and <span class="m">q(a)</span>. Different predicate.'
    ],
    mix: 'Unifier vs most general unifier: a unifier works, but may commit to more than needed. The mgu commits to the least.'
  },
  '7.9|most general unifier': {
    match: ['mgu', 'mgus'],
    steps: [
      'Many unifiers may exist. Some pick values that are not needed.',
      'The most general unifier (mgu) commits to as little as possible.',
      'Every other unifier is the mgu followed by a further substitution.',
      'The unification algorithm finds an mgu.'
    ],
    ex: [
      'For <span class="m">p(x,y)</span> and <span class="m">p(a,v)</span>: mgu is <span class="m">{x←a, y←v}</span>.',
      'The unifier <span class="m">{x←a, y←f(c), v←f(c)}</span> equals <span class="m">{x←a, y←v}{v←f(c)}</span>, so it is a special case.',
      'For <span class="m">p(x,x)</span> and <span class="m">p(a,y)</span>: mgu is <span class="m">{x←a, y←a}</span>.',
      'No mgu exists for <span class="m">p(x,x)</span> and <span class="m">p(a,b)</span>.'
    ],
    mix: 'Any unifier is enough to make the two sides equal, but resolution needs the mgu so the result is as general as possible.'
  },
  '7.9|compound term': {
    match: ['compound terms'],
    steps: [
      'A compound term is a function applied to arguments, with brackets.',
      'It names a thing built from other things.',
      'Compare with a constant or variable, which has no inner parts.'
    ],
    ex: [
      '<span class="m">f(b)</span>: compound.',
      '<span class="m">g(a,x)</span>: compound, with a variable inside.',
      '<span class="m">f(g(a,b))</span>: compound inside compound.',
      'Not compound: <span class="m">a</span> and <span class="m">x</span>.'
    ],
    mix: 'A compound term is not a sentence. <span class="m">f(b)</span> names a thing, <span class="m">p(b)</span> is true or false.'
  },
  '7.9|functor': {
    match: ['functors'],
    steps: [
      'A compound term starts with a function symbol. That symbol is the functor.',
      'Two compound terms can only unify if they have the same functor and the same number of arguments.',
      'Then unification goes on argument by argument.'
    ],
    ex: [
      'In <span class="m">f(b)</span> the functor is f.',
      'In <span class="m">g(a,x)</span> the functor is g, with two arguments.',
      '<span class="m">f(x)</span> and <span class="m">g(x)</span> do not unify: different functors.',
      '<span class="m">f(x)</span> and <span class="m">f(a)</span> unify with <span class="m">{x←a}</span>.'
    ],
    mix: 'Functor is the symbol only, not the whole term.'
  },
  '7.9|clash': {
    match: ['clashes'],
    steps: [
      'A clash is a failure in unification.',
      'It happens when two different fixed names meet at the same spot.',
      'No substitution can change a constant, so unification stops.'
    ],
    ex: [
      '<span class="m">p(a)</span> and <span class="m">p(b)</span>: a and b clash.',
      '<span class="m">p(x,x)</span> and <span class="m">p(a,b)</span>: x gets a, then a clashes with b.',
      '<span class="m">f(x)</span> and <span class="m">g(x)</span>: the functors clash.',
      'No clash: <span class="m">p(x)</span> and <span class="m">p(a)</span>, the variable can take a.'
    ],
    mix: 'A clash is between fixed names. A variable can never clash with a term on its own (but see the occur check).'
  },
  '7.9|occur check': {
    match: [],
    steps: [
      'Before setting a variable x to a term t, look inside t.',
      'If x appears inside t, stop. Unification fails.',
      'Otherwise x would have to equal a term that contains itself, an endless term.'
    ],
    ex: [
      '<span class="m">x</span> and <span class="m">f(x)</span>: x occurs inside f(x), so fail.',
      '<span class="m">p(x,x)</span> and <span class="m">p(y,f(y))</span>: x←y, then y vs f(y) fails the check.',
      'Passes: <span class="m">x</span> and <span class="m">f(y)</span>, giving <span class="m">{x←f(y)}</span>.',
      'Passes: <span class="m">x</span> and <span class="m">x</span>, they are identical, nothing to set.'
    ],
    mix: 'Occur check is about a variable inside a term. A clash is about two different constants.'
  },
  '7.10|complementary literals': {
    match: ['complementary', 'complementary pair'],
    steps: [
      'Two literals are complementary if one is the other with a ¬ in front.',
      'In predicate logic they only need to match after unifying.',
      'Resolution cancels a complementary pair, one from each clause.'
    ],
    ex: [
      '<span class="m">p(a)</span> and <span class="m">¬p(a)</span>: complementary.',
      '<span class="m">p(a,y)</span> and <span class="m">¬p(x,b)</span>: complementary after <span class="m">{x←a, y←b}</span>.',
      'Not complementary: <span class="m">p(a)</span> and <span class="m">¬p(b)</span>, they clash.',
      'Not complementary: <span class="m">p(a)</span> and <span class="m">¬q(a)</span>, different predicates.'
    ]
  },
  '7.10|resolvent': {
    match: ['resolvents'],
    steps: [
      'Pick one clause with a literal L and another with a complementary literal.',
      'Unify them with an mgu σ.',
      'Remove the pair, join what is left of both clauses, and apply σ.',
      'The result is the resolvent, a new clause that follows from the two.'
    ],
    ex: [
      '<span class="m">{p(a,y), r(y)}</span> and <span class="m">{¬p(x,b), s(x)}</span> with <span class="m">{x←a, y←b}</span> give <span class="m">{r(b), s(a)}</span>.',
      '<span class="m">{p(a)}</span> and <span class="m">{¬p(a), q(a)}</span> give <span class="m">{q(a)}</span>.',
      '<span class="m">{p(a)}</span> and <span class="m">{¬p(a)}</span> give <span class="m">{}</span>.',
      'No resolvent: <span class="m">{p(a)}</span> and <span class="m">{q(a)}</span> have no complementary pair.'
    ],
    mix: 'Resolve one pair at a time. Cancelling two pairs in one step is not a resolution step.'
  },
  '7.10|rename apart': {
    match: ['renaming', 'rename', 'x′'],
    steps: [
      'Variables in a clause are local to that clause.',
      'If two clauses use the same variable name, they might wrongly be forced to agree.',
      'So before resolving, rename the variables of one clause to fresh names.',
      'Meaning stays the same, since variables are universal.'
    ],
    ex: [
      '<span class="m">{p(a,x)}</span> and <span class="m">{¬p(x,b)}</span>: not unifiable as written, since x would be b and a at once.',
      'Rename the second: <span class="m">{¬p(x′,b)}</span>. Now <span class="m">{x′←a, x←b}</span> unifies, and the resolvent is <span class="m">{}</span>.',
      'Renaming <span class="m">x</span> to <span class="m">x′</span> in <span class="m">{p(x), q(x)}</span> gives <span class="m">{p(x′), q(x′)}</span>.'
    ],
    mix: 'Rename every occurrence of a variable in the clause consistently. Do not rename a variable to an existing one.'
  },
  '7.10|factor': {
    match: ['factors', 'factoring'],
    steps: [
      'Sometimes a clause has two literals that can be made identical.',
      'Find an mgu γ for them, and apply it to the whole clause.',
      'The two literals collapse into one, since a clause is a set.',
      'The result is a factor. Resolution is done on factors.'
    ],
    ex: [
      '<span class="m">{p(x), p(y)}</span> with <span class="m">{x←y}</span> gives the factor <span class="m">{p(y)}</span>.',
      '<span class="m">{p(x), p(f(y)), r(x,y)}</span> with <span class="m">{x←f(y)}</span> gives <span class="m">{p(f(y)), r(f(y),y)}</span>.',
      'Without factoring, <span class="m">{p(x), p(y)}</span> and <span class="m">{¬p(u), ¬p(v)}</span> never reach <span class="m">{}</span>. With it, <span class="m">{p(y)}</span> and <span class="m">{¬p(v)}</span> do.',
      'Not factorable: <span class="m">{p(a), p(b)}</span>, a clashes with b.'
    ],
    mix: 'Factor means merging literals inside one clause. Resolving combines two clauses.'
  },
  '7.10|empty clause': {
    match: ['{}'],
    steps: [
      'The empty clause has no literals at all, written {}.',
      'A clause is an "or" of its literals, so with none, nothing can make it true.',
      'So {} is always false, a contradiction.',
      'Reaching {} means the clauses cannot all be true.'
    ],
    ex: [
      '<span class="m">{p(a)}</span> and <span class="m">{¬p(a)}</span> resolve to <span class="m">{}</span>.',
      '<span class="m">{p(a), q(a)}</span> is not empty and can be true.',
      'In the loves example, step 5 gives <span class="m">{}</span> from <span class="m">{loves(u,x)}</span> and <span class="m">{¬loves(jack,jill)}</span>.'
    ],
    mix: 'The empty clause {} is a contradiction. An empty set of clauses is true (nothing to violate).'
  },
  '7.10|derivation': {
    match: ['derivations', 'derive', 'derived'],
    steps: [
      'A derivation is a numbered list of clauses.',
      'Each one is either a premise or a resolvent of two earlier ones.',
      'Each line says where it came from.',
      'A derivation can be extended line by line.'
    ],
    ex: [
      'Premises: 1 <span class="m">{p(a)}</span>, 2 <span class="m">{¬p(x), q(x)}</span>.',
      '3 <span class="m">{q(a)}</span> from 1,2 with <span class="m">{x←a}</span>.',
      'A line that is neither a premise nor a resolvent of earlier lines is not allowed.'
    ],
    mix: 'A derivation need not end in {}. A refutation is a derivation that does.'
  },
  '7.11|goal': {
    match: [],
    steps: [
      'The goal is the sentence we want to prove from the premises.',
      'We ask: does Δ entail the goal?',
      'Resolution never proves it directly. It proves the negated goal impossible.'
    ],
    ex: [
      'Goal: <span class="m">∀x. ∀y. loves(x,y)</span>, everybody loves everybody.',
      'Goal: <span class="m">∃x. r(x)</span> from p(a), p → q, q → r.',
      'Goal in answer extraction: a special atom <span class="m">goal(z)</span> that collects the answer.'
    ],
    mix: 'Goal (what we prove) vs negated goal (what we assume to get a contradiction).'
  },
  '7.11|negated goal': {
    match: ['¬φ'],
    steps: [
      'Put ¬ in front of the goal.',
      'Add it to the premises and convert everything to clauses.',
      'If this set leads to {}, the goal must follow.',
      'This is proof by contradiction.'
    ],
    ex: [
      'Goal <span class="m">∀x. ∀y. loves(x,y)</span>: negated is <span class="m">¬∀x.∀y. loves(x,y)</span>, which becomes <span class="m">{¬loves(jack,jill)}</span>.',
      'Goal <span class="m">∃x. r(x)</span>: negated is <span class="m">∀x. ¬r(x)</span>, clause <span class="m">{¬r(x)}</span>.',
      'Goal <span class="m">p(a)</span>: negated clause <span class="m">{¬p(a)}</span>.'
    ],
    mix: 'Negating a ∀ goal makes Skolem constants. Negating an ∃ goal makes a universal clause.'
  },
  '7.11|refutation': {
    match: ['refutations'],
    steps: [
      'A refutation is a derivation that ends in the empty clause {}.',
      'It shows the starting clauses cannot all be true: they are unsatisfiable.',
      'To prove a goal, refute premises plus negated goal.'
    ],
    ex: [
      '1 <span class="m">{p(a)}</span>, 2 <span class="m">{¬p(x), q(x)}</span>, 3 <span class="m">{¬q(a)}</span>; 4 <span class="m">{q(a)}</span> (1,2); 5 <span class="m">{}</span> (4,3). A refutation.',
      'A derivation ending in <span class="m">{q(a)}</span> is not a refutation.',
      'A satisfiable clause set has no refutation.'
    ],
    mix: 'A refutation shows the clauses are contradictory. It is not itself the proof of the goal, the goal follows because its negation was refuted.'
  },
  '7.11|refutation-complete': {
    match: ['refutation complete', 'refutation-completeness'],
    steps: [
      'Complete means resolution does not miss anything of one kind.',
      'The kind: if a set of clauses is unsatisfiable, resolution can reach {}.',
      'So with premises and negated goal, if the goal follows, a refutation exists.'
    ],
    ex: [
      '1 <span class="m">{p(a,b), q(a,c)}</span>, 2 <span class="m">{¬p(x,y), r(x)}</span>, 3 <span class="m">{¬q(x,y), r(x)}</span>, 4 <span class="m">{¬r(z)}</span>: unsatisfiable. 5 <span class="m">{q(a,c), r(a)}</span>, 6 <span class="m">{r(a)}</span>, 7 <span class="m">{}</span>.',
      'A satisfiable set never gives {}. It cannot, since resolution is sound.',
      'It does not say how long the search takes.'
    ],
    mix: 'Refutation-complete is not generatively complete. Resolution finds contradictions, it does not list every consequence.'
  },
  '7.11|generatively complete': {
    match: [],
    steps: [
      'Generatively complete means every consequence can be derived directly.',
      'Resolution is not like that.',
      'Some valid sentences cannot be derived from no premises by resolution.',
      'Instead, resolution refutes the negation.'
    ],
    ex: [
      '<span class="m">{} ⊨ p(a) ∨ ¬p(a)</span>, but resolution has no clause to start from, so it cannot derive <span class="m">{p(a), ¬p(a)}</span>.',
      'Instead negate the goal, giving <span class="m">{¬p(a)}</span> and <span class="m">{p(a)}</span>, which resolve to <span class="m">{}</span>.',
      'So resolution still proves it as a refutation.'
    ],
    mix: 'Resolution proves anything entailed, but only by contradiction, not by directly deriving it.'
  },
  '7.11|Peirce\'s law': {
    match: ['Peirce'],
    steps: [
      'Peirce\'s law is the sentence <span class="m">((p → q) → p) → p</span>.',
      'It is valid: true in every world, with no premises.',
      'It is hard to see by eye, so it is a good test for resolution.'
    ],
    ex: [
      'If p is true, the whole sentence is true (the conclusion is p).',
      'If p is false, then p → q is true, so (p → q) → p is false, so the whole implication is true.',
      'Resolution check: negated, it gives <span class="m">{p(c)}</span> and <span class="m">{¬p(c)}</span>, which resolve to <span class="m">{}</span>.'
    ],
    mix: 'Valid means true in all worlds. This sentence is valid even though it does not look obvious.'
  },
  '7.11|answer extraction': {
    match: ['answer literal'],
    steps: [
      'Sometimes we want to know which values make a sentence true, not only yes or no.',
      'Add a special atom <span class="m">goal(z)</span> and the rule <span class="m">φ(z) → goal(z)</span>.',
      'Derive a <span class="m">goal(...)</span> clause by resolution.',
      'The term inside goal is the answer.'
    ],
    ex: [
      'Premises <span class="m">{¬p(x), q(x)}</span> and <span class="m">{p(a)}</span>. Query: which z has q(z)?',
      'Add <span class="m">{¬q(z), goal(z)}</span>. Resolve with the first: <span class="m">{¬p(z), goal(z)}</span>. Resolve with <span class="m">{p(a)}</span>: <span class="m">{goal(a)}</span>.',
      'The answer is <span class="m">z = a</span>.',
      'If the result is <span class="m">{goal(a), goal(b)}</span>, then a or b is the answer, not a definite one.'
    ],
    mix: 'Plain refutation answers yes or no. Answer extraction uses the rule φ → goal instead of a negated goal, and returns the value.'
  },
  '7.11|Fitch': {
    match: [],
    steps: [
      'Fitch is a step-by-step proof style from logic courses.',
      'You write lines and mark which earlier lines support each one.',
      'This course skips it and uses resolution instead.'
    ],
    ex: [
      'Fitch proves things with indented sub-proofs.',
      'Resolution has one rule on clauses, so searching is simpler.',
      'Both prove the same sentences from the same premises.'
    ],
    mix: 'You do not need to know Fitch for this module. Resolution is the proof method here.'
  }
});
