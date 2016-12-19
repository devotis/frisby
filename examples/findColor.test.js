import findColor from './findColor';

describe('findColor', () => {
  test('handles errors', () => {
    expect(
      findColor('green')
      .map(c => c.slice(1))
      .fold(e => 'no color',
      s => s.toUpperCase()),
    ).toBe('no color');
  });

  test('handles non-errors', () => {
    expect(
      findColor('red')
      .map(c => c.slice(1))
      .fold(e => 'no color',
      s => s.toUpperCase()),
    ).toBe('FF4444');
  });
});
