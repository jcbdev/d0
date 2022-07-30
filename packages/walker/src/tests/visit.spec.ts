import { NodeSelector, Visitor } from '../lib/types';
import { visit } from '../utils/visit';
import {
  expectSomeObject,
  expectAnArray,
  expectNotPrimitive,
  expectFullObject,
  expectBaseNodeInfo,
  expectObjectNodeInfo,
  expectArrayNodeInfo,
  expectPrimitiveNodeInfo,
} from './expects';

describe('visit an object structure', () => {
  it('should call visitor hooks for each node', async () => {
    const selector: NodeSelector = {
      object: (node, info) => 'Object',
      array: (node, info) => 'Array',
      primitive: (node, info) => 'Primitive',
    };

    const visitor: Visitor<any> = {
      Object: {
        enter: (node, info, ctx) => {
          ctx[`Object.enter.${info.path.join('.')}`] = { node, info };
          return { node, intention: 'PROCESS' };
        },
        leave: (node, info, ctx) => {
          ctx[`Object.leave.${info.path.join('.')}`] = { node, info };
          return node;
        },
      },
      Array: {
        enter: (node, info, ctx) => {
          ctx[`Array.enter.${info.path.join('.')}`] = { node, info };
          return { node, intention: 'PROCESS' };
        },
        leave: (node, info, ctx) => {
          ctx[`Array.leave.${info.path.join('.')}`] = { node, info };
          return node;
        },
      },
      Primitive: {
        enter: (node, info, ctx) => {
          ctx[`Primitive.enter.${info.path.join('.')}`] = { node, info };
          return { node, intention: 'PROCESS' };
        },
        leave: (node, info, ctx) => {
          ctx[`Primitive.leave.${info.path.join('.')}`] = { node, info };
          return node;
        },
      },
      enter: {
        Object: (node, info, ctx) => {
          ctx[`enter.Object.${info.path.join('.')}`] = { node, info };
          return { node, intention: 'PROCESS' };
        },
        Array: (node, info, ctx) => {
          ctx[`enter.Array.${info.path.join('.')}`] = { node, info };
          return { node, intention: 'PROCESS' };
        },
        Primitive: (node, info, ctx) => {
          ctx[`enter.Primitive.${info.path.join('.')}`] = { node, info };
          return { node, intention: 'PROCESS' };
        },
      },
      leave: {
        Object: (node, info, ctx) => {
          ctx[`leave.Object.${info.path.join('.')}`] = { node, info };
          return node;
        },
        Array: (node, info, ctx) => {
          ctx[`leave.Array.${info.path.join('.')}`] = { node, info };
          return node;
        },
        Primitive: (node, info, ctx) => {
          ctx[`leave.Primitive.${info.path.join('.')}`] = { node, info };
          return node;
        },
      },
    };

    let ctx = {};
    let result = await visit<any>(
      {
        someObject: {
          test: 'string',
        },
        anArray: [1, 2, 3],
        notprimitive: new Date(),
      },
      selector,
      visitor,
      ctx
    );
    expect(result).toMatchObject({
      someObject: {
        test: 'string',
      },
      anArray: [1, 2, 3],
      notprimitive: expect.any(Date),
    });

    // console.log(JSON.stringify(ctx, null, 2));
    // return;
    expect(ctx).toEqual({
      'enter.Object.$root': {
        node: expectFullObject(),
        info: expectObjectNodeInfo('$root', ['$root']),
      },
      'enter.Object.$root.someObject': {
        node: expectSomeObject(),
        info: expectObjectNodeInfo('someObject', ['$root', 'someObject'], {
          pathAncestors: [expectFullObject()],
          nodeAncestors: [expectFullObject()],
          parent: expectFullObject(),
        }),
      },
      'enter.Array.$root.anArray': {
        node: expectAnArray(),
        info: expectArrayNodeInfo('anArray', ['$root', 'anArray'], {
          pathAncestors: [expectFullObject()],
          nodeAncestors: [expectFullObject()],
          parent: expectFullObject(),
        }),
      },
      'enter.Primitive.$root.notprimitive': {
        node: expectNotPrimitive(),
        info: expectPrimitiveNodeInfo('notprimitive', ['$root', 'notprimitive'], {
          pathAncestors: [expectFullObject()],
          nodeAncestors: [expectFullObject()],
          parent: expectFullObject(),
        }),
      },
      'enter.Primitive.$root.someObject.test': {
        node: 'string',
        info: expectPrimitiveNodeInfo('test', ['$root', 'someObject', 'test'], {
          pathAncestors: [expectFullObject(), expectSomeObject()],
          nodeAncestors: [expectFullObject(), expectSomeObject()],
          parent: expectSomeObject(),
        }),
      },
      'enter.Primitive.$root.anArray.0': {
        node: 1,
        info: expectPrimitiveNodeInfo('anArray', ['$root', 'anArray', 0], {
          pathAncestors: [expectFullObject(), expectAnArray()],
          nodeAncestors: [expectFullObject()],
          parent: expectFullObject(),
          index: 0,
        }),
      },
      'enter.Primitive.$root.anArray.1': {
        node: 2,
        info: expectPrimitiveNodeInfo('anArray', ['$root', 'anArray', 1], {
          pathAncestors: [expectFullObject(), expectAnArray()],
          nodeAncestors: [expectFullObject()],
          parent: expectFullObject(),
          index: 1,
        }),
      },
      'enter.Primitive.$root.anArray.2': {
        node: 3,
        info: expectPrimitiveNodeInfo('anArray', ['$root', 'anArray', 2], {
          pathAncestors: [expectFullObject(), expectAnArray()],
          nodeAncestors: [expectFullObject()],
          parent: expectFullObject(),
          index: 2,
        }),
      },
      'leave.Primitive.$root.notprimitive': {
        node: expectNotPrimitive(),
        info: expectPrimitiveNodeInfo('notprimitive', ['$root', 'notprimitive'], {
          pathAncestors: [expectFullObject()],
          nodeAncestors: [expectFullObject()],
          parent: expectFullObject(),
        }),
      },
      'leave.Primitive.$root.someObject.test': {
        node: 'string',
        info: expectPrimitiveNodeInfo('test', ['$root', 'someObject', 'test'], {
          pathAncestors: [expectFullObject(), expectSomeObject()],
          nodeAncestors: [expectFullObject(), expectSomeObject()],
          parent: expectSomeObject(),
        }),
      },
      'leave.Primitive.$root.anArray.0': {
        node: 1,
        info: expectPrimitiveNodeInfo('anArray', ['$root', 'anArray', 0], {
          pathAncestors: [expectFullObject(), expectAnArray()],
          nodeAncestors: [expectFullObject()],
          parent: expectFullObject(),
          index: 0,
        }),
      },
      'leave.Primitive.$root.anArray.1': {
        node: 2,
        info: expectPrimitiveNodeInfo('anArray', ['$root', 'anArray', 1], {
          pathAncestors: [expectFullObject(), expectAnArray()],
          nodeAncestors: [expectFullObject()],
          parent: expectFullObject(),
          index: 1,
        }),
      },
      'leave.Primitive.$root.anArray.2': {
        node: 3,
        info: expectPrimitiveNodeInfo('anArray', ['$root', 'anArray', 2], {
          pathAncestors: [expectFullObject(), expectAnArray()],
          nodeAncestors: [expectFullObject()],
          parent: expectFullObject(),
          index: 2,
        }),
      },
      'leave.Object.$root.someObject': {
        node: expectSomeObject(),
        info: expectObjectNodeInfo('someObject', ['$root', 'someObject'], {
          pathAncestors: [expectFullObject()],
          nodeAncestors: [expectFullObject()],
          parent: expectFullObject(),
        }),
      },
      'leave.Array.$root.anArray': {
        node: expectAnArray(),
        info: expectArrayNodeInfo('anArray', ['$root', 'anArray'], {
          pathAncestors: [expectFullObject()],
          nodeAncestors: [expectFullObject()],
          parent: expectFullObject(),
        }),
      },
      'leave.Object.$root': {
        node: expectFullObject(),
        info: expectObjectNodeInfo('$root', ['$root']),
      },
    });
  });

  it('Should transform values', async () => {
    const selector: NodeSelector = {
      object: (node, info) => info.name,
      array: (node, info) => info.name,
      primitive: (node, info) => info.name,
    };

    const visitor: Visitor<any> = {
      enter: {
        remove: node => ({ node: node, intention: 'REMOVE' }),
      },
      leave: {
        testObject: node => ({
          some: 'transform',
        }),
        someArray: node => [1, 1, 1, 1],
        aString: node => 'Hello',
      },
    };

    let ctx = {};
    let result = await visit(
      {
        testObject: { original: 'gangster' },
        someArray: ['is', 'totally', 'different'],
        aString: 'World',
        remove: {
          this: 'all',
          will: ['disappear'],
        },
      },
      selector,
      visitor,
      ctx
    );

    expect(result).toEqual({
      testObject: { some: 'transform' },
      someArray: [1, 1, 1, 1],
      aString: 'Hello',
    });
  });
});
