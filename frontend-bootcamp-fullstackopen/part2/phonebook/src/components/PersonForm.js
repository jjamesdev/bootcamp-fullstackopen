import React from 'react';

const PersonForm = ({ submit, valueName, valueNumber, handleNameChange, handleNumberChange }) => {
  return (
    <>
      <form onSubmit={ submit }>
        <div>
          name: <input value={ valueName } onChange={ handleNameChange } />
        </div>
        {/*<div>{ newName }</div>*/}
        <div>
          number: <input value={ valueNumber } onChange={ handleNumberChange }/>
        </div>
        {/*<div>{ newNumber }</div>*/}
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm;
