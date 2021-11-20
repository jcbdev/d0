export type Context = {
  tmpl: Record<string, string>;
  values: Record<string, any>;
};
export type TemplateAction = (name: string, template: Function) => Action;
export type DynamicTemplateAction = (name: string, template: string) => Action;
export type ContextAction = (name: string, update?: Function) => Action;
export type Action = (values: Record<string, any>, ctx: Context) => Context;
export type Resolve = (ctx: Context) => string;
export type Condition = (values: Record<string, any>, ctx: Context) => boolean;
