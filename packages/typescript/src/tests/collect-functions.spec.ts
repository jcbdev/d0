import { typescriptAdapter } from '../lib/typescript-adapter';
import { collectFunctions, mapFunction } from '../lib/query/collect-functions';
import { find, NodeInfo } from '@d0-it/walker';
import { FunctionLike } from '@typescript-eslint/types/dist/ast-spec';

const func_body = `{ return 1; }`;
const func_declaration = /* ts */ `function hello(test?: string, other: (t: string) => Promise<number>) ${func_body}`;
const func_exp = /* ts */ `function (test?: string, other: (t: string) => Promise<number>) ${func_body}`;
const arrow_func_exp = /* ts */ `(test?: string, other: (t: string) => Promise<number>) =>  ${func_body}`;
const async_func_exp = /* ts */ `async ${func_exp}`;
const func_declare = /* ts */ `declare function hello(): void;`;

describe.skip('map functions', () => {
  const mapNode = async (source: string, type: string) => {
    let ctx = {
      $ast: typescriptAdapter.parse(source, {}),
    };

    let nodeInfo = await find(ctx.$ast.ast as any, (node, info) => node.type == type);
    // console.log(JSON.stringify(ctx.$ast.ast));
    // console.log(nodeInfo);
    let result = await mapFunction.name(nodeInfo.node, nodeInfo.info, {} as any, {
      sourceCode: ctx.$ast.sourceCode,
    });
    result = await mapFunction.statement(nodeInfo.node, nodeInfo.info, result, {
      sourceCode: ctx.$ast.sourceCode,
    });
    return result;
  };

  it.each<{
    code: string;
    nodeType: string;
    testType: string;
    expectedName: string;
    expectedStatement: string;
  }>([
    {
      code: func_declaration,
      nodeType: 'FunctionDeclaration',
      testType: 'named',
      expectedName: 'hello',
      expectedStatement: func_declaration,
    },
    {
      code: `(${func_exp})();`,
      nodeType: 'FunctionExpression',
      testType: 'immediate',
      expectedName: null,
      expectedStatement: func_exp,
    },
    {
      code: `let hello = ${func_exp};`,
      nodeType: 'FunctionExpression',
      testType: 'assignment',
      expectedName: 'hello',
      expectedStatement: func_exp,
    },
    {
      code: `let hello = ${arrow_func_exp};`,
      nodeType: 'ArrowFunctionExpression',
      testType: 'assignment',
      expectedName: 'hello',
      expectedStatement: arrow_func_exp,
    },
    {
      code: `let hello = ${async_func_exp};`,
      nodeType: 'FunctionExpression',
      testType: 'async assignment',
      expectedName: 'hello',
      expectedStatement: async_func_exp,
    },
    {
      code: `class test { hello = ${func_exp} }`,
      nodeType: 'FunctionExpression',
      testType: 'class prop',
      expectedName: 'hello',
      expectedStatement: func_exp,
    },
    {
      code: `let something = { hello: ${func_exp} }`,
      nodeType: 'FunctionExpression',
      testType: 'object prop',
      expectedName: 'hello',
      expectedStatement: func_exp,
    },
    {
      code: `class test { hello(): void }`,
      nodeType: 'TSEmptyBodyFunctionExpression',
      testType: 'empty function',
      expectedName: 'hello',
      expectedStatement: '(): void',
    },
    {
      code: func_declare,
      nodeType: 'TSDeclareFunction',
      testType: 'declare function',
      expectedName: 'hello',
      expectedStatement: func_declare,
    },
  ])('$nodeType - $testType', async ({ code, nodeType, expectedName, expectedStatement }) => {
    let result = await mapNode(code, nodeType);

    expect(result).toEqual({
      name: expectedName,
      statement: expectedStatement,
    });
  });
});

describe('collect functions', () => {
  const _collectNode = async (source: string, filter?: (node: FunctionLike, info: NodeInfo) => boolean) => {
    let ctx = {
      $ast: typescriptAdapter.parse(source, {}),
    };
    let result = await collectFunctions(ctx as any, filter);
    console.log(JSON.stringify(result));
    return result;
  };

  fit('function declaration', async () => {
    let ts = /* ts */ `
    function hello(test?: string, other: (t: string) => Promise<number>) {
      let x=50;
      return x;
    }`;

    let result = await _collectNode(ts);

    expect(result).toEqual([
      {
        node: expect.objectContaining({
          type: 'FunctionDeclaration',
          id: expect.objectContaining({
            name: 'hello',
          }),
        }),
        mapped: {
          name: 'hello',
          statement: ts.trim(),
          // TODO: fix this
          types: ['string', 'Promise<number>', 'string', 'Promise<number>', 'string', 'number'],
        },
        type: 'FunctionDeclaration',
        path: ['$root', 'body', 0],
      },
    ]);
  });

  it('filter function declarations by name', async () => {
    let ts = /* ts */ `
    function hello(test?: string, other: (t: string) => Promise<number>) {
      let x=50;
      return x;
    }

    function goodbye(test?: string, other: (t: string) => Promise<number>) {
      let x=50;
      return x;
    }
    `;

    let result = await _collectNode(ts, (node, info) => node.id.name == 'goodbye');

    expect(result).toEqual([
      {
        node: expect.objectContaining({
          type: 'FunctionDeclaration',
          id: expect.objectContaining({
            name: 'goodbye',
          }),
        }),
        mapped: {
          name: 'goodbye',
          statement: `function goodbye(test?: string, other: (t: string) => Promise<number>) {
      let x=50;
      return x;
    }`,
        },
        type: 'FunctionDeclaration',
        path: ['$root', 'body', 1],
      },
    ]);
  });

  it('function expression', async () => {
    let ts = /* ts */ `
    (function (test?: string, other: (t: string) => Promise<number>) {
      let x=50;
      return x;
    })()`;

    let result = await _collectNode(ts);

    expect(result).toEqual([
      {
        node: expect.objectContaining({
          type: 'FunctionExpression',
        }),
        mapped: {
          name: null,
          statement: `function (test?: string, other: (t: string) => Promise<number>) {
      let x=50;
      return x;
    }`,
        },
        type: 'FunctionExpression',
        path: ['$root', 'body', 0, 'expression', 'callee'],
      },
    ]);
  });

  it('arrow function expression', async () => {
    let ts = /* ts */ `
    (function (test?: string, other: (t: string) => Promise<number>) {
      let x=50;
      return x;
    })()`;

    let result = await _collectNode(ts);

    expect(result).toEqual([
      {
        node: expect.objectContaining({
          type: 'FunctionExpression',
        }),
        mapped: {
          name: null,
          statement: `function (test?: string, other: (t: string) => Promise<number>) {
      let x=50;
      return x;
    }`,
        },
        type: 'FunctionExpression',
        path: ['$root', 'body', 0, 'expression', 'callee'],
      },
    ]);
  });
});
