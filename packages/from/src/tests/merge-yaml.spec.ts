import { mergeYaml } from '../lib/merge-yaml';
import { writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';

describe('should merge a context from a yaml file', () => {
  it('should merge from file', async () => {
    const yaml = /* yaml */ `
testValue: "Hello"
otherValue: 123
$tmpl: 
  testTemplate: "Something"
    `;
    let rndFile = path.resolve(
      os.tmpdir(),
      `${(Math.random() + 1).toString(36).substring(7)}-${(Math.random() + 1).toString(36).substring(7)}.yaml`
    );
    await writeFile(rndFile, yaml);
    let result = await mergeYaml(rndFile)({ $tmpl: {} });
    expect(result).toEqual({
      $tmpl: {
        testTemplate: 'Something',
      },
      testValue: 'Hello',
      otherValue: 123,
    });
  });
});
