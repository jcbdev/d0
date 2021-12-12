import { D0, ResolveD0 } from '../types';

export const template = <TFlex = void, TBase = void>(
  name: string,
  template: ResolveD0<string, TFlex, TBase>
): D0<TFlex, TBase> => {
  return async ctx => {
    ctx[name] = await template(ctx);
    return ctx;
  };
};
