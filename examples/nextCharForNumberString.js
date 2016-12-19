import Box from '../Box';

export default str =>
  Box(str)
  .map(s => s.trim())
  .map(s => parseInt(s, 10))
  .map(i => i + 1)
  .fold(i => String.fromCharCode(i));
