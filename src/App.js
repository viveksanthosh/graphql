import React from 'react';
import Home from './Home';
import * as fetch from 'node-fetch';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';

import './App.css';


const client = new ApolloClient({
   uri: 'http://localhost:3000/graph',
   fetch: fetch
});

const App = () => (
   <ApolloProvider client={client}>
      <Home />
   </ApolloProvider>
);


export default App;