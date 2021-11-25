import { Action, Context, ContextAction } from './types';

export const clear: ContextAction = (name: string, update?: Function): Action => {
  return (ctx: Context) => {
    delete ctx[name];
    return ctx;
  };
};
