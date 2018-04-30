// @flow

/**
 * JavaScript Validation functions.
 */
class Validator {
  /**
   * Returns an error message.
   *
   * @param {string} param The param(s) affected.
   * @param {string} type  The required type of the param.
   * @returns {string} The error message
   * @memberof Validator
   */
  errorMessage(param: string, type: string) {
    return `Missing parameter, or parameter ${param} is not the correct type (requires ${type})`;
  }

  /**
   * Checks if the input parameter is an email address
   *
   * @param    {string}  input  The email to validate.
   * @returns  {boolean}
   */
  isEmailAddress(input: string) {
    const splitString = input.split('@');
    let username, domain, tld;

    // Throw an error if the input is missing.
    if (!input || typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    if (input.indexOf('@') === -1 || splitString.length > 2) {
      return false;
    }

    username = splitString[0];
    domain = splitString[1];

    if (username.length < 1) {
      return false;
    }

    if (domain.indexOf('.') > 0) {
      tld = domain.substring(domain.indexOf('.'), domain.length);

      if (this.isOfLengthOrGreaterThan(tld, 3)) {
        for (var i = 0; i < tld.length; i++) {
          if (tld[i] === '.' && tld[i - 1] === '.') {
            return false;
          }
        }

        return true;
      }
    }
  }

  /**
   * Checks if the input parameter is a valid phone number.
   *
   * @param    {string}  input  The phone number to validate.
   * @returns  {boolean}
   */
  isPhoneNumber(input: string) {
    if (!input || typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    input = input.replace(/[-() ]/g, '');

    return (!input.match(/[^\d]/) && input.length === 10) || input.length === 7;
  }

  /**
   * Checks if the input parameter text is a valid date (i.e. can be turned into a valid date object).
   *
   * @param    {string}  input  The date string to check.
   * @returns  {boolean}
   */
  isDate(input: string) {
    if (!input || typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    const date = new Date(input);

    return !isNaN(date.getTime());
  }

  /**
   * Checks if the input parameter is a date that comes after the reference date.
   *
   * @param    {string | Date}  input      The date to check.
   * @param    {string | Date}  reference  The reference date against which we are checking.
   * @returns  {boolean}
   */
  isBeforeDate(input: string | Date, reference: string | Date) {
    if (typeof input !== 'string') {
      input = input.toString();
    }

    if (typeof reference !== 'string') {
      reference = reference.toString();
    }

    if (!this.isDate(input) || !this.isDate(reference)) {
      return false;
    }

    input = new Date(input);
    reference = new Date(reference);

    return input.getTime() < reference.getTime();
  }

  /**
   * Checks if the input parameter is a date that comes before the reference date.
   *
   * @param    {string | Date}  input      The date to check.
   * @param    {string | Date}  reference  The reference date against which we are checking.
   * @returns  {boolean}
   */
  isAfterDate(input: string | Date, reference: string | Date) {
    if (typeof input !== 'string') {
      input = input.toString();
    }

    if (typeof reference !== 'string') {
      reference = reference.toString();
    }

    if (!this.isDate(input) || !this.isDate(reference)) {
      return false;
    }

    input = new Date(input);
    reference = new Date(reference);

    return input.getTime() > reference.getTime();
  }

  /**
   * Checks if the input parameter is a date that comes before today.
   *
   * @param   {string | Date}  input  The date to check
   * @return  {boolean}
   */
  isBeforeToday(input: string | Date) {
    const today = new Date();

    if (typeof input !== 'string') {
      input = input.toString();
    }

    if (!this.isDate(input)) {
      return false;
    }

    input = new Date(input);

    return input.getTime() < today.getTime();
  }

  /**
   * Checks if input paramter is after today.
   *
   * @param    {string | Date}  input  The date to check.
   * @returns  {boolean}
   */
  isAfterToday(input: string | Date) {
    const today = new Date();

    if (typeof input !== 'string') {
      input = input.toString();
    }

    if (!this.isDate(input)) {
      return false;
    }

    input = new Date(input);

    return input.getTime() > today.getTime();
  }

  /**
   * Checks the input parameter and returns true if it is an empty string–-a string with no length or characters that is represented as "" or only contains whitespace(s).
   *
   * @param    {string}  input  The string to be checked.
   * @returns  {boolean}
   */
  isEmpty(input: string) {
    if (input === null || input === undefined) {
      return false;
    }

    if (typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    return input.length === 0 || input.match(/[\S]/) === null;
  }

  /**
   * Checks if the input parameter has leading or trailing whitespaces or too many spaces between words.
   *
   * @param    {string}  input  The string to be checked.
   * @returns  {boolean}
   */
  isTrimmed(input: string) {
    if (!input || typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    return !input.match(/^\s/g) && !input.match(/\s$/g) && !input.match(/\s{2,}/g);
  }

  /**
   * Checks if the input text parameter contains any of the words within the words array.
   *
   * @param    {string}  input  The string to check.
   * @param    {array}   words  The words to check for in the string.
   * @returns  {boolean}
   */
  contains(input: string, words: Array<string>) {
    if (!input || words.length === 0) {
      throw `Missing parameter(s).`;
    }

    if (typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    if (words instanceof Array === false) {
      throw this.errorMessage('words', 'array');
    }

    // Split input into an array.
    const strings = input.split(/[\W]/);

    for (const string of strings) {
      for (const word of words) {
        if (string.toUpperCase() === word.toUpperCase()) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Checks if the input text parameter does not contain any of the words within the words array.
   *
   * @param    {string}  input  The string to check.
   * @param    {array}   words  The words to check for in the string.
   * @returns  {boolean}
   */
  lacks(input: string, words: Array<string>) {
    return !this.contains(input, words);
  }

  /**
   * Checks that the input text parameter contains only strings found within the strings array.
   *
   * @param    {string}  input    The string to check.
   * @param    {array}   strings  An array of strings.
   * @returns  {boolean}
   */
  isComposedOf(input: string, strings: Array<string>) {
    if (!input || typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    if (strings.length === 0 || strings instanceof Array === false) {
      throw this.errorMessage('input', 'array');
    }

    let matchIndex = -1,
      sub;

    input = input.replace(/([\s])/gi, '').toUpperCase();

    for (let i = 0; i < input.length; i++) {
      sub = input.substring(i, input.length);

      for (let j = 0; j < strings.length; j++) {
        if (sub.indexOf(strings[j].toUpperCase()) === 0) {
          if (i + strings[j].length + 1 > matchIndex) {
            matchIndex = i + strings[j].length + 1;
          }
        }
      }

      if (matchIndex < i) {
        return false;
      }
    }
    return matchIndex >= input.length;
  }

  /**
   * Checks if the input parameter has a word count less than or equal to the n parameter.
   *
   * @param    {string}  input  The string to check.
   * @param    {number}  n      The length to be checked against.
   * @returns  {boolean}
   */
  isOfLengthOrLessThan(input: string, n: number) {
    if (!input || typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    if ((!n && n !== 0) || typeof n !== 'number') {
      throw this.errorMessage('n', 'number');
    }

    return input.length <= n;
  }

  /**
   * Checks if the input parameter has a word count greater than or equal to the n parameter.
   *
   * @param    {string}  input  The string to check.
   * @param    {number}  n      The length to be checked against.
   * @returns  {boolean}
   */
  isOfLengthOrGreaterThan(input: string, n: number) {
    if (!input || typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    if ((!n && n !== 0) || typeof n !== 'number') {
      throw this.errorMessage('n', 'number');
    }

    return input.length >= n;
  }

  /**
   * Checks if the input parameter has a word count less than or equal to the n parameter.
   *
   * @param    {string}           input  The string to check.
   * @param    {number}  n      The length to be checked against.
   * @returns  {boolean}
   */
  lessWordsThan(input: string, n: number) {
    if (!input || typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    if ((!n && n !== 0) || typeof n !== 'number') {
      throw this.errorMessage('n', 'number');
    }

    const strings = input.split(' ');

    return strings.length <= n;
  }

  /**
   * Checks if the input parameter has a word count greater than or equal to the n parameter.
   *
   * @param    {string}           input  The string to check.
   * @param    {number}  n      The length to be checked against.
   * @returns  {boolean}
   */
  moreWordsThan(input: string, n: number) {
    if (!input || typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    if ((!n && n !== 0) || typeof n !== 'number') {
      throw this.errorMessage('n', 'number');
    }

    const strings = input.split(' ');

    return strings.length >= n;
  }

  /**
   * Checks that a number is greater than or equal to the floor, and less than or equal to the ceiling.
   *
   * @param    {number}  input  The number to check.
   * @param    {number}  floor  The lower number in the range.
   * @param    {number}  ceil   The higher number in the range.
   * @returns  {boolean}
   */
  isNumberBetween(input: number, floor: number, ceil: number) {
    if (
      (!input && input !== 0) ||
      typeof input !== 'number' ||
      (!floor && floor !== 0) ||
      typeof floor !== 'number' ||
      (!ceil && ceil !== 0) ||
      typeof ceil !== 'number'
    ) {
      throw this.errorMessage('input, floor, or ceil', 'number');
    }

    return input >= floor && input <= ceil;
  }

  /**
   * Checks that the input parameter string is only composed of a—z, A—Z, or 0—9.
   *
   * @param    {string}  input  The string to check.
   * @returns  {boolean}
   */
  isAlphanumeric(input: string) {
    // Throw an error if we're missing one or more params.
    if ((!input && input !== '') || typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    // Check to see if we have a match for anything *not* a-z, A-Z or 0-9.
    return !input.match(/([^a-z\d])/gi);
  }

  /**
   * Checks if the input parameter is a credit card or bank card number.
   *
   * @param    {string}  input  The string to check.
   * @returns  {boolean}
   */
  isCreditCard(input: string) {
    if ((!input && input !== '') || typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    input = input.replace(/-/g, '');

    return !this.isEmpty(input) && this.isAlphanumeric(input) && input.length === 16;
  }

  /**
   * Checks if the input string is a hexadecimal color. Input must begin with #.
   *
   * @param    {string}  input  The string to check.
   * @returns  {boolean}
   */
  isHex(input: string) {
    if (!input || typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    if (input.charAt(0) !== '#') {
      return false;
    }

    input = input.substring(1, input.length);

    if (input.match(/([^a-f\d])/gi)) {
      return false;
    }

    return input.length === 3 || input.length === 6;
  }

  /**
   * Checks if the input string is an RGB color.
   *
   * @param    {string}  input  The string to check.
   * @returns  {boolean}
   */
  isRGB(input: string) {
    if (!input || typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    input = input.replace(/\s/g, '');
    input = input.replace(';', '');

    if (input.substring(0, 4) !== 'rgb(' && input.charAt(input.length) !== ')') {
      return false;
    }

    input = input.substring(4, input.length - 1);

    const rgb = input.split(',');

    if (rgb.length !== 3) {
      return false;
    }

    for (var i = 0; i < rgb.length; i++) {
      if (!this.isNumberBetween(parseInt(rgb[i]), 0, 255)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Checks if the input string is an HSL color.
   *
   * @param    {string}  input  The string to check.
   * @returns  {boolean}
   */
  isHSL(input: string) {
    if (!input || typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    input.replace(/\s/, '');

    if (input.substring(0, 4) !== 'hsl(' && input.charAt(input.length) !== ')') {
      return false;
    }

    input = input.substring(4, input.length - 1);

    const hsl = input.split(',');

    if (hsl.length !== 3) {
      return false;
    }

    if (!this.isNumberBetween(parseInt(hsl[0]), 0, 360)) {
      return false;
    }

    for (var i = 1; i < hsl.length; i++) {
      if (!this.isNumberBetween(parseFloat(hsl[i]), 0, 1)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Checks whether string is a valid color.
   *
   * @param    {string}  input  String to check.
   * @returns  {boolean}
   */
  isColor(input: string) {
    if (!input || typeof input !== 'string') {
      throw this.errorMessage('input', 'string');
    }

    // Check whether input passes our other color checks.
    return this.isHex(input) || this.isRGB(input) || this.isHSL(input);
  }
}

export default Validator;
