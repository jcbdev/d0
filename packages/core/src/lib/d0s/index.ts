import { Action, ConditionAction, Context, Ctx, MergeAction, Or, ResolveAction } from '../types';
import { clear } from './clear';
import { dynamic } from './dynamic';
import { each } from './each';
import { merge } from './merge';
import { output } from './output';
import { remap } from './remap';
import { repeat } from './repeat';
import { reset } from './reset';
import { resolve } from './resolve';
import { sequence } from './sequence';
import { set } from './set';
import { split } from './split';
import { template } from './template';
import { when } from './when';
import { FileHandle } from 'fs/promises';
import { PathLike } from 'fs';

export type CoreTransforms<DFlex = void, D = void, DD0 = void> = {
  clear: <TFlex = DFlex, T = D, TD0 = DD0>(name: string) => Action<TFlex, T, TD0>;
  // clear: Clear<any, TCtx>;
  dynamic: <TFlex = DFlex, T = D, TD0 = DD0>(name: string, template: string) => Action<TFlex, T, TD0>;
  each: <TFlex = DFlex, T = D, TD0 = DD0>(action: Action<TFlex, T, TD0>) => Action<TFlex, T, TD0>;
  merge: <TFlex = DFlex, T = D, TD0 = DD0>(updateCtx: Ctx<TFlex, T, TD0>) => Action<TFlex, T, TD0>;
  output: <TFlex = DFlex, T = D, TD0 = DD0>(
    path: PathLike | FileHandle,
    resolve: ResolveAction<string, TFlex, T, TD0>
  ) => Action<TFlex, T, TD0>;
  remap: <TFlex = DFlex, T = D, TD0 = DD0>(update?: Action<TFlex, T, TD0>) => Action<TFlex, T, TD0>;
  repeat: <TFlex = DFlex, T = D, TD0 = DD0>(
    num: number,
    action: Action<TFlex, T, TD0>
  ) => Action<TFlex, T, TD0>;
  reset: <TFlex = DFlex, T = D, TD0 = DD0>() => Action<TFlex, T, TD0>;
  resolve: <TReturn extends any = any, TFlex = DFlex, T = D, TD0 = DD0>(
    ctx: Ctx<TFlex, T, TD0>,
    resolveAction: ResolveAction<TReturn, TFlex, T, TD0>
  ) => TReturn | Promise<TReturn>;
  sequence: <TFlex = DFlex, T = D, TD0 = DD0>(actions: Action<TFlex, T, TD0>[]) => Action<TFlex, T, TD0>;
  set: <TReturn extends any = any, TFlex = DFlex, T = D, TD0 = DD0>(
    name: string,
    update: ResolveAction<TReturn, TFlex, T, TD0>
  ) => Action<TFlex, T, TD0>;
  split: <TFlex = DFlex, T = D, TD0 = DD0>(
    fork: MergeAction<TFlex, Ctx<TFlex, T, TD0>>,
    action: Action<TFlex, T, TD0>,
    merge: MergeAction<TFlex, Ctx<TFlex, T, TD0>>
  ) => Action<TFlex, T, TD0>;
  template: <TFlex = DFlex, T = D, TD0 = DD0>(
    name: string,
    template: ResolveAction<string, TFlex, T, TD0>
  ) => Action<TFlex, T, TD0>;
  when: <TFlex = DFlex, T = D, TD0 = DD0>(
    condition: ConditionAction<TFlex, T, TD0>,
    trueAction: Action<TFlex, T, TD0>,
    falseAction: Action<TFlex, T, TD0>
  ) => Action<TFlex, T, TD0>;
};

export const coreTransforms: <DFlex = void, D = void, DD0 = void>() => CoreTransforms<DFlex, D, DD0> = <
  DFlex = void,
  D = void,
  DD0 = void
>() => {
  return {
    clear: <TFlex = DFlex, T = D, TD0 = DD0>(name: string) =>
      clear<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>(name),
    dynamic: <TFlex = void, T = any, TD0 = any>(name: string, template: string) =>
      dynamic<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>(name, template),
    each: <TFlex = void, T = any, TD0 = any>(action: Action<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>) =>
      each<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>(action),
    merge: <TFlex = void, T = any, TD0 = any>(updateCtx: Ctx<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>) =>
      merge<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>(updateCtx),
    output: <TFlex = void, T = any, TD0 = any>(
      path: PathLike | FileHandle,
      resolve: ResolveAction<string, Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>
    ) => output<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>(path, resolve),
    remap: <TFlex = void, T = any, TD0 = any>(update?: Action<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>) =>
      remap<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>(update),
    repeat: <TFlex = void, T = any, TD0 = any>(
      num: number,
      action: Action<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>
    ) => repeat<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>(num, action),
    reset: <TFlex = void, T = any, TD0 = any>() => reset<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>(),
    resolve: <TReturn extends any = any, TFlex = void, T = any, TD0 = any>(
      ctx: Ctx<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>,
      resolveAction: ResolveAction<TReturn, Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>
    ) => resolve<TReturn, Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>(ctx, resolveAction),
    sequence: <TFlex = void, T = any, TD0 = any>(
      actions: Action<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>[]
    ) => sequence<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>(actions),
    set: <TReturn extends any = any, TFlex = void, T = any, TD0 = any>(
      name: string,
      update: ResolveAction<TReturn, Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>
    ) => set<TReturn, Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>(name, update),
    split: <TFlex = void, T = any, TD0 = any>(
      fork: MergeAction<Or<TFlex, DFlex>, Ctx<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>>,
      action: Action<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>,
      merge: MergeAction<Or<TFlex, DFlex>, Ctx<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>>
    ) => split<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>(fork, action, merge),
    template: <TFlex = void, T = any, TD0 = any>(
      name: string,
      _template: ResolveAction<string, Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>
    ) => template<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>(name, _template),
    when: <TFlex = void, T = any, TD0 = any>(
      condition: ConditionAction<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>,
      trueAction: Action<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>,
      falseAction: Action<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>
    ) => when<Or<TFlex, DFlex>, Or<T, D>, Or<TD0, DD0>>(condition, trueAction, falseAction),
  } as CoreTransforms<DFlex, D, DD0>;
};

// let m = coreTransforms<{ test: number }>();
// let t = m.remap(ctx => {
//   return ctx;
// })({ $item: 1, $d0: null, test: 1 });
// useTransforms<{ test: number }>(d0 => {
//   d0.clear('test');
// });
// let test: Ctx<'Flex', number, number> = {
//   test: 1,
//   $d0: 0,
//   $item: 0,
// };
// let test2: Ctx<{ test: number }, number, number> = {
//   test: 1,
//   $d0: 0,
//   $item: 0,
// };
// test.any = 123;

// test.$d0 = '';
