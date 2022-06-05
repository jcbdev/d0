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
  it('variable declarator', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: 'parent: TSESTree.Node = node',
        ast: {
          type: 'VariableDeclarator',
          id: {
            name: 'parent',
            statement: 'parent: TSESTree.Node',
            type: ': TSESTree.Node',
          },
          init: 'node',
          range: [0, 28],
          loc: {
            start: {
              line: 220,
              column: 14,
            },
            end: {
              line: 220,
              column: 42,
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
      init: 'node',
      type: 'VariableDeclarator',
      id: { name: 'parent', type: ': TSESTree.Node' },
    });
  });

  it('variable declaration', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: 'let id = 0;',
        ast: {
          type: 'VariableDeclaration',
          declarations: [
            {
              init: '0',
              id: 'id',
            },
          ],
          kind: 'let',
          range: [0, 11],
          loc: {
            start: {
              line: 15,
              column: 6,
            },
            end: {
              line: 15,
              column: 17,
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
      kind: 'let',
      type: 'VariableDeclaration',
      declarations: [{ init: '0', id: 'id' }],
    });
  });
});
