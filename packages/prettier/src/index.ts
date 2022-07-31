import { D0, Or, registerD0s, registerDefaultD0s, ResolveD0 } from '@d0-it/core';
import { Options } from 'prettier';
import { pretty } from './lib/pretty';
import prettier from 'prettier';
import { prettyAST } from './lib/pretty-ast';

export * from './lib/pretty';
export * from './lib/pretty-ast';

export type PrettyD0s<DFlex = void, DBase = void> = {
  pretty: <TFlex = DFlex, TBase = DBase>(
    name: string,
    resolve: ResolveD0<string, TFlex, TBase>,
    options?: Options
  ) => D0<TFlex, TBase>;
  prettyAST<TFlex = DFlex, TBase = DBase>(
    name: string,
    resolve: ResolveD0<string, TFlex, TBase>,
    options?: prettier.Options
  ): D0<TFlex, TBase>;
};

export const prettyD0s: <DFlex = void, DBase = void>() => PrettyD0s<DFlex, DBase> = <
  DFlex = void,
  DBase = void
>() => {
  return {
    pretty: <TFlex = DFlex, TBase = DBase>(
      name: string,
      resolve: ResolveD0<string, Or<TFlex, DFlex>, Or<TBase, DBase>>,
      options?: Options
    ) => pretty<Or<TFlex, DFlex>, Or<TBase, DBase>>(name, resolve, options),
    prettyAST: <TFlex = DFlex, TBase = DBase>(
      name: string,
      resolve: ResolveD0<string, Or<TFlex, DFlex>, Or<TBase, DBase>>,
      options?: prettier.Options
    ) => prettyAST<Or<TFlex, DFlex>, Or<TBase, DBase>>(name, resolve, options),
  } as PrettyD0s<DFlex, DBase>;
};

registerD0s('pretty', prettyD0s);
registerDefaultD0s(prettyD0s);
