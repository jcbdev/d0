import isObject from './is-object';
import isArray from './is-array';
import { NodeInfo, NodeSelector } from '../lib/types';
import matchProp from './match-prop';

const callHook = (
  hook: 'enter' | 'leave',
  nodeType: string,
  node: any,
  info: NodeInfo,
  ctx: any,
  visitor: any
): any => {
  if (visitor[hook] && matchProp(visitor[hook], nodeType))
    node = visitor[hook][matchProp(visitor[hook], nodeType)](node, info, ctx);
  if (matchProp(visitor, nodeType) && visitor[matchProp(visitor, nodeType)]?.[hook])
    node = visitor[matchProp(visitor, nodeType)]?.[hook](node, info, ctx);
  return node;
};

export const visit = (node: any, info: NodeInfo, selector: NodeSelector, visitor: any, ctx: any) => {
  if (isArray(node)) {
    let nodeType = selector.array(node, info);
    let newNode = [...node];
    if (visitor.enter && matchProp(visitor.enter, nodeType))
      newNode = visitor.enter[matchProp(visitor.enter, nodeType)](newNode, info, ctx);
    if (matchProp(visitor, nodeType) && visitor[matchProp(visitor, nodeType)]?.enter)
      newNode = visitor[matchProp(visitor, nodeType)]?.enter(newNode, info, ctx);
    if (newNode)
      newNode = newNode.map((n, index) =>
        visit(
          n,
          { ...info, ancestors: [...info.ancestors, node], path: [...info.path, index], index },
          selector,
          visitor,
          ctx
        )
      );
    if (visitor.leave && matchProp(visitor.leave, nodeType))
      newNode = visitor.leave[matchProp(visitor.leave, nodeType)](newNode, info, ctx);
    if (visitor[matchProp(visitor, nodeType)] && visitor[matchProp(visitor, nodeType)]?.leave)
      newNode = visitor[matchProp(visitor, nodeType)]?.leave(newNode, info, ctx);
    return newNode;
  } else if (isObject(node)) {
    let nodeType = selector.object(node, info);
    let newNode = { ...node };
    let newInfo: NodeInfo = {
      ancestors: [...info.ancestors, node],
      path: [...info.path],
      parent: node,
    };
    if (visitor.enter && matchProp(visitor.enter, nodeType))
      newNode = visitor.enter[matchProp(visitor.enter, nodeType)](newNode, info, ctx);
    if (matchProp(visitor, nodeType) && visitor[matchProp(visitor, nodeType)]?.enter)
      newNode = visitor[matchProp(visitor, nodeType)]?.enter(newNode, info, ctx);
    if (newNode)
      newNode = Object.entries(newNode).reduce(
        (obj, [k, n]) => ({
          ...obj,
          [k]: visit(n, { ...newInfo, path: [...newInfo.path, k], name: k }, selector, visitor, ctx),
        }),
        {}
      );
    if (visitor.leave && matchProp(visitor.leave, nodeType))
      newNode = visitor.leave[matchProp(visitor.leave, nodeType)](newNode, info, ctx);
    if (visitor[matchProp(visitor, nodeType)] && visitor[matchProp(visitor, nodeType)]?.leave)
      newNode = visitor[matchProp(visitor, nodeType)]?.leave(newNode, info, ctx);
    return newNode;
  } else {
    let nodeType = selector.primitive(node, info);
    let newNode = node;
    if (visitor.enter && matchProp(visitor.enter, nodeType))
      newNode = visitor.enter[matchProp(visitor.enter, nodeType)](newNode, info, ctx);
    if (matchProp(visitor, nodeType) && visitor[matchProp(visitor, nodeType)]?.enter)
      newNode = visitor[matchProp(visitor, nodeType)]?.enter(newNode, info, ctx);
    if (visitor.leave && matchProp(visitor.leave, nodeType))
      newNode = visitor.leave[matchProp(visitor.leave, nodeType)](newNode, info, ctx);
    if (visitor[matchProp(visitor, nodeType)] && visitor[matchProp(visitor, nodeType)]?.leave)
      newNode = visitor[matchProp(visitor, nodeType)]?.leave(newNode, info, ctx);
    return newNode;
  }
};
