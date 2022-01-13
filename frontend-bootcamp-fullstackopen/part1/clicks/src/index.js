import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
//

const History = ({ allClicks }) => {
  if (! allClicks.length) {
    return (
      <>la aplicación se usa presionando los botones</>
    )
  }

  return (
    <>
      history: { allClicks.join(' ') }
    </>
  )
}

const Button = ({ handleClick, text}) => {
  return (
    <>
      <button onClick={ handleClick }>{ text }</button>
    </>
  )
}

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleClickLeft = () => {
    // debugger;
    setAll(allClicks.concat('L'));
    setLeft(left + 1);
  }

  const handleClickRight = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1);
  }

  return (
    <>
      { left }&nbsp;
      <Button handleClick={ handleClickLeft } text='left'></Button>
      <Button handleClick={ handleClickRight } text='right'></Button>
      &nbsp;{ right }
      <br /><br />
      <History allClicks={ allClicks }></History>
    </>
  )
}

ReactDOM.render( <App />, document.getElementById('root'));

