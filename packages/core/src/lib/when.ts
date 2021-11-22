import { Action, Condition, Context } from './types';

export const when = (condition: Condition, trueAction: Action, falseAction: Action): Action => {
  return async (values: Record<string, any>, ctx: Context) => {
    if (condition(values, ctx)) ctx = await trueAction(values, ctx);
    else ctx = await falseAction(values, ctx);
    return ctx;
  };
};
