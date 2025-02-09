import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
export const renderer = async (route) => {
    console.log(`Renderer Route: ${route}`);
    let PageComponent;
    if (!fs.existsSync(route)) {
        const notFoundPath = pathToFileURL('src/pages/404.tsx').href;
        if (fs.existsSync('src/pages/404.tsx')) {
            const { default: NotFoundComponent } = await import(notFoundPath);
            PageComponent = NotFoundComponent;
        }
        else {
            return '<h1>404 Not Found</h1>';
        }
    }
    else {
        const { default: Component } = await import(route);
        PageComponent = Component;
    }
    const appHtml = renderToString(React.createElement(PageComponent));
    return `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Suii App</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
      </body>
    </html>
  `;
};
