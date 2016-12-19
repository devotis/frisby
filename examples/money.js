import Box from '../Box';

export const moneyToFloat = str =>
  Box(str)
    .map(s => s.replace(/\$/g, ''))
    .map(r => parseFloat(r));

export const percentToFloat = str =>
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
export const applyDiscount = (price, discount) =>
  moneyToFloat(price)
  .fold(cost =>
    percentToFloat(discount)
    .fold(savings =>
      cost - (cost * savings),
    ),
  );
