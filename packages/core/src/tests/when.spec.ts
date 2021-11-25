import { when } from '../lib/when';
import { Action } from '../lib/types';

describe('conditionally execute an action', () => {
  it('should run true action', async () => {
    let trueAction: Action = ctx => {
      ctx['result'] = true;
      return ctx;
    };
    let falseAction: Action = ctx => {
      ctx['result'] = false;
      return ctx;
    };

    let result = await when(() => true, trueAction, falseAction)({ $tmpl: {} });
    expect(result).toMatchObject({
      $tmpl: {},
      result: true,
    });
  });

  it('should run false action', async () => {
    let trueAction: Action = ctx => {
      ctx['result'] = true;
      return ctx;
    };
    let falseAction: Action = ctx => {
      ctx['result'] = false;
      return ctx;
    };

    let result = await when(() => false, trueAction, falseAction)({ $tmpl: {} });
    expect(result).toMatchObject({
      $tmpl: {},
      result: false,
    });
  });

  it('condition has access to context', async () => {
    let trueAction: Action = ctx => {
      ctx['result'] = true;
      return ctx;
    };
    let falseAction: Action = ctx => {
      ctx['result'] = false;
      return ctx;
    };

    let result = await when(ctx => ctx.test, trueAction, falseAction)({ $tmpl: {}, test: true });
    expect(result).toEqual({
      $tmpl: {},
      result: true,
      test: true,
    });
  });
});
