import { TSESTree } from '@typescript-eslint/typescript-estree';

export const nodeStatement = (node: TSESTree.Node, sourceCode: string) => {
  return node.range ? sourceCode.substring(node.range[0], node.range[1]) : undefined;
};
