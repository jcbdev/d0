import { D0, ResolveD0 } from '../types';
import { FileHandle, appendFile, mkdir } from 'fs/promises';
import { PathLike } from 'fs';
import { dirname } from 'path';

export const append = <T = any>(path: PathLike | FileHandle, resolve: ResolveD0<string, T>): D0<T> => {
  return async ctx => {
    await mkdir(dirname(path.toString()), { recursive: true });
    await appendFile(path, await resolve(ctx));
    return ctx;
  };
};
