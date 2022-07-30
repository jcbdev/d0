import { ConditionD0, Ctx, D0, ItemD0, MergeD0, Or, ResolveD0 } from '@d0-it/core';
import { PathLike } from 'fs';
import { FileHandle } from 'fs/promises';
import { ASTNode } from 'graphql';
import { graphQL } from './lib/graphql';
import { graphQLSummary } from './lib/graphql-summary';
import { loadGraphQL } from './lib/load-graphql';

export * from './lib/graphql';
export * from './lib/load-graphql';
export * from './lib/graphql-summary';
export * from './lib/graphql-selector';
export * from './lib/types';

export type GraphQLD0s<DFlex = void, DBase = void> = {
  graphQLSummary: <TFlex = DFlex, TBase = DBase>(
    name: string,
    resolve: ResolveD0<ASTNode, TFlex, TBase>
  ) => D0<TFlex, TBase>;
  graphQL: <TFlex = DFlex, TBase = DBase>(name: string, gql: string) => D0<TFlex, TBase>;
  loadGraphQL: <TFlex = DFlex, TBase = DBase>(name: string, path: PathLike | FileHandle) => D0<TFlex, TBase>;
};

export const graphQLD0s: <DFlex = void, DBase = void>() => GraphQLD0s<DFlex, DBase> = <
  DFlex = void,
  DBase = void
>() => {
  return {
    graphQLSummary: <TFlex = DFlex, TBase = DBase>(
      name: string,
      resolve: ResolveD0<ASTNode, Or<TFlex, DFlex>, Or<TBase, DBase>>
    ) => graphQLSummary<Or<TFlex, DFlex>, Or<TBase, DBase>>(name, resolve),
    graphQL: <TFlex = DFlex, TBase = DBase>(name: string, gql: string) =>
      graphQL<Or<TFlex, DFlex>, Or<TBase, DBase>>(name, gql),
    loadGraphQL: <TFlex = DFlex, TBase = DBase>(name: string, path: PathLike | FileHandle) =>
      loadGraphQL<Or<TFlex, DFlex>, Or<TBase, DBase>>(name, path),
  } as GraphQLD0s<DFlex, DBase>;
};
