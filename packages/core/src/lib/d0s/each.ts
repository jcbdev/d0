import { D0, ItemD0, ResolveD0 } from '../types';

export const each = <T, TFlex = void, TBase = void>(
  resolve: ResolveD0<T[], TFlex, TBase>,
  d0: ItemD0<T, TFlex, TBase>
): D0<TFlex, TBase> => {
  return async ctx => {
    let items = await resolve(ctx);
    for (let item of items) {
      ctx = await d0(item, ctx);
    }
    return ctx;
  };
};
