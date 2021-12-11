import { fromText } from '../lib/from-text';
import { writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';

describe('should load text from text file into context', () => {
  it('should load from file', async () => {
    const text = 'Sometext from file blah blah';
    let rndFile = path.resolve(
      os.tmpdir(),
      `${(Math.random() + 1).toString(36).substring(7)}-${(Math.random() + 1).toString(36).substring(7)}.txt`
    );
    await writeFile(rndFile, text);
    let result = await fromText('loadText', rndFile)({ $tmpl: {} });
    expect(result).toEqual({
      $tmpl: {},
      loadText: 'Sometext from file blah blah',
    });
  });
});
