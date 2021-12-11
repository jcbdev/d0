import { Context } from '@d0/core';

export type CodeContext<TAst = any, TNode = any> = {
  $tmpl: Record<string, string>;
  $global: Context;
  $sourceCode: string;
  $ast: TAst;
  $adapter: CodeAdapter<TAst, TNode>;
} & Record<string, any>;

// export type CodeAction<TAst = any, TNode = any> = (
//   ctx: CodeContext<TAst, TNode>
// ) => Promise<CodeContext<TAst, TNode> | CodeContext<TAst, TNode>>;

export type NodeAction<TAst = any, TNode = any> = (
  nodes: TNode[] | TNode,
  ctx: CodeContext<TAst, TNode>
) => Promise<CodeContext<TAst, TNode> | CodeContext<TAst, TNode>>;

export type FunctionNodeAction<TAst = any, TNode = any> = (
  node: TNode | TNode[],
  transforms: FunctionTransforms<TAst, TNode>,
  ctx: CodeContext<TAst, TNode>
) => Promise<CodeContext<TAst, TNode> | CodeContext<TAst, TNode>>;

export type StatementNodeAction<TAst = any, TNode = any> = (
  node: TNode | TNode[],
  transforms: StatementTransforms<TAst, TNode>,
  ctx: CodeContext<TAst, TNode>
) => Promise<CodeContext<TAst, TNode> | CodeContext<TAst, TNode>>;

export type NodeState<TNode = any> = {
  ast: TNode;
  source: string;
};

export type Mutate<TAst = any, TNode = any, TUpdate extends string | TNode = string> = (
  state: NodeState<TNode>,
  ctx: CodeContext<TAst, TNode>
) => TUpdate;

export type NodeUpdate<TNode = any, TUpdate extends string | TNode = string> = {
  update?: TUpdate;
  type: 'AST' | 'Source';
  operation: 'replace' | 'remove' | 'skip';
};

export interface CodeAdapter<TAst = any, TNode = any> {
  parse: (sourceCode: string, options: any) => TAst;
  resolve: (codeCtx: CodeContext<TAst, TNode>) => string;
  queries: {
    program: (codeCtx: CodeContext<TAst, TNode>) => TNode;
    statements: (parent: TNode, codeCtx: CodeContext<TAst, TNode>, filter?: string) => TNode[];
    functions: (parent: TNode, codeCtx: CodeContext<TAst, TNode>, filter?: string) => TNode[];
  };
  transforms: {
    functions: FunctionTransforms<TAst, TNode>;
    statements: StatementTransforms<TAst, TNode>;
  };
}

export interface FunctionTransforms<TAst = any, TNode = any> {
  prependToBody: (
    mutate: Mutate<TAst, TNode, string>,
    state: NodeState<TNode>,
    ctx: CodeContext<TAst, TNode>
  ) => NodeUpdate<TNode>;
}

export interface StatementTransforms<TAst = any, TNode = any> {}
