// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var notes = [
  {
    title: "",
    text: "",
    ID: ""
  },
  {
    title: "",
    text: "",
    ID: ""
  },
  {
    title: "",
    text: "",
    ID: ""
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/*", function(req, res) {
  //Should return the notes.html file.
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
  //Should return the index.html file
  res.sendFile(path.join(__dirname, "notes.html"));
});

// Displays all characters
app.get("/api/notes", function(req, res) {
  ///Should read the db.json file and return all saved notes as JSON.
  return res.json(characters);
});

// Create New Characters - takes in JSON input
app.post("/api/notes", function(req, res) {
  ///POST /api/notes - Should recieve a new note to save on the request body, 
  //add it to the db.json file, and then return the new note to the client.

  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newCharacter = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newCharacter);

  characters.push(newCharacter);

  res.json(newCharacter);
});

///DELETE /api/notes/:id - Should recieve a query paramter containing the id of a 
//note to delete. This means you'll need to find a way to give each note a unique 
//id when it's saved. In order to delete a note, you'll need to read all notes from 
//the db.json file, remove the note with the given id property, and then rewrite the 
//notes to the db.json file.

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});