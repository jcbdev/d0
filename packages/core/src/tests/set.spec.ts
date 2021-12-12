import { set } from '../lib/d0s/set';

describe('set values on context', () => {
  it('should set value to primitive', async () => {
    let action = set('testValue', () => 'SETIT');
    let result = await action({} as any);
    expect(result).toEqual({
      testValue: 'SETIT',
    });
  });

  it('should set value to primitive using context value', async () => {
    let action = set('square', ({ square }: { square: number }) => square * square);
    let result = await action({ square: 5 });
    expect(result).toEqual({
      square: 25,
    });
  });
});
