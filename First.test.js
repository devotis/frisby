import First from './First';

describe('First', () => {
  describe('semigroup', () => {
    test('associativity', () => {
      const a = 'foo';
      const b = 'bar';
      const c = 'baz';

      expect(First('foo').concat(First('bar')).x).toEqual('foo');
      expect(
        First(a).concat(First(b)).concat(First(c)).x,
      ).toEqual(
        First(a).concat(First(b).concat(First(c))).x,
      );
    });
  });
});
