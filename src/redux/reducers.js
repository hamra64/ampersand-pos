// @flow

import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';
import Layout from './layout/reducers';
import Pos from './pos/reducers';

export default combineReducers({
    Auth,
    AppMenu,
    Layout,
    Pos
});
