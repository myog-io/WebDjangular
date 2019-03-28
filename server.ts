import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { Compiler, enableProdMode, NgModuleFactoryLoader, ValueProvider } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { MODULE_MAP, ModuleMapNgFactoryLoader, provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';
import 'localstorage-polyfill';
import { REQUEST, RESPONSE } from "@nguniversal/express-engine/tokens";
import { renderModuleFactory } from "@angular/platform-server";

require('dotenv').config();
var path = require('path');
var cors = require('cors');
var proxy = require('express-http-proxy');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
const api_url = process.env.api_link || 'http://127.0.0.1:8000';
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist', 'apps');
const clientAppServer = (file = '') => join(DIST_FOLDER, 'client', file);
const adminAppServer = (file = '') => join(DIST_FOLDER, 'admin', file);

// Fixing window is not defined https://github.com/angular/universal/issues/830
const domino = require('domino');
const fs = require('fs');
const template = fs.readFileSync(clientAppServer('index.html')).toString();
const adminTemplate = fs.readFileSync(adminAppServer('index.html')).toString();
const win = domino.createWindow(template);
const navigator = win
global['window'] = win;
global['document'] = win.document;
// Fixing ReferenceError: Event is not defined 
global['Event'] = win.Event;
global['Event']['prototype'] = win.Event.prototype;
// Fixing Localstorage error
global['localStorage'] = localStorage;


// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Our Universal express-engine For the APP(found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', (_, options, callback) => {
  let serverUrl = options.req.protocol + '://' + options.req.get('host');
  let current_template = template
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: current_template,
    url: options.req.url,
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP),
      {
        provide: 'APP_BASE_HREF',
        useValue: serverUrl
      },
      {
        provide: NgModuleFactoryLoader,
        useClass: ModuleMapNgFactoryLoader,
        deps: [
          Compiler,
          MODULE_MAP
        ],
      },
      <ValueProvider>{
        provide: REQUEST,
        useValue: options.req
      },
      <ValueProvider>{
        provide: RESPONSE,
        useValue: options.req.res,
      },
    ]
  }).then(html => {
    callback(null, html);
  });
});
var admin = express();

app.set('view engine', 'html');
app.set('views', clientAppServer());
// Adding Serving Files static, we don't need any other way
admin.set('view engine', 'html');
admin.set('views', adminAppServer());
admin.get('**', express.static(adminAppServer()));
admin.get('*', (req, res) => {
  res.sendFile(adminAppServer('index.html'))
});

// Example Express Rest API endpoint, Proxying to Django


// TODO: Make URL Dynamic!
app.use('/api/**', proxy(api_url, {
  proxyReqPathResolver: function (req) {
    return req.originalUrl;
  }
}));
app.use('/sitemap.xml', proxy(api_url, {
  proxyReqPathResolver: function (req) {
    return req.originalUrl;
  }
}));
app.use('/sitemap-*.xml', proxy(api_url, {
  proxyReqPathResolver: function (req) {
    return req.originalUrl;
  }
}));

app.use('/static', express.static('static'))
app.use('/files', express.static('files'))

app.use('/admin', admin)
/* CLIENT PART */
app.get('*.*', express.static(clientAppServer()));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(clientAppServer('index.html'), { req });
});
// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
