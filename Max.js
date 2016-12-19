const Max = x => ({
  x,
  concat: ({ x: y }) => Max(x > y ? x : y),
  inspect: _ => `Max(${x})`,
});

Max.empty = _ => Max(-Infinity);

export default Max;
