import { fromJson } from '../lib/from-json';
import { writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';

describe('should load object from json into context', () => {
  it('should load from file', async () => {
    const json = /* json */ `
    {
      "testValue": "Hello",
      "otherValue": 123
    }
    `;
    let rndFile = path.resolve(
      os.tmpdir(),
      `${(Math.random() + 1).toString(36).substring(7)}-${(Math.random() + 1).toString(36).substring(7)}.json`
    );
    await writeFile(rndFile, json);
    let result = await fromJson('loadJson', rndFile)({}, { tmpl: {}, values: {} });
    expect(result).toEqual({
      tmpl: {},
      values: {
        loadJson: {
          testValue: 'Hello',
          otherValue: 123,
        },
      },
    });
  });
});
