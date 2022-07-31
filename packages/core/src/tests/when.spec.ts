import { when } from '../lib/d0s/when';
import { D0 } from '../lib/types';

describe('conditionally execute an D0', () => {
  it('should run true D0', async () => {
    let trueD0: D0<any> = ctx => {
      ctx['result'] = true;
      return ctx;
    };
    let falseD0: D0<any> = ctx => {
      ctx['result'] = false;
      return ctx;
    };

    let result = await when(() => true, trueD0, falseD0)({} as any);
    expect(result).toMatchObject({
      result: true,
    });
  });

  it('should run false D0', async () => {
    let trueD0: D0<any> = ctx => {
      ctx['result'] = true;
      return ctx;
    };
    let falseD0: D0<any> = ctx => {
      ctx['result'] = false;
      return ctx;
    };

    let result = await when(() => false, trueD0, falseD0)({} as any);
    expect(result).toMatchObject({
      result: false,
    });
  });

  it('condition has access to ctx', async () => {
    let trueD0: D0<any> = ctx => {
      ctx['result'] = true;
      return ctx;
    };
    let falseD0: D0<any> = ctx => {
      ctx['result'] = false;
      return ctx;
    };

    let result = await when(ctx => ctx['test'], trueD0, falseD0)({ test: true } as any);
    expect(result).toEqual({
      result: true,
      test: true,
    });
  });
});
