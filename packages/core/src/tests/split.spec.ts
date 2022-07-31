import { split } from '../lib/d0s/split';
import { D0, D0Fork } from '../lib/types';

describe('execute an D0 in isolated context', () => {
  it('should isolate and remerge context', async () => {
    let mockD01: D0Fork<any> = async ctx => {
      return async (ctx: any) => {
        ctx['exists'] = ctx['original'] ?? false;
        return ctx;
      };
    };

    let result = await split(
      (source, target) => {
        return target;
      },
      mockD01,
      (source, target) => {
        target['exists'] = source['exists'];
        return target;
      }
    )({ original: true });

    expect(result).toEqual({
      exists: false,
      original: true,
    });
  });
});
