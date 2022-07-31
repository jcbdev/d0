import { D0, merge } from '@d0-it/core';
import { FileHandle, readFile } from 'fs/promises';
import { PathLike } from 'fs';

export const mergeJson = <T = any>(path: PathLike | FileHandle): D0<T> => {
  return async ctx => {
    const text = await readFile(path, 'utf8');
    let newCtx = JSON.parse(text);
    const D0 = merge<T>(newCtx);
    return await D0(ctx);
  };
};
