import { each } from '../lib/each';
import { Action, ItemAction } from '../lib/types';

describe('repeat an action for each item', () => {
  it('should repeat the action for every item in the list', async () => {
    let repeatAction: ItemAction = (item, ctx) => {
      ctx['results'].push(item);
      return ctx;
    };

    let result = await each(
      ctx => ctx.original,
      repeatAction
    )({ $tmpl: {}, results: [], original: [1, 2, 3, 4, 5] });
    expect(result).toEqual({
      $tmpl: {},
      original: [1, 2, 3, 4, 5],
      results: [1, 2, 3, 4, 5],
    });
  });
});
