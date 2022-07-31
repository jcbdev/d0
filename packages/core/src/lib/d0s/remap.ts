import { D0 } from '../types';

export const remap = <T = any>(update?: D0<T>): D0<T> => {
  return async ctx => {
    ctx = await update(ctx);
    return ctx;
  };
};
