import { D0, ResolveD0 } from '../types';

export const template = <T = any>(name: string, template: ResolveD0<string, T>): D0<T> => {
  return async ctx => {
    ctx[name] = await template(ctx);
    return ctx;
  };
};
