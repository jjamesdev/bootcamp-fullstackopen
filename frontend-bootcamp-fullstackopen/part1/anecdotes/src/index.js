import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

const App = (props) => {
  const [selected, setSelected] = useState(0);
  let arrayVotes = new Array(props.anecdotes.length).fill(0);
  const [votes, setVotes] = useState(arrayVotes);


  const getRandomNumber = () => Math.floor(Math.random() * props.anecdotes.length);
  const incrementVote = () => {
    let copyArray = [...votes];
    copyArray[selected] += 1;
    setVotes(copyArray);
  }

  const getMaxOfArray = () => {
    let value = Math.max(...votes);
    return votes.findIndex(element => element === value); 
  }

  return (
    <>
      <h2>Anecdote of the day</h2>
      { props.anecdotes[selected] }
      <br />
      <br />
      has { votes[selected] } votes
      <br />
      <button onClick={ () => incrementVote() }>vote</button>
      <button onClick={ () => setSelected(getRandomNumber()) }>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      { props.anecdotes[getMaxOfArray()] }
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render( <App  anecdotes={ anecdotes } />, document.getElementById('root'));
