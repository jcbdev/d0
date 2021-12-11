import { Action } from '../types';

export const repeat = <TFlex = void, T = void, TD0 = void>(
  num: number,
  action: Action<TFlex, T, TD0>
): Action<TFlex, T, TD0> => {
  return async ctx => {
    for (let i = 0; i < num; i++) {
      ctx = await action(ctx);
    }
    return ctx;
  };
};
