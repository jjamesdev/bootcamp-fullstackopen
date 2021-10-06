import React from 'react';

const Weather = ({ countrie, climate }) => {
  return (
    <>
    <h3>Weather in { countrie.capital }</h3>
    <p>temperature: { climate.current.temperature } Celcius</p>
    <img src={ climate.current.weather_icons[0] } alt="" />
    <p>wind: { climate.current.wind_speed } mph directions { climate.current.wind_dir }</p>
    </>
  )
}

export default Weather;
