import { D0 } from '@d0-it/core';
import { parse } from 'graphql';
import { FileHandle, readFile } from 'fs/promises';
import { PathLike } from 'fs';
import path from 'path';

export const loadGraphQL = <T = any>(name: string, path: PathLike | FileHandle): D0<T> => {
  return async ctx => {
    const text = await readFile(path, 'utf8');
    ctx[name] = parse(text);
    return ctx;
  };
};
