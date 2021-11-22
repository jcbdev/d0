import { Action, Context } from './types';

export const sequence = (actions: Action[]): Action => {
  return async (values: Record<string, any>, ctx: Context) => {
    for (let act of actions) {
      ctx = await act(ctx.values, ctx);
    }
    return ctx;
  };
};
