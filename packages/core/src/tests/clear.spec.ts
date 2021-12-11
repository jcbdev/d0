import { clear } from '../lib/d0s/clear';
import { clearProps } from './helpers/clear-props';

describe('clear values on context', () => {
  it('should clear value to primitive', async () => {
    let action = clear('clearVal');
    let result = await action({ clearVal: true } as any);
    result = clearProps(result, '$d0', '$item');
    expect(result).toEqual({});
  });
});
