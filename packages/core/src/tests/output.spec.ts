import { output } from '../lib/d0s/output';
import { readFile, writeFile } from 'fs/promises';
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

    // Show that it truncates the file if it already exists
    await writeFile(rndFile, '<<Some existing file content>>');

    let result = await output(rndFile, () => outputJson)({} as any);

    let resultJson = JSON.parse(await readFile(rndFile, 'utf8'));
    expect(resultJson).toEqual({
      testValue: 'Hello',
      otherValue: 123,
    });
  });
});
