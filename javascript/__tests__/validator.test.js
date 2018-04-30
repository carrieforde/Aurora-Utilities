import Validator from '../validator';

const validator = new Validator(true);

describe('isEmailAddress', () => {
  test('user@mail.com is a valid email address', () => {
    expect(validator.isEmailAddress('user@mail.com')).toBe(true);
  });

  test('user@@mail.com is NOT a valid email address', () => {
    expect(validator.isEmailAddress('user@@mail.com')).toBe(false);
  });

  test('@mail.com is NOT a valid email address', () => {
    expect(validator.isEmailAddress('@mail.com')).toBe(false);
  });

  test('user.name@mail.co.uk to be a valid email address', () => {
    expect(validator.isEmailAddress('user.name@mail.co.uk')).toBe(true);
  });

  test('test@xyz..com to NOT be a valid email address', () => {
    expect(validator.isEmailAddress('test@xyz..com'));
  });
});

describe('isPhoneNumber', () => {
  test('555-555-5555 is a valid phone number', () => {
    expect(validator.isPhoneNumber('555-555-5555')).toBe(true);
  });

  test('5555555555 is a valid phone number', () => {
    expect(validator.isPhoneNumber('5555555555')).toBe(true);
  });

  test('555-5555 is a valid phone number', () => {
    expect(validator.isPhoneNumber('555-5555')).toBe(true);
  });

  test('555@#$5555 is NOT a valid phone number', () => {
    expect(validator.isPhoneNumber('555@#$5555')).toBe(false);
  });
});

describe('isDate', () => {
  test('12-25-2018 is a valid date', () => {
    expect(validator.isDate('12-25-2018')).toBe(true);
  });

  test('12 Dec 2018 is a valid date', () => {
    expect(validator.isDate('12 Dec 2018')).toBe(true);
  });

  test('32 Dec 2017 is NOT a valid date', () => {
    expect(validator.isDate('32 Dec 2017')).toBe(false);
  });
});

describe('isBeforeDate', () => {
  test('10-10-2016 isBefore 4-5-2012 is false', () => {
    expect(validator.isBeforeDate('10-10-2016', '4-5-2012')).toBe(false);
  });

  test('10-10-2016 isBefore 10-12-2016 is true', () => {
    expect(validator.isBeforeDate('10-10-2016', '10-12-2016')).toBe(true);
  });

  test('Halloween is before Christmas in the same year is true.', () => {
    const dec25 = new Date('12-25-2016'),
      oct31 = new Date('10-31-2016');

    expect(validator.isBeforeDate(oct31, dec25)).toBe(true);
  });

  test('Christmas is before Halloween in the same year is false.', () => {
    const dec25 = new Date('12-25-2016'),
      oct31 = new Date('10-31-2016');

    expect(validator.isBeforeDate(dec25, oct31)).toBe(false);
  });

  test('a poorly formed date string', () => {
    expect(validator.isBeforeDate('cat', '12/25/2017')).toBe(false);
  });
});

describe('isAfterDate', () => {
  test('10-10-2016 isAfter 4-5-2012 is true', () => {
    expect(validator.isAfterDate('10-10-2016', '4-5-2012')).toBe(true);
  });

  test('10-10-2016 isAfter 10-12-2016 is false', () => {
    expect(validator.isAfterDate('10-10-2016', '10-12-2016')).toBe(false);
  });

  test('Halloween is after Christmas in the same year is false.', () => {
    const dec25 = new Date('12-25-2016'),
      oct31 = new Date('10-31-2016');

    expect(validator.isAfterDate(oct31, dec25)).toBe(false);
  });

  test('Christmas is after Halloween in the same year is true.', () => {
    const dec25 = new Date('12-25-2016'),
      oct31 = new Date('10-31-2016');

    expect(validator.isAfterDate(dec25, oct31)).toBe(true);
  });

  test('a poorly formed date string', () => {
    expect(validator.isAfterDate('cat', '12/25/2017')).toBe(false);
  });
});

