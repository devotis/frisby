import nextCharForNumberString from './nextCharForNumberString';

test('nextCharForNumberString', () => {
  expect(nextCharForNumberString(' 64')).toBe('A');
  expect(nextCharForNumberString(' 65')).toBe('B');
});
