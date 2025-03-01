import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

export const renderer = async (route) => {
  if (!route) {
    throw new TypeError(
      'The "path" argument must be of type string. Received null'
    );
  }

  let PageComponent;
  let metaTags = '';
  const filePath = pathToFileURL(route).href;

  if (fs.existsSync(route)) {
    console.log('Importing:', filePath);
    const { default: Component, meta } = await import(filePath);
    console.log('Imported Component:', Component);
    console.log('Meta Function:', meta);

  if (!Component) {
    throw new Error(`Component not found in ${filePath}`);
  }
  
    PageComponent = Component;

    if (typeof meta === 'function') {
      const metaData = meta();
      metaTags = metaData
        .map((metaItem) => {
          if (metaItem.title) {
            return `<title>${metaItem.title}</title>`;
          }
          const attrs = Object.entries(metaItem)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');
          return `<meta ${attrs}>`;
        })
        .join('\n');
    }
  } else {
    return '<h1>404 - Not found</h1>';
  }

  const appHtml = renderToString(React.createElement(PageComponent));

  return `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${metaTags}
        <script src='https://unpkg.com/@tailwindcss/browser@4'></script>
      </head>
      <body>
        <div id="__suii">${appHtml}</div>
      </body>
    </html>
  `;
};
