import { D0 } from '@d0-it/core';
import { FileHandle, readFile } from 'fs/promises';
import { PathLike } from 'fs';
import yaml, { LoadOptions } from 'js-yaml';

export const fromYaml = <TFlex = void, TBase = void>(
  name: string,
  path: PathLike | FileHandle,
  options?: LoadOptions
): D0<TFlex, TBase> => {
  return async ctx => {
    const text = await readFile(path, 'utf8');
    ctx[name] = yaml.load(text, options);
    return ctx;
  };
};
