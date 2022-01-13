import React, { useState, useEffect } from 'react';
import './App.css';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import personService from './services/persons';
import Notification from './components/Notification';


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
  const [ objMessage, setMessage ] = useState({ message: null, status: null });

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
    // console.log('FIND', value)
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
        .catch(error => {
          // console.log(error);
          // console.log(error.response.data.error)
          // setMessage({ message: `information of '${ value.name }' has already deleted from server`, status: 'error' });
          setMessage({ message: `${ error.response.data.error  }`, status: 'error' });
          setTimeout(() => {
            setMessage({ message: null, status: null });
          }, 5000)
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
        setMessage({ message: `Added ${ response.name }`, status: 'new'});
        setFilterPersons(filterPersons.concat(response));
        setNewName('');
        setNewNumber('');
        setTimeout(() => {
          setMessage({ message: null, status: null });
        }, 5000)
      }).catch(error => {
        // console.log(error.response.data.error)
        setMessage({ message: `${ error.response.data.error }`, status: 'error' });
        setTimeout(() => {
          setMessage({ message: null, status: null });
        }, 5000)
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
          console.log(response);
          setFilterPersons(filterPersons.filter(person => person.id !== id ))
        })
        .catch(error => {
          console.log(error);
          setMessage({ message: `information of '${ person.name }' has already deleted from server`, status: 'error' });
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification config={ objMessage } />
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
