import prettier from 'prettier';
import { D0, ResolveD0 } from '@d0-it/core';

export function prettyAST<T = any>(
  name: string,
  resolve: ResolveD0<string, T>,
  options?: prettier.Options
): D0<T> {
  return async ctx => {
    ctx[name] = (prettier as any).__debug.formatAST(await resolve(ctx), {
      originalText: '',
      parser: 'babel',
      ...options,
    });
    return ctx;
  };
}
