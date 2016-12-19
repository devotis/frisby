const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: _ => `Sum(${x})`,
});

Sum.empty = () => Sum(0);

export default Sum;
