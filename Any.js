const Any = x => ({
  x,
  concat: ({ x: y }) => Any(x || y),
  inspect: _ => `Any(${x})`,
});

Any.empty = _ => Any(false);

export default Any;
