import { Ctx } from '@d0/core';

export type NodeSelector = {
  array: (node: any, info?: NodeInfo) => string;
  object: (node: any, info?: NodeInfo) => string;
  primitive: (node: any, info?: NodeInfo) => string;
};

export type VisitIntention<T = any> = {
  node: T;
  intention: 'PROCESS' | 'SKIP' | 'REMOVE';
};

export type NodeInfo = {
  parent?: any;
  name?: string;
  index?: number;
  path?: ReadonlyArray<string | number>;
  pathAncestors?: ReadonlyArray<any | any[]>;
  nodeAncestors?: ReadonlyArray<any | any[]>;
  nodeType: 'array' | 'object' | 'primitive';
  selector: string;
};

export type Visitor<T = any, TCtx = Ctx<'Flex'>> = FlexVisitor<T, TCtx> | FlexEnterLeaveVisitor<T, TCtx>;

export type FlexVisitor<T = any, TCtx = Ctx<'Flex'>> = {
  enter?: { [P: string]: EnterNode<T, TCtx> } | { regex?: RegexEnterNode<T, TCtx>[] };
  leave?: { [P: string]: LeaveNode<T, TCtx> } | { regex?: RegexLeaveNode<T, TCtx>[] };
};

export type FlexEnterLeaveVisitor<T = any, TCtx = Ctx<'Flex'>> = {
  [P: string]: {
    enter?: EnterNode<T, TCtx>;
    leave?: LeaveNode<T, TCtx>;
  };
};

export type EnterNode<T, TCtx> = (
  node: T,
  info: NodeInfo,
  ctx: TCtx
) => VisitIntention<T> | Promise<VisitIntention<T>>;
export type LeaveNode<T, TCtx> = (node: T, info: NodeInfo, ctx: TCtx) => any | Promise<any>;

export type RegexEnterNode<T, TCtx> = {
  exp: RegExp;
  do: (node: T, info: NodeInfo, ctx: TCtx) => VisitIntention<T> | Promise<VisitIntention<T>>;
};
export type RegexLeaveNode<T, TCtx> = {
  exp: RegExp;
  do: (node: T, info: NodeInfo, ctx: TCtx) => any | Promise<any>;
};

export type EnterLeave<T, TCtx> = {
  enter?: EnterNode<T, TCtx>;
  leave?: LeaveNode<T, TCtx>;
};

export type CollectResult<T, TMap> = {
  node: T;
  mapped: TMap;
  type: string;
  path?: ReadonlyArray<string | number>;
  // statement: string;
};

export type CollectMappers<TNode, TMap = any> = {
  [P: string]: (node: TNode, info: NodeInfo, map: TMap, data: any) => TMap | Promise<TMap>;
};

export type FindResult<T> = {
  node: T;
  info: NodeInfo;
};
