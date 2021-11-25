import { ContextAction, Action, Context } from './types';

export const set: ContextAction = (name: string, update: Function): Action => {
  return (ctx: Context) => {
    ctx[name] = update(ctx);
    return ctx;
  };
};
