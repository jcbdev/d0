import { D0 } from '@d0/core';
import { parse } from 'graphql';
import { FileHandle, readFile } from 'fs/promises';
import { PathLike } from 'fs';
import path from 'path';

export const loadGraphQL = <TFlex = void, TBase = void>(
  name: string,
  path: PathLike | FileHandle
): D0<TFlex, TBase> => {
  return async ctx => {
    const text = await readFile(path, 'utf8');
    ctx[name] = parse(text);
    return ctx;
  };
};
