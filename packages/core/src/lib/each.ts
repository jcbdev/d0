import { ItemAction } from '..';
import { Action, Context, Resolve } from './types';

export const each = (items: Resolve<any[]>, action: ItemAction): Action => {
  return async (ctx: Context) => {
    for (let item of await items(ctx)) {
      ctx = await action(item, ctx);
    }
    return ctx;
  };
};
