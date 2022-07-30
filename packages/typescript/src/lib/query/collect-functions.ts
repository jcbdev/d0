import { TypescriptCtx } from '../types';
import { NodeInfo, collect, CollectResult, CollectMappers } from '@d0-it/walker';
import { TSESTree } from '@typescript-eslint/types';
import { nodeStatement } from '../walker/typescript-walker';
import { collectSubTypes } from './collect-sub-types';

type FunctionSummary = {
  name: string;
  statement: string;
  types: string[];
  params: ParameterSummary[];
};

type ParameterSummary = {
  name: string;
  statement: string;
  types: string[];
};

export const collectFunctions = async <TFlex>(
  ctx: TypescriptCtx<TFlex>,
  filter?: (node: TSESTree.FunctionLike, info: NodeInfo) => boolean
  // map?: CollectMappers<TSESTree.FunctionLike, FunctionSummary>,
  // data?: any
): Promise<CollectResult<TSESTree.FunctionLike, FunctionSummary>[]> => {
  let functions = await collect<TSESTree.FunctionLike, FunctionSummary, TSESTree.Node>(
    ctx.$ast.ast as TSESTree.Node,
    (node, info) => {
      // console.log(info.);
      return !![
        'ArrowFunctionExpression',
        'FunctionDeclaration',
        'FunctionExpression',
        'TSDeclareFunction',
        'TSEmptyBodyFunctionExpression',
      ].find(f => f == node.type);
    },
    filter,
    mapFunction,
    { sourceCode: ctx.$ast.sourceCode }
  );

  return functions;
};

export const mapFunction: CollectMappers<TSESTree.FunctionLike, FunctionSummary> = {
  name: (node, info, currentMap, data) => {
    switch (node.type) {
      case 'FunctionDeclaration':
      case 'TSDeclareFunction':
        return { ...currentMap, name: node.id.name };
      case 'FunctionExpression':
      case 'ArrowFunctionExpression':
      case 'TSEmptyBodyFunctionExpression':
        if (info.parent?.id?.name) return { ...currentMap, name: info.parent?.id?.name };
        if (info.parent?.key?.name) return { ...currentMap, name: info.parent?.key?.name };
        else return { ...currentMap, name: null };
      default:
        return { ...currentMap, name: null };
    }
  },
  statement: (node, info, currentMap, data) => ({
    ...currentMap,
    statement: nodeStatement(node, data.sourceCode),
  }),
  types: async (node, info, currentMap, data) => {
    return {
      ...currentMap,
      types: (
        await collectSubTypes({
          $ast: { sourceCode: data.sourceCode, ast: node as any },
        } as any)
      )[0].mapped.types,
    };
  },
};
