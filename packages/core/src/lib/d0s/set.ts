import { Action, ResolveAction } from '../types';

export const set = <TReturn, TFlex = void, T = void, TD0 = void>(
  name: string,
  update: ResolveAction<TReturn, TFlex, T, TD0>
): Action<TFlex, T, TD0> => {
  return async ctx => {
    ctx[name] = await update(ctx);
    return ctx;
  };
};
