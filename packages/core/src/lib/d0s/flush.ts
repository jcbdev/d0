import { D0 } from '../types';

export const flush = <T = any>(): D0<T> => {
  return ctx => {
    const propsToDelete = [];

    for (let [prop, value] of Object.entries(ctx)) {
      if (prop.startsWith('$$') || prop.startsWith('$')) {
        propsToDelete.push(prop);
      }
    }
    for (let prop of propsToDelete) {
      delete ctx[prop];
    }
    return ctx;
  };
};
