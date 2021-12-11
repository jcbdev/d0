import { Action, Context } from '@d0/core';
import { parse, TSESTreeOptions } from '@typescript-eslint/typescript-estree';

export const estree = (name: string, ts: string, options?: TSESTreeOptions): Action => {
  return async (ctx: Context) => {
    ctx[name] = parse(ts, options);
    return ctx;
  };
};
