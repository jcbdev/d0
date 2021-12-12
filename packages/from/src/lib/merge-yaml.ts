import { D0, merge } from '@d0/core';
import { FileHandle, readFile } from 'fs/promises';
import { PathLike } from 'fs';
import yaml, { LoadOptions } from 'js-yaml';

export const mergeYaml = <TFlex = void, TBase = void>(
  path: PathLike | FileHandle,
  options?: LoadOptions
): D0<TFlex, TBase> => {
  return async ctx => {
    const text = await readFile(path, 'utf8');
    let newCtx = yaml.load(text, options) as any;
    const D0 = merge<TFlex, TBase>(newCtx);
    return await D0(ctx);
  };
};
