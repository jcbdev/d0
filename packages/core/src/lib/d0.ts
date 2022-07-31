import { defaultD0s, d0s, StartD0 } from '..';
import { Ctx } from './types';

export const d0 = async <TD0 = any, D = any>(
  action: StartD0<TD0, D>,
  withCtx?: Ctx<D>,
  d0?: () => TD0 | string
): Promise<Ctx<D>> => {
  let $d0 = !d0 ? defaultD0s<TD0>() : typeof d0 === 'string' ? d0s<TD0>(d0) : (d0() as TD0);
  let ctx = withCtx ?? ({} as Ctx<D>);
  return await (
    await action(ctx, $d0)
  )(ctx);
};
