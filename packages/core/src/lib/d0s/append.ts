import { D0, ResolveD0 } from '../types';
import { FileHandle, appendFile } from 'fs/promises';
import { PathLike } from 'fs';

export const append = <T = any>(path: PathLike | FileHandle, resolve: ResolveD0<string, T>): D0<T> => {
  return async ctx => {
    await appendFile(path, await resolve(ctx));
    return ctx;
  };
};
