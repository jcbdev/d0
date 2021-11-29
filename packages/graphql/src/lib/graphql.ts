import { Action, Context } from '@d0/core';
import { parse } from 'graphql';

export const graphQL = (name: string, gql: string): Action => {
  return async (ctx: Context) => {
    ctx[name] = parse(gql);
    return ctx;
  };
};
