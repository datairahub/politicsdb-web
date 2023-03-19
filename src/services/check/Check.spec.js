import { describe, it, expect } from 'vitest';
import Check from './Check';

describe('Check.js', () => {
  it('isValidEmail() returns false if email is not valid', () => {
    expect(Check.isValidEmail('plainaddress')).toBeFalsy();
    expect(Check.isValidEmail('#@%^%#$@#$@#.com')).toBeFalsy();
    expect(Check.isValidEmail('@domain.com')).toBeFalsy();
    expect(Check.isValidEmail('Joe Smith <email@domain.com>')).toBeFalsy();
    expect(Check.isValidEmail('email.domain.com')).toBeFalsy();
    expect(Check.isValidEmail('email@domain@domain.com')).toBeFalsy();
    expect(Check.isValidEmail('.email@domain.com')).toBeFalsy();
    expect(Check.isValidEmail('email.@domain.com')).toBeFalsy();
    expect(Check.isValidEmail('email..email@domain.com')).toBeFalsy();
    expect(Check.isValidEmail('email@domain.com (Joe Smith)')).toBeFalsy();
    expect(Check.isValidEmail('email@domain')).toBeFalsy();
    expect(Check.isValidEmail('email@111.222.333.44444')).toBeFalsy();
    expect(Check.isValidEmail('email@domain..com')).toBeFalsy();
    // expect(Check.isValidEmail('あいうえお@domain.com')).toBeFalsy()
    // expect(Check.isValidEmail('email@-domain.com')).toBeFalsy()
  });

  it('isValidEmail() returns true if email is valid', () => {
    expect(Check.isValidEmail('email@domain.com')).toBeTruthy();
    expect(Check.isValidEmail('firstname.lastname@domain.com')).toBeTruthy();
    expect(Check.isValidEmail('email@subdomain.domain.com')).toBeTruthy();
    expect(Check.isValidEmail('firstname+lastname@domain.com')).toBeTruthy();
    expect(Check.isValidEmail('email@[123.123.123.123]')).toBeTruthy();
    expect(Check.isValidEmail('"email"@domain.com')).toBeTruthy();
    expect(Check.isValidEmail('1234567890@domain.com')).toBeTruthy();
    expect(Check.isValidEmail('email@domain-one.com')).toBeTruthy();
    expect(Check.isValidEmail('_______@domain.com')).toBeTruthy();
    expect(Check.isValidEmail('email@domain.name')).toBeTruthy();
    expect(Check.isValidEmail('email@domain.co.jp')).toBeTruthy();
    expect(Check.isValidEmail('firstname-lastname@domain.com')).toBeTruthy();
    // expect(Check.isValidEmail('email@123.123.123.123')).toBeTruthy();
  });

  it('containsNotOnlyNumbers() returns false if argument is numbers only', () => {
    expect(Check.containsNotOnlyNumbers('1')).toBeFalsy();
    expect(Check.containsNotOnlyNumbers('1234567890')).toBeFalsy();
    expect(Check.containsNotOnlyNumbers('648655164')).toBeFalsy();
  });

  it('containsNotOnlyNumbers() returns true if argument is more than numbers', () => {
    expect(Check.containsNotOnlyNumbers('1a')).toBeTruthy();
    expect(Check.containsNotOnlyNumbers('a1234567890')).toBeTruthy();
    expect(Check.containsNotOnlyNumbers('64865-5164')).toBeTruthy();
  });

  it('isValidUrl() returns false with invalid URL', () => {
    expect(Check.isValidUrl('A123456789')).toBeFalsy();
    expect(Check.isValidUrl('123.123.123')).toBeFalsy();
    expect(Check.isValidUrl('url:www.sdfsdf.com')).toBeFalsy();
    expect(Check.isValidUrl('abc.derfffs.sdf')).toBeFalsy();
    expect(Check.isValidUrl('linkedin.com/in/saigesp')).toBeFalsy();
    expect(Check.isValidUrl('www.linkedin.com/in/saigesp')).toBeFalsy();
    expect(Check.isValidUrl('profile.linkedin.com/in/saigesp')).toBeFalsy();
    expect(Check.isValidUrl('profile.linkedin.com.ar/in/saigesp')).toBeFalsy();
  });
  it('isValidUrl() returns true with valid URL', () => {
    expect(Check.isValidUrl('https://linkedin.com/in/saigesp')).toBeTruthy();
    expect(Check.isValidUrl('https://www.linkedin.com/in/saigesp')).toBeTruthy();
    expect(Check.isValidUrl('https://profile.linkedin.com/in/saigesp')).toBeTruthy();
    expect(Check.isValidUrl('https://profile.linkedin.com.ar/in/saigesp')).toBeTruthy();
    expect(Check.isValidUrl('http://www.linkedin.com/in/saigesp/')).toBeTruthy();
    expect(Check.isValidUrl('https://www.linkedin.com/in/saigesp/#lorem?ipsum=12&dolor=.html')).toBeTruthy();
  });
});
