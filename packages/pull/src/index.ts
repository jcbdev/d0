export { httpText } from './lib/http-text';
export { httpJson } from './lib/http-json';
import { httpText } from './lib/http-text';
import { httpJson } from './lib/http-json';
import { D0, Or, registerD0s, registerDefaultD0s } from '@d0-it/core';

export type PullD0s<D> = {
  httpJson: <T = D>(name: string, url: string) => D0<T>;
  httpText: <T = D>(name: string, url: string) => D0<T>;
};

export const pullD0s: <D = any>() => PullD0s<D> = <D = any>() => {
  return {
    httpJson: <T = D>(name: string, url: string) => httpJson<Or<T, D>>(name, url),
    httpText: <T = D>(name: string, url: string) => httpText<Or<T, D>>(name, url),
  } as PullD0s<D>;
};

registerD0s('pull', pullD0s);
registerDefaultD0s(pullD0s);
