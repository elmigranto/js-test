'use strict';

// DO NOT CHANGE THIS FILE!
//
// Unless you do have a good reason,
// then make a change and describe the reason below.

const deepFreeze = require('deep-freeze');
const task = require('../src/task');

describe('task', () => {
  // Write a function that will return *new object*
  // with keys modified as follows:
  //   - no key starts with "$";
  //   - no key contains "." symbol (it is replaced with "(dot)").
  it('.escapeKeys() removes starting "$" and  replaces "." with (dot)', () => {
    const date = new Date();
    const object = deepFreeze({
      $set: {
        letsHaveSommeInnerObjects: {$with$Dollars: '$$$'},
        '$.some.dots': date,
        '$$$': 'many starting dollars',
        '$$.$.$.$tricky': true
      },

      val: (function (obj) {
        obj.$inner = {'$in.ner': '$i.can.have.dots'};
        return obj;
      }.call(null, Object.create(null))),

      $update$me$: {},
      h$e$h$e$: null
    });

    expect(task.escapeKeys(object)).to.eql({
      set: {
        letsHaveSommeInnerObjects: {with$Dollars: '$$$'},
        '(dot)some(dot)dots': date,
        '': 'many starting dollars',
        '(dot)$(dot)$(dot)$tricky': true
      },
      val: {inner: {'in(dot)ner': '$i.can.have.dots'}},
      update$me$: {},
      h$e$h$e$: null
    });
  });

  // Use existing classes.
  // Optionally, modify them and add related methods with tests.
  it('.mondays() returns all mondays since the given date in that year', () => {
    expect(Array.from(task.mondays('19 Feb 2017'))).to.eql([
      '20 Feb 2017',
      '27 Feb 2017',
      '06 Mar 2017',
      '13 Mar 2017',
      '20 Mar 2017',
      '27 Mar 2017',
      '03 Apr 2017',
      '10 Apr 2017',
      '17 Apr 2017',
      '24 Apr 2017',
      '01 May 2017',
      '08 May 2017',
      '15 May 2017',
      '22 May 2017',
      '29 May 2017',
      '05 Jun 2017',
      '12 Jun 2017',
      '19 Jun 2017',
      '26 Jun 2017',
      '03 Jul 2017',
      '10 Jul 2017',
      '17 Jul 2017',
      '24 Jul 2017',
      '31 Jul 2017',
      '07 Aug 2017',
      '14 Aug 2017',
      '21 Aug 2017',
      '28 Aug 2017',
      '04 Sep 2017',
      '11 Sep 2017',
      '18 Sep 2017',
      '25 Sep 2017',
      '02 Oct 2017',
      '09 Oct 2017',
      '16 Oct 2017',
      '23 Oct 2017',
      '30 Oct 2017',
      '06 Nov 2017',
      '13 Nov 2017',
      '20 Nov 2017',
      '27 Nov 2017',
      '04 Dec 2017',
      '11 Dec 2017',
      '18 Dec 2017',
      '25 Dec 2017'
    ]);
  });
});
