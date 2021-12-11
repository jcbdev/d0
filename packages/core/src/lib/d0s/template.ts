import { Action, ResolveAction } from '../types';

export const template = <TFlex = void, T = void, TD0 = void>(
  name: string,
  template: ResolveAction<string, TFlex, T, TD0>
): Action<TFlex, T, TD0> => {
  return async ctx => {
    ctx[name] = await template(ctx);
    return ctx;
  };
};
