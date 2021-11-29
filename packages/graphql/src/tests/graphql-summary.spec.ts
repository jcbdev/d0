import { Context } from '@d0/core';
import { parse } from 'graphql';
import { graphQLSummary } from '../lib/graphql-summary';

describe('create a summary of GQL types', () => {
  it('generate summary object', async () => {
    let gql = /* graphql */ `
type test {
  id: ID!
  test: String
  hello: Int @withdirective(name: "hello", other: { test: 123 }, something: [1, 2, 3])
}
    `;

    let ctx: Context = { $tmpl: {}, ast: parse(gql) };
    ctx = await graphQLSummary('summary', ctx => ctx.ast)(ctx);
    console.log(JSON.stringify(ctx, null, 2));
  });
});
