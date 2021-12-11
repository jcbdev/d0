import { dynamic } from '../lib/d0s/dynamic';
import { clearProps } from './helpers/clear-props';

describe('dynamic template transformation', () => {
  it('should convert basic primitives', async () => {
    let action = dynamic('test1', 'Convert ${test} to something');
    let result = await action({ test: 'Hello!' } as any);
    result = clearProps(result, '$d0', '$item');
    expect(result).toEqual({
      test1: 'Convert Hello! to something',
      test: 'Hello!',
    });
  });
});
