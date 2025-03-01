import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { renderer } from './render/renderer.js';
import { resolveRoute } from './render/router.js';

const app = new Hono();

app.use('/*', serveStatic({ root: './public' }));
app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }));

app.get('*', async (c) => {
  const url = c.req.path;
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
