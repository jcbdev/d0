import { format, Options } from 'prettier';
import { Action, Resolve, Context } from '@d0/core';

export function pretty(name: string, resolve: Resolve<string>, options?: Options): Action {
  return async (values: Record<string, any>, ctx: Context) => {
    ctx.values[name] = format(await resolve(ctx), options);
    return ctx;
  };
}
