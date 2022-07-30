import { NodeInfo, visit } from '@d0-it/walker';
import { typescriptSelector } from './typescript-selector';
import { TypescriptVisitor } from './types';
import { TSESTree } from '@typescript-eslint/types';
import { TypescriptCtx } from '../types';

export const convertAbbreviatedNode = (node: TSESTree.Node, sourceCode: string) => {
  if (Object.keys(node).includes('typeAnnotation'))
    return {
      statement:
        (node as any).statement ?? node.range
          ? sourceCode.substring(node.range[0], node.range[1])
          : undefined,
      types: [(node as any).typeAnnotation],
    };
  return (node as any).statement ?? node.range
    ? sourceCode.substring(node.range[0], node.range[1])
    : undefined;
};

export const getNodeId = (node: any) => {
  return (
    node.line +
    ':' +
    (node.id?.name ??
      node.key?.name ??
      node.key?.escapedText ??
      node.declaration?.declarations?.[0]?.id?.name ??
      node.declarations?.[0]?.id?.name ??
      node.source?.replace("'", '') ??
      (node.test?.left ? `${node.test?.left}${node.test?.operator}${node.test?.right}` : undefined) ??
      (node.expression?.left
        ? `${node.expression?.left?.name}${node.expression?.operator}${node.expression?.right?.statement}`
        : undefined) ??
      node.expression ??
      'unnamed')
  );
};

export const nodeStatement = (node: TSESTree.Node, sourceCode: string) => {
  return node.range ? sourceCode.substring(node.range[0], node.range[1]) : undefined;
};

type IndexCtx = { types: Statement[]; operations: Statement[] };
type Statement = { id: string; statement: string; line: number };
export const extractNodeTypes = (node: TSESTree.Node, sourceCode: string) => {
  const typeVisitor: TypescriptVisitor<IndexCtx> = {
    enter: {
      ['regex:(.+)']: (node: any, info, ctx) => {
        if (node.types)
          ctx.types = [
            ...ctx.types,
            ...node.types.map(t => ({
              id: t,
              statement: nodeStatement(node, sourceCode),
              line: node.loc?.start.line,
            })),
          ];
        if (node.type)
          ctx.operations = [
            ...ctx.operations,
            { id: node.type, statement: nodeStatement(node, sourceCode), line: node.loc?.start.line },
          ];
        return { intention: 'PROCESS', node: node };
      },
    },
  };
  let ctx: IndexCtx = { types: [], operations: [] };
  visit<TSESTree.Node, IndexCtx>(node, typescriptSelector, typeVisitor, ctx);
  return ctx;
};

// const stripProps = ['loc', 'range', 'statement', 'path', '$$id', 'type', 'typeAnnotation'];
const stripProps = ['statement', 'path'];
export const convertNode = (
  // keys: string[],
  full: boolean,
  node: TSESTree.Node,
  info: NodeInfo,
  sourceCode: string
) => {
  const nodeKeys = Object.keys(node);
  if (nodeKeys.filter(k => !stripProps.includes(k)).length > 0) {
    let newNode = {
      type: node.type,
    };
    // if (Object.keys(node).includes('typeAnnotation')) newNode['types'] = [(node as any).typeAnnotation];
    if (full) {
      newNode['statement'] = nodeStatement(node, sourceCode);
      newNode['path'] = info.path.join('.');
      // newNode['$$id'] = (node as any).$$id;
      newNode['line'] = node.loc?.start.line;
      let indexes = extractNodeTypes(node, sourceCode);
      newNode['types'] = indexes.types;
      newNode['operations'] = indexes.operations;
    }
    // } else {
    for (let key of nodeKeys.filter(k => !stripProps.includes(k))) {
      newNode[key] = node[key];
    }
    // }
    return newNode;
  }
  return (node as any).statement;
};

