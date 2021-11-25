import { d0, output, sequence, template, resolve } from '@d0/core';
import { fromJson } from '@d0/from-json';
import { pretty } from '@d0/prettier';
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
    let outFileName = rndFileName();

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

    let ctx = await d0(
      sequence([
        fromJson('baseType', fileName),
        template('baseType', ({ baseType: { name, properties } }: { baseType: jsTypeDefinition }) => {
          let props = Object.entries(properties).map(([k, v]) => `${k}: ${v};`);
          return `export type ${name} = {
            ${props.join('\n')}
          }`;
        }),
        pretty('result', ctx => ctx.$tmpl.baseType, { parser: 'typescript', filepath: '1.ts' }),
        output(outFileName, ctx => ctx.result),
      ])
    );

    expect(ctx.result).toEqual(`export type Test = {
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
