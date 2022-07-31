import { code, CodeAdapter, CodeContext } from '@d0-it/code';
import { CoreD0s, Ctx, D0, StartD0 } from '@d0-it/core';
import { TSESTree, AST, TSESTreeOptions as _TSESTreeOptions } from '@typescript-eslint/typescript-estree';
import { FunctionState } from './walker/types';

export type TSESTreeOptions = { [K in keyof _TSESTreeOptions]: _TSESTreeOptions[K] };
export type TSCodeContext = CodeContext<AST<TSESTreeOptions>, TSESTree.Node> & {
  $indexes?: {
    functions?: { [K: string]: FunctionState<any> };
  };
};
export type TypescriptCtx<T = any> = Ctx<T>;
