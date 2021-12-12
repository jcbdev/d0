import { D0 } from '@d0/core';
import fetch from 'cross-fetch';

export function httpText<TFlex = void, TBase = void>(name: string, url: string): D0<TFlex, TBase> {
  return async ctx => {
    const response = await fetch(url);
    if (response.ok) ctx[name] = await response.text();
    else throw Error(`Status (${response.status}): ${response.statusText}`);
    return ctx;
  };
}
