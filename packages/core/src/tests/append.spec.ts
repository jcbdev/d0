import { append } from '../lib/d0s/append';
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

    await writeFile(rndFile, '<<Some existing file content>>');

    let result = await append(rndFile, () => outputJson)({} as any);

    let content = await readFile(rndFile, 'utf8');
    expect(content.startsWith('<<Some existing file content>>')).toBeTruthy();
    let resultJson = JSON.parse(content.replace('<<Some existing file content>>', ''));
    expect(resultJson).toEqual({
      testValue: 'Hello',
      otherValue: 123,
    });
  });
});
