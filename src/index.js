import React from 'react'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './App.css'
import 'animate.css'
import 'antd/dist/antd.css';
import './assets/scss/base.scss'
import '@fortawesome/fontawesome-pro/css/all.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'quill/dist/quill.snow.css'
import {withAuthUser} from './context/user-context'

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloLink, concat } from '@apollo/client'

import { hydrate, render } from "react-dom";

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/graphql'
    : 'https://backend.lavishweb.com/graphql',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || undefined,
    }
  });

  return forward(operation);
})

export const client = new ApolloClient({
  cache,
  link: concat(authMiddleware, httpLink),
});

const app = (
  <React.StrictMode>
    <ApolloProvider client={client}>
      { withAuthUser(<App />) }
    </ApolloProvider>
  </React.StrictMode>
)

let root = document.getElementById('root')

if (root?.hasChildNodes()) {
  hydrate(app, root);
} else {
  render(app, root);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
