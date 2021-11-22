import { template } from '../lib/template';

describe('template literal templating', () => {
  it('should convert basic primitives', async () => {
    let action = template('test1', ({ test }: { test: string }) => `Convert ${test} to something`);
    let result = action({ test: 'Hello!' }, { tmpl: {}, values: { test: 'Hello!' } });
    expect(result).toEqual({
      tmpl: { test1: 'Convert Hello! to something' },
      values: { test: 'Hello!' },
    });
  });

  it('should support complex logic', async () => {
    let action = template('test1', ({ test }: { test: any[] }) =>
      test.map(t => `Convert ${t} to something`).join(', ')
    );
    let result = await action(
      { test: ['Hello!', 1, 'beep boop'] },
      { tmpl: {}, values: { test: ['Hello!', 1, 'beep boop'] } }
    );
    expect(result).toEqual({
      tmpl: { test1: 'Convert Hello! to something, Convert 1 to something, Convert beep boop to something' },
      values: { test: ['Hello!', 1, 'beep boop'] },
    });
  });
});
