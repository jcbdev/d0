import { Ctx, D0, StartD0 } from '@d0-it/core';
import { NodeD0 } from '..';
import { CodeAdapter, CodeContext } from './types';
import cloneDeep from 'clone-deep';

export const code = async <TD0, TAst, TNode, DFlex = void>(
  sourceCode: string,
  options: any,
  adapter: CodeAdapter<TAst, TNode>,
  d0: () => TD0,
  action: StartD0<TD0, DFlex, CodeContext<TAst, TNode>>,
  withCtx?: Ctx<DFlex, CodeContext<TAst, TNode>>
): Promise<Ctx<DFlex, CodeContext<TAst, TNode>>> => {
  let $d0 = d0();
  let originalAst = adapter.parse(sourceCode, options);
  let ctx = {
    $originalAst: originalAst,
    $ast: cloneDeep(originalAst),
    $adapter: adapter,
    $updates: [],
    ...withCtx,
  } as Ctx<DFlex, CodeContext<TAst, TNode>>;
  return await action($d0, ctx);
};
