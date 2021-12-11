import { split } from '../lib/d0s/split';
import { Action, Context } from '../lib/types';
import { clearProps } from './helpers/clear-props';

describe('execute an action in isolated context', () => {
  it('should isolate and remerge context', async () => {
    let mockAction1: Action<Context> = ctx => {
      ctx['exists'] = ctx['original'] ?? false;
      return ctx;
    };

    let result = await split(
      ctx => {
        return ctx;
      },
      mockAction1,
      ctx => {
        ctx['exists'] = ctx.$item['exists'];
        return ctx;
      }
    )({ original: true } as any);

    result = clearProps(result, '$d0', '$item');
    expect(result).toEqual({
      exists: false,
      original: true,
    });
  });
});
