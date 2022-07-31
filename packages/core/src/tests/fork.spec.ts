import { fork } from '../lib/d0s/fork';
import { D0 } from '../lib/types';

describe('execute an D0 in isolated context', () => {
  it('should isolate and remerge context using the same structure', async () => {
    let mockD01: D0<any> = ctx => {
      return ctx => {
        ctx['exists'] = ctx['original'] ?? false;
        return ctx;
      };
    };

    let result = await fork(mockD01)({ original: true });

    expect(result).toEqual({
      exists: true,
      original: true,
    });
  });

  it('should map sub-context using map function and then merge both to original', async () => {
    let mockD01: D0<any> = ctx => {
      return ctx => {
        ctx['exists'] = ctx['original'] ?? false;
        return ctx;
      };
    };

    // let result = await fork(mockD01, ctx => ({ notOriginalAnymore: true }))({ original: true });
    let result = await fork(mockD01, { map: ctx => ({ notOriginalAnymore: true }) })({ original: true });

    expect(result).toEqual({
      exists: false,
      notOriginalAnymore: true,
      original: true,
    });
  });

  it('should map sub-context using map function and then intercep re-merge function', async () => {
    let mockD01: D0<any> = ctx => {
      return ctx => {
        ctx['exists'] = ctx['original'] ?? false;
        return ctx;
      };
    };

    let result = await fork<any>(mockD01, {
      map: ctx => ({ notOriginalAnymore: true }),
      merge: (s, d) => {
        d.exists = s.exists;
        d.mappedOnMerge = true;
        return d;
      },
    })({ original: true });

    expect(result).toEqual({
      exists: false,
      mappedOnMerge: true,
      original: true,
    });
  });
});
