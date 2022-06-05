import { FindResult, NodeInfo, NodeSelector, Visitor } from '../lib/types';
import { visit } from './visit';

type FindCtx<T> = {
  result: FindResult<T>;
  found: boolean;
};

export const find = async <TNode = any, TMap = any, T = any>(
  node: T | T[],
  select: (node: T, info: NodeInfo) => boolean,
  filter?: (node: T, info: NodeInfo) => boolean
) => {
  let findCtx: FindCtx<TNode> = {
    result: null,
    found: false,
  };

  const searchVisiter: Visitor<T, FindCtx<TNode>> = {
    enter: {
      regex: [
        {
          exp: /^(?!skip$).*/,
          do: async (node, info, ctx) => {
            if (ctx.found) return { intention: 'SKIP', node: node };
            if (!filter || filter(node, info)) {
              ctx.result = { node: node as any, info: info };
              ctx.found = true;
              return { intention: 'SKIP', node: node };
            }
            return { intention: 'PROCESS', node: node };
          },
        },
      ],
    },
  };

  const searchSelector: NodeSelector = {
    array: (node: any, info?: NodeInfo) => 'skip',
    primitive: (node: any, info?: NodeInfo) => 'skip',
    object: (node: any, info?: NodeInfo) => (select(node, info) ? node.type : 'skip'),
  };

  await visit<T, FindCtx<TNode>>(node, searchSelector, searchVisiter, findCtx);

  let results = findCtx.result;
  // if (filter) results = filter(collectorCtx.results);
  return results;
};
