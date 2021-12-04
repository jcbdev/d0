import { split } from '../lib/split';
import { Action } from '../lib/types';

describe('execute an action in isolated context', () => {
  it('should isolate and remerge context', async () => {
    let mockAction1: Action = ctx => {
      ctx['exists'] = ctx['original'] ?? false;
      return ctx;
    };

    let result = await split(
      (ctx, newCtx) => {
        return newCtx;
      },
      mockAction1,
      (ctx, newCtx) => {
        ctx['exists'] = newCtx['exists'];
        return ctx;
      }
    )({ $tmpl: {}, original: true });

    expect(result).toEqual({
      $tmpl: {},
      exists: false,
      original: true,
    });
  });
});
