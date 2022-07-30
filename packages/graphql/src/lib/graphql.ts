import { D0 } from '@d0-it/core';
import { parse } from 'graphql';

export const graphQL = <TFlex = void, TBase = void>(name: string, gql: string): D0<TFlex, TBase> => {
  return async ctx => {
    ctx[name] = parse(gql);
    return ctx;
  };
};