describe('isBeforeToday', () => {
  test('Jan 12, 1983 is true', () => {
    expect(validator.isBeforeToday('1/12/1983')).toBe(true);
  });

  test('Tomorrow is false', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(validator.isBeforeToday(tomorrow)).toBe(false);
  });

  test('Yesterday is true', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(validator.isBeforeToday(yesterday)).toBe(true);
  });

  test('new Date is true because this date is created before our validator date', () => {
    expect(validator.isBeforeToday(new Date())).toBe(true);
  });

  test('not-a-date string', () => {
    expect(validator.isBeforeToday('cat')).toBe(false);
  });
});

describe('isAfterToday', () => {
  test('Jan 12, 1983 is false', () => {
    expect(validator.isAfterToday('1-12-1983')).toBe(false);
  });

  test('tomorrow is true', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(validator.isAfterToday(tomorrow)).toBe(true);
  });

  test('yesterday is false', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(validator.isAfterToday(yesterday)).toBe(false);
  });

  test('new Date is false because this is created before test date', () => {
    expect(validator.isAfterToday(new Date())).toBe(false);
  });

  test('not-a-date string', () => {
    expect(validator.isAfterToday('cat')).toBe(false);
  });
});

describe('isEmpty', () => {
  test('A non-empty string returns false', () => {
    expect(validator.isEmpty('Visiting new places is fun!')).toBe(false);
  });

  test('"" returns true', () => {
    expect(validator.isEmpty('')).toBe(true);
  });

  test("' ' returns true", () => {
    expect(validator.isEmpty(' ')).toBe(true);
  });

  test("'     ' returns true", () => {
    expect(validator.isEmpty('      ')).toBe(true);
  });

  test('null returns false', () => {
    expect(validator.isEmpty(null)).toBe(false);
  });
});

describe('isTrimmed', () => {
  test('A string beginnging with spaces.', () => {
    expect(validator.isTrimmed('   harmony and irony')).toBe(false);
  });

  test('A string ending with spaces.', () => {
    expect(validator.isTrimmed('harmony and irony    ')).toBe(false);
  });

  test('A string with extra spaces in the middle.', () => {
    expect(validator.isTrimmed('harmony  and  irony')).toBe(false);
  });

  test('A trimmed string', () => {
    expect(validator.isTrimmed('haromony and iron')).toBe(true);
  });
});

describe('contains', () => {
  test('A string that does not contain a word in the array', () => {
    expect(validator.contains('Visiting new places is fun.', ['coconut'])).toBe(false);
  });

  test('A word has only a partial match to the string', () => {
    expect(validator.contains('Visiting new places is fun.', ['aces'])).toBe(false);
  });

  test('A match in our string & our array', () => {
    expect(validator.contains('Visiting new places is fun.', ['places'])).toBe(true);
  });

  test('Two matches between our string & array.', () => {
    expect(validator.contains('"Definitely," he said in a matter-of-fact tone.', ['matter', 'definitely'])).toBe(true);
  });
});

describe('lacks', () => {
  test('A string against words not in the string', () => {
    expect(validator.lacks('Visiting new places is fun.', ['coconut'])).toBe(true);
  });

  test('A string with only a partial match to the words.', () => {
    expect(validator.lacks('Visiting new places is fun.', ['aces'])).toBe(true);
  });

  test('A match between the string and the words array.', () => {
    expect(validator.lacks('Visiting new places is fun.', ['places'])).toBe(false);
  });

  test('Multiple matches between the string and words array.', () => {
    expect(validator.lacks('"Definitely," he said in a matter-of-fact tone.', ['matter', 'definitely'])).toBe(false);
  });
});

describe('isComposedOf', () => {
  test('A string of digits against an array of digit strings.', () => {
    expect(validator.isComposedOf('10184', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])).toBe(true);
  });

  test('A string with words only in the strings array.', () => {
    expect(validator.isComposedOf('I am ready.', ['I', "I'm", 'am', 'not', 'ready'])).toBe(true);
  });

  test('A string with no spaces, but only of words from the strings array.', () => {
    expect(validator.isComposedOf('Iamnotready.', ['I', "I'm", 'am', 'not', 'ready'])).toBe(true);
  });

  test('A string with no spaces, but composed of words from the strings array.', () => {
    expect(validator.isComposedOf('applesound', ['apples', 'sound'])).toBe(true);
  });

  test('A string that contains words not found in the array.', () => {
    expect(validator.isComposedOf('foobarbaz', ['foo', 'bar'])).toBe(false);
  });

  test('A string that contains multiple instances of a single word in the strings array.', () => {
    expect(validator.isComposedOf('fooamazonFOO', ['Foo', 'Amazon'])).toBe(true);
  });
});

