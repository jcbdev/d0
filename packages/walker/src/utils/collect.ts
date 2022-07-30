import { CollectMappers, CollectResult, NodeInfo, NodeSelector, VisitIntention, Visitor } from '../lib/types';
import { visit } from './visit';

type CollectorCtx<T, TMap> = {
  results: Array<CollectResult<T, TMap>>;
  data?: any;
};

export const collect = async <TNode = any, TMap = any, T = any>(
  node: T | T[],
  select: (node: T, info: NodeInfo) => boolean,
  filter?: (node: T, info: NodeInfo) => boolean,
  map?: CollectMappers<TNode, TMap>,
  data?: any
) => {
  let collectorCtx: CollectorCtx<TNode, TMap> = {
    results: [],
  };

  const searchVisiter: Visitor<T, CollectorCtx<TNode, TMap>> = {
    enter: {
      regex: [
        {
          exp: /^(?!skip$).*/,
          do: async (node, info, ctx) => {
            if (!filter || filter(node, info)) {
              let mapNode: TMap = {} as TMap;
              if (map) {
                for (let [prop, mapFunc] of Object.entries(map)) {
                  mapNode = await mapFunc(node as any, info, mapNode, data);
                }
              }
              ctx.results.push({
                node: node as any,
                mapped: mapNode,
                // statement: statement ? statement(node, sourceCode) : null,
                type: info.selector,
                path: info.path,
              });
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

  await visit<T, CollectorCtx<TNode, TMap>>(node, searchSelector, searchVisiter, collectorCtx);

  let results = collectorCtx.results;
  // if (filter) results = filter(collectorCtx.results);
  return results;
};
