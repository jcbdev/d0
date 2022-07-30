import { code, CodeAdapter, CodeContext, NodeD0 } from '@d0/code';
import { parse, TSESTree, AST, TSESTreeOptions } from '@typescript-eslint/typescript-estree';
import { typescriptCode } from '../lib/typescript-code';

describe('typescript code modifier', () => {
  it('should execute code function', async () => {
    // let ts = /* ts */ `
    // function hello() {
    //   let x=50;
    //   return "world";
    // }
    // `;
    // let action: NodeD0<void, AST<TSESTreeOptions>, TSESTree.Node> = async (
    //   nodes: TSESTree.Node[],
    //   ctx: CodeContext<AST<TSESTreeOptions>, TSESTree.Node>
    // ) => {
    //   return ctx;
    // };
    // let ctx: any = {};
    // let result = await typescriptCode('test', ts, {}, [action], {})(ctx);
    // // console.log(result);
    // expect(result).toEqual({
    //   test: 'function hello() {\n  let x = 50;\n  return "world";\n}\n',
    // });
  });

  it('should adapt the ast', async () => {
    // let ts = /* ts */ `
    // function hello() {
    //   let x=50;
    //   return "world";
    // }
    // `;
    // let action: NodeAction<AST<TSESTreeOptions>, TSESTree.Program> = async (
    //   node: TSESTree.Program,
    //   ctx: CodeContext<AST<TSESTreeOptions>, TSESTree.Program>
    // ) => {
    //   // console.log(JSON.stringify(node, null, 2));
    //   node.body[0]['id']['name'] = 'changed';
    //   return ctx;
    // };
    // let ctx: any = {};
    // let result = await typescriptCode('test', ts, [action], {})(ctx);
    // // console.log(result);
    // expect(result).toEqual({
    //   test: 'function changed() {\n  let x = 50;\n  return "world";\n}\n',
    // });
  });
});
