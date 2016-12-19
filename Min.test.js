import Min from './Min';

describe('Min', () => {
  describe('semigroup', () => {
    test('associativity', () => {
      const a = 10;
      const b = 5;
      const c = 4;

      expect(Min(a).concat(Min(b)).x).toEqual(b);

      expect(
        Min(a).concat(Min(b)).concat(Min(c)).x,
      ).toEqual(
        Min(a).concat(Min(b).concat(Min(c))).x,
      );
    });
  });

  describe('monoid', () => {
    test('left identity', () => {
      expect(Min(10).concat(Min.empty()).x).toEqual(10);
    });

    test('right identity', () => {
      expect(Min(10).concat(Min.empty()).x).toEqual(10);
    });
  });
});
