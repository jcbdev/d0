import { D0, ResolveD0 } from '../types';

export const set = <TReturn = any, T = any>(name: string, update: ResolveD0<TReturn, T>): D0<T> => {
  return async ctx => {
    ctx[name] = await update(ctx);
    return ctx;
  };
};
