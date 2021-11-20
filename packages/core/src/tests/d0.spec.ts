import { d0 } from '../lib/d0';
import { Action } from '../lib/types';

describe('execute a set of template function and resolve a value', () => {
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
    let result = JSON.parse(d0(actions, ctx => JSON.stringify(ctx)));
    expect(result).toEqual({
      tmpl: { template: 'TAADAA' },
      values: { count: 3, newvalue: true },
    });
  });

  it('should run sequence and resolve a complex value', () => {
    let mockAction1: Action = (values, ctx) => {
      ctx.values['count'] = 3;
      return ctx;
    };
    let mockAction2: Action = (values, ctx) => {
      ctx.values['count']++;
      ctx.values['newvalue'] = 'BLAHBLAH';
      return ctx;
    };
    let mockAction3: Action = (values, ctx) => {
      ctx.values['count']++;
      ctx.tmpl['template'] = 'TAADAA';
      return ctx;
    };

    let actions: Action[] = [mockAction1, mockAction2, mockAction3];
    let result = d0(
      actions,
      ctx =>
        `I calculated ${ctx.values['count']} and ${ctx.values['newvalue']} with template "${ctx.tmpl['template']}"`
    );
    expect(result).toEqual('I calculated 5 and BLAHBLAH with template "TAADAA"');
  });
});
