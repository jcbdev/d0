import { Action } from '../types';

export const dynamic = <TFlex = void, T = void, TD0 = void>(
  name: string,
  template: string
): Action<TFlex, T, TD0> => {
  return ctx => {
    const names = Object.keys(ctx);
    const vals = Object.values(ctx);
    ctx[name] = new Function(...[...names], `return \`${template.replace(/`/g, '\\`')}\`;`)(...[...vals]);
    return ctx;
  };
};
