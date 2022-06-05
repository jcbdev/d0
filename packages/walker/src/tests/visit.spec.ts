import { NodeSelector, Visitor } from '../lib/types';
import { visit } from '../utils/visit';

describe('visit an object structure', () => {
  it('should call visitor hooks for each node', () => {
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
    let result = visit<any>(
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

    // console.log(JSON.stringify(ctx));
    // return;
    expect(ctx).toEqual({
      'enter.Object.$root': {
        node: {
          someObject: {
            test: 'string',
          },
          anArray: [1, 2, 3],
          notprimitive: expect.any(Date),
        },
        info: {
          name: '$root',
          path: ['$root'],
          pathAncestors: [],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
        },
      },
      'Object.enter.$root': {
        node: {
          someObject: {
            test: 'string',
          },
          anArray: [1, 2, 3],
          notprimitive: expect.any(Date),
        },
        info: {
          name: '$root',
          path: ['$root'],
          pathAncestors: [],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
        },
      },
      'enter.Object.$root.someObject': {
        node: {
          test: 'string',
        },
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'someObject'],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'someObject',
        },
      },
      'Object.enter.$root.someObject': {
        node: {
          test: 'string',
        },
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'someObject'],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'someObject',
        },
      },
      'enter.Primitive.$root.someObject.test': {
        node: 'string',
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              test: 'string',
            },
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              test: 'string',
            },
          ],
          path: ['$root', 'someObject', 'test'],
          parent: {
            test: 'string',
          },
          name: 'test',
        },
      },
      'Primitive.enter.$root.someObject.test': {
        node: 'string',
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              test: 'string',
            },
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              test: 'string',
            },
          ],
          path: ['$root', 'someObject', 'test'],
          parent: {
            test: 'string',
          },
          name: 'test',
        },
      },
      'leave.Primitive.$root.someObject.test': {
        node: 'string',
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              test: 'string',
            },
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              test: 'string',
            },
          ],
          path: ['$root', 'someObject', 'test'],
          parent: {
            test: 'string',
          },
          name: 'test',
        },
      },
      'Primitive.leave.$root.someObject.test': {
        node: 'string',
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              test: 'string',
            },
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              test: 'string',
            },
          ],
          path: ['$root', 'someObject', 'test'],
          parent: {
            test: 'string',
          },
          name: 'test',
        },
      },
      'leave.Object.$root.someObject': {
        node: {
          test: 'string',
        },
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'someObject'],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'someObject',
        },
      },
      'Object.leave.$root.someObject': {
        node: {
          test: 'string',
        },
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'someObject'],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'someObject',
        },
      },
      'enter.Array.$root.anArray': {
        node: [1, 2, 3],
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'anArray'],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'anArray',
        },
      },
      'Array.enter.$root.anArray': {
        node: [1, 2, 3],
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'anArray'],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'anArray',
        },
      },
      'enter.Primitive.$root.anArray.0': {
        node: 1,
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            [1, 2, 3],
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'anArray', 0],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'anArray',
          index: 0,
        },
      },
      'Primitive.enter.$root.anArray.0': {
        node: 1,
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            [1, 2, 3],
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'anArray', 0],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'anArray',
          index: 0,
        },
      },
      'leave.Primitive.$root.anArray.0': {
        node: 1,
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            [1, 2, 3],
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'anArray', 0],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'anArray',
          index: 0,
        },
      },
      'Primitive.leave.$root.anArray.0': {
        node: 1,
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            [1, 2, 3],
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'anArray', 0],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'anArray',
          index: 0,
        },
      },
      'enter.Primitive.$root.anArray.1': {
        node: 2,
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            [1, 2, 3],
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'anArray', 1],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'anArray',
          index: 1,
        },
      },
      'Primitive.enter.$root.anArray.1': {
        node: 2,
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            [1, 2, 3],
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'anArray', 1],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'anArray',
          index: 1,
        },
      },
      'leave.Primitive.$root.anArray.1': {
        node: 2,
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            [1, 2, 3],
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'anArray', 1],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'anArray',
          index: 1,
        },
      },
      'Primitive.leave.$root.anArray.1': {
        node: 2,
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            [1, 2, 3],
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'anArray', 1],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'anArray',
          index: 1,
        },
      },
      'enter.Primitive.$root.anArray.2': {
        node: 3,
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            [1, 2, 3],
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'anArray', 2],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'anArray',
          index: 2,
        },
      },
      'Primitive.enter.$root.anArray.2': {
        node: 3,
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            [1, 2, 3],
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'anArray', 2],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'anArray',
          index: 2,
        },
      },
      'leave.Primitive.$root.anArray.2': {
        node: 3,
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            [1, 2, 3],
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'anArray', 2],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'anArray',
          index: 2,
        },
      },
      'Primitive.leave.$root.anArray.2': {
        node: 3,
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            [1, 2, 3],
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'anArray', 2],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'anArray',
          index: 2,
        },
      },
      'leave.Array.$root.anArray': {
        node: [1, 2, 3],
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'anArray'],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'anArray',
        },
      },
      'Array.leave.$root.anArray': {
        node: [1, 2, 3],
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'anArray'],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'anArray',
        },
      },
      'enter.Primitive.$root.notprimitive': {
        node: expect.any(Date),
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'notprimitive'],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'notprimitive',
        },
      },
      'Primitive.enter.$root.notprimitive': {
        node: expect.any(Date),
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'notprimitive'],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'notprimitive',
        },
      },
      'leave.Primitive.$root.notprimitive': {
        node: expect.any(Date),
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'notprimitive'],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'notprimitive',
        },
      },
      'Primitive.leave.$root.notprimitive': {
        node: expect.any(Date),
        info: {
          pathAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
          path: ['$root', 'notprimitive'],
          parent: {
            someObject: {
              test: 'string',
            },
            anArray: [1, 2, 3],
            notprimitive: expect.any(Date),
          },
          name: 'notprimitive',
        },
      },
      'leave.Object.$root': {
        node: {
          someObject: {
            test: 'string',
          },
          anArray: [1, 2, 3],
          notprimitive: expect.any(Date),
        },
        info: {
          name: '$root',
          path: ['$root'],
          pathAncestors: [],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
        },
      },
      'Object.leave.$root': {
        node: {
          someObject: {
            test: 'string',
          },
          anArray: [1, 2, 3],
          notprimitive: expect.any(Date),
        },
        info: {
          name: '$root',
          path: ['$root'],
          pathAncestors: [],
          nodeAncestors: [
            {
              someObject: {
                test: 'string',
              },
              anArray: [1, 2, 3],
              notprimitive: expect.any(Date),
            },
          ],
        },
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
    let result = visit(
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
