import { Ctx } from '@d0/core';
import { CodeContext, NodeD0, NodeState, ResolveNode } from './types';

export const getStatements = <TFlex, TAst, TNode>(filter?: string): ResolveNode<TFlex, TAst, TNode> => {
  return async (
    node: NodeState<TNode>,
    ctx: Ctx<TFlex, Ctx<TFlex, CodeContext<TAst, TNode>>>
  ): Promise<NodeState<TNode>[]> => {
    let nodes = ctx.$adapter.queries.getStatements(node.node, ctx.$ast, filter);
    return nodes;
  };
};
