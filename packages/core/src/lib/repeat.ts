import { Action, Context } from './types';

export const repeat = (num: number, action: Action): Action => {
  return (values: Record<string, any>, ctx: Context) => {
    for (let i = 0; i < num; i++) {
      ctx = action(values, ctx);
    }
    return ctx;
  };
};
