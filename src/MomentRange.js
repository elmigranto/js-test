'use strict';

class MomentRangeIterator {
  constructor (range) {
    this.current = range.start;
    this.end = range.end;
    this.amount = range.increment.amount;
    this.units = range.increment.units;
  }

  done () {
    return this.current.isAfter(this.end, this.units);
  }

  next () {
    // fetch iterator state
    const done = this.done();
    const value = done
      ? undefined
      : this.current;

    // advance
    this.current = this.current.add(this.amount, this.units);

    return {value, done};
  }
}

class MomentRange {
  constructor (start, end, incrementAmount = 1, incrementUnits = 'day') {
    this.start = start;
    this.end = end;
    this.increment = {
      amount: incrementAmount,
      units: incrementUnits
    };
  }

  [Symbol.iterator] () {
    return new MomentRangeIterator(this);
  }
}

module.exports = MomentRange;
