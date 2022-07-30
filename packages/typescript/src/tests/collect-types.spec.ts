import { typescriptAdapter } from '../lib/typescript-adapter';
import { collectTypes, mapType } from '../lib/query/collect-types';
import { find } from '@d0/walker';

const simple_type = (t: string) => `let hello: ${t};`;
const type_def = (t: string) => `type hello = ${t};`;
const interface_def = (t: string) => `interface hello { ${t} }`;
const class_def = (t: string) => `class hello { ${t} }`;

const keyword = (t: string) => ({ op: 'Keyword', types: [t] });
const arrayOf = (t: any) => ({ op: 'Array', types: [t] });
const conditional = (check: any, extend: any, trueType: any, falseType: any) => ({
  op: 'Conditional',
  types: [check, extend, trueType, falseType],
});

describe.skip('map types', () => {
  const mapNode = async (source: string, type: string) => {
    let ctx = {
      $ast: typescriptAdapter.parse(source, {}),
    };

    let nodeInfo = await find(ctx.$ast.ast as any, (node, info) => node.type == type);
    if (!nodeInfo) console.log(JSON.stringify(ctx.$ast.ast));
    // console.log(nodeInfo);
    let result = await mapType.types(nodeInfo.node, nodeInfo.info, {} as any, {
      sourceCode: ctx.$ast.sourceCode,
    });
    result = await mapType.statement(nodeInfo.node, nodeInfo.info, result, {
      sourceCode: ctx.$ast.sourceCode,
    });
    result = await mapType.name(nodeInfo.node, nodeInfo.info, result, {
      sourceCode: ctx.$ast.sourceCode,
    });
    return result;
  };

  // it.each<{ keyword: string; expectedType: any; expectedStatement?: string }>([
  //   { keyword: 'any', expectedType: keyword('any') },
  //   { keyword: 'boolean', expectedType: keyword('boolean') },
  //   { keyword: 'never', expectedType: keyword('never') },
  //   { keyword: 'null', expectedType: keyword('null') },
  //   { keyword: 'number', expectedType: keyword('number') },
  //   { keyword: 'object', expectedType: keyword('object') },
  //   { keyword: 'string', expectedType: keyword('string') },
  //   { keyword: 'symbol', expectedType: keyword('symbol') },
  //   { keyword: 'unknown', expectedType: keyword('unknown') },
  //   { keyword: 'undefined', expectedType: keyword('undefined') },
  //   { keyword: 'void', expectedType: keyword('void') },
  //   { keyword: 'bigint', expectedType: keyword('bigint') },
  //   { keyword: 'any[]', expectedType: arrayOf(keyword('any')), expectedStatement: 'any[]' },
  // ])('map "$keyword"', async ({ keyword, expectedType, expectedStatement }) => {
  //   let result = await mapNode(simple_type(keyword), 'TSTypeAnnotation');

  //   expect(result).toEqual({
  //     name: 'hello',
  //     types: expectedType,
  //     statement: expectedStatement ?? keyword,
  //   });
  // });

  it.each<{
    typedef: string;
    typeFunc: Function;
    nodeType: string;
    expectedType: any;
    expectedStatement?: string;
  }>([
    { typedef: 'any', typeFunc: simple_type, nodeType: 'TSTypeAnnotation', expectedType: keyword('any') },
    {
      typedef: 'boolean',
      typeFunc: simple_type,
      nodeType: 'TSTypeAnnotation',
      expectedType: keyword('boolean'),
    },
    { typedef: 'never', typeFunc: simple_type, nodeType: 'TSTypeAnnotation', expectedType: keyword('never') },
    { typedef: 'null', typeFunc: simple_type, nodeType: 'TSTypeAnnotation', expectedType: keyword('null') },
    {
      typedef: 'number',
      typeFunc: simple_type,
      nodeType: 'TSTypeAnnotation',
      expectedType: keyword('number'),
    },
    {
      typedef: 'object',
      typeFunc: simple_type,
      nodeType: 'TSTypeAnnotation',
      expectedType: keyword('object'),
    },
    {
      typedef: 'string',
      typeFunc: simple_type,
      nodeType: 'TSTypeAnnotation',
      expectedType: keyword('string'),
    },
    {
      typedef: 'symbol',
      typeFunc: simple_type,
      nodeType: 'TSTypeAnnotation',
      expectedType: keyword('symbol'),
    },
    {
      typedef: 'unknown',
      typeFunc: simple_type,
      nodeType: 'TSTypeAnnotation',
      expectedType: keyword('unknown'),
    },
    {
      typedef: 'undefined',
      typeFunc: simple_type,
      nodeType: 'TSTypeAnnotation',
      expectedType: keyword('undefined'),
    },
    { typedef: 'void', typeFunc: simple_type, nodeType: 'TSTypeAnnotation', expectedType: keyword('void') },
    {
      typedef: 'bigint',
      typeFunc: simple_type,
      nodeType: 'TSTypeAnnotation',
      expectedType: keyword('bigint'),
    },
    {
      typedef: 'any[]',
      typeFunc: simple_type,
      nodeType: 'TSTypeAnnotation',
      expectedType: arrayOf(keyword('any')),
      expectedStatement: 'any[]',
    },
    {
      typedef: 'object extends any ? number : string',
      typeFunc: type_def,
      nodeType: 'TSTypeAliasDeclaration',
      expectedType: conditional(keyword(' object'), keyword('any'), keyword('number'), keyword('string')),
    },
    {
      typedef: 'new (): Animal;',
      typeFunc: interface_def,
      nodeType: 'TSInterfaceDeclaration',
      expectedType: conditional(keyword('object'), keyword('any'), keyword('number'), keyword('string')),
    },
  ])('map "$typedef"', async ({ typedef, typeFunc, nodeType, expectedType, expectedStatement }) => {
    let result = await mapNode(typeFunc(typedef), nodeType);

    expect(result).toEqual({
      name: 'hello',
      types: expectedType,
      statement: expectedStatement ?? typedef,
    });
  });
});

