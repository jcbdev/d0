import { Ctx } from '@d0/core';
import { EnterLeave, EnterNode, LeaveNode, NodeInfo, VisitIntention, Visitor } from '@d0/walker';
import { ASTKindToNode, ASTNode } from 'graphql/language/ast';

export type GraphQLEnterLeaveVisitor<TCtx = Ctx> = {
  enter?: {
    [K in keyof ASTKindToNode]?: EnterNode<ASTKindToNode[K], TCtx>;
  };
  leave?: {
    [K in keyof ASTKindToNode]?: LeaveNode<ASTKindToNode[K], TCtx>;
  };
};

export type GraphQLShapeMapVisitor<TCtx = Ctx> = {
  [K in keyof ASTKindToNode]?: {
    enter?: EnterNode<ASTKindToNode[K], TCtx>;
    leave?: LeaveNode<ASTKindToNode[K], TCtx>;
  };
};

export type GraphQLArrayVisitor<TCtx = Ctx> = {
  interfaces?: EnterLeave<ASTNode[], TCtx>;
  directives?: EnterLeave<ASTNode[], TCtx>;
  definitions?: EnterLeave<ASTNode[], TCtx>;
  arguments?: EnterLeave<ASTNode[], TCtx>;
  values?: EnterLeave<ASTNode[], TCtx>;
  fields?: EnterLeave<ASTNode[], TCtx>;
  possibleTypes?: EnterLeave<ASTNode[], TCtx>;
  enumValues?: EnterLeave<ASTNode[], TCtx>;
  inputFields?: EnterLeave<ASTNode[], TCtx>;
  selections?: EnterLeave<ASTNode[], TCtx>;
  variableDefinitions?: EnterLeave<ASTNode[], TCtx>;
  operationTypes?: EnterLeave<ASTNode[], TCtx>;
  locations?: EnterLeave<ASTNode[], TCtx>;
  enter?: {
    interfaces?: EnterNode<ASTNode[], TCtx>;
    directives?: EnterNode<ASTNode[], TCtx>;
    definitions?: EnterNode<ASTNode[], TCtx>;
    arguments?: EnterNode<ASTNode[], TCtx>;
    values?: EnterNode<ASTNode[], TCtx>;
    fields?: EnterNode<ASTNode[], TCtx>;
    possibleTypes?: EnterNode<ASTNode[], TCtx>;
    enumValues?: EnterNode<ASTNode[], TCtx>;
    inputFields?: EnterNode<ASTNode[], TCtx>;
    selections?: EnterNode<ASTNode[], TCtx>;
    variableDefinitions?: EnterNode<ASTNode[], TCtx>;
    operationTypes?: EnterNode<ASTNode[], TCtx>;
    locations?: EnterNode<ASTNode[], TCtx>;
  };
  leave?: {
    interfaces?: LeaveNode<ASTNode[], TCtx>;
    directives?: LeaveNode<ASTNode[], TCtx>;
    definitions?: LeaveNode<ASTNode[], TCtx>;
    arguments?: LeaveNode<ASTNode[], TCtx>;
    values?: LeaveNode<ASTNode[], TCtx>;
    fields?: LeaveNode<ASTNode[], TCtx>;
    possibleTypes?: LeaveNode<ASTNode[], TCtx>;
    enumValues?: LeaveNode<ASTNode[], TCtx>;
    inputFields?: LeaveNode<ASTNode[], TCtx>;
    selections?: LeaveNode<ASTNode[], TCtx>;
    variableDefinitions?: LeaveNode<ASTNode[], TCtx>;
    operationTypes?: LeaveNode<ASTNode[], TCtx>;
    locations?: LeaveNode<ASTNode[], TCtx>;
  };
};

// export type GraphQLFlexVisitor = {
//   enter?: Record<string, (node: ASTNode, info: NodeInfo, ctx: TCtx) => any>;
//   leave?: Record<string, (node: ASTNode, info: NodeInfo, ctx: TCtx) => any>;
// };

// export type GraphQLFlexEnterLeaveVisitor = Record<
//   string,
//   {
//     enter?: (node: ASTNode, info: NodeInfo, ctx: TCtx) => any;
//     leave?: (node: ASTNode, info: NodeInfo, ctx: TCtx) => any;
//   }
// >;

export type GraphQLVisitor<TCtx = Ctx> = Visitor<ASTNode, TCtx> &
  GraphQLEnterLeaveVisitor<TCtx> &
  GraphQLShapeMapVisitor<TCtx> &
  GraphQLArrayVisitor<TCtx>;

// // expands object types one level deep
// type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

// // expands object types recursively
// type ExpandRecursively<T> = T extends object
//   ? T extends infer O
//     ? { [K in keyof O]: ExpandRecursively<O[K]> }
//     : never
//   : T;

// export type V = ExpandRecursively<GraphQLVisitor>;
