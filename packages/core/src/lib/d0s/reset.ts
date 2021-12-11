import { Action, Ctx } from '../types';

export const reset = <TFlex = void, T = void, TD0 = void>(): Action<TFlex, T, TD0> => {
  return ctx => {
    return { $d0: ctx.$d0, $item: null } as Ctx<TFlex, T, TD0>;
  };
};
