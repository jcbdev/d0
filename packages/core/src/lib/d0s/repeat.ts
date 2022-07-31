import { D0 } from '../types';

export const repeat = <T = any>(num: number, d0: D0<T>): D0<T> => {
  return async ctx => {
    for (let i = 0; i < num; i++) {
      ctx = await d0(ctx);
    }
    return ctx;
  };
};
