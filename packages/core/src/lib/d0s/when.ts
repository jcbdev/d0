import { D0, ConditionD0 } from '../types';

export const when = <T = any>(condition: ConditionD0<T>, trueD0: D0<T>, falseD0: D0<T>): D0<T> => {
  return async ctx => {
    if (await condition(ctx)) ctx = await trueD0(ctx);
    else ctx = await falseD0(ctx);
    return ctx;
  };
};
