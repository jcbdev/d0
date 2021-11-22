import { d0 } from '../lib/d0';
import { Action } from '../lib/types';

describe('execute a function', () => {
  it('should run action and return updated context', async () => {
    let mockAction1: Action = (values, ctx) => {
      ctx.values['count'] = 1;
      return ctx;
    };

    let result = await d0(mockAction1);
    expect(result).toEqual({
      tmpl: {},
      values: { count: 1 },
    });
  });

  it('should run action and update existing context', async () => {
    let mockAction1: Action = (values, ctx) => {
      ctx.values['count'] = 1;
      return ctx;
    };

    let result = await d0(mockAction1, { tmpl: { test: '1' }, values: { existing: true } });
    expect(result).toEqual({
      tmpl: { test: '1' },
      values: { count: 1, existing: true },
    });
  });
});
