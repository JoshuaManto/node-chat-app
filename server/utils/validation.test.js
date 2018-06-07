const expect = require('expect');

// import isRealString
const {isRealString} = require('./validation')

// isRealString
  // should reject non-string values - pass non string
  // should reject string with only spaces
  // should allow string with non space characters

describe('isRealString', () =>
{
  it('should reject non-string values', () =>
  {
    var test = 123;
    var realString = isRealString(test);

    expect(realString).toBe(false);
  });

  it('should reject string with only spaces', () =>
  {
    var test = '   ';
    var realString = isRealString(test);

    expect(realString).toBe(false);
  });

  it('should allow string with non space characters', () =>
  {
    var test = '  This should work  ';
    var realString = isRealString(test);

    expect(realString).toBe(true);
  })
});
