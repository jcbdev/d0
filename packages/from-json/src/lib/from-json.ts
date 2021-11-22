import { Action, Context } from '@d0/core';
import { FileHandle, readFile } from 'fs/promises';
import { PathLike } from 'fs';

export const fromJson = (name: string, path: PathLike | FileHandle): Action => {
  return async (values: Record<string, any>, ctx: Context) => {
    const text = await readFile(path, 'utf8');
    ctx.values[name] = JSON.parse(text);
    return ctx;
  };
};
