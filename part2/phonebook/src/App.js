import React, { useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }   // { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('');
  const [ newFilter, setNewFilter ] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    let value = persons.find(person => person.name === newName);
    if (value) {
      alert(`${ newName } is already added to phonebook`);
      setNewName('');
      return;
    }

    let personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    let filter = persons.filter(
      person => person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setPersons(filter);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={ newFilter } handleChange={ handleFilterChange }/>
      <h3>add a new</h3>
      <PersonForm 
        submit={ addPerson }
        valueName={ newName } handleNameChange={handleNameChange}
        valueNumber={ newNumber } handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={ persons }/>
    </div>
  )
}

export default App;
