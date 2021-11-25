import { Action, Context } from './types';

export const merge = (updateCtx: Context): Action => {
  return (ctx: Context) => {
    return {
      ...ctx,
      ...updateCtx,
      $tmpl: { ...ctx.$tmpl, ...updateCtx.$tmpl },
    } as Context;
  };
};
