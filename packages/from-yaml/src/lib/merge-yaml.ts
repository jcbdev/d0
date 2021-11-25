import { Action, Context, merge, sequence } from '@d0/core';
import { FileHandle, readFile } from 'fs/promises';
import { PathLike } from 'fs';
import yaml, { LoadOptions } from 'js-yaml';

export const mergeYaml = (path: PathLike | FileHandle, options?: LoadOptions): Action => {
  return async (ctx: Context) => {
    const text = await readFile(path, 'utf8');
    let newCtx = yaml.load(text, options) as any;
    const action = merge(newCtx);
    return await action(ctx);
  };
};
