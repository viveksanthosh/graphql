import React, { useState } from 'react';

import './Home.css';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Show = ({ dog }) => <Query query={
  gql`
      query Dog($dog: Int!) {
         dog(id: $dog){
           name
         }
       }
       `
}
  variables={{ dog }}
>{(dogsGraph) =>
  <div>
    {dogsGraph.data.dog && <div>{dogsGraph.data.dog.name}</div>}
  </div>
  }
</Query>


const Home = () => {
  const [dogId, setDogId] = useState(1)

  return <div>
    <input value={dogId} onChange={(e) => setDogId(Number(e.target.value))} />
    <br />
    <Show dog={dogId} />
  </div>
}



export default Home;
