import { Action, Context } from '@d0/core';
import { createSourceFile, ScriptTarget } from 'typescript';

export const typescript = (
  name: string,
  filename: string,
  ts: string,
  languageVersion: ScriptTarget
): Action => {
  return async (ctx: Context) => {
    ctx[name] = createSourceFile(filename, ts, languageVersion);
    return ctx;
  };
};
