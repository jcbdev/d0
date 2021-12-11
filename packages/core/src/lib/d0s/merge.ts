import { Action, Ctx } from '../types';

export const merge = <TFlex = void, T = void, TD0 = void>(
  updateCtx: Ctx<TFlex, T, TD0>
): Action<TFlex, T, TD0> => {
  return ctx => {
    return {
      ...ctx,
      ...updateCtx,
    };
  };
};
