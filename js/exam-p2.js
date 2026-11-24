/* Final practice paper 2: worked answers. */
UI.examPaper({ n: 3, title: 'Final practice paper 2', sub: '14 questions, 100 marks as printed per question: propositions and arguments in natural language, argument-based reasoning, propositional logic and proof systems.',
  html: '<p class="lead">Fourteen questions in three sections. Every answer below was re-solved from the question text, and the checkable ones (truth tables, clausal form, resolution, argumentation semantics) were run by script.</p>' +
    '<table><tr><th>Section</th><th>Questions</th><th>Marks</th><th>Topics</th></tr>' +
    '<tr><td>I Arguments and propositions in natural language</td><td>Q1 to Q5</td><td>10 + 10 + 5 + 10 + 15</td><td>"and" as conjunction, symbolic form, categorical forms, suppressed premises, arguments from a defeasible knowledge base</td></tr>' +
    '<tr><td>II Argument-based reasoning</td><td>Q6 to Q9</td><td>10 + 5 + 5 + 5</td><td>AA framework from arguments, grounded extension (including an infinite one), a proof about grounded semantics, the reasoning pipeline</td></tr>' +
    '<tr><td>III Propositional logic</td><td>Q10 to Q14</td><td>5 + 5 + 5 + 5 + 5</td><td>truth table, Fitch, INDO clausal form, resolution, ways to check entailment</td></tr></table>' +
    '<p>The paper prints 40 marks for section I, but its five questions add up to 50 as printed (Q5 is marked 15). The marks here follow the per-question figures. Q5 is probably worth 5 in the real section total.</p>',
  problems: [
    { label: 'Q1', marks: 10, mod: 3, title: 'Does "and" express a conjunction?',
      q: '<p>For each sentence, say whether the word "and" expresses a propositional conjunction.</p><p>(a) Susan and Alex live together. (b) Susan and Alex have two kids. (c) Susan and Alex are a couple. (d) Susan and Alex are Americans. (e) Susan and Alex did not vote for Trump.</p>',
      hint: 'Try to split the sentence into two complete sentences, one per person, with the same meaning as the original.',
      steps: [
        '<b>The test.</b><span>"and" is a conjunction only if the sentence is equivalent to "Susan does X" and "Alex does X", each making sense and having its own truth value.</span>',
        '<b>(a) live together.</b><span>"Susan lives together" is not a sentence. "Together" is a relation between the two people. Not a conjunction.</span>',
        '<b>(b) have two kids.</b><span>The natural reading is that they have two kids as a couple. "Susan has two kids and Alex has two kids" says something different (it allows four kids). Not a conjunction on the natural reading.</span>',
        '<b>(c) are a couple.</b><span>"Susan is a couple" is nonsense. Being a couple is a relation. Not a conjunction.</span>',
        '<b>(d) are Americans.</b><span>Equivalent to "Susan is American" and "Alex is American", two independent claims. Conjunction.</span>',
        '<b>(e) did not vote for Trump.</b><span>Equivalent to "Susan did not vote for Trump" and "Alex did not vote for Trump". Conjunction of two negations.</span>'
      ],
      answer: 'Conjunction: (d), (e). Not a conjunction: (a), (c), and (b) on the natural reading that the kids are shared. (b) is the one ambiguous sentence: on the reading "each has two kids" it would be a conjunction.',
      why: '<p>A propositional conjunction needs two propositions that can be true or false separately. When "and" joins the subjects of a joint relation (live together, a couple, have kids together) the sentence is about the pair, so it is a single atomic proposition.</p>',
      mistake: 'Calling every "Susan and Alex ..." a conjunction. Split it first; if a half-sentence is nonsense or changes meaning, it is not one.',
      vis: [{ t: 'table', head: ['Sentence', 'Split into two sentences', 'Conjunction?'], rows: [['(a) live together', '"Susan lives together" is not a sentence', 'no'], ['(b) have two kids', '"each has two kids" changes the meaning', 'no (natural reading)'], ['(c) are a couple', '"Susan is a couple" is nonsense', 'no'], ['(d) are Americans', 'Susan is American, Alex is American', 'yes'], ['(e) did not vote for Trump', 'Susan did not vote, Alex did not vote', 'yes']], hl: { 0: 'bad', 1: 'bad', 2: 'bad', 3: 'ok', 4: 'ok' }, note: 'Green rows split cleanly into two complete sentences; red rows do not.' }] },

    { label: 'Q2', marks: 10, mod: 3, title: 'Symbolic form and the placement of negation',
      q: '<p>Put each sentence in symbolic form, saying exactly what each symbol stands for. Pay attention to where the negation goes. Example: "Kristin is neither smart nor rich" is <span class="m">¬s ∧ ¬r</span>, s = "Kristin is smart", r = "Kristin is rich".</p><p>(a) It won\'t rain tomorrow. (b) There is no chance that it will rain tomorrow. (c) I believe that it won\'t rain tomorrow. (d) All of his friends are not students.</p>',
      hint: 'Pick the atom as the positive statement the negation applies to. For (c) ask what "believe" is attached to.',
      steps: [
        '<b>(a)</b><span>r = "It will rain tomorrow". Form: <span class="m">¬r</span>.</span>',
        '<b>(b)</b><span>"No chance" denies that there is a chance. r = "There is a chance that it will rain tomorrow". Form: <span class="m">¬r</span>.</span>',
        '<b>(c)</b><span>The negation sits inside the belief. r = "I believe that it won\'t rain tomorrow". Form: <span class="m">r</span>, an atom. Writing <span class="m">¬r</span> with r = "I believe it will rain" says "I do not believe it will rain", which is weaker.</span>',
        '<b>(d)</b><span>"All of his friends are not students" means none of them is a student. r = "Some of his friends are students". Form: <span class="m">¬r</span>.</span>'
      ],
      answer: '(a) <span class="m">¬r</span>, r = it will rain tomorrow. (b) <span class="m">¬r</span>, r = there is a chance it will rain tomorrow. (c) <span class="m">r</span>, r = I believe that it won\'t rain tomorrow. (d) <span class="m">¬r</span>, r = some of his friends are students.',
      why: '<p>A symbol must stand for a full sentence, and a negation word becomes <span class="m">¬</span> only when it negates the whole sentence the symbol names. Inside "I believe that ..." the negation is part of the believed content, so it stays in the atom.</p>',
      mistake: 'Moving the negation out of a belief: "I believe not-r" is not "not (I believe r)".',
      vis: [{ t: 'table', head: ['Sentence', 'Symbol r stands for', 'Form'], rows: [['(a) It won\'t rain tomorrow', 'it will rain tomorrow', '¬r'], ['(b) No chance of rain', 'there is a chance that it will rain tomorrow', '¬r'], ['(c) I believe it won\'t rain', 'I believe that it won\'t rain tomorrow', 'r'], ['(d) All his friends are not students', 'some of his friends are students', '¬r']], hl: { 2: 'ok' }, note: 'In (c) the negation stays inside the belief, so the form has no ¬.' }] },

    { label: 'Q3', marks: 5, mod: 3, title: 'Categorical forms',
      q: '<p>Give the most appropriate categorical form (All S are P, No S are P, Some S are P, Some S are not P) and say what S and P are.</p><p>(a) There are couples without children. (b) There are no people who hate chocolate. (c) Flamingos aren\'t friendly. (d) Everything that is cheap is no good. (e) Some things that are expensive are no good.</p>',
      hint: 'First decide universal or particular, then affirmative or negative. Choose P so that the sentence needs no extra negation.',
      steps: [
        '<b>(a)</b><span>Particular and negative: Some S are not P. S = couples, P = people with children.</span>',
        '<b>(b)</b><span>Universal and negative: No S are P. S = people, P = chocolate haters.</span>',
        '<b>(c)</b><span>A generic claim about all flamingos, negative: No S are P. S = flamingos, P = friendly animals.</span>',
        '<b>(d)</b><span>"Everything cheap is no good" is universal and negative: All S are not P, which is the same as No S are P. S = cheap things, P = good things.</span>',
        '<b>(e)</b><span>Particular and negative: Some S are not P. S = expensive things, P = good things.</span>'
      ],
      answer: '(a) Some S are not P (couples; people with children). (b) No S are P (people; chocolate haters). (c) No S are P (flamingos; friendly animals). (d) No S are P, equivalently All S are not P (cheap things; good things). (e) Some S are not P (expensive things; good things).',
      why: '<p>The four forms are the quantity (all, no, some) plus the quality (affirmative or negative). "Without", "no one who" and "no good" carry the negation, so move it into the form and keep P positive.</p>',
      mistake: 'Reading "Flamingos aren\'t friendly" as "Not all flamingos are friendly" (Some S are not P). The plain generic is the universal negative.',
      vis: [{ t: 'table', head: ['Sentence', 'Form', 'S', 'P'], rows: [['(a) couples without children', 'Some S are not P', 'couples', 'people with children'], ['(b) no people hate chocolate', 'No S are P', 'people', 'chocolate haters'], ['(c) flamingos aren\'t friendly', 'No S are P', 'flamingos', 'friendly animals'], ['(d) cheap things are no good', 'No S are P', 'cheap things', 'good things'], ['(e) some expensive things are no good', 'Some S are not P', 'expensive things', 'good things']] }] },

    { label: 'Q4', marks: 10, mod: 2, title: 'Suppressed premises that make the argument deductive',
      q: '<p>Write down the suppressed premises that make each argument deductive.</p><p>(a) "You should drink raw cow\'s milk, because it is natural and not processed."</p><p>(b) "ABC is an equilateral triangle because it is an isosceles triangle and angle B = 60 degrees."</p><p>(c) "No one except you can obtain this data because it is encrypted."</p><p>(d) "This language is a regular language since it can be recognized by a finite automaton."</p>',
      hint: 'Write the stated reason and the conclusion, then add the general rule that would make the step from one to the other watertight.',
      steps: [
        '<b>(a) Stated.</b><span>Reason: raw cow\'s milk is natural and not processed. Conclusion: you should drink raw cow\'s milk.</span>',
        '<b>(a) Suppressed.</b><span>You should drink milk if it is natural and not processed.</span>',
        '<b>(b) Stated.</b><span>Reasons: ABC is isosceles; angle B = 60. Conclusion: ABC is equilateral.</span>',
        '<b>(b) Suppressed.</b><span>(i) An isosceles triangle has two equal angles. (ii) The angles of a triangle sum to 180 degrees. (iii) A triangle with three equal angles is equilateral. Check: whichever two angles are equal, with B = 60 and A + B + C = 180 the other two are also 60, so A = B = C and ABC is equilateral.</span>',
        '<b>(c)</b><span>Stated: the data is encrypted. Suppressed: to obtain encrypted data one must be able to decrypt it; you are the only person able to decrypt it. Then no one else can obtain it.</span>',
        '<b>(d)</b><span>Stated: the language can be recognized by a finite automaton. Suppressed: a language is regular if (or iff) it can be recognized by a finite automaton.</span>'
      ],
      answer: '(a) You should drink milk if it is natural and not processed. (b) An isosceles triangle has two equal angles; the angles sum to 180; a triangle with three equal angles is equilateral. (c) Obtaining encrypted data requires being able to decrypt it; you are the only person who can decrypt it. (d) A language is regular if it can be recognized by a finite automaton.',
      why: '<p>An argument is deductive when its premises cannot be true with the conclusion false. A suppressed premise is the general rule (usually a conditional or definition) that the arguer left unsaid; adding it turns the step into modus ponens or a similar valid pattern.</p>',
      mistake: 'Adding a premise that only makes the conclusion plausible ("natural things are usually good"). It must make the argument valid, not merely likely.',
      paperSays: '(b) The paper lists only the angle-sum and equal-angles-implies-equilateral premises, and its text says ABA and "A=B=C" with typos. It leaves out that an isosceles triangle has two equal angles, which is needed to use "isosceles" at all.',
      vis: [
        { t: 'arg', name: '(a)', premises: ['Raw cow\'s milk is natural and not processed', 'You should drink milk if it is natural and not processed (suppressed)'], concl: 'You should drink raw cow\'s milk' },
        { t: 'arg', name: '(b)', premises: ['ABC is isosceles and angle B = 60', 'An isosceles triangle has two equal angles (suppressed)', 'The angles of a triangle sum to 180 (suppressed)', 'A triangle with three equal angles is equilateral (suppressed)'], concl: 'ABC is equilateral' },
        { t: 'arg', name: '(c)', premises: ['The data is encrypted', 'Obtaining encrypted data requires being able to decrypt it (suppressed)', 'You are the only person able to decrypt it (suppressed)'], concl: 'No one except you can obtain this data' },
        { t: 'arg', name: '(d)', premises: ['The language can be recognized by a finite automaton', 'A language is regular if it can be recognized by a finite automaton (suppressed)'], concl: 'This language is regular' }] },

    { label: 'Q5', marks: 15, mod: 4, title: 'Arguments and attacks from a defeasible knowledge base',
      q: '<p>Knowledge base: d1: Students are normally not married. d2: Students are normally young adults. s1: Young adults are adults. d3: Adults are normally married. e1: Alex is a student.</p><p>(a) Form all possible arguments from this knowledge, each in standard form (reasons, then the conclusion).</p><p>(b) Identify the attacks between them and say whether each is a rebut, an undermine or an undercut.</p>',
      hint: 'Start from the fact e1 and apply each rule once. Then reuse the conclusions as reasons for longer arguments.',
      steps: [
        '<b>A1.</b><span>Reasons: e1, d1. Conclusion: Alex is not married.</span>',
        '<b>A2.</b><span>Reasons: e1, d2. Conclusion: Alex is a young adult.</span>',
        '<b>A3.</b><span>Reasons: A2, s1. Conclusion: Alex is an adult.</span>',
        '<b>A4.</b><span>Reasons: A3, d3. Conclusion: Alex is married.</span>',
        '<b>Complete?</b><span>Each rule is applied to its only available input, and nothing else can be chained, so these four are all the arguments.</span>',
        '<b>(b) Compare conclusions.</b><span>Only A1 ("not married") and A4 ("married") have contradictory conclusions. Each attacks the other, and the attack is on the conclusion, so it is a rebut.</span>',
        '<b>(b) Other attack types.</b><span>No conclusion contradicts a premise (no undermine) and no conclusion denies that a rule applies (no undercut). A2 and A3 are attacked by nothing.</span>'
      ],
      answer: 'A1 = [e1, d1 so not married], A2 = [e1, d2 so young adult], A3 = [A2, s1 so adult], A4 = [A3, d3 so married]. Attacks: A1 rebuts A4 and A4 rebuts A1. No other attacks.',
      why: '<p>An argument is a set of reasons that proves a conclusion by rules. A rebut targets the conclusion of the other argument, an undermine targets a defeasible premise, an undercut targets the link between reasons and conclusion. Here only the final conclusions clash.</p>',
      mistake: 'Writing A4 with s1 instead of d3. s1 says young adults are adults and cannot give "married".',
      paperSays: 'A4 is written with reasons A3 and s1, which is wrong: the rule that gives "married" is d3, and s1 was already used in A3.',
      vis: [
        { t: 'tree', title: 'how the four arguments are built', nodes: [{ id: 1, text: 'e1' }, { id: 2, text: 'd1' }, { id: 3, text: 'd2' }, { id: 4, text: 's1' }, { id: 5, text: 'd3' },
          { id: 6, text: 'A1: not married', from: [1, 2], note: 'e1, d1' }, { id: 7, text: 'A2: young adult', from: [1, 3], note: 'e1, d2' }, { id: 8, text: 'A3: adult', from: [7, 4], note: 'A2, s1' }, { id: 9, text: 'A4: married', from: [8, 5], note: 'A3, d3' }] },
        { t: 'af', nodes: ['A1', 'A2', 'A3', 'A4'], edges: [['A1', 'A4', 'rebut'], ['A4', 'A1', 'rebut']], pos: { A1: [45, 60], A4: [175, 60], A2: [45, 140], A3: [175, 140] }, note: 'Only the final conclusions clash; A2 and A3 are unattacked.' }] },

    { label: 'Q6', marks: 10, mod: 4, title: 'The AA framework and the claim "Alex is married"',
      q: '<p>Continue Question 5: A1 = (e1, d1 so Alex is not married), A2 = (e1, d2 so young adult), A3 = (A2, s1 so adult), A4 = (A3, d3 so married); A1 and A4 rebut each other.</p><p>(a) Define the AA framework (AR, Att). (b) Explain how it evaluates the claim "Alex is married". Is the claim acceptable, and under which semantics?</p>',
      hint: 'The claim is the conclusion of one argument, so ask whether that argument is acceptable. Try admissible and grounded semantics.',
      steps: [
        '<b>(a) AR.</b><span>The four arguments: <span class="m">AR = {A1, A2, A3, A4}</span>.</span>',
        '<b>(a) Att.</b><span>The two rebuts: <span class="m">Att = {(A1, A4), (A4, A1)}</span>.</span>',
        '<b>(b) Which argument.</b><span>"Alex is married" is the conclusion of A4, so the claim is acceptable under a semantics if A4 is.</span>',
        '<b>(b) Admissible.</b><span>{A4} is conflict-free. A4 is attacked by A1, and A4 attacks A1, so {A4} defends itself. {A4} is admissible, so A4 is admissibly acceptable.</span>',
        '<b>(b) Grounded.</b><span>f(∅) = {A2, A3} (the unattacked arguments). f({A2, A3}) = {A2, A3}, since nothing in the set attacks A1. So GE = {A2, A3} and A4 is not in it.</span>',
        '<b>(b) Check.</b><span>Preferred and stable extensions are {A1, A2, A3} and {A2, A3, A4}; the claim holds in one of them and fails in the other.</span>'
      ],
      answer: 'AR = {A1, A2, A3, A4}, Att = {(A1, A4), (A4, A1)}. The claim "Alex is married" is acceptable under the admissible semantics (credulous: A4 is in {A4}) but not under the grounded semantics (GE = {A2, A3}).',
      why: '<p>Admissible acceptance asks for some defensible position containing the argument, so mutual rebuts leave both sides acceptable. Grounded acceptance is sceptical: it keeps only what survives without choosing a side, so a mutual attack removes both.</p>',
      mistake: 'Saying the claim is acceptable without naming the semantics. Both verdicts depend on it.',
      vis: [{ t: 'af', nodes: ['A1', 'A2', 'A3', 'A4'], edges: [['A1', 'A4'], ['A4', 'A1']], pos: { A1: [45, 60], A4: [175, 60], A2: [45, 140], A3: [175, 140] },
        ext: [{ name: 'admissible', set: ['A4'] }, { name: 'preferred', set: ['A1', 'A2', 'A3'] }, { name: 'preferred', set: ['A2', 'A3', 'A4'] }, { name: 'grounded', set: ['A2', 'A3'] }],
        note: 'A4 is in an admissible and a preferred set (credulous yes) but not in the grounded extension, where the mutual attack with A1 leaves both undecided.' }] },

    { label: 'Q7', marks: 5, mod: 4, title: 'Grounded extension of an infinite framework',
      q: '<p>F = (AR, Att) with AR = {A, D} ∪ {B1, B2, ...} ∪ {C1, C2, ...} and Att = {(Bn, A), (A, Bn)} ∪ {(Cn, Bn)} ∪ {(D, Cn)} for n = 1, 2, .... Compute the grounded extension GE of F carefully.</p>',
      hint: 'Iterate the characteristic function from the empty set and stop when it stops growing. Check who attacks each Bn.',
      steps: [
        '<b>List attackers.</b><span>D has none. Cn is attacked by D. Bn is attacked by A and by Cn. A is attacked by every Bn.</span>',
        '<b>f(∅).</b><span>Only unattacked arguments are defended by ∅: f(∅) = {D}.</span>',
        '<b>f({D}).</b><span>Cn is attacked by D, but Cn would need D to be attacked, and D has no attacker, so Cn is not defended. Bn has the attacker A, and D does not attack A, so Bn is not defended. A is attacked by every Bn and no Bn is attacked by D, so A is not defended.</span>',
        '<b>Fixed point.</b><span>f({D}) = {D}, so f^k(∅) = {D} for every k >= 1.</span>'
      ],
      answer: 'GE = {D}.',
      why: '<p>The grounded extension is the least fixed point of f, reached by iterating f from ∅. Defending Bn means attacking both A and Cn; D attacks Cn but nobody in the set attacks A, so nothing beyond D is ever defended, however many arguments there are.</p>',
      mistake: 'Thinking D defends Bn because D beats Cn. Bn is also attacked by A.',
      vis: [{ t: 'af', nodes: ['D', 'C1', 'C2', 'A', 'B1', 'B2'], edges: [['D', 'C1'], ['D', 'C2'], ['C1', 'B1'], ['C2', 'B2'], ['A', 'B1'], ['B1', 'A'], ['A', 'B2'], ['B2', 'A']],
        pos: { D: [110, 30], C1: [40, 70], C2: [180, 70], A: [110, 110], B1: [40, 150], B2: [180, 150] },
        ext: [{ name: 'grounded', set: ['D'] }],
        note: 'Only B1, B2 (n = 1, 2) are drawn; the pattern repeats for every n. D beats every Cn, but A still attacks every Bn and nothing in the set attacks A.' }] },

    { label: 'Q8', marks: 5, mod: 4, title: 'Two grounded arguments cannot attack each other',
      q: '<p>Prove that in an abstract argumentation framework F = (AR, Att), if A, B ∈ AR and (A, B) ∈ Att, then A and B cannot both be groundedly acceptable.</p>',
      hint: 'Suppose both are in GE and ask what property every extension of the course must have.',
      steps: [
        '<b>Assume.</b><span>Suppose A ∈ GE and B ∈ GE, with (A, B) ∈ Att.</span>',
        '<b>GE is conflict-free.</b><span>GE is the least complete extension. Every complete extension is admissible, and every admissible extension is conflict-free by definition.</span>',
        '<b>Contradiction.</b><span>A and B are both in GE and A attacks B, so GE is not conflict-free.</span>',
        '<b>Conclude.</b><span>The assumption is false, so A and B are not both groundedly acceptable.</span>'
      ],
      answer: 'Both in GE would make GE contain an attacking pair, contradicting that GE is conflict-free (it is admissible). Hence they cannot both be groundedly acceptable.',
      why: '<p>Conflict-freeness is the first clause of admissibility, and the grounded extension is built to be admissible (indeed complete). One property of the definition settles the question; no iteration is needed.</p>',
      mistake: 'Arguing from f(∅) alone. Say why the whole GE, which is built in several rounds, has no conflict.',
      vis: [{ t: 'arg', name: 'Proof by contradiction', premises: ['A in GE, B in GE, and A attacks B', 'GE is the least complete extension; complete implies admissible; admissible implies conflict-free'], concl: 'GE contains an attacking pair: contradiction, so A and B are not both groundedly acceptable' }] },

    { label: 'Q9', marks: 5, mod: 4, title: 'The steps of argument-based reasoning',
      q: '<p>Write a paragraph describing the steps of argument-based reasoning, starting from a knowledge base Δ.</p>',
      hint: 'Five or six steps from the knowledge base to a conclusion you may accept.',
      steps: [
        '<b>1. Form arguments.</b><span>Build the set of arguments AR from Δ (reasons, rules, conclusion).</span>',
        '<b>2. Find attacks.</b><span>Identify rebuts, undermines and undercuts between them, giving a relation Att on AR.</span>',
        '<b>3. Build the framework.</b><span>F = (AR, Att), an abstract argumentation framework.</span>',
        '<b>4. Choose a semantics.</b><span>Admissible, grounded, preferred or stable.</span>',
        '<b>5. Evaluate.</b><span>Compute the extensions and decide which arguments are acceptable under the chosen semantics.</span>',
        '<b>6. Extract conclusions.</b><span>The conclusion of each acceptable argument is an acceptable claim drawn from Δ.</span>'
      ],
      answer: 'Form the arguments from Δ, find the attacks, form F = (AR, Att), select a semantics σ, evaluate which arguments are acceptable under σ, and take their conclusions as the acceptable inferences from Δ.',
      why: '<p>The pipeline separates what is knowledge-specific (steps 1 and 2) from what is abstract (steps 3 to 5). Once F is built, the semantics ignores the content of the arguments.</p>',
      mistake: 'Skipping the choice of semantics. The same framework can give different acceptable claims under different semantics.',
      vis: [{ t: 'table', head: ['Step', 'What happens', 'Output'], rows: [['1', 'form arguments from the knowledge base', 'AR'], ['2', 'find rebuts, undermines, undercuts', 'Att'], ['3', 'build the abstract framework', 'F = (AR, Att)'], ['4', 'choose a semantics', 'admissible, grounded, preferred, stable'], ['5', 'compute the extensions', 'acceptable arguments'], ['6', 'read off their conclusions', 'acceptable claims from the knowledge base']], hl: { 0: 'dim', 1: 'dim' }, note: 'Steps 1 and 2 use the content of the knowledge base (grey); steps 3 to 5 are abstract.' }] },

    { label: 'Q10', marks: 5, mod: 5, title: 'Truth table for {p → q ∨ r, q → r} and p → r',
      q: '<p>Complete the truth table, then explain whether <span class="m">{p → q ∨ r, q → r} ⊨ (p → r)</span>.</p>',
      hint: 'List the rows where both premises are true and check the conclusion on exactly those rows.',
      steps: [
        '<b>Table.</b><span>Columns p, q, r, <span class="m">p → q ∨ r</span>, <span class="m">q → r</span>, <span class="m">p → r</span>.<pre>i0  0 0 0   1 1 1\ni1  0 0 1   1 1 1\ni2  0 1 0   1 0 1\ni3  0 1 1   1 1 1\ni4  1 0 0   0 1 0\ni5  1 0 1   1 1 1\ni6  1 1 0   1 0 0\ni7  1 1 1   1 1 1</pre></span>',
        '<b>Models of Δ.</b><span>Rows where both premises are 1: i0, i1, i3, i5, i7.</span>',
        '<b>Models of the conclusion.</b><span><span class="m">p → r</span> is 1 on i0, i1, i2, i3, i5, i7.</span>',
        '<b>Compare.</b><span>M(Δ) = {i0, i1, i3, i5, i7} is a subset of M(φ), so every model of Δ satisfies φ.</span>'
      ],
      answer: 'Yes, Δ ⊨ p → r, because M(Δ) = {i0, i1, i3, i5, i7} ⊆ {i0, i1, i2, i3, i5, i7} = M(p → r). The rows where p → r is false (i4, i6) each falsify a premise.',
      why: '<p>Entailment means every truth assignment that satisfies all premises satisfies the conclusion. The truth table lists all assignments, so the check is exhaustive.</p>',
      mistake: 'Checking the conclusion on all rows. Only the rows where every premise is true matter.',
      vis: [{ t: 'table', head: ['', 'p', 'q', 'r', 'p → q ∨ r', 'q → r', 'p → r'], rows: [['i0', 0, 0, 0, 1, 1, 1], ['i1', 0, 0, 1, 1, 1, 1], ['i2', 0, 1, 0, 1, 0, 1], ['i3', 0, 1, 1, 1, 1, 1], ['i4', 1, 0, 0, 0, 1, 0], ['i5', 1, 0, 1, 1, 1, 1], ['i6', 1, 1, 0, 1, 0, 0], ['i7', 1, 1, 1, 1, 1, 1]],
        hl: { 0: 'ok', 1: 'ok', 3: 'ok', 5: 'ok', 7: 'ok', 4: 'bad', 6: 'bad' },
        note: 'Green: the models of both premises, and p → r is 1 on each. Red: the only rows where p → r fails, and each falsifies a premise.' }],
      tryit: { w: 'entail', say: 'Check the entailment in the tool:', cfg: { title: 'ENTAILMENT CHECK', delta: ['p -> q | r', 'q -> r'], phi: 'p -> r' } } },

    { label: 'Q11', marks: 5, mod: 5, title: 'Fitch proof of p → r',
      q: '<p>Let Δ = {p → q ∨ r, q → r}. Use the Fitch system to prove p → r.</p>',
      hint: 'To prove an implication, assume the antecedent. You need Or Elimination, which wants two implications.',
      steps: [
        '<b>Goal shape.</b><span>The goal is an implication, so open a box with the assumption p and aim for r.</span>',
        '<b>Inside the box.</b><span>Implication Elimination on the premise gives q ∨ r. Or Elimination needs <span class="m">q → r</span> (a premise) and <span class="m">r → r</span>.</span>',
        '<b>r → r.</b><span>Open a one-line box that assumes r, then close it with Implication Introduction.</span>',
        '<b>Finish.</b><span>Or Elimination gives r. Close the outer box with Implication Introduction.<pre>1.     p → q ∨ r   Premise\n2.     q → r       Premise\n3.1.   | p         Assumption\n3.2.   | q ∨ r     Implication Elimination: 1, 3.1\n3.3.1. | | r       Assumption\n3.4.   | r → r     Implication Introduction: 3.3.1, 3.3.1\n3.5.   | r         Or Elimination: 3.2, 2, 3.4\n4.     p → r       Implication Introduction: 3.1, 3.5</pre></span>',
        '<b>Check each line.</b><span>3.2 uses premise 1 and 3.1 (modus ponens). 3.5 cites the disjunction 3.2 and the two implications 2 and 3.4, as the rule requires. Line 4 cites the box 3.1 to 3.5.</span>'
      ],
      answer: 'The eight-line proof above, ending in line 8: p → r.',
      why: '<p>Fitch is sound and complete: Δ ⊨ φ exactly when a proof exists. Or Elimination is the case analysis: both disjuncts lead to r, so r follows.</p>',
      mistake: 'Citing only the disjunction and one implication for Or Elimination. It needs the disjunction and both implications.',
      vis: [{ t: 'fitch', lines: [[0, 'p → q ∨ r', 'Premise'], [0, 'q → r', 'Premise'], [1, 'p', 'Assumption'], [1, 'q ∨ r', 'Implication Elimination: 1, 3'], [2, 'r', 'Assumption'], [1, 'r → r', 'Implication Introduction: 5-5'], [1, 'r', 'Or Elimination: 4, 2, 6'], [0, 'p → r', 'Implication Introduction: 3-7']] }] },

    { label: 'Q12', marks: 5, mod: 5, title: 'Clausal form by INDO',
      q: '<p>Convert Δ = {p → q ∨ r, q → r} into clausal form using the INDO procedure.</p>',
      hint: 'Implications out, then negations in. Both sentences are already one clause after removing the arrow.',
      steps: [
        '<b>Implications out.</b><span><span class="m">p → q ∨ r</span> becomes <span class="m">¬p ∨ (q ∨ r)</span>; <span class="m">q → r</span> becomes <span class="m">¬q ∨ r</span>.</span>',
        '<b>Negations in.</b><span>Nothing to push: the only negations sit on atoms.</span>',
        '<b>Distribute and read clauses.</b><span>Each sentence is a disjunction of literals, so it is one clause.</span>'
      ],
      answer: '{ {¬p, q, r}, {¬q, r} }',
      why: '<p>INDO is Implications out, Negations in, Distribution of or over and, Operators out (read off the set of clauses). A clause is a set of literals read as their disjunction.</p>',
      mistake: 'Writing {¬p, q ∨ r} as a clause. Clauses contain literals only.',
      vis: [{ t: 'table', head: ['Sentence', 'Implications out', 'Clause'], rows: [['p → q ∨ r', '¬p ∨ (q ∨ r)', '{¬p, q, r}'], ['q → r', '¬q ∨ r', '{¬q, r}']], note: 'No negation needs pushing in and no distribution is needed: each sentence is already one clause.' }],
      tryit: { w: 'cnf', say: 'Convert the first premise in the tool:', cfg: { title: 'CLAUSAL FORM', mode: 'prop', formula: 'p -> q | r' } } },

    { label: 'Q13', marks: 5, mod: 5, title: 'Resolution proof of p → r',
      q: '<p>Use the resolution proof system to prove that Δ = {p → q ∨ r, q → r} logically entails φ = (p → r).</p>',
      hint: 'Add the clauses of the negated goal and derive the empty clause.',
      steps: [
        '<b>Clauses of Δ.</b><span>{¬p, q, r} and {¬q, r}.</span>',
        '<b>Negated goal.</b><span><span class="m">¬(p → r)</span> is equivalent to <span class="m">p ∧ ¬r</span>, giving the clauses {p} and {¬r}.</span>',
        '<b>Resolve.</b><span><pre>1  {¬p, q, r}   Premise\n2  {¬q, r}      Premise\n3  {p}          Negated goal\n4  {¬r}         Negated goal\n5  {¬p, r}      Resolution: 1, 2   (on q)\n6  {r}          Resolution: 5, 3   (on p)\n7  {}           Resolution: 6, 4   (on r)</pre></span>',
        '<b>Conclude.</b><span>The empty clause shows Δ ∪ {¬φ} is unsatisfiable, so Δ ⊨ φ.</span>'
      ],
      answer: 'The empty clause is derived in seven lines (above), so Δ ⊨ p → r.',
      why: '<p>Resolution is refutation-complete: Δ ⊨ φ exactly when the clauses of Δ ∪ {¬φ} derive {}. Line 5 merges the two copies of r into one because a clause is a set.</p>',
      mistake: 'Forgetting to negate the goal first, or negating p → r as ¬p ∨ ¬r.',
      vis: [{ t: 'tree', nodes: [{ id: 1, text: '{¬p, q, r}' }, { id: 2, text: '{¬q, r}' }, { id: 3, text: '{p}' }, { id: 4, text: '{¬r}' },
        { id: 5, text: '{¬p, r}', from: [1, 2], note: 'on q' }, { id: 6, text: '{r}', from: [5, 3], note: 'on p' }, { id: 7, text: '{}', from: [6, 4], note: 'on r' }] }],
      tryit: { w: 'refute', say: 'Run the same proof in the workbench:', cfg: { title: 'REFUTATION', mode: 'prop', premises: ['p -> q | r', 'q -> r'], goal: 'p -> r' } } },

    { label: 'Q14', marks: 5, mod: 5, title: 'Approaches to the entailment problem',
      q: '<p>Write a short paragraph on the different approaches to solving the entailment problem Δ ⊨ φ between a set Δ of propositions and a proposition φ.</p>',
      hint: 'Three families: check models, reduce to satisfiability, or use a proof system.',
      steps: [
        '<b>Truth table.</b><span>One column per premise and one for φ. Check that every row satisfying all premises also satisfies φ. Exponential in the number of atoms but simple.</span>',
        '<b>SAT-based.</b><span>Δ ⊨ φ iff Δ ∪ {¬φ} is unsatisfiable, so ask a SAT solver.</span>',
        '<b>Proof-based.</b><span>Use a sound and complete proof system R (Fitch, resolution) and look for a derivation Δ ⊢<sub>R</sub> φ. Resolution works on clauses of Δ ∪ {¬φ} and aims for the empty clause.</span>'
      ],
      answer: 'Three approaches: truth-table (model checking), SAT (Δ ∪ {¬φ} unsatisfiable), and proof systems such as Fitch or resolution, which are sound and complete.',
      why: '<p>All three decide the same relation. They differ in cost and in what they give you: the table and SAT can hand back a counter-model, a proof gives a checkable certificate.</p>',
      mistake: 'Calling a proof system an approximation. Sound and complete systems agree with entailment exactly.',
      vis: [{ t: 'table', head: ['Approach', 'Test for Δ ⊨ φ', 'Gives you'], rows: [['Truth table', 'every row satisfying all of Δ satisfies φ', 'a counter-model row if it fails'], ['SAT', 'Δ ∪ {¬φ} is unsatisfiable', 'a satisfying assignment if it fails'], ['Proof system (Fitch, resolution)', 'a derivation of φ from Δ (or {} from Δ ∪ {¬φ})', 'a checkable certificate']], note: 'All three decide the same relation; sound and complete systems agree with entailment exactly.' }] }
  ] });
