console.clear()
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const person = require('./models/person')

morgan.token('body', function getBody(req) {
  return JSON.stringify(req.body)
})

// app.use(morgan(':method :url :response-time :body'))

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
  person.find({}).then((persons) => {
    response.json(persons)
  })
  // TODO: Falta agregar catch por posible problema al crear un registro
})

// app.get('/info', (req, res) => {
// res.send(
// `Phonebook has info for ${persons.length} people <br /> ${new Date()}`
// )
// })

app.get('/api/persons/:id', (req, res, next) => {
  person
    .findById(req.params.id)
    .then((result) => {
      if (result) {
        res.json(result)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  let uperson = {
    name: body.name,
    number: body.number,
  }

  person
    .findByIdAndUpdate(req.params.id, uperson, {
      new: true,
      runValidators: true,
    })
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  person
    .findByIdAndRemove(req.params.id)
    .then((result) => {
      console.log(result)
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing',
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing',
    })
  }

  // let element = persons.find(person => person.name === body.name);
  // if (element) {
  // return res.status(400).json({
  // error: "name must be unique"
  // })
  // }

  const newPerson = new person({
    name: body.name,
    number: body.number,
  })

  newPerson
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

const unknownEndponint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndponint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
