import { Action, Context } from './types';

export const merge = (updateCtx: Context): Action => {
  return (values: Record<string, any>, ctx: Context) => {
    return {
      values: { ...ctx.values, ...updateCtx.values },
      tmpl: { ...ctx.tmpl, ...updateCtx.tmpl },
    } as Context;
  };
};
