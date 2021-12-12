import { Ctx, ResolveD0 } from '../types';

export const resolve = async <TReturn, TFlex = void, TBase = void>(
  ctx: Ctx<TFlex, TBase>,
  $resolve: ResolveD0<TReturn, TFlex, TBase>
): Promise<TReturn> => {
  return await $resolve(ctx);
};
