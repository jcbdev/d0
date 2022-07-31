import { Ctx } from '@d0-it/core';
import { CodeContext, NodeState, ResolveNode } from './types';

export const getFunctions = <T = any, TAst = any, TNode = any>(
  filter?: string
): ResolveNode<T, TAst, TNode> => {
  return async (node: NodeState<TNode>, ctx: CodeContext<T, TAst, TNode>): Promise<NodeState<TNode>[]> => {
    let nodes = ctx.$adapter.queries.getFunctions(node.node, ctx.$ast, filter);
    return nodes;
  };
};
