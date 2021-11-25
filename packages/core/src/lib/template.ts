import { Action, Context, TemplateAction } from './types';

export const template: TemplateAction = (name: string, template: Function): Action => {
  return (ctx: Context) => {
    ctx.$tmpl[name] = template(ctx);
    return ctx;
  };
};
