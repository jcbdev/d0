import { NodeState, SourceAst } from '@d0-it/code';
import { AST, TSESTree } from '@typescript-eslint/typescript-estree';
import { TSESTreeOptions } from '../types';

export function queryNodesToNodeState<TReturn extends TSESTree.Node>(
  nodes: TSESTree.Node[],
  ast: SourceAst<AST<TSESTreeOptions>>
): NodeState<TReturn>[] {
  return (Array.isArray(nodes) ? nodes : [nodes]).map(n => nodeToNodeState(n, ast)) as NodeState<TReturn>[];
}

export function nodeToNodeState<TReturn extends TSESTree.Node>(
  node: TSESTree.Node,
  ast: SourceAst<AST<TSESTreeOptions>>
): NodeState<TReturn> {
  // console.log(node);
  return {
    node: node,
    source: ast.sourceCode.substring(node.range[0], node.range[1]),
    range: { start: node.range[0], end: node.range[1] },
  } as NodeState<TReturn>;
}
