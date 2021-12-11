import { Action, Context, Transforms, WithD0 } from './types';
import * as d0s from './d0s';
import { ScopeAction } from '..';

export const d0 = async <
  TCtx extends Context = Context,
  TD0 extends Transforms<TCtx> = d0s.CoreTransforms<TCtx>
>(
  action: ScopeAction<any, TCtx, TD0>,
  withCtx?: WithD0<any, TD0, TCtx>,
  withD0s?: <TCtx>() => TD0
): Promise<TCtx> => {
  let ctx = withCtx ?? {
    $d0: withD0s ? withD0s<TCtx>() : d0s.coreTransforms<TCtx>(),
    $item: null,
  };
  return await action(ctx as any);
};
