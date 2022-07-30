import { CodeContext, CodeD0s, codeD0s, FunctionTransforms, getFunctions, NodeD0, NodeState } from '@d0/code';
import { AST, TSESTree, TSESTreeOptions } from '@typescript-eslint/typescript-estree';
import { typescriptCode } from '../lib/typescript-code';
import { coreD0s, CoreD0s, Ctx } from '@d0/core';
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

describe('walker', () => {
  it('member expression', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: 'info.nodeAncestors',
        ast: {
          type: 'MemberExpression',
          object: {
            name: 'info',
            statement: 'info',
          },
          property: {
            name: 'nodeAncestors',
            statement: 'nodeAncestors',
          },
          computed: false,
          optional: false,
          range: [0, 20],
          loc: {
            start: {
              line: 84,
              column: 42,
            },
            end: {
              line: 84,
              column: 60,
            },
          },
        },
      } as any,
      $adapter: typescriptAdapter,
      $originalAst: null,
      $updates: null,
      $indexes: { functions: {} },
    };

    let result = await walkTypescript(ctx);
    // console.log(JSON.stringify(result.$indexes));

    expect(result).toEqual('info.nodeAncestors');
  });

  it('chain expression', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: 'info.parent?.type',
        ast: {
          type: 'ChainExpression',
          expression: 'info.parent?.type',
          range: [0, 17],
          loc: {
            start: {
              line: 58,
              column: 16,
            },
            end: {
              line: 58,
              column: 33,
            },
          },
        },
      } as any,
      $adapter: typescriptAdapter,
      $originalAst: null,
      $updates: null,
      $indexes: { functions: {} },
    };

    let result = await walkTypescript(ctx);
    // console.log(JSON.stringify(result.$indexes));

    expect(result).toEqual('info.parent?.type');
  });

  it('binary expression', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: "info.parent?.type == 'VariableDeclarator'",
        ast: {
          type: 'BinaryExpression',
          operator: '==',
          left: 'info.parent?.type',
          right: "'VariableDeclarator'",
          range: [0, 41],
          loc: {
            start: {
              line: 58,
              column: 16,
            },
            end: {
              line: 58,
              column: 57,
            },
          },
        },
      } as any,
      $adapter: typescriptAdapter,
      $originalAst: null,
      $updates: null,
      $indexes: { functions: {} },
    };

    let result = await walkTypescript(ctx);
    // console.log(JSON.stringify(result.$indexes));

    expect(result).toEqual({
      left: 'info.parent?.type',
      operator: '==',
      right: "'VariableDeclarator'",
      // statement: "info.parent?.type == 'VariableDeclarator'",
      type: 'BinaryExpression',
    });
  });

  it('update expression', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: 'id++',
        ast: {
          type: 'UpdateExpression',
          operator: '++',
          prefix: false,
          argument: {
            name: 'id',
            statement: 'id',
          },
          range: [0, 4],
          loc: {
            start: {
              line: 18,
              column: 8,
            },
            end: {
              line: 18,
              column: 12,
            },
          },
        },
      } as any,
      $adapter: typescriptAdapter,
      $originalAst: null,
      $updates: null,
      $indexes: { functions: {} },
    };

    let result = await walkTypescript(ctx);
    // console.log(JSON.stringify(result.$indexes));

    expect(result).toEqual('id++');
  });

  it('ts as expression', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: 'id as number',
        ast: {
          type: 'TSAsExpression',
          expression: {
            name: 'id',
            statement: 'id',
          },
          typeAnnotation: 'number',
          range: [0, 12],
          loc: {
            start: {
              line: 23,
              column: 10,
            },
            end: {
              line: 23,
              column: 22,
            },
          },
        },
      } as any,
      $adapter: typescriptAdapter,
      $originalAst: null,
      $updates: null,
      $indexes: { functions: {} },
    };

    let result = await walkTypescript(ctx);
    // console.log(JSON.stringify(result.$indexes));

    expect(result).toEqual({ statement: 'id as number', types: ['number'] });
  });

  it('assignment expression', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: 'node = updateNodeId(node, info) as any',
        ast: {
          type: 'AssignmentExpression',
          operator: '=',
          left: 'node',
          right: {
            statement: 'updateNodeId(node, info) as any',
            types: ['any'],
          },
          range: [0, 38],
          loc: {
            start: {
              line: 41,
              column: 12,
            },
            end: {
              line: 41,
              column: 50,
            },
          },
        },
      } as any,
      $adapter: typescriptAdapter,
      $originalAst: null,
      $updates: null,
      $indexes: { functions: {} },
    };

    let result = await walkTypescript(ctx);
    // console.log(JSON.stringify(result.$indexes));

    expect(result).toEqual({
      left: 'node',
      operator: '=',
      right: {
        statement: 'updateNodeId(node, info) as any',
        types: ['any'],
      },
      // statement: 'node = updateNodeId(node, info) as any',
      type: 'AssignmentExpression',
    });
  });

  it('conditional expression', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode:
          "info.parent?.type == 'VariableDeclarator'\n                  ? (info.parent.id as TSESTree.Identifier).name\n                  : info.index",
        ast: {
          type: 'ConditionalExpression',
          test: {
            type: 'BinaryExpression',
            left: 'info.parent?.type',
            right: "'VariableDeclarator'",
            operator: '==',
            statement: "info.parent?.type == 'VariableDeclarator'",
          },
          consequent: '(info.parent.id as TSESTree.Identifier).name',
          alternate: 'info.index',
          range: [0, 137],
          loc: {
            start: {
              line: 68,
              column: 16,
            },
            end: {
              line: 70,
              column: 30,
            },
          },
        },
      } as any,
      $adapter: typescriptAdapter,
      $originalAst: null,
      $updates: null,
      $indexes: { functions: {} },
    };

    let result = await walkTypescript(ctx);
    // console.log(JSON.stringify(result.$indexes));

    expect(result).toEqual({
      type: 'ConditionalExpression',
      test: {
        type: 'BinaryExpression',
        left: 'info.parent?.type',
        right: "'VariableDeclarator'",
        operator: '==',
        // statement: "info.parent?.type == 'VariableDeclarator'",
      },
      consequent: '(info.parent.id as TSESTree.Identifier).name',
      alternate: 'info.index',
      // statement:
      // "info.parent?.type == 'VariableDeclarator'\n                  ? (info.parent.id as TSESTree.Identifier).name\n                  : info.index",
    });
  });

  it('arrow function expression', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: '(node, info, ctx) => {\n            return node;\n          }',
        ast: {
          type: 'ArrowFunctionExpression',
          generator: false,
          id: null,
          params: ['node', 'info', 'ctx'],
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ReturnStatement',
                argument: 'node',
                statement: 'return node;',
              },
            ],
            statement: '{\n            return node;\n          }',
          },
          async: false,
          expression: false,
          range: [0, 61],
          loc: {
            start: {
              line: 34,
              column: 26,
            },
            end: {
              line: 36,
              column: 11,
            },
          },
        },
      } as any,
      $adapter: typescriptAdapter,
      $originalAst: null,
      $updates: null,
      $indexes: { functions: {} },
    };

    let result = await walkTypescript(ctx);
    // console.log(JSON.stringify(result));

    expect(result).toEqual({
      type: 'ArrowFunctionExpression',
      params: ['node', 'info', 'ctx'],
      body: {
        type: 'BlockStatement',
        body: [
          {
            path: '$root.body.body.0',
            type: 'ReturnStatement',
            argument: 'node',
          },
        ],
      },
      expression: false,
      async: false,
      generator: false,
      id: null,
      // statement: '(node, info, ctx) => {\n            return node;\n          }',
    });
  });

  it.skip('TODO: function expression', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: '(node, info, ctx) => {\n            return node;\n          }',
        ast: {
          type: 'ArrowFunctionExpression',
          generator: false,
          id: null,
          params: ['node', 'info', 'ctx'],
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ReturnStatement',
                argument: 'node',
                statement: 'return node;',
              },
            ],
            statement: '{\n            return node;\n          }',
          },
          async: false,
          expression: false,
          range: [0, 61],
          loc: {
            start: {
              line: 34,
              column: 26,
            },
            end: {
              line: 36,
              column: 11,
            },
            $$id: 394,
          },
          $$id: 381,
          $$fragment: '(node, info, ctx) => {\n            return node;\n          }',
        },
      } as any,
      $adapter: typescriptAdapter,
      $originalAst: null,
      $updates: null,
      $indexes: { functions: {} },
    };

    let result = await walkTypescript(ctx);
    // console.log(JSON.stringify(result));

    expect(result).toEqual({
      type: 'ArrowFunctionExpression',
      arguments: ['node', 'info', 'ctx'],
      body: { type: 'BlockStatement', body: [{ type: 'ReturnStatement', argument: 'node' }] },
      expression: false,
      async: false,
      generator: false,
      statement: '(node, info, ctx) => {\n            return node;\n          }',
    });
  });
});
