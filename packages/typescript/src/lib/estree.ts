import { D0 } from '@d0-it/core';
import { parse, TSESTreeOptions } from '@typescript-eslint/typescript-estree';

export const estree = <TFlex = void, TBase = void>(
  name: string,
  ts: string,
  options?: TSESTreeOptions
): D0<TFlex, TBase> => {
  return async ctx => {
    ctx[name] = parse(ts, options);
    return ctx;
  };
};
