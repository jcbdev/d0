import { Action, Condition, Context } from './types';

export const when = (condition: Condition, trueAction: Action, falseAction: Action): Action => {
  return async (ctx: Context) => {
    if (condition(ctx)) ctx = await trueAction(ctx);
    else ctx = await falseAction(ctx);
    return ctx;
  };
};
