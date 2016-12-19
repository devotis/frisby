import fs from 'fs';
import { fromNullable, tryCatch } from '../Either';

// const wrapExample = (example) => {
//   if (example.previewPath) {
//     try {
//       // eslint-disable-next-line no-param-reassign
//       example.preview = fs.readFileSync(example.previewPath);
//     } catch (e) {} // eslint-disable-line no-empty
//   }
//   return example;
// };

const readFile = x => tryCatch(() => fs.readFileSync(x));

export default example =>
  fromNullable(example.previewPath)
    .chain(readFile)
    .fold(_ => example,
          p => Object.assign({}, example, { preview: p }));
