import { D0 } from '@d0-it/core';
import { CodeContext, NodeD0, NodeState, ResolveNode } from './types';

export const d0With = <TFlex, TAst, TNode>(
  resolve: ResolveNode<TFlex, TAst, TNode>,
  d0: NodeD0<TFlex, TAst, TNode>
): D0<TFlex, CodeContext<TAst, TNode>> => {
  return async ctx => {
    return await d0(
      await resolve({ node: ctx.$ast.ast as any, source: ctx.$ast.sourceCode } as NodeState<TNode>, ctx),
      ctx
    );
  };
};
