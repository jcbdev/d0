import { NodeState } from '@d0-it/code';
import { Ctx } from '@d0-it/core';
import { EnterLeave, EnterNode, LeaveNode, NodeInfo, Visitor } from '@d0-it/walker';
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/types';

export type ASTNodeTypeToNode = {
  [NodeT in TSESTree.Node as NodeT['type']]: NodeT;
};

export type TypescriptEnterLeaveVisitor<TCtx = Ctx> = {
  enter?: {
    [K in keyof ASTNodeTypeToNode]?: EnterNode<ASTNodeTypeToNode[K], TCtx>;
  };
  leave?: {
    [K in keyof ASTNodeTypeToNode]?: LeaveNode<ASTNodeTypeToNode[K], TCtx>;
  };
};

export type TypescriptShapeMapVisitor<TCtx = Ctx> = {
  [K in keyof ASTNodeTypeToNode]?: {
    enter?: EnterNode<ASTNodeTypeToNode[K], TCtx>;
    leave?: LeaveNode<ASTNodeTypeToNode[K], TCtx>;
  };
};

export type TypescriptArrayVisitor<TCtx = Ctx> = {
  params?: EnterLeave<TSESTree.Node[], TCtx>;
  parameters?: EnterLeave<TSESTree.Node[], TCtx>;
  body?: EnterLeave<TSESTree.Node[], TCtx>;
  range?: EnterLeave<TSESTree.Node[], TCtx>;
  declarations?: EnterLeave<TSESTree.Node[], TCtx>;
  elements?: EnterLeave<TSESTree.Node[], TCtx>;
  arguments?: EnterLeave<TSESTree.Node[], TCtx>;
  properties?: EnterLeave<TSESTree.Node[], TCtx>;
  specifiers?: EnterLeave<TSESTree.Node[], TCtx>;
  quasis?: EnterLeave<TSESTree.Node[], TCtx>;
  cases?: EnterLeave<TSESTree.Node[], TCtx>;
  consequent?: EnterLeave<TSESTree.Node[], TCtx>;
  comments?: EnterLeave<TSESTree.Node[], TCtx>;
  decorators?: EnterLeave<TSESTree.Node[], TCtx>;
  members?: EnterLeave<TSESTree.Node[], TCtx>;
  modifiers?: EnterLeave<TSESTree.Node[], TCtx>;
  extends?: EnterLeave<TSESTree.Node[], TCtx>;
  implements?: EnterLeave<TSESTree.Node[], TCtx>;
  types?: EnterLeave<TSESTree.Node[], TCtx>;
  elementTypes?: EnterLeave<TSESTree.Node[], TCtx>;
  children?: EnterLeave<TSESTree.Node[], TCtx>;
  attributes?: EnterLeave<TSESTree.Node[], TCtx>;

  enter?: {
    params?: EnterNode<TSESTree.Node[], TCtx>;
    parameters?: EnterNode<TSESTree.Node[], TCtx>;
    body?: EnterNode<TSESTree.Node[], TCtx>;
    range?: EnterNode<TSESTree.Node[], TCtx>;
    declarations?: EnterNode<TSESTree.Node[], TCtx>;
    elements?: EnterNode<TSESTree.Node[], TCtx>;
    arguments?: EnterNode<TSESTree.Node[], TCtx>;
    properties?: EnterNode<TSESTree.Node[], TCtx>;
    specifiers?: EnterNode<TSESTree.Node[], TCtx>;
    quasis?: EnterNode<TSESTree.Node[], TCtx>;
    cases?: EnterNode<TSESTree.Node[], TCtx>;
    consequent?: EnterNode<TSESTree.Node[], TCtx>;
    comments?: EnterNode<TSESTree.Node[], TCtx>;
    decorators?: EnterNode<TSESTree.Node[], TCtx>;
    members?: EnterNode<TSESTree.Node[], TCtx>;
    modifiers?: EnterNode<TSESTree.Node[], TCtx>;
    extends?: EnterNode<TSESTree.Node[], TCtx>;
    implements?: EnterNode<TSESTree.Node[], TCtx>;
    types?: EnterNode<TSESTree.Node[], TCtx>;
    elementTypes?: EnterNode<TSESTree.Node[], TCtx>;
    children?: EnterNode<TSESTree.Node[], TCtx>;
    attributes?: EnterNode<TSESTree.Node[], TCtx>;
  };
  leave?: {
    params?: LeaveNode<TSESTree.Node[], TCtx>;
    parameters?: LeaveNode<TSESTree.Node[], TCtx>;
    body?: LeaveNode<TSESTree.Node[], TCtx>;
    range?: LeaveNode<TSESTree.Node[], TCtx>;
    declarations?: LeaveNode<TSESTree.Node[], TCtx>;
    elements?: LeaveNode<TSESTree.Node[], TCtx>;
    arguments?: LeaveNode<TSESTree.Node[], TCtx>;
    properties?: LeaveNode<TSESTree.Node[], TCtx>;
    specifiers?: LeaveNode<TSESTree.Node[], TCtx>;
    quasis?: LeaveNode<TSESTree.Node[], TCtx>;
    cases?: LeaveNode<TSESTree.Node[], TCtx>;
    consequent?: LeaveNode<TSESTree.Node[], TCtx>;
    decorators?: LeaveNode<TSESTree.Node[], TCtx>;
    members?: LeaveNode<TSESTree.Node[], TCtx>;
    modifiers?: LeaveNode<TSESTree.Node[], TCtx>;
    extends?: LeaveNode<TSESTree.Node[], TCtx>;
    implements?: LeaveNode<TSESTree.Node[], TCtx>;
    types?: LeaveNode<TSESTree.Node[], TCtx>;
    elementTypes?: LeaveNode<TSESTree.Node[], TCtx>;
    children?: LeaveNode<TSESTree.Node[], TCtx>;
    attributes?: LeaveNode<TSESTree.Node[], TCtx>;
  };
};

