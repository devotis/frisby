import openSite from './openSite';

describe('openSite', () => {
  test('renders the user profile page', () => {
    const user = { name: 'Bob' };

    expect(openSite(user)).toBe('<h1>Bob</h1>');
  });

  test('renders the login page', () => {
    expect(openSite()).toBe('<h1>Please Login!</h1>');
  });
});
