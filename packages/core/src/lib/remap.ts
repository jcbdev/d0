import { Action, Context } from './types';

export const remap = (update?: Function): Action => {
  return (ctx: Context) => {
    ctx = update(ctx);
    return ctx;
  };
};
