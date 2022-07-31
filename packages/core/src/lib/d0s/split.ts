import { d0s, defaultD0s } from '../registry';
import { MergeD0, D0, Ctx, D0Fork } from '../types';
import { __shuffleTemps, __d0s, __exec, __shuffleBlockTemps } from './utils';

// Deprecated: use fork instead
export const split = <TSplit extends any = any, T = any, TD0 = any>(
  fork: MergeD0<Ctx<T>, Ctx<TSplit>>,
  d0: D0Fork<TSplit> | D0Fork<TSplit>[],
  merge: MergeD0<Ctx<TSplit>, Ctx<T>>,
  $d0?: () => TD0 | string
): D0<T> => {
  return async ctx => {
    let $d0s = __d0s<TD0>($d0);
    let newCtx: Ctx<TSplit> = {} as any;
    newCtx = await fork(ctx, newCtx);
    newCtx = await __exec(newCtx, d0, ['ctxStub', $d0s]);
    ctx = await merge(newCtx, ctx);
    ctx = __shuffleTemps(ctx);
    // ctx = __shuffleBlockTemps(ctx);
    return ctx;
  };
};
