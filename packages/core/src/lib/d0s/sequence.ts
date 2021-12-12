import { D0 } from '../types';

export const sequence = <TFlex = void, TBase = void>(d0s: D0<TFlex, TBase>[]): D0<TFlex, TBase> => {
  return async ctx => {
    for (let act of d0s) {
      ctx = await act(ctx);
    }
    return ctx;
  };
};
