export type Context = {
  $tmpl: Record<string, string>;
} & Record<string, any>;
export type TemplateAction = (name: string, template: Function) => Action;
export type DynamicTemplateAction = (name: string, template: string) => Action;
export type ContextAction = (name: string, update?: Function) => Action;
export type ItemAction = (item: any, ctx: Context) => Context;
export type MergeAction = (ctx: Context, splitContext: Context) => Context;
export type Action = (ctx: Context) => Promise<Context> | Context;
export type Resolve<T> = (ctx: Context) => Promise<T> | T;
export type Condition = (ctx: Context) => Promise<boolean> | boolean;
