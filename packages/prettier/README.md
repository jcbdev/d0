# @d0-it/prettier

d0-it - simple and hackable templates and code generation.

**_THIS IS ALPHA - USE AT OWN RISK!_**

## Installation

`npm install @d0-it/core`

## Packages

| Package                                            |                Description                |              Status |
| :------------------------------------------------- | :---------------------------------------: | ------------------: |
| [@d0-it/core](packages/core/README.md)             |     Main core utilities and functions     |             Working |
| [@d0-it/code](packages/code/README.md)             |          Mutate and inject code           |         Not Working |
| [@d0-it/from](packages/from/README.md)             | Plugins to input from different filetypes | Basic Functionality |
| [@d0-it/graphql](packages/graphql/README.md)       |      Functions to manipulate graphql      | Basic Functionality |
| [@d0-it/prettier](packages/prettier/README.md)     |         Output code and clean up          | Basic Functionality |
| [@d0-it/pull](packages/pull/README.md)             |           Download or pull code           | Basic Functionality |
| [@d0-it/typescript](packages/typescript/README.md) |     AST and processors for typescript     |         Not Working |
| [@d0-it/walker](packages/walker/README.md)         |       Plugin to create AST visitors       | Basic Functionality |

## Examples

See e2e-tests package

### FLEXIBLE TYPING (gql to ts)

```typescript
it('generate a type - flexible typing', async () => {
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

  let resCtx: any = await d0(ctx => {
    return sequence([
      loadGraphQL('gql', fileName),
      graphQLSummary('summary', ctx => ctx.gql),
      each(
        ctx => ctx.summary,
        [
          item =>
            eachEntry(
              () => item.fields,
              [
                (name, type) =>
                  push(
                    'typeMaps',
                    ctx =>
                      `${name}${type.nullable ? '?' : ''}: ${gqlTypeToTs(type.type)}${type.array ? '[]' : ''}`
                  ),
              ],
              {
                merge: (s, t) => ({ ...t, [item.name]: s.typeMaps.join(';\n') }),
              }
            ),
          (item, ctx) => {
            return sequence([
              push('typescript', ctx => `export type ${item.name} = { ${ctx[item.name]} };\n`),
            ]);
          },
        ]
      ),
      pretty('result', ctx => ctx.typescript.join('\n'), { parser: 'typescript', filepath: '1.ts' }),
      output(outFileName, ctx => ctx.result),
    ]);
  });

  expect(resCtx.result).toEqual(`export type Post = { id: string; comments?: Comment[]; content?: string };

export type Comment = { id: string; postId: string; message?: string };
`);

  const fileResult = await readFile(outFileName, 'utf8');
  expect(fileResult).toEqual(`export type Post = { id: string; comments?: Comment[]; content?: string };

export type Comment = { id: string; postId: string; message?: string };
`);
});
```

### STRONGLY TYPED & DIFFERENT APPROACH (gql to ts)

```typescript
it('generate a type - strongly typed', async () => {
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

  type ProcessingContext = {
    result: string;
    typescript: string;
    summary: jsTypeDefinition[];
    gql: DocumentNode;
  };

  type d0s<T = ProcessingContext> = BaseD0s<T> & CoreD0s<T> & GraphQLD0s<T> & PrettyD0s<T>;

  let resCtx = await d0<d0s<ProcessingContext>, ProcessingContext>(async (ctx, d0) => {
    return await d0.sequence([
      d0.loadGraphQL('gql', fileName),
      d0.graphQLSummary('summary', ctx => ctx.gql),
      d0.template('typescript', ({ summary }) => {
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
      d0.pretty('result', ctx => ctx.typescript, { parser: 'typescript', filepath: '1.ts' }),
      d0.output(outFileName, ctx => ctx.result),
    ]);
  });

  expect(resCtx.result).toEqual(`export type Post = {
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
```
