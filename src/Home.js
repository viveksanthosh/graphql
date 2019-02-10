import React, { useState } from 'react';

import './Home.css';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ShowDog = ({ dog }) => <Query query={
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

const nameRef = React.createRef();
const idRef = React.createRef();
const owneridRef = React.createRef();

const AddDog = () => <Mutation mutation={gql`
mutation AddDog($name: String!, $id: Int!, $ownerid: Int!){
  addDog(name: $name, id: $id, ownerid: $ownerid){
    name
  }
}
`}>{(AddDog) =>
    <div>
      <h2>Add Dog</h2>
      <input ref={nameRef} placeholder='name' />
      <input ref={idRef} placeholder='id' />
      <input ref={owneridRef} placeholder='ownerid' />
      <button onClick={() => {
        AddDog({ variables: { name: nameRef.current.value, id: idRef.current.value*1, ownerid: owneridRef.current.value*1 } })
      }}>Submit</button>
    </div>
  }
</Mutation>


const Main = () => {
  const [dogId, setDogId] = useState(1)

  return <div>
    <input value={dogId} onChange={(e) => setDogId(Number(e.target.value))} />
    <br />
    <ShowDog dog={dogId} />

    <br />
    <AddDog />

  </div>
}



export default Main;
