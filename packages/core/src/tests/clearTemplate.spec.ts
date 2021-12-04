import { clearTemplate } from '../lib/clearTemplate';

describe('clear template on context', () => {
  it('should clear value to primitive', async () => {
    let action = clearTemplate('clearVal');
    let result = await action({ $tmpl: { clearVal: 'true' } });
    expect(result).toEqual({
      $tmpl: {},
    });
  });
});
