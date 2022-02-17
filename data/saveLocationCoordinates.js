require('dotenv').config();
const request = require("request")
const fs = require('fs')
const db = require("../app/models")
const location = require("survivor-stats-common/helpers/location")
const {dbconnect, dbclose} = require("../app/helpers/dbConnect.js")

dbconnect()

const Contestant = db.contestants
const API_KEY = process.env.GEOCODE_API_KEY
const BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address="

const contestantId = null
const seasonId = 41
const skipExistCoord = true
//const updateHometown = true;
//const updateResidence = true;
saveLocationCoord()

async function saveLocationCoord() {
  const contestants = await getRequestedContestants()

  const hometownContestants = contestants.filter(c => shouldUpdateHometownCoord(c))
  console.log(hometownContestants)

  hometownContestants.map(contestant => {
      getCoord(location.getText(contestant.hometown))
        .then(function(coord) {
          contestant.hometown.coordinates = coord
          contestant.save()
          console.log(`Succeeded to update coordinates ${contestant.hometown.coordinates} for contestant ${contestant._id}.`)
        }).catch(function(error) {
          console.log(`Failed to update coordinates for contestant ${contestant._id}. Received error ${error}`)
        })
  })
}

function getRequestedContestants() {
  if (contestantId) { return Contestant.find({ '_id': contestantId }) }
  if (seasonId) { return Contestant.find({ 'seasons.seasonId': seasonId }) }
  return Contestant.find()
}

function shouldUpdateHometownCoord(contestant) {
  if (!location.getText(contestant.hometown)) {
    console.log("here1")
    return false
  } if (skipExistCoord && contestant.hometown.coordinates.lat && contestant.hometown.coordinates.lng) {
    console.log("here2")
    return false
  }
  console.log("here3")
  return true
}

function getCoord(locationTxt) {
    var url = BASE_URL + locationTxt + "&key=" + API_KEY
    return new Promise(function(resolve,reject) {
      request(url, function (error, response, body) {
          if (error) {
            reject(`geocode API failed for address ${locationTxt} with error ${error}.`)
          } else if (response.statusCode != 200) {
            reject(`geocode API failed for address ${locationTxt} with statusCode ${response.statusCode}.`)
          } else {
            const coord = JSON.parse(body).results[0].geometry.location
            const msg = `geocode API succeeded for address ${locationTxt} with coordinates ${coord.lat} ${coord.lng}.`
            console.log(msg)
            resolve(coord)
          }
      })
    })
}
