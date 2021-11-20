import { Action, Context, ContextAction } from './types';

export const clear: ContextAction = (name: string, update?: Function): Action => {
  return (values: Record<string, any>, ctx: Context) => {
    delete ctx.values[name];
    return ctx;
  };
};
