import { Context } from '@d0/core';
import { Location } from 'graphql';
import { graphQL } from '../lib/graphql';

describe('converts gql to AST', () => {
  it('generate AST', async () => {
    const gql = /* graphql */ `
type test {
  id: ID!
  someProp: String
  arrayProp: [Int]
}
    `;

    let ctx: Context = { $tmpl: {} };
    ctx = await graphQL('ast', gql)(ctx);
    // expect(ctx).toEqual({});
    expect(ctx).toMatchObject({
      $tmpl: {},
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
