const First = x => ({
  x,
  concat: ({ x: y }) => First(x),
  inspect: _ => `First(${x})`,
});

export default First;
