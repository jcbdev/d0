import { ContextAction, Action, Context } from './types';

export const set: ContextAction = (name: string, update: Function): Action => {
  return (values: Record<string, any>, ctx: Context) => {
    ctx.values[name] = update(values, ctx);
    return ctx;
  };
};
