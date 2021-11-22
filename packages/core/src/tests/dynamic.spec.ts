import { dynamic } from '../lib/dynamic';

describe('dynamic template transformation', () => {
  it('should convert basic primitives', async () => {
    let action = dynamic('test1', 'Convert ${test} to something');
    let result = await action({ test: 'Hello!' }, { tmpl: {}, values: { test: 'Hello!' } });
    expect(result).toEqual({
      tmpl: { test1: 'Convert Hello! to something' },
      values: { test: 'Hello!' },
    });
  });
});
