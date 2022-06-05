import { CodeAdapter, CodeContext, Mutate, NodeState, CodeUpdate, SourceAst, getStatements } from '@d0/code';
import { prettyAST } from '@d0/prettier';
import {
  parse,
  TSESTree,
  AST,
  TSESTreeOptions,
  parseAndGenerateServices,
} from '@typescript-eslint/typescript-estree';
import jsonata from 'jsonata';
import prettier from 'prettier';
import { moduleConstArrowFunction, moduleFunctionDeclarations } from './adapters/find-function';
import { queryNodesToNodeState } from './adapters/node-state';

export const typescriptAdapter: CodeAdapter<AST<TSESTreeOptions>, TSESTree.Node> = {
  parse: function (sourceCode: string, options: any): SourceAst<AST<TSESTreeOptions>> {
    // return parse(sourceCode, options) as any;
    return {
      ast: parse(sourceCode, {
        loc: true,
        range: true,
        comment: true,
        ...options,
      }),
      sourceCode: sourceCode,
    } as SourceAst<AST<TSESTreeOptions>>;
  },

  queries: {
    program: function (ast: SourceAst<AST<TSESTreeOptions>>): NodeState<TSESTree.Node> {
      return {
        node: ast.ast,
        source: ast.sourceCode,
        range: null,
      };
    },
    getStatements: function (
      parent: TSESTree.Node,
      ast: SourceAst<AST<TSESTreeOptions>>,
      filter?: string
    ): NodeState<TSESTree.Node>[] {
      let exp = jsonata(!filter ? 'body' : `body[${filter}]`);
      return queryNodesToNodeState<TSESTree.Node>(exp.evaluate(parent), ast);
    },
    getFunctions: function (
      parent: TSESTree.Node,
      ast: SourceAst<AST<TSESTreeOptions>>,
      filter?: string
    ): NodeState<TSESTree.FunctionLike>[] {
      // console.log(JSON.stringify(parent, null, 2));
      // return moduleConstArrowFunction(ast);
      return moduleFunctionDeclarations(ast);
      // let exp = jsonata(
      //   !filter
      //     ? "body.**.[type='FunctionDeclaration' or type='ArrowFunctionExpression' or type='FunctionExpression' or type='TSDeclareFunction' or type='TSEmptyBodyFunctionExpression']"
      //     : `body[type='FunctionDeclaration' and ${filter}]`
      // );
      // return queryNodesToNodeState<TSESTree.FunctionLike>(exp.evaluate(parent), ast);
    },
  },
  transforms: {
    functions: {
      prependToBody: (
        state: NodeState<TSESTree.FunctionLike>,
        mutate: Mutate<AST<TSESTreeOptions>, TSESTree.FunctionLike, string>,
        ast: SourceAst<AST<TSESTreeOptions>>
      ): CodeUpdate => {
        return null;
      },
    },
    statements: {},
  },
};
