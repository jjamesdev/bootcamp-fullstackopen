import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ course }) => {
  console.log(course);
  let value = course.parts.map(part => part.exercises).reduce((a, b) => a + b);

  return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total value={value} />
    </div>
  )
}

export default Course;
