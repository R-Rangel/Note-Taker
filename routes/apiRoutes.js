const fs = require("fs");
const path = require("path");
const router = require("express").Router();

router.get("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));
  res.json(notes);
});

router.post("/api/notes", (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));
  newNote.id = notes.length + 1;
  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notes));
  res.json(newNote);
});

router.delete("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));
  const updatedNotes = notes.filter(note => note.id !== id);
  fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(updatedNotes));
  res.json({ message: "Note deleted successfully!" });
});

module.exports = router;
