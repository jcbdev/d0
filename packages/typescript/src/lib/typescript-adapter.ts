import {
  CodeAdapter,
  CodeContext,
  FunctionNodeAction,
  Mutate,
  NodeState,
  NodeUpdate,
  statements,
} from '@d0/code';
import { Context } from '@d0/core';
import { prettyAST } from '@d0/prettier';
import { parse, TSESTree, AST, TSESTreeOptions } from '@typescript-eslint/typescript-estree';
import jsonata from 'jsonata';
import prettier from 'prettier';

export const typescriptAdapter: CodeAdapter<AST<TSESTreeOptions>, TSESTree.Node> = {
  parse: function (sourceCode: string, options: any): AST<TSESTreeOptions> {
    return parse(sourceCode, options) as any;
  },
  resolve: function (codeCtx: CodeContext): string {
    return (prettier as any).__debug.formatAST(codeCtx.$ast, {
      originalText: '',
      parser: 'babel',
      ...{}, // TODO: Provide options
    }).formatted;
  },
  queries: {
    program: function (codeCtx: CodeContext): TSESTree.Node {
      return codeCtx.$ast;
    },
    statements: function (parent: TSESTree.Node, codeCtx: CodeContext, filter?: string): TSESTree.Node[] {
      let exp = jsonata(!filter ? 'body' : `body[${filter}]`);
      return exp.evaluate(parent);
    },
    functions: function (
      parent: TSESTree.Node,
      codeCtx: CodeContext,
      filter?: string
    ): TSESTree.FunctionLike[] {
      let exp = jsonata(
        !filter ? "body[type='FunctionDeclaration']" : `body[type='FunctionDeclaration' and ${filter}]`
      );
      return exp.evaluate(parent);
    },
  },
  transforms: {
    functions: {
      prependToBody: (
        node: TSESTree.FunctionLike,
        mutate: Mutate<AST<TSESTreeOptions>, TSESTree.FunctionLike, string>,
        ctx: CodeContext<AST<TSESTreeOptions>, TSESTree.FunctionLike>
      ): NodeUpdate<TSESTree.FunctionLike> => {
        
      },
    },
    statements: {},
  },
};
