import { mergeJson } from '../lib/merge-json';
import { writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';

describe('should merge a context from a json file', () => {
  it('should merge from file', async () => {
    const json = /* json */ `
    {
      "testValue": "Hello",
      "otherValue": 123,
      "testTemplate": "Something" 
    }
    `;
    let rndFile = path.resolve(
      os.tmpdir(),
      `${(Math.random() + 1).toString(36).substring(7)}-${(Math.random() + 1).toString(36).substring(7)}.json`
    );
    await writeFile(rndFile, json);
    let result = await mergeJson(rndFile)({});
    expect(result).toEqual({
      testTemplate: 'Something',
      testValue: 'Hello',
      otherValue: 123,
    });
  });
});
