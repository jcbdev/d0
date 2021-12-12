import { StartD0 } from '..';
import { Ctx } from './types';

export const d0 = async <TD0, DFlex = void, DBase = void>(
  d0: () => TD0,
  action: StartD0<TD0, DFlex, DBase>,
  withCtx?: Ctx<DFlex, DBase>
): Promise<Ctx<DFlex, DBase>> => {
  let $d0 = d0();
  let ctx = withCtx ?? ({} as Ctx<DFlex, DBase>);
  return await action($d0, ctx);
};
