const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]

//const url = `mongodb+srv://notes-app-full:${password}@cluster1.lvvbt.mongodb.net/?retryWrites=true&w=majority`

const url = `mongodb+srv://gregorian:${password}@cluster0.c5l433d.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
    Note.find({}).then((result) => {
      result.forEach((note) => {
        console.log(note)
      })
      mongoose.connection.close()
    })
  })
  .then(() => {
    console.log('operation completed')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
