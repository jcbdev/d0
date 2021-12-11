import { Action, Context } from '@d0/core';
import fetch from 'cross-fetch';

export function httpJson(name: string, url: string): Action {
  return async (ctx: Context) => {
    const response = await fetch(url);
    if (response.ok) ctx[name] = await response.json();
    else throw Error(`Status (${response.status}): ${response.statusText}`);
    return ctx;
  };
}
