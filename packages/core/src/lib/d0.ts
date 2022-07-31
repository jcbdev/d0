import { defaultD0s, d0s, StartD0 } from '..';
import { Ctx } from './types';

export const d0 = async <TD0, DFlex = void, DBase = void>(
  action: StartD0<TD0, DFlex, DBase>,
  d0?: () => TD0 | string,
  withCtx?: Ctx<DFlex, DBase>
): Promise<Ctx<DFlex, DBase>> => {
  let $d0 = !d0 ? defaultD0s<TD0>() : typeof d0 === 'string' ? d0s<TD0>(d0) : (d0() as TD0);
  let ctx = withCtx ?? ({} as Ctx<DFlex, DBase>);
  return await (
    await action($d0, ctx)
  )(ctx);
};
