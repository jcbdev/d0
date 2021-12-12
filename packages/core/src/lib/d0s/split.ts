import { MergeD0, D0, Ctx } from '../types';

export const split = <TFlex = void, TBase = void>(
  fork: MergeD0<TFlex, TBase>,
  d0: D0<TFlex, TBase>,
  merge: MergeD0<TFlex, TBase>
): D0<TFlex, TBase> => {
  return async ctx => {
    let newCtx: Ctx<TFlex, TBase> = {} as any;
    newCtx = await fork(ctx, newCtx);
    newCtx = await d0(newCtx);
    ctx = await merge(newCtx, ctx);
    return ctx;
  };
};
