import { pretty } from '../lib/pretty';

describe('prettier formatting of code', () => {
  it('should run prettier on a typescript input', async () => {
    let ctx: any = {
      transformed: `type hello={id:string;test:string}`,
    };
    let result = await pretty<any>('pretty', ctx => ctx.transformed, {
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
