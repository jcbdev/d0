import { D0, Ctx } from '../types';

export const merge = <TFlex = void, TBase = void>(updateCtx: Ctx<TFlex, TBase>): D0<TFlex, TBase> => {
  return ctx => {
    return {
      ...ctx,
      ...updateCtx,
    };
  };
};
