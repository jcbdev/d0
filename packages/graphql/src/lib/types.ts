import { Context } from '@d0/core';
import { NodeInfo } from '@d0/walker';
import { ASTKindToNode, ASTNode } from 'graphql/language/ast';

export type GraphQLEnterLeaveVisitor = {
  enter?: {
    [K in keyof ASTKindToNode]?: (node: ASTKindToNode[K], info: NodeInfo, ctx: Context) => any;
  };
  leave?: {
    [K in keyof ASTKindToNode]?: (node: ASTKindToNode[K], info: NodeInfo, ctx: Context) => any;
  };
};

export type GraphQLShapeMapVisitor = {
  [K in keyof ASTKindToNode]?: {
    enter?: (node: ASTKindToNode[K], info: NodeInfo, ctx: Context) => any;
    leave?: (node: ASTKindToNode[K], info: NodeInfo, ctx: Context) => any;
  };
};

export type GraphQLArrayVisitor = {
  interfaces?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
  };
  directives?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
  };
  definitions?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
  };
  arguments?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
  };
  values?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
  };
  fields?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
  };
  possibleTypes?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
  };
  enumValues?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
  };
  inputFields?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
  };
  selections?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
  };
  variableDefinitions?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
  };
  operationTypes?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
  };
  locations?: {
    enter?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    leave?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
  };
  enter?: {
    interfaces?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    directives?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    definitions?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    arguments?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    values?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    fields?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    possibleTypes?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    enumValues?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    inputFields?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    selections?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    variableDefinitions?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    operationTypes?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    locations?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
  };
  leave?: {
    interfaces?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    directives?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    definitions?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    arguments?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    values?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    fields?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    possibleTypes?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    enumValues?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    inputFields?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    selections?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    variableDefinitions?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    operationTypes?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
    locations?: (node: ASTNode[], info: NodeInfo, ctx: Context) => any;
  };
};

export type GraphQLFlexVisitor = {
  enter?: Record<string, (node: ASTNode, info: NodeInfo, ctx: Context) => any>;
  leave?: Record<string, (node: ASTNode, info: NodeInfo, ctx: Context) => any>;
};

export type GraphQLFlexEnterLeaveVisitor = Record<
  string,
  {
    enter?: (node: ASTNode, info: NodeInfo, ctx: Context) => any;
    leave?: (node: ASTNode, info: NodeInfo, ctx: Context) => any;
  }
>;

export type GraphQLVisitor =
  | GraphQLEnterLeaveVisitor
  | GraphQLShapeMapVisitor
  | GraphQLArrayVisitor
  | GraphQLFlexVisitor
  | GraphQLFlexEnterLeaveVisitor;
