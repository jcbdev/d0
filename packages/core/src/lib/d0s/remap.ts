import { D0 } from '../types';

export const remap = <TFlex = void, TBase = void>(update?: D0<TFlex, TBase>): D0<TFlex, TBase> => {
  return async ctx => {
    ctx = await update(ctx);
    return ctx;
  };
};
