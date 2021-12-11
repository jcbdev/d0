import { StatementNodeAction } from '..';
import { CodeContext, NodeAction } from './types';

export const statements = <TAst, TNode>(
  actions: StatementNodeAction<TAst, TNode>[],
  filter?: string
): NodeAction<TAst, TNode> => {
  return async (currentNode: TNode, codeCtx: CodeContext<TAst, TNode>): Promise<CodeContext<TAst, TNode>> => {
    let nodes = codeCtx.$adapter.queries.statements(currentNode, codeCtx, filter);
    for (let action of actions) {
      codeCtx = await action(nodes, codeCtx.$adapter.transforms.statements, codeCtx);
    }
    return codeCtx;
  };
};
