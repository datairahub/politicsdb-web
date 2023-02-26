import { describe, it, expect } from 'vitest';
import Url from './Url';

describe('Url.js', () => {
  const urlService = new Url('~');

  /**
   * objectToQuerystring() tests
   */
  it('objectToQuerystring() encode object to querystring', () => {
    const obj = {
      test: 20,
      name: 'lorem',
    };
    expect(urlService.objectToQuerystring(obj)).toBe('?test=20&name=lorem');
  });

  it('objectToQuerystring() encode array fields to querystring', () => {
    const obj = {
      test: [20, 21],
      name: 'lorem',
    };
    expect(urlService.objectToQuerystring(obj)).toBe('?test=20~21&name=lorem');
  });

  /**
   * objectToQuerystring() tests
   */
  it('querystringToObject() returns object from url querystrings', () => {
    const url = 'http://127.0.0.1:8000/api/assets/files/?asset=21&file_type__exclude=1';
    const expected = { asset: '21', file_type__exclude: '1' };
    expect(urlService.querystringToObject(url)).toStrictEqual(expected);
  });

  /**
   * getQueryStringParam() tests
   */
  it('getQueryStringParam() returns query params', () => {
    const url = 'http://test.com/?lorem=ipsum&dolor=sit';
    expect(urlService.getQueryStringParam(url, 'lorem')).toBe('ipsum');
    expect(urlService.getQueryStringParam(url, 'dolor')).toBe('sit');
  });

  it('getQueryStringParam() returns array query params', () => {
    const url = 'http://test.com/?lorem=ipsum~dolor';
    expect(urlService.getQueryStringParam(url, 'lorem')).toEqual(['ipsum', 'dolor']);
  });

  /**
   * updateUrlQueryParam() tests
   */
  it('updateUrlQueryParam() returns url with added query param when url does not have params', () => {
    const url = 'http://test.com/';
    expect(urlService.updateUrlQueryParam(url, 'lorem', 'ipsum'))
      .toBe('http://test.com/?lorem=ipsum');
  });

  it('updateUrlQueryParam() returns url with added query param when url have an empty param', () => {
    const url = 'http://test.com/?lorem=';
    expect(urlService.updateUrlQueryParam(url, 'lorem', 'ipsum'))
      .toBe('http://test.com/?lorem=ipsum');
  });

  it('updateUrlQueryParam() returns url with added query param when param does not exists', () => {
    const url = 'http://test.com/?foo=bar';
    expect(urlService.updateUrlQueryParam(url, 'lorem', 'ipsum'))
      .toBe('http://test.com/?foo=bar&lorem=ipsum');
  });

  it('updateUrlQueryParam() returns url with updated query param when param exists', () => {
    const url = 'http://test.com/?lorem=ipsum';
    expect(urlService.updateUrlQueryParam(url, 'lorem', 'dolor'))
      .toBe('http://test.com/?lorem=dolor');
  });

  /**
   * updateArrayQueryParam() tests
   */
  it('updateArrayQueryParam() returns url with added query param when url does not have params', () => {
    const url = 'http://test.com/';
    expect(urlService.updateArrayQueryParam(url, 'lorem', ['dolor', 'sit']))
      .toBe('http://test.com/?lorem=dolor~sit');
  });

  it('updateArrayQueryParam() returns url with added query param when url have an empty param', () => {
    const url = 'http://test.com/?lorem=';
    expect(urlService.updateArrayQueryParam(url, 'lorem', ['dolor', 'sit']))
      .toBe('http://test.com/?lorem=dolor~sit');
  });

  it('updateArrayQueryParam() returns url with added query param when url have others params', () => {
    const url = 'http://test.com/?foo=bar';
    expect(urlService.updateArrayQueryParam(url, 'lorem', ['dolor', 'sit']))
      .toBe('http://test.com/?foo=bar&lorem=dolor~sit');
  });

  it('updateArrayQueryParam() returns url with added query param when param does not exists', () => {
    const url = 'http://test.com/?foo=bar';
    expect(urlService.updateArrayQueryParam(url, 'lorem', ['dolor', 'sit']))
      .toBe('http://test.com/?foo=bar&lorem=dolor~sit');
  });

  it('updateArrayQueryParam() returns url with updated query param value when param exists', () => {
    const url = 'http://test.com/?lorem=ipsum';
    expect(urlService.updateArrayQueryParam(url, 'lorem', ['dolor', 'sit']))
      .toBe('http://test.com/?lorem=dolor~sit');
  });

  /**
   * addArrayValueQueryParam() tests
   */
  it('addArrayValueQueryParam() returns url with added query params when url does not have params', () => {
    const url = 'http://test.com/';
    expect(urlService.addArrayValueQueryParam(url, 'lorem', ['dolor', 'sit']))
      .toBe('http://test.com/?lorem=dolor~sit');
  });

  it('addArrayValueQueryParam() returns url with added query params when url have an empty param', () => {
    const url = 'http://test.com/?lorem=';
    expect(urlService.addArrayValueQueryParam(url, 'lorem', ['dolor', 'sit']))
      .toBe('http://test.com/?lorem=dolor~sit');
  });

  it('addArrayValueQueryParam() returns url with added query params when url have others params', () => {
    const url = 'http://test.com/?foo=bar';
    expect(urlService.addArrayValueQueryParam(url, 'lorem', ['dolor', 'sit']))
      .toBe('http://test.com/?foo=bar&lorem=dolor~sit');
  });

  it('addArrayValueQueryParam() returns url with added query param value when url have given params', () => {
    const url = 'http://test.com/?lorem=ipsum';
    expect(urlService.addArrayValueQueryParam(url, 'lorem', ['dolor', 'sit']))
      .toBe('http://test.com/?lorem=ipsum~dolor~sit');
  });

  it('addArrayValueQueryParam() returns url with added query param value when url have given params without duplicates', () => {
    const url = 'http://test.com/?lorem=ipsum~dolor';
    expect(urlService.addArrayValueQueryParam(url, 'lorem', ['ipsum', 'dolor', 'sit']))
      .toBe('http://test.com/?lorem=ipsum~dolor~sit');
  });

  /**
   * removeArrayValueQueryParam() tests
   */
  it('removeArrayValueQueryParam() returns same url when url does not have params', () => {
    const url = 'http://test.com/';
    expect(urlService.removeArrayValueQueryParam(url, 'lorem', ['dolor', 'sit']))
      .toBe('http://test.com/');
  });

  it('removeArrayValueQueryParam() returns same url when url does not have the given param', () => {
    const url = 'http://test.com/?foo=bar';
    expect(urlService.removeArrayValueQueryParam(url, 'lorem', ['dolor', 'sit']))
      .toBe('http://test.com/?foo=bar');
  });

  it('removeArrayValueQueryParam() returns url without given values', () => {
    const url = 'http://test.com/?lorem=ipsum~dolor~sit~amet';
    expect(urlService.removeArrayValueQueryParam(url, 'lorem', ['dolor', 'sit', 'consectetur']))
      .toBe('http://test.com/?lorem=ipsum~amet');
  });

  /**
   * removeArrayValueQueryParam() tests
   */
  it('urlToHttps() returns same url with https protocol', () => {
    const url = 'http://test.com/';
    expect(Url.urlToHttps(url)).toBe('https://test.com/');
  });
});
