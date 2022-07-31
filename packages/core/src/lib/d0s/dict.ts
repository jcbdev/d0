import { D0, ResolveD0 } from '../types';

export const dict = <TReturn = any, T = any>(
  name: string,
  key: string,
  update: ResolveD0<TReturn, T>
): D0<T> => {
  return async ctx => {
    if (!ctx[name]) {
      ctx[name] = {};
    }
    ctx[name][key] = await update(ctx);
    return ctx;
  };
};
