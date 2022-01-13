const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${ password }@cluster0.dmxbx.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'fullstack note',
  date: new Date(),
  important: true
})

// note.save().then(result => {
  // console.log('saved note')
  // mongoose.connection.close()
// })

Note.find({}).then(result => {
  console.clear()
  console.log('>>>>>>>> FIND')
  console.log(Array.isArray(result) ? result.length : '')
  // console.log(result)
  result.forEach(note => {
    // console.log('note: ', note);
    console.log(note.toJSON());
  })
  mongoose.connection.close()
})
