const Min = x => ({
  x,
  concat: ({ x: y }) => Min(x < y ? x : y),
  inspect: _ => `Min(${x})`,
});

Min.empty = _ => Min(Infinity);

export default Min;
