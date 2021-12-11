import { Ctx, ResolveAction } from '../types';

export const resolve = async <TReturn, TFlex = void, T = void, TD0 = void>(
  ctx: Ctx<TFlex, T, TD0>,
  resolveAction: ResolveAction<TReturn, TFlex, T, TD0>
): Promise<TReturn> => {
  return await resolveAction(ctx);
};
