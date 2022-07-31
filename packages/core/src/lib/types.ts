// export type CtxBase<T = void> = T extends void ? {} : T & {};

import { d0 } from './d0';

// export type Ctx<T = any> = TFlex extends void
//   ? CtxBase<TBase>
//   : TFlex extends any
//   ? ({ [K in keyof CtxBase<TBase>]: CtxBase<TBase>[K] } & Record<string, any>) & CtxBase<TBase>
//   : TFlex & CtxBase<TBase>;

export type Ctx<T = any> = T extends void ? {} : T;

export type D0<T = any> = (ctx: Ctx<T>) => Promise<Ctx<T>> | Ctx<T>;

export type D0Fork<T = any, TD0 = any> = (ctx: Ctx<T>, d0$: TD0) => Promise<D0<T>> | D0<T>;

export type StartD0<TD0 = any, T = any> = (ctx: Ctx<T>, d0$: TD0) => Promise<D0<T>> | D0<T>;

export type ItemD0<IType = any, T = any> = (item: IType, ctx: Ctx<T>) => Promise<D0<T>> | D0<T>;

export type EntryD0<IType = any, T = any> = (
  name: string,
  entry: IType,
  ctx: Ctx<T>
) => Promise<D0<T>> | D0<T>;

export type MergeD0<TSource, TTarget> = (source: TSource, target: TTarget) => Promise<TTarget> | TTarget;

export type ResolveD0<TReturn extends any = any, T = any> = (ctx: Ctx<T>) => Promise<TReturn> | TReturn;

export type ConditionD0<T = any> = ResolveD0<boolean, T>;

export type Or<T = void, TOr = void> = T extends void ? TOr : T;

export type BaseD0s<D = any> = {
  d0: <T = D, TD0 = any>(
    action: StartD0<TD0, T>,
    options?: {
      withCtx?: Ctx<T>;
      d0?: () => TD0 | string;
    }
  ) => Promise<Ctx<T>>;
};
