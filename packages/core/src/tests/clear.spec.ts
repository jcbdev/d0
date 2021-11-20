import { clear } from '../lib/clear';

describe('clear values on context', () => {
  it('should clear value to primitive', () => {
    let action = clear('clearVal');
    let result = action({ clearVal: true }, { tmpl: {}, values: { clearVal: true } });
    expect(result).toEqual({
      tmpl: {},
      values: {},
    });
  });
});
