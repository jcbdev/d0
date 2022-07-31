import { prettyAST } from '../lib/pretty-ast';

describe('prettier formatting of code ast', () => {
  it('should run prettier on a typescript input', async () => {
    let ctx: any = {
      ast: {
        type: 'Program',
        body: [
          {
            type: 'TSTypeAliasDeclaration',
            id: {
              type: 'Identifier',
              name: 'hello',
            },
            typeAnnotation: {
              type: 'TSTypeLiteral',
              members: [
                {
                  type: 'TSPropertySignature',
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'id',
                  },
                  typeAnnotation: {
                    type: 'TSTypeAnnotation',
                    typeAnnotation: {
                      type: 'TSStringKeyword',
                    },
                  },
                },
                {
                  type: 'TSPropertySignature',
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'test',
                  },
                  typeAnnotation: {
                    type: 'TSTypeAnnotation',
                    typeAnnotation: {
                      type: 'TSStringKeyword',
                    },
                  },
                },
              ],
            },
          },
        ],
        sourceType: 'script',
      },
    };
    let result = await prettyAST<any>('pretty', ctx => ctx.ast, {
      parser: 'typescript',
      filepath: 'test.ts',
      printWidth: 20,
    })(ctx);
    expect(result.pretty.formatted).toEqual(
      `type hello = {
  id: string;
  test: string;
};
`
    );
  });
});
