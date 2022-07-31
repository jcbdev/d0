import { D0 } from '../types';

export const clear = <T = any>(name: string): D0<T> => {
  return ctx => {
    delete ctx[name];
    return ctx;
  };
};
