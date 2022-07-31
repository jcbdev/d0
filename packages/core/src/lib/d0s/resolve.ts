import { Ctx, ResolveD0 } from '../types';

export const resolve = async <TReturn = any, T = any>(
  ctx: Ctx<T>,
  $resolve: ResolveD0<TReturn, T>
): Promise<TReturn> => {
  return await $resolve(ctx);
};
