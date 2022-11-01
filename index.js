// require('dotenv').config()
// const express = require('express')
// const app = express()
// const cors = require('cors')

// // DO NOT SAVE YOUR PASSWORD TO GITHUB!!

// const Note = require('./models/note.js')

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

// app.use(express.json())

// app.use(requestLogger)

// app.use(cors())

// app.use(express.static('build'))

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World!</h1>')
// })

// app.post('/api/notes', (request, response) => {
//   const body = request.body

//   if (!body.content) {
//     return response.status(400).json({
//       error: 'content missing',
//     })
//   }

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//   })

//   note.save().then((savedNote) => {
//     response.json(savedNote)
//   })

//   response.json(note)
// })

// app.get('/api/notes', (req, res) => {
//   Note.find({}).then((notes) => {
//     console.log(notes)
//     res.json(notes)
//   })
// })

// app.get('/api/notes/:id', (request, response, next) => {
//   const id = request.params.id
//   // const note = notes.find((note) => note.id === id)
//   Note.findById(id)
//     .then((note) => {
//       if (note) return response.json(note)
//       return response.status(404).end()
//     })
//     .catch((e) => {
//       next(e)
//     })
// })

// app.delete('/api/notes/:id', (request, response, next) => {
//   const id = request.params.id
//   Note.findByIdAndRemove(id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch((error) => next(error))
// })

// app.put('/api/notes/:id', (request, response, next) => {
//   const id = request.params.id
//   const { content, important } = request.body
//   const note = {
//     content,
//     important,
//   }

//   Note.findByIdAndUpdate(id, note, { new: true })
//     .then((result) => {
//       response.status(200).json(result)
//     })
//     .catch((err) => next(err))
// })

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)

// const errorHandler = (error, req, res, next) => {
//   if (error.name === 'CastError') {
//     return res.status(400).send({ error: 'malformatted id' })
//   }
//   next(error)
// }

// app.use(errorHandler)

// const PORT = process.env.PORT

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

const app = require("./app") // the actual Express application
const http = require("http")
const config = require("./utils/config")
const logger = require("./utils/logger")

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
