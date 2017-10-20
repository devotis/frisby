import { Left, Right, fromNullable, tryCatch } from './Either';

describe('Left', () => {
  describe('functor', () => {
    test('identity', () => {
      const a = 2;
      expect(Left(a).map(x => x).x).toBe(a);
    });

    test('composition', () => {
      const a = 2;
      const f = x => x * x;
      const g = x => x + 1;

      expect(Left(a).map(g).map(f).x).toBe(2);

      expect(
        Left(a).map(x => f(g(x))).x,
      ).toBe(
        Left(a).map(g).map(f).x,
      );
    });
  });

  describe('chain', () => {
    test('associativity', () => {
      const x = 2;
      const f = n => n * n;
      const g = n => n + 1;

      expect(Left(x).chain(f).chain(g).x).toEqual(x);
      expect(
        Left(x).chain(f).chain(g).x,
      ).toEqual(
        Left(x).chain(a => f(a).chain(g)).x,
      );
    },
  );
  });

  describe('TODO: group me', () => {
    test('folds correctly', () => {
      expect(
        Left(2)
        .map(x => x + 1)
        .fold(x => 'error', x => x),
      ).toBe('error');
    });
  });
});

describe('Right', () => {
  describe('functor', () => {
    test('identity', () => {
      const a = 2;
      expect(Right(a).map(x => x).x).toBe(2);
    });

    test('composition', () => {
      const a = 2;
      const f = x => x * x;
      const g = x => x + 1;

      expect(Right(a).map(g).map(f).x).toBe(9);

      expect(
        Right(a).map(x => f(g(x))).x,
      ).toBe(
        Right(a).map(g).map(f).x,
      );
    });
  });

  describe('chain', () => {
    test('associativity', () => {
      const x = 2;
      const f = n => n * n;
      const g = n => n + 1;

      expect(
        Right(x)
        .chain(a => Right(f(a)))
        .chain(a => Right(g(a)))
        .fold(a => 'error', a => a),
      ).toEqual(5);

      expect(
        Right(x)
        .chain(a => Right(f(a)))
        .chain(a => Right(g(a)))
        .fold(a => 'error', a => a),
      ).toEqual(
        Right(x)
        .chain(a => Right(f(a)).chain(g)),
      );
    });
  });

  describe('TODO: group me', () => {
    test('folds correctly', () => {
      expect(
        Right(2)
        .map(x => x + 1)
        .fold(x => 'error', x => x),
      ).toBe(3);
    });
  });
});
