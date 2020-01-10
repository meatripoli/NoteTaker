// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var notes;
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/notes.html", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Displays all characters
app.get("/api/notes", function(req, res) {
  ///Should read the db.json file and return all saved notes as JSON.
  notes = fs.readFile("./db/db.json",(error,data)=>{
    if (error) {
      return console.log(error);
    }
    console.log(JSON.parse(data));
    return res.json(JSON.parse(data))
  })
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//failed attemp to make it fancy
// app.get("/:first/:second",function (req,res) {
//   var first = req.params.first;
//   var second = req.params.second;
//   console.log(first)
//   console.log(second)

//   switch (first) {
//     case "notes":
//       res.sendFile(path.join(_dirname,"./public/notes.html"))
//       break;
//     case "api":
//       if(second === "notes"){
//         console.log(notes)
//       }
//       else{
//         console.log("wrong path given")
//       }
//       break;
//     default:
//       // Handle anything that isn't specified
//       res.sendFile(path.join(_dirpath,"./public/index.html"))
//   } 
// })

// Create New Note - takes in JSON input
app.post("/api/notes", function(req, res) {
  console.log("server side inside POST")
  var newNote = req.body;
  var newID = createID();
  newNote.id = newID;
  console.log(newNote);
  addNote(newNote);
  res.json(newNote);
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

function createID(){
  return Math.random().toString(36).substr(2, 9)
};

function addNote(newnote){
  var notes;
  fs.readFile("./db/db.json",(error,data)=>{
    if(error){
      return console.log(error);
    }
    notes=JSON.parse(data);
    notes.push(newnote)
    console.log(notes)
    let temp = JSON.stringify(notes);
    fs.writeFile("./db/db.json",temp,(error)=>{
      if(error){
        return console.log(error);
      }
      console.log("Success!")
    })
  })
  
}