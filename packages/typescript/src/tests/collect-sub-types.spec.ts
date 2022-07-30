import { typescriptAdapter } from '../lib/typescript-adapter';
import { collectSubTypes, mapType } from '../lib/query/collect-sub-types';
import { collect, find } from '@d0/walker';
import { TSESTree } from '@typescript-eslint/typescript-estree';

const simple_type = (t: string) => `let hello: ${t};`;
const type_def = (t: string) => `type hello = ${t};`;
const interface_def = (t: string) => `interface hello { ${t} }`;
const class_def = (t: string) => `class hello { ${t} }`;

describe('map types', () => {
  const mapNode = async (source: string, type: string) => {
    let ctx = {
      $ast: typescriptAdapter.parse(source, {}),
    };

    let nodeInfo = await find(ctx.$ast.ast as any, (node, info) => node.type == type);
    if (!nodeInfo) console.log(JSON.stringify(ctx.$ast.ast));
    // console.log(nodeInfo);
    let collectMore = async node => {
      let results = await collect<TSESTree.TypeNode, SubTypeSummary, TSESTree.Node>(
        node as TSESTree.Node,
        selector,
        null,
        mapType,
        { sourceCode: ctx.$ast.sourceCode, collectMore: collectMore }
      );
      // console.log(JSON.stringify(results, null, 2));
      return results;
    };
    let result = await mapType.types(nodeInfo.node, nodeInfo.info, {} as any, {
      sourceCode: ctx.$ast.sourceCode,
      collectMore: collectMore,
    });
    return result;
  };

  it.each<{ keyword: string; nodeType: string; expected: string[] }>([
    { keyword: 'any', nodeType: 'TSAnyKeyword', expected: ['any'] },
    { keyword: 'boolean', nodeType: 'TSBooleanKeyword', expected: ['boolean'] },
    { keyword: 'never', nodeType: 'TSNeverKeyword', expected: ['never'] },
    { keyword: 'null', nodeType: 'TSNullKeyword', expected: ['null'] },
    { keyword: 'number', nodeType: 'TSNumberKeyword', expected: ['number'] },
    { keyword: 'object', nodeType: 'TSObjectKeyword', expected: ['object'] },
    { keyword: 'string', nodeType: 'TSStringKeyword', expected: ['string'] },
    { keyword: 'symbol', nodeType: 'TSSymbolKeyword', expected: ['symbol'] },
    { keyword: 'unknown', nodeType: 'TSUnknownKeyword', expected: ['unknown'] },
    { keyword: 'undefined', nodeType: 'TSUndefinedKeyword', expected: ['undefined'] },
    { keyword: 'void', nodeType: 'TSVoidKeyword', expected: ['void'] },
    { keyword: 'bigint', nodeType: 'TSBigIntKeyword', expected: ['bigint'] },
    { keyword: 'any[]', nodeType: 'TSArrayType', expected: ['any[]'] },
    { keyword: 'Test', nodeType: 'TSTypeReference', expected: ['Test'] },
    { keyword: 'Test<string>', nodeType: 'TSTypeReference', expected: ['Test<string>'] },
    { keyword: "'one'", nodeType: 'TSLiteralType', expected: ["'one'"] },
    { keyword: "'one' | 'two'", nodeType: 'TSUnionType', expected: ["'one'", "'two'"] },
    { keyword: 'One & Two', nodeType: 'TSIntersectionType', expected: ['One', 'Two'] },
    { keyword: 'typeof import("x")', nodeType: 'TSImportType', expected: ['typeof import("x")'] },
    {
      keyword: '[string, number, Test<something>]',
      nodeType: 'TSTupleType',
      expected: ['string', 'number', 'Test<something>', 'something'],
    },
  ])('$nodeType produces "$expected"', async ({ keyword, nodeType, expected }) => {
    let result = await mapNode(simple_type(keyword), nodeType);

    expect(result).toEqual({
      types: expected,
    });
  });

  it.each<{ typedef: string; nodeType: string; expected: string[] }>([
    {
      typedef: 'object extends any ? number : string',
      nodeType: 'TSConditionalType',
      expected: ['object', 'any', 'number', 'string'],
    },
    {
      typedef: '(test: string, other: number) => TestType',
      nodeType: 'TSFunctionType',
      expected: ['TestType', 'string', 'number'],
    },
    {
      typedef: '(a: Function) => number?',
      nodeType: 'TSFunctionType',
      expected: ['number?', 'Function'],
    },
    {
      typedef: '{ test: string; }',
      nodeType: 'TSPropertySignature',
      expected: ['string'],
    },
  ])('$nodeType produces "$expected"', async ({ typedef, nodeType, expected }) => {
    let result = await mapNode(type_def(typedef), nodeType);

    expect(result).toEqual({
      types: expected,
    });
  });

  it.each<{ typedef: string; nodeType: string; expected: string[] }>([
    {
      typedef: 'new (): Animal;',
      nodeType: 'TSConstructSignatureDeclaration',
      expected: ['Animal'],
    },
    {
      typedef: 'new (): Animal;',
      nodeType: 'TSConstructSignatureDeclaration',
      expected: ['Animal'],
    },
  ])('$nodeType produces "$expected"', async ({ typedef, nodeType, expected }) => {
    let result = await mapNode(interface_def(typedef), nodeType);

    expect(result).toEqual({
      types: expected,
    });
  });

  it.each<{ typedef: string; nodeType: string; expected: string[] }>([
    {
      typedef: 'new (): Animal;',
      nodeType: 'TSEmptyBodyFunctionExpression',
      expected: ['Animal'],
    },
    {
      typedef: 'errol(a:string): Test {};',
      nodeType: 'FunctionExpression',
      expected: ['Test', 'string'],
    },
    {
      typedef: 'errol(a:string): Test {};',
      nodeType: 'FunctionExpression',
      expected: ['Test', 'string'],
    },
  ])('$nodeType produces "$expected"', async ({ typedef, nodeType, expected }) => {
    let result = await mapNode(class_def(typedef), nodeType);

    expect(result).toEqual({
      types: expected,
    });
  });

  it.each<{ typedef: string; nodeType: string; expected: string[] }>([
    {
      typedef: 'let test: string? = null;',
      nodeType: 'TSJSDocNullableType',
      expected: ['string?'],
    },
    {
      typedef: `type Person = { age: number; name: string; alive: boolean };
      type Age = Person["age"];`,
      nodeType: 'TSIndexedAccessType',
      expected: ['Person', '"age"'],
    },
    {
      typedef: `type OnlyBoolsAndHorses = {
        [key: string]: boolean;
      };`,
      nodeType: 'TSIndexSignature',
      expected: ['key: string', 'boolean'],
    },
    {
      typedef: `type MappedKeys<T> = { [P in keyof T]: T[P] }`,
      nodeType: 'TSMappedType',
      expected: ['P in keyof T', 'T[P]'],
    },
  ])('$nodeType produces "$expected"', async ({ typedef, nodeType, expected }) => {
    let result = await mapNode(typedef, nodeType);

    expect(result).toEqual({
      types: expected,
    });
  });
});

