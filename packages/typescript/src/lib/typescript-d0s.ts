import { CodeD0s, codeD0s } from '@d0/code';
import { CoreD0s, coreD0s } from '@d0/core';
import { AST, TSESTree } from '@typescript-eslint/typescript-estree';
import { TSESTreeOptions, TypescriptCtx } from './types';

export const typescriptD0s = <TFlex = void>() => {
  return {
    ...coreD0s<TFlex, TypescriptCtx<void>>(),
    ...codeD0s<TFlex, AST<TSESTreeOptions>, TSESTree.Node>(),
  } as CodeD0s<TFlex, AST<TSESTreeOptions>, TSESTree.Node> & CoreD0s<TFlex, TypescriptCtx<TFlex>>;
};
