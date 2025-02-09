import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const PAGES_DIR = path.join(process.cwd(), 'src/pages');
export const resolveRoute = (url) => {
    const filePath = path.join(PAGES_DIR, url === '/' ? 'index.tsx' : `${url}.tsx`);
    if (fs.existsSync(filePath) && filePath.endsWith('.tsx')) {
        console.log(`Return Deta: ${pathToFileURL(filePath).href}`);
        return pathToFileURL(filePath).href;
    }
};
