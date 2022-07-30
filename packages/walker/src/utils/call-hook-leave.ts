import { Ctx } from '@d0-it/core';
import { FlexEnterLeaveVisitor, NodeInfo, RegexLeaveNode, Visitor } from '../lib/types';
import matchProp from './match-prop';

export default async <T = any, TCtx = Ctx>(
  nodeType: string,
  node: T,
  info: NodeInfo,
  ctx: TCtx,
  visitor: Visitor<T, TCtx>
): Promise<any> => {
  if (visitor.leave && matchProp(visitor.leave, nodeType))
    return await visitor.leave[matchProp(visitor.leave, nodeType)](node, info, ctx);

  let regexRule = (
    (visitor.leave as FlexEnterLeaveVisitor<T, TCtx>)?.regex as RegexLeaveNode<T, TCtx>[]
  )?.find(r => r.exp.test(nodeType));
  if (regexRule) return await regexRule.do(node, info, ctx);

  if (matchProp(visitor, nodeType) && visitor[matchProp(visitor, nodeType)]?.leave)
    return await visitor[matchProp(visitor, nodeType)]?.leave(node, info, ctx);
  return node;
};
