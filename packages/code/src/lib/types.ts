import { Ctx, D0 } from '@d0-it/core';

export type SourceAst<TAst = any> = {
  sourceCode: string;
  ast: TAst;
};

export type CodeContext<TAst = any, TNode = any> = Ctx<{
  $originalAst: SourceAst<TAst>;
  $ast: SourceAst<TAst>;
  $adapter: CodeAdapter<TAst, TNode>;
  $updates: CodeUpdate[];
}>;

// export type CodeD0<TAst = any, TNode = any> = (
//   ctx: CodeContext<TAst, TNode>
// ) => Promise<CodeContext<TAst, TNode> | CodeContext<TAst, TNode>>;

export type ResolveNode<TFlex = void, TAst = any, TNode = any> = (
  node: NodeState<TNode> | NodeState<TNode>[],
  ctx: Ctx<TFlex, CodeContext<TAst, TNode>>
) => Promise<NodeState<TNode>> | NodeState<TNode> | Promise<NodeState<TNode>[]> | NodeState<TNode>[];

// export type ResolveNodes<TFlex = void, TAst = any, TNode = any> = (
//   node: TNode[],
//   ctx: Ctx<TFlex, Ctx<TFlex, CodeContext<TAst, TNode>>>
// ) => Promise<NodeState<TNode>[]> | NodeState<TNode>[];

export type NodeD0<TFlex = void, TAst = any, TNode = any> = (
  nodes: NodeState<TNode>[] | NodeState<TNode>,
  ctx: Ctx<TFlex, CodeContext<TAst, TNode>>
) => Promise<Ctx<TFlex, CodeContext<TAst, TNode>> | Ctx<TFlex, CodeContext<TAst, TNode>>>;

// export type FunctionNodeD0<TFlex = void, TAst = any, TNode = any> = (
//   node: TNode,
//   transforms: FunctionTransforms<TAst, TNode>,
//   ctx: Ctx<TFlex, CodeContext<TAst, TNode>>
// ) => Promise<Ctx<TFlex, CodeContext<TAst, TNode>> | Ctx<TFlex, CodeContext<TAst, TNode>>>;

// export type StatementNodeD0<TFlex = void, TAst = any, TNode = any> = (
//   node: TNode | TNode[],
//   transforms: StatementTransforms<TAst, TNode>,
//   ctx: Ctx<TFlex, CodeContext<TAst, TNode>>
// ) => Promise<Ctx<TFlex, CodeContext<TAst, TNode>> | Ctx<TFlex, CodeContext<TAst, TNode>>>;

export type NodeState<TNode = any> = {
  node: TNode;
  source: string;
  range: { start: number; end: number } | null;
};

export type Mutate<TFlex = void, TAst = any, TNode = any, TUpdate extends string | TNode = string> = (
  state: NodeState<TNode>,
  ctx: Ctx<TFlex, CodeContext<TAst, TNode>>
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

export type CodeD0s<DFlex = void, DAst = any, DNode = any> = {
  // $adapter: CodeAdapter<DAst, DNode>;
  getFunctions: <TFlex = DFlex, TAst = DAst, TNode = DNode>(
    filter?: string
  ) => ResolveNode<TFlex, TAst, TNode>;
  getStatements: <TFlex = DFlex, TAst = DAst, TNode = DNode>(
    filter?: string
  ) => ResolveNode<TFlex, TAst, TNode>;
  d0With: <TFlex = DFlex, TAst = DAst, TNode = DNode>(
    resolve: ResolveNode<TFlex, TAst, TNode>,
    d0: NodeD0<TFlex, TAst, TNode>
  ) => D0<TFlex, CodeContext<TAst, TNode>>;
  $func: {
    prependToBody: <TFlex = DFlex, TAst = DAst, TNode = DNode>(
      node: NodeState<TNode>,
      code: string
    ) => D0<TFlex, CodeContext<TAst, TNode>>;
  };
};
