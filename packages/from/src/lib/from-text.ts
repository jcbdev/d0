import { Action, Context } from '@d0/core';
import { FileHandle, readFile } from 'fs/promises';
import { PathLike } from 'fs';

export const fromText = (name: string, path: PathLike | FileHandle): Action => {
  return async (ctx: Context) => {
    const text = await readFile(path, 'utf8');
    ctx[name] = text;
    return ctx;
  };
};
