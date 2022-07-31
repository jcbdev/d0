import { MergeD0, D0, Ctx } from '../types';

export const split = <TSplit extends any = any, T = any>(
  fork: MergeD0<Ctx<T>, Ctx<TSplit>>,
  d0: D0<TSplit>,
  merge: MergeD0<Ctx<TSplit>, Ctx<T>>
): D0<T> => {
  return async ctx => {
    let newCtx: Ctx<TSplit> = {} as any;
    newCtx = await fork(ctx, newCtx);
    newCtx = await d0(newCtx);
    ctx = await merge(newCtx, ctx);
    return ctx;
  };
};
