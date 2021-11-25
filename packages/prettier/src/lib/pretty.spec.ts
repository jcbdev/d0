import { Context } from '@d0/core';
import { pretty } from './pretty';

describe('prettier formatting of code', () => {
  it('should run prettier on a typescript input', async () => {
    let ctx: Context = {
      $tmpl: {
        transformed: `type hello={id:string;test:string}`,
      },
    };
    let result = await pretty('pretty', ctx => ctx.$tmpl.transformed, {
      parser: 'typescript',
      filepath: 'test.ts',
      printWidth: 20,
    })(ctx);
    expect(result.pretty).toEqual(
      `type hello = {
  id: string;
  test: string;
};
`
    );
  });
});
