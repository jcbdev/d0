import { each } from '../lib/d0s/each';
import { Action, Context } from '../lib/types';
import { clearProps } from './helpers/clear-props';

describe('repeat an action for each item', () => {
  it('should repeat the action for every item in the list', async () => {
    let repeatAction: Action<any, Context> = ctx => {
      ctx['results'].push(ctx.$item);
      return ctx;
    };

    let result = await each(repeatAction)({ $item: [1, 2, 3, 4, 5], results: [] } as any);
    result = clearProps(result, '$d0');
    expect(result).toEqual({
      $item: [1, 2, 3, 4, 5],
      results: [1, 2, 3, 4, 5],
    });
  });
});
