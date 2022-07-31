import { MergeD0, D0, Ctx, ResolveD0, D0Fork } from '../types';
import cloneDeep from 'clone-deep';
import { d0s, defaultD0s } from '../registry';
import { __shuffleTemps, __ctx, __d0s, __exec, __merge, __shuffleBlockTemps } from './utils';

export const fork = <TFork = any, T = any, TD0 = any>(
  d0: D0Fork<TFork> | D0Fork<TFork>[],
  options?: {
    map?: ResolveD0<TFork, T> | boolean;
    merge?: MergeD0<Ctx<TFork>, Ctx<T>> | boolean;
    $d0?: () => TD0 | string;
  }
): D0<T> => {
  return async ctx => {
    const defaultOptions = { map: true, merge: true };
    options = options ? { ...defaultOptions, ...options } : defaultOptions;
    let $d0s = __d0s<TD0>(options?.$d0);
    let newCtx = await __ctx<TFork, T>(ctx, options?.map);
    newCtx = await __exec(newCtx, d0, ['ctxStub', $d0s]);
    ctx = (await __merge(newCtx, ctx, options?.merge)) as Ctx<T>;
    ctx = __shuffleTemps(ctx);
    // ctx = __shuffleBlockTemps(ctx);
    return ctx;
  };
};
