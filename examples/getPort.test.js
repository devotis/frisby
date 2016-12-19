import getPort from './getPort';

jest.mock('fs');

describe('getPort', () => {
  test('works with no JSON file', () => {
    expect(getPort()).toBe(3000);
  });

  test('works with a malformed JSON file', () => {
    require('fs').__setMockFiles({
      'config.json': 'asd',
    });

    expect(getPort()).toBe(3000);
  });

  test('works with a correct JSON file', () => {
    require('fs').__setMockFiles({
      'config.json': JSON.stringify({ port: 4000 }),
    });

    expect(getPort()).toBe(4000);
  });
});
