'use strict';

// DO NOT CHANGE THIS FILE!
//
// Unless you do have a good reason,
// then make a change and describe the reason below.

const crypto = require('crypto');
const {deepFreeze} = require('../src/utils');
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
  describe('.mondays()', () => {
    it('.mondays() returns all mondays since the given date in that year', () => {
      expect(task.mondays('19 Feb 2017')).to.eql([
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

    it('returns [] if no mondays left in this year', () => {
      expect(task.mondays('26 dec 2017')).to.eql([]);
    });
  });

  // Do not use any 3-rd party libs in this one.
  describe('.asyncMap()', () => {
    it('invokes function for each input in series and returns results', (done) => {
      const inputs = [2, 4, 6, 8, 10];
      const fn = (nBytes, callback) => {
        crypto.randomBytes(nBytes, (err, buf) => {
          return err
            ? callback(err)
            : setTimeout(callback, 5, null, buf, Date.now());
        });
      };

      task.asyncMap(fn, inputs, (err, results) => {
        expect(err).to.be.null;
        expect(results).to.have.length(results.length);
        expect(results.every(([buf, timestamp], idx) => {
          return (buf instanceof Buffer)
            && (buf.length === inputs[idx])
            && (timestamp + 5 <= (timestamp[idx + 1] || Infinity));
        })).to.be.true;

        done();
      });
    });

    it('correctly invokes callback on next tick if inputs array is empty', (done) => {
      const fn = td.function();
      let sameTick = true;

      task.asyncMap(fn, [], (err, results) => {
        expect(err).to.be.null;
        expect(results).to.be.instanceof(Array);
        expect(results).to.have.length(0);
        expect(sameTick).to.be.false;
        td.assert(fn).callCount(0);
        done();
      });

      sameTick = false;
    });
  });

  // For bonus points, come up with tests and implementation
  // of .asyncMap() that executes function runs in parallel.
  // (Note: no third party library may be used.)
  //
  // If you want, feel free to:
  //   - use Promises or async/await;
  //   - add an ability to limit number of concurrent invokations.
  describe('.asyncParallelMap()', () => {
    it('bouns points…');
  });
});
