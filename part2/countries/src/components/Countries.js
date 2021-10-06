import React, { useState} from 'react';
import Countrie from './Countrie';

const Countries = ({ list }) => {

  const [ countrie, setCountrie ] = useState({});
  


  if (list.length < 10 && list.length > 2) {
    return (
      <>
      <ul>
      {
        list.map(element => (
          <li key={ element.name }>
          { element.name }
          &nbsp;
          <button onClick={ () => setCountrie(element) }>show</button>
          </li>
        ))
      }
      </ul>
      {
        countrie.hasOwnProperty('name') && <Countrie countrie={ countrie } />
      }
      </>
    )
  } else {
    return <></>
  }
}

export default Countries;
