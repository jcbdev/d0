import { set } from '../lib/set';

describe('set values on context', () => {
  it('should set value to primitive', async () => {
    let action = set('testValue', () => 'SETIT');
    let result = await action({ $tmpl: {} });
    expect(result).toEqual({
      $tmpl: {},
      testValue: 'SETIT',
    });
  });

  it('should set value to primitive using context value', async () => {
    let action = set('square', ({ square }: { square: number }) => square * square);
    let result = await action({ $tmpl: {}, square: 5 });
    expect(result).toEqual({
      $tmpl: {},
      square: 25,
    });
  });
});