// describe('collect types', () => {
//   it('function declaration', async () => {
//     let ts = /* ts */ `
//     function hello(test?: string, other: (t: string) => Promise<number>) {
//       let x=50;
//       return x;
//     }`;

//     let ctx = {
//       $ast: typescriptAdapter.parse(ts, {}),
//     };
//     let result = collectFunctions(ctx as any);
//     // console.log(JSON.stringify(result));

//     expect(result).toEqual([
//       {
//         node: expect.objectContaining({
//           type: 'FunctionDeclaration',
//           id: expect.objectContaining({
//             name: 'hello',
//           }),
//         }),
//         mapped: {
//           name: 'hello',
//           statement: ts.trim(),
//         },
//         type: 'FunctionDeclaration',
//         path: ['$root', 'body', 0],
//       },
//     ]);
//   });

//   it('filter function declarations by name', async () => {
//     let ts = /* ts */ `
//     function hello(test?: string, other: (t: string) => Promise<number>) {
//       let x=50;
//       return x;
//     }

//     function goodbye(test?: string, other: (t: string) => Promise<number>) {
//       let x=50;
//       return x;
//     }
//     `;

//     let ctx = {
//       $ast: typescriptAdapter.parse(ts, {}),
//     };
//     let result = collectFunctions(ctx as any, (node, info) => node.id.name == 'goodbye');
//     // console.log(JSON.stringify(result));

//     expect(result).toEqual([
//       {
//         node: expect.objectContaining({
//           type: 'FunctionDeclaration',
//           id: expect.objectContaining({
//             name: 'goodbye',
//           }),
//         }),
//         mapped: {
//           name: 'goodbye',
//           statement: `function goodbye(test?: string, other: (t: string) => Promise<number>) {
//       let x=50;
//       return x;
//     }`,
//         },
//         type: 'FunctionDeclaration',
//         path: ['$root', 'body', 1],
//       },
//     ]);
//   });

//   it('function expression', async () => {
//     let ts = /* ts */ `
//     (function (test?: string, other: (t: string) => Promise<number>) {
//       let x=50;
//       return x;
//     })()`;

//     let ctx = {
//       $ast: typescriptAdapter.parse(ts, {}),
//     };
//     let result = collectFunctions(ctx as any);

//     expect(result).toEqual([
//       {
//         node: expect.objectContaining({
//           type: 'FunctionExpression',
//         }),
//         mapped: {
//           name: null,
//           statement: `function (test?: string, other: (t: string) => Promise<number>) {
//       let x=50;
//       return x;
//     }`,
//         },
//         type: 'FunctionExpression',
//         path: ['$root', 'body', 0, 'expression', 'callee'],
//       },
//     ]);
//   });

//   it('arrow function expression', async () => {
//     let ts = /* ts */ `
//     (function (test?: string, other: (t: string) => Promise<number>) {
//       let x=50;
//       return x;
//     })()`;

//     let ctx = {
//       $ast: typescriptAdapter.parse(ts, {}),
//     };
//     let result = collectFunctions(ctx as any);

//     expect(result).toEqual([
//       {
//         node: expect.objectContaining({
//           type: 'FunctionExpression',
//         }),
//         mapped: {
//           name: null,
//           statement: `function (test?: string, other: (t: string) => Promise<number>) {
//       let x=50;
//       return x;
//     }`,
//         },
//         type: 'FunctionExpression',
//         path: ['$root', 'body', 0, 'expression', 'callee'],
//       },
//     ]);
//   });
// });
