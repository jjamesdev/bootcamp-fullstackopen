import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
//
//

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={ handleClick }>{ text }</button>
    </>
  )
}

const Staticstics = ({good, neutral, bad, all}) => {
  if (all() === 0) {
    return (
      <>
        <b>No feedback given</b>      
      </>
    )
  } else {
    return (
      <div className="infox">
        <table>
          <tbody>
            <Staticstic text="good" value={ good } />
            <Staticstic text="neutral" value={ neutral } />
            <Staticstic text="bad" value={ bad } />
            <Staticstic text="all" value={ all() } />
            <Staticstic text="average" value={  (good - bad) / all()  } />
            <Staticstic text="positive" value={  (good * 100) / all() } />
          </tbody>
        </table>
        {/* <Staticstic text="good" value={ good }></Staticstic>&nbsp;
        <Staticstic text="neutral" value={ neutral }></Staticstic>&nbsp;
        <Staticstic text="bad" value={ bad }></Staticstic>&nbsp;
        <Staticstic text="all" value={ all() }></Staticstic>&nbsp;
        <Staticstic text="average" value={  (good - bad) / all()  }></Staticstic>&nbsp;
        <Staticstic text="positive" value={  (good * 100) / all() }></Staticstic>&nbsp; */ }
      </div>
    )
  }
}

const Staticstic = ({ text, value, row = true }) => {
  if (! row) {
    return (
      <>
        { text } { value }
      </>
    )
  } else {
    return (
      <tr>
        <th>{ text }</th>
        <td>{ value }</td>
      </tr>
    )
  }
}

const Element = ({ text, value }) => {
  return (
    <>
      <th>{ text }</th>
      <td>{ value }</td>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = () => {
    return good + neutral + bad;
  }

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h2>Staticstics</h2>
      <Staticstics good={ good } neutral={ neutral } bad={ bad } all={ all } />
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