describe('collect types', () => {
  it('function declaration', async () => {
    let ts = /* ts */ `
    function hello(test?: string, other: (t: string) => Promise<number>) {
      let x=50;
      return x;
    }`;

    let ctx = {
      $ast: typescriptAdapter.parse(ts, {}),
    };
    // console.log(JSON.stringify(ctx.$ast.ast));
    let result = await collectSubTypes(ctx as any);
    // console.log(JSON.stringify(result));

    expect(result).toEqual([
      {
        node: expect.objectContaining({
          type: 'FunctionDeclaration',
          id: expect.objectContaining({
            name: 'hello',
          }),
        }),
        mapped: {
          types: ['string', 'Promise<number>', 'string', 'Promise<number>', 'string', 'number'],
        },
        type: 'FunctionDeclaration',
        path: ['$root', 'body', 0],
      },
      {
        node: expect.objectContaining({
          type: 'TSStringKeyword',
        }),
        mapped: {
          types: ['string'],
        },
        type: 'TSStringKeyword',
        path: ['$root', 'body', 0, 'params', 0, 'typeAnnotation', 'typeAnnotation'],
      },
      {
        node: expect.objectContaining({
          type: 'TSFunctionType',
        }),
        mapped: {
          types: ['Promise<number>', 'string'],
        },
        type: 'TSFunctionType',
        path: ['$root', 'body', 0, 'params', 1, 'typeAnnotation', 'typeAnnotation'],
      },
      {
        node: expect.objectContaining({
          type: 'TSTypeReference',
        }),
        mapped: {
          types: ['Promise<number>'],
        },
        type: 'TSTypeReference',
        path: [
          '$root',
          'body',
          0,
          'params',
          1,
          'typeAnnotation',
          'typeAnnotation',
          'returnType',
          'typeAnnotation',
        ],
      },
      {
        node: expect.objectContaining({
          type: 'TSStringKeyword',
        }),
        mapped: {
          types: ['string'],
        },
        type: 'TSStringKeyword',
        path: [
          '$root',
          'body',
          0,
          'params',
          1,
          'typeAnnotation',
          'typeAnnotation',
          'params',
          0,
          'typeAnnotation',
          'typeAnnotation',
        ],
      },
      {
        node: expect.objectContaining({
          type: 'TSNumberKeyword',
        }),
        mapped: {
          types: ['number'],
        },
        type: 'TSNumberKeyword',
        path: [
          '$root',
          'body',
          0,
          'params',
          1,
          'typeAnnotation',
          'typeAnnotation',
          'returnType',
          'typeAnnotation',
          'typeParameters',
          'params',
          0,
        ],
      },
    ]);
  });
});

const selector = (node, info) => {
  return !![
    'TSAnyKeyword',
    'TSBigIntKeyword',
    'TSBooleanKeyword',
    'TSNeverKeyword',
    'TSNullKeyword',
    'TSNumberKeyword',
    'TSObjectKeyword',
    'TSIntrinsicKeyword',
    'TSStringKeyword',
    'TSSymbolKeyword',
    'TSUnknownKeyword',
    'TSUndefinedKeyword',
    'TSVoidKeyword',
    'TSArrayType',
    'TSConditionalType',
    'TSConstructorType',
    'TSFunctionType',
    'TSImportType',
    'TSIndexedAccessType',
    'TSInferType',
    'TSIntersectionType',
    'TSLiteralType',
    'TSMappedType',
    'TSNamedTupleMember',
    'TSOptionalType',
    'TSParenthesizedType',
    'TSRestType',
    'TSTemplateLiteralType',
    'TSThisType',
    'TSTupleType',
    'TSTypeLiteral',
    'TSTypeOperator',
    'TSTypePredicate',
    'TSTypeQuery',
    'TSTypeReference',
    'TSUnionType',
  ].find(f => f == node.type);
};

type SubTypeSummary = {
  types: string[];
};
