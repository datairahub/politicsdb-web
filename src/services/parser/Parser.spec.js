import { describe, it, expect } from 'vitest';
import Parser from './Parser';

describe('Parser.js', () => {
  /**
   * Parser.dd
   */
  it('dd() returns day 0-padded', () => {
    expect(Parser.dd(new Date('2021-08-01T00:00:00.000Z'))).toBe('01');
    expect(Parser.dd(new Date('2021-08-11T00:00:00.000Z'))).toBe('11');
  });

  /**
   * Parser.mm
   */
  it('mm() returns month 0-padded', () => {
    expect(Parser.mm(new Date('2021-08-01T00:00:00.000Z'))).toBe('08');
    expect(Parser.mm(new Date('2021-12-01T00:00:00.000Z'))).toBe('12');
  });

  /**
   * Parser.yyymmdd
   */
  it('yyyymmdd() returns date with YYYY-MM-DD format', () => {
    expect(Parser.yyyymmdd(new Date('2021-08-01T00:00:00.000Z'))).toBe('2021-08-01');
    expect(Parser.yyyymmdd(new Date('2021-12-25T00:00:00.000Z'))).toBe('2021-12-25');
  });

  /**
   * Parser.daysBetweenDates
   */
  it('daysBetweenDates() returns days between dates', () => {
    expect(Parser.daysBetweenDates(
      new Date('2021-08-01T00:00:00.000Z'),
      new Date('2021-08-30T00:00:00.000Z'),
    )).toBe(29);
    expect(Parser.daysBetweenDates(
      new Date('2022-01-20'),
      new Date('2022-04-13'),
    )).toBe(83);
  });

  /**
   * Parser.yearsBetweenDates
   */
  it('yearsBetweenDates() returns years between dates', () => {
    expect(Parser.yearsBetweenDates(
      new Date('2020-08-01'),
      new Date('2023-08-01'),
    )).toBe(3);
    expect(Parser.yearsBetweenDates(
      new Date('2000-01-01'),
      new Date('2010-08-14'),
      2,
    )).toBe(10.62);
  });

  /**
   * Parser.camelToTitleCase
   */
  it('camelToTitleCase() converts camelCase to Title', () => {
    expect(Parser.camelToTitleCase('loremIpsumDolorSit')).toBe('Lorem Ipsum Dolor Sit');
    expect(Parser.camelToTitleCase('lorem ipsum')).toBe('Lorem Ipsum');
    expect(Parser.camelToTitleCase('99LoremIpsum')).toBe('99 Lorem Ipsum');
    expect(Parser.camelToTitleCase('Lorem ipsumDolor')).toBe('Lorem Ipsum Dolor');
    expect(Parser.camelToTitleCase('Lorem IPSUM')).toBe('Lorem IPSUM');
  });

  /**
   * Parser.strToTitleCase
   */
  it('strToTitleCase() converts string to Title', () => {
    expect(Parser.strToTitleCase('loremIpsumDolorSit')).toBe('Loremipsumdolorsit');
    expect(Parser.strToTitleCase('lorem ipsum')).toBe('Lorem Ipsum');
    expect(Parser.strToTitleCase('Lorem ipsumDolor')).toBe('Lorem Ipsumdolor');
    expect(Parser.strToTitleCase('Lorem IPSUM')).toBe('Lorem Ipsum');
  });

  /**
   * Parser.round
   */
  it('round() returns number rounded to X decimals', () => {
    expect(Parser.round(100.521)).toBe('100.52');
    expect(Parser.round(100.009)).toBe('100.01');
    expect(Parser.round(100)).toBe('100.00');
    expect(Parser.round(100, 3)).toBe('100.000');
    expect(Parser.round(123.456, 3)).toBe('123.456');
    expect(Parser.round(123.456789, 3)).toBe('123.457');
  });

  /**
   * Parser.numFormatter
   */
  it('numFormatter() returns number rounded and with decimals and thousands separators', () => {
    let prefix = '';
    let suffix = '€';
    let decPlaces = 3;
    let decSep = ',';
    let thousandSep = '.';
    expect(Parser.numFormatter(1234567890.52888, prefix, suffix, decPlaces, thousandSep, decSep)).toBe('1.234.567.890,529€');
    expect(Parser.numFormatter(1.65635219, prefix, suffix, decPlaces, thousandSep, decSep)).toBe('1,656€');

    prefix = '$';
    suffix = '%';
    decPlaces = 4;
    decSep = '.';
    thousandSep = ',';
    expect(Parser.numFormatter(1234567890.52888, prefix, suffix, decPlaces, thousandSep, decSep)).toBe('$1,234,567,890.5289%');
    expect(Parser.numFormatter(1.65635219, prefix, suffix, decPlaces, thousandSep, decSep)).toBe('$1.6564%');

    prefix = null;
    suffix = null;
    decPlaces = 0;
    decSep = ',';
    thousandSep = '.';
    expect(Parser.numFormatter(1, prefix, suffix, decPlaces, thousandSep, decSep)).toBe('1');
    expect(Parser.numFormatter(1234, prefix, suffix, decPlaces, thousandSep, decSep)).toBe('1.234');
  });

  it('numFormatter() returns "0" when wrong number is provided', () => {
    expect(Parser.numFormatter('0')).toBe('0');
    expect(Parser.numFormatter('')).toBe('0');
    expect(Parser.numFormatter(undefined)).toBe('0');
    expect(Parser.numFormatter(null)).toBe('0');
    expect(Parser.numFormatter('lorem')).toBe('0');
    expect(Parser.numFormatter('0.00')).toBe('0');
    expect(Parser.numFormatter('0000')).toBe('0');
    expect(Parser.numFormatter('1,23')).toBe('0');
    expect(Parser.numFormatter('1.23.45')).toBe('0');
  });
});
