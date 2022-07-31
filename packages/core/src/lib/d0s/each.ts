import { D0, ItemD0, ResolveD0 } from '../types';

export const each = <TItem = any, T = any>(resolve: ResolveD0<TItem[], T>, d0: ItemD0<TItem, T>): D0<T> => {
  return async ctx => {
    let items = await resolve(ctx);
    for (let item of items) {
      ctx = await d0(item, ctx);
    }
    return ctx;
  };
};
