import getPrefs from './getPrefs';

describe('getPrefs', () => {
  test('loads prefs for premium users', () => {
    const user = {
      premium: true,
      preferences: {
        color: 'green',
      },
    };

    expect(getPrefs(user)).toEqual({ color: 'green' });
  });

  test('shows defaults for normal users', () => {
    const user = {
      premium: false,
      preferences: {
        color: 'green',
      },
    };

    expect(getPrefs(user)).toEqual({ color: 'red' });
  });
});
