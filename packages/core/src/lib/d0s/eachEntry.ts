import { Ctx, D0, EntryD0, ItemD0, MergeD0, ResolveD0 } from '../types';
import { __shuffleTemps, __ctx, __exec, __merge, __shuffleBlockTemps } from './utils';

export const eachEntry = <TItem = any, TFork = TItem, T = any>(
  select: ResolveD0<Record<string, TItem>, T>,
  d0: EntryD0<TItem, T> | EntryD0<TItem, T>[],
  options?: {
    map?: ResolveD0<TFork, T> | boolean;
    merge?: MergeD0<Ctx<TFork>, Ctx<T>> | boolean;
  }
): D0<T> => {
  return async ctx => {
    const defaultOptions = { map: true, merge: true };
    options = options ? { ...defaultOptions, ...options } : defaultOptions;
    let entries = await select(ctx);
    let newCtx = await __ctx<TFork, T>(ctx, options?.map);
    for (let [name, entry] of Object.entries(entries)) {
      newCtx = await __exec(newCtx, d0, [name, entry, 'ctxStub']);
      ctx = (await __merge(newCtx, ctx, options?.merge)) as Ctx<T>;
      ctx = __shuffleTemps(ctx);
    }
    // ctx = __shuffleBlockTemps(ctx);
    return ctx;
  };
};
