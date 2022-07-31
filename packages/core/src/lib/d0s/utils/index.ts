import { d0s, defaultD0s } from '../../registry';
import { Ctx, D0, MergeD0, ResolveD0 } from '../../types';
import cloneDeep from 'clone-deep';

export const __d0s = <TD0 = any>($d0: () => TD0 | string) =>
  !$d0 ? defaultD0s<TD0>() : typeof $d0 === 'string' ? d0s<TD0>($d0) : ($d0() as TD0);

export const __exec = async <T = any>(
  ctx,
  d0: ((...args) => D0<T> | Promise<D0<T>>) | ((...args) => D0<T> | Promise<D0<T>>)[],
  args: any[] = []
) => {
  if (!Array.isArray(d0)) {
    ctx = await (await d0(...args.map(a => (a === 'ctxStub' ? ctx : a))))(ctx);
  } else {
    for (let act of d0) {
      ctx = await (await act(...args.map(a => (a === 'ctxStub' ? ctx : a))))(ctx);
    }
  }
  return ctx;
};

export const __directExec = async <T = any>(
  ctx,
  d0: ((...args) => Ctx<T> | Promise<Ctx<T>>) | ((...args) => Ctx<T> | Promise<Ctx<T>>)[],
  args: any[] = []
) => {
  if (!Array.isArray(d0)) {
    ctx = await d0(...args.map(a => (a === 'ctxStub' ? ctx : a)));
  } else {
    for (let act of d0) {
      ctx = await act(...args.map(a => (a === 'ctxStub' ? ctx : a)));
    }
  }
  return ctx;
};

export const __ctx = async <TFork = any, T = any>(ctx, map?: ResolveD0<TFork, T> | boolean) =>
  map ? (typeof map === 'boolean' ? cloneDeep(ctx) : await map(ctx)) : {};

export const __merge = async <TFork = any, T = any>(
  newCtx: Ctx<TFork>,
  ctx: Ctx<T>,
  merge: MergeD0<Ctx<TFork>, Ctx<T>> | boolean
) => {
  let m =
    typeof merge !== 'undefined'
      ? typeof merge === 'boolean'
        ? { ...ctx, ...newCtx }
        : await merge(newCtx, ctx)
      : {
          // ...ctx,
          // ...newCtx,
        };
  return m;
};

export const __shuffleTemps = <T = any>(ctx: Ctx<T>) => {
  const propsToDelete = [];

  for (let [prop, value] of Object.entries(ctx)) {
    if (prop.startsWith('$$')) {
    } else if (prop.startsWith('$')) {
      propsToDelete.push(prop);
    }
  }
  for (let prop of propsToDelete) {
    delete ctx[prop];
  }
  return ctx;
};

export const __shuffleBlockTemps = <T = any>(ctx: Ctx<T>) => {
  const propsToRenameUp = [];
  for (let [prop, value] of Object.entries(ctx)) {
    if (prop.startsWith('$$')) {
      propsToRenameUp.push(prop);
    }
  }
  for (let prop of propsToRenameUp) {
    const newProp = prop.substring(1);
    const oldVal = ctx[prop];
    ctx[newProp] = oldVal;
    delete ctx[prop];
  }
  return ctx;
};
