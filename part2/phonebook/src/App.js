import React, { useState, useEffect } from 'react';
import './App.css';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import personService from './services/persons';


const App = () => {
  const [ persons, setPersons ] = useState([
    // { name: 'Arto Hellas', number: '040-123456' },
    // { name: 'Ada Lovelace', number: '39-44-5323523' },
    // { name: 'Dan Abramov', number: '12-43-234345' },
    // { name: 'Mary Poppendieck', number: '39-23-6423122' }   // { name: 'Arto Hellas' }
  ]) 
  const [ filterPersons, setFilterPersons ] = useState([]);
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('');
  const [ newFilter, setNewFilter ] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
        setFilterPersons(initialPersons);
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    let value = persons.find(person => person.name === newName);
    if (value && window.confirm(`${ value.name  } is already added to phonebook, replace the old number with a new one?`)) {
      let personObject = {...value, number: newNumber};
      personService
        .update(value.id, personObject)
        .then(response => {
          // console.log(response);
          setFilterPersons(filterPersons.map(person => person.id !== value.id ? person : response));
          setNewName('');
          setNewNumber('');
        })

      return;
    }

    let personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(response => {
        setFilterPersons(filterPersons.concat(response));
        setNewName('');
        setNewNumber('');
      })
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    let filter = persons.filter(
      person => person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    // setPersons(filter);
    setFilterPersons(filter);
  }

  const handleDeletePerson = (person) => {
    let { id } = person;
    if (window.confirm(`Delete ${ person.name }`)) {
      personService
        .destroy(person.id)
        .then(response => {
          // console.log(response);
          setFilterPersons(filterPersons.filter(person => person.id !== id ))
        })
    }
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
      <Persons persons={ filterPersons } handleDelete={ handleDeletePerson }/>
    </div>
  )
}

export default App;
