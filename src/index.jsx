import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { configureStore as store } from '../config/store/configure';
import { MinhaOi } from './config/themes/MinhaOi';
import App from './app';

import { basename } from '../config/env.config';

const client = () => (
  <ThemeProvider theme={MinhaOi}>
    <Fragment>
      <Provider store={store()}>
        <HashRouter basename={basename}>
          <App />
        </HashRouter>
      </Provider>
    </Fragment>
  </ThemeProvider>
);

const root = document.getElementById('root');
render(client(), root);
