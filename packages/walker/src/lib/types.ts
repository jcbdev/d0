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
  ancestors?: ReadonlyArray<any | any[]>;
};

export type Visitor<T = any, TCtx = Ctx<'Flex'>> = FlexVisitor<T, TCtx> | FlexEnterLeaveVisitor<T, TCtx>;

export type FlexVisitor<T = any, TCtx = Ctx<'Flex'>> = {
  enter?: { [P: string]: EnterNode<T, TCtx> };
  leave?: { [P: string]: LeaveNode<T, TCtx> };
};

export type FlexEnterLeaveVisitor<T = any, TCtx = Ctx<'Flex'>> = {
  [P: string]: {
    enter?: EnterNode<T, TCtx>;
    leave?: LeaveNode<T, TCtx>;
  };
};

export type EnterNode<T, TCtx> = (node: T | T[], info: NodeInfo, ctx: TCtx) => VisitIntention<T | T[]>;
export type LeaveNode<T, TCtx> = (node: T | T[], info: NodeInfo, ctx: TCtx) => any;
