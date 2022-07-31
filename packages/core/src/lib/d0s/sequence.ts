import { D0 } from '../types';
import { __shuffleTemps, __shuffleBlockTemps } from './utils';

export const sequence = <T = any>(d0s: D0<T>[]): D0<T> => {
  return async ctx => {
    for (let act of d0s) {
      ctx = await act(ctx);
    }
    ctx = __shuffleTemps(ctx);
    // ctx = __shuffleBlockTemps(ctx);
    return ctx;
  };
};
