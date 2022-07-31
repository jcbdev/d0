import { D0, ResolveD0 } from '../types';
import { FileHandle, writeFile } from 'fs/promises';
import { PathLike } from 'fs';

export const output = <T = any>(path: PathLike | FileHandle, resolve: ResolveD0<string, T>): D0<T> => {
  return async ctx => {
    await writeFile(path, await resolve(ctx));
    return ctx;
  };
};
