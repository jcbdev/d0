import { D0, Or, registerD0s, registerDefaultD0s, ResolveD0 } from '@d0-it/core';
import { Options } from 'prettier';
import { pretty } from './lib/pretty';
import prettier from 'prettier';
import { prettyAST } from './lib/pretty-ast';

export * from './lib/pretty';
export * from './lib/pretty-ast';

export type PrettyD0s<D = any> = {
  pretty: <T = D>(name: string, resolve: ResolveD0<string, T>, options?: Options) => D0<T>;
  prettyAST<T = D>(name: string, resolve: ResolveD0<string, T>, options?: prettier.Options): D0<T>;
};

export const prettyD0s: <D = any>() => PrettyD0s<D> = <D = any>() => {
  return {
    pretty: <T = D>(name: string, resolve: ResolveD0<string, Or<T, D>>, options?: Options) =>
      pretty<Or<T, D>>(name, resolve, options),
    prettyAST: <T = D>(name: string, resolve: ResolveD0<string, Or<T, D>>, options?: prettier.Options) =>
      prettyAST<Or<T, D>>(name, resolve, options),
  } as PrettyD0s<D>;
};

registerD0s('pretty', prettyD0s);
registerDefaultD0s(prettyD0s);
