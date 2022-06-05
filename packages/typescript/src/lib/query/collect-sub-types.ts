import { TypescriptCtx } from '../types';
import { NodeInfo, collect, CollectResult, CollectMappers } from '@d0/walker';
import { TSESTree } from '@typescript-eslint/types';
import { nodeStatement } from '../walker/typescript-walker';

type SubTypeSummary = {
  types: string[];
};

type AllTypeNodes =
  | TSESTree.TypeNode
  | TSESTree.TypeElement
  | TSESTree.TSEmptyBodyFunctionExpression
  | TSESTree.FunctionExpression
  | TSESTree.FunctionDeclaration;

export const collectSubTypes = async <TFlex>(
  ctx: TypescriptCtx<TFlex>,
  filter?: (node: AllTypeNodes, info: NodeInfo) => boolean
): Promise<CollectResult<AllTypeNodes, SubTypeSummary>[]> => {
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
      'TSConstructSignatureDeclaration',
      'TSJSDocNullableType',
      'TSEmptyBodyFunctionExpression',
      'FunctionExpression',
      'FunctionDeclaration',
      'TSPropertySignature',
      'TSIndexSignature',
    ].find(f => f == node.type);
  };

  let types = async (node: TSESTree.Node): Promise<CollectResult<AllTypeNodes, SubTypeSummary>[]> =>
    await collect<AllTypeNodes, SubTypeSummary, TSESTree.Node>(
      node as TSESTree.Node,
      selector,
      filter,
      mapType,
      { sourceCode: ctx.$ast.sourceCode, collectMore: types }
    );

  return types(ctx.$ast.ast as TSESTree.Node);
};

const collectMoreSubTypes = async (
  items: TSESTree.Node[],
  collectMore: (node: TSESTree.Node) => Promise<CollectResult<AllTypeNodes, SubTypeSummary>[]>
) => {
  let more = await Promise.all((items ?? []).map(async p => await collectMore(p)));
  let flat = [].concat.apply([], more);
  return [].concat.apply(
    [],
    flat.map(m => m.mapped?.types)
  );
};

const statementType = async (node, info, currentMap, data) => ({
  types: [...currentMap.types, nodeStatement(node, data.sourceCode)],
});

const conditionalType = async (node, info, currentMap, data) => ({
  types: [
    ...currentMap.types,
    nodeStatement(node.checkType, data.sourceCode),
    nodeStatement(node.extendsType, data.sourceCode),
    nodeStatement(node.trueType, data.sourceCode),
    nodeStatement(node.falseType, data.sourceCode),
  ],
});

const functionType = async (node, info, currentMap, data) => ({
  types: [
    ...currentMap.types,
    ...(!node.returnType ? [] : [nodeStatement(node.returnType.typeAnnotation, data.sourceCode)]),
    ...(await collectMoreSubTypes(node.typeParameters?.params, data.collectMore)),
    ...(await collectMoreSubTypes(node.params, data.collectMore)),
  ],
});

const indexType = async (node, info, currentMap, data) => ({
  types: [
    ...currentMap.types,
    ...(await collectMoreSubTypes([node.objectType], data.collectMore)),
    ...(await collectMoreSubTypes([node.indexType], data.collectMore)),
  ],
});

const mappedType = async (node, info, currentMap, data) => ({
  types: [
    ...currentMap.types,
    nodeStatement(node.typeParameter, data.sourceCode),
    nodeStatement(node.typeAnnotation, data.sourceCode),
  ],
});

const unionType = async (node, info, currentMap, data) => ({
  types: [...currentMap.types, ...(await collectMoreSubTypes(node.types, data.collectMore))],
});

const tupleType = async (node, info, currentMap, data) => ({
  types: [...currentMap.types, ...(await collectMoreSubTypes(node.elementTypes, data.collectMore))],
});

const membersType = async (node, info, currentMap, data) => ({
  types: [...currentMap.types, ...(await collectMoreSubTypes([node.typeAnnotation], data.collectMore))],
});

const indexSignature = async (node, info, currentMap, data) => ({
  types: [
    ...currentMap.types,
    ...(node.parameters ?? []).map(p => nodeStatement(p, data.sourceCode)),
    nodeStatement(node.typeAnnotation.typeAnnotation, data.sourceCode),
  ],
});

export const mapType: CollectMappers<AllTypeNodes, SubTypeSummary> = {
  types: async (node, info, currentMap, data) => {
    if (!currentMap.types) currentMap.types = [];
    switch (node.type) {
      case 'TSAnyKeyword':
      case 'TSBooleanKeyword':
      case 'TSNeverKeyword':
      case 'TSNullKeyword':
      case 'TSNumberKeyword':
      case 'TSObjectKeyword':
      case 'TSStringKeyword':
      case 'TSSymbolKeyword':
      case 'TSUnknownKeyword':
      case 'TSUndefinedKeyword':
      case 'TSVoidKeyword':
      case 'TSBigIntKeyword':
      case 'TSArrayType':
        return await statementType(node, info, currentMap, data);
      case 'TSConditionalType':
        return await conditionalType(node, info, currentMap, data);
      case 'TSConstructorType':
      case 'FunctionExpression':
      case 'FunctionDeclaration':
      case 'TSFunctionType':
        return await functionType(node, info, currentMap, data);
      case 'TSImportType':
        return await statementType(node, info, currentMap, data);
      case 'TSIndexedAccessType':
        return await indexType(node, info, currentMap, data);
      // case 'TSInferType':
      case 'TSLiteralType':
        return await statementType(node, info, currentMap, data);
      case 'TSMappedType':
        return await mappedType(node, info, currentMap, data);
      // case 'TSNamedTupleMember':
      // case 'TSOptionalType':
      // case 'TSParenthesizedType':
      // case 'TSRestType':
      // case 'TSTemplateLiteralType':
      // case 'TSThisType':
      case 'TSTupleType':
        return await tupleType(node, info, currentMap, data);
      // case 'TSTypeLiteral':
      // case 'TSTypeOperator':
      // case 'TSTypePredicate':
      // case 'TSTypeQuery':
      case 'TSTypeReference':
        return await statementType(node, info, currentMap, data);
      case 'TSIntersectionType':
      case 'TSUnionType':
        return await unionType(node, info, currentMap, data);
      // case 'TSIntrinsicKeyword':
      case 'TSEmptyBodyFunctionExpression':
      case 'TSConstructSignatureDeclaration':
        return await functionType(node, info, currentMap, data);
      case 'TSPropertySignature':
        return await membersType(node, info, currentMap, data);
      case 'TSIndexSignature':
        return await indexSignature(node, info, currentMap, data);
      default:
        // bugfix for missing types
        if ((node as any).type == 'TSJSDocNullableType')
          return await statementType(node, info, currentMap, data);
        return { types: [] };
    }
  },
};
