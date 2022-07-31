import { D0 } from '@d0-it/core';
import { createSourceFile, ScriptTarget } from 'typescript';

export const typescript = <T = any>(
  name: string,
  filename: string,
  ts: string,
  languageVersion: ScriptTarget
): D0<T> => {
  return async ctx => {
    ctx[name] = createSourceFile(filename, ts, languageVersion);
    return ctx;
  };
};
