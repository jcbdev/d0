import { TSESTreeOptions, TypescriptCtx } from '../types';
import { NodeInfo, collect, CollectResult, CollectMappers } from '@d0-it/walker';
import { TSESTree } from '@typescript-eslint/types';
import { walkTypes } from '../walker/types-walker';
import { nodeStatement } from '../walker/node-statement';

type TypeSummary = {
  type: string;
  statement: string;
};

export const collectTypes = async <TFlex>(
  ctx: TypescriptCtx<TFlex>,
  filter?: (node: TSESTree.TypeNode, info: NodeInfo) => boolean
): Promise<CollectResult<TSESTree.TypeNode, TypeSummary>[]> => {
  let types = await collect<TSESTree.TypeNode, TypeSummary, TSESTree.Node>(
    ctx.$ast.ast as TSESTree.Node,
    (node, info) => {
      return !!['TSTypeAnnotation', 'TSTypeAliasDeclaration'].find(f => f == node.type);
    },
    filter,
    mapType,
    { sourceCode: ctx.$ast.sourceCode }
  );

  return types;
};

export const mapType: CollectMappers<TSESTree.Node, TypeSummary> = {
  types: async (node, info, currentMap, data) => {
    switch (node.type) {
      case 'TSTypeAnnotation':
      case 'TSTypeAliasDeclaration':
      case 'TSInterfaceDeclaration':
        // let test = await walkTypes(node, {
        //   $ast: { sourceCode: data.sourceCode, ast: node },
        // } as any);
        return {
          ...currentMap,
          types: await walkTypes(node, {
            $ast: { sourceCode: data.sourceCode, ast: node },
          } as any),
        };
      default:
        return { ...currentMap, types: null };
    }
  },
  statement: (node: any, info, currentMap, data) => ({
    ...currentMap,
    statement: nodeStatement(node.typeAnnotation, data.sourceCode),
  }),
  name: (node: any, info, currentMap, data) => {
    switch (node.type) {
      case 'TSTypeAnnotation':
        return {
          ...currentMap,
          name: info.parent.type == 'Identifier' ? info.parent.name : null,
        };
      case 'TSTypeAliasDeclaration':
      case 'TSInterfaceDeclaration':
        return {
          ...currentMap,
          name: node.id.name,
        };
      default:
        return { ...currentMap, name: null };
    }
  },
};
