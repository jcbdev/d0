import { D0 } from '@d0-it/core';
import { CodeContext, CodeD0, NodeD0, NodeState, ResolveNode } from './types';

export const d0With = <T extends any = any, TAst extends any = any, TNode extends any = any>(
  resolve: ResolveNode<T, TAst, TNode>,
  d0: NodeD0<T, TAst, TNode>
): CodeD0<T, TAst, TNode> => {
  return async ctx => {
    return await d0(
      await resolve({ node: ctx.$ast.ast as any, source: ctx.$ast.sourceCode } as NodeState<TNode>, ctx),
      ctx
    );
  };
};
