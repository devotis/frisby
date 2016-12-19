import fs from 'fs';
import { tryCatch } from '../Either';

export default _ =>
  tryCatch(() => fs.readFileSync('config.json'))
  .chain(c => tryCatch(() => JSON.parse(c)))
  .fold(e => 3000,
        c => c.port);
