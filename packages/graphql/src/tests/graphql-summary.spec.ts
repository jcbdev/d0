import { Context } from '@d0/core';
import { parse } from 'graphql';
import { graphQLSummary } from '../lib/graphql-summary';

describe('create a summary of GQL types', () => {
  it('should transform Arguments', async () => {
    let ctx: Context = {
      $tmpl: {},
      ast: {
        kind: 'Test',
        arguments: [
          {
            kind: 'Argument',
            loc: {
              end: 87,
              start: 74,
            },
            name: {
              kind: 'Name',
              loc: {
                end: 78,
                start: 74,
              },
              value: 'name',
            },
            value: {
              block: false,
              kind: 'StringValue',
              loc: {
                end: 87,
                start: 80,
              },
              value: 'hello',
            },
          },
          {
            kind: 'Argument',
            loc: {
              end: 109,
              start: 89,
            },
            name: {
              kind: 'Name',
              loc: {
                end: 94,
                start: 89,
              },
              value: 'other',
            },
            value: {
              fields: [
                {
                  kind: 'ObjectField',
                  loc: {
                    end: 107,
                    start: 98,
                  },
                  name: {
                    kind: 'Name',
                    loc: {
                      end: 102,
                      start: 98,
                    },
                    value: 'test',
                  },
                  value: {
                    kind: 'IntValue',
                    loc: {
                      end: 107,
                      start: 104,
                    },
                    value: '123',
                  },
                },
              ],
              kind: 'ObjectValue',
              loc: {
                end: 109,
                start: 96,
              },
            },
          },
          {
            kind: 'Argument',
            loc: {
              end: 131,
              start: 111,
            },
            name: {
              kind: 'Name',
              loc: {
                end: 120,
                start: 111,
              },
              value: 'something',
            },
            value: {
              kind: 'ListValue',
              loc: {
                end: 131,
                start: 122,
              },
              values: [
                {
                  kind: 'IntValue',
                  loc: {
                    end: 124,
                    start: 123,
                  },
                  value: '1',
                },
                {
                  kind: 'IntValue',
                  loc: {
                    end: 127,
                    start: 126,
                  },
                  value: '2',
                },
                {
                  kind: 'IntValue',
                  loc: {
                    end: 130,
                    start: 129,
                  },
                  value: '3',
                },
              ],
            },
          },
        ],
      },
    };

    ctx = await graphQLSummary('summary', ctx => ctx.ast)(ctx);
    expect(ctx.summary).toEqual({
      arguments: {
        name: 'hello',
        other: {
          fields: {
            test: '123',
          },
          kind: 'ObjectValue',
        },
        something: ['1', '2', '3'],
      },
      kind: 'Test',
    });
  });

  it('should transform Directive', async () => {
    let ctx: Context = {
      $tmpl: {},
      ast: {
        kind: 'Directive',
        name: {
          kind: 'Name',
          value: 'withdirective',
          loc: {
            start: 52,
            end: 65,
          },
        },
        arguments: [],
      },
    };

    ctx = await graphQLSummary('summary', ctx => ctx.ast)(ctx);
    expect(ctx.summary).toEqual({
      name: 'withdirective',
    });
  });

  it('generate a basic type', async () => {
    let gql = /* graphql */ `
  type test {
    id: ID!
    test: String
    hello: Int 
  }
      `;

    let ctx: Context = { $tmpl: {}, ast: parse(gql) };
    ctx = await graphQLSummary('summary', ctx => ctx.ast)(ctx);
    // console.log(JSON.stringify(ctx, null, 2));
    expect(ctx.summary).toEqual([
      {
        type: 'Object',
        name: 'test',
        fields: {
          id: {
            type: 'ID',
            nullable: false,
            array: false,
          },
          test: {
            type: 'String',
            nullable: true,
            array: false,
          },
          hello: {
            type: 'Int',
            nullable: true,
            array: false,
          },
        },
      },
    ]);
  });

  it('generate a basic input type', async () => {
    let gql = /* graphql */ `
  input test {
    id: ID!
    test: String
    hello: [Int] 
  }
      `;

    let ctx: Context = { $tmpl: {}, ast: parse(gql) };
    ctx = await graphQLSummary('summary', ctx => ctx.ast)(ctx);
    // console.log(JSON.stringify(ctx, null, 2));
    expect(ctx.summary).toEqual([
      {
        type: 'Input',
        name: 'test',
        fields: {
          id: {
            type: 'ID',
            nullable: false,
            array: false,
          },
          test: {
            type: 'String',
            nullable: true,
            array: false,
          },
          hello: {
            type: 'Int',
            nullable: true,
            array: true,
          },
        },
      },
    ]);
  });

  it('generate a basic type with arguments', async () => {
    let gql = /* graphql */ `
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
      `;

    let ctx: Context = { $tmpl: {}, ast: parse(gql) };
    ctx = await graphQLSummary('summary', ctx => ctx.ast)(ctx);
    console.log(JSON.stringify(ctx.ast, null, 2));
    expect(ctx.summary).toEqual([
      {
        type: 'Object',
        name: 'Starship',
        fields: {
          id: {
            type: 'ID',
            nullable: false,
            array: false,
          },
          length: {
            type: 'Float',
            nullable: true,
            array: false,
            arguments: {
              unit: {
                array: false,
                defaultValue: 'METER',
                nullable: true,
                type: 'LengthUnit',
              },
            },
          },
          name: {
            array: false,
            nullable: false,
            type: 'String',
          },
        },
      },
    ]);
  });

  // it('generate summary object', async () => {
  //   let gql = /* graphql */ `
  // type test {
  //   id: ID!
  //   test: String
  //   hello: Int @withdirective(name: "hello", other: { test: 123 }, something: [1, 2, 3])
  // }
  //     `;

  //   let ctx: Context = { $tmpl: {}, ast: parse(gql) };
  //   ctx = await graphQLSummary('summary', ctx => ctx.ast)(ctx);
  //   console.log(JSON.stringify(ctx, null, 2));
  // });
});
