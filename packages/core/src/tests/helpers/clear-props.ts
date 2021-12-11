export const clearProps = (ctx: any, ...props: string[]) => {
  for (let prop of props) delete ctx[prop];
  return ctx;
};
