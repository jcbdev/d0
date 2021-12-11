import { reset } from '../lib/d0s/reset';

describe('reset context', () => {
  it('should clear all values', async () => {
    let action = reset();
    let result = await action({ clearVal: true } as any);
    expect(result).toEqual({});
  });
});
