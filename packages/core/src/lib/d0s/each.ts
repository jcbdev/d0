import { Action } from '../types';

export const each = <TFlex = void, T = void, TD0 = void>(
  action: Action<TFlex, T, TD0>
): Action<TFlex, T, TD0> => {
  return async ctx => {
    let $originalItem = ctx.$item;
    for (let item of $originalItem as T[]) {
      ctx = await action({ ...ctx, $item: item });
    }
    return { ...ctx, $item: $originalItem };
  };
};
