import fs from 'fs';

export interface FileSystem {
  appendFile: typeof fs.appendFile;
  mkdirSync: typeof fs.mkdirSync;
}