const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {dbconnect, dbclose} = require("./app/helpers/dbConnect.js");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

dbconnect();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/season.routes")(app);
require("./app/routes/contestant.routes")(app);
//require("./app/routes/castingSheet.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;


/*const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./model")
const fs = require('fs')

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(db.url, {useNewUrlParser: true});

app.get("/", function(req, res) {
  res.send("hello");
});

app.get("/updateSeasons", function(req, res) {
  const fileContents = fs.readFileSync('./data/survivorSeasons.csv', 'utf8');
  updateSeasons(fileContents);
  res.send("hello");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

function updateSeasons(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    //var headers = allTextLines[0].split(',');

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == 3) {
          const id = data[0];
          const title = data[1];
          const subtitle = data[2];
          let season = {};
          if (id != "") {
            season._id = id;
          }
          if (title != "") {
            season.title = title;
          }
          if (subtitle != "") {
            season.subtitle = subtitle;
          }
          console.log(season);
          const seasonEntry = new db.season(season);
          seasonEntry.save();
        } else {
          console.log("incorrect number of columns on line " + i);
        }
    }
    // alert(lines);
}*/
