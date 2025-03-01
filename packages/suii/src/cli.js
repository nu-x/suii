import { promisify } from 'util';
import { exec } from 'child_process';
import chokidar from 'chokidar';
import { startServer } from './server.js';

const args = process.argv.slice(2);
const execPromise = promisify(exec);

const runEsbuild = async () => {
  try {
    await execPromise(
      'npx esbuild "src/**/*.jsx" --outdir=dist --format=esm --target=esnext --jsx=automatic --platform=node'
    );
  } catch (error) {
    console.error('[watch] Build failed:', error);
  }
};

if (args[0] === 'dev') {
  await runEsbuild();
  startServer();

  const watcher = chokidar.watch('./', {
    persistent: true,
    ignoreInitial: true,
    ignored: ['node_modules', 'dist', '.git'],
  });

  watcher.on('change', async (filePath) => {
    await runEsbuild();
  });
} else {
  console.error('Unknown command');
}
