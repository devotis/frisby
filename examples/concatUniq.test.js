import concatUniq from './concatUniq';

describe('concatUniq', () => {
  test('when not unique', () => {
    expect(concatUniq(1)([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test('when unique', () => {
    expect(concatUniq(1)([2, 3, 4])).toEqual([2, 3, 4, 1]);
  });
});
