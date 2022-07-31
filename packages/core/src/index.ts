import {
  D0,
  ConditionD0,
  Ctx,
  BaseD0s,
  StartD0,
  ItemD0,
  MergeD0,
  Or,
  ResolveD0,
  EntryD0,
  D0Fork,
} from './lib/types';

export { append } from './lib/d0s/append';
export { clear } from './lib/d0s/clear';
export { dynamic } from './lib/d0s/dynamic';
export { each } from './lib/d0s/each';
export { eachEntry } from './lib/d0s/eachEntry';
export { flush } from './lib/d0s/flush';
export { fork } from './lib/d0s/fork';
export { merge } from './lib/d0s/merge';
export { output } from './lib/d0s/output';
export { print } from './lib/d0s/print';
export { remap } from './lib/d0s/remap';
export { repeat } from './lib/d0s/repeat';
export { resolve } from './lib/d0s/resolve';
export { sequence } from './lib/d0s/sequence';
export { set } from './lib/d0s/set';
export { push } from './lib/d0s/push';
export { dict } from './lib/d0s/dict';
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
import { eachEntry } from './lib/d0s/eachEntry';
import { flush } from './lib/d0s/flush';
import { fork as _fork } from './lib/d0s/fork';
import { merge } from './lib/d0s/merge';
import { output } from './lib/d0s/output';
import { print } from './lib/d0s/print';
import { remap } from './lib/d0s/remap';
import { repeat } from './lib/d0s/repeat';
import { resolve } from './lib/d0s/resolve';
import { sequence } from './lib/d0s/sequence';
import { set } from './lib/d0s/set';
import { push } from './lib/d0s/push';
import { dict } from './lib/d0s/dict';
import { split } from './lib/d0s/split';
import { template as _template } from './lib/d0s/template';
import { when } from './lib/d0s/when';
import { reset } from './lib/d0s/reset';
import { d0 } from './lib/d0';
import { append } from './lib/d0s/append';

// infer second type argument from typeof eachEntry function
export type CoreD0s<D = any> = {
  append: <T = D>(path: PathLike | FileHandle, resolve: ResolveD0<string, T>) => D0<T>;
  clear: <T = any>(name: string | string[]) => D0<T>;
  dynamic: <T = any, TCtx = any>(name: string, template: string, withCtx?: TCtx) => D0<T>;
  each: <TItem = any, TFork = TItem, T = D>(
    select: ResolveD0<TItem[], T>,
    d0: ItemD0<TItem, TFork> | ItemD0<TItem, TFork>[],
    options?: {
      map?: ResolveD0<TFork, T>;
      merge?: MergeD0<Ctx<TFork>, Ctx<T>>;
    }
  ) => D0<T>;
  eachEntry: <TItem = any, TFork = TItem, T = any>(
    select: ResolveD0<Record<string, TItem>, T>,
    d0: EntryD0<TItem, T> | EntryD0<TItem, T>[],
    options?: {
      map?: ResolveD0<TFork, T>;
      merge?: MergeD0<Ctx<TFork>, Ctx<T>>;
    }
  ) => D0<T>;
  flush: <T = any>() => D0<T>;
  fork: <TFork = any, T = D, TD0 = any>(
    d0: D0Fork<TFork> | D0Fork<TFork>[],
    options?: {
      map?: ResolveD0<TFork, T> | boolean;
      merge?: MergeD0<Ctx<TFork>, Ctx<T>>;
      $d0?: () => TD0 | string;
    }
  ) => D0<T>;
  merge: <T = D>(updateCtx: Ctx<T>) => D0<T>;
  output: <T = D>(path: PathLike | FileHandle, resolve: ResolveD0<string, T>) => D0<T>;
  print: <T = D>(resolve: ResolveD0<string | any[], T>) => D0<T>;
  remap: <T = D>(update?: D0<T>) => D0<T>;
  repeat: <T = D>(num: number, d0: D0<T> | D0<T>[]) => D0<T>;
  reset: <T = D>() => D0<T>;
  resolve: <TReturn = any, T = D>(ctx: Ctx<T>, $resolve: ResolveD0<TReturn, T>) => Promise<TReturn>;
  sequence: <T = D>(d0s: D0<T>[]) => D0<T>;
  set: <TReturn = any, T = D>(name: string, update: ResolveD0<TReturn, T>) => D0<T>;
  push: <TReturn = any, T = D>(name: string, update: ResolveD0<TReturn[] | TReturn, T>) => D0<T>;
  dict: <TReturn = any, T = D>(name: string, key: string, update: ResolveD0<TReturn, T>) => D0<T>;
  split: <TSplit extends any = any, T = D, TD0 = any>(
    fork: MergeD0<Ctx<T>, Ctx<TSplit>>,
    d0: D0Fork<TSplit> | D0Fork<TSplit>[],
    merge: MergeD0<Ctx<TSplit>, Ctx<T>>,
    $d0?: () => TD0 | string
  ) => D0<T>;
  template: <T = D>(name: string, template: ResolveD0<string, T>) => D0<T>;
  when: <T = D>(condition: ConditionD0<T>, trueD0: D0<T> | D0<T>[], falseD0?: D0<T> | D0<T>[]) => D0<T>;
};

