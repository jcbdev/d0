import { reset } from '../lib/reset';

describe('reset context', () => {
  it('should clear all values', async () => {
    let action = reset();
    let result = await action({ $tmpl: { cleartmpl: '12345' }, clearVal: true });
    expect(result).toEqual({
      $tmpl: {},
    });
  });
});
