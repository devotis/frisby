import Any from './Any';

describe('Any', () => {
  describe('semigroup', () => {
    test('associativity', () => {
      const a = true;
      const b = true;
      const c = false;

      expect(Any(true).concat(Any(true)).x).toEqual(true);
      expect(Any(true).concat(Any(false)).x).toEqual(true);

      expect(
        Any(a).concat(Any(b)).concat(Any(c)).x,
      ).toEqual(
        Any(a).concat(Any(b).concat(Any(c))).x,
      );
    });
  });

  describe('monoid', () => {
    test('left identity', () => {
      expect(Any(true).concat(Any.empty()).x).toEqual(true);
    });

    test('right identity', () => {
      expect(Any(true).concat(Any.empty()).x).toEqual(true);
    });
  });
});
