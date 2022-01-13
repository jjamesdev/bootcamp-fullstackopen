import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countrie = ({ countrie }) => {

  const [climate, setClimate] = useState({ current: {  weather_icons: [] } });
  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: countrie.capital
    }
    axios
      .get('http://api.weatherstack.com/current', { params })
      .then(response => {
        console.log(response);
        setClimate(response.data);
      })
  }, [countrie.capital])

  return (
    <>
    <h2>{ countrie.name }</h2>
    <p>capital: { countrie.capital }</p>
    <p>population: { countrie.population }</p>
    <h3>languages</h3>
    <ul>
    { countrie.languages.map(language => <li key={ language.name }>{ language.name }</li>)  }
    </ul>
    <img src={ countrie.flags.png } alt="flag" />

    <h3>Weather in { countrie.capital }</h3>
    <p>temperature: { climate.current.temperature } Celcius</p>
    <img src={ climate.current.weather_icons[0] } alt="" />
    <p>wind: { climate.current.wind_speed } mph directions { climate.current.wind_dir }</p>
    
    
    </>
  )
}

export default Countrie;
