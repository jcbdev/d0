import { MergeAction } from '..';
import { Action, Context } from './types';

export const split = (fork: MergeAction, action: Action, merge: MergeAction): Action => {
  return async (ctx: Context) => {
    let newCtx = { $tmpl: {} };
    newCtx = await fork(ctx, newCtx);
    newCtx = await action(newCtx);
    ctx = await merge(ctx, newCtx);
    return ctx;
  };
};
