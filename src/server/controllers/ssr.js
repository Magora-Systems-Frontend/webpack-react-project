import React from 'react';
import {renderToString} from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import {Provider} from 'react-redux';

import Root from 'pages/root';
import {configureStore} from 'store';

const cachedStore = configureStore();

export default function (req, res) {
  const branch = []; //matchRoutes(routes, req.url);
  const promises = branch.map(({route}) => {
    let fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(cachedStore) : Promise.resolve(null)
  });
  return Promise.all(promises).then((data) => {
    let context = {};
    const content = renderToString(
      <Provider store={cachedStore}>
        <StaticRouter location={req.url} context={context}>
          <Root />
        </StaticRouter>
      </Provider>
    );
    if (context.status === 404) {
      res.status(404);
    }

    if (context.status === 302) {
      return res.redirect(302, context.url);
    }

    const html = {
      state: `window.__INITIAL_STATE__='${JSON.stringify(cachedStore.getState())}'`,
      markup: content
    };

    if (req.useragent.isMobile)
      {res.render('mobile', html);}
    else
      {res.render('desktop', html);}
  });
}
