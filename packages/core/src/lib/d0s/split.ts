import { MergeAction, Action, Ctx } from '../types';

export const split = <TFlex = void, T = void, TD0 = void>(
  fork: MergeAction<TFlex, Ctx<TFlex, T, TD0>>,
  action: Action<TFlex, T, TD0>,
  merge: MergeAction<TFlex, Ctx<TFlex, T, TD0>>
): Action<TFlex, T, TD0> => {
  return async ctx => {
    let newCtx: any = { $d0: ctx.$d0, $item: ctx };
    newCtx = await fork(newCtx);
    newCtx = await action(newCtx);
    ctx.$item = newCtx;
    ctx = await merge(ctx as any);
    return ctx;
  };
};
