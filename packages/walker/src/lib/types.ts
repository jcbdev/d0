import { Context } from '@d0/core';

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

export type Visitor<T = any> = FlexVisitor<T> & FlexEnterLeaveVisitor<T>;

export type FlexVisitor<T = any> = {
  enter?: Record<string, (node: T | T[], info: NodeInfo, ctx: Context) => VisitIntention<T | T[]>>;
  leave?: Record<string, (node: T | T[], info: NodeInfo, ctx: Context) => any>;
};

export type FlexEnterLeaveVisitor<T = any> = Record<
  string,
  {
    enter?: (node: T | T[], info: NodeInfo, ctx: Context) => VisitIntention<T | T[]>;
    leave?: (node: T | T[], info: NodeInfo, ctx: Context) => any;
  }
>;
