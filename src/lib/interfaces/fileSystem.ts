import fs from "fs";

export interface FileSystem {
  appendFileSync: typeof fs.appendFileSync;
  mkdirSync: typeof fs.mkdirSync;
}
