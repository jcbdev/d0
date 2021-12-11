import { sequence } from '../lib/d0s/sequence';
import { Action, Context } from '../lib/types';
import { clearProps } from './helpers/clear-props';

describe('execute a set of template actions in a sequence', () => {
  it('should run sequence and resolve', async () => {
    let mockAction1: Action<Context> = ctx => {
      ctx['count'] = 1;
      return ctx;
    };
    let mockAction2: Action<Context> = ctx => {
      ctx['count']++;
      ctx['newvalue'] = true;
      return ctx;
    };
    let mockAction3: Action<Context> = ctx => {
      ctx['count']++;
      ctx['template'] = 'TAADAA';
      return ctx;
    };

    let actions: Action<Context>[] = [mockAction1, mockAction2, mockAction3];
    let result = await sequence(actions)({} as any);
    result = clearProps(result, '$d0', '$item');
    expect(result).toEqual({
      template: 'TAADAA',
      count: 3,
      newvalue: true,
    });
  });
});