export type TypescriptVisitor<TCtx = Ctx> = Visitor<TSESTree.Node, TCtx> &
  (TypescriptEnterLeaveVisitor<TCtx> & TypescriptShapeMapVisitor<TCtx> & TypescriptArrayVisitor<TCtx>);

export type TSFunctionAnnotation = {
  name: string;
  arguments: Argument;
};

export type Argument = {
  name: string;
  type: string;
  statement: string;
  // annotation?: Annotation;
};

export type Return = {
  type: string;
  statement: string;
  // annotation?: Annotation;
};

export type FunctionState<T> = NodeState<T> & {
  // info: NodeInfo;
  path: string;
  name: string;
  type:
    | 'ArrowFunctionExpression'
    | 'FunctionDeclaration'
    | 'FunctionExpression'
    | 'TSDeclareFunction'
    | 'TSEmptyBodyFunctionExpression';
  generator: boolean;
  expression: boolean;
  async: boolean;
  arguments?: Argument[];
  return?: ReturnType;
  statement: string;
};

// export type IdentifierState<T> = NodeState<T> & {
//   // info: NodeInfo;
//   path: string;
//   name: string;
//   type: 'Identifier'
//   statement: string;
//   typeAnnotation:
// };

// export type Annotation = {
//   path: string;
//   arguments: Argument[];
//   type:
//     | 'TSAnyKeyword'
//     | 'TSArrayType'
//     | 'TSBigIntKeyword'
//     | 'TSBooleanKeyword'
//     | 'TSConditionalType'
//     | 'TSConstructorType'
//     | 'TSFunctionType'
//     | 'TSImportType'
//     | 'TSIndexedAccessType'
//     | 'TSInferType'
//     | 'TSIntersectionType'
//     | 'TSIntrinsicKeyword'
//     | 'TSLiteralType'
//     | 'TSMappedType'
//     | 'TSNamedTupleMember'
//     | 'TSNeverKeyword'
//     | 'TSNullKeyword'
//     | 'TSNumberKeyword'
//     | 'TSObjectKeyword'
//     | 'TSOptionalType'
//     | 'TSParenthesizedType'
//     | 'TSRestType'
//     | 'TSStringKeyword'
//     | 'TSSymbolKeyword'
//     | 'TSTemplateLiteralType'
//     | 'TSThisType'
//     | 'TSTupleType'
//     | 'TSTypeLiteral'
//     | 'TSTypeOperator'
//     | 'TSTypePredicate'
//     | 'TSTypeQuery'
//     | 'TSTypeReference'
//     | 'TSUndefinedKeyword'
//     | 'TSUnionType'
//     | 'TSUnknownKeyword'
//     | 'TSVoidKeyword';
//   statement: string;
// };
