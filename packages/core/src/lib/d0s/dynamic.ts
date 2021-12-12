import { D0 } from '../types';

export const dynamic = <TFlex = void, TBase = void>(name: string, template: string): D0<TFlex, TBase> => {
  return ctx => {
    const names = Object.keys(ctx);
    const vals = Object.values(ctx);
    ctx[name] = new Function(...[...names], `return \`${template.replace(/`/g, '\\`')}\`;`)(...[...vals]);
    return ctx;
  };
};
