import { Context } from '@d0/core';
import { NodeInfo, Visitor } from '../lib/types';
import matchProp from './match-prop';

export default <T = any>(
  nodeType: string,
  node: T,
  info: NodeInfo,
  ctx: Context,
  visitor: Visitor<T>
): any => {
  if (visitor.leave && matchProp(visitor.leave, nodeType))
    node = visitor.leave[matchProp(visitor.leave, nodeType)](node, info, ctx);
  if (matchProp(visitor, nodeType) && visitor[matchProp(visitor, nodeType)]?.leave)
    node = visitor[matchProp(visitor, nodeType)]?.leave(node, info, ctx);
  return node;
};
