import { applyDiscount } from './money';

test('applyDiscount', () => {
  expect(applyDiscount('$10', '20%')).toBe(8);
  expect(applyDiscount(' $5.50', '100%')).toBe(0);
});
