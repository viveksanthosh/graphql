import express from 'express';
import React from 'react';
import { schema } from "./GraphSchema";
import { renderToString } from 'react-dom/server';
import * as graphqlHTTP from 'express-graphql'

import App from './App';
let assets;
const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
};
syncLoadAssets();

const server = express()
  .disable('x-powered-by')
  .use('/graph', graphqlHTTP({
    schema,
    graphiql: true
  }))
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    const markup = renderToString(
        <App />
    );
    res.send(
      `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Razzle TypeScript</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
    );
  });

export default server;
