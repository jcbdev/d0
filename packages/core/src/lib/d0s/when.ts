import { D0, ConditionD0 } from '../types';

export const when = <TFlex = void, TBase = void>(
  condition: ConditionD0<TFlex, TBase>,
  trueD0: D0<TFlex, TBase>,
  falseD0: D0<TFlex, TBase>
): D0<TFlex, TBase> => {
  return async ctx => {
    if (await condition(ctx)) ctx = await trueD0(ctx);
    else ctx = await falseD0(ctx);
    return ctx;
  };
};
