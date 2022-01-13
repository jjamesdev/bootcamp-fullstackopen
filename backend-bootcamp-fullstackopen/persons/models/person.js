const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

// console.log(url)

mongoose.connect(url)
  .then(result => {
    console.log("connected to MongoDB")
  })
  .catch(error => {
    console.log('error connecting MongoDB: ', error.message)
  })


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    minlength: 8
  },
  id: Number
})

// const opts = { runValidators: true };
// personSchema.findByIdAndUpdate({}, {}, opts, function(err) { });

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
