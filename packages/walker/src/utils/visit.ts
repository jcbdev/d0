import isObject from './is-object';
import isArray from './is-array';
import { NodeInfo, NodeSelector, VisitIntention, Visitor } from '../lib/types';
import callHookLeave from './call-hook-leave';
import callHookEnter from './call-hook-enter';
import { Context } from '@d0/core';

export const visit = <T = any>(node: T | T[], selector: NodeSelector, visitor: Visitor<T>, ctx: Context) => {
  return visitNode<T>(node, { name: '$root', path: ['$root'], ancestors: [] }, selector, visitor, ctx).node;
};

const visitNode = <T = any>(
  node: T | T[],
  info: NodeInfo,
  selector: NodeSelector,
  visitor: Visitor<T>,
  ctx: Context
) => {
  let nodeType;
  let newNode;

  //Init object clone and type
  if (isArray(node)) {
    nodeType = selector.array(node, info);
    newNode = [...(node as T[])];
  } else if (isObject(node) && Object.prototype.toString.call(node) === '[object Object]') {
    nodeType = selector.object(node, info);
    newNode = { ...node };
  } else {
    nodeType = selector.primitive(node, info);
    newNode = node;
    if (isObject(node)) newNode = Object.assign(Object.create(Object.getPrototypeOf(node)), node);
  }

  //Call entry hook
  let intention = callHookEnter<T>(nodeType, newNode, info, ctx, visitor);
  // console.log(newNode);

  // recursively visit arrays and objects
  if (intention.intention === 'PROCESS') {
    if (isArray(node)) {
      newNode = visitArray<T>(newNode, info, selector, visitor, ctx);
    } else if (isObject(node) && Object.prototype.toString.call(node) === '[object Object]') {
      newNode = visitObject<T>(newNode, info, selector, visitor, ctx);
    }

    //Call leave hook
    newNode = callHookLeave<T>(nodeType, newNode, info, ctx, visitor);
    intention.node = newNode;
  }
  // console.log(intention);
  return intention;
};

const visitArray = <T = any>(
  nodes: T[],
  info: NodeInfo,
  selector: NodeSelector,
  visitor: Visitor<T>,
  ctx: Context
): any[] => {
  let newNodes = nodes?.map((n, index) =>
    visitNode<T>(
      n,
      { ...info, ancestors: [...info.ancestors, nodes], path: [...info.path, index], index },
      selector,
      visitor,
      ctx
    )
  );
  let rnewNodes = newNodes.filter(n => n.intention != 'REMOVE').map(n => n.node);
  // console.log(`visitArray ${JSON.stringify(rnewNodes)}`);
  return rnewNodes;
};

const visitObject = <T = any>(
  node: T,
  info: NodeInfo,
  selector: NodeSelector,
  visitor: Visitor<T>,
  ctx: Context
): any => {
  let newInfo: NodeInfo = {
    ancestors: [...info.ancestors, node],
    path: [...info.path],
    parent: node,
  };

  let newNodes = Object.entries(node)
    .map(([k, v]) => {
      return [
        k,
        visitNode<T>(v as T, { ...newInfo, path: [...newInfo.path, k], name: k }, selector, visitor, ctx),
      ] as [string, VisitIntention<T>];
    })
    .filter(([k, v]) => v.intention != 'REMOVE')
    .map(([k, v]) => [k, v.node] as [string, T])
    .reduce(
      (obj, [k, n]) => ({
        ...obj,
        [k]: n,
      }),
      {}
    );
  // console.log(`visitObject ${JSON.stringify(newNodes)}`);
  return newNodes;
};
