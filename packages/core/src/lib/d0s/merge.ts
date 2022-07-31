import { D0, Ctx } from '../types';

export const merge = <T = any>(updateCtx: Ctx<T>): D0<T> => {
  return ctx => {
    return {
      ...ctx,
      ...updateCtx,
    };
  };
};
