import { d0 } from '../lib/d0';
import { Action, Context, ContextWith, ScopeAction } from '../lib/types';
import { clearProps } from './helpers/clear-props';

describe('execute a function', () => {
  it('should run action and return updated context', async () => {
    let mockAction1: Action<Context> = ctx => {
      ctx['count'] = 1;
      return ctx;
    };

    let result = await d0(mockAction1);
    result = clearProps(result, '$d0', '$item');
    expect(result).toEqual({
      count: 1,
    });
  });

  it('should run action and update existing context', async () => {
    let mockAction1: ScopeAction<Context> = ctx => {
      ctx['count'] = 1;
      return ctx;
    };

    let result = await d0(mockAction1, { existing: true } as any);
    result = clearProps(result, '$d0', '$item');
    expect(result).toEqual({
      count: 1,
      existing: true,
    });
  });
});
