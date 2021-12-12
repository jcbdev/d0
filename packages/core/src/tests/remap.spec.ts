import { remap } from '../lib/d0s/remap';

describe('remap the context', () => {
  it('should remap the context based on the update function', async () => {
    let action = remap<'Flex'>(ctx => {
      return {
        keep: ctx.keep,
      };
    });
    let result = await action({ keep: 'this', notThis: 123 } as any);
    expect(result).toEqual({
      keep: 'this',
    });
  });
});
