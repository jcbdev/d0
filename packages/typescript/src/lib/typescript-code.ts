import { code, CodeAdapter, CodeContext } from '@d0-it/code';
import { CoreD0s, Ctx, D0, d0s, defaultD0s, StartD0 } from '@d0-it/core';
import { AST, TSESTree } from '@typescript-eslint/typescript-estree';
import { TSCodeContext, TSESTreeOptions, TypescriptCtx } from './types';
import { typescriptAdapter } from './typescript-adapter';

export const typescriptCode = async <D = any, TD0 = any>(
  sourceCode: string,
  options: any,
  action: StartD0<TD0, D>,
  withCtx?: Ctx<D>,
  d0?: () => TD0 | string
): Promise<Ctx<D>> => {
  let $d0 = !d0 ? defaultD0s<TD0>() : typeof d0 === 'string' ? d0s<TD0>(d0) : (d0() as TD0);
  let ctx = withCtx ?? ({} as Ctx<D>);
  return await code(sourceCode, options, typescriptAdapter, action, ctx, d0);
};
