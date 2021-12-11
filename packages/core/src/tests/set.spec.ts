import { set } from '../lib/d0s/set';
import { ContextWith } from '../lib/types';

describe('set values on context', () => {
  it('should set value to primitive', async () => {
    let action = set('testValue', () => 'SETIT');
    let result = await action({} as any);
    expect(result).toEqual({
      testValue: 'SETIT',
    });
  });

  it('should set value to primitive using context value', async () => {
    let action = set<number, any, ContextWith<{ square: number }>>(
      'square',
      ({ square }: { square: number }) => square * square
    );
    let result = await action({ square: 5 } as any);
    expect(result).toEqual({
      square: 25,
    });
  });
});
