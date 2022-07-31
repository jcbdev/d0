import { D0 } from '../types';

export const sequence = <T = any>(d0s: D0<T>[]): D0<T> => {
  return async ctx => {
    for (let act of d0s) {
      ctx = await act(ctx);
    }
    return ctx;
  };
};
