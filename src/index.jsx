import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
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
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </Provider>
    </Fragment>
  </ThemeProvider>
);

const root = document.getElementById('root');
render(client(), root);
