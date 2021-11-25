import { Action, Context } from './types';

export const repeat = (num: number, action: Action): Action => {
  return async (ctx: Context) => {
    for (let i = 0; i < num; i++) {
      ctx = await action(ctx);
    }
    return ctx;
  };
};
