import { TypescriptCtx } from '../types';
import prettier from 'prettier';
import { parse } from '@typescript-eslint/typescript-estree';

export const updateAst = <TFlex>(ctx: TypescriptCtx<TFlex>) => {
  ctx.$ast.sourceCode = (prettier as any).__debug.formatAST(ctx.$ast.ast, {
    originalText: ctx.$ast.sourceCode,
    parser: 'babel',
  }).formatted;
  // console.log(ctx.$ast.sourceCode);
  ctx.$ast.ast = parse(ctx.$ast.sourceCode, {
    loc: true,
    range: true,
    comment: true,
  });
};
