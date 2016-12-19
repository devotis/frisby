import Product from './Product';

describe('Product', () => {
  describe('semigroup', () => {
    test('associativity', () => {
      expect(Product(2).concat(Product(3)).x).toEqual(6);

      expect(
        Product(2).concat(Product(3)).concat(6).x,
      ).toEqual(
        Product(2).concat(Product(3).concat(6)).x,
      );
    });
  });

  describe('monoid', () => {
    test('left identity', () => {
      expect(
        Product(1).concat(Product.empty()).x,
      ).toEqual(1);
    });

    test('right identity', () => {
      expect(
        Product.empty().concat(Product(1)).x,
      ).toEqual(1);
    });
  });
});
