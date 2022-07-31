import { D0 } from '../types';

export const dynamic = <T = any>(name: string, template: string): D0<T> => {
  return ctx => {
    const names = Object.keys(ctx);
    const vals = Object.values(ctx);
    ctx[name] = new Function(...[...names], `return \`${template.replace(/`/g, '\\`')}\`;`)(...[...vals]);
    return ctx;
  };
};
