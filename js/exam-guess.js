/* Predicted final (a guess): worked answers. */
UI.examPaper({ n: 6, title: 'Predicted final (a guess)', sub: '13 questions, 100 marks: a new paper built from how often each question type appeared.',
  html: '<p class="lead">This paper is a prediction made from the four practice papers. It is not the real exam.</p>' +
    '<p>Every question is a fresh instance of a type that appeared before: new names, new atoms, new graph. The layout follows paper 4, the most recent shape. The table shows the evidence: for each type, in how many of the four practice finals it appeared and its average marks per paper. A type that appeared in more papers got a question here first; the types that appeared in one paper only (Prolog, ProbLog) share section IV, as in paper 4.</p>' +
    '<table><tr><th>Question type</th><th>Appeared in</th><th>Average marks</th><th>Used here</th></tr>' +
    '<tr><td>af-extensions</td><td>4/4 papers</td><td>12.5</td><td>Q4</td></tr>' +
    '<tr><td>af-proof</td><td>4/4 papers</td><td>10</td><td>Q5</td></tr>' +
    '<tr><td>fol-resolution</td><td>3/4 papers</td><td>12.5</td><td>Q10</td></tr>' +
    '<tr><td>structured-arg</td><td>3/4 papers</td><td>11.25</td><td>Q6</td></tr>' +
    '<tr><td>article</td><td>3/4 papers</td><td>6.25</td><td>not used: Q2 and Q3 test the same skills on short texts</td></tr>' +
    '<tr><td>standard-form</td><td>3/4 papers</td><td>5</td><td>Q2</td></tr>' +
    '<tr><td>fitch</td><td>3/4 papers</td><td>5</td><td>Q8</td></tr>' +
    '<tr><td>categorical</td><td>3/4 papers</td><td>3.75</td><td>Q1</td></tr>' +
    '<tr><td>truth-table</td><td>3/4 papers</td><td>3.75</td><td>Q7</td></tr>' +
    '<tr><td>prop-resolution</td><td>3/4 papers</td><td>3.75</td><td>Q9</td></tr>' +
    '<tr><td>attacks</td><td>2/4 papers</td><td>3.75</td><td>Q3</td></tr>' +
    '<tr><td>essay-logic</td><td>2/4 papers</td><td>2.5</td><td>not used: short essays, not in the paper 4 shape</td></tr>' +
    '<tr><td>symbolic-form</td><td>1/4 papers</td><td>5</td><td>not used</td></tr>' +
    '<tr><td>prolog</td><td>1/4 papers</td><td>3.75</td><td>Q11</td></tr>' +
    '<tr><td>prop-meta-proof</td><td>1/4 papers</td><td>2.5</td><td>not used</td></tr>' +
    '<tr><td>fol-modelling</td><td>1/4 papers</td><td>2.5</td><td>not used</td></tr>' +
    '<tr><td>bayes-to-problog</td><td>1/4 papers</td><td>2.5</td><td>Q12</td></tr>' +
    '<tr><td>problog-output</td><td>1/4 papers</td><td>2.5</td><td>Q13</td></tr>' +
    '<tr><td>essay-arg</td><td>1/4 papers</td><td>1.25</td><td>not used</td></tr>' +
    '<tr><td>indo</td><td>1/4 papers</td><td>1.25</td><td>Q9 (the clauses come first)</td></tr>' +
    '<tr><td>herbrand</td><td>1/4 papers</td><td>1.25</td><td>not used</td></tr></table>' +
    '<table><tr><th>Section</th><th>Questions</th><th>Marks</th><th>Topics</th></tr>' +
    '<tr><td>I</td><td>Q1 to Q3</td><td>15</td><td>categorical syllogism, standard form, attack types</td></tr>' +
    '<tr><td>II</td><td>Q4 to Q6</td><td>35</td><td>extensions, a proof about semantics, structured arguments</td></tr>' +
    '<tr><td>III</td><td>Q7 to Q10</td><td>30</td><td>truth table, Fitch, INDO and resolution, first-order resolution</td></tr>' +
    '<tr><td>IV</td><td>Q11 to Q13</td><td>20</td><td>Prolog, Bayesian network to ProbLog, ProbLog output</td></tr></table>',
  problems: [
    { label: 'Q1', marks: 5, mod: 3, title: 'A syllogism with a negative premise (appeared in 3/4 papers)',
      vis: [
        { t: 'venn', title: 'The reason: no G is H, some K is G', labels: ['G', 'H', 'K'], empty: ['110', '111'], some: ['101'], note: 'G and H is shaded, so the cross for "some K is G" is forced into G and K only.' },
        { t: 'venn', title: 'The conclusion: some K is not H', labels: ['G', 'H', 'K'], empty: [], some: ['?01'], note: 'It asks for a cross in K outside H (on the G line: K only or G and K only). The reason has its cross in G and K only, so the argument is deductive.' }],
      q: '<p>The argument is made from categorical propositions. Draw a Venn diagram of its reason, a Venn diagram of its conclusion, and decide whether it is deductive.</p><p>No G is H. Some K is G. Hence some K is not H.</p>',
      hint: 'Draw the three circles G, H, K (eight regions). Draw both premises in one diagram, then ask whether the conclusion is already drawn in it.',
      steps: [
        '<b>Regions.</b><span>Three circles give eight regions. Shading a region means it is empty. A cross means something is in it, and a cross on a line means it is in one of the two regions beside the line.</span>',
        '<b>Reason, first premise.</b><span>"No G is H" shades the two regions inside both G and H: G and H only, and all three.</span>',
        '<b>Reason, second premise.</b><span>"Some K is G" puts a cross in the part of K that lies inside G. That part has two regions: G and K only, and all three. All three is already shaded, so the cross is forced into G and K only.</span>',
        '<b>Conclusion.</b><span>"Some K is not H" needs a cross inside K and outside H. The regions that qualify are K only and G and K only.</span>',
        '<b>Verdict.</b><span>The cross of the reason sits in G and K only, which is inside K and outside H. The reason already draws the conclusion, so the argument is deductive.</span>'],
      answer: 'Deductive. The reason puts a cross in the region G and K only (inside K, outside H), which is what the conclusion asks for.',
      why: '<p>An argument is deductive when the diagram of the reason already contains the diagram of the conclusion. The shading from the negative premise is what pushes the cross out of the all-three region.</p>',
      mistake: 'Leaving the cross on the line between G and K only and all three, and then saying the conclusion is not drawn. The shaded region cannot hold a cross, so the cross is not free to sit there.' },
    { label: 'Q2', marks: 5, mod: 2, title: 'Suppressed premises in the server-log argument (appeared in 3/4 papers)',
      vis: [{ t: 'arg', premises: ['The server logs show no login by Ploy after midnight.', '(suppressed) The files were deleted after midnight.', '(suppressed) Anyone who deleted the files after midnight must have logged in after midnight.', '(suppressed) Every login after midnight appears in the server logs.'], concl: 'Ploy did not delete the files.', note: 'Drop any one suppressed premise and Ploy could still have deleted the files.' }],
      q: '<p>Write the following argument in standard form, adding the suppressed premises that make it deductive. Number the premises and mark the conclusion.</p><p>"The server logs show no login by Ploy after midnight. So Ploy did not delete the files."</p>',
      hint: 'Ask what else must be true for the log to settle the matter: when were the files deleted, and what does deleting them require?',
      steps: [
        '<b>Stated parts.</b><span>Premise: the server logs show no login by Ploy after midnight. Conclusion: Ploy did not delete the files.</span>',
        '<b>The gap.</b><span>The log says nothing about the files. We need the time of the deletion and what a deletion needs.</span>',
        '<b>Suppressed premise 1.</b><span>The files were deleted after midnight.</span>',
        '<b>Suppressed premise 2.</b><span>Anyone who deleted the files after midnight must have logged in after midnight.</span>',
        '<b>Suppressed premise 3.</b><span>Every login after midnight appears in the server logs. Without it, "the logs show no login" does not mean "there was no login".</span>',
        '<b>Check.</b><span>Take Ploy. If she had deleted the files, then by suppressed premise 2 she logged in after midnight, and by suppressed premise 3 that login would appear in the logs. The stated premise says it does not. So she did not delete them. The conclusion follows from the four premises together.</span>'],
      answer: '1. The server logs show no login by Ploy after midnight. 2. (suppressed) The files were deleted after midnight. 3. (suppressed) Anyone who deleted the files after midnight must have logged in after midnight. 4. (suppressed) Every login after midnight appears in the server logs. Conclusion: Ploy did not delete the files.',
      why: '<p>A suppressed premise is one the arguer leaves unsaid but needs. We add the weakest sentences that make the step valid, and no more. All three added sentences are needed: drop any one and Ploy could still have deleted the files.</p>',
      mistake: 'Adding only "Ploy is innocent", which is the conclusion itself. Or adding the two premises about the deletion but forgetting that the logs must record every login: "no login in the logs" and "no login" are different claims.' },
    { label: 'Q3', marks: 5, mod: 2, title: 'Rebut, undermine or undercut (appeared in 2/4 papers)',
      vis: [
        { t: 'arg', name: 'A', premises: ['P1: Lek works at the city planning office.', 'P2: Lek says the tram line will open in March.', 'Link: what someone at the planning office says about openings is reliable.'], concl: 'The tram line will open in March.', note: '(a) hits the conclusion, (b) hits P1, (c) hits the link.' },
        { t: 'af', nodes: ['A', 'a', 'b', 'c'], edges: [['a', 'A', 'rebut'], ['b', 'A', 'undermine'], ['c', 'A', 'undercut']], pos: { A: [110, 95], a: [35, 40], b: [185, 40], c: [110, 160] }, note: 'Each text attacks A at a different place, so one text gives one type.' }],
      q: '<p>Argument A: "Lek works at the city planning office and says the new tram line will open in March. So the tram line will open in March."</p><p>For each text below, say whether it attacks A and, if so, whether it is a rebut, an undermine or an undercut.</p><p>(a) "The contractor reports that the tracks will not be finished before June, so the tram line will not open in March."</p><p>(b) "Lek does not work at the planning office. Lek works at the water department."</p><p>(c) "The planning office only knows the published schedule, not the progress on site, so what someone there says is no sign of when the line really opens."</p>',
      hint: 'Ask what each text contradicts: the conclusion of A, a premise of A, or the link that takes the premise to the conclusion.',
      steps: [
        '<b>A in standard form.</b><span>Premise 1: Lek works at the city planning office. Premise 2: Lek says the line will open in March. Conclusion: the tram line will open in March. The link is "what someone at the planning office says about openings is reliable".</span>',
        '<b>(a).</b><span>Its conclusion is the negation of the conclusion of A. It leaves the premises alone. This is a rebut.</span>',
        '<b>(b).</b><span>It denies premise 1 of A and says nothing about the conclusion. This is an undermine.</span>',
        '<b>(c).</b><span>It does not deny that Lek works there, nor that the line opens in March. It denies that the premises give a reason for the conclusion. This is an undercut.</span>'],
      answer: '(a) rebut. (b) undermine. (c) undercut. All three attack A.',
      why: '<p>A rebut attacks the conclusion, an undermine attacks a premise, an undercut attacks the inference step between them. Each text hits a different part of the argument, so one text maps to one type.</p>',
      mistake: 'Calling (c) a rebut because it sounds negative. A rebut must contradict the conclusion, and (c) leaves the conclusion open.' },
    { label: 'Q4', marks: 15, mod: 4, title: 'Grounded, complete, preferred and stable extensions of a framework (appeared in 4/4 papers)',
      vis: [{ t: 'af', nodes: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        edges: [['a', 'g'], ['b', 'c'], ['c', 'a'], ['c', 'b'], ['e', 'f'], ['e', 'g'], ['f', 'd'], ['g', 'a'], ['g', 'f']],
        pos: { d: [30, 35], f: [90, 35], e: [150, 35], g: [150, 95], a: [90, 95], b: [30, 155], c: [90, 155] },
        ext: [{ name: 'grounded', set: ['d', 'e'] }, { name: 'preferred and stable', set: ['a', 'b', 'd', 'e'] }, { name: 'preferred and stable', set: ['c', 'd', 'e'] }],
        note: 'e unattacked defends d against f. With b, a is defended against c; with c in, c itself knocks out a and b. Every outsider is red in both stable sets.' }],
      q: '<p>Let <span class="m">AR = {a, b, c, d, e, f, g}</span> and <span class="m">Att = {(a,g), (b,c), (c,a), (c,b), (e,f), (e,g), (f,d), (g,a), (g,f)}</span>, where <span class="m">(x,y)</span> means x attacks y.</p><p>Compute (a) the grounded extension (3 marks), (b) all complete extensions (4 marks), (c) all preferred extensions (4 marks), (d) all stable extensions (4 marks).</p>',
      hint: 'List who attacks whom first. Start the grounded extension from the unattacked arguments. Then split on the only mutual attack, b and c.',
      steps: [
        '<b>Attackers.</b><span>a: c, g. b: c. c: b. d: f. e: none. f: e, g. g: a, e.</span>',
        '<b>(a) Grounded.</b><span>f(∅) = {e}, the unattacked argument. f({e}) = {d, e}: e attacks f, the only attacker of d. f({d, e}) = {d, e}: nothing else is defended, since the attacks on a, b, c, g are not answered by d or e. Grounded = {d, e}.</span>',
        '<b>(b) Split on b and c.</b><span>Every complete extension contains {d, e}. Take neither b nor c: {d, e} itself is complete, because a would need both of its attackers c and g attacked, and nothing in {d, e} attacks c. Take b: b attacks c, e attacks g, so a is defended and enters: {a, b, d, e}. Take c: c attacks a and b, and nothing else becomes defended: {c, d, e}.</span>',
        '<b>(b) Complete.</b><span>{d, e}, {a, b, d, e}, {c, d, e}. The set {b, d, e} is admissible but not complete: it defends a, so a must be in.</span>',
        '<b>(c) Preferred.</b><span>The maximal admissible sets: {a, b, d, e} and {c, d, e}.</span>',
        '<b>(d) Stable.</b><span>A stable set is conflict-free and attacks every argument outside it. {a, b, d, e} attacks c (by b), f (by e), g (by a and e). {c, d, e} attacks a and b (by c), f and g (by e). {d, e} fails: nothing in it attacks a, b or c.</span>'],
      answer: '(a) {d, e}. (b) {d, e}, {a, b, d, e}, {c, d, e}. (c) {a, b, d, e} and {c, d, e}. (d) {a, b, d, e} and {c, d, e}.',
      why: '<p>The grounded extension is the least fixed point of the characteristic function. A complete extension is a fixed point, so it contains the grounded one. Preferred extensions are the maximal admissible sets. A stable extension attacks everything outside it.</p>',
      mistake: 'Writing {b, d, e} or {a, d, e} as complete. A complete set contains every argument it defends, so b with d and e forces a in.' },
    { label: 'Q5', marks: 10, mod: 4, title: 'Every stable extension is a preferred extension (appeared in 4/4 papers)',
      vis: [
        { t: 'arg', name: '(a) Proof', premises: ['S is stable: conflict-free, and it attacks every argument outside S.', 'An attacker x of a member of S is outside S (S is conflict-free), so some member of S attacks x: S is admissible.', 'If S is strictly inside an admissible T, a member b of T outside S is attacked by some s in S, and s, b are both in T: T is not conflict-free.'], concl: 'No admissible set strictly contains S, so S is a maximal admissible set: preferred.' },
        { t: 'af', title: '(b) one self-attacking argument', nodes: ['a'], edges: [['a', 'a']], pos: { a: [110, 120] }, ext: [{ name: 'preferred', set: [] }], note: 'The empty set is the only admissible set, so it is preferred. a is outside it and nothing in it attacks a, so it is not stable.' },
        { t: 'af', title: '(b) the three-cycle', nodes: ['a', 'b', 'c'], edges: [['a', 'b'], ['b', 'c'], ['c', 'a']], ext: [{ name: 'preferred', set: [] }], note: 'Also preferred with an empty set and no stable extension.' }],
      q: '<p>Let <span class="m">F = (AR, Att)</span> be an argumentation framework. (a) (7 marks) Prove that every stable extension of F is a preferred extension. (b) (3 marks) Give a framework with a preferred extension that is not stable.</p>',
      hint: 'A stable set attacks everything outside it. Use that twice: once to show it defends its members, once to show nothing bigger can be admissible.',
      steps: [
        '<b>(a) Setup.</b><span>Let S be stable: conflict-free, and every argument outside S is attacked by some member of S. We show S is admissible and maximal among admissible sets.</span>',
        '<b>(a) S is admissible.</b><span>S is conflict-free. Let x attack some member of S. Since S is conflict-free, x is not in S. By stability some member of S attacks x. So S defends all its members.</span>',
        '<b>(a) S is maximal.</b><span>Suppose S ⊂ T with T admissible, and take b in T but not in S. By stability some s in S attacks b. Then s and b are both in T, and s attacks b, which contradicts that T is conflict-free. So no admissible set strictly contains S.</span>',
        '<b>(a) Conclusion.</b><span>S is a maximal admissible set, so it is preferred.</span>',
        '<b>(b) Counter-example.</b><span>Take <span class="m">AR = {a}</span> and <span class="m">Att = {(a,a)}</span>. The only admissible set is ∅, so ∅ is preferred. It is not stable: a is outside ∅ and nothing in ∅ attacks it.</span>',
        '<b>(b) Another one.</b><span>A three-cycle a attacks b, b attacks c, c attacks a also has ∅ as its only preferred extension and no stable one.</span>'],
      answer: '(a) A stable set S is conflict-free, defends itself (an attacker of S is outside S, hence attacked by S), and no admissible T ⊃ S exists (a new member of T would be attacked by S inside T). So S is preferred. (b) AR = {a}, Att = {(a,a)}: ∅ is preferred and not stable.',
      why: '<p>Stability is a strong condition: S attacks every outsider, so it leaves no room to grow and no attack on it goes unanswered. Preferred only asks for maximal, which a set can satisfy without attacking everything.</p>',
      mistake: 'Proving only that S is conflict-free and attacks outsiders. Preferred means admissible and maximal, so both parts must be shown. The converse is false, so do not claim it.' },
    { label: 'Q6', marks: 10, mod: 4, title: 'Arguments, attacks and the grounded extension of a knowledge base (appeared in 3/4 papers)',
      vis: [{ t: 'af', nodes: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'E1', 'E2', 'E3'],
        edges: [['A1', 'A2', 'rebut'], ['A2', 'A1', 'rebut'], ['A1', 'A4', 'rebut'], ['A1', 'A5', 'rebut'], ['A2', 'A3', 'rebut'], ['A3', 'A5', 'rebut'], ['A5', 'A3', 'rebut'], ['A6', 'A1', 'undercut'], ['A6', 'A3', 'undercut']],
        pos: { A4: [110, 25], A1: [45, 55], A5: [175, 55], A6: [110, 88], A2: [45, 115], A3: [175, 115], E1: [45, 160], E2: [110, 160], E3: [175, 160] },
        ext: [{ name: 'grounded', set: ['E1', 'E2', 'E3', 'A2', 'A4', 'A5', 'A6'] }],
        note: 'A6 undercuts A1 and A3, which frees A2 and A5 (their attackers are red) and A4. E1 to E3 are facts nobody attacks.' }],
      q: '<p>Knowledge base. Facts: e1: Fon is a lecturer. e2: Fon is on sabbatical. e3: Fon has a research-only contract. Strict rule: s1: People who do not teach this term have no classroom. Defeasible rules: d1: Lecturers normally teach this term. d2: People on sabbatical normally do not teach this term. d3: People who teach this term normally hold office hours. d4: People with no classroom normally do not hold office hours. d5: People with a research-only contract are normally not covered by d1 (d1 does not apply to them).</p><p>(a) Form all arguments, each as reasons and conclusion. (b) Draw the attacks and name the type of each. (c) Compute the grounded extension.</p>',
      hint: 'Start from the facts and apply each rule once, then chain. For the attacks compare conclusions with the conclusions inside other arguments, and look for the argument whose conclusion switches off a rule.',
      steps: [
        '<b>(a) Arguments.</b><span>A1 = (e1, d1) so Fon teaches. A2 = (e2, d2) so Fon does not teach. A3 = (A1, d3) so Fon holds office hours. A4 = (A2, s1) so Fon has no classroom. A5 = (A4, d4) so Fon does not hold office hours. A6 = (e3, d5) so d1 does not apply to Fon. Each fact is also an argument on its own, as in the Module 4 slides (A1 = e1 ∴ John wears ring): E1 = e1 so Fon is a lecturer, E2 = e2 so Fon is on sabbatical, E3 = e3 so Fon has a research-only contract.</span>',
        '<b>(b) Rebuts.</b><span>A1 and A2 rebut each other (teaches against does not teach). A3 and A5 rebut each other (office hours against none).</span>',
        '<b>(b) Indirect rebuts.</b><span>A1 concludes "Fon teaches", which contradicts the sub-conclusion "does not teach" inside A4 and A5, so A1 attacks A4 and A5. A2 concludes "does not teach", which contradicts the sub-conclusion inside A3, so A2 attacks A3.</span>',
        '<b>(b) Undercuts.</b><span>A6 says d1 does not apply. A1 uses d1, and A3 contains A1, so A6 undercuts A1 and A3. Nothing attacks A6, and nothing attacks the fact arguments E1, E2, E3 (facts cannot be attacked).</span>',
        '<b>(b) Attack list.</b><span>(A1,A2), (A2,A1), (A1,A4), (A1,A5), (A2,A3), (A3,A5), (A5,A3), (A6,A1), (A6,A3).</span>',
        '<b>(c) Grounded.</b><span>f(∅) = {E1, E2, E3, A6}, the unattacked arguments. f of that set = {E1, E2, E3, A2, A4, A5, A6}: A1 and A3 are attacked by A6, so A2 (attacker A1), A4 (attacker A1) and A5 (attackers A1, A3) are defended. A1 is not added: its attacker A2 is not attacked by this set. The next step adds nothing, so the grounded extension is {E1, E2, E3, A2, A4, A5, A6}.</span>'],
      answer: '(a) A1 to A6 as above, plus the fact arguments E1, E2, E3. (b) Rebuts: A1 and A2, A3 and A5 (both directions); indirect rebuts: A1 on A4 and A5, A2 on A3; undercuts: A6 on A1 and A3. (c) Grounded extension {E1, E2, E3, A2, A4, A5, A6}: the three facts hold, and Fon does not teach, has no classroom, holds no office hours, and d1 does not apply to Fon.',
      why: '<p>An argument is a set of reasons that proves a conclusion by rules. Rebuts hit conclusions (also sub-conclusions), undercuts hit the rule used. The grounded extension keeps the arguments that survive without choosing a side, and it starts from what nobody attacks.</p>',
      mistake: 'Treating A6 as an attack on the conclusion "Fon teaches". A6 does not say Fon fails to teach; it says d1 gives no reason here, so it is an undercut. Also forgetting that A1 attacks A4 and A5 through the sub-argument A2.' },
    { label: 'Q7', marks: 5, mod: 5, title: 'Truth table for {p → q, q ∨ r} and p ∨ r (appeared in 3/4 papers)',
      vis: [{ t: 'table', head: ['p', 'q', 'r', 'p → q', 'q ∨ r', 'p ∨ r'],
        rows: [[1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1], [1, 0, 1, 0, 1, 1], [1, 0, 0, 0, 0, 1], [0, 1, 1, 1, 1, 1], [0, 1, 0, 1, 1, 0], [0, 0, 1, 1, 1, 1], [0, 0, 0, 1, 0, 0]],
        hl: { 0: 'ok', 1: 'ok', 2: 'dim', 3: 'dim', 4: 'ok', 5: 'bad', 6: 'ok', 7: 'dim' },
        note: 'Green and red rows make both sentences of Δ true. The red row p = 0, q = 1, r = 0 falsifies p ∨ r: the counter-model.' }],
      q: '<p>Use a truth table to decide whether Δ = {p → q, q ∨ r} logically entails p ∨ r. If not, give the interpretation that shows it.</p>',
      hint: 'Write all eight rows. Entailment fails when some row makes every sentence of Δ true and the goal false.',
      steps: [
        '<b>Table.</b><span>Columns p, q, r, p → q, q ∨ r, p ∨ r. Rows (1 = true): 111: 1 1 1. 110: 1 1 1. 101: 0 1 1. 100: 0 0 1. 011: 1 1 1. 010: 1 1 0. 001: 1 1 1. 000: 1 0 0.</span>',
        '<b>Rows where Δ holds.</b><span>Both p → q and q ∨ r are true in 111, 110, 011, 010, 001.</span>',
        '<b>Goal in those rows.</b><span>p ∨ r is true in 111, 110, 011, 001 and false in 010.</span>',
        '<b>Verdict.</b><span>Row 010 (p false, q true, r false) makes Δ true and p ∨ r false. So Δ does not entail p ∨ r.</span>'],
      answer: 'No. The interpretation p = false, q = true, r = false satisfies both sentences of Δ and falsifies p ∨ r.',
      why: '<p>Δ ⊨ φ means every interpretation that makes all of Δ true also makes φ true. One row where Δ is true and φ false refutes it.</p>',
      mistake: 'Looking only at rows where p ∨ r is true. Entailment is about the rows where Δ is true, and one bad row among them is enough.',
      tryit: { w: 'entail', say: 'Check the entailment in the tool:', cfg: { title: 'ENTAILMENT CHECK', delta: ['p -> q', 'q | r'], phi: 'p | r' } } },
    { label: 'Q8', marks: 10, mod: 5, title: 'A Fitch proof of ¬r ∧ ¬q (appeared in 3/4 papers)',
      vis: [{ t: 'fitch', lines: [[0, '¬(p ∨ q)', 'Premise'], [0, 'r → p', 'Premise'], [1, 'r', 'Assumption'], [1, 'r → p', 'Reiteration: 2'], [1, 'p', 'Implication Elimination: 4, 3'], [1, 'p ∨ q', 'Or Introduction: 5'], [0, 'r → p ∨ q', 'Implication Introduction: 3, 6'],
        [1, 'r', 'Assumption'], [1, '¬(p ∨ q)', 'Reiteration: 1'], [0, 'r → ¬(p ∨ q)', 'Implication Introduction: 8, 9'], [0, '¬r', 'Negation Introduction: 7, 10'],
        [1, 'q', 'Assumption'], [1, 'p ∨ q', 'Or Introduction: 12'], [0, 'q → p ∨ q', 'Implication Introduction: 12, 13'], [1, 'q', 'Assumption'], [1, '¬(p ∨ q)', 'Reiteration: 1'], [0, 'q → ¬(p ∨ q)', 'Implication Introduction: 15, 16'],
        [0, '¬q', 'Negation Introduction: 14, 17'], [0, '¬r ∧ ¬q', 'And Introduction: 11, 18']] }],
      q: '<p>Given Δ = {¬(p ∨ q), r → p}. Use the Fitch system to prove ¬r ∧ ¬q.</p>',
      hint: 'Prove ¬r and ¬q separately, each by Negation Introduction: from a hypothesis derive both a sentence and its negation, then join the two results with And Introduction.',
      steps: [
        '<b>Plan.</b><span>Negation Introduction needs two implications with the same antecedent: φ → ψ and φ → ¬ψ. Here ψ is p ∨ q, which premise 1 denies. Do it once for r and once for q.</span>',
        '<b>¬r, first implication.</b><span>Assume r. Reiterate r → p, get p, then p ∨ q by Or Introduction. Close: r → p ∨ q.</span>',
        '<b>¬r, second implication.</b><span>Assume r again in a new box and reiterate ¬(p ∨ q). Close: r → ¬(p ∨ q). Negation Introduction gives ¬r.</span>',
        '<b>¬q.</b><span>Assume q, get p ∨ q by Or Introduction, close with q → p ∨ q. Assume q in a new box, reiterate ¬(p ∨ q), close with q → ¬(p ∨ q). Negation Introduction gives ¬q.</span>',
        '<b>Finish.</b><span>And Introduction on the two negations. Each box is used for one conclusion only, and outer lines are copied in by Reiteration.</span>'],
      answer: '<pre>1    ¬(p ∨ q)             Premise\n2    r → p                Premise\n3    | r                  Assumption\n4    | r → p              Reiteration: 2\n5    | p                  Implication Elimination: 4, 3\n6    | p ∨ q              Or Introduction: 5\n7    r → p ∨ q            Implication Introduction: 3, 6\n8    | r                  Assumption\n9    | ¬(p ∨ q)           Reiteration: 1\n10   r → ¬(p ∨ q)         Implication Introduction: 8, 9\n11   ¬r                   Negation Introduction: 7, 10\n12   | q                  Assumption\n13   | p ∨ q              Or Introduction: 12\n14   q → p ∨ q            Implication Introduction: 12, 13\n15   | q                  Assumption\n16   | ¬(p ∨ q)           Reiteration: 1\n17   q → ¬(p ∨ q)         Implication Introduction: 15, 16\n18   ¬q                   Negation Introduction: 14, 17\n19   ¬r ∧ ¬q              And Introduction: 11, 18</pre>',
      why: '<p>Negation Introduction is the Fitch form of proof by contradiction: if assuming φ leads to both ψ and ¬ψ, then ¬φ. Fitch is sound and complete for propositional logic, so the proof exists because Δ entails ¬r ∧ ¬q.</p>',
      mistake: 'Using line 2 inside the box without Reiteration, or citing a line from a box that has already closed. Also trying to get both ψ and ¬ψ inside one box: the rule needs two implications.',
      tryit: { w: 'entail', say: 'Check the entailment in the tool:', cfg: { title: 'ENTAILMENT CHECK', delta: ['~(p | q)', 'r -> p'], phi: '~r & ~q' } } },
    { label: 'Q9', marks: 5, mod: 5, title: 'INDO and a resolution proof of ¬(p ∧ q) (appeared in 3/4 papers)',
      vis: [
        { t: 'table', title: '(a) clausal form', head: ['sentence', 'clauses'], rows: [['(p ∧ q) → r', '{¬p, ¬q, r}'], ['¬(r ∨ s)', '{¬r} and {¬s}'], ['negated goal ¬¬(p ∧ q)', '{p} and {q}']] },
        { t: 'tree', title: '(b) resolution refutation', nodes: [{ id: 1, text: '{¬p, ¬q, r}' }, { id: 2, text: '{¬r}' }, { id: 4, text: '{p}' }, { id: 5, text: '{q}' },
          { id: 6, text: '{¬q, r}', from: [1, 4], note: 'on p' }, { id: 7, text: '{r}', from: [6, 5], note: 'on q' }, { id: 8, text: '{}', from: [7, 2], note: 'on r' }],
          note: '{¬s} (clause 3) is not used.' }],
      q: '<p>Given Δ = {(p ∧ q) → r, ¬(r ∨ s)}. (a) Convert Δ and the negation of the goal ¬(p ∧ q) into clausal form with INDO. (b) Use propositional resolution to prove that Δ entails ¬(p ∧ q).</p>',
      hint: 'INDO: implications out, negations in, distribute or over and, read off the clauses. Resolve the clauses of Δ and the negated goal until the empty clause appears.',
      steps: [
        '<b>(a) First sentence.</b><span>Implications out: ¬(p ∧ q) ∨ r. Negations in: (¬p ∨ ¬q) ∨ r. One clause: {¬p, ¬q, r}.</span>',
        '<b>(a) Second sentence.</b><span>¬(r ∨ s) becomes ¬r ∧ ¬s by pushing the negation in. Two clauses: {¬r} and {¬s}.</span>',
        '<b>(a) Negated goal.</b><span>The negation of ¬(p ∧ q) is ¬¬(p ∧ q), which becomes p ∧ q. Two clauses: {p} and {q}.</span>',
        '<b>(b) Resolution.</b><span>1. {¬p, ¬q, r} (Δ). 2. {¬r} (Δ). 3. {¬s} (Δ). 4. {p} (negated goal). 5. {q} (negated goal). 6. {¬q, r}: resolve 1 and 4 on p. 7. {r}: resolve 6 and 5 on q. 8. {}: resolve 7 and 2 on r.</span>',
        '<b>(b) Verdict.</b><span>The empty clause refutes Δ together with the negated goal, so Δ entails ¬(p ∧ q). Clause 3 is not used.</span>'],
      answer: '(a) {¬p, ¬q, r}, {¬r}, {¬s} from Δ; {p}, {q} from the negated goal. (b) {¬p,¬q,r} and {p} give {¬q,r}; with {q} gives {r}; with {¬r} gives {}.',
      why: '<p>INDO keeps logical equivalence, so the clause set says the same as the sentences. Resolution is refutation-complete: Δ entails the goal exactly when Δ plus the negated goal resolves to the empty clause.</p>',
      mistake: 'Negating the goal once too few: the negation of ¬(p ∧ q) is p ∧ q, not ¬(p ∧ q). Using the goal itself as a clause set proves nothing.',
      tryit: { w: 'refute', say: 'Run the same proof in the workbench:', cfg: { title: 'REFUTATION', mode: 'prop', premises: ['(p & q) -> r', '~(r | s)'], goal: '~(p & q)' } } },
    { label: 'Q10', marks: 10, mod: 7, title: 'First-order resolution with a Skolem function and a Skolem constant (appeared in 3/4 papers)',
      vis: [
        { t: 'tree', title: '(a) Δ and p(a), goal ∃Z.q(Z)', nodes: [{ id: 1, text: '{¬p(X), r(X,f(X))}' }, { id: 2, text: '{¬r(X,Y), q(Y)}' }, { id: 3, text: '{p(a)}' }, { id: 4, text: '{¬q(Z)}' },
          { id: 5, text: '{r(a,f(a))}', from: [1, 3], note: 'X = a' }, { id: 6, text: '{q(f(a))}', from: [2, 5], note: 'Y = f(a)' }, { id: 7, text: '{}', from: [6, 4], note: 'Z = f(a)' }] },
        { t: 'tree', title: '(b) Δ, goal ∀X.(p(X) → ∃Y.q(Y)), fresh constant c', nodes: [{ id: 1, text: '{¬p(X), r(X,f(X))}' }, { id: 2, text: '{¬r(X,Y), q(Y)}' }, { id: 3, text: '{p(c)}' }, { id: 4, text: '{¬q(Y)}' },
          { id: 5, text: '{r(c,f(c))}', from: [1, 3], note: 'X = c' }, { id: 6, text: '{q(f(c))}', from: [2, 5], note: 'Y = f(c)' }, { id: 7, text: '{}', from: [6, 4], note: 'Y = f(c)' }] }],
      q: '<p>Let Δ = {∀X.(p(X) → ∃Y.r(X,Y)), ∀X.∀Y.(r(X,Y) → q(Y))}. Use Resolution to prove (a) (5 marks) that Δ ∪ {p(a)} entails ∃Z.q(Z), and (b) (5 marks) that Δ entails ∀X.(p(X) → ∃Y.q(Y)).</p>',
      hint: 'The first sentence has an existential inside a universal: its Skolem term must depend on X. In (b) the negated goal has an existential at the front, so it gets a fresh constant.',
      steps: [
        '<b>Clauses of Δ.</b><span>1. {¬p(X), r(X, f(X))}: the existential Y depends on X, so it becomes f(X). 2. {¬r(X,Y), q(Y)}.</span>',
        '<b>(a) Clauses.</b><span>3. {p(a)}. The negated goal is ¬∃Z.q(Z), which is ∀Z.¬q(Z): 4. {¬q(Z)}.</span>',
        '<b>(a) Proof.</b><span>5. {r(a, f(a))}: resolve 1 and 3 with X = a. 6. {q(f(a))}: resolve 2 and 5 with X = a, Y = f(a). 7. {}: resolve 6 and 4 with Z = f(a).</span>',
        '<b>(b) Negated goal.</b><span>¬∀X.(p(X) → ∃Y.q(Y)) is ∃X.(p(X) ∧ ∀Y.¬q(Y)). The existential at the front gets a fresh constant c: 3. {p(c)} and 4. {¬q(Y)}.</span>',
        '<b>(b) Proof.</b><span>5. {r(c, f(c))}: resolve 1 and 3 with X = c. 6. {q(f(c))}: resolve 2 and 5 with X = c, Y = f(c). 7. {}: resolve 6 and 4 with Y = f(c).</span>'],
      answer: '(a) {¬p(X), r(X,f(X))}, {¬r(X,Y), q(Y)}, {p(a)}, {¬q(Z)}: {r(a,f(a))}, {q(f(a))}, {}. (b) the same clauses 1 and 2, with {p(c)} and {¬q(Y)}: {r(c,f(c))}, {q(f(c))}, {}.',
      why: '<p>Skolemisation replaces each existential by a term in the universals before it: a constant when there is none, a function when there is one. The refutation is correct because the clause set is unsatisfiable exactly when Δ entails the goal.</p>',
      mistake: 'Skolemising ∃Y with a constant d in clause 1. That claims one witness for all X, which is stronger than the premise. Also reusing the constant a in (b): the fresh c is not a.',
      tryit: { w: 'refute', say: 'Run the proof for (a) in the workbench:', cfg: { title: 'FIRST-ORDER RESOLUTION', mode: 'fol', premises: ['forall X. (p(X) -> exists Y. r(X, Y))', 'forall X. forall Y. (r(X, Y) -> q(Y))', 'p(a)'], goal: 'exists Z. q(Z)' } } },
    { label: 'Q11', marks: 5, mod: 7, title: 'Prolog answers and negation as failure (appeared in 1/4 papers)',
      vis: [
        { t: 'table', title: 'loner(X): person(X) first, then the test', head: ['X', 'rival(X, _) provable?', '\\+ rival(X, _)', 'loner(X)'],
          rows: [['ann', 'yes (Y = ann)', 'fails', 'no'], ['bob', 'yes (Y = bob)', 'fails', 'no'], ['cat', 'yes (Y = cat)', 'fails', 'no'], ['dan', 'no (no likes clause)', 'succeeds', 'yes']], hl: { 3: 'ok' },
          note: 'X is bound by person(X) before the test, so only dan passes: X = dan.' },
        { t: 'table', title: 'the three queries', head: ['query', 'how it runs', 'answer'],
          rows: [['(a) rival(ann, Y)', 'likes(ann, D): D = tea; likes(Y, tea): Y = ann, then Y = bob', 'Y = ann ; Y = bob'], ['(b) loner(X)', 'person(X) binds X, then \\+ rival(X, _) is tested', 'X = dan'], ['(c) loner2(X)', '\\+ rival(X, _) is tested with X unbound; rival(X, _) succeeds (X = ann), so the body fails before person(X)', 'false']], hl: { 2: 'bad' } }],
      q: '<p>Prolog program:</p><pre>likes(ann, tea).\nlikes(bob, tea).\nlikes(bob, coffee).\nlikes(cat, coffee).\n\nperson(ann).\nperson(bob).\nperson(cat).\nperson(dan).\n\nrival(X, Y) :- likes(X, D), likes(Y, D).\nloner(X)  :- person(X), \\+ rival(X, _).\nloner2(X) :- \\+ rival(X, _), person(X).</pre><p>What are the answers to (a) <span class="m">?- rival(ann, Y).</span> (b) <span class="m">?- loner(X).</span> (c) <span class="m">?- loner2(X).</span>? Explain.</p>',
      hint: 'Run each goal by hand, clause by clause. \\+ G succeeds only when G cannot be proved, and it never binds variables.',
      steps: [
        '<b>(a) Answers.</b><span>rival(ann, Y) needs likes(ann, D): D = tea. Then likes(Y, tea): Y = ann, and on backtracking Y = bob. Answers: Y = ann and Y = bob, in this order, and no others.</span>',
        '<b>(b) Each person.</b><span>For X = ann, rival(ann, _) succeeds (shown in (a)), so \\+ rival(ann, _) fails. bob and cat likewise: each likes something and so is a rival of himself or herself. dan has no likes clause, so rival(dan, _) fails and \\+ rival(dan, _) succeeds.</span>',
        '<b>(b) Answer.</b><span>X = dan, and no other answer.</span>',
        '<b>(c) Order.</b><span>loner2 tests \\+ rival(X, _) first, when X is still unbound. rival(X, _) succeeds (X = ann), so \\+ rival(X, _) fails, and the body fails before person(X) is reached. Answer: false.</span>'],
      answer: '(a) Y = ann ; Y = bob. (b) X = dan. (c) false.',
      why: '<p>Prolog proves goals by SLD resolution, clause order and left to right. \\+ is negation as failure, a closed-world test for "cannot be proved". It binds nothing, so a goal with an unbound variable behaves as "is there any X at all".</p>',
      mistake: 'Answering (c) as X = dan because loner and loner2 look equivalent. In loner2 the negation is tested on an unbound X.' },
    { label: 'Q12', marks: 5, mod: 6, title: 'Bayesian network to a ProbLog program (appeared in 1/4 papers)',
      vis: [
        { t: 'dag', nodes: ['storm', 'outage', 'delay'], edges: [['storm', 'outage'], ['outage', 'delay']],
          notes: { storm: '0.2::storm', outage: 'P(o | s) = 0.7, P(o | ¬s) = 0.05', delay: 'P(d | o) = 0.9, P(d | ¬o) = 0.1' } },
        { t: 'table', head: ['node', 'P(true)', 'computation'], rows: [['storm', '0.2', 'the fact'], ['outage', '0.18', '0.2 × 0.7 + 0.8 × 0.05'], ['delay', '0.244', '0.18 × 0.9 + 0.82 × 0.1']], hl: { 2: 'ok' }, note: 'The program gives the same P(delay) = 0.244 as the network.' }],
      q: '<p>Translate the following Bayesian network into a ProbLog program. Storm is the parent of Outage, and Outage is the parent of Delay. P(Storm) = 0.2. P(Outage | Storm) = 0.7 and P(Outage | no Storm) = 0.05. P(Delay | Outage) = 0.9 and P(Delay | no Outage) = 0.1.</p>',
      hint: 'The prior becomes a probabilistic fact. Each row of a conditional table becomes a probabilistic rule whose body fixes the parent value, with \\+ for false.',
      steps: [
        '<b>Prior.</b><span>Storm has no parent: the fact 0.2::storm.</span>',
        '<b>Outage.</b><span>Two rows: 0.7::outage :- storm. and 0.05::outage :- \\+ storm.</span>',
        '<b>Delay.</b><span>Two rows: 0.9::delay :- outage. and 0.1::delay :- \\+ outage.</span>',
        '<b>Why it matches.</b><span>The two bodies for each child exclude each other, so in every world exactly one rule is available and its probability is the table entry. The false columns are the complements and need no rules.</span>',
        '<b>Check.</b><span>P(outage) = 0.2 · 0.7 + 0.8 · 0.05 = 0.18. P(delay) = 0.18 · 0.9 + 0.82 · 0.1 = 0.244, the same in the network and in the program.</span>'],
      answer: '<pre>0.2::storm.\n0.7::outage :- storm.\n0.05::outage :- \\+ storm.\n0.9::delay :- outage.\n0.1::delay :- \\+ outage.\n\nquery(delay).</pre>The program gives P(delay) = 0.244.',
      why: '<p>A Bayesian network is a product of local tables. A ProbLog rule is a fact that exists only when its body holds, which gives P(head | body) = the stated number. With exclusive bodies this is exactly a table row.</p>',
      mistake: 'Writing only 0.7::outage :- storm. and leaving out the row for no storm. The 0.05 case is then missing and Outage can never happen without a storm.' },
    { label: 'Q13', marks: 10, mod: 6, title: 'What the ProbLog program prints (appeared in 1/4 papers)',
      vis: [
        { t: 'dag', title: 'The edges as a graph', nodes: ['a', 'b', 'c', 'd'], edges: [['a', 'b'], ['b', 'c'], ['a', 'c'], ['c', 'd']],
          notes: { a: 'start', b: 'edge(a,b) 0.6', c: 'edge(b,c) 0.5, edge(a,c) 0.3', d: 'edge(c,d) 0.8' } },
        { t: 'table', head: ['query', 'computation', 'P'], rows: [['path(a,c)', '1 − (1 − 0.3)(1 − 0.6 × 0.5)', '0.51'], ['path(a,d)', 'path(a,c) × edge(c,d) = 0.51 × 0.8', '0.408'], ['path(b,d)', '0.5 × 0.8', '0.4'], ['alarm', '0.9 × 0.408', '0.3672']],
          note: 'Every route to d ends with edge(c,d), the shared edge, so path(a,d) is not a noisy-or of two routes.' }],
      q: '<p>What will be printed out by this ProbLog program?</p><pre>0.6::edge(a,b).\n0.5::edge(b,c).\n0.3::edge(a,c).\n0.8::edge(c,d).\n\npath(X,Y) :- edge(X,Y).\npath(X,Z) :- edge(X,Y), path(Y,Z).\n\n0.9::alarm :- path(a,d).\n\nquery(path(a,c)).\nquery(path(a,d)).\nquery(path(b,d)).\nquery(alarm).</pre>',
      hint: 'The probabilistic facts are independent. Find which edges each query needs, and watch for an edge shared by two routes.',
      steps: [
        '<b>path(a,c).</b><span>Two routes: the edge a to c, or a to b then b to c. They use different edges, so they are independent. The second route has probability 0.6 · 0.5 = 0.3. P = 1 − (1 − 0.3)(1 − 0.3) = 0.51.</span>',
        '<b>path(b,d).</b><span>One route: b to c, then c to d. P = 0.5 · 0.8 = 0.4.</span>',
        '<b>path(a,d), the shared edge.</b><span>Every route to d ends with the edge c to d. So path(a,d) holds exactly when path(a,c) and edge(c,d) both hold. They use different edges, so P = 0.51 · 0.8 = 0.408.</span>',
        '<b>alarm.</b><span>The rule is an independent 0.9 fact that is available when path(a,d) holds. P(alarm) = 0.9 · 0.408 = 0.3672.</span>',
        '<b>Printing.</b><span>One line per query.</span>'],
      answer: 'path(a,c): 0.51. path(a,d): 0.408. path(b,d): 0.4. alarm: 0.3672.',
      why: '<p>ProbLog sums the weights of the possible worlds (choices of the probabilistic facts) in which the query is provable. Routes that share a fact are not independent, so we split on the shared fact instead of combining them as a noisy-or.</p>',
      mistake: 'Treating the two routes to d as independent: 1 − (1 − 0.24)(1 − 0.24) = 0.4224. Both routes need edge(c,d), so the true value is 0.408.' }
  ] });
