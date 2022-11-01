require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { response } = require("express");

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const password = "letmein12";
const Note = require("./models/note.js");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(express.json());

app.use(requestLogger);

app.use(cors());

app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });

  response.json(note);
});

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    console.log(notes);
    res.json(notes);
  });
});

app.get("/api/notes/:id", (request, response, next) => {
  const id = request.params.id;
  // const note = notes.find((note) => note.id === id);
  Note.findById(id)
    .then((note) => {
      if (note) return response.json(note);
      return response.status(404).end();
    })
    .catch((e) => {
      next(e);
    });
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  Note.findByIdAndRemove(id)
    .then((res) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (request, response, next) => {
  const id = request.params.id;
  const { content, important } = request.body;
  const note = {
    content,
    important,
  };

  Note.findByIdAndUpdate(id, note, { new: true })
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => next(err));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
