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

describe('walker', () => {
  it('return statement', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: "return { intention: 'PROCESS', node: updateNodeId(node, info) };",
        ast: {
          type: 'ReturnStatement',
          argument: {
            type: 'ObjectExpression',
            properties: [
              {
                key: 'intention',
                value: "'PROCESS'",
                computed: false,
                method: false,
                shorthand: false,
                kind: 'init',
                statement: "intention: 'PROCESS'",
              },
              {
                key: 'node',
                value: {
                  arguments: ['node', 'info'],
                  callee: 'updateNodeId',
                  optional: false,
                  statement: 'updateNodeId(node, info)',
                },
                computed: false,
                method: false,
                shorthand: false,
                kind: 'init',
                statement: 'node: updateNodeId(node, info)',
              },
            ],
          },
          range: [0, 64],
          loc: {
            start: {
              line: 30,
              column: 12,
            },
            end: {
              line: 30,
              column: 76,
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
      // id: 1,
      // path: '$root',
      type: 'ReturnStatement',
      // statement: "return { intention: 'PROCESS', node: updateNodeId(node, info) };",
      argument: {
        type: 'ObjectExpression',
        properties: [
          {
            key: 'intention',
            value: "'PROCESS'",
            computed: false,
            method: false,
            shorthand: false,
            kind: 'init',
            statement: "intention: 'PROCESS'",
          },
          {
            key: 'node',
            value: {
              arguments: ['node', 'info'],
              callee: 'updateNodeId',
              optional: false,
              statement: 'updateNodeId(node, info)',
            },
            computed: false,
            method: false,
            shorthand: false,
            kind: 'init',
            statement: 'node: updateNodeId(node, info)',
          },
        ],
      },
    });
  });

  it('expression statement', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: 'node = updateNodeId(node, info) as any;',
        ast: {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: 'node',
            right: {
              statement: 'updateNodeId(node, info) as any',
              types: ['any'],
            },
            operator: '=',
            statement: 'node = updateNodeId(node, info) as any',
          },
          range: [0, 39],
          loc: {
            start: {
              line: 41,
              column: 12,
            },
            end: {
              line: 41,
              column: 51,
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
    // console.log(result);

    expect(result).toEqual({
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        left: 'node',
        right: { statement: 'updateNodeId(node, info) as any', types: ['any'] },
        operator: '=',
      },
    });
  });

  it('block statement', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode:
          "{\n            node = updateNodeId(node, info) as any;\n            // let $id = uuidv4();\n            return {\n              path: info.path.join('.'),\n              name: node.id.name,\n              type: 'FunctionDeclaration',\n              generator: node.generator,\n              async: node.async,\n              statement: ctx.$ast.sourceCode.substring(node.range[0], node.body.range[0] - 1),\n              source: ctx.$ast.sourceCode.substring(node.range[0], node.range[1]),\n              node: null, //parent as any,\n              range: { start: node.range[0], end: node.range[1] },\n              return: node.returnType,\n              arguments: node.params,\n              body: node.body,\n            };\n          }",
        ast: {
          type: 'BlockStatement',
          body: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'AssignmentExpression',
                left: 'node',
                right: {
                  statement: 'updateNodeId(node, info) as any',
                  types: ['any'],
                },
                operator: '=',
                statement: 'node = updateNodeId(node, info) as any',
              },
              statement: 'node = updateNodeId(node, info) as any;',
            },
            {
              type: 'ReturnStatement',
              argument: {
                type: 'ObjectExpression',
                properties: [
                  {
                    key: 'path',
                    value: {
                      arguments: ["'.'"],
                      callee: 'info.path.join',
                      optional: false,
                      statement: "info.path.join('.')",
                    },
                    computed: false,
                    method: false,
                    shorthand: false,
                    kind: 'init',
                    statement: "path: info.path.join('.')",
                  },
                  {
                    key: 'name',
                    value: 'node.id.name',
                    computed: false,
                    method: false,
                    shorthand: false,
                    kind: 'init',
                    statement: 'name: node.id.name',
                  },
                  {
                    key: 'type',
                    value: "'FunctionDeclaration'",
                    computed: false,
                    method: false,
                    shorthand: false,
                    kind: 'init',
                    statement: "type: 'FunctionDeclaration'",
                  },
                  {
                    key: 'generator',
                    value: 'node.generator',
                    computed: false,
                    method: false,
                    shorthand: false,
                    kind: 'init',
                    statement: 'generator: node.generator',
                  },
                  {
                    key: 'async',
                    value: 'node.async',
                    computed: false,
                    method: false,
                    shorthand: false,
                    kind: 'init',
                    statement: 'async: node.async',
                  },
                  {
                    key: 'statement',
                    value: {
                      arguments: [
                        'node.range[0]',
                        {
                          type: 'BinaryExpression',
                          left: 'node.body.range[0]',
                          right: '1',
                          operator: '-',
                          statement: 'node.body.range[0] - 1',
                        },
                      ],
                      callee: 'ctx.$ast.sourceCode.substring',
                      optional: false,
                      statement: 'ctx.$ast.sourceCode.substring(node.range[0], node.body.range[0] - 1)',
                    },
                    computed: false,
                    method: false,
                    shorthand: false,
                    kind: 'init',
                    statement:
                      'statement: ctx.$ast.sourceCode.substring(node.range[0], node.body.range[0] - 1)',
                  },
                  {
                    key: 'source',
                    value: {
                      arguments: ['node.range[0]', 'node.range[1]'],
                      callee: 'ctx.$ast.sourceCode.substring',
                      optional: false,
                      statement: 'ctx.$ast.sourceCode.substring(node.range[0], node.range[1])',
                    },
                    computed: false,
                    method: false,
                    shorthand: false,
                    kind: 'init',
                    statement: 'source: ctx.$ast.sourceCode.substring(node.range[0], node.range[1])',
                  },
                  {
                    key: 'node',
                    value: 'null',
                    computed: false,
                    method: false,
                    shorthand: false,
                    kind: 'init',
                    statement: 'node: null',
                  },
                  {
                    key: 'range',
                    value: {
                      type: 'ObjectExpression',
                      properties: [
                        {
                          key: 'start',
                          value: 'node.range[0]',
                          computed: false,
                          method: false,
                          shorthand: false,
                          kind: 'init',
                          statement: 'start: node.range[0]',
                        },
                        {
                          key: 'end',
                          value: 'node.range[1]',
                          computed: false,
                          method: false,
                          shorthand: false,
                          kind: 'init',
                          statement: 'end: node.range[1]',
                        },
                      ],
                    },
                    computed: false,
                    method: false,
                    shorthand: false,
                    kind: 'init',
                    statement: 'range: { start: node.range[0], end: node.range[1] }',
                  },
                  {
                    key: 'return',
                    value: 'node.returnType',
                    computed: false,
                    method: false,
                    shorthand: false,
                    kind: 'init',
                    statement: 'return: node.returnType',
                  },
                  {
                    key: 'arguments',
                    value: 'node.params',
                    computed: false,
                    method: false,
                    shorthand: false,
                    kind: 'init',
                    statement: 'arguments: node.params',
                  },
                  {
                    key: 'body',
                    value: 'node.body',
                    computed: false,
                    method: false,
                    shorthand: false,
                    kind: 'init',
                    statement: 'body: node.body',
                  },
                ],
              },
              statement:
                "return {\n              path: info.path.join('.'),\n              name: node.id.name,\n              type: 'FunctionDeclaration',\n              generator: node.generator,\n              async: node.async,\n              statement: ctx.$ast.sourceCode.substring(node.range[0], node.body.range[0] - 1),\n              source: ctx.$ast.sourceCode.substring(node.range[0], node.range[1]),\n              node: null, //parent as any,\n              range: { start: node.range[0], end: node.range[1] },\n              return: node.returnType,\n              arguments: node.params,\n              body: node.body,\n            };",
            },
          ],
          range: [0, 741],
          loc: {
            start: {
              line: 40,
              column: 52,
            },
            end: {
              line: 57,
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
      type: 'BlockStatement',
      body: [
        {
          type: 'ExpressionStatement',
          path: '$root.body.0',
          expression: {
            type: 'AssignmentExpression',
            left: 'node',
            right: { statement: 'updateNodeId(node, info) as any', types: ['any'] },
            operator: '=',
          },
        },
        {
          type: 'ReturnStatement',
          path: '$root.body.1',
          argument: {
            type: 'ObjectExpression',
            properties: [
              {
                key: 'path',
                value: {
                  arguments: ["'.'"],
                  callee: 'info.path.join',
                  optional: false,
                  statement: "info.path.join('.')",
                },
                computed: false,
                method: false,
                shorthand: false,
                kind: 'init',
                statement: "path: info.path.join('.')",
              },
              {
                key: 'name',
                value: 'node.id.name',
                computed: false,
                method: false,
                shorthand: false,
                kind: 'init',
                statement: 'name: node.id.name',
              },
              {
                key: 'type',
                value: "'FunctionDeclaration'",
                computed: false,
                method: false,
                shorthand: false,
                kind: 'init',
                statement: "type: 'FunctionDeclaration'",
              },
              {
                key: 'generator',
                value: 'node.generator',
                computed: false,
                method: false,
                shorthand: false,
                kind: 'init',
                statement: 'generator: node.generator',
              },
              {
                key: 'async',
                value: 'node.async',
                computed: false,
                method: false,
                shorthand: false,
                kind: 'init',
                statement: 'async: node.async',
              },
              {
                key: 'statement',
                value: {
                  arguments: [
                    'node.range[0]',
                    {
                      type: 'BinaryExpression',
                      left: 'node.body.range[0]',
                      right: '1',
                      operator: '-',
                      statement: 'node.body.range[0] - 1',
                    },
                  ],
                  callee: 'ctx.$ast.sourceCode.substring',
                  optional: false,
                  statement: 'ctx.$ast.sourceCode.substring(node.range[0], node.body.range[0] - 1)',
                },
                computed: false,
                method: false,
                shorthand: false,
                kind: 'init',
                statement: 'statement: ctx.$ast.sourceCode.substring(node.range[0], node.body.range[0] - 1)',
              },
              {
                key: 'source',
                value: {
                  arguments: ['node.range[0]', 'node.range[1]'],
                  callee: 'ctx.$ast.sourceCode.substring',
                  optional: false,
                  statement: 'ctx.$ast.sourceCode.substring(node.range[0], node.range[1])',
                },
                computed: false,
                method: false,
                shorthand: false,
                kind: 'init',
                statement: 'source: ctx.$ast.sourceCode.substring(node.range[0], node.range[1])',
              },
              {
                key: 'node',
                value: 'null',
                computed: false,
                method: false,
                shorthand: false,
                kind: 'init',
                statement: 'node: null',
              },
              {
                key: 'range',
                value: {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      key: 'start',
                      value: 'node.range[0]',
                      computed: false,
                      method: false,
                      shorthand: false,
                      kind: 'init',
                      statement: 'start: node.range[0]',
                    },
                    {
                      key: 'end',
                      value: 'node.range[1]',
                      computed: false,
                      method: false,
                      shorthand: false,
                      kind: 'init',
                      statement: 'end: node.range[1]',
                    },
                  ],
                },
                computed: false,
                method: false,
                shorthand: false,
                kind: 'init',
                statement: 'range: { start: node.range[0], end: node.range[1] }',
              },
              {
                key: 'return',
                value: 'node.returnType',
                computed: false,
                method: false,
                shorthand: false,
                kind: 'init',
                statement: 'return: node.returnType',
              },
              {
                key: 'arguments',
                value: 'node.params',
                computed: false,
                method: false,
                shorthand: false,
                kind: 'init',
                statement: 'arguments: node.params',
              },
              {
                key: 'body',
                value: 'node.body',
                computed: false,
                method: false,
                shorthand: false,
                kind: 'init',
                statement: 'body: node.body',
              },
            ],
          },
        },
      ],
    });
  });
});
