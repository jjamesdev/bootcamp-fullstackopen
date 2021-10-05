import React from 'react';
import Part from './Part';

const Content = ({ parts  }) => {
  return (
    <>
    {parts.map((part, index) => {
      return <Part key={index} name={part.name} exercise={part.exercises} />

    })}
    </>
  )
}

export default Content;
