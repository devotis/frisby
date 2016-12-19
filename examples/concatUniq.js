import { fromNullable } from '../Either';

// const concatUniq = (x, ys) => {
//   const found = ys.filter(y => y === x)[0];
//   return found ? ys : ys.concat(x);
// };

export default x => ys =>
  fromNullable(ys.filter(y => y === x)[0])
  .fold(_ => ys.concat(x), _ => ys);
