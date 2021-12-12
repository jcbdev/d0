import { resolve } from '../lib/d0s/resolve';

describe('resolve a final value from a context', () => {
  it('should resolve', async () => {
    let context: any = {
      template: 'TAADAA',
      count: 3,
      newvalue: true,
    };

    let result = JSON.parse(await resolve(context, ctx => JSON.stringify(ctx)));
    expect(result).toEqual({
      template: 'TAADAA',
      count: 3,
      newvalue: true,
    });
  });

  it('should resolve a complex value', async () => {
    let context: any = {
      template: 'TAADAA',
      count: 3,
      newvalue: 'BLAHBLAH',
    };

    let result = await resolve(
      context,
      ctx => `I calculated ${ctx['count']} and ${ctx['newvalue']} with template "${ctx['template']}"`
    );
    expect(result).toEqual('I calculated 3 and BLAHBLAH with template "TAADAA"');
  });
});
