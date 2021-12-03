import { d0, output, sequence, template, resolve } from '@d0/core';
import { loadGraphQL, graphQLSummary } from '@d0/graphql';
import { pretty } from '@d0/prettier';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import os from 'os';

const rndFileName = () => {
  return path.resolve(
    os.tmpdir(),
    `${(Math.random() + 1).toString(36).substring(7)}-${(Math.random() + 1).toString(36).substring(7)}.gql`
  );
};

const rndFileNameTS = () => {
  return path.resolve(
    os.tmpdir(),
    `${(Math.random() + 1).toString(36).substring(7)}-${(Math.random() + 1).toString(36).substring(7)}.ts`
  );
};

describe('Generate some typescript from a graphql source', () => {
  it('generate a type', async () => {
    let fileName = rndFileName();
    let outFileName = rndFileNameTS();

    await writeFile(
      fileName,
      /* graphql */ `
type Post {
  id: ID!
  comments: [Comment]
  content: String
}

type Comment {
  id: ID!
  postId: ID!
  message: String
}
    `
    );

    type jsTypeDefinition = {
      name: string;
      type: string;
      fields: Record<
        string,
        {
          type: string;
          nullable: boolean;
          array: boolean;
          arguments?: Record<
            string,
            {
              type: string;
              nullable: boolean;
              array: boolean;
              defaultValue?: any;
            }
          >;
        }
      >;
    };

    let ctx = await d0(
      sequence([
        loadGraphQL('gql', fileName),
        graphQLSummary('summary', ctx => ctx.gql),
        template('typescript', ({ summary }: { summary: jsTypeDefinition[] }) => {
          let ts = '';

          const gqlTypeToTs = (type: string) => {
            switch (type) {
              case 'String':
                return 'string';
              case 'Int':
                return 'number';
              case 'Float':
                return 'number';
              case 'ID':
                return 'string';
              default:
                return type;
            }
          };

          for (let type of summary) {
            let props = Object.entries(type.fields).map(
              ([k, v]) => `${k}${v.nullable ? '?' : ''}: ${gqlTypeToTs(v.type)}${v.array ? '[]' : ''};`
            );
            ts += `export type ${type.name} = {
              ${props.join('\n')}
            }\n`;
          }
          return ts;
        }),
        pretty('result', ctx => ctx.$tmpl.typescript, { parser: 'typescript', filepath: '1.ts' }),
        output(outFileName, ctx => ctx.result),
      ])
    );

    expect(ctx.result).toEqual(`export type Post = {
  id: string;
  comments?: Comment[];
  content?: string;
};
export type Comment = {
  id: string;
  postId: string;
  message?: string;
};
`);

    const fileResult = await readFile(outFileName, 'utf8');
    expect(fileResult).toEqual(`export type Post = {
  id: string;
  comments?: Comment[];
  content?: string;
};
export type Comment = {
  id: string;
  postId: string;
  message?: string;
};
`);
  });
});
