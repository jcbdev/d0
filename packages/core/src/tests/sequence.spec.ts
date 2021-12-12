import { sequence } from '../lib/d0s/sequence';
import { D0 } from '../lib/types';

describe('execute a set of template D0s in a sequence', () => {
  it('should run sequence and resolve', async () => {
    let mockD01: D0<'Flex'> = ctx => {
      ctx['count'] = 1;
      return ctx;
    };
    let mockD02: D0<'Flex'> = ctx => {
      ctx['count']++;
      ctx['newvalue'] = true;
      return ctx;
    };
    let mockD03: D0<'Flex'> = ctx => {
      ctx['count']++;
      ctx['template'] = 'TAADAA';
      return ctx;
    };

    let D0s: D0<'Flex'>[] = [mockD01, mockD02, mockD03];
    let result = await sequence(D0s)({});

    expect(result).toEqual({
      template: 'TAADAA',
      count: 3,
      newvalue: true,
    });
  });
});
