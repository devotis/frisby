import Max from './Max';

describe('Max', () => {
  describe('semigroup', () => {
    test('associativity', () => {
      const a = 10;
      const b = 5;
      const c = 4;

      expect(Max(a).concat(Max(b)).x).toEqual(a);

      expect(
        Max(a).concat(Max(b)).concat(Max(c)).x,
      ).toEqual(
        Max(a).concat(Max(b).concat(Max(c))).x,
      );
    });
  });

  describe('monoid', () => {
    test('left identity', () => {
      expect(Max(10).concat(Max.empty()).x).toEqual(10);
    });

    test('right identity', () => {
      expect(Max(10).concat(Max.empty()).x).toEqual(10);
    });
  });
});
