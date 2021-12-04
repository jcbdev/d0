import { Action, Context, ContextAction } from './types';

export const clearTemplate: ContextAction = (name: string, update?: Function): Action => {
  return (ctx: Context) => {
    delete ctx.$tmpl[name];
    return ctx;
  };
};
