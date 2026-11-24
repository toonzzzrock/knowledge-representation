/* Final practice paper 3: worked answers. */
UI.examPaper({ n: 4, title: 'Final practice paper 3', sub: '13 questions, 100 marks: arguments in a news article, attacks and argumentation semantics, propositional resolution, Herbrand semantics, Prolog.',
  html: '<p class="lead">Thirteen questions in three sections. Every answer below was re-solved from the question text; the checkable ones (argumentation semantics, entailment, resolution, Herbrand models) were run by script. The two argumentation graphs in Q5 and Q4 are given as edge lists.</p>' +
    '<table><tr><th>Section</th><th>Questions</th><th>Marks</th><th>Topics</th></tr>' +
    '<tr><td>I Arguments and propositions in natural language</td><td>Q1 to Q3</td><td>10 + 5 + 10</td><td>reconstructing arguments from a news article, standard form, rebut / undermine / undercut</td></tr>' +
    '<tr><td>II Argument-based reasoning</td><td>Q4 to Q6</td><td>10 + 10 + 10</td><td>AA framework from attacks, admissible and grounded acceptance, a proof about the characteristic function</td></tr>' +
    '<tr><td>III Logic and logic programming</td><td>Q7 to Q13</td><td>5 + 5 + 5 + 5 + 5 + 10 + 10</td><td>truth table, resolution, Herbrand truth assignments, resolution with variables, Prolog and negation as failure</td></tr></table>',
  problems: [
    { label: 'Q1', marks: 10, mod: 2, title: 'Arguments in a news article about dropping the Trump cases',
      q: '<p>An article by Lauren Taylor reports that on 25 November special counsel Jack Smith moved to drop the federal charges against President-elect Trump in two cases (classified documents, and the 2020 election plot). Smith consulted the Justice Department Office of Legal Counsel, which determined that "this prosecution must be dismissed before the defendant is inaugurated". Smith wrote: "It has long been the position of the Department of Justice that the United States Constitution forbids the federal indictment and subsequent criminal prosecution of a sitting president." The dismissal is "without prejudice", so charges could be refiled after Trump leaves office in 2029. Trump\'s communications director, Stephen Cheung, said: "The American people re-elected President Trump with an overwhelming mandate ... Today\'s decision by the DOJ ends the unconstitutional federal cases against President Trump, and is a major victory for the rule of law. The American people and President Trump want an immediate end to the political weaponization of our justice system."</p><p>(a) According to the author, what argument does Jack Smith offer? Write it in standard form. (b) What argument does Trump\'s communications director present? Write it in standard form.</p>',
      hint: 'In each part find the conclusion first (the "must be" or "is a victory" sentence), then look for the stated reason, then the unstated link.',
      steps: [
        '<b>(a) Conclusion.</b><span>The prosecution of Trump must be dismissed before he is inaugurated.</span>',
        '<b>(a) Premise 1.</b><span>According to the Justice Department (Office of Legal Counsel), the Constitution forbids the federal indictment and prosecution of a sitting president.</span>',
        '<b>(a) Premise 2.</b><span>Trump will be a sitting president once he is inaugurated. (Suppressed: a prosecution that cannot continue against a sitting president must end before the inauguration.)</span>',
        '<b>(b) Conclusion.</b><span>Today\'s DOJ decision to end the cases is a victory for the rule of law.</span>',
        '<b>(b) Premise.</b><span>The federal cases against Trump are unconstitutional.</span>',
        '<b>(b) Suppressed premise.</b><span>Ending unconstitutional cases is a victory for the rule of law.</span>',
        '<b>Check.</b><span>Each argument is deductive with its suppressed premise: the conclusion follows by modus ponens.</span>'
      ],
      answer: '(a) P1: The Justice Department holds that the Constitution forbids prosecuting a sitting president. P2: Trump will be a sitting president after the inauguration. Therefore the prosecution must be dismissed before he is inaugurated. (b) P1: The federal cases against Trump are unconstitutional. P2 (implicit): ending unconstitutional cases is a victory for the rule of law. Therefore the DOJ decision to end them is a victory for the rule of law.',
      why: '<p>Standard form lists the reasons above a line and the conclusion below it. The author\'s indicator words ("must be dismissed", "is a major victory") mark the conclusions, and the quoted statements supply the reasons.</p>',
      mistake: 'Taking a quote as a premise without attribution. Smith relies on the DOJ position, so attribute it ("according to the DOJ ...").',
      paperSays: 'The paper\'s "Answer 1" (the people want to make America great again, therefore they re-elected Trump) is a stretch: the statement gives the mandate as a fact and never argues from the people\'s wish to the re-election. Answers 2 and 3 are the sound readings.',
      vis: [
        { t: 'arg', name: '(a) Jack Smith', premises: ['According to the Justice Department, the Constitution forbids the federal prosecution of a sitting president', 'Trump will be a sitting president once he is inaugurated'], concl: 'The prosecution must be dismissed before Trump is inaugurated' },
        { t: 'arg', name: '(b) Communications director', premises: ['The federal cases against Trump are unconstitutional', 'Ending unconstitutional cases is a victory for the rule of law (suppressed)'], concl: 'The DOJ decision to end the cases is a victory for the rule of law' }] },

    { label: 'Q2', marks: 5, mod: 2, title: 'Standard form of four review arguments',
      q: '<p>Write each argument in standard form (reason, then conclusion).</p><p>(a) X = "this submission has novel contributions, therefore it should be accepted". (b) Y = "This submission is not well written. It should be rejected". (c) Z = "Similar contributions were claimed in Ref 10, thus the contributions are not really novel". (d) W = "Ref 10 is not peer-reviewed, thus the claims in Ref 10 are not credible".</p>',
      hint: 'Split each sentence at its indicator word ("therefore", "thus") into reason and conclusion.',
      steps: [
        '<b>(a) X.</b><span>Reason: this submission has novel contributions. Conclusion: it should be accepted.</span>',
        '<b>(b) Y.</b><span>Reason: this submission is not well written. Conclusion: it should be rejected.</span>',
        '<b>(c) Z.</b><span>Reason: similar contributions were claimed in Ref 10. Conclusion: the contributions are not really novel.</span>',
        '<b>(d) W.</b><span>Reason: Ref 10 is not peer-reviewed. Conclusion: the claims in Ref 10 are not credible.</span>'
      ],
      answer: 'X: [novel contributions] so [should be accepted]. Y: [not well written] so [should be rejected]. Z: [similar contributions claimed in Ref 10] so [contributions not really novel]. W: [Ref 10 not peer-reviewed] so [claims in Ref 10 not credible].',
      why: '<p>An argument is a set of reasons plus a conclusion. These four are single-premise defeasible arguments: each reason makes its conclusion plausible without proving it, which is why they can be attacked in Q3.</p>',
      mistake: 'Putting the conclusion first or dropping the indicator word into the premise ("therefore it should be accepted").',
      vis: [
        { t: 'arg', name: 'X', premises: ['This submission has novel contributions'], concl: 'It should be accepted' },
        { t: 'arg', name: 'Y', premises: ['This submission is not well written'], concl: 'It should be rejected' },
        { t: 'arg', name: 'Z', premises: ['Similar contributions were claimed in Ref 10'], concl: 'The contributions are not really novel' },
        { t: 'arg', name: 'W', premises: ['Ref 10 is not peer-reviewed'], concl: 'The claims in Ref 10 are not credible' }] },

    { label: 'Q3', marks: 10, mod: 4, title: 'Attacks between X, Y, Z, W',
      q: '<p>Identify all the attacking relationships between the arguments X, Y, Z, W of Q2 (X: novel, so accept; Y: not well written, so reject; Z: similar work in Ref 10, so not novel; W: Ref 10 not peer-reviewed, so its claims are not credible). For each attack say whether it is an undermining, a rebutting or an undercutting attack.</p>',
      hint: 'For every pair, compare the conclusion of one with the conclusion, the premise, and the reason-to-conclusion link of the other.',
      steps: [
        '<b>X and Y.</b><span>Conclusions "should be accepted" and "should be rejected" contradict. Each attacks the other: a mutual <b>rebut</b>.</span>',
        '<b>Z and X.</b><span>The conclusion of Z, "the contributions are not novel", contradicts the premise of X, "has novel contributions". Z attacks X: an <b>undermine</b>.</span>',
        '<b>W and Z.</b><span>W does not deny Z\'s premise (Ref 10 did claim similar things) or Z\'s conclusion. It says Ref 10\'s claims are not credible, so the claim in Ref 10 does not support "not novel". W attacks the link: an <b>undercut</b> of Z.</span>',
        '<b>Other pairs.</b><span>Y says nothing about novelty or Ref 10, and X, Z, W do not touch Y\'s premise. X does not attack Z, Z does not attack W, W is not attacked by anything.</span>'
      ],
      answer: 'X and Y rebut each other. Z undermines X. W undercuts Z. No other attacks.',
      why: '<p>Rebut: the conclusions clash. Undermine: the conclusion of the attacker contradicts a premise of the target. Undercut: the attacker says the premises do not support the conclusion even though they may hold.</p>',
      mistake: 'Calling Z an attack on Y, or W a rebut of Z. W never says the contributions are novel.',
      vis: [{ t: 'af', nodes: ['X', 'Y', 'Z', 'W'], edges: [['X', 'Y', 'rebut'], ['Y', 'X', 'rebut'], ['Z', 'X', 'undermine'], ['W', 'Z', 'undercut']], pos: { X: [45, 55], Y: [175, 55], Z: [45, 140], W: [175, 140] },
        note: 'X and Y have contradicting conclusions; Z contradicts the premise of X; W denies that the premise of Z supports its conclusion.' }] },

    { label: 'Q4', marks: 10, mod: 4, title: 'The framework from Q3: admissible and grounded acceptance',
      q: '<p>Define the standard abstract argumentation framework F = (AR, Att) from the arguments and attacks of Q3 (X and Y rebut each other, Z undermines X, W undercuts Z). For each argument say whether it is acceptable under the admissible semantics, then under the grounded semantics. Explain carefully.</p>',
      hint: 'A mutual rebut is two attacks. Compute the grounded extension by iterating the characteristic function from the empty set.',
      steps: [
        '<b>Framework.</b><span>AR = {X, Y, Z, W}. Att = {(X, Y), (Y, X), (Z, X), (W, Z)}. Graph edges: X to Y, Y to X, Z to X, W to Z.</span>',
        '<b>Grounded.</b><span>f(∅) = {W}, the only unattacked argument. f({W}): Z is attacked by W but W has no attacker, so Z is not defended. X has attackers Y and Z, and nothing in {W} attacks Y. Y has attacker X, and nothing in {W} attacks X. So f({W}) = {W} and GE = {W}.</span>',
        '<b>Admissible sets.</b><span>Conflict-free sets that defend all their members: ∅, {W}, {Y}, {X, W}, {Y, W}. {Y}: Y is attacked by X, and Y attacks X. {X, W}: X is attacked by Y, which X attacks, and by Z, which W attacks.</span>',
        '<b>Not admissible.</b><span>{X} alone fails: Z attacks X and nothing in {X} attacks Z. Any set containing Z fails: W attacks Z, and only an argument attacking W could defend Z, but W has no attacker. {X, Y} and {X, Z} are not conflict-free.</span>',
        '<b>Admissible acceptance.</b><span>X (in {X, W}), Y (in {Y}) and W are admissibly acceptable. Z is in no admissible set: it is attacked by W and only an argument attacking W could defend it, and nothing does.</span>',
        '<b>Grounded acceptance.</b><span>Only W is groundedly acceptable.</span>'
      ],
      answer: 'F = ({X, Y, Z, W}, {(X, Y), (Y, X), (Z, X), (W, Z)}). Admissible: X, Y and W acceptable, Z not. Grounded: GE = {W}, so only W is acceptable.',
      why: '<p>W is unattacked, so it is in every semantics. X and Y rebut each other, so each can hold its ground in some admissible set (credulous), but neither is forced, so neither is in the sceptical grounded extension. Z is always defeated by the unattacked W.</p>',
      mistake: 'Dropping one direction of the X and Y rebut, or adding an attack from Y to Z that Q3 did not identify.',
      paperSays: 'The paper\'s Att = {(X, Y), (Y, Z), (Z, X), (W, Z)} does not match its own Q3: it has no (Y, X) and has an extra (Y, Z). With that relation the grounded extension would be {X, W}, not the {W} it states. The paper\'s final verdicts (X, Y, W admissible, Z not; GE = {W}) are correct for the attacks of Q3.',
      vis: [{ t: 'af', nodes: ['X', 'Y', 'Z', 'W'], edges: [['X', 'Y'], ['Y', 'X'], ['Z', 'X'], ['W', 'Z']], pos: { X: [45, 55], Y: [175, 55], Z: [45, 140], W: [175, 140] },
        ext: [{ name: 'admissible', set: ['X', 'W'] }, { name: 'admissible', set: ['Y', 'W'] }, { name: 'grounded', set: ['W'] }],
        note: 'W beats Z, which defends X against Z; X and Y each stand in some admissible set. Only the unattacked W is in the grounded extension. Z is in no admissible set.' }] },

    { label: 'Q5', marks: 10, mod: 4, title: 'Grounded and admissible extensions of a given framework',
      q: '<p>F = (AR, Att) with AR = {A, G, E, F, H, T} and Att = {(G, A), (E, G), (F, G), (H, E), (T, F), (T, H), (H, T)} (the graph: G attacks A; E and F attack G; H attacks E; T attacks F; H and T attack each other). (a) Compute the grounded extension of F. (b) List all admissible extensions of F.</p>',
      hint: 'For (a) look for an unattacked argument. For (b) first pick a side of the H and T conflict, then see what that side defends.',
      steps: [
        '<b>(a) Attackers.</b><span>A: G. G: E, F. E: H. F: T. H: T. T: H.</span>',
        '<b>(a) f(∅).</b><span>Every argument has an attacker, so none is defended by ∅: f(∅) = ∅ and GE = ∅.</span>',
        '<b>(b) Conflict-free choice.</b><span>H and T attack each other, so no admissible set has both. H attacks E, and T attacks F, so {H, E} and {T, F} are not conflict-free.</span>',
        '<b>(b) H side.</b><span>{H} defends itself against T. H also defends F (the attacker T is attacked by H). {H, F} is admissible. F attacks G, so {H, F} defends A (the only attacker G is attacked by F): {H, F, A} is admissible.</span>',
        '<b>(b) T side.</b><span>Symmetrically: {T}, {T, E} (T attacks H, the only attacker of E), and {T, E, A} (E attacks G).</span>',
        '<b>(b) Rejected sets.</b><span>{E}, {F}, {A}, {G} and sets mixing sides lack a defender or contain an attack; {H, A} fails because nothing in it attacks G; {A} alone likewise.</span>'
      ],
      answer: '(a) GE = ∅. (b) Admissible: ∅, {H}, {T}, {H, F}, {T, E}, {H, F, A}, {T, E, A}.',
      why: '<p>With no unattacked argument the grounded extension is empty. The admissible sets form two chains, one for each side of the H and T rebut, because each side defends exactly the arguments whose attackers it attacks.</p>',
      mistake: 'Putting A in an admissible set without F or E. A needs an attacker of G in the set.',
      vis: [{ t: 'af', nodes: ['A', 'G', 'E', 'F', 'H', 'T'], edges: [['G', 'A'], ['E', 'G'], ['F', 'G'], ['H', 'E'], ['T', 'F'], ['T', 'H'], ['H', 'T']],
        pos: { A: [110, 28], G: [110, 70], E: [45, 110], F: [175, 110], H: [45, 155], T: [175, 155] },
        ext: [{ name: 'admissible (largest, H side)', set: ['H', 'F', 'A'] }, { name: 'admissible (largest, T side)', set: ['T', 'E', 'A'] }, { name: 'grounded', set: [] }],
        note: 'On the H side, H beats E and T, F beats G, so A is defended. The T side is symmetric. Their subsets {H}, {H, F}, {T}, {T, E} and the empty set are also admissible.' }] },

    { label: 'Q6', marks: 10, mod: 4, title: 'f(S) is admissible when S is admissible',
      q: '<p>Prove that for any standard abstract argumentation framework F = (AR, Att), if S ⊆ AR is an admissible extension, then f<sub>F</sub>(S) = {A ∈ AR | S defends A} is also an admissible extension. (Hint: prove that f<sub>F</sub>(S) is conflict-free and that f<sub>F</sub>(S) defends every B ∈ f<sub>F</sub>(S).)</p>',
      hint: 'Both parts use that S is admissible: S is conflict-free and defends each of its members. Show S ⊆ f(S) first.',
      steps: [
        '<b>Set up.</b><span>S admissible: S is conflict-free and defends each of its members. "S defends A" means every attacker of A is attacked by some member of S.</span>',
        '<b>Conflict-free.</b><span>Suppose A, B ∈ f(S) and A attacks B.</span>',
        '<b>An attacker in S.</b><span>S defends B, so some C ∈ S attacks A (A is an attacker of B).</span>',
        '<b>A counter-attacker in S.</b><span>S defends A, so some D ∈ S attacks C.</span>',
        '<b>Contradiction.</b><span>C, D ∈ S and D attacks C, so S is not conflict-free. This contradicts admissibility of S. Hence f(S) is conflict-free.</span>',
        '<b>S is inside f(S).</b><span>S defends all its own members, so S ⊆ f(S).</span>',
        '<b>f(S) defends its members.</b><span>Let B ∈ f(S). Then S defends B: every attacker of B is attacked by a member of S. As S ⊆ f(S), that member is in f(S). So f(S) defends B.</span>',
        '<b>Conclude.</b><span>f(S) is conflict-free and defends each of its members, so it is admissible.</span>'
      ],
      answer: 'f(S) is conflict-free (otherwise S would contain an attacking pair C, D) and defends each of its members (S defends B and S ⊆ f(S)), so f(S) is admissible.',
      why: '<p>This is why iterating f from an admissible set stays admissible, and it is the step behind the grounded extension being admissible. Admissibility gives two facts: S is conflict-free and S defends its members.</p>',
      mistake: 'Using "f(S) defends A" in the first step. To get C ∈ S attacking A, use that S defends B, the argument A attacks.',
      paperSays: 'The idea is right, but the first step says "f(S) defends A, so some C ∈ S attacks A". The attacker C comes from S defending B (the target of A). The second use of "S defends A" to get D is correct.',
      vis: [{ t: 'af', title: 'the conflict-free step', nodes: ['D', 'C', 'A', 'B'], edges: [['D', 'C'], ['C', 'A'], ['A', 'B']], pos: { D: [30, 95], C: [80, 95], A: [130, 95], B: [180, 95] },
        note: 'A and B are in f(S) and A attacks B. S defends B, so C in S attacks A; S defends A, so D in S attacks C. Then C and D are both in S and D attacks C, so S is not conflict-free: contradiction.' }] },

    { label: 'Q7', marks: 5, mod: 5, title: 'Truth table for {p ∨ q, q ∨ s, p → ¬s, s → ¬p} and q',
      q: '<p>Complete the truth table, then explain whether <span class="m">{p ∨ q, q ∨ s, p → ¬s, s → ¬p} ⊨ q</span>.</p>',
      hint: 'Mark the rows where all four premises are true and read the column of q on those rows.',
      steps: [
        '<b>Table.</b><span>Columns p, q, s, then the four premises, then q.<pre>p q s   p∨q  q∨s  p→¬s  s→¬p   q\n1 1 1    1    1    0     0     1\n1 1 0    1    1    1     1     1\n1 0 1    1    1    0     0     0\n1 0 0    1    0    1     1     0\n0 1 1    1    1    1     1     1\n0 1 0    1    1    1     1     1\n0 0 1    0    1    1     1     0\n0 0 0    0    0    1     1     0</pre></span>',
        '<b>Rows with all premises true.</b><span>(1,1,0), (0,1,1), (0,1,0).</span>',
        '<b>Read q.</b><span>q = 1 in all three.</span>'
      ],
      answer: 'Yes. The premises are all true only in (p,q,s) = (1,1,0), (0,1,1), (0,1,0), and q is true in each, so the premises entail q.',
      why: '<p>Entailment is "every model of the premises is a model of the conclusion". The three rows are all the models; q holds in each.</p>',
      mistake: 'Checking rows where q is false and forgetting to confirm each makes some premise false (the rows 101, 100, 001, 000 do).',
      vis: [{ t: 'table', head: ['p', 'q', 's', 'p ∨ q', 'q ∨ s', 'p → ¬s', 's → ¬p', 'q'], rows: [[1, 1, 1, 1, 1, 0, 0, 1], [1, 1, 0, 1, 1, 1, 1, 1], [1, 0, 1, 1, 1, 0, 0, 0], [1, 0, 0, 1, 0, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 1, 1, 1, 1], [0, 0, 1, 0, 1, 1, 1, 0], [0, 0, 0, 0, 0, 1, 1, 0]],
        hl: { 1: 'ok', 4: 'ok', 5: 'ok' }, note: 'Green: the three rows where all four premises are 1. q is 1 on each; every row with q = 0 falsifies some premise.' }],
      tryit: { w: 'entail', say: 'Check the entailment in the tool:', cfg: { title: 'ENTAILMENT CHECK', delta: ['p | q', 'q | s', 'p -> ~s', 's -> ~p'], phi: 'q' } } },

    { label: 'Q8', marks: 5, mod: 5, title: 'Resolution proof that the same set entails q',
      q: '<p>Use the resolution proof system to prove that <span class="m">{p ∨ q, q ∨ s, p → ¬s, s → ¬p} ⊨ q</span>.</p>',
      hint: 'Clausal form of the premises, add the negation of q, and resolve on p, then s.',
      steps: [
        '<b>Clauses.</b><span>{p, q}, {q, s}, {¬p, ¬s}. The fourth premise <span class="m">s → ¬p</span> gives the same clause {¬s, ¬p}.</span>',
        '<b>Negated goal.</b><span>{¬q}.</span>',
        '<b>Resolve.</b><span><pre>1  {p, q}     Premise\n2  {q, s}     Premise\n3  {¬p, ¬s}   Premise\n4  {¬q}       Negated goal\n5  {q, ¬s}    Resolution: 1, 3   (on p)\n6  {q}        Resolution: 2, 5   (on s)\n7  {}         Resolution: 6, 4   (on q)</pre></span>'
      ],
      answer: 'The empty clause is derived in seven lines, so the premises entail q.',
      why: '<p>Resolution is refutation-complete: the clause set of the premises plus the negated goal is unsatisfiable exactly when entailment holds.</p>',
      mistake: 'Resolving on two literals at once (for example p and q together). Cancel one complementary pair per step.',
      vis: [{ t: 'tree', nodes: [{ id: 1, text: '{p, q}' }, { id: 2, text: '{q, s}' }, { id: 3, text: '{¬p, ¬s}' }, { id: 4, text: '{¬q}' },
        { id: 5, text: '{q, ¬s}', from: [1, 3], note: 'on p' }, { id: 6, text: '{q}', from: [2, 5], note: 'on s' }, { id: 7, text: '{}', from: [6, 4], note: 'on q' }] }],
      tryit: { w: 'refute', say: 'Run the same proof in the workbench:', cfg: { title: 'REFUTATION', mode: 'prop', premises: ['p | q', 'q | s', 'p -> ~s', 's -> ~p'], goal: 'q' } } },

    { label: 'Q9', marks: 5, mod: 7, title: 'Models of two quantified sentences over HU = {a}',
      q: '<p>Signature Σ = {a, p/1, q/1}, so HB = {p(a), q(a)} and there are four truth assignments: i0 = (p(a) 0, q(a) 0), i1 = (0, 1), i2 = (1, 0), i3 = (1, 1). For each sentence enumerate M(φ) = {i | i satisfies φ}. (a) <span class="m">∀x.(p(x) → q(x))</span>. (b) <span class="m">∃x.(q(x) → p(x))</span>.</p>',
      hint: 'The Herbrand universe is just {a}, so each quantified sentence has a single ground instance.',
      steps: [
        '<b>Instances.</b><span>HU = {a}. Both ∀x and ∃x range over a alone.</span>',
        '<b>(a) Ground form.</b><span><span class="m">p(a) → q(a)</span>. It is false only when p(a) = 1 and q(a) = 0, which is i2.</span>',
        '<b>(a) Models.</b><span>M = {i0, i1, i3}.</span>',
        '<b>(b) Ground form.</b><span><span class="m">q(a) → p(a)</span>. It is false only when q(a) = 1 and p(a) = 0, which is i1.</span>',
        '<b>(b) Models.</b><span>M = {i0, i2, i3}.</span>'
      ],
      answer: '(a) {i0, i1, i3}. (b) {i0, i2, i3}.',
      why: '<p>In Herbrand semantics a universal sentence is true when all its ground instances are, an existential when at least one is. With one constant both collapse to the single instance.</p>',
      mistake: 'In (b), evaluating p(a) → q(a) instead of q(a) → p(a).',
      paperSays: 'The answers are right, but the explanation of (b) says the sentence is true iff "p(a) → q(a)" is true. The instance is q(a) → p(a).',
      vis: [{ t: 'table', head: ['', 'p(a)', 'q(a)', '∀x.(p → q): p(a) → q(a)', '∃x.(q → p): q(a) → p(a)'], rows: [['i0', 0, 0, 1, 1], ['i1', 0, 1, 1, 0], ['i2', 1, 0, 0, 1], ['i3', 1, 1, 1, 1]], hl: { 2: 'bad', 1: 'bad' },
        note: 'M(a) = {i0, i1, i3} (only i2 falsifies it); M(b) = {i0, i2, i3} (only i1 falsifies it).' }] },

    { label: 'Q10', marks: 5, mod: 7, title: 'Resolution with variables: ∀x(p → q) entails ∀x p → ∀x q',
      q: '<p>Use the resolution proof system to prove that <span class="m">{∀x.(p(x) → q(x))} ⊨ ∀x.p(x) → ∀x.q(x)</span>.</p>',
      hint: 'Negate the goal, convert to clauses (the ∃ from the negation needs a Skolem constant), then resolve with a unifier.',
      steps: [
        '<b>Premise clause.</b><span>{¬p(X), q(X)}.</span>',
        '<b>Negate the goal.</b><span><span class="m">¬(∀x.p(x) → ∀x.q(x))</span> is <span class="m">∀x.p(x) ∧ ¬∀x.q(x)</span>, that is <span class="m">∀x.p(x) ∧ ∃x.¬q(x)</span>.</span>',
        '<b>Skolemize.</b><span>Replace the ∃ variable by a new constant c. Clauses: {p(X)} and {¬q(c)}.</span>',
        '<b>Resolve.</b><span><pre>1  {¬p(X), q(X)}   Premise\n2  {p(X)}          Negated goal\n3  {¬q(c)}         Negated goal (c is a Skolem constant)\n4  {q(X)}          Resolution: 1, 2\n5  {}              Resolution: 4, 3   with unifier X = c</pre></span>'
      ],
      answer: 'The empty clause is derived (above), so the entailment holds.',
      why: '<p>Resolution with variables is refutation-complete for predicate logic. The ∃ in the negated goal gets a fresh Skolem constant (a function with no arguments), so the one unification step X = c closes the proof.</p>',
      mistake: 'Negating without the quantifier switch: the negation of ∀x.q(x) is ∃x.¬q(x), not ∀x.¬q(x).',
      vis: [{ t: 'tree', nodes: [{ id: 1, text: '{¬p(X), q(X)}' }, { id: 2, text: '{p(X)}' }, { id: 3, text: '{¬q(c)}' }, { id: 4, text: '{q(X)}', from: [1, 2], note: 'on p' }, { id: 5, text: '{}', from: [4, 3], note: 'X = c' }] }],
      tryit: { w: 'refute', say: 'Run the search in the workbench:', cfg: { title: 'REFUTATION', mode: 'fol', premises: ['forall x. (p(x) -> q(x))'], goal: '(forall x. p(x)) -> (forall x. q(x))' } } },

    { label: 'Q11', marks: 5, mod: 7, title: 'Checking the same entailment in Prolog',
      q: '<p>Is it possible to use Prolog to check <span class="m">{∀x.(p(x) → q(x))} ⊨ ∀x.p(x) → ∀x.q(x)</span>? If yes, write a Prolog program and a query. If no, explain why carefully.</p>',
      hint: 'Use the fact that Δ ∪ {φ} ⊨ ψ exactly when Δ ⊨ φ → ψ, and write both premises as program clauses.',
      steps: [
        '<b>Move the antecedent.</b><span>Δ ⊨ ∀x.p(x) → ∀x.q(x) iff Δ ∪ {∀x.p(x)} ⊨ ∀x.q(x).</span>',
        '<b>Premises as Horn clauses.</b><span>∀x.(p(x) → q(x)) is the rule <span class="m">q(X) :- p(X).</span> and ∀x.p(x) is the fact <span class="m">p(X).</span> Both are Horn clauses, so Prolog can use them.</span>',
        '<b>Program.</b><span><pre>q(X) :- p(X).\np(X).</pre></span>',
        '<b>Query.</b><span><span class="m">?- q(X).</span> Prolog answers true with X unbound, meaning q holds for every X. The query <span class="m">?- q(a).</span> for a fresh constant a also answers true.</span>',
        '<b>Conclude.</b><span>The program proves ∀x.q(x) from {∀x.(p(x) → q(x)), ∀x.p(x)}, hence the entailment.</span>'
      ],
      answer: 'Yes. Program: q(X) :- p(X). and p(X). Query: ?- q(X). (true). This shows {∀x.(p(x) → q(x)), ∀x.p(x)} ⊨ ∀x.q(x), hence {∀x.(p(x) → q(x))} ⊨ ∀x.p(x) → ∀x.q(x).',
      why: '<p>Prolog proves queries from Horn clauses by SLD resolution. It cannot take an implication as the goal, but the deduction theorem moves the antecedent into the program, and an answer with no binding for X is a proof for every X.</p>',
      mistake: 'Putting ∀x.p(x) → ∀x.q(x) in the query. Prolog queries are conjunctions of atoms.',
      vis: [{ t: 'tree', title: 'SLD derivation of ?- q(X).', nodes: [{ id: 1, text: '{q(X), ¬p(X)}' }, { id: 2, text: '{p(X)}' }, { id: 3, text: '{¬q(X)}' }, { id: 4, text: '{¬p(X)}', from: [3, 1], note: 'rule q(X) :- p(X)' }, { id: 5, text: '{}', from: [4, 2], note: 'fact p(X)' }],
        note: 'Leaves: the rule, the fact, and the query as a negated goal. The empty clause means the query succeeds.' }] },

    { label: 'Q12', marks: 10, mod: 7, title: 'Prolog answers with negation as failure',
      q: '<p>Prolog program: <span class="m">single(X) :- student(X).</span> <span class="m">youngAdult(X) :- student(X).</span> <span class="m">adult(X) :- youngAdult(X).</span> <span class="m">married(X) :- adult(X), \\+ single(X).</span> <span class="m">student(alex).</span></p><p>(a) What is the Prolog response to <span class="m">?- single(alex).</span>? Explain why. (b) What is the response to <span class="m">?- married(alex).</span>? Explain why.</p>',
      hint: 'Run the goals by hand: match a clause head, replace the goal by the body, and treat \\+ as "the goal cannot be proved".',
      steps: [
        '<b>(a) Match.</b><span>single(alex) matches the head of rule 1 with X = alex. The new goal is student(alex).</span>',
        '<b>(a) Fact.</b><span>student(alex) is a fact, so the goal succeeds. Response: <b>true</b>.</span>',
        '<b>(b) Match.</b><span>married(alex) matches rule 4 with X = alex. Goals: adult(alex), then \\+ single(alex).</span>',
        '<b>(b) adult(alex).</b><span>adult(alex) needs youngAdult(alex), which needs student(alex): a fact. So adult(alex) succeeds.</span>',
        '<b>(b) Negation.</b><span>\\+ single(alex) succeeds only if single(alex) fails. By (a) single(alex) succeeds, so \\+ single(alex) fails.</span>',
        '<b>(b) No other clause.</b><span>married has only this rule, so there is no alternative. Response: <b>false</b>.</span>'
      ],
      answer: '(a) true: single(alex) follows from rule 1 and the fact student(alex). (b) false: adult(alex) holds but \\+ single(alex) fails because single(alex) is provable.',
      why: '<p>Prolog evaluates a goal by SLD resolution. The operator \\+ is negation as failure: \\+ G succeeds when G cannot be proved, which is a closed-world reading and is not classical negation.</p>',
      mistake: 'Reading \\+ single(alex) as "alex is not single" from outside the program. It only asks whether single(alex) can be proved.',
      vis: [
        { t: 'tree', title: '(a) ?- single(alex). succeeds', nodes: [{ id: 1, text: '{single(X), ¬student(X)}' }, { id: 2, text: '{student(alex)}' }, { id: 3, text: '{¬single(alex)}' }, { id: 4, text: '{¬student(alex)}', from: [3, 1], note: 'rule 1' }, { id: 5, text: '{}', from: [4, 2], note: 'fact' }] },
        { t: 'table', title: '(b) ?- married(alex). evaluated left to right', head: ['Goal', 'Why', 'Result'], rows: [['adult(alex)', 'youngAdult, then student(alex) is a fact', 'true'], ['single(alex)', 'follows from rule 1 and student(alex)', 'true'], ['\\+ single(alex)', 'succeeds only if single(alex) fails', 'fails'], ['married(alex)', 'its only rule needs \\+ single(alex)', 'false']], hl: { 0: 'ok', 1: 'ok', 2: 'bad', 3: 'bad' } }] },

    { label: 'Q13', marks: 10, mod: 7, title: 'Does the knowledge base entail married(alex)?',
      q: '<p>Knowledge base Δ in predicate logic: <span class="m">∀X.(single(X) ← student(X))</span>, <span class="m">∀X.(youngAdult(X) ← student(X))</span>, <span class="m">∀X.(adult(X) ← youngAdult(X))</span>, <span class="m">∀X.(married(X) ← adult(X) ∧ ¬single(X))</span>, <span class="m">student(alex)</span>. Does Δ logically entail married(alex)? If yes, prove it by resolution. If no, give a truth assignment that satisfies Δ but not married(alex).</p>',
      hint: 'The only constant is alex, so the Herbrand universe is {alex} and each rule has one ground instance. Try to make married(alex) false.',
      steps: [
        '<b>Herbrand setup.</b><span>HU = {alex}. HB = {single(alex), student(alex), youngAdult(alex), adult(alex), married(alex)}.</span>',
        '<b>Ground instances.</b><span>single ← student; youngAdult ← student; adult ← youngAdult; married ← adult ∧ ¬single; student. (All with alex.)</span>',
        '<b>Forced atoms.</b><span>student(alex) is true, so single, youngAdult and adult (alex) must be true.</span>',
        '<b>The last rule.</b><span>With adult(alex) = 1 and single(alex) = 1, the body adult ∧ ¬single is false, so the rule is true whatever married(alex) is.</span>',
        '<b>Truth assignment.</b><span>i: married(alex) = 0, and the other four atoms = 1. Check all five sentences: student true; single ← student true (1 ← 1); youngAdult ← student true; adult ← youngAdult true; married ← adult ∧ ¬single true (body is 0).</span>',
        '<b>Conclude.</b><span>i satisfies Δ and falsifies married(alex), so Δ does not entail married(alex). No refutation exists, so resolution cannot prove it.</span>'
      ],
      answer: 'No. Take HU = {alex} and the assignment married(alex) = 0, with single(alex), student(alex), youngAdult(alex) and adult(alex) all = 1. It satisfies every sentence of Δ but not married(alex).',
      why: '<p>Entailment needs married(alex) to hold in every model. One model where it fails (a counter-model) settles the answer. Since single(alex) is forced true by student(alex), the body ¬single(alex) of the last rule is false, so the rule never forces married(alex).</p>',
      mistake: 'Treating ¬single(alex) as available. single(alex) is forced true by student(alex), so the body of the last rule is false and married(alex) is never forced.',
      vis: [{ t: 'table', title: 'counter-model: student = single = youngAdult = adult = 1, married = 0 (all for alex)', head: ['Sentence of Δ', 'body', 'head', 'sentence true?'], rows: [['student(alex)', '-', 1, 1], ['single ← student', 1, 1, 1], ['youngAdult ← student', 1, 1, 1], ['adult ← youngAdult', 1, 1, 1], ['married ← adult ∧ ¬single', 0, 0, 1]], hl: { 4: 'bad' },
        note: 'Every sentence of Δ is true, yet married(alex) = 0. The last rule has a false body (¬single is 0), so it never forces married(alex).' }],
      tryit: { w: 'refute', say: 'The search should report that no refutation exists:', cfg: { title: 'NOT ENTAILED', mode: 'fol', premises: ['forall X. (student(X) -> single(X))', 'forall X. (student(X) -> youngAdult(X))', 'forall X. (youngAdult(X) -> adult(X))', 'forall X. ((adult(X) & ~single(X)) -> married(X))', 'student(alex)'], goal: 'married(alex)' } } }
  ] });
