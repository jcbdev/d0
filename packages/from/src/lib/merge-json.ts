import { Action, Context, merge, sequence } from '@d0/core';
import { FileHandle, readFile } from 'fs/promises';
import { PathLike } from 'fs';

export const mergeJson = (path: PathLike | FileHandle): Action => {
  return async (ctx: Context) => {
    const text = await readFile(path, 'utf8');
    let newCtx = JSON.parse(text);
    const action = merge(newCtx);
    return await action(ctx);
  };
};
