export { httpText } from './lib/http-text';
export { httpJson } from './lib/http-json';
import { httpText } from './lib/http-text';
import { httpJson } from './lib/http-json';
import { D0, Or, registerD0s, registerDefaultD0s } from '@d0-it/core';

export type PullD0s<DFlex = void, DBase = void> = {
  httpJson: <TFlex = DFlex, TBase = DBase>(name: string, url: string) => D0<TFlex, TBase>;
  httpText: <TFlex = DFlex, TBase = DBase>(name: string, url: string) => D0<TFlex, TBase>;
};

export const pullD0s: <DFlex = void, DBase = void>() => PullD0s<DFlex, DBase> = <
  DFlex = void,
  DBase = void
>() => {
  return {
    httpJson: <TFlex = DFlex, TBase = DBase>(name: string, url: string) =>
      httpJson<Or<TFlex, DFlex>, Or<TBase, DBase>>(name, url),
    httpText: <TFlex = DFlex, TBase = DBase>(name: string, url: string) =>
      httpText<Or<TFlex, DFlex>, Or<TBase, DBase>>(name, url),
  } as PullD0s<DFlex, DBase>;
};

registerD0s('pull', pullD0s);
registerDefaultD0s(pullD0s);
