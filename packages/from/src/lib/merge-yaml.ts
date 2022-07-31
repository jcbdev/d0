import { D0, merge } from '@d0-it/core';
import { FileHandle, readFile } from 'fs/promises';
import { PathLike } from 'fs';
import yaml, { LoadOptions } from 'js-yaml';

export const mergeYaml = <T = any>(path: PathLike | FileHandle, options?: LoadOptions): D0<T> => {
  return async ctx => {
    const text = await readFile(path, 'utf8');
    let newCtx = yaml.load(text, options) as any;
    const D0 = merge<T>(newCtx);
    return await D0(ctx);
  };
};
