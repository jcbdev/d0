import isObject from './is-object';
import isArray from './is-array';
import { NodeInfo, NodeSelector, VisitIntention, Visitor } from '../lib/types';
import callHookLeave from './call-hook-leave';
import callHookEnter from './call-hook-enter';
import { Ctx } from '@d0/core';
import cloneDeep from 'clone-deep';

export const visit = async <T = any, TCtx = Ctx>(
  node: T | T[],
  selector: NodeSelector,
  visitor: Visitor<T>,
  ctx: TCtx,
  info?: NodeInfo
) => {
  return (
    await visitNode<T, TCtx>(
      node,
      info ?? {
        name: '$root',
        path: ['$root'],
        pathAncestors: [],
        nodeAncestors: [],
        nodeType: 'object',
        selector: '$root',
      },
      selector,
      visitor,
      ctx
    )
  ).node;
};

const visitNode = async <T = any, TCtx = Ctx>(
  node: T | T[],
  info: NodeInfo,
  selector: NodeSelector,
  visitor: Visitor<T, TCtx>,
  ctx: TCtx
) => {
  // let nodeType;
  let newNode;

  // console.log(info.path);
  // console.log(Object.prototype.toString.call(node) === '[object Object]');
  // console.log(isObject(node));
  //Init object clone and type
  if (isArray(node)) {
    info.nodeType = 'array';
    // info.selector
    info.selector = selector.array(node, info);
    newNode = [...(node as T[])];
  } else if (isObject(node) && Object.prototype.toString.call(node) === '[object Object]') {
    info.nodeType = 'object';
    info.selector = selector.object(node, info);
    newNode = { ...node };
  } else {
    info.nodeType = 'primitive';
    info.selector = selector.primitive(node, info);
    newNode = node;
    if (isObject(node)) {
      newNode = cloneDeep(node);
    }
  }

  //Call entry hook
  let intention = await callHookEnter<T, TCtx>(info.selector, newNode, info, ctx, visitor);
  // console.log(newNode);

  // recursively visit arrays and objects
  if (intention.intention === 'PROCESS') {
    newNode = intention.node;
    // console.log(newNode);
    if (info.nodeType == 'array') {
      newNode = await visitArray<T, TCtx>(newNode, info, selector, visitor, ctx);
    } else if (info.nodeType == 'object') {
      newNode = await visitObject<T, TCtx>(newNode, info, selector, visitor, ctx);
    }

    //Call leave hook
    newNode = await callHookLeave<T, TCtx>(info.selector, newNode, info, ctx, visitor);
    intention.node = newNode;
  }
  return intention;
};

const visitArray = async <T = any, TCtx = Ctx>(
  nodes: T[],
  info: NodeInfo,
  selector: NodeSelector,
  visitor: Visitor<T, TCtx>,
  ctx: TCtx
): Promise<any[]> => {
  let newNodes = await Promise.all(
    nodes?.map(
      async (n, index) =>
        await visitNode<T, TCtx>(
          n,
          {
            ...info,
            pathAncestors: [...info.pathAncestors, nodes],
            path: [...info.path, index],
            index,
          },
          selector,
          visitor,
          ctx
        )
    )
  );
  let rnewNodes = newNodes.filter(n => n.intention != 'REMOVE').map(n => n.node);
  // console.log(`visitArray ${JSON.stringify(rnewNodes)}`);
  return rnewNodes;
};

const visitObject = async <T = any, TCtx = Ctx>(
  node: T,
  info: NodeInfo,
  selector: NodeSelector,
  visitor: Visitor<T, TCtx>,
  ctx: TCtx
): Promise<any> => {
  let newInfo: NodeInfo = {
    pathAncestors: [...info.pathAncestors, node],
    // nodeAncestors: [],
    nodeAncestors: [...info.nodeAncestors, node],
    path: [...info.path],
    nodeType: 'object',
    selector: info.selector,
    parent: node,
  };

  let newNodes = (
    await Promise.all(
      Object.entries(node).map(async ([k, v]) => {
        return [
          k,
          await visitNode<T, TCtx>(
            v as T,
            {
              ...newInfo,
              path: [...newInfo.path, k],
              name: k,
            },
            selector,
            visitor,
            ctx
          ),
        ] as [string, VisitIntention<T>];
      })
    )
  )
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
