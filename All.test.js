import All from './All';

describe('All', () => {
  describe('semigroup', () => {
    test('associativity', () => {
      const a = true;
      const b = true;
      const c = false;

      expect(All(true).concat(All(true)).x).toEqual(true);
      expect(All(true).concat(All(false)).x).toEqual(false);

      expect(
        All(a).concat(All(b)).concat(All(c)).x,
      ).toEqual(
        All(a).concat(All(b).concat(All(c))).x,
      );
    });
  });

  describe('monoid', () => {
    test('left identity', () => {
      expect(All(true).concat(All.empty()).x).toEqual(true);
    });

    test('right identity', () => {
      expect(All(true).concat(All.empty()).x).toEqual(true);
    });
  });
});
