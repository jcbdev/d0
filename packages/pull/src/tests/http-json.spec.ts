import { httpJson } from '../lib/http-json';

describe('pull', () => {
  it('should retrieve http text', async () => {
    let ctx = { $tmpl: {} };

    ctx = await httpJson(
      'json',
      'https://raw.githubusercontent.com/jcbdev/d0/main/packages/e2e-tests/project.json'
    )(ctx);
    expect(ctx['json']).toEqual({
      root: 'packages/e2e-tests',
      sourceRoot: 'packages/e2e-tests/src',
      projectType: 'library',
      targets: {
        lint: {
          executor: '@nrwl/linter:eslint',
          outputs: ['{options.outputFile}'],
          options: {
            lintFilePatterns: ['packages/e2e-tests/**/*.ts'],
          },
        },
        test: {
          executor: '@nrwl/jest:jest',
          outputs: ['coverage/packages/e2e-tests'],
          options: {
            jestConfig: 'packages/e2e-tests/jest.config.js',
            passWithNoTests: true,
          },
        },
      },
      tags: ['scope:public', 'type:util', 'target:all'],
    });
  });
});
