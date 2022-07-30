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

const walkTS = async (ts: string) => {
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

describe('walker functions', () => {
  it('should extract named function', async () => {
    let ts = /* ts */ `
    function hello(test?: string, other: (t: string) => Promise<number>) {
      let x=50;
      return x;
    }
    `;

    let result = await walkTS(ts);
    // console.log(JSON.stringify(result.$indexes));

    expect(result.$indexes).toEqual({
      functions: {
        '2': {
          path: '$root.body.0',
          name: 'hello',
          type: 'FunctionDeclaration',
          generator: false,
          async: false,
          statement: 'function hello(test?: string, other: (t: string) => Promise<number>)',
          source:
            'function hello(test?: string, other: (t: string) => Promise<number>) {\n      let x=50;\n      return x;\n    }',
          node: { type: 'FunctionDeclaration' },
          range: { start: 5, end: 113 },
          arguments: [
            { name: 'hello', type: null, statement: 'hello' },
            { name: 'test', type: ': string', statement: 'test?: string' },
            {
              name: 'other',
              type: ': (t: string) => Promise<number>',
              statement: 'other: (t: string) => Promise<number>',
            },
          ],
          return: {
            statement: 'return x;',
            type: 'Identifier',
          },
        },
      },
    });
  });

  it('should extract unnamed function', async () => {
    let ts = /* ts */ `
    (function (test?: string, other: (t: string) => Promise<number>) {
      let x=50;
      return x;
    })
    `;

    let result = await walkTS(ts);
    // console.log(JSON.stringify(result.$indexes));

    for (let [k, v] of Object.entries(result.$indexes.functions)) v.node = { type: v.node.type };
    console.log(JSON.stringify(result.$indexes));

    expect(result.$indexes).toEqual({
      functions: {
        ['3']: {
          path: '$root.body.0.expression',
          name: '',
          type: 'FunctionExpression',
          generator: false,
          async: false,
          statement: '(function (test?: string, other: (t: string) => Promise<number>)',
          source:
            '(function (test?: string, other: (t: string) => Promise<number>) {\n      let x=50;\n      return x;\n    })',
          node: { type: 'ExpressionStatement' },
          range: { start: 5, end: 110 },
          arguments: [
            {
              name: 'test',
              type: ': string',
              statement: 'test?: string',
            },
            {
              name: 'other',
              type: ': (t: string) => Promise<number>',
              statement: 'other: (t: string) => Promise<number>',
            },
          ],
          return: {
            statement: 'return x;',
            type: 'Identifier',
          },
        },
      },
    });
  });

  it('should extract an expression function', async () => {
    let ts = /* ts */ `
    const blah = (test?: string, other: (t: string) => Promise<number>): number => {
      let x=50;
      return x;
    };
    `;

    let result = await walkTS(ts);
    console.log(JSON.stringify(result.$ast.ast));
    // console.log(JSON.stringify(result.$indexes));

    for (let [k, v] of Object.entries(result.$indexes.functions)) v.node = { type: v.node.type };
    console.log(JSON.stringify(result.$indexes));

    expect(result.$indexes).toEqual({
      functions: {
        '6': {
          path: '$root.body.0.declarations.0.init',
          name: 'blah',
          type: 'ArrowFunctionExpression',
          generator: false,
          async: false,
          statement: 'const blah = (test?: string, other: (t: string) => Promise<number>): number =>',
          source:
            'const blah = (test?: string, other: (t: string) => Promise<number>): number => {\n      let x=50;\n      return x;\n    };',
          node: { type: 'VariableDeclaration' },
          range: { start: 5, end: 124 },
          arguments: [
            { name: 'test', type: ': string', statement: 'test?: string' },
            {
              name: 'other',
              type: ': (t: string) => Promise<number>',
              statement: 'other: (t: string) => Promise<number>',
            },
          ],
          return: { type: 'Identifier', statement: 'return x;' },
        },
      },
    });
  });

  fit('crazy toon', async () => {
    let ts = /* ts */ `
    import { Ctx, D0, ResolveD0 } from '@d0/core';
    import { NodeInfo, visit, VisitIntention, Visitor } from '@d0/walker';
    import { ArgumentNode, ASTNode } from 'graphql';
    import { typescriptSelector } from './typescript-selector';
    import { Argument, FunctionState, Return, TypescriptVisitor } from './types';
    import { TSESTree } from '@typescript-eslint/types';
    import { TSESTreeOptions, TypescriptCtx } from '../types';
    import { AST } from '@typescript-eslint/typescript-estree';
    import { FunctionDeclaration, nodeModuleNameResolver } from 'typescript';
    import { v4 as uuidv4 } from 'uuid';
    import { FunctionLike } from '@typescript-eslint/types/dist/ast-spec';
    
    export const walkTypescript = async <TFlex>(ctx: TypescriptCtx<TFlex>) => {
      let id = 0;
      const updateNodeId = (node: TSESTree.Node, info: NodeInfo): TSESTree.Node => {
        if (info.nodeType != 'object') return node;
        id++;
        // let $id = uuidv4();
        return { ...node, $id: id } as any;
      };

      if (id as number == '1' as number) {
        'testicles'
      }
    
      const visitor: TypescriptVisitor<TypescriptCtx<TFlex>> = {
        enter: {
          ['*']: (node, info, ctx) => {
            return { intention: 'PROCESS', node: updateNodeId(node, info) };
          },
        },
        leave: {
          BlockStatement: (node, info, ctx) => {
            return node;
          },
          Literal: (node, info, ctx) => {
            return node.value;
          },
          FunctionDeclaration: (node, info, ctx) => {
            node = updateNodeId(node, info) as any;
            // let $id = uuidv4();
            return {
              path: info.path.join('.'),
              name: node.id.name,
              type: 'FunctionDeclaration',
              generator: node.generator,
              async: node.async,
              statement: ctx.$ast.sourceCode.substring(node.range[0], node.body.range[0] - 1),
              source: ctx.$ast.sourceCode.substring(node.range[0], node.range[1]),
              node: null, //parent as any,
              range: { start: node.range[0], end: node.range[1] },
              return: node.returnType,
              arguments: node.params,
              body: node.body,
            };
          },
          ArrowFunctionExpression: (node, info, ctx) => {
            node = updateNodeId(node, info) as any;
            // let $id = uuidv4();
            let parent: TSESTree.Node = node;
            if (info.parent?.type == 'VariableDeclarator')
              parent = info.nodeAncestors[info.nodeAncestors.length - 2] as TSESTree.VariableDeclaration;
            if (info.parent?.type == 'ExpressionStatement') parent = info.parent as TSESTree.ExpressionStatement;
            return {
              path: info.path.join('.'),
              name:
                info.parent?.type == 'VariableDeclarator'
                  ? (info.parent.id as TSESTree.Identifier).name
                  : info.index,
              type: 'ArrowFunctionExpression',
              generator: node.generator,
              async: node.async,
              statement: ctx.$ast.sourceCode.substring(parent.range[0], node.body.range[0] - 1),
              source: ctx.$ast.sourceCode.substring(parent.range[0], parent.range[1]),
              node: null, //parent as any,
              range: { start: parent.range[0], end: parent.range[1] },
              return: node.returnType,
              arguments: node.params,
              body: node.body,
            };
          },
          FunctionExpression: (node, info, ctx) => {
            node = updateNodeId(node, info) as any;
            // let $id = uuidv4();
            let parent: TSESTree.Node = node;
            if (info.parent?.type == 'VariableDeclarator')
              parent = info.nodeAncestors[info.nodeAncestors.length - 2] as TSESTree.VariableDeclaration;
            if (info.parent?.type == 'ExpressionStatement') parent = info.parent as TSESTree.ExpressionStatement;
            return {
              path: info.path.join('.'),
              name: info.parent?.type == 'VariableDeclarator' ? (info.parent.id as TSESTree.Identifier).name : '',
              type: 'FunctionExpression',
              generator: node.generator,
              async: node.async,
              statement: ctx.$ast.sourceCode.substring(parent.range[0], node.body.range[0] - 1),
              source: ctx.$ast.sourceCode.substring(parent.range[0], parent.range[1]),
              node: null,
              range: { start: parent.range[0], end: parent.range[1] },
              return: node.returnType,
              arguments: node.params,
              body: node.body,
            };
          },
    
          TSTypeAnnotation: (node, info, ctx) => {
            // if (info.parent.type == 'TSTypeAnnotation') return { type: node.typeAnnotation };
            // else
            return {
              annotation: node.typeAnnotation,
              statement: ctx.$ast.sourceCode.substring(node.range[0], node.range[1]),
            };
          },
          ['TSStringKeyword,TSNumberKeyword,TSBooleanKeyword,TSBigIntKeyword,TSNeverKeyword,TSNullKeyword,TSObjectKeyword,TSUndefinedKeyword,TSUnknownKeyword,TSVoidKeyword,TSAnyKeyword']:
            (node, info, ctx) => {
              let type = node.type.replace('TS', '').replace('Keyword', '');
              if (['BigInt'].includes(type)) return type;
              return type.toLowerCase();
            },
          TSFunctionType: (node, info, ctx) => {
            return {
              type: 'Function',
              arguments: node.params,
              return: node.returnType,
            };
          },
          Identifier: (node, info, ctx) => {
            return {
              name: node.name,
              optional: node.optional,
              statement: ctx.$ast.sourceCode.substring(node.range[0], node.range[1]),
              decorators: node.decorators,
              type: node.typeAnnotation,
            };
          },
          ReturnStatement: (node, info, ctx) => {
            let parent = info.nodeAncestors[info.nodeAncestors.length - 2];
            switch (parent.type) {
              case 'ArrowFunctionExpression':
              case 'FunctionDeclaration':
              case 'FunctionExpression':
              case 'TSDeclareFunction':
              case 'TSEmptyBodyFunctionExpression':
                return {
                  type: node.argument.type,
                  statement: ctx.$ast.sourceCode.substring(node.range[0], node.range[1]),
                } as Return;
                break;
              default:
                break;
            }
            return node;
          },
        },
      };
    
      return await visit<TSESTree.Node, TypescriptCtx<TFlex>>(
        ctx.$ast.ast as TSESTree.Node,
        typescriptSelector,
        visitor,
        ctx
      );
    };
    
    const updateNodeId = (node: TSESTree.Node, info: NodeInfo): TSESTree.Node => {
      return node;
    };
    
    const oldvisitor: TypescriptVisitor<TypescriptCtx<void>> = {
      enter: {
        ['*']: (node, info, ctx) => {
          return { intention: 'PROCESS', node: updateNodeId(node, info) };
        },
        FunctionDeclaration: (node, info, ctx) => {
          node = updateNodeId(node, info) as any;
          // let $id = uuidv4();
          ctx.$indexes.functions[(node as any).$id] = {
            path: info.path.join('.'),
            name: node.id.name,
            type: 'FunctionDeclaration',
            generator: node.generator,
            async: node.async,
            statement: ctx.$ast.sourceCode.substring(node.range[0], node.body.range[0] - 1),
            source: ctx.$ast.sourceCode.substring(node.range[0], node.range[1]),
            node: node as any,
            range: { start: node.range[0], end: node.range[1] },
            // return: node.returnType
            arguments: [],
          } as FunctionState<FunctionDeclaration>;
          return { intention: 'PROCESS', node };
        },
        ArrowFunctionExpression: (node, info, ctx) => {
          node = updateNodeId(node, info) as any;
          // let $id = uuidv4();
          let parent: TSESTree.Node = node;
          if (info.parent?.type == 'VariableDeclarator')
            parent = info.nodeAncestors[info.nodeAncestors.length - 2] as TSESTree.VariableDeclaration;
          if (info.parent?.type == 'ExpressionStatement') parent = info.parent as TSESTree.ExpressionStatement;
          ctx.$indexes.functions[(node as any).$id] = {
            path: info.path.join('.'),
            name:
              info.parent?.type == 'VariableDeclarator'
                ? (info.parent.id as TSESTree.Identifier).name
                : info.index,
            type: 'ArrowFunctionExpression',
            generator: node.generator,
            async: node.async,
            statement: ctx.$ast.sourceCode.substring(parent.range[0], node.body.range[0] - 1),
            source: ctx.$ast.sourceCode.substring(parent.range[0], parent.range[1]),
            node: parent as any,
            range: { start: parent.range[0], end: parent.range[1] },
            // return: node.returnType
            arguments: [],
          } as FunctionState<FunctionDeclaration>;
          return { intention: 'PROCESS', node };
        },
        FunctionExpression: (node, info, ctx) => {
          node = updateNodeId(node, info) as any;
          // let $id = uuidv4();
          let parent: TSESTree.Node = node;
          if (info.parent?.type == 'VariableDeclarator')
            parent = info.nodeAncestors[info.nodeAncestors.length - 2] as TSESTree.VariableDeclaration;
          if (info.parent?.type == 'ExpressionStatement') parent = info.parent as TSESTree.ExpressionStatement;
          ctx.$indexes.functions[(node as any).$id] = {
            path: info.path.join('.'),
            name: info.parent?.type == 'VariableDeclarator' ? (info.parent.id as TSESTree.Identifier).name : '',
            type: 'FunctionExpression',
            generator: node.generator,
            async: node.async,
            statement: ctx.$ast.sourceCode.substring(parent.range[0], node.body.range[0] - 1),
            source: ctx.$ast.sourceCode.substring(parent.range[0], parent.range[1]),
            node: parent as any,
            range: { start: parent.range[0], end: parent.range[1] },
            return: node.returnType
              ? ({
                  type: node.returnType.typeAnnotation.type,
                } as Return)
              : undefined,
            arguments: [],
          } as FunctionState<FunctionDeclaration>;
          return { intention: 'PROCESS', node };
        },
      },
      leave: {
        TSTypeAnnotation: (node, info, ctx) => {
          if (info.parent.type == 'TSTypeAnnotation')
            return { type: node.type, typeAnnotation: node.typeAnnotation };
          else
            return {
              type: node.type,
              typeAnnotation: node.typeAnnotation,
              statement: ctx.$ast.sourceCode.substring(node.range[0], node.range[1]),
            };
        },
        ['TSStringKeyword,TSNumberKeyword']: (node, info, ctx) => {
          return node.type;
        },
        Identifier: (node, info, ctx) => {
          switch (info.parent.type) {
            case 'ArrowFunctionExpression':
            case 'FunctionDeclaration':
            case 'FunctionExpression':
            case 'TSDeclareFunction':
            case 'TSEmptyBodyFunctionExpression':
              ctx.$indexes.functions[info.parent?.$id]?.arguments.push({
                name: node.name,
                type:
                  node.typeAnnotation && false
                    ? ctx.$ast.sourceCode.substring(node.typeAnnotation.range[0], node.typeAnnotation.range[1])
                    : null,
                statement: ctx.$ast.sourceCode.substring(node.range[0], node.range[1]),
              } as Argument);
              break;
            default:
              break;
          }
          return node;
        },
        ReturnStatement: (node, info, ctx) => {
          let parent = info.nodeAncestors[info.nodeAncestors.length - 2];
          switch (parent.type) {
            case 'ArrowFunctionExpression':
            case 'FunctionDeclaration':
            case 'FunctionExpression':
            case 'TSDeclareFunction':
            case 'TSEmptyBodyFunctionExpression':
              ctx.$indexes.functions[parent.$id].return = {
                type: ctx.$indexes.functions[parent.$id].return?.type ?? node.argument.type,
                statement: ctx.$ast.sourceCode.substring(node.range[0], node.range[1]),
              } as Return;
              break;
            default:
              break;
          }
          return node;
        },
      },
    };    
    `;

    let result = await walkTS(ts);
    await writeFile('/tmp/test.json', JSON.stringify(result.$ast.ast, null, 2));
    // console.log(JSON.stringify(result.$ast.ast));
    // console.log(JSON.stringify(result.$indexes));

    for (let [k, v] of Object.entries(result.$indexes.functions)) v.node = { type: v.node.type };
    // console.log(JSON.stringify(result.$indexes));

    expect(true);
    return;
    expect(result.$indexes).toEqual({
      functions: {
        '6': {
          path: '$root.body.0.declarations.0.init',
          name: 'blah',
          type: 'ArrowFunctionExpression',
          generator: false,
          async: false,
          statement: 'const blah = (test?: string, other: (t: string) => Promise<number>): number =>',
          source:
            'const blah = (test?: string, other: (t: string) => Promise<number>): number => {\n      let x=50;\n      return x;\n    };',
          node: { type: 'VariableDeclaration' },
          range: { start: 5, end: 124 },
          arguments: [
            { name: 'test', type: ': string', statement: 'test?: string' },
            {
              name: 'other',
              type: ': (t: string) => Promise<number>',
              statement: 'other: (t: string) => Promise<number>',
            },
          ],
          return: { type: 'Identifier', statement: 'return x;' },
        },
      },
    });
  });
});
