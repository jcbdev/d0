import { code, CodeAdapter, CodeContext } from '@d0-it/code';
import { CoreD0s, Ctx, D0, StartD0 } from '@d0-it/core';
import { AST, TSESTree } from '@typescript-eslint/typescript-estree';
import { TSCodeContext, TSESTreeOptions, TypescriptCtx } from './types';
import { typescriptAdapter } from './typescript-adapter';

export const typescriptCode = <TD0Extension = void, DFlex = void>(
  sourceCode: string,
  options: any,
  d0: <DFlex>() => TD0Extension & CoreD0s<DFlex, TypescriptCtx<DFlex>>,
  action: StartD0<TD0Extension & CoreD0s<DFlex, TypescriptCtx<DFlex>>, DFlex, TSCodeContext>,
  withCtx?: Ctx<DFlex, TSCodeContext>
): D0<DFlex, TSCodeContext> => {
  return async ctx => {
    let newCtx = {
      $indexes: { functions: {} },
      ...withCtx,
    };
    ctx = await code(sourceCode, options, typescriptAdapter, d0, action, newCtx);
    return ctx;
  };
};
