import { Left, Right, fromNullable, tryCatch } from './Either';

describe('Left', () => {
  describe('functor', () => {
    test('identity', () => {
      const a = 2;
      expect(Left(a).map(x => x).x).toBe(a);
    });

    test('composition', () => {
      const a = 2;
      const f = x => x * x;
      const g = x => x + 1;

      expect(Left(a).map(g).map(f).x).toBe(2);

      expect(
        Left(a).map(x => f(g(x))).x,
      ).toBe(
        Left(a).map(g).map(f).x,
      );
    });
  });

  describe('chain', () => {
    test('associativity', () => {
      const x = 2;
      const f = n => n * n;
      const g = n => n + 1;

      expect(Left(x).chain(f).chain(g).x).toEqual(x);
      expect(
        Left(x).chain(f).chain(g).x,
      ).toEqual(
        Left(x).chain(a => f(a).chain(g)).x,
      );
    },
  );
  });

  test('folds correctly', () => {
    expect(
      Left(2)
      .map(x => x + 1)
      .fold(x => 'error', x => x),
    ).toBe('error');
  });
});

describe('Right', () => {
  describe('functor', () => {
    test('identity', () => {
      const a = 2;
      expect(Right(a).map(x => x).x).toBe(2);
    });

    test('composition', () => {
      const a = 2;
      const f = x => x * x;
      const g = x => x + 1;

      expect(Right(a).map(g).map(f).x).toBe(9);

      expect(
        Right(a).map(x => f(g(x))).x,
      ).toBe(
        Right(a).map(g).map(f).x,
      );
    });
  });

  describe('chain', () => {
    test('associativity', () => {
      const x = 2;
      const f = n => n * n;
      const g = n => n + 1;

      expect(
        Right(x).chain(f).chain(g)
      ).toEqual(5);

      expect(
        Right(x).chain(f).chain(g),
      ).toEqual(
        Right(x).chain(a => f(a).chain(g)),
      );
    });
  });

  test('folds correctly', () => {
    expect(
      Right(2)
      .map(x => x + 1)
      .fold(x => 'error', x => x),
    ).toBe(3);
  });
});
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

describe('findColor', () => {
  test('handles errors', () => {
    expect(
      findColor('green')
      .map(c => c.slice(1))
      .fold(e => 'no color',
      s => s.toUpperCase()),
    ).toBe('no color');
  });

  test('handles non-errors', () => {
    expect(
      findColor('red')
      .map(c => c.slice(1))
      .fold(e => 'no color',
      s => s.toUpperCase()),
    ).toBe('FF4444');
  });
});

const fs = require('fs');

const getPort = _ =>
  tryCatch(() => fs.readFileSync('config.json'))
  .chain(c => tryCatch(() => JSON.parse(c)))
  .fold(e => 3000,
        c => c.port);

jest.mock('fs');

describe('getPort', () => {
  test('works with no JSON file', () => {
    expect(getPort()).toBe(3000);
  });

  test('works with a malformed JSON file', () => {
    require('fs').__setMockFiles({
      'config.json': 'asd',
    });

    expect(getPort()).toBe(3000);
  });

  test('works with a correct JSON file', () => {
    require('fs').__setMockFiles({
      'config.json': JSON.stringify({ port: 4000 }),
    });

    expect(getPort()).toBe(4000);
  });
});

// Imperative refactors
const renderPage = user =>
  `<h1>${user.name}</h1>`;

const showLogin = _ =>
  '<h1>Please Login!</h1>';

// const openSite = (currentUser) => {
//   if (currentUser) {
//     return renderPage(currentUser);
//   }
//   return showLogin();
// };

const openSite = currentUser =>
  fromNullable(currentUser)
  .fold(showLogin, renderPage);

describe('openSite', () => {
  test('renders the user profile page', () => {
    const user = { name: 'Bob' };

    expect(openSite(user)).toBe('<h1>Bob</h1>');
  });

  test('renders the login page', () => {
    expect(openSite()).toBe('<h1>Please Login!</h1>');
  });
});

const loadPrefs = prefs => prefs;
const defaultPrefs = { color: 'red' };
// const getPrefs = (user) => {
//   if (user.premium) {
//     return loadPrefs(user.preferences);
//   }
//   return defaultPrefs;
// };

const getPrefs = user =>
  (user.premium ? Right(user) : Left('not premium'))
  .map(u => u.preferences)
  .fold(() => defaultPrefs, prefs => loadPrefs(prefs));

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

// const streetName = (user) => {
//   const address = user.address;
//
//   if (address) {
//     const street = address.street;
//
//     if (street) {
//       return street.name;
//     }
//   }
//
//   return 'no street';
// };

const streetName = user =>
  fromNullable(user.address)
  .chain(a => fromNullable(a.street))
  .map(s => s.name)
  .fold(e => 'no street', n => n);

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

// const concatUniq = (x, ys) => {
//   const found = ys.filter(y => y === x)[0];
//   return found ? ys : ys.concat(x);
// };

const concatUniq = (x, ys) =>
  fromNullable(ys.filter(y => y === x)[0])
  .fold(_ => ys.concat(x), _ => ys);

describe('concatUniq', () => {
  test('when not unique', () => {
    expect(concatUniq(1, [1, 2, 3])).toEqual([1, 2, 3]);
  });

  test('when unique', () => {
    expect(concatUniq(1, [2, 3, 4])).toEqual([2, 3, 4, 1]);
  });
});


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

const wrapExample = example =>
  fromNullable(example.previewPath)
  .chain(readFile)
  .fold(() => example,
        p => Object.assign(example, { preview: p }));

describe('wrapExamples', () => {
  test('with no previewPath', () => {
    const ex = { name: 'foo' };

    expect(wrapExample(ex)).toEqual({ name: 'foo' });
  });

  test('with an invalid previewPath', () => {
    const ex = { name: 'foo', previewPath: 'foo.json' };

    expect(wrapExample(ex)).toEqual(
      { name: 'foo', previewPath: 'foo.json', preview: '' },
    );
  });

  test('with a real previewPath', () => {
    require('fs').__setMockFiles({
      'foo.json': 'asd',
    });

    const ex = { name: 'foo', previewPath: 'foo.json' };

    expect(wrapExample(ex)).toEqual(
      { name: 'foo', previewPath: 'foo.json', preview: 'asd' },
    );
  });
});
