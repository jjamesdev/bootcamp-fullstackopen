const express = require('express')
const app = express()
const morgan = require('morgan');

// app.use(morgan('tiny'))
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
// app.use(morgan(function (tokens, req, res) {
  // return [
    // tokens.method(req, res),
    // tokens.url(req, res),
    // tokens.status(req, res),
    // tokens.res(req, res, 'content-length'), '-',
    // tokens['response-time'](req, res), 'ms',
    // tokens['body']

  // ].join(' ')
// }))
//
morgan.token('body', function getBody (req) {
  return  JSON.stringify(req.body)
})
app.use(morgan(':method :url :response-time :body'))

app.use(express.json())

// function getBody(req, res, next) {
  // if (req.body) {
    // req.body = req.body;
    // next()
  // } 
  // next()
// }

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
]

app.get('/api/persons', (request, response) => {
  response.json(persons);
})

app.get('/info', (req, res) => {
  res.send(
    `Phonebook has info for ${ persons.length } people <br /> ${ new Date() }`
  )
})

app.get('/api/persons/:id', (req, res) => {
  let id = Number(req.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  let id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id)

  res.status(204).end();
})

app.post('/api/persons', (req, res) => {
  const id = Math.floor(Math.random() * 100000000);
  const body = req.body;

  if (! body.name) {
    return res.status(400).json({
      error: "name missing"
    })
  }

  if (! body.number) {
    return res.status(400).json({
      error: "number missing"
    })
  }
  
  let element = persons.find(person => person.name === body.name);  
  if (element) {
    return res.status(400).json({
      error: "name must be unique"
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: id
  }

  persons = persons.concat(person);

  res.send(person);
})

const unknownEndponint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndponint)


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`)
})

