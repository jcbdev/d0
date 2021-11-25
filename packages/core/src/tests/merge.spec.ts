import { merge } from '../lib/merge';
import { Context } from '../lib/types';

describe('merge two contexts', () => {
  it('should merge two contexts', async () => {
    let firstContext: Context = {
      $tmpl: { kept: 'Test', overwritten: 'Old1' },
      kept: 'Value',
      overwritten: 'Old2',
    };
    let secondContext: Context = {
      $tmpl: { new: 'Hello', overwritten: 'New1' },
      new: 'NewValue',
      overwritten: 'New2',
    };

    let result = await merge(secondContext)(firstContext);
    expect(result).toEqual({
      $tmpl: { kept: 'Test', overwritten: 'New1', new: 'Hello' },
      kept: 'Value',
      overwritten: 'New2',
      new: 'NewValue',
    });
  });
});
