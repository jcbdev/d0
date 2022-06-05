import { Location } from 'graphql';
import { loadGraphQL } from '../lib/load-graphql';
import path from 'path';
import os from 'os';
import { writeFile } from 'fs/promises';

describe('converts gql to ast', () => {
  it('generate ast', async () => {
    const gql = /* graphql */ `
type test 
{
  id: ID!
  someProp: String
  arrayProp: [Int]
}
    `;
    let rndFile = path.resolve(
      os.tmpdir(),
      `${(Math.random() + 1).toString(36).substring(7)}-${(Math.random() + 1).toString(36).substring(7)}.gql`
    );
    await writeFile(rndFile, gql);

    let ctx: any = {};
    ctx = await loadGraphQL('ast', rndFile)(ctx);

    expect(ctx).toMatchObject({
      ast: {
        kind: 'Document',
        definitions: [
          {
            description: undefined,
            kind: 'ObjectTypeDefinition',
            name: { kind: 'Name', value: 'test', loc: expect.any(Location) },
            interfaces: [],
            directives: [],
            fields: [
              {
                description: undefined,
                kind: 'FieldDefinition',
                name: { kind: 'Name', value: 'id', loc: expect.any(Location) },
                arguments: [],
                type: {
                  kind: 'NonNullType',
                  type: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ID', loc: expect.any(Location) },
                    loc: expect.any(Location),
                  },
                  loc: expect.any(Location),
                },
                directives: [],
                loc: expect.any(Location),
              },
              {
                description: undefined,
                kind: 'FieldDefinition',
                name: { kind: 'Name', value: 'someProp', loc: expect.any(Location) },
                arguments: [],
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'String', loc: expect.any(Location) },
                  loc: expect.any(Location),
                },
                directives: [],
                loc: expect.any(Location),
              },
              {
                description: undefined,
                kind: 'FieldDefinition',
                name: { kind: 'Name', value: 'arrayProp', loc: expect.any(Location) },
                arguments: [],
                type: {
                  kind: 'ListType',
                  type: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'Int', loc: expect.any(Location) },
                    loc: expect.any(Location),
                  },
                  loc: expect.any(Location),
                },
                directives: [],
                loc: expect.any(Location),
              },
            ],
            loc: expect.any(Location),
          },
        ],
        loc: expect.any(Location),
      },
    });
  });
});
