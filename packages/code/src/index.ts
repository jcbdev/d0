import { Or, D0, registerD0s, registerDefaultD0s } from '@d0-it/core';
import { d0With } from './lib/d0-with';
import { getFunctions } from './lib/get-functions';
import { getStatements } from './lib/get-statements';
import { CodeAdapter, CodeContext, CodeD0s, NodeD0, NodeState, ResolveNode } from './lib/types';

export * from './lib/code';
export * from './lib/get-functions';
export * from './lib/get-statements';
export * from './lib/types';

export const codeD0s: <DFlex = void, DAst = void, DNode = void>() => CodeD0s<DFlex, DAst, DNode> = <
  DFlex = void,
  DAst = void,
  DNode = void
>() => {
  return {
    getFunctions: <TFlex = DFlex>(filter?: string) => getFunctions<TFlex, DAst, DNode>(filter),
    getStatements: <TFlex = DFlex>(filter?: string) => getStatements<TFlex, DAst, DNode>(filter),
    d0With: <TFlex = DFlex>(action: ResolveNode<TFlex, DAst, DNode>, d0: NodeD0<TFlex, DAst, DNode>) =>
      d0With<TFlex, DAst, DNode>(action, d0),
    $func: {
      prependToBody: <TFlex = DFlex, TAst = DAst, TNode = DNode>(node: NodeState<TNode>, code: string) =>
        null,
    },
  } as CodeD0s<DFlex, DAst, DNode>;
};

registerD0s('code', codeD0s);
registerDefaultD0s(codeD0s);
