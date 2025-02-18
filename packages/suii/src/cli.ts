import { promisify } from 'util';
import { exec } from 'child_process';
import { startServer } from './server.js';

const args = process.argv.slice(2);
const execPromise = promisify(exec);

if (args[0] === 'dev') {
  await execPromise('npx esbuild "src/**/*.tsx" --outdir=dist --format=esm --target=esnext --jsx=automatic --platform=node');
  startServer();
} else if(args[0] === 'build') {
} else {
  console.error('Unknown command');
}
