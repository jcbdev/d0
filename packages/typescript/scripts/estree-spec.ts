import { d0, sequence, template } from '@d0/core';
import { httpJson } from '@d0/pull';

const main = async () => {
  let ctx = await d0(
    sequence([
      httpJson('spec', 'https://raw.githubusercontent.com/estree/formal/master/formal-data/es6.json'),
      template('ts', ({ spec }: { spec: any }) => {
        let tmpl = '';
        Object.entries(spec).map(([k, v]) => {
          tmpl += `${k}\n`;
        });
        return tmpl;
      }),
      // pretty('result', ctx => ctx.$tmpl.baseType, { parser: 'typescript', filepath: '1.ts' }),
      // output(outFileName, ctx => ctx.result),
    ])
  );
  console.log(ctx.$tmpl.ts);
};

(async () => {
  await main();
})();
