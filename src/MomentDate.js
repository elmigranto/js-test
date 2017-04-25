'use strict';

const assert = require('assert');
const moment = require('moment-timezone');

const parseMomentFromFirstArgument = (stringOrMillis, canBeMoment) => {
  switch (typeof stringOrMillis) {
    case 'number':
    case 'string':
      return stringOrMillis;

    case 'object':
      if (!canBeMoment)
        throw new TypeError('Expected string or number');

      if (stringOrMillis instanceof moment)
        return stringOrMillis.valueOf();
      else if (stringOrMillis instanceof MomentDate)
        return stringOrMillis.millisSinceEpoch();

      throw new TypeError('Expected string, number, moment, or MomentDate instance');

    default:
      throw new TypeError('Expected string, number, moment, or MomentDate instance');
  }
};

class MomentDate {
  constructor (...args) {
    switch (args.length) {
      case 0: {
        this._moment = moment();
        break;
      }

      case 1: {
        const m = parseMomentFromFirstArgument(args[0], true);

        if (typeof m === 'string')
          return new MomentDate(m, MomentDate.kDefaultFormat, MomentDate.kDefaultTimezone);

        this._moment = moment(m);
        break;
      }

      case 2: {
        const m = parseMomentFromFirstArgument(args[0], true);
        const format = args[1];
        return new MomentDate(m, format, MomentDate.kDefaultTimezone);
      }

      case 3: {
        const m = parseMomentFromFirstArgument(args[0], false);
        const format = args[1];
        const timezone = args[2];
        this._moment = moment.tz(m, format, timezone);
        break;
      }

      default:
        throw new TypeError('Invalid number of arguments, expected 0-3');
    }
  }

  add (amount, units) {
    assert(arguments.length === 2, 'Explicitly provide 2 arguments: amount and units');
    const m = new MomentDate(this);
    m._moment.add(amount, units);
    return m;
  }

  millisSinceEpoch () {
    return this._moment.valueOf();
  }

  isAfter (other, units) {
    return this._moment.isAfter(other._moment, units);
  }

  isSameOrAfter (other, units) {
    return this._moment.isSameOrAfter(other._moment, units);
  }
}

MomentDate.kDefaultFormat = 'D MMM YYYY, HH:mm:ss.SSS';
MomentDate.kDefaultTimezone = 'Etc/UTC';

module.exports = MomentDate;
