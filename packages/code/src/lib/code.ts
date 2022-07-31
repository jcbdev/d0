import { Ctx, D0, d0s, defaultD0s, StartD0 } from '@d0-it/core';
import { NodeD0 } from '..';
import { CodeAdapter, CodeContext, StartCodeD0 } from './types';
import cloneDeep from 'clone-deep';

export const code = async <TAst extends any, TNode extends any, T extends any = any, TD0 = any>(
  sourceCode: string,
  options: any,
  adapter: CodeAdapter<TAst, TNode>,
  action: StartCodeD0<TD0, CodeContext<T, TAst, TNode>>,
  withCtx?: Ctx<T>,
  d0?: () => TD0
): Promise<CodeContext<T, TAst, TNode>> => {
  let $d0 = !d0 ? defaultD0s<TD0>() : typeof d0 === 'string' ? d0s<TD0>(d0) : (d0() as TD0);
  let originalAst = adapter.parse(sourceCode, options);
  let ctx = {
    $originalAst: originalAst,
    $ast: cloneDeep(originalAst),
    $adapter: adapter,
    $updates: [],
    ...(withCtx ?? {}),
  } as CodeContext<T, TAst, TNode>;
  return await (
    await action($d0, ctx)
  )(ctx);
};
