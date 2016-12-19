import Sum from './Sum';

describe('Sum', () => {
  describe('semigroup', () => {
    test('associativity', () => {
      const a = 1;
      const b = 2;
      const c = 3;
      expect(Sum(1).concat(Sum(2)).concat(Sum(3)).x).toEqual(6);

      expect(
        Sum(a).concat(Sum(b)).concat(Sum(c)).x,
      ).toEqual(
        Sum(a).concat(Sum(b).concat(Sum(c))).x,
      );
    });
  });

  describe('monoid', () => {
    test('left identity', () => {
      expect(
        Sum(1).concat(Sum.empty()).x,
      ).toEqual(1);
    });

    test('right identity', () => {
      expect(
        Sum.empty().concat(Sum(1)).x,
      ).toEqual(1);
    });
  });
});
