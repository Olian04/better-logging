import { FileSystem } from './interfaces/fileSystem';
import { removeColors } from './util/removeColor';

export const writeLogToFile = (fs: FileSystem, path: string, formattedMsg: string, remainingArgs: unknown[]) => {
  const colorlessMsg = removeColors(formattedMsg);
  const joinedArgs = remainingArgs.map((arg: unknown) => {
    try {
      return String(arg);
    } catch {
      return `[Error: String Casting Failed]`;
    }
  }).join(' ');
  const completeLine = `${colorlessMsg} ${joinedArgs}\n`;

  fs.appendFile(path, completeLine, (err) =>{
    if (!err) { return; }
    throw err;
  });
}