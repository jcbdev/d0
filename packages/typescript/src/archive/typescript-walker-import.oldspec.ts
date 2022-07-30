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
  it('import specifier', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: 'import { Ctx }',
        ast: {
          type: 'ImportSpecifier',
          local: {
            name: 'Ctx',
            statement: 'Ctx',
          },
          imported: {
            name: 'Ctx',
            statement: 'Ctx',
          },
          range: [9, 12],
          loc: {
            start: {
              line: 2,
              column: 13,
            },
            end: {
              line: 2,
              column: 16,
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

    expect(result).toEqual('Ctx');
  });

  it('import declaration', async () => {
    let ctx: TypescriptCtx = {
      $ast: {
        sourceCode: 'import { Ctx, D0, ResolveD0 } from "@d0-it/core";',
        ast: {
          type: 'ImportDeclaration',
          source: '@d0-it/core',
          specifiers: ['Ctx', 'D0', 'ResolveD0'],
          importKind: 'value',
          range: [0, 46],
          loc: {
            start: {
              line: 2,
              column: 4,
            },
            end: {
              line: 2,
              column: 50,
            },
            $$id: 23,
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
      source: '@d0-it/core',
      specifiers: ['Ctx', 'D0', 'ResolveD0'],
      type: 'ImportDeclaration',
      // statement: 'import { Ctx, D0, ResolveD0 } from "@d0-it/core";',
      importKind: 'value',
      // id: 1,
    });
  });
});
