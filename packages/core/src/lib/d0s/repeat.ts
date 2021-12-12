import { D0 } from '../types';

export const repeat = <TFlex = void, TBase = void>(num: number, d0: D0<TFlex, TBase>): D0<TFlex, TBase> => {
  return async ctx => {
    for (let i = 0; i < num; i++) {
      ctx = await d0(ctx);
    }
    return ctx;
  };
};
