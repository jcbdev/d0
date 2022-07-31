import { D0, ResolveD0 } from '../types';
import { FileHandle, writeFile, mkdir } from 'fs/promises';
import { PathLike } from 'fs';
import { dirname } from 'path';

export const print = <T = any>(resolve: ResolveD0<string | any[], T>): D0<T> => {
  return async ctx => {
    let messageArgs = await resolve(ctx);
    if (!Array.isArray(messageArgs)) {
      messageArgs = [messageArgs];
    }
    console.log(...[...messageArgs]);
    return ctx;
  };
};
