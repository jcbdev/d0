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

export type CoreD0s<DFlex = void, DBase = void> = {
  clear: <TFlex = DFlex, TBase = DBase>(name: string) => D0<TFlex, TBase>;
  // clear: Clear<any, TCtx>;
  dynamic: <TFlex = DFlex, TBase = DBase>(name: string, template: string) => D0<TFlex, TBase>;
  each: <T, TFlex = DFlex, TBase = DBase>(
    resolve: ResolveD0<T[], TFlex, TBase>,
    D0: ItemD0<T, TFlex, TBase>
  ) => D0<TFlex, TBase>;
  fork: <TFork extends any = any, TFlex = DFlex, TBase = DBase>(
    D0: D0<TFork, void>,
    map?: ResolveD0<TFork, TFlex, TBase>,
    merge?: MergeD0<Ctx<TFork, void>, Ctx<TFlex, TBase>>
  ) => D0<TFlex, TBase>;
  merge: <TMerge extends any = any, TFlex = DFlex, TBase = DBase>(updateCtx: TMerge) => D0<TFlex, TBase>;
  output: <TFlex = DFlex, TBase = DBase>(
    path: PathLike | FileHandle,
    resolve: ResolveD0<string, TFlex, TBase>
  ) => D0<TFlex, TBase>;
  remap: <TFlex = DFlex, TBase = DBase>(update?: D0<TFlex, TBase>) => D0<TFlex, TBase>;
  repeat: <TFlex = DFlex, TBase = DBase>(num: number, D0: D0<TFlex, TBase>) => D0<TFlex, TBase>;
  reset: <TFlex = DFlex, TBase = DBase>() => D0<TFlex, TBase>;
  resolve: <TReturn extends any = any, TFlex = DFlex, TBase = DBase>(
    ctx: Ctx<TFlex, TBase>,
    $resolve: ResolveD0<TReturn, TFlex, TBase>
  ) => TReturn | Promise<TReturn>;
  sequence: <TFlex = DFlex, TBase = DBase>(D0s: D0<TFlex, TBase>[]) => D0<TFlex, TBase>;
  set: <TReturn extends any = any, TFlex = DFlex, TBase = DBase>(
    name: string,
    update: ResolveD0<TReturn, TFlex, TBase>
  ) => D0<TFlex, TBase>;
  split: <TSplit extends any = any, TFlex = DFlex, TBase = DBase>(
    fork: MergeD0<Ctx<TFlex, TBase>, Ctx<TSplit, void>>,
    D0: D0<TSplit, void>,
    merge: MergeD0<Ctx<TSplit, void>, Ctx<TFlex, TBase>>
  ) => D0<TFlex, TBase>;
  template: <TFlex = DFlex, TBase = DBase>(
    name: string,
    template: ResolveD0<string, TFlex, TBase>
  ) => D0<TFlex, TBase>;
  when: <TFlex = DFlex, TBase = DBase>(
    condition: ConditionD0<TFlex, TBase>,
    trueD0: D0<TFlex, TBase>,
    falseD0: D0<TFlex, TBase>
  ) => D0<TFlex, TBase>;
};

export const baseD0s: <DFlex = void, DBase = void>() => BaseD0s<DFlex, DBase> = <
  DFlex = void,
  DBase = void
>() => {
  return {
    d0: <TD0, TFlex = DFlex, TBase = DBase>(
      startD0: StartD0<TD0, Or<TFlex, DFlex>, Or<TBase, DBase>>,
      $d0?: () => TD0,
      withCtx?: Ctx<Or<TFlex, DFlex>, Or<TBase, DBase>>
    ) => d0<TD0, Or<TFlex, DFlex>, Or<TBase, DBase>>(startD0, $d0, withCtx),
  } as BaseD0s<DFlex, DBase>;
};

export const coreD0s: <DFlex = void, DBase = void>() => CoreD0s<DFlex, DBase> = <
  DFlex = void,
  DBase = void
