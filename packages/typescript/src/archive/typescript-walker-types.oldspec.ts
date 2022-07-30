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
  it('ts qualified name', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: 'TSESTree.Node',
        ast: {
          type: 'TSQualifiedName',
          left: {
            name: 'TSESTree',
            statement: 'TSESTree',
          },
          right: {
            name: 'Node',
            statement: 'Node',
          },
          range: [0, 13],
          loc: {
            start: {
              line: 16,
              column: 66,
            },
            end: {
              line: 16,
              column: 79,
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

    expect(result).toEqual('TSESTree.Node');
  });

  it('type annotation', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: 'TSESTree.Node',
        ast: {
          type: 'TSTypeAnnotation',
          loc: {
            start: {
              line: 16,
              column: 32,
            },
            end: {
              line: 16,
              column: 47,
            },
          },
          range: [0, 13],
          typeAnnotation: {
            type: 'TSTypeReference',
            typeName: {
              type: 'TSQualifiedName',
              left: {
                name: 'TSESTree',
                statement: 'TSESTree',
              },
              right: {
                name: 'Node',
                statement: 'Node',
              },
              range: [0, 13],
              loc: {
                start: {
                  line: 16,
                  column: 34,
                },
                end: {
                  line: 16,
                  column: 47,
                },
              },
            },
            range: [0, 13],
            loc: {
              start: {
                line: 16,
                column: 34,
              },
              end: {
                line: 16,
                column: 47,
              },
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

    expect(result).toEqual({ statement: 'TSESTree.Node', types: ['TSESTree.Node'] });
  });

  it('type reference', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: 'TSESTree.VariableDeclaration',
        ast: {
          type: 'TSTypeReference',
          typeName: {
            type: 'TSQualifiedName',
            left: 'TSESTree',
            right: 'VariableDeclaration',
            range: [0, 28],
            loc: {
              start: {
                line: 63,
                column: 76,
              },
              end: {
                line: 63,
                column: 104,
              },
            },
          },
          range: [0, 28],
          loc: {
            start: {
              line: 63,
              column: 76,
            },
            end: {
              line: 63,
              column: 104,
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

    expect(result).toEqual('TSESTree.VariableDeclaration');
  });
});
