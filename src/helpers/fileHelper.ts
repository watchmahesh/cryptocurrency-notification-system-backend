import * as fs from 'fs';
import * as path from 'path';

export const createFileInPublic = (fileName: string, content: string): void => {
    const publicDirectory = path.join(__dirname, '..','..', 'public','notification-log');
  if (!fs.existsSync(publicDirectory)) {
    fs.mkdirSync(publicDirectory);
  }

  const filePath = path.join(publicDirectory, fileName);

  fs.appendFileSync(filePath, content, 'utf8');
};
