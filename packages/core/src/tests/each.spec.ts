import { each } from '../lib/d0s/each';
import { D0, ItemD0, ResolveD0 } from '../lib/types';

describe('repeat an D0 for each item', () => {
  it('should repeat the D0 for every item in the list', async () => {
    let repeatD0: ItemD0<number, { results: number[]; items: number[] }> = (item, ctx) => {
      return ctx => {
        ctx.results.push(item as number);
        return ctx;
      };
    };

    let resolveD0: ResolveD0<number[], { results: number[]; items: number[] }> = ctx => {
      return ctx.items;
    };

    let result = await each<number, { results: number[]; items: number[] }>(
      resolveD0,
      repeatD0
    )({ results: [], items: [1, 2, 3, 4, 5] });
    expect(result).toEqual({
      items: [1, 2, 3, 4, 5],
      results: [1, 2, 3, 4, 5],
    });
  });
});
