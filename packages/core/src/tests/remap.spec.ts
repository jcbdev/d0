import { remap } from '../lib/remap';

describe('remap the context', () => {
  it('should remap the context based on the update function', async () => {
    let action = remap(ctx => {
      return {
        $tmpl: {},
        keep: ctx.keep,
      };
    });
    let result = await action({ $tmpl: { should: 'be gone!' }, keep: 'this', notThis: 123 });
    expect(result).toEqual({
      $tmpl: {},
      keep: 'this',
    });
  });
});
