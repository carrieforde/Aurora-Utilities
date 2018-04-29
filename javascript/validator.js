// @flow

/**
 * JavaScript Validation functions.
 */
class Validator {
  constructor(dev = false) {
    this.dev = dev;
  }

  /**
   * Checks if the input parameter is an email address
   *
   * @param    {string}  input  The email to validate.
   * @returns  {bool}
   */
  isEmailAddress(input) {
    // Throw an error if the input is missing.
    if (!input || typeof input !== 'string') {
      throw 'Missing parameter, or parameter is not correct format (requires string).';
    }

    // Get variables.
    var splitString = input.split('@'),
      username,
      domain,
      tld;

    // Return if no '@' exists in the string.
    if (input.indexOf('@') === -1 || splitString > 2) {
      return false;
    }

    // Update domain.
    username = splitString[0];
    domain = splitString[1];

    // Make sure username isn't empty.
    if (username.length < 1) {
      return false;
    }

    // Make sure the position of '.' in the domain is not the very first character (which would be after '@').
    if (domain.indexOf('.') > 0) {
      // Get the length of the top level domain, i.e. .com.
      tld = domain.substring(domain.indexOf('.'), domain.length);

      // Make sure the length of the TLD is greater than or equal to 3 (because it includes the '.').
      if (this.isOfLengthOrGreaterThan(tld, 3)) {
        // Make sure we don't have successive dots in our tld.
        for (var i = 0; i < tld.length; i++) {
          // If there are two dots in a row, bail.
          if (tld[i] === '.' && tld[i - 1] === '.') {
            return false;
          }
        }

        return true;
      }
    }

    return false;
  }

  /**
   * Checks if the input parameter is a valid phone number.
   *
   * @param    {string | number}  input  The phone number to validate.
   * @returns  {bool}
   */
  isPhoneNumber(input) {
    // Throw an error if the input is missing.
    if (!input || (typeof input !== 'string' && typeof input !== 'number')) {
      throw 'Missing parameter, or parameter is not correct format (requires string or number).';
    }

    // Convert to string to check length.
    input = input.toString();

    // Remove parens, dashes, and spaces.
    input = input.replace(/[-() ]/g, '');

    // Check length of number, which may or may not include an area code.
    return (!input.match(/[^\d]/) && input.length === 10) || input.length === 7;
  }

  /**
   * Checks if the input parameter text is a valid date (i.e. can be turned into a valid date object).
   *
   * @param    {string}  input  The date string to check.
   * @returns  {bool}
   */
  isDate(input) {
    // Throw an error if the input is missing.
    if (!input || typeof input !== 'string') {
      throw 'Missing parameter, or parameter is not correct format (requires string).';
    }

    // Try to create a new date.
    date = new Date(input);

    // Checks validity of date by making sure that it can be turned into a number with getTime().
    return !isNaN(date.getTime());
  }

  /**
   * Checks if the input parameter is a date that comes after the reference date.
   *
   * @param    {string | date}  input      The date to check.
   * @param    {string | date}  reference  The reference date against which we are checking.
   * @returns  {bool}
   */
  isBeforeDate(input, reference) {
    // If strings are passed, check validity of dates passed.
    if (
      (typeof input === 'string' && !this.isDate(input)) ||
      (typeof reference === 'string' && !this.isDate(reference))
    ) {
      return false;
    }

    // Create dates if strings.
    typeof input === 'string' ? (input = new Date(input)) : '';
    typeof reference === 'string' ? (reference = new Date(reference)) : '';

    // Is the input smaller?
    return input.getTime() < reference.getTime();
  }

  /**
   * Checks if the input parameter is a date that comes before the reference date.
   *
   * @param    {string | date}  input      The date to check.
   * @param    {string | date}  reference  The reference date against which we are checking.
   * @returns  {bool}
   */
  isAfterDate(input, reference) {
    // If strings are passed, check validity of dates passed.
    if (
      (typeof input === 'string' && !this.isDate(input)) ||
      (typeof reference === 'string' && !this.isDate(reference))
    ) {
      return false;
    }

    // Create dates if strings.
    typeof input === 'string' ? (input = new Date(input)) : '';
    typeof reference === 'string' ? (reference = new Date(reference)) : '';

    // Check if the input is bigger than the reference.
    return input.getTime() > reference.getTime();
  }

