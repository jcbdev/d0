import { Context, DynamicTemplateAction, TemplateAction } from './types';

export const dynamic: DynamicTemplateAction = (name: string, template: string) => {
  return (values: Record<string, any>, ctx: Context) => {
    const names = Object.keys(values);
    const vals = Object.values(values);
    ctx.tmpl[name] = new Function(...[...names], `return \`${template.replace(/`/g, '\\`')}\`;`)(
      ...[...vals]
    );
    return ctx;
  };
};
