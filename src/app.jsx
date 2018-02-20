import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import page from './pages/index';
import PageLista from './pages/pageLista';

require('./components/styles/global-styles');

const app = () => (
  <div>
    <Helmet titleTemplate="Código de Barras">
      <title>Código de Barras</title>
      <meta name="description" content="descrição do site" />
      <meta
        name="viewport"
        content={
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, height=device-height'
        }
      />
      <link rel="canonical" href="http://www.homepage.com/" />
    </Helmet>
    <Switch>
      <Route path="/" component={page} exact />
      <Route path="/lista-conta" component={PageLista} exact />
    </Switch>
  </div>
);

export default app;
