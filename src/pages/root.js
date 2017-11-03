import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from 'pages/home';
import NotFound from 'pages/not-found';
import {asyncComponent} from 'helpers/async-component';

export default class Root extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/home' component={Home} />
        <Route path='/sign-in' component={asyncComponent(() => import(/* webpackChunkName: "sign-in" */ 'pages/sign-in'))} />
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}
