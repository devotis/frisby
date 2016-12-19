import Box from './Box';

const nextCharForNumberString = str =>
  Box(str)
  .map(s => s.trim())
  .map(s => parseInt(s, 10))
  .map(i => i + 1)
  .fold(i => String.fromCharCode(i));

test('1.', () => {
  expect(nextCharForNumberString(' 64')).toBe('A');
  expect(nextCharForNumberString(' 65')).toBe('B');
});


const moneyToFloat = str =>
  Box(str)
  .map(s => s.replace(/\$/g, ''))
  .map(r => parseFloat(r));

const percentToFloat = str =>
  Box(str)
  .map(s => s.replace(/%/g, ''))
  .map(r => parseFloat(r))
  .map(f => f * 0.01);

// const applyDiscount = (price, discount) => {
//   const cost = moneyToFloat(price);
//   const savings = percentToFloat(discount);
//   return cost - cost * savings;
// }

// capture linear control flow with closures
const applyDiscount = (price, discount) =>
  moneyToFloat(price)
  .fold(cost =>
    percentToFloat(discount)
    .fold(savings =>
      cost - (cost * savings),
    ),
  );

test('2.', () => {
  expect(applyDiscount('$10', '20%')).toBe(8);
  expect(applyDiscount(' $5.50', '100%')).toBe(0);
});