describe('isOfLengthOrLessThan', () => {
  test('String is longer than n', () => {
    expect(validator.isOfLengthOrLessThan('123456789', 6)).toBe(false);
  });

  test('String is shorter than n', () => {
    expect(validator.isOfLengthOrLessThan('123456789', 20)).toBe(true);
  });

  test('String is shorter than n', () => {
    expect(validator.isOfLengthOrLessThan('AHHHH', 25)).toBe(true);
  });

  test('Another string shorter than n.', () => {
    expect(validator.isOfLengthOrLessThan('This could be a tweet!', 140)).toBe(true);
  });
});

describe('isOfLengthOrGreaterThan', () => {
  test('A string longer than n', () => {
    expect(validator.isOfLengthOrGreaterThan('123456789', 6)).toBe(true);
  });

  test('A string shorter than n', () => {
    expect(validator.isOfLengthOrGreaterThan('123456789', 20)).toBe(false);
  });

  test('A string is shorter than n', () => {
    expect(validator.isOfLengthOrGreaterThan('AHHHH', 25)).toBe(false);
  });

  test('A string shorter than n.', () => {
    expect(validator.isOfLengthOrGreaterThan('This could be a tweet!', 280)).toBe(false);
  });
});

describe('lessWordsThan', () => {
  test('A string shorter than n.', () => {
    expect(validator.lessWordsThan('Learning is like the horizon; there is no limit.', 10)).toBe(true);
  });

  test('A string against 0.', () => {
    expect(validator.lessWordsThan('To know the road ahead, ask those coming back.', 0)).toBe(false);
  });

  test('A string is equal to n', () => {
    expect(validator.lessWordsThan('That is correct.', 3)).toBe(true);
  });

  test('A string longer than n.', () => {
    expect(
      validator.lessWordsThan(
        'If you want happiness for an hour, take a nap. If you want happiness for a day, go fishing. If you want happiness for a month, get married. If you want happiness for a year, inherit a fortune. If you want happiness for a lifetime, help someone else.',
        20
      )
    ).toBe(false);
  });
});

describe('moreWordsThan', () => {
  test('A string shorter than n.', () => {
    expect(validator.moreWordsThan('Learning is like the horizon; there is no limit.', 10)).toBe(false);
  });

  test('A string against 0.', () => {
    expect(validator.moreWordsThan('To know the road ahead, ask those coming back.', 0)).toBe(true);
  });

  test('A string is equal to n', () => {
    expect(validator.moreWordsThan('That is correct.', 3)).toBe(true);
  });

  test('A string longer than n.', () => {
    expect(
      validator.moreWordsThan(
        'If you want happiness for an hour, take a nap. If you want happiness for a day, go fishing. If you want happiness for a month, get married. If you want happiness for a year, inherit a fortune. If you want happiness for a lifetime, help someone else.',
        20
      )
    ).toBe(true);
  });
});

describe('isNumberBetween', () => {
  test('input, floor, and ceil are equal', () => {
    expect(validator.isNumberBetween(3, 3, 3)).toBe(true);
  });

  test('input is greater than floor & ceil', () => {
    expect(validator.isNumberBetween(3, 2, 2)).toBe(false);
  });

  test('floor is greater than ceil', () => {
    expect(validator.isNumberBetween(3, 3, 2)).toBe(false);
  });

  test('input falls between floor and ceiling', () => {
    expect(validator.isNumberBetween(5, 1, 323)).toBe(true);
  });
});

describe('isAlphanumeric', () => {
  test('a string with punctuation', () => {
    expect(validator.isAlphanumeric('Hello.')).toBe(false);
  });

  test('a string with whitespace', () => {
    expect(validator.isAlphanumeric('slam poetry')).toBe(false);
  });

  test('an empty string', () => {
    expect(validator.isAlphanumeric('')).toBe(true);
  });

  test('A string with several punctionation characters', () => {
    expect(validator.isAlphanumeric('Art!$ARd')).toBe(false);
  });

  test('All letters', () => {
    expect(validator.isAlphanumeric('supercalifragilisticexpialidocious')).toBe(true);
  });

  test('letters and digits', () => {
    expect(validator.isAlphanumeric('abc123')).toBe(true);
  });
});

