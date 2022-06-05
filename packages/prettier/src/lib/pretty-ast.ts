import prettier from 'prettier';
import { D0, ResolveD0 } from '@d0/core';

export function prettyAST<TFlex = void, TBase = void>(
  name: string,
  resolve: ResolveD0<string, TFlex, TBase>,
  options?: prettier.Options
): D0<TFlex, TBase> {
  return async ctx => {
    ctx[name] = (prettier as any).__debug.formatAST(await resolve(ctx), {
      originalText: '',
      parser: 'babel',
      ...options,
    });
    return ctx;
  };
}
