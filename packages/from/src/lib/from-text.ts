import { D0 } from '@d0-it/core';
import { FileHandle, readFile } from 'fs/promises';
import { PathLike } from 'fs';

export const fromText = <T = any>(name: string, path: PathLike | FileHandle): D0<T> => {
  return async ctx => {
    const text = await readFile(path, 'utf8');
    ctx[name] = text;
    return ctx;
  };
};
