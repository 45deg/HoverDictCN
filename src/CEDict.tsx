import React from 'react';
import Dexie from 'dexie';

interface Entry {
  word: string;
  pinyin: string;
  description: string;
}

class CEDict extends Dexie {
  public entries: Dexie.Table<Entry, string>;

  public constructor() {
    super("CEDict");
    this.version(1).stores({
      entries: '++id, *word'
    });
    this.entries = this.table('entries');
  }

  public async importDictionary(text: string, onProgress?: (progress: number) => void) {
    await this.transaction('rw', this.entries, async () => {
      let lines = text.split('\n');
      let re = /(.+)\s(.+)\s\[(.+)\]\s\/(.+)\/\s*$/;
      for (let n = 0; n < lines.length; n += 10000) {
        let buffers = [];
        let i;
        for (i = 0; i < Math.min(10000, lines.length - n); i++) {
          let line = lines[n + i];
          if (line[0] === '#') continue; // comment
          let m = line.match(re);
          if (m === null) throw 'Invalid line ' + line;
          let entry = {
            word: m[1],
            pinyin: m[3],
            description: m[4].split('/').join('\n')
          }
          buffers.push(entry);
          if (m[1] !== m[2]) {
            buffers.push({
              ...entry,
              word: m[2]
            });
          }
        }
        console.log('aaa')
        await this.entries.bulkAdd(buffers);
        console.log('aaa')
        if (onProgress) {
          onProgress(100 * (n + i) / lines.length);
        }
      }
    });
  }

  static Context = React.createContext(new CEDict());
  static readonly DICTIONARY_PATH = process.env.PUBLIC_URL + '/cedict_ts.u8.txt';
}

export default CEDict;