import logger from 'morgan';
import webpack from 'webpack';
import useragent from 'express-useragent';
import express from 'express';
import path from 'path';
import pug from 'pug';

export default function(app, {NODE_ENV, API_URL, WEB_PORT, PUBLIC_PATH}) {
  const webpackConfig = require('../../../webpack/webpack.config-dev.babel').config;
  const compiler = webpack(webpackConfig);
  const devMiddlewareOptions = {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    noInfo: false,
    reload : true,
    index: 'index.html',
    stats: {
      colors: true
    },
    reporter: null,
    serverSideRender: true
  };
  const hotMiddlewareOptions = 	{
    log: console.log,
    path: '/__webpack_hmr'
  };

  app.set('port', WEB_PORT);
  app.disable('x-powered-by');
  app.set('view engine', 'pug');
  app.engine('pug', pug.__express);
  app.set('views', path.join(__dirname, '../templates'));

  app.use(require('webpack-dev-middleware')(compiler, devMiddlewareOptions));
  app.use(require('webpack-hot-middleware')(compiler, hotMiddlewareOptions));

  app.use(useragent.express());
  app.use(logger('dev'));

  app.use(express.static(path.join(__dirname, PUBLIC_PATH)));
  app.use('/static', express.static(path.join(__dirname, '../..', 'static')));

  return app;
}

