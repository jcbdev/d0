import { repeat } from '../lib/d0s/repeat';
import { D0 } from '../lib/types';

describe('repeat an D0 unconditionally', () => {
  it('should run true D0', async () => {
    let repeatD0: D0<{ count: number }> = ctx => {
      ctx['count']++;
      return ctx;
    };

    let result = await repeat(100, repeatD0)({ count: 0 });
    expect(result).toEqual({
      count: 100,
    });
  });
});
