import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'

import home from './home';

const reducers = {
  home,
  form: formReducer
};

export default combineReducers(reducers);
