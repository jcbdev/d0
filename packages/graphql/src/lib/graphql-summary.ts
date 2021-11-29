import { Action, Context } from '@d0/core';
import { walk } from '@d0/walker';
import { DocumentNode } from 'graphql';
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

export const graphQLSummary = (name: string, resolve: Function): Action => {
  return async (ctx: Context) => {
    await walk<GraphQLVisitor>(name, resolve, graphQLSelector, {
      enter: {
        Location: node => null,
      },
      leave: {
        ['*Value']: node => (node as any).value,
        ListValue: node => [...node.values],
        NullValue: node => null,
        ObjectValue: node => node,

        // ObjectField: node => ({ name: node.name, value: node.value }),
        ObjectField: node => node.value,

        Name: node => node.value,
        Argument: node => ({ name: node.name, value: node.value }),
        Directive: node => ({ name: node.name, arguments: node.arguments }),
        Document: node => node.definitions,
        NamedType: node => ({
          type: node.name, //returns the value
          isNull: true,
          isArray: false,
        }),
        ListType: node => ({
          ...node.type,
          isArray: true,
        }),
        NonNullType: node => ({
          //spread returned object from NamedType
          ...node.type,
          isNull: false,
        }),
        InputValueDefinition: node => ({
          //spread returned object from NamedType or NotNullType
          ...node.type,
          name: node.name,
          directives: node.directives,
        }),
        FieldDefinition: node => ({
          //spread returned object from NamedType or NotNullType
          ...node.type,
          name: node.name,
          directives: node.directives,
        }),
        ScalarTypeDefinition: node => ({ type: 'Scalar', name: node.name }),
        EnumTypeDefinition: node => ({
          type: 'Enum',
          name: node.name,
          directives: node.directives,
          values: node.values.map(v => v.name),
        }),
        InputObjectTypeDefinition: node => ({
          type: 'Input',
          name: node.name,
          fields: node.fields,
          directives: node.directives,
        }),
        ObjectTypeDefinition: node => ({
          type: 'Object',
          name: node.name,
          fields: node.fields,
          directives: node.directives,
        }),
        arguments: nodes => reduceBy('name', nodes, item => item.value),
        directives: nodes => reduceBy('name', nodes, item => item),
        // definitions: nodes => reduce(node),
        fields: nodes => reduceBy('name', nodes, item => item),
        // fields: nodes =>
        //   reduceBy('name', nodes, item => {
        //     const { name, ...otherFields } = item;
        //     return otherFields;
        //   }),
      },
    })(ctx);
    return ctx;
  };
};
