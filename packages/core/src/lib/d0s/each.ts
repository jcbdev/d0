import { d0s, defaultD0s } from '../registry';
import { Ctx, D0, ItemD0, MergeD0, ResolveD0 } from '../types';
import { __shuffleTemps, __ctx, __d0s, __exec, __merge, __shuffleBlockTemps } from './utils';
import cloneDeep from 'clone-deep';

export const each = <TItem = any, TFork = TItem, T = any>(
  select: ResolveD0<TItem[], T>,
  d0: ItemD0<TItem, TFork> | ItemD0<TItem, TFork>[],
  options?: {
    map?: ResolveD0<TFork, T> | boolean;
    merge?: MergeD0<Ctx<TFork>, Ctx<T>> | boolean;
  }
): D0<T> => {
  return async ctx => {
    const defaultOptions = { map: true, merge: true };
    options = options ? { ...defaultOptions, ...options } : defaultOptions;
    const items = await select(ctx);
    let newCtx = await __ctx<TFork, T>(ctx, options?.map);
    for (let item of items) {
      newCtx = await __exec(newCtx, d0, [item, 'ctxStub']);
      ctx = (await __merge(newCtx, ctx, options?.merge)) as Ctx<T>;
      ctx = __shuffleTemps(ctx);
    }
    // ctx = __shuffleBlockTemps(ctx);
    return ctx;
  };
};
