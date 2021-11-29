import { NodeSelector } from '../lib/types';
import { walk } from '../lib/walk';
import isObject from '../utils/is-object';

describe('is object helper function', () => {
  it('should recognise object types', () => {
    expect(isObject({})).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject(new Function())).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject('test')).toBe(false);
    expect(isObject(null)).toBe(false);
  });
});
