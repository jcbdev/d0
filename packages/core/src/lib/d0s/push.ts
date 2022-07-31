import { D0, ResolveD0 } from '../types';

export const push = <TReturn = any, T = any>(
  name: string,
  update: ResolveD0<TReturn[] | TReturn, T>
): D0<T> => {
  return async ctx => {
    if (!ctx[name]) {
      ctx[name] = [];
    }
    let toPush = await update(ctx);
    ctx[name].push(...(Array.isArray(toPush) ? toPush : [toPush]));
    return ctx;
  };
};
