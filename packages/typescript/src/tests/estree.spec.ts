import { Context } from '@d0/core';
import { estree } from '../lib/estree';
import { prettyAST } from '@d0/prettier';
import { createSourceFile, ScriptTarget } from 'typescript';

describe('estree', () => {
  it('convert to ast', async () => {
    let ts = /* typescript */ `
let hello = "world";
function x(test: string) {
  console.log(test);
}
x(hello);
    `;

    let ctx: Context = { $tmpl: {} };
    ctx = await estree('ast', ts, {
      jsx: false,
    })(ctx);

    expect(ctx.ast).toEqual({
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'hello',
              },
              init: {
                type: 'Literal',
                value: 'world',
                raw: '"world"',
              },
            },
          ],
          kind: 'let',
        },
        {
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'x',
          },
          generator: false,
          expression: false,
          async: false,
          params: [
            {
              type: 'Identifier',
              name: 'test',
              typeAnnotation: {
                type: 'TSTypeAnnotation',
                typeAnnotation: {
                  type: 'TSStringKeyword',
                },
              },
            },
          ],
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'console',
                    },
                    property: {
                      type: 'Identifier',
                      name: 'log',
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: 'Identifier',
                      name: 'test',
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'x',
            },
            arguments: [
              {
                type: 'Identifier',
                name: 'hello',
              },
            ],
            optional: false,
          },
        },
      ],
      sourceType: 'script',
    });
  });
});
