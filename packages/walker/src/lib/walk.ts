import { Context, Action } from '@d0/core';
import { visit } from '../utils/visit';
import { NodeSelector } from './types';

export const walk = <TVisitor = any>(
  name: string,
  resolve: Function,
  selector: NodeSelector,
  visitor: TVisitor
): Action => {
  return async (ctx: Context) => {
    ctx[name] = visit(
      await resolve(ctx),
      { name: '$root', ancestors: [], path: ['$root'] },
      selector,
      visitor,
      ctx
    );
    return ctx;
  };
};
