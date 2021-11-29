import { NodeSelector } from '../lib/types';
import { walk } from '../lib/walk';
import isArray from '../utils/is-array';

describe('is array helper function', () => {
  it('should recognise array types', () => {
    expect(isArray({})).toBe(false);
    expect(isArray(new Date())).toBe(false);
    expect(isArray(new Function())).toBe(false);
    expect(isArray([])).toBe(true);
    expect(isArray(new Array())).toBe(true);
    expect(isArray('test')).toBe(false);
    expect(isArray(null)).toBe(false);
  });
});
