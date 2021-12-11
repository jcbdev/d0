import { Action, AnyContext } from '@d0/core';
import { FileHandle, readFile } from 'fs/promises';
import { PathLike } from 'fs';

export type FromJson = <T extends any, TCtx extends AnyContext<T>>(
  name: string,
  path: PathLike | FileHandle
) => Action<T, TCtx>;

export const fromJson = <T extends any, TCtx extends AnyContext<T>>(
  name: string,
  path: PathLike | FileHandle
): Action<T, TCtx> => {
  return async ctx => {
    const text = await readFile(path, 'utf8');
    ctx[name] = JSON.parse(text);
    return ctx;
  };
};
