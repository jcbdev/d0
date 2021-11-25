import { Action, Context } from './types';

export const d0 = async (action: Action, withCtx?: Context): Promise<Context> => {
  let ctx: Context = withCtx ?? {
    $tmpl: {},
  };
  return await action(ctx);
};
