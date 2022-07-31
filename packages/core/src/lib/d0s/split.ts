import { MergeD0, D0, Ctx } from '../types';

export const split = <TSplit extends any = any, TFlex = void, TBase = void>(
  fork: MergeD0<Ctx<TFlex, TBase>, Ctx<TSplit, void>>,
  d0: D0<TSplit, void>,
  merge: MergeD0<Ctx<TSplit, void>, Ctx<TFlex, TBase>>
): D0<TFlex, TBase> => {
  return async ctx => {
    let newCtx: Ctx<TSplit, void> = {} as any;
    newCtx = await fork(ctx, newCtx);
    newCtx = await d0(newCtx);
    ctx = await merge(newCtx, ctx);
    return ctx;
  };
};
