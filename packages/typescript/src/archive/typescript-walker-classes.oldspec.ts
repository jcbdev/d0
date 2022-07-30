import {
  CodeContext,
  CodeD0s,
  codeD0s,
  FunctionTransforms,
  getFunctions,
  NodeD0,
  NodeState,
} from '@d0-it/code';
import { AST, TSESTree, TSESTreeOptions } from '@typescript-eslint/typescript-estree';
import { typescriptCode } from '../lib/typescript-code';
import { coreD0s, CoreD0s, Ctx } from '@d0-it/core';
import { TSCodeContext, TypescriptCtx } from '../lib/types';
import { typescriptD0s } from '../lib/typescript-d0s';
import { rename__moduleFunctionDeclarations } from '../lib/adapters/find-function';
import { updateAst } from '../lib/adapters/update-ast';
import { walkTypescript } from '../lib/walker/typescript-walker';
import { v4 as uuidv4 } from 'uuid';
import ts from 'typescript';
import { FileHandle, writeFile } from 'fs/promises';
import { PathLike } from 'fs';
import { typescriptAdapter } from '../lib/typescript-adapter';

const walkTS = async (ts: string): Promise<TypescriptCtx> => {
  let result = await typescriptCode(ts, {}, typescriptD0s, async (d0$, ctx) => {
    return d0$.d0With(
      (node, ctx) => node,
      async (nodes, ctx) => {
        ctx.$ast.ast = (await walkTypescript(ctx)) as any;
        return ctx;
      }
    )(ctx);
  })(undefined);
  for (let [k, v] of Object.entries(result.$indexes.functions)) v.node = { type: v.node.type };
  return result;
};

describe('walker', () => {
  it('ts qualified name', async () => {
    let ctx: TypescriptCtx = await walkTS(/* ts */ `
    interface test {
      get: (name:string) => number;
    };

    class TestClass extends test {
      get(name: string) {
        return 1;
      }

      #myprop: number = 1000;
    }

    class OneTwoThree extends TestClass {
      constructor() {
        super();
      }

      newProp(hello: number) {
        this.#myprop = hello;
      }
    }
    `);

    let result = ctx.$ast.ast;
    // console.log(JSON.stringify(result));
    await writeFile('/tmp/test2.json', JSON.stringify(ctx.$ast.ast, null, 2));

    expect(result).toEqual({
      type: 'Program',
      body: [
        {
          type: 'TSInterfaceDeclaration',
          statement: 'interface test {\n      get: (name:string) => number;\n    }',
          path: '$root.body.0',
          body: {
            type: 'TSInterfaceBody',
            body: [
              {
                type: 'TSPropertySignature',
                computed: false,
                key: { type: 'Identifier', name: 'get' },
                typeAnnotation: {
                  statement: ': (name:string) => number',
                  types: [
                    {
                      type: 'TSFunctionType',
                      params: [
                        {
                          type: 'Identifier',
                          name: 'name',
                          typeAnnotation: { statement: ':string', types: ['string'] },
                        },
                      ],
                      returnType: { statement: '=> number', types: ['number'] },
                    },
                  ],
                },
              },
            ],
          },
          id: { type: 'Identifier', name: 'test' },
        },
        null,
        {
          type: 'ClassDeclaration',
          statement:
            'class TestClass extends test {\n      get(name: string) {\n        return 1;\n      }\n\n      #myprop: number = 1000;\n    }',
          path: '$root.body.2',
          id: { type: 'Identifier', name: 'TestClass' },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                key: { type: 'Identifier', name: 'get' },
                value: {
                  type: 'FunctionExpression',
                  id: null,
                  generator: false,
                  expression: false,
                  async: false,
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        statement: 'return 1;',
                        path: '$root.body.2.body.body.0.value.body.body.0',
                        argument: '1',
                      },
                    ],
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'name',
                      typeAnnotation: { statement: ': string', types: ['string'] },
                    },
                  ],
                },
                computed: false,
                static: false,
                kind: 'method',
                override: false,
              },
              {
                type: 'ClassProperty',
                key: { type: 'TSPrivateIdentifier', escapedText: '#myprop' },
                value: '1000',
                computed: false,
                static: false,
                declare: false,
                override: false,
                typeAnnotation: { statement: ': number', types: ['number'] },
              },
            ],
          },
          superClass: { type: 'Identifier', name: 'test' },
        },
        {
          type: 'ClassDeclaration',
          statement:
            'class OneTwoThree extends TestClass {\n      constructor() {\n        super();\n      }\n\n      newProp(hello: number) {\n        this.#myprop = hello;\n      }\n    }',
          path: '$root.body.3',
          id: { type: 'Identifier', name: 'OneTwoThree' },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                key: { type: 'Identifier', name: 'constructor' },
                value: {
                  type: 'FunctionExpression',
                  id: null,
                  params: [],
                  generator: false,
                  expression: false,
                  async: false,
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        statement: 'super();',
                        path: '$root.body.3.body.body.0.value.body.body.0',
                        expression: { type: 'CallExpression', arguments: [], optional: false },
                      },
                    ],
                  },
                },
                computed: false,
                static: false,
                kind: 'constructor',
                override: false,
              },
              {
                type: 'MethodDefinition',
                key: { type: 'Identifier', name: 'newProp' },
                value: {
                  type: 'FunctionExpression',
                  id: null,
                  generator: false,
                  expression: false,
                  async: false,
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        statement: 'this.#myprop = hello;',
                        path: '$root.body.3.body.body.1.value.body.body.0',
                        expression: {
                          type: 'AssignmentExpression',
                          operator: '=',
                          left: 'this.#myprop',
                          right: { type: 'Identifier', name: 'hello' },
                        },
                      },
                    ],
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'hello',
                      typeAnnotation: { statement: ': number', types: ['number'] },
                    },
                  ],
                },
                computed: false,
                static: false,
                kind: 'method',
                override: false,
              },
            ],
          },
          superClass: { type: 'Identifier', name: 'TestClass' },
        },
      ],
      sourceType: 'script',
      comments: [],
    });
  });
});
