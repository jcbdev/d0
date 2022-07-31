import { format, Options, Config } from 'prettier';
import { D0, ResolveD0 } from '@d0-it/core';

export function pretty<T = any>(name: string, resolve: ResolveD0<string, T>, options?: Options): D0<T> {
  return async ctx => {
    ctx[name] = format(await resolve(ctx), options);
    return ctx;
  };
}
