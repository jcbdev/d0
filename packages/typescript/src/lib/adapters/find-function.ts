import { NodeState, CodeUpdate, SourceAst } from '@d0/code';
import { AST, TSESTree } from '@typescript-eslint/typescript-estree';
import jsonata from 'jsonata';
import { TSESTreeOptions } from '../types';
import { queryNodesToNodeState } from './node-state';
import prettier from 'prettier';

// Find module level functions
export const findFunctions = (ast: SourceAst<AST<TSESTreeOptions>>) => {
  return [...moduleFunctionDeclarations(ast), ...moduleFunctionDeclarations(ast)];
};
export const moduleFunctionDeclarations = (ast: SourceAst<AST<TSESTreeOptions>>) => {
  let exp = jsonata("body[type='FunctionDeclaration']");
  return queryNodesToNodeState<TSESTree.FunctionLike>(exp.evaluate(ast.ast), ast);
};

export const moduleConstArrowFunction = (ast: SourceAst<AST<TSESTreeOptions>>) => {
  let exp = jsonata(
    "body[type='VariableDeclaration' and declarations[init[type='ArrowFunctionExpression']]]"
  );
  return queryNodesToNodeState<TSESTree.FunctionLike>(exp.evaluate(ast.ast), ast);
};

// Helpers
export const renameFunction = ($function: NodeState<TSESTree.FunctionLike>, name: string) => {
  return;
};

export const rename__moduleFunctionDeclarations = (
  $function: NodeState<TSESTree.FunctionLike>,
  name: string
): CodeUpdate => {
  $function.node.id.name = name;
  return {
    operation: 'replace',
    range: $function.range,
    update: (prettier as any).__debug.formatAST($function.node, {
      originalText: '',
      parser: 'babel',
    }),
  };
};
