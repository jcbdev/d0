import { D0 } from '@d0/core';
import { createSourceFile, ScriptTarget } from 'typescript';

export const typescript = <TFlex = void, TBase = void>(
  name: string,
  filename: string,
  ts: string,
  languageVersion: ScriptTarget
): D0<TFlex, TBase> => {
  return async ctx => {
    ctx[name] = createSourceFile(filename, ts, languageVersion);
    return ctx;
  };
};
