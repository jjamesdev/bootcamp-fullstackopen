const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${ password }@cluster0.dmxbx.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'other',
  number: '2020202020202',
  id: 2
})

// person.save().then(result => {
  // console.log('saved person')
  // mongoose.connection.close()
// })

Person.find({}).then(result => {
  console.clear()
  console.log('>>>>>>>> FIND')
  console.log(Array.isArray(result) ? result.length : '')
  // console.log(result)
  result.forEach(person => {
    // console.log('note: ', note);
    console.log(person.toJSON());
  })
  mongoose.connection.close()
})
