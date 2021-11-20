import { Action, Context, TemplateAction } from './types';

export const template: TemplateAction = (name: string, template: Function): Action => {
  return (values: Record<string, any>, ctx: Context) => {
    ctx.tmpl[name] = template(values, ctx);
    return ctx;
  };
};
