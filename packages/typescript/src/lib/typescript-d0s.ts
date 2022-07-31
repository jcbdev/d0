import { CodeD0s, codeD0s } from '@d0-it/code';
import { CoreD0s, coreD0s } from '@d0-it/core';
import { AST, TSESTree } from '@typescript-eslint/typescript-estree';
import { TSESTreeOptions, TypescriptCtx } from './types';

export const typescriptD0s = <T = any>() => {
  return {
    ...coreD0s<T>(),
    ...codeD0s<T, AST<TSESTreeOptions>, TSESTree.Node>(),
  } as CodeD0s<T, AST<TSESTreeOptions>, TSESTree.Node> & CoreD0s<T>;
};
