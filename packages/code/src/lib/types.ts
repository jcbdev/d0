import { Ctx, D0 } from '@d0-it/core';

export type SourceAst<TAst = any> = {
  sourceCode: string;
  ast: TAst;
};

export type CodeContext<T = any, TAst = any, TNode = any> = Ctx<{
  $originalAst: SourceAst<TAst>;
  $ast: SourceAst<TAst>;
  $adapter: CodeAdapter<TAst, TNode>;
  $updates: CodeUpdate[];
}> &
  Ctx<T>;

export type CodeD0<T = any, TAst = any, TNode = any> = (
  ctx: CodeContext<T, TAst, TNode>
) => Promise<CodeContext<T, TAst, TNode>> | CodeContext<T, TAst, TNode>;

// export type CodeD0<TAst = any, TNode = any> = (
//   ctx: CodeContext<TAst, TNode>
// ) => Promise<CodeContext<TAst, TNode> | CodeContext<TAst, TNode>>;

export type ResolveNode<T = any, TAst = any, TNode = any> = (
  node: NodeState<TNode> | NodeState<TNode>[],
  ctx: CodeContext<T, TAst, TNode>
) => Promise<NodeState<TNode>> | NodeState<TNode> | Promise<NodeState<TNode>[]> | NodeState<TNode>[];

// export type ResolveNodes<T = void, TAst = any, TNode = any> = (
//   node: TNode[],
//   ctx: Ctx<T, Ctx<T, CodeContext<TAst, TNode>>>
// ) => Promise<NodeState<TNode>[]> | NodeState<TNode>[];

export type NodeD0<T = any, TAst = any, TNode = any> = (
  nodes: NodeState<TNode>[] | NodeState<TNode>,
  ctx: CodeContext<T, TAst, TNode>
) => Promise<CodeContext<T, TAst, TNode>> | CodeContext<T, TAst, TNode>;

export type StartCodeD0<TD0, TAst = any, TNode = any, T = any> = (
  d0$: TD0,
  ctx: CodeContext<T, TAst, TNode>
) => Promise<D0<T>> | D0<T>;

// export type FunctionNodeD0<T = void, TAst = any, TNode = any> = (
//   node: TNode,
//   transforms: FunctionTransforms<TAst, TNode>,
//   ctx: Ctx<T, CodeContext<TAst, TNode>>
// ) => Promise<Ctx<T, CodeContext<TAst, TNode>> | Ctx<T, CodeContext<TAst, TNode>>>;

// export type StatementNodeD0<T = void, TAst = any, TNode = any> = (
//   node: TNode | TNode[],
//   transforms: StatementTransforms<TAst, TNode>,
//   ctx: Ctx<T, CodeContext<TAst, TNode>>
// ) => Promise<Ctx<T, CodeContext<TAst, TNode>> | Ctx<T, CodeContext<TAst, TNode>>>;

export type NodeState<TNode = any> = {
  node: TNode;
  source: string;
  range: { start: number; end: number } | null;
};

export type Mutate<T = any, TAst = any, TNode = any, TUpdate extends string | TNode = string> = (
  state: NodeState<TNode>,
  ctx: CodeContext<T, TAst, TNode>
) => TUpdate;

export type CodeUpdate = {
  update: string;
  range: { start: number; end: number };
  operation: 'replace' | 'remove' | 'skip';
};

export interface CodeAdapter<TAst = any, TNode = any> {
  parse: (sourceCode: string, options: any) => SourceAst<TAst>;
  // resolve: <TCtx = Code>(codeCtx: CodeContext<TAst, TNode>) => string;
  queries: {
    program: (ast: SourceAst<TAst>) => NodeState<TNode>;
    getStatements: (parent: TNode, ast: SourceAst<TAst>, filter?: string) => NodeState<TNode>[];
    getFunctions: (parent: TNode, ast: SourceAst<TAst>, filter?: string) => NodeState<TNode>[];
  };
  transforms: {
    functions: FunctionTransforms<TAst, TNode>;
    statements: StatementTransforms<TAst, TNode>;
  };
}

export interface FunctionTransforms<TAst = any, TNode = any> {
  prependToBody: (
    state: NodeState<TNode>,
    mutate: Mutate<TAst, TNode, string>,
    ast: SourceAst<TAst>
  ) => CodeUpdate;
}

export interface StatementTransforms<TAst = any, TNode = any> {}

export type CodeD0s<D = any, DAst = any, DNode = any> = {
  // $adapter: CodeAdapter<DAst, DNode>;
  getFunctions: <T = D, TAst = DAst, TNode = DNode>(filter?: string) => ResolveNode<T, TAst, TNode>;
  getStatements: <T = D, TAst = DAst, TNode = DNode>(filter?: string) => ResolveNode<T, TAst, TNode>;
  d0With: <T = D, TAst = DAst, TNode = DNode>(
    resolve: ResolveNode<T, TAst, TNode>,
    d0: NodeD0<T, TAst, TNode>
  ) => D0<CodeContext<T, TAst, TNode>>;
  $func: {
    prependToBody: <T = D, TAst = DAst, TNode = DNode>(
      node: NodeState<TNode>,
      code: string
    ) => D0<CodeContext<T, TAst, TNode>>;
  };
};
