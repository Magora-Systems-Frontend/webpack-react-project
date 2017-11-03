import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import {ConnectedRouter} from 'react-router-redux'

import {configureStore, history} from './store'
import Root from './pages/root'

const initialState = window.__INITIAL_STATE__ ? JSON.parse(window.__INITIAL_STATE__) : {}
const store = configureStore(initialState, true)

export class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <BrowserRouter>
            <Root {...this.props} />
          </BrowserRouter>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export const init = (App) => render(<App/>, document.getElementById('content'))
