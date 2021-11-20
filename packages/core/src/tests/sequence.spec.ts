import { sequence } from '../lib/sequence';
import { Action } from '../lib/types';

describe('execute a set of template actions in a sequence', () => {
  it('should run sequence and resolve', () => {
    let mockAction1: Action = (values, ctx) => {
      ctx.values['count'] = 1;
      return ctx;
    };
    let mockAction2: Action = (values, ctx) => {
      ctx.values['count']++;
      ctx.values['newvalue'] = true;
      return ctx;
    };
    let mockAction3: Action = (values, ctx) => {
      ctx.values['count']++;
      ctx.tmpl['template'] = 'TAADAA';
      return ctx;
    };

    let actions: Action[] = [mockAction1, mockAction2, mockAction3];
    let result = sequence(actions)({}, { tmpl: {}, values: {} });
    expect(result).toEqual({
      tmpl: { template: 'TAADAA' },
      values: { count: 3, newvalue: true },
    });
  });
});
