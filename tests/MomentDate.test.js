'use strict';

const MomentDate = require('../src/MomentDate');
const moment = require('moment-timezone');
const ms = require('ms');

describe('MomentDate()', () => {
  const moonWalk = {
    millis: -14159020000,
    defaultFormatUtc: '21 jul 1969, 02:56:20.000',
    customStringUtc: '21/07/1969 02.56.20',
    customFormatUtc: 'DD/MM/YYYY HH.mm.ss',
    customString: 'July 20th 1969, 9:56:20 pm',
    customFormat: 'MMMM Do YYYY, h:m:s a',
    customTimezone: 'America/Chicago'
  };

  describe('new MomentDate()', () => {
    it('1 arg: unix epoch in milliseconds', () => {
      const m = new MomentDate(moonWalk.millis);
      expect(m.millisSinceEpoch()).to.equal(moonWalk.millis);
    });

    it('1 arg: string in default format (in UTC)', () => {
      const m = new MomentDate(moonWalk.defaultFormatUtc);
      expect(m.millisSinceEpoch()).to.equal(moonWalk.millis);
    });

    it('1 arg: moment object', () => {
      const arg = moment(moonWalk.millis);
      const m = new MomentDate(arg);
      expect(m.millisSinceEpoch()).to.equal(moonWalk.millis);
      expect(m._moment).to.not.equal(arg);
    });

    it('1 arg: MomentDate instance', () => {
      const arg = new MomentDate(moonWalk.millis);
      const m = new MomentDate(arg);
      expect(m.millisSinceEpoch()).to.equal(moonWalk.millis);
      expect(m).to.not.equal(arg);
    });

    it('2 args: string and format (in UTC)', () => {
      const m = new MomentDate(
        moonWalk.customStringUtc,
        moonWalk.customFormatUtc
      );

      expect(m.millisSinceEpoch()).to.equal(moonWalk.millis);
    });

    it('3 args: string, format and timezone', () => {
      const m = new MomentDate(
        moonWalk.customString,
        moonWalk.customFormat,
        moonWalk.customTimezone
      );

      expect(m.millisSinceEpoch()).to.equal(moonWalk.millis);
    });
  });

  describe('#add()', () => {
    const m = new MomentDate('31 dec 1999');
    const jan1 = new MomentDate('1 jan 2000').millisSinceEpoch();

    it('adds days', () => {
      expect(m.add(1, 'day').millisSinceEpoch()).to.equal(jan1);
    });

    it('adds seconds', () => {
      expect(m.add(ms('1 day') / 1000, 'seconds').millisSinceEpoch()).to.equal(jan1);
    });

    it('adds milliseconds', () => {
      expect(m.add(ms('1 day'), 'milliseconds').millisSinceEpoch()).to.equal(jan1);
    });

    it('returns new MomentDate', () => {
      const nextDay = m.add(1, 'day');
      expect(nextDay).to.be.instanceof(MomentDate);
      expect(nextDay).to.not.equal(m);
    });
  });

  describe('#isAfter()', () => {
    const jan1 = new MomentDate('1 jan 2000');
    const feb1 = new MomentDate('1 feb 2000');

    it('true for strictly after', () => {
      expect(feb1.isAfter(jan1)).to.be.true;
    });

    it('false otherwise', () => {
      expect(jan1.isAfter(feb1)).to.be.false;
    });

    it('honors units', () => {
      const jan1end = new MomentDate('1 jan 2000 23:59:59.999');
      expect(jan1end.isAfter(jan1, 'day')).to.be.false;
    });
  });

  describe('#isSameOrAfter()', () => {
    const dec22 = new MomentDate('22 dec 1999');
    const dec31 = new MomentDate('31 dec 1999');
    const jan01 = new MomentDate('01 jan 2000');

    it('true for same dates', () => {
      expect(dec31.isSameOrAfter(dec31)).to.be.true;
    });

    it('true for dates after', () => {
      expect(jan01.isSameOrAfter(dec31)).to.be.true;
    });

    it('false for dates before', () => {
      expect(dec31.isSameOrAfter(jan01)).to.be.false;
    });

    it('honors units', () => {
      expect(dec22.isSameOrAfter(dec31, 'month')).to.be.true;
    });
  });
});
