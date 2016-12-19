import wrapExample from './wrapExample';

jest.mock('fs');

describe('wrapExample', () => {
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
