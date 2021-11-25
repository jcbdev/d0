import { sequence } from '../lib/sequence';
import { Action } from '../lib/types';

describe('execute a set of template actions in a sequence', () => {
  it('should run sequence and resolve', async () => {
    let mockAction1: Action = ctx => {
      ctx['count'] = 1;
      return ctx;
    };
    let mockAction2: Action = ctx => {
      ctx['count']++;
      ctx['newvalue'] = true;
      return ctx;
    };
    let mockAction3: Action = ctx => {
      ctx['count']++;
      ctx.$tmpl['template'] = 'TAADAA';
      return ctx;
    };

    let actions: Action[] = [mockAction1, mockAction2, mockAction3];
    let result = await sequence(actions)({ $tmpl: {} });
    expect(result).toEqual({
      $tmpl: { template: 'TAADAA' },
      count: 3,
      newvalue: true,
    });
  });
});
