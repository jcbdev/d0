import { clear } from '../lib/d0s/clear';

describe('clear values on context', () => {
  it('should clear value to primitive', async () => {
    let action = clear('clearVal');
    let result = await action({ clearVal: true } as any);
    expect(result).toEqual({});
  });
});
