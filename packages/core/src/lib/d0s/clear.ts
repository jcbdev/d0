import { Action } from '../types';

export const clear = <TFlex = void, T = void, TD0 = void>(name: string): Action<TFlex, T, TD0> => {
  return ctx => {
    delete ctx[name];
    return ctx;
  };
};
