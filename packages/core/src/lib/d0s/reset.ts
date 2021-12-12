import { D0, Ctx } from '../types';

export const reset = <TFlex = void, TBase = void>(): D0<TFlex, TBase> => {
  return ctx => {
    return {} as Ctx<TFlex, TBase>;
  };
};
