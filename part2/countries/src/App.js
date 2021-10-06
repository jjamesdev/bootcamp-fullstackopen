import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';
import axios from 'axios';
import Countries from './components/Countries';
import Countrie from './components/Countrie';

const App = () => {

  const [ countrie, setCountrie ] = useState('');
  const [ countries, setCountries ] = useState([]);
  const [ newFilter, setNewFilter ] = useState([]);

  useEffect(() => {
    // console.log('effect >>>>')
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        // console.log(response);
        setCountries(response.data);
      })
  }, [])

  const handleCountrieChange = (event) => {
    if (event.target.value === '') {
      setNewFilter([]);
      setCountrie('');
    } else {
      setCountrie(event.target.value);
      let filter = countries.filter(
        countrie => countrie.name.toLowerCase().includes(
          event.target.value.toLowerCase()
        )
      );
      // console.log(filter);
      setNewFilter(filter);
    }
  }

    // {process.env.REACT_APP_API_KEY}
  return (
    <div>
    find countries <input value={ countrie } onChange={ handleCountrieChange }/>
    { newFilter.length > 10 ? <p>Too many matches, specify another filter</p> : '' }
    <Countries list={ newFilter } />
    { newFilter.length === 1 && <Countrie countrie={ newFilter[0] }/> }
    </div>
  );
}

export default App;
