/* Final exam module: past papers with worked answers, plus a predicted final.
   Each js/exam-*.js file calls UI.examPaper({ n, title, sub, html, problems }); this file registers them as one module. */
(function () {
  var papers = [];
  UI.examPaper = function (p) { papers.push(p); };
  UI.examModule = function () {
    if (!papers.length) return;
    papers.sort(function (a, b) { return a.n - b.n; });
    UI.addModule({ id: 'F', label: 'Final exam', unit: 'paper', title: 'Past papers and a predicted final',
      blurb: 'The midterm and four final practice papers, each question solved step by step and checked, plus a predicted final built from how often each question type appeared.',
      lessons: papers });
  };
})();
