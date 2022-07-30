import { Ctx, D0, ResolveD0 } from '@d0/core';
import { visit } from '../utils/visit';
import { NodeSelector, Visitor } from './types';

export const walk = <T, TFlex = void, TBase = void>(
  name: string,
  resolve: ResolveD0<T, TFlex, TBase>,
  selector: NodeSelector,
  visitor: Visitor<T, Ctx<TFlex, TBase>>
): D0<TFlex, TBase> => {
  return async ctx => {
    ctx[name] = await visit<T, Ctx<TFlex, TBase>>(await resolve(ctx), selector, visitor, ctx);
    return ctx;
  };
};
