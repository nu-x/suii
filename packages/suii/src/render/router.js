import path from 'node:path';
import fs from 'node:fs';

const PAGES_DIR = path.join(process.cwd(), 'dist/pages');

export const resolveRoute = (url) => {
  const filePath = path.join(PAGES_DIR, url === '/' ? 'index.js' : `${url}.js`);

  if (fs.existsSync(filePath) && filePath.endsWith('.js')) {
    return filePath;
  }

  const notFoundPath = path.join(PAGES_DIR, '404.js');
  if (fs.existsSync(notFoundPath)) {
    return notFoundPath;
  }

  return null;
};
