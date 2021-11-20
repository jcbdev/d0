import { Action, Context, Resolve } from './types';

export const d0 = (actions: Action[], resolve: Resolve): string => {
  let ctx: Context = {
    tmpl: {},
    values: {},
  };
  for (let act of actions) {
    ctx = act(ctx.values, ctx);
  }
  return resolve(ctx);
};
