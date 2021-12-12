import { D0 } from '../types';

export const clear = <TFlex = void, TBase = void>(name: string): D0<TFlex, TBase> => {
  return ctx => {
    delete ctx[name];
    return ctx;
  };
};