describe('isCreditCard', () => {
  test('a number with dashes', () => {
    expect(validator.isCreditCard('1234-5678-9101-1121')).toBe(true);
  });

  test('a number without dashes', () => {
    expect(validator.isCreditCard('1234567891011121')).toBe(true);
  });

  test('a card with letters and numbers', () => {
    expect(validator.isCreditCard('4427A693CF324D14')).toBe(true);
  });

  test('a card with letters, numbers, and dashes', () => {
    expect(validator.isCreditCard('4427-A693-CF32-4D14')).toBe(true);
  });

  test('all dashes', () => {
    expect(validator.isCreditCard('----------------')).toBe(false);
  });

  test('a short "number"', () => {
    expect(validator.isCreditCard('testcard')).toBe(false);
  });
});

describe('isHex', () => {
  test('a valid 6-character hex', () => {
    expect(validator.isHex('#abcdef')).toBe(true);
  });

  test('a hex with a g', () => {
    expect(validator.isHex('#bcdefg')).toBe(false);
  });

  test('a 3-letter hex', () => {
    expect(validator.isHex('#bbb')).toBe(true);
  });

  test('a 3-character hex', () => {
    expect(validator.isHex('#1cf')).toBe(true);
  });

  test('a 6-character hex', () => {
    expect(validator.isHex('#1234a6')).toBe(true);
  });

  test('a 7-character hex', () => {
    expect(validator.isHex('#1234a68')).toBe(false);
  });

  test('a text without the #', () => {
    expect(validator.isHex('cc4488')).toBe(false);
  });
});

describe('isRGB', () => {
  test('rbg black', () => {
    expect(validator.isRGB('rgb(0,0,0)')).toBe(true);
  });

  test('rgb black with spaces between values', () => {
    expect(validator.isRGB('rgb(0, 0, 0)')).toBe(true);
  });

  test('another valid value', () => {
    expect(validator.isRGB('rgb(255, 255, 112)')).toBe(true);
  });

  test('an rgba value', () => {
    expect(validator.isRGB('rgba(0, 0, 0, 0)')).toBe(false);
  });

  test('where the green is out of range', () => {
    expect(validator.isRGB('rgb(0,300,0)')).toBe(false);
  });

  test('where green is negative', () => {
    expect(validator.isRGB('rgb(0, -14, 0)')).toBe(false);
  });

  test('almost an rgba value', () => {
    expect(validator.isRGB('rgb(0, 0, 0, 0)')).toBe(false);
  });
});

describe('isHSL', () => {
  test('a valid hsl', () => {
    expect(validator.isHSL('hsl(180, 0.3, 1)')).toBe(true);
  });

  test('the wrong prefix', () => {
    expect(validator.isHSL('rgb(180, 0.3, 1)')).toBe(false);
  });

  test('a valid hsl', () => {
    expect(validator.isHSL('hsl(360, 0, 0)')).toBe(true);
  });

  test('rgb values with hsl prefix', () => {
    expect(validator.isHSL('hsl(255, 255, 255)')).toBe(false);
  });

  test('an hsl with an extra value', () => {
    expect(validator.isHSL('hsl(360, 0, 0, 0.3)')).toBe(false);
  });

  test('h value is out of range', () => {
    expect(validator.isHSL('hsl(361, 0, 0)')).toBe(false);
  });
});

describe('isColor', () => {
  test('a valid hex', () => {
    expect(validator.isColor('#ccccff')).toBe(true);
  });

  test('a valid rgb', () => {
    expect(validator.isColor('rgb(255,255,200)')).toBe(true);
  });

  test('a valid hsl', () => {
    expect(validator.isColor('hsl(46, 0.66, 0.21')).toBe(true);
  });

  test('an invalid hsl', () => {
    expect(validator.isColor('hsl(255, 255, 255)')).toBe(false);
  });

  test('a hex without the #', () => {
    expect(validator.isColor('abc345')).toBe(false);
  });

  test('a three-char hex', () => {
    expect(validator.isColor('#363')).toBe(true);
  });
});
