import { Action, Condition, Context } from './types';

export const when = (condition: Condition, trueAction: Action, falseAction: Action): Action => {
  return (values: Record<string, any>, ctx: Context) => {
    if (condition(values, ctx)) trueAction(values, ctx);
    else falseAction(values, ctx);
    return ctx;
  };
};
