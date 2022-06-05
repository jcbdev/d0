import { fromYaml } from '../lib/from-yaml';
import { writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';

describe('should load object from yaml into context', () => {
  it('should load from file', async () => {
    const yaml = /* yaml */ `
testValue: 'Hello'
otherValue: 123
    `;
    let rndFile = path.resolve(
      os.tmpdir(),
      `${(Math.random() + 1).toString(36).substring(7)}-${(Math.random() + 1).toString(36).substring(7)}.yaml`
    );
    await writeFile(rndFile, yaml);
    let result = await fromYaml('loadYaml', rndFile)({});
    expect(result).toEqual({
      loadYaml: {
        testValue: 'Hello',
        otherValue: 123,
      },
    });
  });
});
