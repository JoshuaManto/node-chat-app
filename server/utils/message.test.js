var expect = require('expect');

var {generateMessage} = require('./message')

describe('generateMessage', () =>
{
  it('should generate correct message object', () =>
  {
    // store res in variable
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    // assert from match
    // assert createdAt is a number
    expect(typeof message.createdAt).toBe('number');
    // assert text match
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);

  });
});
