import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { MasterPage } from 'coi';
import './assets/fonts/fonts.css';

import Home from './pages/index';
import Lista from './pages/lista';

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
    <MasterPage active={1}>
      <Switch>
        <Redirect exact from="/" to="home" />
        <Route path="/home" component={Home} />
        <Route path="/lista" component={Lista} />
      </Switch>
    </MasterPage>
  </div>
);

export default app;
