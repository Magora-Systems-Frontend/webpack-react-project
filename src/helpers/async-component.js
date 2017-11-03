import {WaitingIndicator} from 'components';
import React from 'react';

function asyncComponent(getComponent, name) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = {
      isLoaded: false
    };

    componentWillMount() {
      if (!AsyncComponent.Component) {
        setTimeout(() => {
          getComponent().then((Component) => {
            AsyncComponent.Component = name ? Component[name] : Component.default;
            this.setState({isLoaded: true});
          })
        }, 1000);
      }
    }

    render() {
      const {isLoaded} = this.state;
      const {Component} = AsyncComponent;

      if (isLoaded) {
        return <Component {...this.props} />
      }
      return <WaitingIndicator />
    }
  }
}

export {asyncComponent};
