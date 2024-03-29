import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { ApolloProvider } from "@apollo/react-hooks";
import { Helmet } from 'react-helmet';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

import NavBar from './components/nav-bar'
import Table from './components/table';


const link = new HttpLink({
  uri: window.location.origin.includes('localhost') ? 'http://localhost:4000' : "https://tincbackend-production.up.railway.app/"
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  link
});


function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      
        <div className="App">
          <Helmet />
          <NavBar />
          <Table client={client} />
        </div>
      </BrowserRouter>
    </ApolloProvider>

  );
}

export default App;
