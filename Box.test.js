import Box from './Box';

describe('Box', () => {
  test('map and fold', () => {
    const x = 2;
    const f = n => n * n;
    const g = n => n + 1;

    expect(
      Box(x)
      .map(f)
      .map(g)
      .fold(a => a),
    ).toEqual(5);
  });
});
