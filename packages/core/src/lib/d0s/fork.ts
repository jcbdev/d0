import { MergeD0, D0, Ctx, ResolveD0 } from '../types';
import cloneDeep from 'clone-deep';

export const fork = <TFork = any, T = any>(
  d0: D0<TFork>,
  map?: ResolveD0<TFork, T>,
  merge?: MergeD0<Ctx<TFork>, Ctx<T>>
): D0<T> => {
  return async ctx => {
    // let newCtx: Ctx<TFlex, TBase> = {} as any;
    let newCtx: Ctx<TFork> = map ? await map(ctx) : cloneDeep(ctx);
    newCtx = await d0(newCtx);
    ctx = merge
      ? await merge(newCtx, ctx)
      : {
          ...ctx,
          ...newCtx,
        };
    return ctx;
  };
};
