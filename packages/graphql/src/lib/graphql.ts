import { D0 } from '@d0-it/core';
import { parse } from 'graphql';

export const graphQL = <T = any>(name: string, gql: string): D0<T> => {
  return async ctx => {
    ctx[name] = parse(gql);
    return ctx;
  };
};
