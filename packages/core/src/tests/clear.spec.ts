import { clear } from '../lib/clear';

describe('clear values on context', () => {
  it('should clear value to primitive', async () => {
    let action = clear('clearVal');
    let result = await action({ clearVal: true }, { tmpl: {}, values: { clearVal: true } });
    expect(result).toEqual({
      tmpl: {},
      values: {},
    });
  });
});
