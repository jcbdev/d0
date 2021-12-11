import { Context, ContextWith, FlexContext } from '..';
import { template } from '../lib/d0s/template';

describe('template literal templating', () => {
  it('should convert basic primitives', async () => {
    let action = template('test1', ({ test }: { test: string }) => `Convert ${test} to something`);
    let result = await action({ test: 'Hello!' });
    expect(result).toEqual({
      test1: 'Convert Hello! to something',
      test: 'Hello!',
    });
  });

  it('should support complex logic', async () => {
    let action = template('test1', ({ test }: { test: any[] }) =>
      test.map(t => `Convert ${t} to something`).join(', ')
    );
    let result = await action({ test: ['Hello!', 1, 'beep boop'] });
    expect(result).toEqual({
      test1: 'Convert Hello! to something, Convert 1 to something, Convert beep boop to something',
      test: ['Hello!', 1, 'beep boop'],
    });
  });
});
