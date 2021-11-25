import { repeat } from '../lib/repeat';
import { Action } from '../lib/types';

describe('repeat an action unconditionally', () => {
  it('should run true action', async () => {
    let repeatAction: Action = ctx => {
      ctx['count']++;
      return ctx;
    };

    let result = await repeat(100, repeatAction)({ $tmpl: {}, count: 0 });
    expect(result).toEqual({
      $tmpl: {},
      count: 100,
    });
  });
});