>() => {
  return {
    clear: <TFlex = DFlex, TBase = DBase>(name: string) => clear<Or<TFlex, DFlex>, Or<TBase, DBase>>(name),
    dynamic: <TFlex = DFlex, TBase = DBase>(name: string, template: string) =>
      dynamic<Or<TFlex, DFlex>, Or<TBase, DBase>>(name, template),
    each: <T, TFlex = DFlex, TBase = DBase>(
      resolve: ResolveD0<T[], Or<TFlex, DFlex>, Or<TBase, DBase>>,
      D0: ItemD0<T, Or<TFlex, DFlex>, Or<TBase, DBase>>
    ) => each<T, Or<TFlex, DFlex>, Or<TBase, DBase>>(resolve, D0),
    fork: <TFork extends any = any, TFlex = DFlex, TBase = DBase>(
      D0: D0<TFork, void>,
      map?: ResolveD0<TFork, Or<TFlex, DFlex>, Or<TBase, DBase>>,
      merge?: MergeD0<Ctx<TFork, void>, Ctx<Or<TFlex, DFlex>, Or<TBase, DBase>>>
    ) => _fork<TFork, Or<TFlex, DFlex>, Or<TBase, DBase>>(D0, map, merge),
    merge: <TFlex = DFlex, TBase = DBase>(updateCtx: Ctx<Or<TFlex, DFlex>, Or<TBase, DBase>>) =>
      merge<Or<TFlex, DFlex>, Or<TBase, DBase>>(updateCtx),
    output: <TFlex = DFlex, TBase = DBase>(
      path: PathLike | FileHandle,
      resolve: ResolveD0<string, Or<TFlex, DFlex>, Or<TBase, DBase>>
    ) => output<Or<TFlex, DFlex>, Or<TBase, DBase>>(path, resolve),
    remap: <TFlex = DFlex, TBase = DBase>(update?: D0<Or<TFlex, DFlex>, Or<TBase, DBase>>) =>
      remap<Or<TFlex, DFlex>, Or<TBase, DBase>>(update),
    repeat: <TFlex = DFlex, TBase = DBase>(num: number, D0: D0<Or<TFlex, DFlex>, Or<TBase, DBase>>) =>
      repeat<Or<TFlex, DFlex>, Or<TBase, DBase>>(num, D0),
    reset: <TFlex = DFlex, TBase = DBase>() => reset<Or<TFlex, DFlex>, Or<TBase, DBase>>(),
    resolve: <TReturn extends any = any, TFlex = DFlex, TBase = DBase>(
      ctx: Ctx<Or<TFlex, DFlex>, Or<TBase, DBase>>,
      $resolve: ResolveD0<TReturn, Or<TFlex, DFlex>, Or<TBase, DBase>>
    ) => resolve<TReturn, Or<TFlex, DFlex>, Or<TBase, DBase>>(ctx, $resolve),
    sequence: <TFlex = DFlex, TBase = DBase>(D0s: D0<Or<TFlex, DFlex>, Or<TBase, DBase>>[]) =>
      sequence<Or<TFlex, DFlex>, Or<TBase, DBase>>(D0s),
    set: <TReturn extends any = any, TFlex = DFlex, TBase = DBase>(
      name: string,
      update: ResolveD0<TReturn, Or<TFlex, DFlex>, Or<TBase, DBase>>
    ) => set<TReturn, Or<TFlex, DFlex>, Or<TBase, DBase>>(name, update),
    split: <TSplit extends any = any, TFlex = DFlex, TBase = DBase>(
      fork: MergeD0<Ctx<Or<TFlex, DFlex>, Or<TBase, DBase>>, Ctx<TSplit, void>>,
      D0: D0<TSplit, void>,
      merge: MergeD0<Ctx<TSplit, void>, Ctx<Or<TFlex, DFlex>, Or<TBase, DBase>>>
    ) => split<TSplit, Or<TFlex, DFlex>, Or<TBase, DBase>>(fork, D0, merge),
    template: <TFlex = DFlex, TBase = DBase>(
      name: string,
      $template: ResolveD0<string, Or<TFlex, DFlex>, Or<TBase, DBase>>
    ) => template<Or<TFlex, DFlex>, Or<TBase, DBase>>(name, $template),
    when: <TFlex = DFlex, TBase = DBase>(
      condition: ConditionD0<Or<TFlex, DFlex>, Or<TBase, DBase>>,
      trueD0: D0<Or<TFlex, DFlex>, Or<TBase, DBase>>,
      falseD0: D0<Or<TFlex, DFlex>, Or<TBase, DBase>>
    ) => when<Or<TFlex, DFlex>, Or<TBase, DBase>>(condition, trueD0, falseD0),
  } as CoreD0s<DFlex, DBase>;
};
