import { MergeD0, D0, Ctx, ResolveD0 } from '../types';
import cloneDeep from 'clone-deep';

export const fork = <TFork extends any = any, TFlex = void, TBase = void>(
  d0: D0<TFork, void>,
  map?: ResolveD0<TFork, TFlex, TBase>,
  merge?: MergeD0<Ctx<TFork, void>, Ctx<TFlex, TBase>>
): D0<TFlex, TBase> => {
  return async ctx => {
    // let newCtx: Ctx<TFlex, TBase> = {} as any;
    let newCtx: Ctx<TFork, void> = map ? await map(ctx) : cloneDeep(ctx);
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
