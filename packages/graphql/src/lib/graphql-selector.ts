import { NodeSelector } from '@d0/walker';
import { pascalCase } from 'pascal-case';

export const graphQLSelector: NodeSelector = {
  array: (node, info) => {
    return info.name;
  },
  object: (node, info) => {
    // console.log(info);
    return info.name == 'loc' ? 'Location' : pascalCase(node.kind);
  },
  primitive: (node, info) => 'Primitive',
};
