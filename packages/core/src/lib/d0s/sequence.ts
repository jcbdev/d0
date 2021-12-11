import { Action } from '../types';

export const sequence = <TFlex = void, T = void, TD0 = void>(
  actions: Action<TFlex, T, TD0>[]
): Action<TFlex, T, TD0> => {
  return async ctx => {
    for (let act of actions) {
      ctx = await act(ctx);
    }
    return ctx;
  };
};
