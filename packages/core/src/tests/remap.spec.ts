import { remap } from '../lib/d0s/remap';
import { ContextWith } from '../lib/types';

describe('remap the context', () => {
  it('should remap the context based on the update function', async () => {
    let action = remap<any, ContextWith<{ keep: string }>>(ctx => {
      return {
        keep: ctx.keep,
      } as any;
    });
    let result = await action({ keep: 'this', notThis: 123 } as any);
    expect(result).toEqual({
      keep: 'this',
    });
  });
});
