import { Action, Context } from './types';

export const repeat = (num: number, action: Action): Action => {
  return async (values: Record<string, any>, ctx: Context) => {
    for (let i = 0; i < num; i++) {
      ctx = await action(values, ctx);
    }
    return ctx;
  };
};
