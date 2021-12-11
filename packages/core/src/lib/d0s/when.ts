import { Action, ConditionAction } from '../types';

export const when = <TFlex = void, T = void, TD0 = void>(
  condition: ConditionAction<TFlex, T, TD0>,
  trueAction: Action<TFlex, T, TD0>,
  falseAction: Action<TFlex, T, TD0>
): Action<TFlex, T, TD0> => {
  return async ctx => {
    if (await condition(ctx)) ctx = await trueAction(ctx);
    else ctx = await falseAction(ctx);
    return ctx;
  };
};
