import { Context } from '@d0/core';
import { CodeContext, FunctionTransforms, NodeAction } from '@d0/code';
import { AST, TSESTree, TSESTreeOptions } from '@typescript-eslint/typescript-estree';
import { typescriptCode } from '../lib/typescript-code';
import { functions } from '@d0/code';

describe('modify functions', () => {
  it('should prepend code at the start of function', async () => {
    let ts = /* ts */ `
    function hello() {
      let x=50;
      return "world";
    }
    `;

    let action: NodeAction<AST<TSESTreeOptions>, TSESTree.Program> = async (
      node: TSESTree.Program,
      ctx: CodeContext<AST<TSESTreeOptions>, TSESTree.Program>
    ) => {
      return ctx;
    };

    let ctx: Context = { $tmpl: {} };

    let result = await typescriptCode(
      'test',
      ts,
      [
        functions(
          [
            mutate(),
            await async function (nodes, { prependToBody }, ctx) {
              prependToBody(nodes[0], (state, ctx) => `let me=true;`);
              return ctx;
            },
          ],
          "body.id.name='hello'"
        ),
      ],
      {}
    )(ctx);

    let result = await typescriptCode(
      'test',
      ts,
      [
        functions(
          [
            await async function (nodes, { prependToBody }, ctx) {
              prependToBody(nodes[0], (state, ctx) => `let me=true;`);
              return ctx;
            },
          ],
          "body.id.name='hello'"
        ),
      ],
      {}
    )(ctx);
    // console.log(result);
    expect(result).toEqual({
      $tmpl: {},
      test: 'function changed() {\n  let x = 50;\n  return "world";\n}\n',
    });
  });
});
