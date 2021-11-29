import { Action, Context } from '@d0/core';
import { parse } from 'graphql';
import { FileHandle, readFile } from 'fs/promises';
import { PathLike } from 'fs';
import path from 'path';

export const loadGraphQL = (name: string, path: PathLike | FileHandle): Action => {
  return async (ctx: Context) => {
    const text = await readFile(path, 'utf8');
    ctx[name] = parse(text);
    return ctx;
  };
};
