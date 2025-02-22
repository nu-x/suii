import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

export const renderer = async (route: string): Promise<string> => {
  let PageComponent: any;
  const filePath = pathToFileURL(route).href;

  if (fs.existsSync(route)) {
    const { default: Component } = await import(filePath);
    PageComponent = Component;
  } else if (route === null) {
    return '<h1>404 - Not found</h1>';
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
