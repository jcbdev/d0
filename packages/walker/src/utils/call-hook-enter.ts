import { Ctx } from '@d0/core';
import { FlexEnterLeaveVisitor, NodeInfo, RegexEnterNode, VisitIntention, Visitor } from '../lib/types';
import matchProp from './match-prop';

export default async <T = any, TCtx = Ctx>(
  nodeType: string,
  node: T,
  info: NodeInfo,
  ctx: TCtx,
  visitor: Visitor<T, TCtx>
): Promise<VisitIntention<T>> => {
  let intention: VisitIntention<T> = {
    node: node,
    intention: 'PROCESS',
  };
  if (!nodeType)
    return {
      node: node,
      intention: 'SKIP',
    };
  if (visitor.enter && matchProp(visitor.enter, nodeType))
    return (await visitor.enter[matchProp(visitor.enter, nodeType)](node, info, ctx)) as VisitIntention<T>;

  let regexRule = (
    (visitor.enter as FlexEnterLeaveVisitor<T, TCtx>)?.regex as RegexEnterNode<T, TCtx>[]
  )?.find(r => r.exp.test(nodeType));
  if (regexRule) return await regexRule.do(node, info, ctx);

  if (matchProp(visitor, nodeType) && visitor[matchProp(visitor, nodeType)]?.enter)
    return (await visitor[matchProp(visitor, nodeType)]?.enter(node, info, ctx)) as VisitIntention<T>;

  return intention;
};
