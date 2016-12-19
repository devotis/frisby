const Product = x => ({
  x,
  concat: ({ x: y }) => Product(x * y),
  inspect: _ => `Product(${x})`,
});

Product.empty = _ => Product(1);

export default Product;
