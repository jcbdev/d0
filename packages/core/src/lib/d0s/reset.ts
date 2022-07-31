import { D0, Ctx } from '../types';

export const reset = <T = any>(): D0<T> => {
  return ctx => {
    return {} as Ctx<T>;
  };
};
