import { NodeSelector } from '@d0/walker';
import { pascalCase } from 'pascal-case';

export const typescriptSelector: NodeSelector = {
  array: (node, info) => {
    return info.name;
  },
  object: (node, info) => {
    return node?.type;
  },
  primitive: (node, info) => undefined,
};
