import { Ctx } from '@d0/core';
import { CodeContext, NodeState, ResolveNode } from './types';

export const getFunctions = <TFlex, TAst, TNode>(filter?: string): ResolveNode<TFlex, TAst, TNode> => {
  return async (
    node: NodeState<TNode>,
    ctx: Ctx<TFlex, CodeContext<TAst, TNode>>
  ): Promise<NodeState<TNode>[]> => {
    let nodes = ctx.$adapter.queries.getFunctions(node.node, ctx.$ast, filter);
    return nodes;
  };
};
