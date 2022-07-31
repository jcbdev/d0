import { D0 } from '@d0-it/core';
import { parse, TSESTreeOptions } from '@typescript-eslint/typescript-estree';

export const estree = <T = any>(name: string, ts: string, options?: TSESTreeOptions): D0<T> => {
  return async ctx => {
    ctx[name] = parse(ts, options);
    return ctx;
  };
};
