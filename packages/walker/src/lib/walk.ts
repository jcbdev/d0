import { Context, Action } from '@d0/core';
import { visit } from '../utils/visit';
import { NodeSelector, Visitor } from './types';

export const walk = <T>(
  name: string,
  resolve: Function,
  selector: NodeSelector,
  visitor: Visitor<T>
): Action => {
  return async (ctx: Context) => {
    ctx[name] = visit<T>(await resolve(ctx), selector, visitor, ctx);
    return ctx;
  };
};
