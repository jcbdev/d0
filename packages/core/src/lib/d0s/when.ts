import { D0, ConditionD0 } from '../types';
import { __shuffleTemps, __shuffleBlockTemps, __directExec } from './utils';

export const when = <T = any>(
  condition: ConditionD0<T>,
  trueD0: D0<T> | D0<T>[],
  falseD0?: D0<T> | D0<T>[]
): D0<T> => {
  return async ctx => {
    if (await condition(ctx)) {
      ctx = await __directExec(ctx, trueD0, ['ctxStub']);
    } else if (falseD0) {
      ctx = await __directExec(ctx, falseD0, ['ctxStub']);
    }
    ctx = __shuffleTemps(ctx);
    // ctx = __shuffleBlockTemps(ctx);
    return ctx;
  };
};
