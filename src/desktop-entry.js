import {App, init} from './desktop'
if (global.IS_BROWSER) {
  require('./theme/index.styl');
  require('./desktop.styl');
}

init(App);

if (process.env.NODE_ENV === 'development' && module.hot) {
  let PrevApp = App;
  module.hot.accept('./desktop', () => {
    const NextApp = require('./desktop').App;
    try {
      init(NextApp);
      PrevApp = NextApp;
    } catch (e) {
      console.error(e);
      console.info('The application will be restored to its last stable state');
      init(PrevApp);
    }
  });
}
