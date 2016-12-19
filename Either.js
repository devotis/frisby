export const Left = x => ({
  x,
  chain: _ => Left(x),
  map: _ => Left(x),
  fold: (f, g) => f(x),
  inspect: _ => `Left(${x})`,
});

export const Right = x => ({
  x,
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: _ => `Right(${x})`,
});

const Either = Left || Right;

Either.of = x => Right(x);

export const fromNullable = x =>
  x != null ? Right(x) : Left(null);

export const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};
