import React, { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  const toogleImportanceOf = (id) => {
    console.log(`importance of ${ id } needs to be toogled`);
    // const url = `http://localhost:3001/notes/${ id }`;
    const note = notes.find(n => n.id === id);
    const changeNote = { ...note, important: ! note.important };

    noteService
      .update(id, changeNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        // alert(
          // `the note ${ note.content } was already deleted from server`
        // )
        setErrorMessage(
          `the note '${ note.content }' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000)
        setNotes(notes.filter(n => n.id !== id));
      })
  }

  return (
    <div>
    <h1>Notes</h1>
    <Notification message={ errorMessage }/>
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
    <Footer />
    </div>
  )
}

export default App;
