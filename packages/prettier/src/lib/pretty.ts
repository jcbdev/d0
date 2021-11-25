import { format, Options } from 'prettier';
import { Action, Resolve, Context } from '@d0/core';

export function pretty(name: string, resolve: Resolve<string>, options?: Options): Action {
  return async (ctx: Context) => {
    ctx[name] = format(await resolve(ctx), options);
    return ctx;
  };
}
