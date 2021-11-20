import { merge } from '../lib/merge';
import { Context } from '../lib/types';

describe('merge two contexts', () => {
  it('should merge two contexts', () => {
    let firstContext: Context = {
      tmpl: { kept: 'Test', overwritten: 'Old1' },
      values: { kept: 'Value', overwritten: 'Old2' },
    };
    let secondContext: Context = {
      tmpl: { new: 'Hello', overwritten: 'New1' },
      values: { new: 'NewValue', overwritten: 'New2' },
    };

    let result = merge(secondContext)({ kept: 'Value', overwritten: 'Old2' }, firstContext);
    expect(result).toEqual({
      tmpl: { kept: 'Test', overwritten: 'New1', new: 'Hello' },
      values: { kept: 'Value', overwritten: 'New2', new: 'NewValue' },
    });
  });
});
