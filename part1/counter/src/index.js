import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = ({ counter }) => <div>{ counter }</div>;

const Button = ({ handleClick, texto }) => {
  return (
    <>
      <button onClick={ handleClick }>{ texto }</button>
    </>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const setToZero = () => setCounter(0);
  const decrementByOne = () => setCounter(counter - 1);

  return(
    <div>
      <Display counter={counter}></Display>
      <Button handleClick={ increaseByOne } texto='incrementar'></Button>
      <Button handleClick={ setToZero } texto='cero'></Button>
      <Button handleClick={ decrementByOne } texto='decrementar'></Button>
      { /* <button onClick={ increaseByOne }>plus</button>
      <button onClick={ setToZero }>zero</button>
      <button onClick={ () => setCounter(counter -1) }>resta</button>
      */}
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
