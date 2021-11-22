import { repeat } from '../lib/repeat';
import { Action } from '../lib/types';

describe('repeat an action unconditionally', () => {
  it('should run true action', async () => {
    let repeatAction: Action = (values, ctx) => {
      ctx.values['count']++;
      return ctx;
    };

    let result = await repeat(100, repeatAction)({ count: 0 }, { tmpl: {}, values: { count: 0 } });
    expect(result).toEqual({
      tmpl: {},
      values: { count: 100 },
    });
  });
});
