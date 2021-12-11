import { merge } from '../lib/d0s/merge';
import { Context } from '../lib/types';

describe('merge two contexts', () => {
  it('should merge two contexts', async () => {
    let firstContext: any = {
      kept: 'Value',
      overwritten: 'Old2',
    };
    let secondContext: any = {
      new: 'NewValue',
      overwritten: 'New2',
    };

    let result = await merge(secondContext)(firstContext);
    expect(result).toEqual({
      kept: 'Value',
      overwritten: 'New2',
      new: 'NewValue',
    });
  });
});
