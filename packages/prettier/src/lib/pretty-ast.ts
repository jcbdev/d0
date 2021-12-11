import prettier from 'prettier';
import { Action, Resolve, Context } from '@d0/core';

export function prettyAST(name: string, resolve: Resolve<string>, options?: prettier.Options): Action {
  return async (ctx: Context) => {
    ctx[name] = (prettier as any).__debug.formatAST(await resolve(ctx), {
      originalText: '',
      parser: 'babel',
      ...options,
    });
    return ctx;
  };
}
