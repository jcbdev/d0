import { NodeSelector } from '@d0-it/walker';
import { pascalCase } from 'pascal-case';

export const estreeSelector: NodeSelector = {
  array: (node, info) => {
    return info.name;
  },
  object: (node, info) => {
    // console.log(info);
    return node.type;
  },
  primitive: (node, info) => 'Primitive',
};
