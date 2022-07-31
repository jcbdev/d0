import { D0, ConditionD0, Ctx, BaseD0s, StartD0, ItemD0, MergeD0, Or, ResolveD0 } from './lib/types';

export { clear } from './lib/d0s/clear';
export { dynamic } from './lib/d0s/dynamic';
export { each } from './lib/d0s/each';
export { merge } from './lib/d0s/merge';
export { output } from './lib/d0s/output';
export { remap } from './lib/d0s/remap';
export { repeat } from './lib/d0s/repeat';
export { resolve } from './lib/d0s/resolve';
export { sequence } from './lib/d0s/sequence';
export { set } from './lib/d0s/set';
export { split } from './lib/d0s/split';
export { template } from './lib/d0s/template';
export { when } from './lib/d0s/when';
export { reset } from './lib/d0s/reset';
export { d0 } from './lib/d0';
export * from './lib/types';
export * from './lib/registry';
import { FileHandle } from 'fs/promises';
import { PathLike } from 'fs';
import { clear } from './lib/d0s/clear';
import { dynamic } from './lib/d0s/dynamic';
import { each } from './lib/d0s/each';
import { fork as _fork } from './lib/d0s/fork';
import { merge } from './lib/d0s/merge';
import { output } from './lib/d0s/output';
import { remap } from './lib/d0s/remap';
import { repeat } from './lib/d0s/repeat';
import { resolve } from './lib/d0s/resolve';
import { sequence } from './lib/d0s/sequence';
import { set } from './lib/d0s/set';
import { split } from './lib/d0s/split';
import { template } from './lib/d0s/template';
import { when } from './lib/d0s/when';
import { reset } from './lib/d0s/reset';
import { d0 } from './lib/d0';

export type CoreD0s<D = any> = {
  clear: <T = D>(name: string) => D0<T>;
  // clear: Clear<any, TCtx>;
  dynamic: <T = D>(name: string, template: string) => D0<T>;
  each: <TItem = any, T = D>(resolve: ResolveD0<T[], T>, D0: ItemD0<TItem, T>) => D0<T>;
  fork: <TFork extends any = any, T = D>(
    D0: D0<TFork>,
    map?: ResolveD0<TFork, T>,
    merge?: MergeD0<TFork, Ctx<T>>
  ) => D0<T>;
  merge: <TMerge extends any = any, T = D>(updateCtx: TMerge) => D0<T>;
  output: <T = D>(path: PathLike | FileHandle, resolve: ResolveD0<string, T>) => D0<T>;
  remap: <T = D>(update?: D0<T>) => D0<T>;
  repeat: <T = D>(num: number, D0: D0<T>) => D0<T>;
  reset: <T = D>() => D0<T>;
  resolve: <TReturn extends any = any, T = D>(
    ctx: Ctx<T>,
    $resolve: ResolveD0<TReturn, T>
  ) => TReturn | Promise<TReturn>;
  sequence: <T = D>(D0s: D0<T>[]) => D0<T>;
  set: <TReturn extends any = any, T = D>(name: string, update: ResolveD0<TReturn, T>) => D0<T>;
  split: <TSplit extends any = any, T = D>(
    fork: MergeD0<Ctx<T>, Ctx<TSplit>>,
    D0: D0<TSplit>,
    merge: MergeD0<Ctx<TSplit>, Ctx<T>>
  ) => D0<T>;
  template: <T = D>(name: string, template: ResolveD0<string, T>) => D0<T>;
  when: <T = D>(condition: ConditionD0<T>, trueD0: D0<T>, falseD0: D0<T>) => D0<T>;
};

export const baseD0s: <D = any>() => BaseD0s<D> = <D>() => {
  return {
    d0: <T = D, TD0 = any>(startD0: StartD0<TD0, T>, withCtx?: Ctx<T>, $d0?: () => TD0) =>
      d0<TD0, T>(startD0, withCtx, $d0),
  } as BaseD0s<D>;
};

export const coreD0s: <D = any>() => CoreD0s<D> = <D>() => {
  return {
    clear: <T = D>(name: string) => clear<T>(name),
    dynamic: <T = D>(name: string, template: string) => dynamic<T>(name, template),
    each: <TItem = any, T = D>(resolve: ResolveD0<TItem[], T>, D0: ItemD0<TItem, T>) =>
      each<TItem, T>(resolve, D0),
    fork: <TFork extends any = any, T = D>(
      D0: D0<TFork>,
      map?: ResolveD0<TFork, T>,
      merge?: MergeD0<Ctx<TFork>, Ctx<T>>
    ) => _fork<TFork, T>(D0, map, merge),
    merge: <T = D>(updateCtx: Ctx<T>) => merge<T>(updateCtx),
    output: <T = D>(path: PathLike | FileHandle, resolve: ResolveD0<string, T>) => output<T>(path, resolve),
    remap: <T = D>(update?: D0<T>) => remap<T>(update),
    repeat: <T = D>(num: number, D0: D0<T>) => repeat<T>(num, D0),
    reset: <T = D>() => reset<T>(),
    resolve: <TReturn extends any = any, T = D>(ctx: Ctx<T>, $resolve: ResolveD0<TReturn, T>) =>
      resolve<TReturn, T>(ctx, $resolve),
    sequence: <T = D>(D0s: D0<T>[]) => sequence<T>(D0s),
    set: <TReturn extends any = any, T = D>(name: string, update: ResolveD0<TReturn, T>) =>
      set<TReturn, T>(name, update),
    split: <TSplit extends any = any, T = D>(
      fork: MergeD0<Ctx<T>, Ctx<TSplit>>,
      D0: D0<TSplit>,
      merge: MergeD0<Ctx<TSplit>, Ctx<T>>
    ) => split<TSplit, T>(fork, D0, merge),
    template: <T = D>(name: string, $template: ResolveD0<string, T>) => template<T>(name, $template),
    when: <T = D>(condition: ConditionD0<T>, trueD0: D0<T>, falseD0: D0<T>) =>
      when<T>(condition, trueD0, falseD0),
  } as CoreD0s<D>;
};
