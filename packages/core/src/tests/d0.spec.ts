import { CoreD0s, coreD0s } from '..';
import { d0 } from '../lib/d0';
import { D0 } from '../lib/types';

describe('execute a function', () => {
  it('should run D0 and using default context configuration', async () => {
    type MyCtx = { count: number };
    let mockD01: D0<MyCtx> = ctx => {
      ctx['count'] = 1;
      return ctx;
    };

    let result = await d0((d0, ctx) => {
      return mockD01;
    });
    expect(result).toEqual({
      count: 1,
    });
  });

  it('should run D0 and return updated context', async () => {
    type MyCtx = { count: number };
    let mockD01: D0<MyCtx> = ctx => {
      ctx['count'] = 1;
      return ctx;
    };

    let result = await d0<MyCtx, CoreD0s<MyCtx>>(
      (ctx, d0) => {
        return mockD01;
      },
      {
        d0: () => {
          return coreD0s<MyCtx>();
        },
      }
    );
    expect(result).toEqual({
      count: 1,
    });
  });

  it('should run D0 and update existing context', async () => {
    type MyCtx = { count?: number; existing: boolean };
    let mockD01: D0<MyCtx> = ctx => {
      ctx['count'] = 1;
      return ctx;
    };

    let result = await d0<MyCtx, CoreD0s<MyCtx>>(
      (ctx, d0$) => {
        return mockD01;
      },
      {
        withCtx: { existing: true },
        d0: () => {
          return coreD0s<MyCtx>();
        },
      }
    );
    expect(result).toEqual({
      count: 1,
      existing: true,
    });
  });
});
