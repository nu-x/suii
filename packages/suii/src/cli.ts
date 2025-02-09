import { startServer } from './server.js';

const args = process.argv.slice(2);

if (args[0] === 'dev') {
  startServer();
} else {
  console.error('Unknown command');
}