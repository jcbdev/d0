import { Action, ResolveAction } from '../types';
import { FileHandle, writeFile } from 'fs/promises';
import { PathLike } from 'fs';

export const output = <TFlex = void, T = void, TD0 = void>(
  path: PathLike | FileHandle,
  resolve: ResolveAction<string, TFlex, T, TD0>
): Action<TFlex, T, TD0> => {
  return async ctx => {
    await writeFile(path, await resolve(ctx));
    return ctx;
  };
};
