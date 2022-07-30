import matchProp from '../utils/match-prop';

describe('fuzzy property matcher', () => {
  it('should match exactly', () => {
    expect(matchProp({ a: true, ['*a']: true, b: true }, 'a')).toBe('a');
    expect(matchProp({ a: true, aa: true, abcb: true }, 'aa')).toBe('aa');
  });

  it('should fuzzy match if no exact match', () => {
    expect(matchProp({ a: true, ['regex:.*a']: true, b: true }, 'aa')).toBe('regex:.*a');
    expect(matchProp({ aaa: true, ['regex:a.*']: true, b: true }, 'aaaa')).toBe('regex:a.*');
  });
});
