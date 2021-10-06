import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Note from './components/Note';


const App = () => {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    // console.log('effect');
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        // console.log('promise fulfilled');
        setNotes(response.data);
      })
  }, [])
  // console.log('render', notes.length, 'notes');

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        console.log(response);
        setNotes(notes.concat(response.data));
        setNewNote('');
      })
  }

  const handleNoteChange = (event) => {
    // console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const toogleImportanceOf = (id) => {
    console.log(`importance of ${ id } needs to be toogled`);
    const url = `http://localhost:3001/notes/${ id }`;
    const note = notes.find(n => n.id === id);
    const changeNote = { ...note, important: ! note.important };
    
    // console.log(note);
    axios.put(url, changeNote).then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response.data))
      })
  }

  return (
    <div>
    <h1>Notes</h1>
    <div>
    <button onClick={ () => setShowAll(! showAll) }>
    show { showAll ? 'important' : 'all'}
    </button>
    </div>
    <ul>
    {
      notesToShow.map(note => (
        <Note
          key={ note.id }
          note={ note }
          toogleImportance={ () => toogleImportanceOf(note.id) }
        />
      ))
    }
    </ul>
    <form onSubmit={ addNote }>
    <input value={ newNote } onChange={
      handleNoteChange
    }/>
    <button type="submit">save</button>
    </form>
    </div>
  )
}

export default App;
