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

export type FromD0s<DFlex = void, DBase = void> = {
  fromJson: <TFlex = DFlex, TBase = DBase>(name: string, path: PathLike | FileHandle) => D0<TFlex, TBase>;
  fromText: <TFlex = DFlex, TBase = DBase>(name: string, path: PathLike | FileHandle) => D0<TFlex, TBase>;
  fromYaml: <TFlex = DFlex, TBase = DBase>(
    name: string,
    path: PathLike | FileHandle,
    options?: LoadOptions
  ) => D0<TFlex, TBase>;
  mergeJson: <TFlex = DFlex, TBase = DBase>(path: PathLike | FileHandle) => D0<TFlex, TBase>;
  mergeYaml: <TFlex = DFlex, TBase = DBase>(
    path: PathLike | FileHandle,
    options?: LoadOptions
  ) => D0<TFlex, TBase>;
};

export const fromD0s: <DFlex = void, DBase = void>() => FromD0s<DFlex, DBase> = <
  DFlex = void,
  DBase = void
>() => {
  return {
    fromJson: <TFlex = DFlex, TBase = DBase>(name: string, path: PathLike | FileHandle) =>
      fromJson<Or<TFlex, DFlex>, Or<TBase, DBase>>(name, path),
    fromText: <TFlex = DFlex, TBase = DBase>(name: string, path: PathLike | FileHandle) =>
      fromText<Or<TFlex, DFlex>, Or<TBase, DBase>>(name, path),
    fromYaml: <TFlex = DFlex, TBase = DBase>(
      name: string,
      path: PathLike | FileHandle,
      options?: LoadOptions
    ) => fromYaml<Or<TFlex, DFlex>, Or<TBase, DBase>>(name, path, options),
    mergeJson: <TFlex = DFlex, TBase = DBase>(path: PathLike | FileHandle) =>
      mergeJson<Or<TFlex, DFlex>, Or<TBase, DBase>>(path),
    mergeYaml: <TFlex = DFlex, TBase = DBase>(path: PathLike | FileHandle, options?: LoadOptions) =>
      mergeYaml<Or<TFlex, DFlex>, Or<TBase, DBase>>(path, options),
  } as FromD0s<DFlex, DBase>;
};

registerD0s('from', fromD0s);
registerDefaultD0s(fromD0s);
