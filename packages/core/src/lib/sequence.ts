import { Action, Context } from './types';

export const sequence = (actions: Action[]): Action => {
  return async (ctx: Context) => {
    for (let act of actions) {
      ctx = await act(ctx);
    }
    return ctx;
  };
};
