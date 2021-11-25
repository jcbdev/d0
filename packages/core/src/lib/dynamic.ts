import { Context, DynamicTemplateAction, TemplateAction } from './types';

export const dynamic: DynamicTemplateAction = (name: string, template: string) => {
  return (ctx: Context) => {
    const names = Object.keys(ctx);
    const vals = Object.values(ctx);
    ctx.$tmpl[name] = new Function(...[...names], `return \`${template.replace(/`/g, '\\`')}\`;`)(
      ...[...vals]
    );
    return ctx;
  };
};
