import { D0 } from '@d0-it/core';
import fetch from 'cross-fetch';

export function httpText<T = any>(name: string, url: string): D0<T> {
  return async ctx => {
    const response = await fetch(url);
    if (response.ok) ctx[name] = await response.text();
    else throw Error(`Status (${response.status}): ${response.statusText}`);
    return ctx;
  };
}