export const baseD0s: <D = any>() => BaseD0s<D> = <D>() => {
  return {
    d0: <T = D, TD0 = any>(startD0: StartD0<TD0, T>, options?: { withCtx?: Ctx<T>; $d0?: () => TD0 }) =>
      d0<T, TD0>(startD0, options),
  } as BaseD0s<D>;
};

export const coreD0s: <D = any>() => CoreD0s<D> = <D>() => {
  return {
    append: <T = D>(path: PathLike | FileHandle, resolve: ResolveD0<string, T>) => append<T>(path, resolve),
    clear: <T = any>(name: string | string[]) => clear<T>(name),
    dynamic: <T = any, TCtx = any>(name: string, template: string, withCtx?: TCtx) =>
      dynamic<T, TCtx>(name, template, withCtx),
    each: <TItem = any, TFork = TItem, T = D>(
      select: ResolveD0<TItem[], T>,
      d0: ItemD0<TItem, TFork> | ItemD0<TItem, TFork>[],
      options?: {
        map?: ResolveD0<TFork, T>;
        merge?: MergeD0<Ctx<TFork>, Ctx<T>>;
      }
    ) => each<TItem, TFork, T>(select, d0, options),
    eachEntry: <TItem = any, TFork = TItem, T = any>(
      select: ResolveD0<Record<string, TItem>, T>,
      d0: EntryD0<TItem, T> | EntryD0<TItem, T>[],
      options?: {
        map?: ResolveD0<TFork, T>;
        merge?: MergeD0<Ctx<TFork>, Ctx<T>>;
      }
    ) => eachEntry<TItem, TFork, T>(select, d0, options),
    flush: <T = any>() => flush<T>(),
    fork: <TFork = any, T = D, TD0 = any>(
      d0: D0Fork<TFork> | D0Fork<TFork>[],
      options?: {
        map?: ResolveD0<TFork, T> | boolean;
        merge?: MergeD0<Ctx<TFork>, Ctx<T>>;
        $d0?: () => TD0 | string;
      }
    ) => _fork<TFork, T, TD0>(d0, options),
    merge: <T = D>(updateCtx: Ctx<T>) => merge<T>(updateCtx),
    output: <T = D>(path: PathLike | FileHandle, resolve: ResolveD0<string, T>) => output<T>(path, resolve),
    print: <T = D>(resolve: ResolveD0<string | any[], T>) => print<T>(resolve),
    remap: <T = D>(update?: D0<T>) => remap<T>(update),
    repeat: <T = D>(num: number, D0: D0<T> | D0<T>[]) => repeat<T>(num, D0),
    reset: <T = D>() => reset<T>(),
    resolve: <TReturn = any, T = D>(ctx: Ctx<T>, $resolve: ResolveD0<TReturn, T>) =>
      resolve<TReturn, T>(ctx, $resolve),
    sequence: <T = D>(d0s: D0<T>[]) => sequence<T>(d0s),
    set: <TReturn = any, T = D>(name: string, update: ResolveD0<TReturn, T>) => set<TReturn, T>(name, update),
    push: <TReturn = any, T = D>(name: string, update: ResolveD0<TReturn[] | TReturn, T>) =>
      push<TReturn, T>(name, update),
    dict: <TReturn = any, T = any>(name: string, key: string, update: ResolveD0<TReturn, T>) =>
      dict<TReturn, T>(name, key, update),
    split: <TSplit extends any = any, T = D, TD0 = any>(
      fork: MergeD0<Ctx<T>, Ctx<TSplit>>,
      d0: D0Fork<TSplit> | D0Fork<TSplit>[],
      merge: MergeD0<Ctx<TSplit>, Ctx<T>>,
      $d0?: () => TD0 | string
    ) => split<TSplit, T, TD0>(fork, d0, merge, $d0),
    template: <T = D>(name: string, template: ResolveD0<string, T>) => _template<T>(name, template),
    when: <T = D>(condition: ConditionD0<T>, trueD0: D0<T> | D0<T>[], falseD0?: D0<T> | D0<T>[]) =>
      when<T>(condition, trueD0, falseD0),
  } as CoreD0s<D>;
};
