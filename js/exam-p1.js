/* Final practice paper 1: worked answers. */
UI.examPaper({ n: 2, title: 'Final practice paper 1', sub: '14 questions, 110 marks: arguments, computational argumentation, logic and proof systems.',
  html: '<p class="lead">Fourteen questions in three parts. Each problem has the question as asked, a hint, a worked solution and the answer. The typed answers on the original paper are not an answer key: where a typed answer is wrong or incomplete, the problem says so under "what the paper wrote".</p>' +
    '<table><tr><th>Part</th><th>Questions</th><th>Marks</th><th>Topics</th></tr>' +
    '<tr><td>I Arguments in natural language</td><td>Q1 to Q4</td><td>25</td><td>Suppressed premises, rebut and undermine, categorical syllogisms, reading a newspaper article</td></tr>' +
    '<tr><td>II Computational argumentation</td><td>Q5 to Q7</td><td>30</td><td>Admissible and grounded extensions of an infinite framework, two proofs about extensions</td></tr>' +
    '<tr><td>III Computational logics and proof systems</td><td>Q8 to Q14</td><td>55</td><td>Entailment facts, Fitch, propositional resolution, Herbrand logic, first-order resolution, the three logics compared</td></tr></table>',
  problems: [
    { label: 'Q1', marks: 5, mod: 2, title: 'Suppressed premise for the GOAT argument',
      q: '<p>"Messi is the GOAT in football because he achieved more accomplishments than any other players".</p>' +
        '<p>(a) Write down suppressed premises that can turn this argument into a deductive one.</p>' +
        '<p>(b) Write the standard form of the full argument after adding the suppressed premises.</p>' +
        '<p>(c) Write an argument (in the standard form) attacking the above deductive argument by undermining one of its premises.</p>',
      hint: 'The stated argument jumps from "most accomplishments" to "GOAT". Write the general rule that bridges them, then attack one of the two premises.',
      steps: [
        '<b>(a) Spot the gap.</b><span>Premise: Messi achieved more accomplishments than any other player. Conclusion: Messi is the GOAT. Nothing says that having the most accomplishments makes a player the GOAT.</span>',
        '<b>(a) Suppressed premise.</b><span>Any player who achieved more accomplishments than any other player is the GOAT in football. With it, the conclusion follows by instantiation.</span>',
        '<b>(b) Standard form.</b><span>1. Messi achieved more accomplishments than any other player. 2. Any player who achieved more accomplishments than any other player is the GOAT in football (suppressed). Therefore Messi is the GOAT in football.</span>',
        '<b>(c) Choose the target.</b><span>To undermine is to deny a premise. Attack premise 1: Messi did not achieve more accomplishments than every other player.</span>',
        '<b>(c) Standard form.</b><span>1. Ronaldo has won the UEFA Player of the Year award more times than Messi (the paper gives 4 against 3; the point is the structure, not the football facts). 2. Awards count as accomplishments. Therefore Messi did not achieve more accomplishments than any other player.</span>'
      ],
      answer: '(a) Anyone who achieved more accomplishments than any other player is the GOAT. (b) Messi achieved more accomplishments than any other player; anyone who achieved more accomplishments than any other player is the GOAT; so Messi is the GOAT. (c) Ronaldo has more UEFA Player of the Year awards than Messi; awards are accomplishments; so Messi did not achieve more accomplishments than any other player.',
      why: '<p>A suppressed (enthymematic) premise is the general rule that makes premises plus rule deductive. An undermine attacks a premise, so the attacker\'s conclusion must be the negation of that premise.</p>',
      mistake: 'Attacking the conclusion ("Messi is not the GOAT") is a rebut, not an undermine.',
      vis: [
        { t: 'arg', name: 'A1 (full argument)', premises: ['Messi achieved more accomplishments than any other player', 'Any player who achieved more accomplishments than any other player is the GOAT (suppressed)'], concl: 'Messi is the GOAT in football' },
        { t: 'arg', name: 'A2 (undermine)', premises: ['Ronaldo has more UEFA Player of the Year awards than Messi', 'Awards are accomplishments'], concl: 'Messi did not achieve more accomplishments than any other player' },
        { t: 'af', nodes: ['A1', 'A2'], edges: [['A2', 'A1', 'undermine']], pos: { A1: [160, 95], A2: [60, 95] }, note: 'A2 contradicts premise 1 of A1, so it undermines A1.' }] },

    { label: 'Q2', marks: 5, mod: 2, title: 'Rebutting three arguments',
      q: '<p>For each argument below, give an argument (in the standard form) rebutting it.</p>' +
        '<p>(a) Roger Federer is better than Rafael Nadal because Roger Federer has excelled on grass and hard courts while Rafael Nadal has been dominant on clay courts only.</p>' +
        '<p>(b) You should bring an umbrella since it is going to rain.</p>' +
        '<p>(c) It is going to rain since www.accuweather.com forecasts so.</p>',
      hint: 'A rebut has the opposite conclusion. Keep the same subject, negate or reverse the claim, and give a reason of its own.',
      steps: [
        '<b>Rule.</b><span>A rebut attacks the conclusion, so its conclusion contradicts the conclusion of the target.</span>',
        '<b>(a) Opposite claim.</b><span>Target: Federer is better than Nadal. Rebut: Nadal has won more Grand Slam titles than Federer; therefore Nadal is better than Federer.</span>',
        '<b>(b) Opposite claim.</b><span>Target: you should bring an umbrella. Rebut: you will be in my car the whole way, door to door; therefore you should not bring an umbrella.</span>',
        '<b>(c) Opposite claim.</b><span>Target: it is going to rain. Rebut: the local weather service says it will stay dry today; therefore it is not going to rain. (A reason such as "it just rained" is allowed by the form but is weak: it does not make rain less likely.)</span>'
      ],
      answer: '(a) Nadal has more Grand Slam titles; so Nadal is better than Federer. (b) You are in my car; so you should not bring an umbrella. (c) The local weather service forecasts a dry day; so it will not rain.',
      why: '<p>A rebut only needs a conclusion that contradicts the target\'s conclusion; the quality of its reason decides whether the attack succeeds, not whether it is a rebut.</p>',
      mistake: 'Attacking the reason ("accuweather is not reliable") instead of the conclusion: that is an undercut or an undermine, not a rebut.',
      vis: [
        { t: 'arg', name: '(a) rebut', premises: ['Nadal has won more Grand Slam titles than Federer'], concl: 'Nadal is better than Federer' },
        { t: 'arg', name: '(b) rebut', premises: ['You will be in my car the whole way, door to door'], concl: 'You should not bring an umbrella' },
        { t: 'arg', name: '(c) rebut', premises: ['The local weather service says it will stay dry today'], concl: 'It is not going to rain' }] },

    { label: 'Q3', marks: 5, mod: 3, title: 'Four syllogisms: deductive or not',
      q: '<p>For each of the arguments below, say whether it is deductive or not.</p>' +
        '<p>(a) Some P is M. Some S is not M. Hence some S is both P and M.</p>' +
        '<p>(b) All M is P. No S is M. Hence no S is both P and M.</p>' +
        '<p>(c) No M is P. Some S is not M. Hence some S is P.</p>' +
        '<p>(d) No P is M. Some S is M. Hence some S is P.</p>',
      hint: 'An argument is deductive if no situation makes the premises true and the conclusion false. Try to build such a situation with one or two objects.',
      steps: [
        '<b>(a) Search for a counter-situation.</b><span>Objects 1 and 2. Object 1 is P and M. Object 2 is S, not M. Premises: some P is M (object 1), some S is not M (object 2). Conclusion: some S is both P and M: no S is M here, false. Not deductive.</span>',
        '<b>(b) Search.</b><span>Premise 2 says nothing in S is in M. Then nothing in S can be both P and M, whatever P is; premise 1 is not even needed. In every situation where the premises hold, the conclusion holds. Deductive.</span>',
        '<b>(c) Search.</b><span>Take P empty, and one object that is S and not M. Premises: no M is P (true, P is empty), some S is not M (true). Conclusion: some S is P: false. Not deductive.</span>',
        '<b>(d) Search.</b><span>One object that is S and M, and P empty. Premises: no P is M (true), some S is M (true). Conclusion: some S is P: false. Not deductive. (The premises prove that this particular S is not P, the opposite of what the conclusion needs.)</span>',
        '<b>Venn check of (b).</b><span>The premise "No S is M" shades the overlap of S and M, which contains the overlap of S, M and P. The conclusion says S, M and P overlap has no members: it is already shaded.</span>'
      ],
      answer: '(a) not deductive. (b) DEDUCTIVE. (c) not deductive. (d) not deductive.',
      why: '<p>Deductive means the conclusion is true in every situation in which all premises are true. One counter-situation shows an argument is not deductive; to show validity, argue from the premises alone (here premise 2 already forces the conclusion).</p>',
      mistake: 'Reading "no S is both P and M" as "no S is P, and no S is M". It only denies the combination, which is a weaker claim than either.',
      vis: [
        { t: 'venn', title: '(a) not deductive', labels: ['S', 'M', 'P'], some: ['?11', '10?'], note: 'Each "some" premise gives an x that could sit on either side of a line, so it is drawn on the line. Nothing puts an x inside the S, M, P middle, so the conclusion is not forced.' },
        { t: 'venn', title: '(b) deductive', labels: ['S', 'M', 'P'], empty: ['010', '110', '111'], note: 'All M are P greys M outside P; No S is M greys S and M. The S, M, P region is grey, so the conclusion is drawn.' },
        { t: 'venn', title: '(c) not deductive', labels: ['S', 'M', 'P'], empty: ['011', '111'], some: ['10?'], note: 'The x of "Some S is not M" sits outside M, on the P line. Nothing forces it into P, so "Some S is P" is not drawn.' },
        { t: 'venn', title: '(d) not deductive', labels: ['S', 'M', 'P'], empty: ['011', '111'], some: ['110'], note: 'The x of "Some S is M" is forced into S and M without P. The S and P overlap has no x, so "Some S is P" is not drawn.' }],
      paperSays: 'The paper says all of (a) to (d) are not deductive. That is wrong for (b): "No S is M" already implies "no S is both P and M", so (b) is deductive.' },

    { label: 'Q4', marks: 10, mod: 2, title: 'Can Trump run if he is convicted?',
      q: '<p>Article in The New York Times by Maggie Astor, "Can Trump run if he is convicted?": "This is the simplest question of the bunch. The answer is yes. The Constitution sets very few eligibility requirements for presidents. They must be at least 35 years old, be natural born citizens and have lived in the United States for at least 14 years. There are no limitations based on character or criminal record. While some states prohibit felons from running for state and local office, these laws do not apply to federal offices. The Republican and Democratic Parties have guaranteed spots on general-election ballots in every state, and the parties tell election officials whose name to put in their spot. States could, in theory, try to keep Mr. Trump off the ballot by passing legislation requiring a clean criminal record, but this would be on legally shaky ground. We let states set the time, place and manner of elections, said Jessica Levinson, a professor at Loyola Law School, but I think the best reading of our Constitution is you do not let the state add new substantive requirements. While that view is not universal among legal experts, it prevailed in court in 2019, after California passed a law requiring candidates to release their tax returns in order to appear on primary ballots. A federal district judge blocked the law, saying it was most likely unconstitutional. The California Supreme Court also unanimously blocked it as a violation of the state constitution."</p>' +
        '<p>(a) Write the standard form of the argument claiming that "Trump can still run even if he is convicted" presented in the article.</p>' +
        '<p>(b) Does the author also suggest a way to attack the above argument? If yes, write the counter-argument in the standard form.</p>',
      hint: 'The article states the answer first, then reasons. For (a), ask what the reasons must say so that "convicted" does not matter. For (b), find the sentence that starts with "States could, in theory".',
      steps: [
        '<b>(a) Conclusion.</b><span>Trump can still run for president even if he is convicted.</span>',
        '<b>(a) Premises.</b><span>1. The Constitution\'s eligibility requirements for president are age at least 35, natural born citizen, and at least 14 years of residence in the United States, and there are very few of them. 2. There are no limitations based on character or criminal record. 3. State laws that prohibit felons apply to state and local office only, not federal offices. 4. Trump meets the three requirements (implicit).</span>',
        '<b>(a) Why premise 2 matters.</b><span>Without it the premises say nothing about a conviction, so they could not support the conclusion.</span>',
        '<b>(b) Is there an attack?</b><span>Yes: "States could, in theory, try to keep Mr. Trump off the ballot by passing legislation requiring a clean criminal record".</span>',
        '<b>(b) Standard form.</b><span>1. Individual states set the time, place and manner of elections and can pass legislation requiring a clean criminal record. 2. Some state may do so. 3. If Trump is convicted, he will not have a clean criminal record. Therefore Trump may be prevented from running (on that state\'s ballot) if he is convicted.</span>',
        '<b>(b) Kind of attack.</b><span>Its conclusion, Trump may be prevented from running, contradicts the conclusion of (a): a rebut. Its reason also denies premise 2 of (a), that there are no limitations based on criminal record. The article itself then attacks the counter-argument: such a law is on legally shaky ground (Levinson, and the 2019 California tax-return case).</span>'
      ],
      answer: '(a) The Constitution sets only three requirements (35 years, natural born, 14 years of residence); there are no limitations based on criminal record; state felon laws do not apply to federal office; Trump meets the requirements; so Trump can still run even if convicted. (b) Yes: states can legislate a clean-record requirement; some state may do so; a convicted Trump has no clean record; so Trump may be kept off a ballot.',
      why: '<p>An argument in the text is rebuilt by collecting every sentence offered as a reason for the conclusion and adding the implicit premise that links them. An attack is any argument whose conclusion contradicts a premise or the conclusion; here the author builds and then weakens it.</p>',
      mistake: 'Leaving out the premise that there are no other limitations. "The Constitution sets requirements" alone does not say that a conviction is irrelevant.',
      paperSays: 'The paper writes only "the Constitution sets eligibility requirements ... Trump satisfies them". That is incomplete: it omits the premise that there are no limits based on criminal record (and that state felon laws do not reach federal office), which is what makes a conviction irrelevant. (b) agrees with the solution above.',
      vis: [
        { t: 'arg', name: 'A (part a)', premises: ['The Constitution sets only three requirements: age at least 35, natural born citizen, 14 years of residence', 'There are no limitations based on character or criminal record', 'State laws prohibiting felons apply to state and local office, not federal office', 'Trump meets the requirements (implicit)'], concl: 'Trump can still run even if he is convicted' },
        { t: 'arg', name: 'B (part b)', premises: ['States set the time, place and manner of elections and can legislate a clean-record requirement', 'Some state may do so', 'If convicted, Trump will not have a clean record'], concl: 'Trump may be prevented from running if he is convicted' },
        { t: 'af', nodes: ['A', 'B'], edges: [['B', 'A', 'rebut'], ['A', 'B', 'rebut']], pos: { A: [50, 95], B: [170, 95] }, note: 'The conclusions contradict, so B rebuts A.' }] },

    { label: 'Q5', marks: 10, mod: 4, title: 'An infinite attack chain',
      q: '<p>Given an argumentation framework F = (AR, Att) with AR = {A0, A1, A2, ...} (for each natural number n, An is in AR) and Att = {(An, An+2) | n at least 0} (A0 attacks A2, which attacks A4, which attacks A6 and so on).</p>' +
        '<p>(a) How many admissible extensions has F? Write down one admissible extension that is not a subset of any other admissible extension.</p>' +
        '<p>(b) Write down the grounded extension.</p>',
      hint: 'The framework is two separate chains, the even one and the odd one. In a chain A to B to C, an argument is defended only if its attacker has an attacker.',
      steps: [
        '<b>Split into chains.</b><span>Even chain: A0 attacks A2 attacks A4 and so on. Odd chain: A1 attacks A3 attacks A5 and so on. They never attack each other, so a set is admissible iff its even part and its odd part both are.</span>',
        '<b>Which members can be defended?</b><span>A0 and A1 have no attacker: free. A2 is attacked by A0, which nobody attacks: A2 can never be defended. A4 is attacked by A2, and A0 attacks A2: defended if A0 is in. A6 is attacked by A4, so a set defending A6 must contain an attacker of A4, which is A2, and A2 can never be in an admissible set: A6 can never be defended. In general A(4k) and A(4k+1) are defendable, A(4k+2) and A(4k+3) are not.</span>',
        '<b>(a) Admissible sets.</b><span>Each admissible set contains an initial run {A0, A4, ..., A4k} (or none, or all) and an initial run {A1, A5, ..., A(4j+1)} (or none, or all): to have A4m in the set you need A(4m-2) attacked, so A(4m-4) must be in. Every pair of runs gives an admissible set, so there are infinitely many admissible extensions (countably many).</span>',
        '<b>(a) A maximal one.</b><span>{A0, A4, A8, ...} union {A1, A5, A9, ...} (all A4k and A4k+1) is admissible and cannot be extended: adding any A4k+2 conflicts with the attacker A4k, and adding any A4k+3 conflicts with A4k+1. So it is not a subset of any other admissible extension.</span>',
        '<b>(b) Grounded extension.</b><span>f(empty) = unattacked = {A0, A1}. f^2 adds what {A0, A1} defends: A4 (attacker A2 is attacked by A0) and A5: {A0, A1, A4, A5}. f^3 adds A8, A9, and so on. The limit is {A4k, A4k+1 : k at least 0}.</span>',
        '<b>(b) Check.</b><span>This set is admissible and maximal and is the least fixed point, so it is the grounded extension and also the unique preferred extension.</span>'
      ],
      answer: '(a) Infinitely many, for example {A0, A4, ..., A4k} for any k, plus the others obtained by combining runs of the even and odd chains. A maximal admissible extension: {A4k : k at least 0} union {A4k+1 : k at least 0}. (b) GE = {A4k, A4k+1 : k at least 0}.',
      why: '<p>Grounded semantics repeats the characteristic function from the empty set. Each iteration defends the next two arguments of the chain (an argument is in once the argument that attacks its attacker is in), so after n steps the first two runs have grown by one element, and the union is all of them.</p>',
      mistake: 'Taking the even chain alone: A2 looks like a winner after A0 attacks A4, but A2 is attacked by A0, which nothing attacks, so A2 is out in every semantics.',
      vis: [{ t: 'af', nodes: ['A0', 'A2', 'A4', 'A6', 'A1', 'A3', 'A5', 'A7'], edges: [['A0', 'A2'], ['A2', 'A4'], ['A4', 'A6'], ['A1', 'A3'], ['A3', 'A5'], ['A5', 'A7']],
        pos: { A0: [30, 55], A2: [87, 55], A4: [144, 55], A6: [200, 55], A1: [30, 135], A3: [87, 135], A5: [144, 135], A7: [200, 135] },
        ext: [{ name: 'grounded = maximal admissible (first 8 of the chains)', set: ['A0', 'A4', 'A1', 'A5'] }],
        note: 'The chains go on forever to the right. A0 defeats A2 so A4 is defended, A4 defeats A6, and the same on the odd chain: the set is all A(4k) and A(4k+1).' }] },

    { label: 'Q6', marks: 10, mod: 4, title: 'Union of two non-attacking admissible sets',
      q: '<p>Suppose that S1, S2 are two admissible extensions of an argumentation framework F = (AR, Att). Prove that if there is no argument in S1 attacking some argument in S2 and vice versa, then the set union S1 union S2 is also an admissible extension.</p>',
      hint: 'Admissible means conflict-free plus defends every member. Prove the two parts separately.',
      steps: [
        '<b>Plan.</b><span>Admissible = conflict-free and every member is defended. Show both for S = S1 union S2.</span>',
        '<b>Conflict-free: three cases.</b><span>Suppose A and B in S with A attacking B. (1) Both in S1: impossible, S1 is admissible hence conflict-free. (2) Both in S2: impossible likewise. (3) One in S1 and the other in S2: impossible by assumption (no attack between S1 and S2 in either direction). So S is conflict-free.</span>',
        '<b>Defence: pick a member.</b><span>Let A be in S and let B attack A. A is in S1 or in S2; say S1 (the other case is the same with S2).</span>',
        '<b>Use admissibility.</b><span>S1 is admissible, so S1 defends A: some C in S1 attacks B.</span>',
        '<b>Conclude.</b><span>C is also in S, so S attacks B. Since B was an arbitrary attacker of an arbitrary member, S defends all its members.</span>',
        '<b>Result.</b><span>S1 union S2 is conflict-free and defends all its members: admissible.</span>'
      ],
      answer: 'Conflict-free by three cases (both in S1, both in S2, mixed: the last excluded by assumption). Defended: any attacker of a member of S1 (or of S2) is attacked from inside that set, hence from inside the union. So S1 union S2 is admissible.',
      why: '<p>Defence only asks that something in the set attacks each attacker, and a set that grows keeps all its old attackers. What can break is conflict-freeness, which is exactly what the assumption removes.</p>',
      mistake: 'Skipping the mixed case in the conflict-freeness proof: that is the only place the assumption is used, and without it the claim is false.',
      vis: [
        { t: 'af', title: 'defence survives the union', nodes: ['A', 'B', 'C'], edges: [['C', 'B'], ['B', 'A']], pos: { C: [45, 95], B: [110, 95], A: [175, 95] },
          ext: [{ name: 'S1 union S2 (A in S1, C in S1)', set: ['A', 'C'] }],
          note: 'B attacks A in S1; S1 defends A through C, and C is still in the union, so the union defends A.' },
        { t: 'arg', name: 'Proof', premises: ['Conflict-free: both in S1 or both in S2 is excluded by admissibility; one in each is excluded by assumption', 'Defence: an attacker of a member of S1 (or S2) is attacked from inside that set, so from inside the union'], concl: 'S1 union S2 is admissible' }] },

    { label: 'Q7', marks: 10, mod: 4, title: 'No sentence is both groundedly true and groundedly false',
      q: '<p>Let K be a knowledge base (a set of sentences in some logical language L), and F_K = (AR_K, Att_K) the argumentation framework of the arguments constructed from K. For a sentence pi in L: pi is groundedly false if for any argument A in AR_K with conclusion pi, A is attacked by the grounded extension GE of F_K. pi is groundedly true if pi is the conclusion of some groundedly acceptable argument in F_K (an argument in GE).</p>' +
        '<p>Prove that there is no sentence that could be both groundedly true and groundedly false.</p>',
      hint: 'Assume a sentence is both and find one argument that is in GE and also attacked by GE. Which property of GE forbids that?',
      steps: [
        '<b>Assume the opposite.</b><span>Suppose pi is groundedly true and groundedly false.</span>',
        '<b>Use groundedly true.</b><span>There is an argument A with conclusion pi that belongs to GE.</span>',
        '<b>Use groundedly false.</b><span>The definition covers every argument with conclusion pi, so in particular A is attacked by GE: some B in GE attacks A (B may be A itself).</span>',
        '<b>Contradiction.</b><span>Then A and B are both in GE and B attacks A. The grounded extension is conflict-free (it is admissible), so this is impossible.</span>',
        '<b>Conclude.</b><span>No sentence can be both groundedly true and groundedly false.</span>'
      ],
      answer: 'If pi were both, some A in GE has conclusion pi, and by groundedly false GE attacks A, so two members of GE (possibly A twice) conflict. GE is conflict-free: contradiction.',
      why: '<p>The whole proof is one property: the grounded extension is conflict-free. "Groundedly false" is stated for all arguments with that conclusion, so it applies to the one that lies in GE.</p>',
      mistake: 'Saying "no other argument in GE attacks A". The attacker B could be A itself, which conflict-freeness also excludes.',
      vis: [{ t: 'arg', name: 'Proof by contradiction', premises: ['pi groundedly true: some A in GE has conclusion pi', 'pi groundedly false: every argument with conclusion pi, so A too, is attacked by GE: some B in GE attacks A', 'GE is conflict-free (it is admissible)'], concl: 'Contradiction: A and B in GE with B attacking A. No sentence is both', note: 'B may be A itself; conflict-freeness excludes that too.' }] },

    { label: 'Q8', marks: 10, mod: 5, title: 'Four statements about entailment and satisfiability',
      q: '<p>Let Gamma and Delta be sets of sentences in Propositional Logic, and phi and psi individual sentences. State whether each of the following statements is true or false. Prove it if it is true. Give a counter-example if it is false.</p>' +
        '<p>(a) If Gamma entails phi, then Gamma union Delta entails phi.</p>' +
        '<p>(b) If Gamma entails phi implies psi, then Gamma union {phi} entails psi.</p>' +
        '<p>(c) If Gamma entails phi and Gamma entails not phi, then Gamma entails psi.</p>' +
        '<p>(d) If Gamma union Delta is unsatisfiable, then either Gamma or Delta is unsatisfiable.</p>',
      hint: 'Entailment means every interpretation satisfying the left side satisfies the right side. For each, start from an interpretation that satisfies the left side.',
      steps: [
        '<b>(a) True (monotonicity).</b><span>Let I satisfy every sentence of Gamma union Delta. Then I satisfies all of Gamma, and Gamma entails phi, so I satisfies phi. Hence Gamma union Delta entails phi.</span>',
        '<b>(b) True (deduction theorem, one direction).</b><span>Let I satisfy Gamma union {phi}. I satisfies Gamma, so by assumption I satisfies phi implies psi. I also satisfies phi. The implication is true and its antecedent is true, so psi is true in I.</span>',
        '<b>(c) True (everything follows from a contradiction).</b><span>Suppose I satisfies Gamma. Then I satisfies phi and not phi, which is impossible. So no interpretation satisfies Gamma, and the statement "every I satisfying Gamma satisfies psi" holds vacuously.</span>',
        '<b>(d) False.</b><span>Counter-example: Gamma = {p} and Delta = {not p}. Each set alone is satisfiable (p true, p false), but Gamma union Delta = {p, not p} is not.</span>'
      ],
      answer: '(a) true. (b) true. (c) true. (d) false: Gamma = {p}, Delta = {not p}.',
      why: '<p>Entailment is a statement about every model of the left side. Adding premises only removes models, which gives (a) and (b); an empty set of models gives (c). Unsatisfiability of a union can arise from a clash between the two sets even when each is fine, which refutes (d).</p>',
      mistake: 'For (d), reading the statement as "if the union is unsatisfiable then some single sentence is": a clash between the two sets is enough.',
      vis: [
        { t: 'table', title: '(d) counter-example', head: ['p', 'Gamma = {p}', 'Delta = {not p}', 'Gamma union Delta'], rows: [[1, 1, 0, 0], [0, 0, 1, 0]], hl: { 0: 'bad', 1: 'bad' }, note: 'Gamma has a model (row 1), Delta has a model (row 2), the union has none: no row satisfies both.' },
        { t: 'table', title: 'The four statements', head: ['Statement', 'Verdict', 'Why'], rows: [['(a) monotonicity', 'true', 'models of Gamma union Delta are among the models of Gamma'], ['(b) deduction', 'true', 'phi and (phi implies psi) are both true, so psi is'], ['(c) contradiction', 'true', 'Gamma has no models, so the entailment is vacuous'], ['(d) union', 'false', 'Gamma = {p}, Delta = {not p}']], hl: { 0: 'ok', 1: 'ok', 2: 'ok', 3: 'bad' } }] },

    { label: 'Q9', marks: 5, mod: 5, title: 'Fitch proof of p implies (q implies p)',
      q: '<p>Use the Fitch proof system to prove that {} entails p implies (q implies p).</p>',
      hint: 'The goal is an implication, so assume its antecedent in a box. Inside, the goal is again an implication.',
      steps: [
        '<b>Open a box for the outer implication.</b><span>Assume p (line 1).</span>',
        '<b>Open a box for the inner implication.</b><span>Assume q (line 2), inside the first box.</span>',
        '<b>Get p again.</b><span>p is visible from the outer box, so copy it with Reiteration (line 3).</span>',
        '<b>Close the inner box.</b><span>Implication Introduction on lines 2 to 3 gives q implies p (line 4).</span>',
        '<b>Close the outer box.</b><span>Implication Introduction on lines 1 to 4 gives p implies (q implies p) (line 5), with no assumptions left.</span>',
        '<pre>1.    | p                    Assumption\n2.    | | q                  Assumption\n3.    | | p                  Reiteration: 1\n4.    | q -&gt; p             Implication Introduction: 2-3\n5.    p -&gt; (q -&gt; p)       Implication Introduction: 1-4</pre>'
      ],
      answer: 'The five-line proof above: assume p, assume q, reiterate p, introduce q implies p, introduce p implies (q implies p).',
      why: '<p>Implication Introduction discharges an assumption: after reaching psi under the assumption phi, the box closes and phi implies psi stands without assumptions. The proof is sound for a tautology: it needs no premises.</p>',
      mistake: 'Citing line 1 for q implies p without Reiteration, or closing the boxes in the wrong order.',
      vis: [{ t: 'fitch', lines: [[1, 'p', 'Assumption'], [2, 'q', 'Assumption'], [2, 'p', 'Reiteration: 1'], [1, 'q -> p', 'Implication Introduction: 2-3'], [0, 'p -> (q -> p)', 'Implication Introduction: 1-4']] }] },

    { label: 'Q10', marks: 5, mod: 5, title: 'Resolution proof of a disjunction entailment',
      q: '<p>Given the premises not q implies not p and not s implies not r. Is p or r implies q or s logically entailed from the premises? If yes, use Propositional Resolution to prove. If no, explain why.</p>',
      hint: 'Put the premises and the negated goal into clauses, then resolve until the empty clause appears.',
      steps: [
        '<b>Premise clauses.</b><span>not q implies not p is q or not p: clause 1 {q, not p}. not s implies not r is s or not r: clause 2 {s, not r}.</span>',
        '<b>Negate the goal.</b><span>not ((p or r) implies (q or s)) is (p or r) and not q and not s. Clauses 3 {p, r}, 4 {not q}, 5 {not s}.</span>',
        '<b>Resolve.</b><span>6: from 1 and 4 on q: {not p}. 7: from 2 and 5 on s: {not r}. 8: from 3 and 6 on p: {r}. 9: from 8 and 7 on r: the empty clause {}.</span>',
        '<b>Conclude.</b><span>The premises plus the negated goal are unsatisfiable, so the goal is entailed.</span>'
      ],
      answer: 'Yes. Clauses {q, not p}, {s, not r}, {p, r}, {not q}, {not s}; resolvents {not p}, {not r}, {r}, {}.',
      why: '<p>Resolution proves entailment by refutation: premises together with the negated goal are shown unsatisfiable by deriving the empty clause. Each resolution step is sound, so the empty clause cannot come from a satisfiable set.</p>',
      mistake: 'Negating the goal wrongly as (not p or not r) implies ...: negate the whole implication, which gives the conjunction.',
      vis: [{ t: 'tree', nodes: [{ id: 1, text: '{q, ¬p}' }, { id: 2, text: '{s, ¬r}' }, { id: 3, text: '{p, r}' }, { id: 4, text: '{¬q}' }, { id: 5, text: '{¬s}' },
        { id: 6, text: '{¬p}', from: [1, 4], note: 'on q' }, { id: 7, text: '{¬r}', from: [2, 5], note: 'on s' }, { id: 8, text: '{r}', from: [3, 6], note: 'on p' }, { id: 9, text: '{}', from: [8, 7], note: 'on r' }] }],
      tryit: { w: 'entail', say: 'Check the entailment in the tool:', cfg: { title: 'ENTAILMENT CHECK', delta: ['~q -> ~p', '~s -> ~r'], phi: '(p | r) -> (q | s)' } } },

    { label: 'Q11', marks: 10, mod: 7, title: 'The sorority: Herbrand logic',
      q: '<p>This concerns the interpersonal relations of a small sorority. There are just four members: Abby, Bess, Cody and Dana, and there is just one type of binary relationship: likes. In the table a check means the girl in the row likes the girl in the column; no check means she does not. Read from the figure: Abby likes Bess and Dana; Bess likes Abby and Cody; Cody likes Bess and Dana; Dana likes Abby and Cody.</p>' +
        '<p>Let Delta be a set of sentences in Herbrand logic representing the above knowledge.</p>' +
        '<p>(a) What is the smallest signature Sigma that Delta needs to assume? What is the size of the Herbrand base in this signature?</p>' +
        '<p>(b) Does Delta logically entail forall y. (likes(bess, y) implies likes(abby, y))? Explain your answer carefully.</p>' +
        '<p>(c) Does Delta logically entail forall x. not likes(x, x)? Explain your answer carefully.</p>',
      hint: 'Delta lists every cell of the table, the checks as positive facts and the blanks as negative facts, so it has exactly one model. Evaluate each sentence in that model.',
      steps: [
        '<b>(a) Signature.</b><span>Four object constants abby, bess, cody, dana and one binary relation constant likes. No function constants, so the Herbrand universe is the four names.</span>',
        '<b>(a) Herbrand base.</b><span>All ground atoms likes(x, y) for x, y in the universe: 4 times 4 = 16.</span>',
        '<b>(b) Method.</b><span>Delta fixes the truth value of all 16 atoms (the 8 checks true, the 8 blanks false), so its only model is the table. The sentence is entailed iff it holds in that model; it is a universal statement, so one instance that fails refutes it.</span>',
        '<b>(b) Counter-instance.</b><span>y = abby: Bess likes Abby (a check), Abby does not like Abby (a blank). So the sentence is false in the model. y = cody also fails. Not entailed.</span>',
        '<b>(c) Method.</b><span>Check the four diagonal cells likes(abby,abby), likes(bess,bess), likes(cody,cody), likes(dana,dana): all blank, so all false.</span>',
        '<b>(c) Conclude.</b><span>not likes(x, x) holds for every x in the universe, so it holds in the only model: entailed. The step to the universal statement uses that the universe contains only those four names (Herbrand semantics).</span>'
      ],
      answer: '(a) Sigma = {likes, abby, bess, cody, dana}, |HB| = 16. (b) No: y = abby gives likes(bess, abby) true and likes(abby, abby) false (also y = cody). (c) Yes: the four diagonal cells are all blank, and the universe has only these four members.',
      why: '<p>In Herbrand logic an interpretation is a subset of the Herbrand base, and the universe is the set of ground terms. When Delta states every ground atom as true or false there is exactly one model, so entailment is just truth in that model.</p>',
      mistake: 'In (c), arguing only "for any girl x" without the table: the entailment holds because of the diagonal cells, and only because Delta states the negative facts too.',
      vis: [{ t: 'table', title: 'likes (row likes column), the only model of Delta', head: ['', 'abby', 'bess', 'cody', 'dana'], rows: [['abby', 0, 1, 0, 1], ['bess', 1, 0, 1, 0], ['cody', 0, 1, 0, 1], ['dana', 1, 0, 1, 0]], hl: { 0: 'bad', 1: 'bad' },
        note: '16 cells = the Herbrand base. (b) fails at y = abby: bess likes abby (1) but abby does not (0). (c) holds: the diagonal is all 0.' }] },

    { label: 'Q12', marks: 10, mod: 7, title: 'Resolution proof of Peirce\'s law',
      q: '<p>Use the Resolution proof system to prove that forall x. (((p(x) implies q(x)) implies p(x)) implies p(x)) is valid.</p>',
      hint: 'A sentence is valid iff its negation is unsatisfiable: negate, skolemise, convert to clauses, derive the empty clause.',
      steps: [
        '<b>Negate.</b><span>Not forall x. (((p(x) implies q(x)) implies p(x)) implies p(x)) is exists x. not (((p(x) implies q(x)) implies p(x)) implies p(x)).</span>',
        '<b>Skolemise.</b><span>Replace x by a fresh constant c: not (((p(c) implies q(c)) implies p(c)) implies p(c)), which is ((p(c) implies q(c)) implies p(c)) and not p(c).</span>',
        '<b>Clauses of the first conjunct.</b><span>(p(c) implies q(c)) implies p(c) is not(not p(c) or q(c)) or p(c) = (p(c) and not q(c)) or p(c) = (p(c) or p(c)) and (not q(c) or p(c)). Clauses: 1 {p(c)}, 2 {not q(c), p(c)}.</span>',
        '<b>Second conjunct.</b><span>Clause 3 {not p(c)}.</span>',
        '<b>Resolve.</b><span>1 and 3 on p(c): the empty clause. The negation is unsatisfiable, so the original sentence is valid.</span>'
      ],
      answer: 'Clauses {p(c)}, {not q(c), p(c)}, {not p(c)}; resolving the first and the third gives the empty clause.',
      why: '<p>Validity of phi is unsatisfiability of not phi. The existential from the negation of the universal is replaced by a Skolem constant. Clause 2 is not needed in the refutation.</p>',
      mistake: 'Negating without turning the universal into an existential (and so forgetting the Skolem constant).',
      vis: [{ t: 'tree', nodes: [{ id: 1, text: '{p(c)}' }, { id: 2, text: '{¬q(c), p(c)}' }, { id: 3, text: '{¬p(c)}' }, { id: 4, text: '{}', from: [1, 3], note: 'on p(c)' }] }] },

    { label: 'Q13', marks: 10, mod: 7, title: 'Resolution with variables: transitivity and two facts',
      q: '<p>Use the Resolution proof system to prove that forall x. forall y. p(x, y) is logically entailed from the knowledge base Delta = { forall x. forall y. forall z. (p(x,y) and p(y,z) implies p(x,z)), forall x. p(x,a), forall y. p(a,y) }.</p>',
      hint: 'Negate the goal and skolemise it into two constants. Use the transitivity clause once, then the two facts.',
      steps: [
        '<b>Clauses of Delta.</b><span>1: {not p(x,y), not p(y,z), p(x,z)}. 2: {p(x,a)}. 3: {p(a,y)}.</span>',
        '<b>Negated goal.</b><span>Not forall x. forall y. p(x,y) is exists x. exists y. not p(x,y); with Skolem constants b and c: 4: {not p(b,c)}.</span>',
        '<b>Step 5.</b><span>Resolve 1 with 4 on p(x,z) with x = b, z = c: {not p(b,y), not p(y,c)}.</span>',
        '<b>Step 6.</b><span>Resolve 5 with 2 {p(x2,a)} on not p(b,y): unifier x2 = b, y = a. Result {not p(a,c)}.</span>',
        '<b>Step 7.</b><span>Resolve 6 with 3 {p(a,y2)} on p(a,c): y2 = c. Result: the empty clause.</span>',
        '<b>Conclude.</b><span>Delta plus the negated goal is unsatisfiable, so Delta entails forall x. forall y. p(x,y).</span>'
      ],
      answer: 'Clauses {not p(x,y), not p(y,z), p(x,z)}, {p(x,a)}, {p(a,y)}, {not p(b,c)}; resolvents {not p(b,y), not p(y,c)}, {not p(a,c)}, {}.',
      why: '<p>Every element reaches a (via fact 2, p(b,a)) and a reaches every element (fact 3, p(a,c)); transitivity chains b to a to c. Resolution finds this by unifying the transitivity clause with the negated goal.</p>',
      mistake: 'Skolemising the negated goal with functions of x and y: the negated goal is existential and not under any universal, so plain constants are right.',
      vis: [{ t: 'tree', nodes: [{ id: 1, text: '{¬p(x,y), ¬p(y,z), p(x,z)}' }, { id: 4, text: '{¬p(b,c)}' }, { id: 2, text: '{p(x,a)}' }, { id: 3, text: '{p(a,y)}' },
        { id: 5, text: '{¬p(b,y), ¬p(y,c)}', from: [1, 4], note: 'x=b, z=c' }, { id: 6, text: '{¬p(a,c)}', from: [5, 2], note: 'y=a' }, { id: 7, text: '{}', from: [6, 3], note: 'y2=c' }] }],
      tryit: { w: 'refute', say: 'Run the search in the workbench:', cfg: { title: 'TRANSITIVITY', mode: 'fol', premises: ['forall x. forall y. forall z. (p(x,y) & p(y,z) -> p(x,z))', 'forall x. p(x,a)', 'forall y. p(a,y)'], goal: 'forall x. forall y. p(x,y)' } } },

    { label: 'Q14', marks: 5, mod: 7, title: 'Propositional, Finite Herbrand and Herbrand logic compared',
      q: '<p>Write a short paragraph to discuss the relationships between Propositional Logic, Finite Herbrand Logic (also called Relational Logic), and Herbrand Logic (predicate logic with Herbrand semantics).</p>',
      hint: 'Compare what the signature allows, how big the universe and the Herbrand base are, and what that means for decidability.',
      steps: [
        '<b>Propositional logic.</b><span>Sentences built from proposition letters; an interpretation is a truth assignment, with 2^n of them for n letters. Entailment is decidable by truth table.</span>',
        '<b>Finite Herbrand logic.</b><span>Adds predicates, variables and quantifiers, but the signature has finitely many object constants and no function constants. The Herbrand universe is those constants and the Herbrand base is finite (for a relation of arity k and n constants, n^k atoms).</span>',
        '<b>Reduction to propositional logic.</b><span>Replace forall by the conjunction of its instances and exists by the disjunction, and treat each ground atom as a proposition letter. Every finite Herbrand theory becomes a propositional one with the same models, so entailment is decidable and no expressive power is added; the gain is that the notation is far more compact.</span>',
        '<b>Herbrand logic.</b><span>Adds function constants. With one object constant and one function constant the universe, e.g. {a, f(a), f(f(a)), ...}, is infinite, so the Herbrand base is infinite and the interpretations are uncountably many. The quantifiers are infinite conjunctions and disjunctions, which cannot be expanded into a finite propositional theory.</span>',
        '<b>Consequence.</b><span>Entailment in Herbrand logic is not decidable, and not even semi-decidable: no proof procedure is both sound and complete for it. Resolution stays sound (a proof it finds is correct), but some Herbrand entailments have no resolution proof at all. Compactness fails too: the set {p(a), p(f(a)), p(f(f(a))), ...} together with exists y. not p(y) is unsatisfiable although each finite part has a model.</span>',
        '<b>Summary.</b><span>Propositional logic and finite Herbrand logic are equivalent in power (the second compiles to the first), and propositional logic is a special case of both. Herbrand logic strictly extends them: it can express infinite structures such as the natural numbers.</span>'
      ],
      answer: 'Finite Herbrand logic compiles to propositional logic by grounding (finite universe, no functions), so the two are equally expressive and decidable, the first being more compact. Herbrand logic adds function constants, giving an infinite universe and Herbrand base that cannot be grounded into a finite propositional theory; it is more expressive, entailment is not even semi-decidable (no sound and complete proof procedure), and compactness fails.',
      why: '<p>The three logics are ordered by the signature: no quantifiers or terms, finitely many constants, then function constants. Each step enlarges the set of ground terms, and with it the set of interpretations, and the infinite step is what costs decidability.</p>',
      mistake: 'Saying finite Herbrand logic is more expressive than propositional logic: it is more compact, but every theory in it has a propositional equivalent.',
      vis: [{ t: 'table', head: ['', 'Propositional', 'Finite Herbrand', 'Herbrand'], rows: [['Signature', 'proposition letters', 'finitely many object constants, no function constants', 'adds function constants'], ['Universe', 'none', 'finite', 'infinite'], ['Herbrand base', 'the letters', 'finite (n^k atoms)', 'infinite'], ['Grounding to propositional', 'is propositional', 'yes, same models', 'no'], ['Entailment', 'decidable', 'decidable', 'not even semi-decidable'], ['Compactness', 'holds', 'holds', 'fails']], hl: { 4: 'bad', 5: 'bad' }, note: 'The first two are equally expressive; only the third loses decidability.' }] }
  ] });
