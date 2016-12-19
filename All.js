const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: _ => `All(${x})`,
});

All.empty = _ => All(true);

export default All;
