import express from 'express';
import prodStrategy from './build-strategy/prod';
import devStrategy from './build-strategy/dev';
import ssrController from './controllers/ssr';

function appCreator({NODE_ENV, API_URL, WEB_PORT, PUBLIC_PATH, TEMPLATE_PATH, STATIC_PATH}) {
  const app = express();

  if (NODE_ENV === 'production') {
    prodStrategy(app, {NODE_ENV, API_URL, WEB_PORT, PUBLIC_PATH, TEMPLATE_PATH, STATIC_PATH});
  } else {
    devStrategy(app, {NODE_ENV, API_URL, WEB_PORT, PUBLIC_PATH});
  }

  //server + browser rendering
  app.get('*', ssrController);
  //browser rendering only
  // app.get('/', function(req, res) {
  //   const html = {
  //     state: `window.__INITIAL_STATE__='{}'`
  //   };
  //
  //   res.render('desktop', html);
  // });
  return app;
}

export default appCreator;
export {appCreator};

//need help? see http://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/
