import { D0, ResolveD0 } from '../types';

export const set = <TReturn, TFlex = void, TBase = void>(
  name: string,
  update: ResolveD0<TReturn, TFlex, TBase>
): D0<TFlex, TBase> => {
  return async ctx => {
    ctx[name] = await update(ctx);
    return ctx;
  };
};
