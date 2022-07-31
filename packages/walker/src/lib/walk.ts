import { Ctx, D0, ResolveD0 } from '@d0-it/core';
import { visit } from '../utils/visit';
import { NodeSelector, Visitor } from './types';

export const walk = <TWalk = any, T = any>(
  name: string,
  resolve: ResolveD0<TWalk, T>,
  selector: NodeSelector,
  visitor: Visitor<TWalk, Ctx<T>>
): D0<T> => {
  return async ctx => {
    ctx[name] = await visit<TWalk, Ctx<T>>(await resolve(ctx), selector, visitor, ctx);
    return ctx;
  };
};
