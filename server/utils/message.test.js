var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message')

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

describe('geenrateLocationMessage', () =>
{
  it('should generate correct location object', () =>
  {
    var from = 'Admin';
    var latitude = 50;
    var longitude = 25;
    var url = 'https://www.google.com/maps?q=50,25';
    var message = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createdAt).toBe('number');
    expect(message.from).toBe(from);
    expect(message.url).toBe(url);

  });
});
