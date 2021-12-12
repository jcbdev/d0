import { D0, ResolveD0 } from '../types';
import { FileHandle, writeFile } from 'fs/promises';
import { PathLike } from 'fs';

export const output = <TFlex = void, TBase = void>(
  path: PathLike | FileHandle,
  resolve: ResolveD0<string, TFlex, TBase>
): D0<TFlex, TBase> => {
  return async ctx => {
    await writeFile(path, await resolve(ctx));
    return ctx;
  };
};
