/* Midterm (official solution): worked answers. */
UI.examPaper({ n: 1, title: 'Midterm (official solution)', sub: '8 questions, 100 marks: arguments and propositions in natural language, then argumentation semantics.',
  html: '<p class="lead">This is the official midterm with its marking scheme. The answers are the official ones, expanded into steps so you can see how each one is reached. Open-ended answers (Q1 to Q5-1) are written in the standard form: numbered premises, a line, then the conclusion marked with the therefore sign.</p>' +
    '<table><tr><th>Part</th><th>Question</th><th>Marks</th><th>Topic</th></tr>' +
    '<tr><td rowspan="5">I (55)</td><td>Q1</td><td>10</td><td>Standard form of categorical arguments, Venn diagrams, deductive or not</td></tr>' +
    '<tr><td>Q2</td><td>10</td><td>Conclusion and premises of a product review</td></tr>' +
    '<tr><td>Q3</td><td>10</td><td>Supporting and attacking arguments, kind of attack</td></tr>' +
    '<tr><td>Q4</td><td>10</td><td>Structured arguments, rebut and undercut (TOAST)</td></tr>' +
    '<tr><td>Q5-1</td><td>15</td><td>Sherlock Holmes case: arguments and the attack graph</td></tr>' +
    '<tr><td rowspan="3">II (45)</td><td>Q5</td><td>15</td><td>Extensions of an abstract argumentation framework</td></tr>' +
    '<tr><td>Q6</td><td>15</td><td>From an argumentation theory to a framework, preferred and grounded acceptability</td></tr>' +
    '<tr><td>Q7</td><td>15</td><td>Proof: no admissible set attacks the grounded extension</td></tr></table>',
  problems: [
    { label: 'Q1', marks: 10, mod: 3, title: 'Categorical arguments: standard form, Venn diagram, deductive or not',
      q: '<p>Using the four standard categorical proposition forms, rewrite the following arguments in the standard form (reasons, then the conclusion). Then draw a Venn diagram and say whether the argument is deductive or not.</p>' +
        '<p>Example: All mammals are animals. All dogs are mammals. Hence all dogs are animals. Answer: All M are A; All D are M; so all D are A. Deductive.</p>' +
        '<p>(a) (2 marks) No reptiles are warm-blooded animals. All snakes are reptiles. Hence no snakes are warm-blooded animals.</p>' +
        '<p>(b) (2 marks) All philosophers are thinkers. Some teachers are philosophers. Some teachers are philosophers.</p>' +
        '<p>(c) (2 marks) No fish are mammals. Some pets are fish. Hence some pets are not mammals.</p>' +
        '<p>(d) (2 marks) Electric cars are vehicles. Some taxis are electric cars. Hence some taxis are vehicles.</p>' +
        '<p>(e) (2 marks) I do not believe in any politician. A general is not a politician. Hence I believe in some general.</p>',
      hint: 'Name each category with a letter, use All / No / Some / Some-are-not for the four forms, then ask: can the premises be true while the conclusion is false?',
      steps: [
        '<b>(a) Standard form.</b><span>Premise 1: No R are WA. Premise 2: All S are R. Conclusion: No S are WA. (R reptiles, WA warm-blooded animals, S snakes.)</span>',
        '<b>(a) Venn diagram.</b><span>Three circles S, R, WA. Premise 1 shades the whole overlap R and WA. Premise 2 shades the part of S outside R. What is left of S lies inside R but outside WA, so S and WA share no unshaded region: the conclusion is already drawn. Deductive.</span>',
        '<b>(b) Standard form.</b><span>Premise 1: All P are T. Premise 2: Some TC are P. Conclusion: Some TC are P. (P philosophers, T thinkers, TC teachers.)</span>',
        '<b>(b) Deductive or not.</b><span>Premise 2 draws an X in the overlap of TC and P, and the conclusion says exactly that. A conclusion that repeats a premise can never be false when the premise is true. Deductive.</span>',
        '<b>(c) Standard form.</b><span>Premise 1: No F are M. Premise 2: Some P are F. Conclusion: Some P are not M. (F fish, M mammals, P pets.) The conclusion keeps the subject of the English sentence, pets.</span>',
        '<b>(c) Venn diagram.</b><span>Premise 1 shades the overlap F and M. Premise 2 puts an X in P and F, and since the overlap with M is shaded the X sits in F outside M. That X is a pet outside M. Deductive.</span>',
        '<b>(d) Standard form.</b><span>Premise 1: All EC are V. Premise 2: Some T are EC. Conclusion: Some T are V. Premise 1 shades EC outside V, so the X of premise 2 (in T and EC) must sit inside V. Deductive.</span>',
        '<b>(e) Standard form.</b><span>Premise 1: No P are B. Premise 2: No G are P. Conclusion: Some G are B. (P politicians, B things I believe in, G generals.)</span>',
        '<b>(e) Venn diagram.</b><span>Premises 1 and 2 only shade regions (P and B, G and P). Nothing is shaded in G and B outside P, so the diagram leaves that region open and there is no X in it. The conclusion needs an X there, so it is not drawn. Not deductive: take a world where I believe in nobody at all.</span>'
      ],
      answer: '(a) No R are WA; All S are R; so No S are WA: deductive. (b) All P are T; Some TC are P; so Some TC are P: deductive. (c) No F are M; Some P are F; so Some P are not M: deductive. (d) All EC are V; Some T are EC; so Some T are V: deductive. (e) No P are B; No G are P; so Some G are B: NOT deductive.',
      why: '<p>A categorical argument is deductive when every Venn diagram that draws the premises already draws the conclusion. Universal premises shade regions, particular premises place an X. A particular conclusion (Some) needs an X, so at least one premise must place an X; (e) has two universal premises and a particular conclusion, so it cannot be valid.</p>',
      mistake: 'Two negative premises never give a conclusion. Also do not skip the step of naming the categories: S, M, P must stay the same letters in premises and conclusion.',
      paperSays: 'In (c) the official answer writes the conclusion as "Some F are not M". The English conclusion is "some pets are not mammals", so the correct standard form is "Some P are not M". The verdict (deductive) is the same.',
      vis: [
        { t: 'venn', title: '(a) deductive', labels: ['S', 'R', 'WA'], empty: ['011', '111', '100', '101'], note: 'Grey: R and WA overlap (premise 1) and S outside R (premise 2). The S and WA overlap is all grey, so the conclusion is drawn.' },
        { t: 'venn', title: '(b) deductive', labels: ['TC', 'P', 'T'], empty: ['010', '110'], some: ['111'], note: 'All P are T greys P outside T, so the x of "Some TC are P" is in TC, P and T. The conclusion repeats that x.' },
        { t: 'venn', title: '(c) deductive', labels: ['P', 'F', 'M'], empty: ['011', '111'], some: ['110'], note: 'The x of "Some P are F" must sit outside M (the overlap of F and M is grey): a pet that is not a mammal.' },
        { t: 'venn', title: '(d) deductive', labels: ['T', 'EC', 'V'], empty: ['010', '110'], some: ['111'], note: 'EC outside V is grey, so the x of "Some T are EC" sits inside V: some taxi is a vehicle.' },
        { t: 'venn', title: '(e) not deductive', labels: ['G', 'P', 'B'], empty: ['011', '111', '110'], note: 'Only shading, no x anywhere. The region G and B outside P is open but has no x, so "Some G are B" is not drawn.' }] },

    { label: 'Q2', marks: 10, mod: 2, title: 'Main argument of a camera review',
      q: '<p>We focus on only the main argument that the customer presents in a product review about the digital camera Nikon Coolpix 5700. The review: the customer liked the camera and had it for a year without a problem, but agrees the auto focus is not perfect. After using a 5000 for 8 months the customer found four things disliked about it: not enough telephoto, flash sensor in a bad location (underexposed flash photos), on/off switch a little difficult to use, and the lens cap had to be removed to turn on the camera. The 5700 corrects all of these things with up to 280 mm (35 mm equivalent) maximum focal length. The on/off switch is easier to turn. Both the 5000 and 5700 seem to be the same camera as far as features and quality are concerned. The rest of the review praises the electronic view finder, ends with "I love using this camera. I highly recommend the Nikon Coolpix 5700 camera", and after 3 months says "I took over 600 pictures and I was extremely happy ... This is a mighty fine camera!"</p>' +
        '<p>(a) (4 marks) What is the conclusion of the argument?</p><p>(b) (6 marks) List all premises the customer uses to support the above conclusion.</p>',
      hint: 'The main argument is the one built around the comparison with the earlier model. Ask what claim all the "it corrects this" sentences support.',
      steps: [
        '<b>Find the claim being supported.</b><span>Everything about the 5000 versus the 5700 is evidence that the customer is happy with the camera. The first sentence states it: "I actually liked this camera".</span>',
        '<b>(a) Conclusion.</b><span>I like this camera. Writing "I love using this camera" or "I highly recommend the camera" earns 2 of the 4 marks, because they are not the conclusion of the main argument.</span>',
        '<b>(b) Premises: the four old problems are fixed.</b><span>The 5000 had four faults and the 5700 corrects them, so the premises are: there is enough telephoto; the flash sensor is in a good location; the on/off switch is easier to turn; the lens cap need not be removed to turn on the camera.</span>',
        '<b>(b) Premises: the supporting facts.</b><span>The maximum focal length is up to 280 mm (this is why telephoto is enough); the other features and quality are the same as the 5000.</span>',
        '<b>Leave out the rest.</b><span>The auto focus complaint, the view finder remarks and the vacation update are not premises of this main argument.</span>'
      ],
      answer: '(a) I like this camera. (b) Premises: enough telephoto; flash sensor in a good location; on/off switch easier to turn; no need to remove the lens cap to turn on the camera; maximum focal length of 280 mm; other features are the same as the 5000.',
      why: '<p>The conclusion is the claim the other statements are given for. Premises are the statements the author offers as reasons; sentences that only describe the story (8 months, Colorado) or that support other claims are not part of this argument.</p>',
      mistake: 'Taking the last sentence ("highly recommend") as the conclusion. It is a different, later claim that rests on the liking.',
      vis: [{ t: 'arg', name: 'Main argument', premises: ['There is enough telephoto', 'The flash sensor is in a good location', 'The on/off switch is easier to turn', 'There is no need to remove the lens cap to turn on the camera', 'The maximum focal length is up to 280 mm', 'Other features and quality are the same as the 5000'], concl: 'I like this camera', note: 'The conclusion is the claim the other six statements are given for.' }] },

    { label: 'Q3', marks: 10, mod: 2, title: 'A second review: a supporting argument and an attack',
      q: '<p>Here is another review about the same camera by a different customer: "This is a very good quality camera in most respects. The optical quality is superb, the zoom is excellent, and the function is fairly intuitive. It is compact and cleanly designed. I have problems in three areas however. As others have noted, the autofocus is annoyingly slow. Also, you cannot raise the flash manually when you know you will need it. Instead, you must depress the shutter button, which results in an unintended flash photo occurring half the time. Lastly, the close focus limit is rather distant making macro photos impossible. Since it is too big to fit in a pocket or purse I am looking forward to a suitable carrying case being available. Overall, it is an excellent value."</p>' +
        '<p>(a) (4 marks) Find an argument in the above review that has a similar claim as the argument in Q2. List all premises of this argument.</p>' +
        '<p>(b) (4 marks) Does this second customer also present an argument that attacks the Q2 one? Write this attacking argument in the standard form.</p>' +
        '<p>(c) (2 marks) The above attack relationship belongs to which kind of attack (rebut, undercut, or undermine)? Explain.</p>',
      hint: 'Q2 says the camera is good. Find the sentence of this review that says the same, and the sentence that says the opposite, each with its reasons.',
      steps: [
        '<b>(a) Same claim.</b><span>The review opens with "a very good quality camera", which is close to Q2\'s "I like this camera".</span>',
        '<b>(a) Its premises.</b><span>The optical quality is superb. The zoom is excellent and the function is fairly intuitive. It is compact and cleanly designed. Conclusion: this is a very good quality camera.</span>',
        '<b>(b) Look for the opposite claim.</b><span>After "problems in three areas" the customer lists reasons why the camera is not that good. Yes, there is an attacking argument.</span>',
        '<b>(b) Standard form.</b><span>1. The autofocus is annoyingly slow. 2. You cannot raise the flash manually when you know you will need it. 3. The close focus limit is rather distant, making macro photos impossible. 4. It is too big to fit in a pocket, and no carrying case yet. Conclusion: this is not a very good quality camera.</span>',
        '<b>(c) Name the attack.</b><span>Rebut. The conclusion "not very good quality" contradicts the conclusion "very good quality" of the argument in (a) (and the liking of Q2). A rebut attacks the conclusion.</span>',
        '<b>(c) Why not the others.</b><span>An undermine would deny one premise, and an undercut would deny that the premises support the conclusion. This argument does neither: it just concludes the opposite.</span>'
      ],
      answer: '(a) This is a very good quality camera, since the optical quality is superb; the zoom is excellent and the function fairly intuitive; it is compact and cleanly designed. (b) Yes: the autofocus is annoyingly slow; the flash cannot be raised manually; the close focus limit is distant; too big for a pocket with no case; so this is not a very good quality camera. (c) Rebut: the two conclusions contradict each other.',
      why: '<p>Course definitions: rebut means the attacker\'s conclusion contradicts the conclusion of the attacked argument; undermine contradicts a premise; undercut denies the link between premises and conclusion. Matching the type means comparing the attacker\'s conclusion with each part of the target.</p>',
      mistake: 'Calling it an undermine because the new premises are about the same camera features. What decides it is where the attack lands, and here it lands on the conclusion.',
      vis: [
        { t: 'arg', name: 'A1 (part a)', premises: ['The optical quality is superb', 'The zoom is excellent and the function is fairly intuitive', 'It is compact and cleanly designed'], concl: 'This is a very good quality camera' },
        { t: 'arg', name: 'A2 (part b)', premises: ['The autofocus is annoyingly slow', 'You cannot raise the flash manually', 'The close focus limit is distant, so no macro photos', 'It is too big for a pocket and there is no case yet'], concl: 'This is not a very good quality camera' },
        { t: 'af', nodes: ['A1', 'A2'], edges: [['A2', 'A1', 'rebut'], ['A1', 'A2', 'rebut']], pos: { A1: [50, 95], A2: [170, 95] }, note: 'The two conclusions contradict, so each rebuts the other.' }] },

    { label: 'Q4', marks: 10, mod: 4, title: 'John in Holland Park: arguments and attacks',
      q: '<p>Suppose we believe that John was in Holland Park some morning and that Holland Park is in London. However Jan told us that he met John in Amsterdam that morning around the same time. We do not fully believe Jan though. Jan has a reason to lie, since John is a suspect in a robbery in Holland Park that morning and Jan and John are friends. The diagram summarises our knowledge (TOAST: A1 janSays, A2 hollandParkInLondon, A3 janAndJohnAreFriends, A4 weSawJohnInHollandPark, A5 A1 => johnWasInAmster, A6 A3 => janLies, A7 A4 => johnInHollandPark, A8 A6 => ~[janSays => johnWasInAmster], A9 A2,A7 => johnWasInLondon).</p>' +
        '<p>(a) (2 marks) Write the standard form of the argument that "John was in London".</p>' +
        '<p>(b) Write the standard form of the argument that attacks the above argument. Determine what kind of attacking relationship this is.</p>' +
        '<p>(c) Write the standard form of the argument that attacks the argument you gave in (b). Determine what kind of attacking relationship this is.</p>',
      hint: 'Follow the chain: facts, sub-argument, conclusion. For each attack ask whether it hits the conclusion (rebut) or the rule that links premises to conclusion (undercut).',
      steps: [
        '<b>(a) Build A9.</b><span>We saw John in Holland Park, therefore John is in Holland Park (this is A7). A7, together with Holland Park is in London, gives: John was in London.</span>',
        '<b>(a) Standard form.</b><span>A9: [We saw John in Holland Park, so John is in Holland Park] and [Holland Park is in London], so John was in London.</span>',
        '<b>(b) Find the attacker.</b><span>Jan says John was in Amsterdam. That gives A5: Jan says (A1), therefore John was in Amsterdam.</span>',
        '<b>(b) Kind of attack.</b><span>A5 concludes John was in Amsterdam, A9 concludes John was in London. The conclusions contradict, so A5 rebuts A9. The figure shows the attack both ways: A5 and A9 rebut each other.</span>',
        '<b>(c) Attack the attacker.</b><span>We doubt Jan because Jan and John are friends. A6: Jan and John are friends, therefore Jan lies. A8: from A6, therefore it is not the case that "Jan says it, so John was in Amsterdam".</span>',
        '<b>(c) Kind of attack.</b><span>A8 does not deny that Jan said it, and does not state that John was elsewhere. It denies that the inference from "Jan says" to "John was in Amsterdam" holds. That is an undercut: A8 undercuts A5.</span>',
        '<b>Resulting framework.</b><span>Attacks: A8 to A5, A5 to A9, A9 to A5. A8 has no attacker and defends A9 against A5, so A8 and A9 are in the preferred (and grounded) extension, together with every other argument except A5 (the sub-arguments, such as A6, are unattacked): we believe John was in London.</span>'
      ],
      answer: '(a) We saw John in Holland Park, so John is in Holland Park; with Holland Park is in London: John was in London (A9). (b) A5: Jan says John was in Amsterdam, so John was in Amsterdam; A5 rebuts A9. (c) A8: from A6 (Jan and John are friends, so Jan lies), it is not the case that "Jan says so, therefore John was in Amsterdam"; A8 undercuts A5.',
      why: '<p>The three arguments form a chain of attacks. A rebut meets a conclusion with the opposite conclusion; an undercut meets the rule itself. The undercut makes Jan\'s testimony unreliable without claiming anything about where John was, which is exactly the "we do not fully believe Jan" of the story.</p>',
      mistake: 'Writing A8 as an argument for "John was not in Amsterdam". It is about the inference from Jan\'s words, not about John\'s location.',
      vis: [{ t: 'af', nodes: ['A8', 'A5', 'A9'], edges: [['A8', 'A5', 'undercut'], ['A5', 'A9', 'rebut'], ['A9', 'A5', 'rebut']],
        pos: { A8: [35, 95], A5: [105, 95], A9: [180, 95] },
        ext: [{ name: 'preferred = grounded', set: ['A8', 'A9'] }],
        note: 'A8 has no attacker and undercuts A5, so A5 is red and A9 is defended against A5.' }] },

    { label: 'Q5-1', marks: 15, mod: 2, title: 'Sherlock Holmes: who is the murderer?',
      q: '<p>(A Sherlock Holmes investigation) Sherlock Holmes is investigating a case involving three persons Alan, Bob, John with the dead body of a big man. He knows:</p>' +
        '<p>p1: The murderer must be someone among the three suspects Alan, Bob, John. p2: A witness saw John in Amsterdam around the time the big man was killed. p3: Amsterdam is very far away from London where the dead body is found. p4: Any person, whether a suspect or not, is assumed to be innocent unless proven otherwise.</p>' +
        '<p>(a) (5 marks) Is it possible that John is the murderer? Construct an argument to support your answer (standard form). Explain whether the argument is deductive or not.</p>' +
        '<p>(b) (5 marks) Is it possible that Alan is the murderer? Construct an argument to support your answer (standard form). Explain whether the argument is deductive or not.</p>' +
        '<p>(c) (5 marks) Draw a directed graph representing all arguments and their attack relationships that Sherlock Holmes can identify from the investigation.</p>',
      hint: 'p4 gives presumptions of innocence; by elimination one suspect is left. Either answer to (a) and (b) scores fully, if the argument is in standard form and you decide deductive or not correctly.',
      steps: [
        '<b>(a) Argument that John is the murderer.</b><span>p4 gives Alan is innocent, and p4 gives Bob is innocent. With p1 (one of the three did it): A7 = p1, [p4, so Alan is innocent], [p4, so Bob is innocent], therefore John is the murderer.</span>',
        '<b>(a) Deductive?</b><span>No. p4 is only a default assumption: p1 and p4 can be true while the conclusion is false (for instance Alan is in fact guilty, and the default "innocent" fails for him). A7 is not deductive.</span>',
        '<b>(a) The other allowed answer.</b><span>John is not the murderer: A11 = p2, p3, therefore John is not the murderer (he was far away in Amsterdam). This is also not deductive: the witness may be wrong, or John could have had help.</span>',
        '<b>(b) Alan is the murderer.</b><span>A6 = p1, [p4, so John is innocent], [p4, so Bob is innocent], therefore Alan is the murderer. Not deductive for the same reason as A7.</span>',
        '<b>(b) Alan is innocent.</b><span>A4 = p4, therefore Alan is innocent. Not deductive: p4 holds unless proven otherwise, so a true p4 does not exclude guilt.</span>',
        '<b>(c) Nodes.</b><span>Four nodes: A7 (John is the murderer), A11 (John is not the murderer), A4 (Alan is innocent), A6 (Alan is the murderer).</span>',
        '<b>(c) Attacks.</b><span>A7 and A11 rebut each other (opposite conclusions about John). A6 and A7 undermine each other: A6 concludes Alan is the murderer, against Alan is innocent used inside A7; A7 concludes John is the murderer, against John is innocent used inside A6. A6 attacks A4 (murderer against innocent for Alan), as drawn in the TOAST figure.</span>',
        '<b>(c) Edge list.</b><span>A7 to A11, A11 to A7, A6 to A7, A7 to A6, A6 to A4. Preferred extensions: {A6, A11} and {A4, A7}; the grounded extension is empty.</span>'
      ],
      answer: '(a) A7: p1, Alan is innocent (p4), Bob is innocent (p4), so John is the murderer; not deductive (or A11: p2, p3, so John is not the murderer; not deductive). (b) A6: p1, John innocent (p4), Bob innocent (p4), so Alan is the murderer; not deductive (or A4: p4, so Alan is innocent; not deductive). (c) Nodes A7, A11, A4, A6; edges A7-A11 both ways, A6-A7 both ways, A6 to A4.',
      why: '<p>Every argument here depends on a default (p4) or on testimony (p2), so none is deductive: true premises still leave room for a false conclusion. Attacks arise because the conclusions of two arguments contradict (a rebut), or because one conclusion denies a premise used inside another argument (an undermine).</p>',
      mistake: 'Calling A7 deductive because p1 plus two eliminations look like a proof. The eliminations are defaults, not facts.',
      vis: [{ t: 'af', nodes: ['A11', 'A7', 'A6', 'A4'], edges: [['A7', 'A11', 'rebut'], ['A11', 'A7', 'rebut'], ['A6', 'A7', 'undermine'], ['A7', 'A6', 'undermine'], ['A6', 'A4', 'rebut']],
        pos: { A11: [40, 40], A7: [40, 130], A6: [160, 130], A4: [160, 40] },
        ext: [{ name: 'preferred', set: ['A6', 'A11'] }, { name: 'preferred', set: ['A4', 'A7'] }, { name: 'grounded', set: [] }],
        note: 'In {A6, A11}: A6 knocks out A7 and A4, A11 also knocks out A7. In {A4, A7}: A7 knocks out A11 and A6. Nothing is unattacked, so the grounded set is empty.' }] },

    { label: 'Q5', marks: 15, mod: 4, title: 'Extensions of a five-argument framework',
      q: '<p>Given the argumentation framework represented by the graph (a node is an argument; a directed edge is an attack). Read from the figure: a attacks b and b attacks a; b attacks c; c attacks d; d attacks e; e attacks c.</p>' +
        '<p>(a) (4 marks) List all admissible extensions.</p><p>(b) (4 marks) List all complete extensions.</p><p>(c) (4 marks) List all preferred extensions.</p><p>(d) (3 marks) What is the grounded extension?</p>',
      hint: 'Start with the grounded extension (no unattacked arguments?), then test each conflict-free set: does it attack every attacker of its members?',
      steps: [
        '<b>Attackers.</b><span>a: {b}. b: {a}. c: {b, e}. d: {c}. e: {d}.</span>',
        '<b>(d) Grounded.</b><span>f(empty) is the set of unattacked arguments. Every argument has an attacker, so f(empty) is empty and the iteration stops: GE = empty set.</span>',
        '<b>(a) Admissible: singletons.</b><span>{a}: its attacker b is attacked by a, ok. {b}: its attacker a is attacked by b, ok. {c} fails: b attacks c and c does not attack b. {d} fails: c attacks d and d does not attack c. {e} fails: d attacks e and e does not attack d.</span>',
        '<b>(a) Admissible: larger sets.</b><span>{b, d}: no attack between b and d; d is attacked by c and b attacks c, so d is defended. Admissible. No set containing c is admissible: to defend c against e the set must attack e, only d attacks e, and c attacks d, so c and d cannot be together. {b, e} fails (d attacks e, nothing in the set attacks d). {a, d} fails (nothing attacks c). So the admissible sets are the empty set, {a}, {b}, {b, d}.</span>',
        '<b>(b) Complete.</b><span>Admissible sets that contain everything they defend. The empty set defends nothing: complete. {a} defends only a: complete. {b} defends b and d (b attacks c, the only attacker of d), so it must contain d: not complete. {b, d} defends b, d and nothing else (e needs an attack on d): complete.</span>',
        '<b>(c) Preferred.</b><span>Maximal admissible sets: {a} and {b, d} (the empty set and {b} are contained in them).</span>'
      ],
      answer: '(a) the empty set, {a}, {b}, {b, d}. (b) the empty set, {a}, {b, d}. (c) {a}, {b, d}. (d) GE = the empty set.',
      why: '<p>Course definitions: a set is admissible if it is conflict-free and defends each of its members; complete if it is admissible and contains every argument it defends; preferred if it is a maximal admissible set; the grounded extension is the least fixed point of the characteristic function starting from the empty set. The odd cycle c, d, e blocks any argument inside it unless b attacks c from outside.</p>',
      mistake: 'Listing {b} as complete. {b} defends d, so a complete set containing b must contain d too.',
      vis: [{ t: 'af', nodes: ['a', 'b', 'c', 'd', 'e'], edges: [['a', 'b'], ['b', 'a'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'c']],
        pos: { a: [30, 95], b: [85, 95], c: [140, 95], d: [190, 45], e: [190, 150] },
        ext: [{ name: 'preferred', set: ['a'] }, { name: 'preferred', set: ['b', 'd'] }, { name: 'grounded', set: [] }],
        note: 'With {b, d}: b knocks out a and c, d knocks out e, so every attacker of b and d is red. With {a}: only b is knocked out; c, d, e stay grey because nothing in {a} reaches the cycle.' }] },

    { label: 'Q6', marks: 15, mod: 4, title: 'Camera argumentation theory: framework and acceptability',
      q: '<p>The argumentation theory of a customer review about the Nikon Coolpix 5700: rules [r1] zoomSpec(nikon5700,eightX) => hasExellentZoom(nikon5700); [r2] hasExellentZoom(C) => capableOf(C,birdPictures); [r3] slowAutofocus(C) -> ~[r2] (a camera with slow autofocus is not capable of that); [r4] wildlifeWatcher(me), capableOf(C,birdPictures) => consider(C). Premises: wildlifeWatcher(me); zoomSpec(nikon5700,eightX); slowAutofocus(nikon5700); fastAutofocus(nikon5700). Contrariness: fastAutofocus and slowAutofocus are contraries.</p>' +
        '<p>(a) Construct the abstract argumentation framework (AR, Att): list the arguments and draw Att by a directed graph.</p>' +
        '<p>(b) Should you consider buying this camera? Answer by evaluating the acceptability of the argument claiming consider(nikon5700) under the preferred semantics and the grounded semantics.</p>',
      hint: 'Build arguments from the premises up: one per premise, then one per rule application. Attacks: a contrary of a premise, or an undercut of rule r2.',
      steps: [
        '<b>(a) Arguments from premises.</b><span>A1: wildlifeWatcher(me). A2: slowAutofocus(nikon5700). A3: fastAutofocus(nikon5700). A4: zoomSpec(nikon5700,eightX).</span>',
        '<b>(a) Arguments from rules.</b><span>A5: A4 => hasExellentZoom (r1). A6: A5 => capableOf(nikon5700,birdPictures) (r2). A7: A1, A6 => consider(nikon5700) (r4). A8: A2 -> not [r2] (r3, an undercut of r2). That is 8 arguments.</span>',
        '<b>(a) Attacks.</b><span>A2 and A3 undermine each other: both are plain premises with contrary conclusions, and an attack on an ordinary premise is an undermine. A3 attacks A8 as well, because A8 has A2 inside it (undermine of a sub-argument). A8 undercuts the top rule r2 of A6, and so also A7, which has A6 inside it.</span>',
        '<b>(a) Edge list.</b><span>A2 to A3, A3 to A2, A3 to A8, A8 to A6, A8 to A7.</span>',
        '<b>(b) Preferred extensions.</b><span>Two. E1 = {A1, A3, A4, A5, A6, A7}: A3 is in, A2 and A8 are out, so A6 and A7 are defended. E2 = {A1, A2, A4, A5, A8}: A8 is in, so A6 and A7 are out and A3 is out.</span>',
        '<b>(b) Under preferred semantics.</b><span>A7 belongs to E1 but not E2, so it is credulously acceptable: you consider the camera.</span>',
        '<b>(b) Grounded extension.</b><span>The unattacked arguments are A1, A4, A5; A2 and A3 attack each other so neither is added. GE = {A1, A4, A5}, which does not contain A7: under grounded semantics you do not consider the camera.</span>'
      ],
      answer: '(a) AR = {A1..A8} as above; Att = {(A2,A3), (A3,A2), (A3,A8), (A8,A6), (A8,A7)}. (b) Preferred: A7 is in the first preferred extension, so acceptable, you consider the camera. Grounded: GE = {A1, A4, A5}, A7 is not in it, so you do not consider the camera.',
      why: '<p>An argument in the preferred semantics only needs to belong to one maximal admissible set (credulous), while grounded semantics is skeptical: the fast/slow autofocus conflict is undecided, so everything that depends on it is also undecided and is left out.</p>',
      mistake: 'Leaving out A5, A6, A7: every sub-argument must be its own argument, or the attack by A8 on r2 cannot be drawn.',
      vis: [{ t: 'af', nodes: ['A2', 'A3', 'A8', 'A6', 'A7'], edges: [['A2', 'A3', 'undermine'], ['A3', 'A2', 'undermine'], ['A3', 'A8', 'undermine'], ['A8', 'A6', 'undercut'], ['A8', 'A7', 'undercut']],
        pos: { A2: [65, 55], A3: [65, 145], A8: [125, 100], A6: [190, 50], A7: [190, 150] },
        ext: [{ name: 'preferred E1', set: ['A3', 'A6', 'A7'] }, { name: 'preferred E2', set: ['A2', 'A8'] }, { name: 'grounded', set: [] }],
        note: 'Only the five arguments that take part in an attack are drawn; A1, A4, A5 are unattacked and belong to every extension. In E1, A3 beats A2 and A8, so A6 and A7 survive. Grounded keeps only A1, A4, A5, so A7 is out.' }] },

    { label: 'Q7', marks: 15, mod: 4, title: 'Proof: an admissible set never attacks the grounded extension',
      q: '<p>Use the definition of the grounded extension (GE is the union over i from 1 of f^i(empty set), where f(S) = the set of X in AR defended by S) to prove that no admissible extension can attack GE: if S is admissible, then for any A in S and B in GE, (A, B) is not in Att.</p><p>Hint: prove by induction on n that S cannot attack f^n(empty set).</p>',
      hint: 'Induction on n. The base case uses that f(empty set) is the set of unattacked arguments. The step uses that f^n defends B and that S, being admissible, answers every attack on it.',
      steps: [
        '<b>Setup.</b><span>Let S be admissible. Claim P(n): S does not attack any argument of f^n(empty set).</span>',
        '<b>Base case, n = 1 (7 marks).</b><span>Suppose S attacks some B in f(empty set). The set f(empty set) contains exactly the arguments defended by the empty set, that is, the arguments with no attackers. So B has no attacker, which contradicts that S attacks B. Hence P(1).</span>',
        '<b>Inductive hypothesis (8 marks).</b><span>Assume P(n) for some n at least 1: S does not attack f^n(empty set).</span>',
        '<b>Inductive step: assume the opposite.</b><span>Suppose S attacks f^(n+1)(empty set): some A in S attacks some B in f^(n+1)(empty set) = f(f^n(empty set)).</span>',
        '<b>Use the definition of f.</b><span>B is defended by f^n(empty set), so every attacker of B is attacked by f^n. In particular A is attacked by some C in f^n(empty set).</span>',
        '<b>Use admissibility of S.</b><span>A is in S and C attacks A. S is admissible, so S defends A: S attacks C. But C is in f^n(empty set), contradicting the inductive hypothesis. Hence P(n+1).</span>',
        '<b>Conclude.</b><span>By induction P(n) holds for every n. If B is in GE, then B is in f^n(empty set) for some n, so S does not attack B. So no admissible set attacks GE.</span>'
      ],
      answer: 'By induction on n: S does not attack f^n(empty set) for any n. Base: f(empty set) holds only unattacked arguments. Step: if S attacks B in f^(n+1), some member A of S attacks B; f^n counter-attacks A; S, being admissible, attacks that counter-attacker in f^n, contradicting the hypothesis. Every B in GE lies in some f^n, so S never attacks GE.',
      why: '<p>The proof uses the two defining ideas together: f^(n+1) members are defended by f^n (so an attack on them is answered from f^n), and an admissible set answers every attack on its members (so it would have to attack f^n). The grounded extension is the union of the f^n, so showing it for each n gives it for GE.</p>',
      mistake: 'Stopping after the induction without the last step: GE is a union, so a member B of GE lies in some f^n, which must be said for the conclusion to follow.',
      vis: [
        { t: 'af', title: 'the inductive step', nodes: ['D', 'C', 'A', 'B'], edges: [['A', 'B'], ['C', 'A'], ['D', 'C']], pos: { D: [30, 95], C: [80, 95], A: [130, 95], B: [180, 95] },
          note: 'A and D are in S, C is in f^n, B is in f^(n+1). A attacks B; f^n defends B, so C attacks A; S defends A, so D attacks C. But D in S attacking C in f^n contradicts the hypothesis.' },
        { t: 'arg', name: 'Induction', premises: ['Base: f(empty) holds only unattacked arguments, so S attacks none of them', 'Step: if S attacks f^(n+1), some A in S attacks some B in f^(n+1)', 'f^n attacks A, and S, being admissible, attacks that attacker in f^n', 'This contradicts P(n)'], concl: 'S attacks no member of any f^n, hence no member of GE' }] }
  ] });
