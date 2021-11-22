import { set } from '../lib/set';

describe('set values on context', () => {
  it('should set value to primitive', async () => {
    let action = set('testValue', () => 'SETIT');
    let result = await action({}, { tmpl: {}, values: {} });
    expect(result).toEqual({
      tmpl: {},
      values: { testValue: 'SETIT' },
    });
  });

  it('should set value to primitive using context value', async () => {
    let action = set('square', ({ square }: { square: number }) => square * square);
    let result = await action({ square: 5 }, { tmpl: {}, values: { square: 5 } });
    expect(result).toEqual({
      tmpl: {},
      values: { square: 25 },
    });
  });
});
