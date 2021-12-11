import { when } from '../lib/d0s/when';
import { Action, Context } from '../lib/types';

describe('conditionally execute an action', () => {
  it('should run true action', async () => {
    let trueAction: Action<Context> = ctx => {
      ctx['result'] = true;
      return ctx;
    };
    let falseAction: Action<Context> = ctx => {
      ctx['result'] = false;
      return ctx;
    };

    let result = await when(() => true, trueAction, falseAction)({} as any);
    expect(result).toMatchObject({
      result: true,
    });
  });

  it('should run false action', async () => {
    let trueAction: Action<Context> = ctx => {
      ctx['result'] = true;
      return ctx;
    };
    let falseAction: Action<Context> = ctx => {
      ctx['result'] = false;
      return ctx;
    };

    let result = await when(() => false, trueAction, falseAction)({} as any);
    expect(result).toMatchObject({
      result: false,
    });
  });

  it('condition has access to context', async () => {
    let trueAction: Action<Context> = ctx => {
      ctx['result'] = true;
      return ctx;
    };
    let falseAction: Action<Context> = ctx => {
      ctx['result'] = false;
      return ctx;
    };

    let result = await when(ctx => ctx['test'], trueAction, falseAction)({ test: true } as any);
    expect(result).toEqual({
      result: true,
      test: true,
    });
  });
});