  /**
   * Checks if the input parameter is a date that comes before today.
   *
   * @param   {string | object}  input  The date to check
   * @return  {bool}
   */
  isBeforeToday(input) {
    // Check validity of dates passed.
    if (typeof input === 'string' && !this.isDate(input)) {
      return false;
    }

    // Create dates.
    typeof input === 'string' ? (input = new Date(input)) : '';
    today = new Date();

    // See if input is smaller than today's date.
    return input.getTime() < today.getTime();
  }

  /**
   * Checks if input paramter is after today.
   *
   * @param    {string | object}  input  The date to check.
   * @returns  {bool}
   */
  isAfterToday(input) {
    // Check validity of dates passed.
    if (typeof input === 'string' && !this.isDate(input)) {
      return false;
    }

    // Create dates.
    typeof input === 'string' ? (input = new Date(input)) : '';
    today = new Date();

    // Check if the input is bigger.
    return input.getTime() > today.getTime();
  }

  /**
   * Checks the input parameter and returns true if it is an empty string–-a string with no length or characters that is represented as "" or only contains whitespace(s).
   *
   * @param    {string}  input  The string to be checked.
   * @returns  {bool}
   */
  isEmpty(input) {
    // Check if input is null.
    if (input === null) {
      return false;
    }

    // Throw an error if a string isn't passed.
    if (typeof input !== 'string') {
      throw "'input' should be a string.";
    }

    return input.length === 0 || (input.match(/ /g) && !input.match(/[a-z\d]/gi));
  }

  /**
   * Checks if the input parameter has leading or trailing whitespaces or too many spaces between words.
   *
   * @param    {string}  input  The string to be checked.
   * @returns  {bool}
   */
  isTrimmed(input) {
    // Throw an error if the input is missing.
    if (!input || typeof input !== 'string') {
      throw 'Missing parameter, or parameter is not correct format (requires string).';
    }

    // Check to see if the string passed begins or ends with a space, or contains two or more spaces in a row.
    return !input.match(/^ /g) && !input.match(/ $/g) && !input.match(/  +/g);
  }

