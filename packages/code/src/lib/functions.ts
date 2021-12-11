import { FunctionNodeAction } from '..';
import { CodeContext, NodeAction } from './types';

export const functions = <TAst, TNode>(
  actions: FunctionNodeAction<TAst, TNode>[],
  filter?: string
): NodeAction<TAst, TNode> => {
  return async (parent: TNode, codeCtx: CodeContext<TAst, TNode>): Promise<CodeContext<TAst, TNode>> => {
    let nodes = codeCtx.$adapter.queries.functions(parent, codeCtx, filter);
    for (let action of actions) {
      codeCtx = await action(nodes, codeCtx.$adapter.transforms.functions, codeCtx);
    }
    return codeCtx;
  };
};
