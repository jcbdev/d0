import { D0 } from '../types';
import { __directExec } from './utils';

export const repeat = <T = any>(num: number, d0: D0<T> | D0<T>[]): D0<T> => {
  return async ctx => {
    for (let i = 0; i < num; i++) {
      ctx = await __directExec(ctx, d0, ['ctxStub']);
    }
    return ctx;
  };
};
