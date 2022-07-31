import { D0, Or, registerD0s, registerDefaultD0s, ResolveD0 } from '@d0-it/core';
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

export type GraphQLD0s<D = any> = {
  graphQLSummary: <T = D>(name: string, resolve: ResolveD0<ASTNode, T>) => D0<T>;
  graphQL: <T = D>(name: string, gql: string) => D0<T>;
  loadGraphQL: <T = D>(name: string, path: PathLike | FileHandle) => D0<T>;
};

export const graphQLD0s: <D = any>() => GraphQLD0s<D> = <D = any>() => {
  return {
    graphQLSummary: <T = D>(name: string, resolve: ResolveD0<ASTNode, Or<T, D>>) =>
      graphQLSummary<Or<T, D>>(name, resolve),
    graphQL: <T = D>(name: string, gql: string) => graphQL<Or<T, D>>(name, gql),
    loadGraphQL: <T = D>(name: string, path: PathLike | FileHandle) => loadGraphQL<Or<T, D>>(name, path),
  } as GraphQLD0s<D>;
};

registerD0s('graphql', graphQLD0s);
registerDefaultD0s(graphQLD0s);
