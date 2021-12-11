import { Action, Context } from '@d0/core';
import { CodeAdapter, CodeContext, NodeAction } from './types';

export const code = (
  name: string,
  sourceCode: string,
  actions: NodeAction[],
  adapter: CodeAdapter,
  options: any
): Action => {
  return async (ctx: Context) => {
    let codeCtx: CodeContext = {
      $tmpl: {},
      $global: ctx,
      $sourceCode: sourceCode,
      $ast: adapter.parse(sourceCode, options),
      $adapter: adapter,
    };
    for (let action of actions) {
      codeCtx = await action(adapter.queries.program(codeCtx), codeCtx);
    }
    ctx[name] = adapter.resolve(codeCtx);
    return ctx;
  };
};