export const walkTypescript = async <TFlex>(ctx: TypescriptCtx<TFlex>) => {
  let id = 0;
  // const updateNodeId = (node: TSESTree.Node, info: NodeInfo, ctx: TypescriptCtx<TFlex>): TSESTree.Node => {
  //   if (info.nodeType != 'object') return node;
  //   id++;
  //   // let $id = uuidv4();
  //   let newNode = {
  //     ...node,
  //     $$id: id,
  //     path: info.path.join('.'),
  //     statement: node.range ? ctx.$ast.sourceCode.substring(node.range[0], node.range[1]) : undefined,
  //   } as any;
  //   if (!newNode.statement) delete newNode.statement;
  //   return newNode;
  // };

  const visitor: TypescriptVisitor<TypescriptCtx<TFlex>> = {
    enter: {
      // ['*']: (node, info, ctx) => {
      //   return { intention: 'PROCESS', node: updateNodeId(node, info, ctx) };
      // },
      regex: [
        {
          exp: /(.+)/,
          do: (node, info, ctx) => {
            if (info.nodeType == 'object') {
              if (
                ['BlockStatement', 'Program', 'ClassBody', 'TSInterfaceBody'].find(
                  p => p == info.parent?.type
                )
              ) {
                let indexes = extractNodeTypes(node, ctx.$ast.sourceCode);
                node['types'] = indexes.types;
                node['operations'] = indexes.operations;
                return {
                  intention: 'PROCESS',
                  node: {
                    type: node.type,
                    loc: node.loc,
                    range: node.range,
                    statement: nodeStatement(node, ctx.$ast.sourceCode),
                    types: indexes.types,
                    operations: indexes.operations,
                  } as any,
                };
              } else
                return {
                  intention: 'PROCESS',
                  node: node,
                };
            } else
              return {
                intention: 'PROCESS',
                node: node,
              };
          },
        },
      ],
    },
    leave: {
      // [`MemberExpression,
      //   ChainExpression,
      //   UpdateExpression,
      //   UnaryExpression,
      //   TSAsExpression,
      //   ImportExpression,
      //   Literal,
      //   TemplateLiteral,
      //   TSTypeReference,
      //   TSQualifiedName`]: (node, info, ctx) => {
      //   return convertAbbreviatedNode(node, ctx.$ast.sourceCode);
      // },
      // TSTypeAnnotation: (node: any, info, ctx) => {
      //   if (node.types) return node.types;
      //   return node.typeAnnotation;
      // },
      // ExportSpecifier: (node: any, info, ctx) => {
      //   if ((node.local?.name ?? node.local) == (node.exported?.name ?? node.exported))
      //     return node.local?.name ?? node.local;
      //   else return `${node.exported?.name ?? node.exported} as ${node.local?.name ?? node.local}`;
      // },
      EmptyStatement: (node, info, ctx) => {
        return { type: 'EmptyStatement' };
      },
      // ['body']: (node: any, info, ctx) => {
      //   if (Array.isArray(node)) {
      //     let returnNode = {};
      //     for (let n of node) {
      //       if (!returnNode[n.type]) returnNode[n.type] = {};
      //       returnNode[n.type][getNodeId(n)] = n;
      //     }
      //     return returnNode;
      //   }
      //   return node;
      // },
      regex: [
        // {
        //   exp: /Import(.*)Specifier/,
        //   do: (node: any, info, ctx) => {
        //     if ((node.local?.name ?? node.local) == (node.imported?.name ?? node.imported))
        //       return node.local?.name ?? node.local;
        //     else return `${node.imported?.name ?? node.imported} as ${node.local?.name ?? node.local}`;
        //   },
        // },
        // {
        //   exp: /TS(.+)Keyword/,
        //   do: (node, info, ctx) => {
        //     let type = node.type.replace('TS', '').replace('Keyword', '');
        //     if (['BigInt'].includes(type)) return type;
        //     return type.toLowerCase();
        //   },
        // },
        // {
        //   exp: /(.+)Statement/,
        //   do: (node, info, ctx) => {
        //     // console.log(info.parent.type);
        //     if (Array.isArray(node)) return node;
        //     if (
        //       ['BlockStatement', 'Program', 'ClassBody', 'TSInterfaceBody'].find(p => p == info.parent?.type)
        //     )
        //       return convertNode(true, node, info, ctx.$ast.sourceCode);
        //     else return convertNode(false, node, info, ctx.$ast.sourceCode);
        //   },
        // },
        // {
        //   exp: /(.+)Declaration/,
        //   do: (node, info, ctx) => {
        //     if (Array.isArray(node)) return node;
        //     if (
        //       ['BlockStatement', 'Program', 'ClassBody', 'TSInterfaceBody'].find(p => p == info.parent?.type)
        //     )
        //       return convertNode(true, node, info, ctx.$ast.sourceCode);
        //     else return convertNode(false, node, info, ctx.$ast.sourceCode);
        //   },
        // },
        // {
        //   exp: /(.+)/,
        //   do: (node, info, ctx) => {
        //     if (Array.isArray(node)) return node;
        //     if (
        //       ['BlockStatement', 'Program', 'ClassBody', 'TSInterfaceBody'].find(p => p == info.parent?.type)
        //     )
        //       return convertNode(true, node, info, ctx.$ast.sourceCode);
        //     return convertNode(false, node, info, ctx.$ast.sourceCode);
        //   },
        // },
      ],
      // ['regex:Import(.*)Specifier']: (node: any, info, ctx) => {
      //   if ((node.local?.name ?? node.local) == (node.imported?.name ?? node.imported))
      //     return node.local?.name ?? node.local;
      //   else return `${node.imported?.name ?? node.imported} as ${node.local?.name ?? node.local}`;
      // },
      // ['regex:TS(.+)Keyword']: (node, info, ctx) => {
      //   let type = node.type.replace('TS', '').replace('Keyword', '');
      //   if (['BigInt'].includes(type)) return type;
      //   return type.toLowerCase();
      // },
      // ['regex:(.+)Statement']: (node, info, ctx) => {
      //   // console.log(info.parent.type);
      //   if (Array.isArray(node)) return node;
      //   if (['BlockStatement', 'Program', 'ClassBody', 'TSInterfaceBody'].find(p => p == info.parent?.type))
      //     return convertNode(true, node, info, ctx.$ast.sourceCode);
      //   else return convertNode(false, node, info, ctx.$ast.sourceCode);
      // },
      // ['regex:(.+)Declaration']: (node, info, ctx) => {
      //   if (Array.isArray(node)) return node;
      //   if (['BlockStatement', 'Program', 'ClassBody', 'TSInterfaceBody'].find(p => p == info.parent?.type))
      //     return convertNode(true, node, info, ctx.$ast.sourceCode);
      //   else return convertNode(false, node, info, ctx.$ast.sourceCode);
      // },
      // [`regex:(.+)`]: (node, info, ctx) => {
      //   if (Array.isArray(node)) return node;
      //   if (['BlockStatement', 'Program', 'ClassBody', 'TSInterfaceBody'].find(p => p == info.parent?.type))
      //     return convertNode(true, node, info, ctx.$ast.sourceCode);
      //   return convertNode(false, node, info, ctx.$ast.sourceCode);
      // },
    },
  };

  return await visit<TSESTree.Node, TypescriptCtx<TFlex>>(
    ctx.$ast.ast as TSESTree.Node,
    typescriptSelector,
    visitor,
    ctx
  );
};

const props = [
  'alternate',
  'argument',
  'arguments',
  'async',
  'block',
  'body',
  'callee',
  'cases',
  'computed',
  'consequent',
  'declaration',
  'declarations',
  'declare',
  'decorators',
  'definite',
  'delegate',
  'directive',
  'discriminant',
  'elements',
  'exportKind',
  'expression',
  'expressions',
  'finalizer',
  'generator',
  'handler',
  'id',
  'init',
  'key',
  'kind',
  'label',
  'left',
  'method',
  'name',
  'object',
  'operator',
  'optional',
  'param',
  'params',
  'prefix',
  'properties',
  'returnType',
  'right',
  'source',
  'specifiers',
  'static',
  'test',
  'typeParameters',
  'types',
  'update',
  'value',
];