  /**
   * Checks if the input text parameter contains any of the words within the words array.
   *
   * @param    {string}  input  The string to check.
   * @param    {array}   words  The words to check for in the string.
   * @returns  {bool}
   */
  contains(input, words) {
    // Throw an error if input or words is missing.
    if (!input || !words || typeof input !== 'string' || !Array.isArray(words)) {
      throw 'Missing parameter(s), or parameter formats are not correct (input requires string, words requires array).';
    }

    // Split input into an array.
    input = input.split(/[ _-]/);

    // Loop over words in input...
    for (var i = 0; i < input.length; i++) {
      // Loop through words array...
      for (var j = 0; j < words.length; j++) {
        // If there are any matches, return true.
        if (input[i].toUpperCase() === words[j].toUpperCase()) {
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
   * @returns  {bool}
   */
  lacks(input, words) {
    return !this.contains(input, words);
  }

  /**
   * Checks that the input text parameter contains only strings found within the strings array.
   *
   * @param    {string}  input    The string to check.
   * @param    {array}   strings  An array of strings.
   * @returns  {bool}
   */
  isComposedOf(input, strings) {
    // Throw an error if input or words is missing.
    if (!input || !strings || typeof input !== 'string' || !Array.isArray(strings)) {
      throw 'Missing parameter(s), or parameter formats are not correct (input requires string, strings requires array).';
    }

    // Create a variable to keep track of where we find matches.
    var matchIndex = -1,
      sub;

    // Strip spaces from string, and make uppercase for comparison.
    input = input.replace(/([^a-z\d])/gi, '').toUpperCase();

    // Loop over every character of input.
    for (var i = 0; i < input.length; i++) {
      // Update substring for testing potential overlaps.
      sub = input.substring(i, input.length);

      // Loop over every string in strings...
      for (var j = 0; j < strings.length; j++) {
        // If strings at j matches our sub with an index of 0...
        if (sub.indexOf(strings[j].toUpperCase()) === 0) {
          // Check if our position in the outer loop + the length of string[j] + 1 is greater than our matchIndex...
          if (i + strings[j].length + 1 > matchIndex) {
            // Update match index.
            matchIndex = i + strings[j].length + 1;
          }
        }
      }

      // If matchIndex is less than i, return false.
      if (matchIndex < i) {
        return false;
      }
    }

    // If matchIndex is greater than or equal to input.length, return true.
    return matchIndex >= input.length;
  }

  /**
   * Checks if the input parameter has a word count less than or equal to the n parameter.
   *
   * @param    {string}           input  The string to check.
   * @param    {string | number}  n      The length to be checked against.
   * @returns  {bool}
   */
  isOfLengthOrLessThan(input, n) {
    // Throw an error if we're missing one or more params.
    if (!input || !n || typeof input !== 'string') {
      throw 'Missing parameter(s), or input parameter format is not correct (irequires string).';
    }

    // Cast n as an int.
    n = parseInt(n, 10);

    // Check that parseInt didn't return NaN...if it did, throw an error.
    if (isNaN(n)) {
      throw "'n' is not a number or a string.";
    }

    // If the string is less than or equal to n, return true.
    return input.length <= n;
  }

  /**
   * Checks if the input parameter has a word count greater than or equal to the n parameter.
   *
   * @param    {string}           input  The string to check.
   * @param    {string | number}  n      The length to be checked against.
   * @returns  {bool}
   */
  isOfLengthOrGreaterThan(input, n) {
    // Throw an error if we're missing one or more params.
    if (!input || !n || typeof input !== 'string') {
      throw 'Missing parameter(s), or input parameter format is not correct (irequires string).';
    }

    // Cast n as an int.
    n = parseInt(n, 10);

    // Check that parseInt didn't return NaN...if it did, throw an error.
    if (isNaN(n)) {
      throw "'n' is not a number or a string.";
    }

    // If the string is greater than or equal to n, return true.
    return input.length >= n;
  }

  /**
   * Checks if the input parameter has a word count less than or equal to the n parameter.
   *
   * @param    {string}           input  The string to check.
   * @param    {string | number}  n      The length to be checked against.
   * @returns  {bool}
   */
  lessWordsThan(input, n) {
    // Throw an error if we're missing one or more params.
    if (!input || !n || typeof input !== 'string') {
      throw 'Missing parameter(s), or input parameter format is not correct (irequires string).';
    }

    // Cast n as an int.
    n = parseInt(n, 10);

    // Check that parseInt didn't return NaN...if it did, throw an error.
    if (isNaN(n)) {
      throw "'n' is not a number or a string.";
    }

    // Split the input into an array.
    input = input.split(' ');

    // If the string is less than n, return true.
    return input.length <= n;
  }

  /**
   * Checks if the input parameter has a word count greater than or equal to the n parameter.
   *
   * @param    {string}           input  The string to check.
   * @param    {string | number}  n      The length to be checked against.
   * @returns  {bool}
   */
  moreWordsThan(input, n) {
    // Throw an error if we're missing one or more params.
    if (!input || !n || typeof input !== 'string') {
      throw 'Missing parameter(s), or input parameter format is not correct (irequires string).';
    }

    // Cast n as an int.
    n = parseInt(n, 10);

    // Check that parseInt didn't return NaN...if it did, throw an error.
    if (isNaN(n)) {
      throw "'n' is not a number or a string.";
    }

    // Split the input into an array.
    input = input.split(' ');

    // If the string is greater than n, return true.
    return input.length >= n;
  }

  /**
   * Checks that a number is greater than or equal to the floor, and less than or equal to the ceiling.
   *
   * @param    {number | string}  input  The number to check.
   * @param    {number | string}  floor  The lower number in the range.
   * @param    {number | string}  ceil   The higher number in the range.
   * @returns  {bool}
   */
  isNumberBetween(input, floor, ceil) {
    // Throw an error if any of the params are missng.
    if ((!input && input !== 0) || (!floor && floor !== 0) || (!ceil && ceil !== 0)) {
      throw "Missing parameter(s) for isNumberBetween: 'input', 'floor', and / or 'ceil'.";
    }

    // Cast our params to numbers.
    input = parseFloat(input);
    floor = parseFloat(floor);
    ceil = parseFloat(ceil);

    // If any param is NaN, throw an error.
    if (isNaN(input) || isNaN(floor) || isNaN(ceil)) {
      throw "'input', 'floor', and / or 'ceil' is not a number or a valid string.";
    }

    // Check to see if the input is greater than or equal to the floor, or less than or equal to the ceil.
    return input >= floor && input <= ceil;
  }

  /**
   * Checks that the input parameter string is only composed of a—z, A—Z, or 0—9.
   *
   * @param    {string}  input  The string to check.
   * @returns  {bool}
   */
  isAlphanumeric(input) {
    // Throw an error if we're missing one or more params.
    if ((!input && input !== '') || typeof input !== 'string') {
      throw 'Missing parameter, or parameter format is not correct (requires string).';
    }

    // Check to see if we have a match for anything *not* a-z, A-Z or 0-9.
    return !input.match(/([^a-z\d])/gi);
  }

  /**
   * Checks if the input parameter is a credit card or bank card number.
   *
   * @param    {string}  input  The string to check.
   * @returns  {bool}
   */
  isCreditCard(input) {
    // Throw an error if we're missing one or more params.
    if ((!input && input !== '') || typeof input !== 'string') {
      throw 'Missing parameter, or parameter format is not correct (requires string).';
    }

    // Removes all dashes from string.
    input = input.replace(/-/g, '');

    return !this.isEmpty(input) && this.isAlphanumeric(input) && input.length === 16;
  }

  /**
   * Checks if the input string is a hexadecimal color. Input must begin with #.
   *
   * @param    {string}  input  The string to check.
   * @returns  {bool}
   */
  isHex(input) {
    // Throw an error if the input is missing.
    if (!input || typeof input !== 'string') {
      throw 'Missing parameter, or parameter is not correct format (requires string).';
    }

    // Make sure the string begins with a #.
    if (input.charAt(0) !== '#') {
      return false;
    }

    // We know that the first character is a #, so we only need to check the rest of the string.
    input = input.substring(1, input.length);

    // Make sure we only have a-f, A-F, or 0-9.
    if (input.match(/([^a-f\d])/gi)) {
      return false;
    }

    // Make sure the substring is 3 or 6 characters long.
    return input.length === 3 || input.length === 6;
  }

  /**
   * Checks if the input string is an RGB color.
   *
   * @param    {string}  input  The string to check.
   * @returns  {bool}
   */
  isRGB(input) {
    // Throw an error if the input is missing.
    if (!input || typeof input !== 'string') {
      throw 'Missing parameter, or parameter is not correct format (requires string).';
    }

    // Remove any spaces and semicolons.
    input = input.replace(/\s/g, '');
    input = input.replace(';', '');

    // Make sure string begins with 'rgb(' and ends with ')'.
    if (input.substring(0, 4) !== 'rgb(' && input.charAt(input.length) !== ')') {
      return false;
    }

    // Use .substring to get numbers between rgb().
    input = input.substring(4, input.length - 1);

    // Split substring into an array.
    input = input.split(',');

    // If the array has more than three values, it ain't RGB.
    if (input.length !== 3) {
      return false;
    }

    // Loop over values to make sure they're between 0 and 255.
    for (var i = 0; i < input.length; i++) {
      if (!this.isNumberBetween(input[i], '0', '255')) {
        return false;
      }
    }

    return true;
  }

  /**
   * Checks if the input string is an HSL color.
   *
   * @param    {string}  input  The string to check.
   * @returns  {bool}
   */
  isHSL(input) {
    // Throw an error if the input is missing.
    if (!input || typeof input !== 'string') {
      throw 'Missing parameter, or parameter is not correct format (requires string).';
    }

    // Remove any spaces.
    input.replace(' ', '');

    // Make sure string begins with 'hsl(' and ends with ')'.
    if (input.substring(0, 4) !== 'hsl(' && input.charAt(input.length) !== ')') {
      return false;
    }

    // Use .substring to get numbers between hsl().
    input = input.substring(4, input.length - 1);

    // Split substring into an array.
    input = input.split(',');

    // If the array has more than three values, it ain't HSL.
    if (input.length !== 3) {
      return false;
    }

    // Check the value of the first number is between 0 and 360.
    if (!this.isNumberBetween(input[0], '0', '360')) {
      return false;
    }

    // Loop over the other 2 values to make sure they're between 0 and 1.
    for (var i = 1; i < input.length; i++) {
      if (!this.isNumberBetween(input[i], '0', '1')) {
        return false;
      }
    }

    return true;
  }

  /**
   * Checks whether string is a valid color.
   *
   * @param    {string}  input  String to check.
   * @returns  {bool}
   */
  isColor(input) {
    // Throw an error if the input is missing.
    if (!input || typeof input !== 'string') {
      throw 'Missing parameter, or parameter is not correct format (requires string).';
    }

    // Check whether input passes our other color checks.
    return this.isHex(input) || this.isRGB(input) || this.isHSL(input);
  }
}

export default Validator;
