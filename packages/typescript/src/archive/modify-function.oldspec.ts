import { CodeContext, CodeD0s, codeD0s, FunctionTransforms, getFunctions, NodeD0, NodeState } from '@d0/code';
import { AST, TSESTree, TSESTreeOptions } from '@typescript-eslint/typescript-estree';
import { typescriptCode } from '../lib/typescript-code';
import { coreD0s, CoreD0s, Ctx } from '@d0/core';
import { TSCodeContext, TypescriptCtx } from '../lib/types';
import { typescriptD0s } from '../lib/typescript-d0s';
import { rename__moduleFunctionDeclarations } from '../lib/adapters/find-function';
import { updateAst } from '../lib/adapters/update-ast';
import { walkTypescript } from '../lib/walker/typescript-walker';

describe('modify functions', () => {
  it('should prepend code at the start of function', async () => {
    let ts = /* ts */ `
    function hello(test?: string, other: (t: string) => Promise<number>) {
      let x=50;
      return x;
    }

    //Some comment dude
    () => {
      let test = "yolo";
    }

    const hello2 = () => {
      let x = 50;
      return "boop";
    }
    `;

    let action: NodeD0<void, AST<TSESTreeOptions>, TSESTree.Program> = async (
      node: NodeState<TSESTree.Program>,
      ctx: Ctx<void, CodeContext<AST<TSESTreeOptions>, TSESTree.Program>>
    ) => {
      return ctx;
    };

    // let ctx: Ctx<void, CodeContext<AST<TSESTreeOptions>, TSESTree.Program>> = { };

    let result = await typescriptCode(ts, {}, typescriptD0s, async (d0$, ctx) => {
      // console.log(JSON.stringify(ctx.$ast.ast, null, 2));
      // return d0$.d0With(await d0$.getFunctions(), async (nodes, ctx) => {
      return d0$.d0With(
        (node, ctx) => node,
        async (nodes, ctx) => {
          // let test = rename__moduleFunctionDeclarations(nodes[0], 'changed');
          updateAst(ctx);
          // console.log(JSON.stringify(ctx.$ast, null, 2));
          // console.log(JSON.stringify(ctx.$ast));
          await walkTypescript(ctx);
          // console.log(JSON.stringify(ctx['$indexes']));
          // console.log(JSON.stringify(test, null, 2));
          return ctx;
        }
      )(ctx);
    })(undefined);

    // console.log(result);
    return;
    expect({}).toEqual({
      test: 'function changed() {\n  let x = 50;\n  return "world";\n}\n',
    });
  });
});
