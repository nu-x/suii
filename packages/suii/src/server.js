import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { renderer } from './render/renderer.js';
import { resolveRoute } from './render/router.js';

const app = new Hono();

app.use('/static/*', serveStatic({ root: './public' }));

app.get('*', async (c) => {
  const url = c.req.path;
  if (url === '/favicon.ico') {
    return c.text('', 204);
  }
  const route = resolveRoute(url);
  const html = await renderer(route);
  return c.html(html);
});

export const startServer = () => {
  serve({
    fetch: app.fetch,
    port: 3000,
  });
  console.log('Ready: http://localhost:3000');
};
