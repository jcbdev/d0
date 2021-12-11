import { code, CodeAdapter, CodeContext, NodeAction } from '@d0/code';
import { Action, Context } from '@d0/core';
import { parse, TSESTree, AST, TSESTreeOptions } from '@typescript-eslint/typescript-estree';
import { typescriptAdapter } from './typescript-adapter';

export const typescriptCode = (
  name: string,
  sourceCode: string,
  action: NodeAction<AST<TSESTreeOptions>, TSESTree.Node>[],
  options: any
): Action => {
  return async (ctx: Context) => {
    ctx = await code(name, sourceCode, action, typescriptAdapter, options)(ctx);
    return ctx;
  };
};
