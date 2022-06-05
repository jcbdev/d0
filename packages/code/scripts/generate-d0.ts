import { d0, sequence, template, output } from '@d0/core';
import { fromText } from '@d0/from';
import { pretty } from '@d0/prettier';

const main = async () => {
  // let ctx = await d0(
  //   sequence([
  //     fromText('action', '../../core/src/lib/clear.ts'),
  //     template('ts', ({ action }: { action: string }) => {
  //       let output = action;
  //       output = output.replace('Action', 'FunctionNodeAction<TAst = any, TNode = any>');
  //       output = output.replace('return (ctx: Context) => {', 'return (node, transforms, ctx) => {');
  //       output = output.replace('await action(node, transforms, ctx);', '');
  //       console.log(output);
  //       return output;
  //     }),
  //     pretty('result', ctx => ctx.ts, { parser: 'typescript', filepath: '1.ts' }),
  //     output('../src/lib/functions/clear.ts', ctx => ctx.result),
  //   ])
  // );
  // console.log(ctx);
};

(async () => {
  await main();
})();
