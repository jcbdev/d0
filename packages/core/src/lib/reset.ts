import { Action, Context, ContextAction } from './types';

export const reset = (): Action => {
  return (ctx: Context) => {
    return { $tmpl: {} };
  };
};
