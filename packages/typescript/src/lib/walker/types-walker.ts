import { NodeInfo, visit } from '@d0/walker';
import { typescriptSelector } from './typescript-selector';
import { TypescriptVisitor } from './types';
import { TSESTree } from '@typescript-eslint/types';
import { TypescriptCtx } from '../types';
import { nodeStatement } from './node-statement';

export const convertTypeNode = (node: TSESTree.Node, sourceCode: string) => {
  // if (Object.keys(node).includes('typeAnnotation'))
  //   return {
  //     statement: (node as any).statement ?? nodeStatement(node, sourceCode),
  //     types: [(node as any).typeAnnotation],
  //   };
  // else if (Object.keys(node).includes('types'))
  //   return {
  //     statement: (node as any).statement ?? nodeStatement(node, sourceCode),
  //     types: [...(node as any).types],
  //   };
  return (node as any).statement ?? nodeStatement(node, sourceCode);
};

export const getName = (node: any) => {
  console.log(node);
  return (
    node?.id?.name ??
    node?.key?.name ??
    node?.key?.escapedText ??
    node?.declaration?.declarations?.[0]?.id?.name ??
    node?.declarations?.[0]?.id?.name ??
    node?.source?.replace("'", '') ??
    null
  );
};

export const walkTypes = async <TFlex>(startNode: TSESTree.Node, ctx: TypescriptCtx<TFlex>) => {
  const visitor: TypescriptVisitor<TypescriptCtx<TFlex>> = {
    leave: {
      TSTypeAnnotation: (node: any, info, ctx) => ({ name: getName(node) ?? getName(info.parent) }),
      TSTypeAliasDeclaration: (node: any, info, ctx) => node.typeAnnotation,
      TSInterfaceDeclaration: (node: any, info, ctx) => node.body,
      TSArrayType: (node, info, ctx) => ({
        // types: [node.elementType],
        // op: 'Array',
        array: node.elementType,
      }),
      TSConditionalType: (node, info, ctx) => ({
        // types: [node.checkType, node.extendsType, node.trueType, node.falseType],
        // op: 'Conditional',
        conditional: {
          check: node.checkType,
          extend: node.extendsType,
          trueType: node.trueType,
          falseType: node.falseType,
        },
      }),
      TSConstructSignatureDeclaration: (node, info, ctx) => ({
        // types: [node.returnType, ...node.params],
        // op: 'Constructor',
        constructor: { returns: node.returnType, params: node.params },
        typeParams: node.typeParameters,
      }),
      // TSConstructorType: (node, info, ctx) => {
      //   return {
      //     types: [...node.params, node.typeParameters],
      //     op: 'Constructor',
      //   };
      // },
      // TSFunctionType: (node, info, ctx) => {},
      // TSImportType: (node, info, ctx) => {},
      // TSIndexedAccessType: (node, info, ctx) => {},
      // TSInferType: (node, info, ctx) => {},
      // TSIntersectionType: (node, info, ctx) => {},
      // TSLiteralType: (node, info, ctx) => {},
      // TSMappedType: (node, info, ctx) => {},
      // TSNamedTupleMember: (node, info, ctx) => {},
      // TSOptionalType: (node, info, ctx) => {},
      // TSParenthesizedType: (node, info, ctx) => {},
      // TSRestType: (node, info, ctx) => {},
      // TSTemplateLiteralType: (node, info, ctx) => {},
      // TSThisType: (node, info, ctx) => {},
      // TSTupleType: (node, info, ctx) => {},
      // TSTypeLiteral: (node, info, ctx) => {},
      // TSTypeOperator: (node, info, ctx) => {},
      // TSTypePredicate: (node, info, ctx) => {},
      // TSTypeQuery: (node, info, ctx) => {},
      TSTypeReference: (node, info, ctx) => ({
        ref: node.typeName,
      }),
      // TSUnionType: (node, info, ctx) => {},
      regex: [
        {
          exp: /TS(.+)Keyword/,
          do: (node, info, ctx) => {
            let type = node.type.replace('TS', '').replace('Keyword', '');
            return {
              // types: [type.toLowerCase()],
              // op: 'Keyword',
              keyword: type.toLowerCase(),
            };
          },
        },
        {
          exp: /TS(.+)/,
          do: (node, info, ctx) => {
            // return convertTypeNode(node, ctx.$ast.sourceCode);
            console.log(node);
            throw new Error(`unknown type '${node.type}'`);
            // return nodeStatement(node, ctx.$ast.sourceCode);
          },
        },
        {
          exp: /(.+)/,
          do: (node, info, ctx) => {
            return node;
          },
        },
      ],
    },
  };

  return await visit<TSESTree.Node, TypescriptCtx<TFlex>>(startNode, typescriptSelector, visitor, ctx);
};
