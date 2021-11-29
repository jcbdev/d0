import { NodeSelector } from '@d0/walker';
import { pascalCase } from 'pascal-case';

export const graphQLSelector: NodeSelector = {
  array: (node, info) => {
    // console.log(info.name);
    // return pascalCase(info.name);
    return info.name;
  },
  object: (node, info) => {
    // console.log(node?.kind);
    return info.name == 'loc' ? 'Location' : pascalCase(node.kind);
  },
  primitive: (node, info) => 'Primitive',
};
