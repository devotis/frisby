import streetName from './streetName';

describe('streetName', () => {
  test('with no address', () => {
    const user = {};
    expect(streetName(user)).toBe('no street');
  });

  test('with no street', () => {
    const user = { address: {} };
    expect(streetName(user)).toBe('no street');
  });

  test('with a full address', () => {
    const user = { address: { street: { name: 'Brannan St' } } };
    expect(streetName(user)).toBe('Brannan St');
  });
});
