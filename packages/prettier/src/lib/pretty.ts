import { format, Options } from 'prettier';
import { D0, ResolveD0 } from '@d0-it/core';

export function pretty<TFlex = void, TBase = void>(
  name: string,
  resolve: ResolveD0<string, TFlex, TBase>,
  options?: Options
): D0<TFlex, TBase> {
  return async ctx => {
    ctx[name] = format(await resolve(ctx), options);
    return ctx;
  };
}
