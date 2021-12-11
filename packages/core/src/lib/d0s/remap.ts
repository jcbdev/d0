import { Action } from '../types';

export const remap = <TFlex = void, T = void, TD0 = void>(
  update?: Action<TFlex, T, TD0>
): Action<TFlex, T, TD0> => {
  return async ctx => {
    ctx = await update(ctx);
    return ctx;
  };
};
