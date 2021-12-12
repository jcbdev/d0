import { Ctx } from '@d0/core';
import { NodeInfo, VisitIntention, Visitor } from '@d0/walker';
import { ASTKindToNode, ASTNode } from 'graphql/language/ast';

export type GraphQLEnterLeaveVisitor<TCtx = Ctx> = {
  enter?: {
    [K in keyof ASTKindToNode]?: (
      node: ASTKindToNode[K],
      info: NodeInfo,
      ctx: TCtx
    ) => VisitIntention<ASTNode>;
  };
  leave?: {
    [K in keyof ASTKindToNode]?: (node: ASTKindToNode[K], info: NodeInfo, ctx: TCtx) => any;
  };
};

export type GraphQLShapeMapVisitor<TCtx = Ctx> = {
  [K in keyof ASTKindToNode]?: {
    enter?: (node: ASTKindToNode[K], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode>;
    leave?: (node: ASTKindToNode[K], info: NodeInfo, ctx: TCtx) => any;
  };
};

export type GraphQLArrayVisitor<TCtx = Ctx> = {
  interfaces?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
  };
  directives?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
  };
  definitions?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
  };
  arguments?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
  };
  values?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
  };
  fields?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
  };
  possibleTypes?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
  };
  enumValues?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
  };
  inputFields?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
  };
  selections?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
  };
  variableDefinitions?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
  };
  operationTypes?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
  };
  locations?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
  };
  enter?: {
    interfaces?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    directives?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    definitions?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    arguments?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    values?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    fields?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    possibleTypes?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    enumValues?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    inputFields?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    selections?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    variableDefinitions?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    operationTypes?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
    locations?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => VisitIntention<ASTNode[]>;
  };
  leave?: {
    interfaces?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
    directives?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
    definitions?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
    arguments?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
    values?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
    fields?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
    possibleTypes?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
    enumValues?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
    inputFields?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
    selections?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
    variableDefinitions?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
    operationTypes?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
    locations?: (node: ASTNode[], info: NodeInfo, ctx: TCtx) => any;
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

export type GraphQLVisitor = Visitor<ASTNode> &
  GraphQLEnterLeaveVisitor &
  GraphQLShapeMapVisitor &
  GraphQLArrayVisitor;

// // expands object types one level deep
// type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

// // expands object types recursively
// type ExpandRecursively<T> = T extends object
//   ? T extends infer O
//     ? { [K in keyof O]: ExpandRecursively<O[K]> }
//     : never
//   : T;

// export type V = ExpandRecursively<GraphQLVisitor>;
