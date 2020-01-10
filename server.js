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
  console.log(newNote)
  // // fs.readFile("./db/db.json",(error,data)=>{
  // //   if (error) {
  // //     console.log("inside error if")
  // //     return console.log(error);
  // //   }
  // //   console.log(JSON.parse(data));
  // //   // notes = JSON.parse(data)
  // //   // notes.push(newNote);
  // //   // console.log(notes)
  // // })
  // // //console.log(newCharacter);
  
  // // //characters.push(newCharacter);
  // // // console.log(notes);
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

// app.post("/api/notes", function(req, res) {
//   ///POST /api/notes - Should recieve a new note to save on the request body, 
//   //add it to the db.json file, and then return the new note to the client.

//   // req.body hosts is equal to the JSON post sent from the user
//   // This works because of our body parsing middleware
//   var newNote = req.body;
//   var newID = createID();
//   newNote.id = newID;
//   console.log(newNote)
//   // Using a RegEx Pattern to remove spaces from newCharacter
//   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   //newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
//   fs.readFile("./db/db.json",(error,data)=>{
//     if (error) {
//       return console.log(error);
//     }
//     console.log(JSON.parse(data));
//     // notes = JSON.parse(data)
//     // console.log(notes);
//     // notes.push(newNote);
//     // console.log(notes);
//     // fs.writeFile("./db/db.json",notes,(err)=>{
//     //   if(err){return console.log(err);}
//     //   console.log("Success!")
      
//     // })
//     //res.json(notes);  
    
//   })
//   // fs.writeFile("log.txt", process.argv[2], function(err) {

//   //   if (err) {
//   //     return console.log(err);
//   //   }
  
//   //   console.log("Success!");
  
//   // });
  
// });