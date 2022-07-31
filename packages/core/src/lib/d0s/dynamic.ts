import { D0 } from '../types';

export const dynamic = <T = any, TCtx = any>(name: string, template: string, withCtx?: TCtx): D0<T> => {
  return ctx => {
    const names = Object.keys(withCtx ?? ctx);
    const vals = Object.values(withCtx ?? ctx);
    ctx[name] = new Function(...[...names], `return \`${template.replace(/`/g, '\\`')}\`;`)(...[...vals]);
    return ctx;
  };
};
