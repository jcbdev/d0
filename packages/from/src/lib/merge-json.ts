import { D0, merge } from '@d0-it/core';
import { FileHandle, readFile } from 'fs/promises';
import { PathLike } from 'fs';

export const mergeJson = <TFlex = void, TBase = void>(path: PathLike | FileHandle): D0<TFlex, TBase> => {
  return async ctx => {
    const text = await readFile(path, 'utf8');
    let newCtx = JSON.parse(text);
    const D0 = merge<TFlex, TBase>(newCtx);
    return await D0(ctx);
  };
};
