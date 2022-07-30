import { d0, output, sequence, template, resolve, coreD0s } from '@d0/core';
import { fromD0s, fromJson } from '@d0/from';
import { pretty, prettyD0s } from '@d0/prettier';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import os from 'os';

const rndFileName = () => {
  return path.resolve(
    os.tmpdir(),
    `${(Math.random() + 1).toString(36).substring(7)}-${(Math.random() + 1).toString(36).substring(7)}.json`
  );
};

const rndFileNameTS = () => {
  return path.resolve(
    os.tmpdir(),
    `${(Math.random() + 1).toString(36).substring(7)}-${(Math.random() + 1).toString(36).substring(7)}.ts`
  );
};

describe('Generate some typescript from a JSON source', () => {
  it('generate a type', async () => {
    let fileName = rndFileName();
    let outFileName = rndFileNameTS();
    await writeFile(
      fileName,
      /* json */ `
      {
        "name": "Test",
        "properties" : {
          "id": "number",
          "test": "string"
        }
      }
      `
    );
    type jsTypeDefinition = {
      name: string;
      properties: Record<string, string>;
    };

    const configure = () => ({
      ...coreD0s<any>(),
      ...fromD0s<any>(),
      ...prettyD0s<any>(),
    });

    let resCtx: any = await d0(configure, (d0, ctx: any) => {
      return d0.sequence([
        d0.fromJson('baseType', fileName),
        d0.template('baseType', ({ baseType: { name, properties } }: { baseType: jsTypeDefinition }) => {
          let props = Object.entries(properties).map(([k, v]) => `${k}: ${v};`);
          return `export type ${name} = {
              ${props.join('\n')}
            }`;
        }),
        d0.pretty('result', ctx => ctx.baseType, { parser: 'typescript', filepath: '1.ts' }),
        d0.output(outFileName, ctx => ctx.result),
      ]);
    });
    expect(resCtx.result).toEqual(`export type Test = {
  id: number;
  test: string;
};
`);
    const fileResult = await readFile(outFileName, 'utf8');
    expect(fileResult).toEqual(`export type Test = {
  id: number;
  test: string;
};
`);
  });
});
