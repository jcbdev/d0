import { Action, Context, Resolve } from './types';

export const resolve = async <T>(ctx: Context, resolveAction: Resolve<T>): Promise<T> => {
  return await resolveAction(ctx);
};
