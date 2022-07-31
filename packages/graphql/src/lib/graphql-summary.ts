import { Ctx, D0, ResolveD0 } from '@d0-it/core';
import { walk } from '@d0-it/walker';
import { ASTNode } from 'graphql';
import { graphQLSelector } from './graphql-selector';
import { GraphQLVisitor } from './types';

const reduceBy = (property: string, nodes: any[], transform: (any) => any) => {
  return nodes.reduce((obj, item) => {
    const prop = item[property];
    delete item[property];
    return {
      ...obj,
      [prop]: transform(item),
    };
  }, {});
};

const withOptional = (node: any, original: any, fields: string[]) => {
  for (let field of fields) if (original[field]) node[field] = original[field];
  return node;
};

export const graphQLSummary = <T = any>(name: string, resolve: ResolveD0<ASTNode, T>): D0<T> => {
  return async ctx => {
    await walk<ASTNode, T>(name, resolve, graphQLSelector, {
      enter: {
        Location: (node, info, ctx) => ({ node: null, intention: 'REMOVE' }),
        arguments: node => ({ node: node, intention: node.length ? 'PROCESS' : 'REMOVE' }),
        directives: node => ({ node: node, intention: node.length ? 'PROCESS' : 'REMOVE' }),
      },
      leave: {
        ['regex:.*Value']: node => (node as any).value,
        ListValue: node => [...node.values],
        NullValue: node => null,
        ObjectValue: node => node,

        ObjectField: node => ({ name: node.name, value: node.value }),
        // ObjectField: node => node.value,

        Name: node => node.value,
        Argument: node => ({ name: node.name, value: node.value }),
        Directive: node => withOptional({ name: node.name }, node, ['arguments', 'directives']),
        Document: node => node.definitions,
        NamedType: node => ({
          type: node.name, //returns the value
          nullable: true,
          array: false,
        }),
        ListType: node => ({
          ...node.type,
          array: true,
        }),
        NonNullType: node => ({
          //spread returned object from NamedType
          ...node.type,
          nullable: false,
        }),
        InputValueDefinition: node =>
          withOptional(
            {
              //spread returned object from NamedType or NotNullType
              ...node.type,
              name: node.name,
            },
            node,
            ['arguments', 'directives', 'defaultValue']
          ),
        FieldDefinition: node =>
          withOptional(
            {
              //spread returned object from NamedType or NotNullType
              ...node.type,
              name: node.name,
            },
            node,
            ['arguments', 'directives']
          ),
        ScalarTypeDefinition: node => ({ type: 'Scalar', name: node.name }),
        EnumTypeDefinition: node =>
          withOptional(
            {
              type: 'Enum',
              name: node.name,
              values: node.values.map(v => v.name),
            },
            node,
            ['arguments', 'directives']
          ),
        InputObjectTypeDefinition: node =>
          withOptional(
            {
              type: 'Input',
              name: node.name,
              fields: node.fields,
            },
            node,
            ['arguments', 'directives']
          ),
        ObjectTypeDefinition: node =>
          withOptional(
            {
              type: 'Object',
              name: node.name,
              fields: node.fields,
            },
            node,
            ['arguments', 'directives']
          ),
        arguments: nodes => {
          // console.log(`arguments ${JSON.stringify(nodes)}`);
          return reduceBy('name', nodes, item => item.value ?? item);
        },
        directives: nodes => reduceBy('name', nodes, item => item),
        //   // definitions: nodes => reduce(node),
        fields: (nodes, info) =>
          info.parent.kind != 'ObjectValue'
            ? reduceBy('name', nodes, item => item)
            : reduceBy('name', nodes, item => item.value),
        //   // fields: nodes =>
        //   //   reduceBy('name', nodes, item => {
        //   //     const { name, ...otherFields } = item;
        //   //     return otherFields;
        //   //   }),
        // },
      },
    } as GraphQLVisitor<Ctx<T>>)(ctx);
    return ctx;
  };
};
