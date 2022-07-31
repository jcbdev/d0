import { defaultD0s, d0s, StartD0 } from '..';
import { __d0s } from './d0s/utils';
import { Ctx } from './types';

export const d0 = async <T = any, TD0 = any>(
  action: StartD0<TD0, T>,
  options?: {
    withCtx?: Ctx<T>;
    d0?: () => TD0 | string;
  }
): Promise<Ctx<T>> => {
  let $d0 = __d0s(options?.d0);
  let ctx = options?.withCtx ?? ({} as Ctx<T>);
  return await (
    await action(ctx, $d0)
  )(ctx);
};
