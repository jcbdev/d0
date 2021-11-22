import { output } from '../lib/output';
import { readFile } from 'fs/promises';
import path from 'path';
import os from 'os';

describe('should save text to file', () => {
  it('should save to file', async () => {
    const outputJson = /* json */ `
    {
      "testValue": "Hello",
      "otherValue": 123
    }
    `;
    let rndFile = path.resolve(
      os.tmpdir(),
      `${(Math.random() + 1).toString(36).substring(7)}-${(Math.random() + 1).toString(36).substring(7)}.json`
    );

    let result = await output(outputJson, rndFile)({}, { tmpl: {}, values: {} });

    let resultJson = JSON.parse(await readFile(rndFile, 'utf8'));
    expect(resultJson).toEqual({
      testValue: 'Hello',
      otherValue: 123,
    });
  });
});
