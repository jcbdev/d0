import { D0 } from '../types';

export const clear = <T = any>(name: string | string[]): D0<T> => {
  return ctx => {
    if (Array.isArray(name)) {
      name.forEach(n => delete ctx[n]);
    } else {
      delete ctx[name];
    }
    return ctx;
  };
};
