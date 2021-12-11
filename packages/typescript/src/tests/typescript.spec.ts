import { Context } from '@d0/core';
import { typescript } from '../lib/typescript';
import { createSourceFile, ScriptTarget } from 'typescript';

describe('typescript', () => {
  it('convert to ast', async () => {
    let ts = /* typescript */ `
let hello = "world";
function x(test: string) {
  console.log(test);
}
x(hello);
    `;

    let ctx: Context = { $tmpl: {} };
    ctx = await typescript('ast', 'x.ts', ts, ScriptTarget.Latest)(ctx);

    // expect(JSON.parse(JSON.stringify(ctx.ast, null, 2))).toEqual({
    expect(JSON.parse(JSON.stringify(ctx.ast, null, 2))).toEqual({
      amdDependencies: [],
      bindDiagnostics: [],
      end: 86,
      endOfFileToken: {
        end: 86,
        flags: 0,
        kind: 1,
        modifierFlagsCache: 0,
        pos: 81,
        transformFlags: 0,
      },
      fileName: 'x.ts',
      flags: 0,
      hasNoDefaultLib: false,
      identifierCount: 8,
      identifiers: {},
      isDeclarationFile: false,
      kind: 298,
      languageVariant: 0,
      languageVersion: 99,
      libReferenceDirectives: [],
      modifierFlagsCache: 0,
      nodeCount: 23,
      parseDiagnostics: [],
      pos: 0,
      pragmas: {},
      referencedFiles: [],
      scriptKind: 3,
      statements: [
        {
          declarationList: {
            declarations: [
              {
                end: 20,
                flags: 0,
                initializer: {
                  end: 20,
                  flags: 0,
                  hasExtendedUnicodeEscape: false,
                  kind: 10,
                  modifierFlagsCache: 0,
                  pos: 12,
                  text: 'world',
                  transformFlags: 0,
                },
                kind: 250,
                modifierFlagsCache: 0,
                name: {
                  end: 10,
                  escapedText: 'hello',
                  flags: 0,
                  kind: 78,
                  modifierFlagsCache: 0,
                  pos: 4,
                  transformFlags: 0,
                },
                pos: 4,
                transformFlags: 0,
              },
            ],
            end: 20,
            flags: 1,
            kind: 251,
            modifierFlagsCache: 0,
            pos: 0,
            transformFlags: 2228736,
          },
          end: 21,
          flags: 0,
          kind: 233,
          modifierFlagsCache: 0,
          pos: 0,
          transformFlags: 2228736,
        },
        {
          body: {
            end: 71,
            flags: 0,
            kind: 231,
            modifierFlagsCache: 0,
            multiLine: true,
            pos: 46,
            statements: [
              {
                end: 69,
                expression: {
                  arguments: [
                    {
                      end: 67,
                      escapedText: 'test',
                      flags: 0,
                      kind: 78,
                      modifierFlagsCache: 0,
                      pos: 63,
                      transformFlags: 0,
                    },
                  ],
                  end: 68,
                  expression: {
                    end: 62,
                    expression: {
                      end: 58,
                      escapedText: 'console',
                      flags: 0,
                      kind: 78,
                      modifierFlagsCache: 0,
                      pos: 48,
                      transformFlags: 0,
                    },
                    flags: 0,
                    kind: 202,
                    modifierFlagsCache: 0,
                    name: {
                      end: 62,
                      escapedText: 'log',
                      flags: 0,
                      kind: 78,
                      modifierFlagsCache: 0,
                      pos: 59,
                      transformFlags: 0,
                    },
                    pos: 48,
                    transformFlags: 0,
                  },
                  flags: 0,
                  kind: 204,
                  modifierFlagsCache: 0,
                  pos: 48,
                  transformFlags: 0,
                },
                flags: 0,
                kind: 234,
                modifierFlagsCache: 0,
                pos: 48,
                transformFlags: 0,
              },
            ],
            transformFlags: 0,
          },
          end: 71,
          flags: 0,
          kind: 252,
          modifierFlagsCache: 0,
          name: {
            end: 32,
            escapedText: 'x',
            flags: 0,
            kind: 78,
            modifierFlagsCache: 0,
            pos: 30,
            transformFlags: 0,
          },
          parameters: [
            {
              end: 45,
              flags: 0,
              kind: 161,
              modifierFlagsCache: 0,
              name: {
                end: 37,
                escapedText: 'test',
                flags: 0,
                kind: 78,
                modifierFlagsCache: 0,
                pos: 33,
                transformFlags: 0,
              },
              pos: 33,
              transformFlags: 1,
              type: {
                end: 45,
                flags: 0,
                kind: 147,
                modifierFlagsCache: 0,
                pos: 38,
                transformFlags: 1,
              },
            },
          ],
          pos: 21,
          transformFlags: 2097153,
        },
        {
          end: 81,
          expression: {
            arguments: [
              {
                end: 79,
                escapedText: 'hello',
                flags: 0,
                kind: 78,
                modifierFlagsCache: 0,
                pos: 74,
                transformFlags: 0,
              },
            ],
            end: 80,
            expression: {
              end: 73,
              escapedText: 'x',
              flags: 0,
              kind: 78,
              modifierFlagsCache: 0,
              pos: 71,
              transformFlags: 0,
            },
            flags: 0,
            kind: 204,
            modifierFlagsCache: 0,
            pos: 71,
            transformFlags: 0,
          },
          flags: 0,
          kind: 234,
          modifierFlagsCache: 0,
          pos: 71,
          transformFlags: 0,
        },
      ],
      text: `
let hello = \"world\";
function x(test: string) {
  console.log(test);
}
x(hello);
    `,
      transformFlags: 2228737,
      typeReferenceDirectives: [],
    });
    // expect(ctx).toMatchObject({});
  });

  //   it('should something', () => {
  //     let ts = /* typescript */ `
  // let hello = "world";
  // function x(test: string) {
  //   console.log(test);
  // }
  // x(hello);
  //     `;
  //     let ast = createSourceFile('a.ts', ts, ScriptTarget.Latest);

  //     ast.statements
  //   })
});
