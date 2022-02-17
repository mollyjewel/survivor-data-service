/* RAN 'node data/addSurvivorPlayers.js' FROM SurvivorStataBackend TERMINAL */
const db = require("../app/models");
const Contestant = db.contestants;
//const fileName = "survivorPlayersSquash.csv";
const {dbconnect, dbclose} = require("../app/helpers/dbConnect.js");

const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const seasonId = process.argv.slice(2)[0];
console.log(seasonId);

const fileName = "seasonContestants/" + seasonId + ".csv";
console.log(fileName);

const makeSeason = seasonId => {
  return {seasonId: seasonId};
};

function outputRow(row) {
    row.seasons = row.seasons.split(",").map(Number).map(makeSeason);
    console.log(row);
}

function getLocation(locationText) {
  const locationAttr = locationText.split(",");
  return {city: locationAttr[0],
          state: locationAttr[1],
          country: (locationAttr[2] ? locationAttr[2] : "USA")};
}

function getSeason(residence, occupation) {
  return {
    seasonId: seasonId,
    residence: getLocation(residence),
    occupations: [{title: occupation}]
  };
}

dbconnect();

fs.createReadStream(path.resolve("data", fileName))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => processRow(row))
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

// Create and Save a new Contestant
function processRow(row) {

  const firstName = "";
  const lastName = ""
  const wikia = "";
  const seasons = [];

  // Create a Contestant
  const contestant = new Contestant();
  contestant.firstName = row.firstName;
  contestant.lastName = row.lastName;
  //contestant.gender = [row.gender];
  //contestant.wikia = row.wikia;
  //row.seasons = row.seasons.split(",").map(Number).map(makeSeason);
  //console.log(row.seasons);
  //contestant.seasons = [getSeason(row.residence, row.occupation)];
  contestant.seasons = [{seasonId: seasonId}];
  //contestant.hometown = getLocation(row.hometown);

  // Save Contestant in the database
  contestant
    .save(contestant)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      if (err instanceof db.mongoose.Error.ValidationError){
        console.log(
            err.message || `Validation error occurred while creating contestant ${req.body.firstName} ${req.body.lastName}.`
        );
      }
      console.log(
          err.message || `Some error occurred while creating contestant ${req.body.firstName} ${req.body.lastName}.`
      );
    });
}
