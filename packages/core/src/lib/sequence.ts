import { Action, Context } from './types';

export const sequence = (actions: Action[]): Action => {
  return (values: Record<string, any>, ctx: Context) => {
    for (let act of actions) {
      ctx = act(ctx.values, ctx);
    }
    return ctx;
  };
};
