import { fromNullable } from '../Either';
// const findColor = name => ({
//   red: '#ff4444',
//   blue: '#3b5998',
//   yellow: '#fff68f',
// })[name];

// this works
// findColor('red').slice(1).toUpperCase();
// this breaks
// findColor('green').slice(1).toUpperCase();

const findColor = name =>
  fromNullable(({ red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' })[name]);

export default findColor;
