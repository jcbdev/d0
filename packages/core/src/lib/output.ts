import { Action, Context, Resolve } from './types';
import { FileHandle, writeFile } from 'fs/promises';
import { PathLike } from 'fs';

export const output = (path: PathLike | FileHandle, resolve: Resolve<string>): Action => {
  return async (ctx: Context) => {
    await writeFile(path, await resolve(ctx));
    return ctx;
  };
};
