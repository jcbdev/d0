export { fromJson } from './lib/from-json';
export { fromText } from './lib/from-text';
export { fromYaml } from './lib/from-yaml';
export { mergeJson } from './lib/merge-json';
export { mergeYaml } from './lib/merge-yaml';
import { D0, Or, registerD0s, registerDefaultD0s } from '@d0-it/core';

import { FileHandle } from 'fs/promises';
import { PathLike } from 'fs';
import { LoadOptions } from 'js-yaml';
import { fromJson } from './lib/from-json';
import { fromText } from './lib/from-text';
import { fromYaml } from './lib/from-yaml';
import { mergeJson } from './lib/merge-json';
import { mergeYaml } from './lib/merge-yaml';

export type FromD0s<T = any> = {
  fromJson: <T>(name: string, path: PathLike | FileHandle) => D0<T>;
  fromText: <T>(name: string, path: PathLike | FileHandle) => D0<T>;
  fromYaml: <T>(name: string, path: PathLike | FileHandle, options?: LoadOptions) => D0<T>;
  mergeJson: <T>(path: PathLike | FileHandle) => D0<T>;
  mergeYaml: <T>(path: PathLike | FileHandle, options?: LoadOptions) => D0<T>;
};

export const fromD0s: <D = any>() => FromD0s<D> = <D = any>() => {
  return {
    fromJson: <T>(name: string, path: PathLike | FileHandle) => fromJson<Or<T, D>>(name, path),
    fromText: <T>(name: string, path: PathLike | FileHandle) => fromText<Or<T, D>>(name, path),
    fromYaml: <T>(name: string, path: PathLike | FileHandle, options?: LoadOptions) =>
      fromYaml<Or<T, D>>(name, path, options),
    mergeJson: <T>(path: PathLike | FileHandle) => mergeJson<Or<T, D>>(path),
    mergeYaml: <T>(path: PathLike | FileHandle, options?: LoadOptions) => mergeYaml<Or<T, D>>(path, options),
  } as FromD0s<D>;
};

registerD0s('from', fromD0s);
registerDefaultD0s(fromD0s);
