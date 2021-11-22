import { when } from '../lib/when';
import { Action } from '../lib/types';

describe('conditionally execute an action', () => {
  it('should run true action', async () => {
    let trueAction: Action = (values, ctx) => {
      ctx.values['result'] = true;
      return ctx;
    };
    let falseAction: Action = (values, ctx) => {
      ctx.values['result'] = false;
      return ctx;
    };

    let result = await when(() => true, trueAction, falseAction)({}, { tmpl: {}, values: {} });
    expect(result).toMatchObject({
      tmpl: {},
      values: { result: true },
    });
  });

  it('should run false action', async () => {
    let trueAction: Action = (values, ctx) => {
      ctx.values['result'] = true;
      return ctx;
    };
    let falseAction: Action = (values, ctx) => {
      ctx.values['result'] = false;
      return ctx;
    };

    let result = await when(() => false, trueAction, falseAction)({}, { tmpl: {}, values: {} });
    expect(result).toMatchObject({
      tmpl: {},
      values: { result: false },
    });
  });

  it('condition has access to context', async () => {
    let trueAction: Action = (values, ctx) => {
      ctx.values['result'] = true;
      return ctx;
    };
    let falseAction: Action = (values, ctx) => {
      ctx.values['result'] = false;
      return ctx;
    };

    let result = await when(
      (values, ctx) => values.test,
      trueAction,
      falseAction
    )({ test: true }, { tmpl: {}, values: { test: true } });
    expect(result).toEqual({
      tmpl: {},
      values: { result: true, test: true },
    });
  });
});
