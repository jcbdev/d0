export type CtxBase<T = void> = T extends void ? {} : T & {};

export type Ctx<TFlex = void, TBase = void> = TFlex extends void
  ? CtxBase<TBase>
  : TFlex extends 'Flex'
  ? ({ [K in keyof CtxBase<TBase>]: CtxBase<TBase>[K] } & Record<string, any>) & CtxBase<TBase>
  : TFlex & CtxBase<TBase>;

export type D0<TFlex = void, TBase = void> = (
  ctx: Ctx<TFlex, TBase>
) => Promise<Ctx<TFlex, TBase>> | Ctx<TFlex, TBase>;

export type StartD0<TD0, TFlex = void, TBase = void> = (
  d0$: TD0,
  ctx: Ctx<TFlex, TBase>
) => Promise<D0<TFlex, TBase>> | D0<TFlex, TBase>;

export type ItemD0<T, TFlex = void, TBase = void> = (
  item: T | T[],
  ctx: Ctx<TFlex, TBase>
) => Promise<Ctx<TFlex, TBase>> | Ctx<TFlex, TBase>;

export type MergeD0<TFlex = void, TBase = void> = (
  source: Ctx<TFlex, TBase>,
  target: Ctx<TFlex, TBase>
) => Promise<Ctx<TFlex, TBase>> | Ctx<TFlex, TBase>;

export type ResolveD0<TReturn extends any, TFlex = void, TBase = void> = (
  ctx: Ctx<TFlex, TBase>
) => Promise<TReturn> | TReturn;

export type ConditionD0<TFlex = void, TBase = void> = ResolveD0<boolean, TFlex, TBase>;

export type Or<T = void, TOr = void> = T extends void ? TOr : T;

export type BaseD0s<DFlex = void, DBase = void> = {
  d0: <TD0, DFlex = void, DBase = void>(
    d0: <TFlex = DFlex>() => TD0,
    startD0: StartD0<TD0, DFlex, DBase>,
    withCtx?: Ctx<DFlex, DBase>
  ) => Promise<Ctx<DFlex, DBase>>;
};
