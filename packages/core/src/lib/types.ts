// export type AnyContext = Record<string, any>;
// export type FlexContext<K extends keyof Record<string, any> = string, U = any, T = any, TD0 = any> = {
//   [P in K]?: U;
// } & Context<T, TD0>;

export type Context<TBase extends object = { $item: any; $d0: any }> = TBase & {};

// export type FlexContext<TCtx = Context> = TCtx | { [K in keyof TCtx]: TCtx[K] } | Record<string, any>;
// export type TypedContext<TExt extends object, TCtx = Context> = TCtx | TExt;

// export type Context<T = any, TD0 = any> = {
//   $item: T;
//   $d0: TD0;
// };

// export type FlexContext<T = any, TD0 = any> =
//   | Context<T, TD0>
//   | Record<'$item' | '$d0' | string, any | T | TD0>;

// export type AnyContext<T = any, TD0 = any> = Context<T, TD0> | FlexContext<T, TD0>;
// export type AnyContext<
//   TExt = never,
//   T = any,
//   TD0 = any,
//   TBase extends object = { $item: T; $d0: TD0 }
// > = TExt extends object ? TypedContext<TExt, Context<T, TD0, TBase>> : FlexContext<Context<T, TD0, TBase>>;
// export type AnyContext<T = any, TD0 = any, TBase extends object = { $item: T; $d0: TD0 }> =
//   | Context<T, TD0, TBase>
//   | FlexContext<Context<T, TD0, TBase>>;

// export type ContextWith<U extends object, T = any, TD0 = any> = Context<T, TD0, U>;
// export type FlexContextWith<U extends object, T = any, TD0 = any> = FlexContext<T, TD0, U>;

// export type Context = AnyContext & BaseContext;
// export type TestContext = FlexContext;

// export type WithItem<T, TCtx extends AnyContext<T, any> = AnyContext<T, any>> = TCtx;
// export type WithD0<T, TD0, TCtx extends AnyContext<T, TD0> = AnyContext<T, TD0>> = TCtx;
// export type WithD0<
//   T extends any,
//   TCtx extends Context = Context,
//   TD0 extends Transforms<TCtx> = CoreTransforms<TCtx>
// > = { $d0?: TD0 } & WithItem<T, TCtx>;
export type CtxBase<T = void, TD0 = void> = T extends void
  ? TD0 extends void
    ? Context<{ $item: any; $d0: any }>
    : Context<{ $item: any; $d0: TD0 }>
  : TD0 extends void
  ? Context<{ $item: T; $d0: any }>
  : Context<{ $item: T; $d0: TD0 }>;

export type Ctx<TFlex = void, T = void, TD0 = void> = TFlex extends void
  ? CtxBase<T, TD0>
  : TFlex extends 'Flex'
  ? ({ [K in keyof CtxBase<T, TD0>]: CtxBase<T, TD0>[K] } | Record<string, any>) & CtxBase<T, TD0>
  : TFlex & CtxBase<T, TD0>;

export type Action<TFlex = void, T = void, TD0 = void> = (
  ctx: Ctx<TFlex, T, TD0>
) => Promise<Ctx<TFlex, T, TD0>> | Ctx<TFlex, T, TD0>;

// export type Action<
//   TExt = never,
//   T extends any = any,
//   TCtx extends AnyContext<TExt, T> = AnyContext<TExt, T>
// > = (ctx: TCtx) => Promise<TCtx> | TCtx;

// export type Action<T, TCtx extends Context<T>> = BaseAction<any, any, TCtx>;

// export type ItemAction<T, TCtx extends Context<T>> = (
//   item: (ctx: TCtx) => T,
//   ctx: TCtx
// ) => Promise<TCtx> | TCtx;

export type MergeAction<TFlex = void, TCtx = Context> = (ctx: Ctx<TFlex, Ctx<TFlex>>) => Promise<TCtx> | TCtx;

// export type ContextAction = (name: string, update?: Function) => Action;

export type ResolveAction<TReturn extends any, TFlex = void, T = void, TD0 = void> = (
  ctx: Ctx<TFlex, T, TD0>
) => Promise<TReturn> | TReturn;

export type ConditionAction<TFlex = void, T = void, TD0 = void> = ResolveAction<boolean, TFlex, T, TD0>;

export type Or<T = void, TOr = void> = T extends void ? TOr : T;
