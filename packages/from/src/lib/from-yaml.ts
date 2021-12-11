import { Action, Context } from '@d0/core';
import { FileHandle, readFile } from 'fs/promises';
import { PathLike } from 'fs';
import yaml, { LoadOptions } from 'js-yaml';

export const fromYaml = (name: string, path: PathLike | FileHandle, options?: LoadOptions): Action => {
  return async (ctx: Context) => {
    const text = await readFile(path, 'utf8');
    ctx[name] = yaml.load(text, options);
    return ctx;
  };
};
