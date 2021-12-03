import { Context } from '@d0/core';
import { NodeInfo, VisitIntention, Visitor } from '../lib/types';
import matchProp from './match-prop';

export default <T = any>(
  nodeType: string,
  node: T,
  info: NodeInfo,
  ctx: Context,
  visitor: Visitor<T>
): VisitIntention<T> => {
  let intention: VisitIntention<T> = {
    node: node,
    intention: 'PROCESS',
  };
  if (visitor.enter && matchProp(visitor.enter, nodeType))
    intention = visitor.enter[matchProp(visitor.enter, nodeType)](node, info, ctx) as VisitIntention<T>;
  if (matchProp(visitor, nodeType) && visitor[matchProp(visitor, nodeType)]?.enter)
    intention = visitor[matchProp(visitor, nodeType)]?.enter(node, info, ctx) as VisitIntention<T>;
  return intention;
};
