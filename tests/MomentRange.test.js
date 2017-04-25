'use strict';

const MomentDate = require('../src/MomentDate');
const MomentRange = require('../src/MomentRange');

describe('MomentRange', () => {
  it('is correct and iterable', () => {
    const jan1 = new MomentDate('1 jan');
    const jan2 = new MomentDate('2 jan');
    const jan3 = new MomentDate('3 jan');
    const expected = [jan1, jan2, jan3].map(m => m.millisSinceEpoch());
    const range = new MomentRange(jan1, jan3, 1, 'day');
    const actual = Array.from(range).map(m => m.millisSinceEpoch());
    expect(actual).to.eql(expected);
  });
});
