import { repeat } from '../lib/d0s/repeat';
import { Action, Context } from '../lib/types';

describe('repeat an action unconditionally', () => {
  it('should run true action', async () => {
    let repeatAction: Action<Context> = ctx => {
      ctx['count']++;
      return ctx;
    };

    let result = await repeat(100, repeatAction)({ count: 0 } as any);
    expect(result).toEqual({
      count: 100,
    });
  });
});
