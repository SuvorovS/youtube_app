import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { syncHistoryWithStore } from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import {STORE} from './store/store';
import App from './app';



ReactDOM.render(
        <Provider store={STORE}>
             <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}> 
                <App />
             </MuiThemeProvider> 
        </Provider>, 
  document.getElementById('root')
);