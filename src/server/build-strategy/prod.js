import useragent from 'express-useragent';
import logger from 'morgan';
import express from 'express';
import pug from 'pug';

export default function (app, {NODE_ENV, API_URL, WEB_PORT, PUBLIC_PATH, TEMPLATE_PATH, STATIC_PATH}) {
  app.set('port', WEB_PORT);
  app.disable('x-powered-by');
  app.set('view engine', 'pug');
  app.engine('pug', pug.__express);
  app.set('views', TEMPLATE_PATH);

  app.use(useragent.express());
  app.use(logger('tiny'));

  app.use(express.static(PUBLIC_PATH));
  app.use('/static', express.static(STATIC_PATH));

  return app;
}
