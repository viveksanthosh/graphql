import React from 'react';
import logo from './react.svg';

import './Home.css';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class Home extends React.Component {
  render() {
    return (
      <Query query={
        gql`
       {
         dogs{
           name
         }
       }
       `
      }>{(dogsGraph) =>
        <div></div>
        }
      </Query>
    );
  }
}

export default Home;
